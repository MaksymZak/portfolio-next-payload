# Implementation Plan — Portfolio MVP (Maksym Zak, Middle Frontend)

Created: 2026-06-23
Branch: feat/portfolio-mvp
Mode: full

## Settings

- **Testing:** NO. No Jest / Cypress / Playwright / unit / e2e. Verification is `bun run lint` + `bun run build` + manual browser check only. (Hard rule #1.)
- **Logging:** Minimal. App/runtime code stays clean; only the one-off seed script prints progress + `WARN`/`ERROR`.
- **Docs:** Warn-only. No mandatory docs checkpoint.

## Roadmap Linkage

- Milestone: none (no `.ai-factory/ROADMAP.md` present).
- Rationale: roadmap artifact does not exist.

## Hard Rules (CRITICAL — apply to every step)

1. **No tests.**
2. **1-word English names** for site **sections** and their **routes, folders, anchors, and top-level section components** (`hero`, `stack`, `projects`, `archive`, `experience`, `contact`, `resume`, `case`). Shared atomic primitives and UI chrome (e.g. `LocaleSwitcher`, `ThemeProvider`) may use conventional descriptive names — this is the only relaxation, noted as an assumption.
3. **No automatic locale detection.**
4. **No separate contacts page** — `contact` is a home section only; contact/social data lives in the `settings` global.
5. **Decompose the monolith** reference prototype into atomic UI components.
6. **Payload v3 Collections + Globals** back every dynamic section; the public site reads them at runtime.

## Source-of-Truth Inputs

- Design: `.cursor/docs/design_system_new.md` (absolute priority) > `.cursor/docs/design_system_old.md` (context only).
- Scope/context: `.cursor/docs/old_vision/project-context.md`.
- UI/logic reference (decompose, do not copy verbatim): `.cursor/docs/reference/app/{page,cv,archive,portfolio-cms}.tsx` + `translations.ts`.
- Content seed: `.cursor/docs/cv.json`.

## Architecture Snapshot (target)

```
src/
  middleware.ts                         # next-intl, localePrefix:'always', detection:false
  i18n/{routing,request,navigation}.ts
  app/(frontend)/
    layout.tsx                          # pass-through (no <html>)
    page.tsx                            # redirect '/' -> '/en'
    [locale]/
      layout.tsx                        # <html lang>, fonts, providers (intl + theme)
      page.tsx                          # home: hero/stack/projects/archive/experience/contact
      resume/page.tsx
      archive/page.tsx
      case/[slug]/page.tsx
  components/
    ui/        # button, badge, card, section-tag, mono-label, drawer (radix), toast
    layout/    # theme-provider, theme-switcher, locale-switcher, clock, status-panel, sidebar, header, drawer-menu, nav
    sections/  # hero, stack, projects, archive, experience, contact
    resume/ case/ archive/
  db/
    client.ts  # getPayloadClient — single entry point to Payload Local API (React.cache)
    seed/...
  server/
    cache/
      tags.ts       # CACHE_TAGS constants
      query.ts      # cachedQuery (unstable_cache wrapper)
      revalidate.ts # shared revalidateTag hooks for Payload
    repositories/   # getSettings, getHome, getResume, getProjects, getProject, getArchive, getExperience, getSkills
    services/       # business logic (empty on MVP; reserved)
    types.ts        # DataLocale
  lib/              # utilities only (cn)
  config/
    collections/{Projects,Archive,Experience,Skills,Media,Users}/...
    globals/{Settings,Home,Resume}.ts
messages/{en,uk}.json
```

Content ownership:
- **Code (next-intl `messages`):** nav labels, section tags, button labels, theme/locale labels, footer chrome, base UI copy.
- **Payload (runtime, field-level localized):** projects, archive entries, experience, skills, editorial blocks (hero copy, metrics, about, education, languages), identity + contacts.

---

# Tasks

## Phase 0 — i18n & Theming Foundations

### Step 1 — next-intl routing config
- [x] Files: create `src/i18n/routing.ts`.
- Do: `defineRouting({ locales: ['en','uk'], defaultLocale: 'en', localePrefix: 'always', localeDetection: false })`. Export `locales`, `defaultLocale`.
- Done when: `routing` importable; matches the type already referenced in `src/global.d.ts`.

### Step 2 — next-intl navigation helpers
- [x] Files: create `src/i18n/navigation.ts`.
- Do: `createNavigation(routing)` → export `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`.
- Done when: locale-aware `Link`/`useRouter` available for switchers and internal links.

### Step 3 — next-intl request config
- [x] Files: create `src/i18n/request.ts`.
- Do: `getRequestConfig` — validate `requestLocale` against `routing.locales`, fall back to `defaultLocale`, `return { locale, messages: (await import(`../../messages/${locale}.json`)).default }`.
- Done when: server components can resolve messages for a locale.

### Step 4 — message catalogs (UI chrome only)
- [x] Files: create `messages/en.json` and `messages/uk.json` (identical key shape).
- Do: keys for `nav` (index, hero, stack, projects, archive, experience, contact), `actions` (viewProjects, contactMe, downloadCv, savePdf, copyEmail, copied, readDoc, viewTelemetry, hideTelemetry, backToIndex, viewArchive, search), `labels` (location, availability, localTime, systemState, online, locale, theme), `themes` (light/dark/warm/contrast display names), `footer`. Pull English copy from `reference/app/translations.ts`; provide Ukrainian. Keep ONLY chrome here, not dynamic content.
- Done when: both files parse and have matching keys; `en.json` shape satisfies `global.d.ts`.

### Step 5 — next-intl plugin in next.config
- [x] Files: edit `next.config.ts`.
- Do: `import createNextIntlPlugin from 'next-intl/plugin'; const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')`. Wrap so both `withPayload` and `withNextIntl` apply (compose: `export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })` — preserve the existing `devBundleServerPackages: false` option and the `turbopack.root` setting). Also add `experimental: { optimizePackageImports: ['lucide-react'] }` so icon imports stay tree-shaken with full types under `strict` (avoids deep-path imports without `.d.ts`; see React best-practices 2.1).
- Done when: `bun run build` picks up the plugin without errors; `lucide-react` named imports type-check.

### Step 6 — middleware
- [x] Files: create `src/middleware.ts`.
- Do: `createMiddleware(routing)`; `matcher` excludes `/admin`, `/api`, `/_next`, `/_payload`, files with extensions, and favicon. (Keep Payload admin/api untouched.)
- Done when: visiting `/` redirects to `/en`; `/admin` still loads Payload.

### Step 7 — slim the frontend group layout
- [x] Files: edit `src/app/(frontend)/layout.tsx`.
- Do: remove `<html>/<body>` and fonts; make it `export default function ({children}){ return children }`. (Fonts/html move to `[locale]/layout.tsx`.)
- Done when: no nested `<html>` once Step 9 lands.

### Step 8 — fix `/` redirect to default locale
- [x] Files: edit `src/app/(frontend)/page.tsx`.
- Do: `redirect('/en')` (was `/uk`). Middleware normally handles this; keep as fallback.
- Done when: hitting `/` lands on `/en`.

### Step 9 — locale layout: html, fonts, providers, static params
- [x] Files: rewrite `src/app/(frontend)/[locale]/layout.tsx`; move `globals.css` import here.
- Do: `generateStaticParams` from `routing.locales`; await `params`, guard unknown locale → `notFound()`, call `setRequestLocale(locale)`; render `<html lang={locale} suppressHydrationWarning className={sans.variable + mono.variable}><body><ThemeProvider><NextIntlClientProvider>{children}</NextIntlClientProvider></ThemeProvider></body></html>`. Move the IBM Plex Sans + JetBrains Mono `next/font` setup from old `(frontend)/layout.tsx` to here.
- Done when: `/en` and `/uk` render with correct lang + fonts; no hydration warnings.

### Step 10 — theme provider (next-themes)
- [x] Files: create `src/components/layout/theme-provider.tsx` (client).
- Do: wrap `next-themes` `ThemeProvider` with `attribute="data-theme"`, `themes={['light','dark','warm','contrast']}`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`.
- Done when: `data-theme` toggles on `<html>`; no flash; replaces all prototype `localStorage` theme code.

**Commit checkpoint A:** `feat(i18n): wire next-intl + theming foundations` (Steps 1-10). Verify `bun run lint && bun run build`.

---

## Phase 1 — Payload Collections, Globals & Seed

### Step 11 — enable Payload field-localization
- [x] Files: edit `src/payload.config.ts`.
- Do: add `localization: { locales: ['en','uk'], defaultLocale: 'en' }`. Confirm `@payload-config` alias exists in `tsconfig.json` (add if missing) for the data layer.
- Done when: admin shows per-locale field tabs; types regenerate cleanly.

### Step 12 — `skills` collection
- [x] Files: create `src/config/collections/Skills/Skills.ts`; register in `collections/index.ts`.
- Do: fields `title` (text), `level` (number 1-5, from cv `levels` true-count), `order` (number). `access.read: () => true`. Maps cv.json `hardSkills`.
- Done when: collection appears in admin; used later by `stack` + resume.

### Step 13 — `experience` collection
- [x] Files: create `src/config/collections/Experience/Experience.ts`; register.
- Do: fields `role` (text, localized), `company` (text), `period` (text), `bullets` (array of `{ text: text localized }`), `order`. `access.read: () => true`. Maps cv `workExperience`.
- Done when: visible in admin.

### Step 14 — `archive` collection
- [x] Files: create `src/config/collections/Archive/Archive.ts`; register.
- Do: fields `title` (text), `role` (text localized), `stack` (array of text), `year` (text), `category` (select: Landing/Platform/Campaign/Prototype), `metric` (text localized, optional), `url` (text, optional), `order`. `access.read: () => true`. Maps reference archive + cv `portfolio.projects`.
- Done when: visible in admin.

### Step 15 — `projects` collection (flagship case studies)
- [x] Files: create `src/config/collections/Projects/Projects.ts`; register.
- Do: fields `title` (text), `slug` (text, unique, indexed), `label` (select: live/roadmap), `role` (text localized), `period` (text), `summary` (textarea localized), `highlights` (array `{ text: text localized }`), `stack` (array text), `metrics` (text localized), `technicalDepth` (textarea localized), `screenshot` (upload→media, optional), `order`. `admin.useAsTitle:'title'`, `access.read: () => true`.
- Done when: visible in admin; `slug` drives `/case/[slug]`.

### Step 16 — `settings` global (identity + contacts)
- [x] Files: create `src/config/globals/Settings.ts`; add `globals: [...]` array to `payload.config.ts`.
- Do: fields `name` (text), `position` (text localized), `location` (text localized), `availability` (text localized), `contacts` (array `{ type: select(phone|mail|telegram|github|linkedin|map), label: text, url: text }`), `resumeUrl` (text, optional). Maps cv `contacts` (`icon`→`type`, `text`→`label`, `link`→`url`). Canonical `position` string = **"Middle Frontend Developer"** (overrides cv.json's "Full Stack (Frontend-focused) Developer"; aligns with reference `translations.ts` + plan title). `access.read: () => true`.
- Done when: editable singleton in admin.

### Step 17 — `home` global (editorial content)
- [x] Files: create `src/config/globals/Home.ts`; register in `globals`.
- Do: groups — `hero { badge, headline, copy }` (localized text), `proof { years, yearsDesc, pages, pagesDesc, depth, depthDesc, intro }` (localized). Maps reference `intro`/`proof`. (Note: `softSkills` moved to the `resume` global in Step 18 — it is consumed only by the resume bento, never by any home section.) `access.read: () => true`.
- Done when: editable singleton in admin.

### Step 18 — `resume` global (resume-only content)
- [x] Files: create `src/config/globals/Resume.ts`; register in `globals`.
- Do: groups — `about { text }` (localized), `education` (array `{ title, date, text }` localized text), `languages` (array `{ name, level }` localized; split cv flat strings like "Ukrainian - Native" → `name`/`level`), `softSkills` (array text localized; from cv `softSkills`), `portfolioNote { title, text }` (localized). Maps cv `about`/`education`/`languages`/`softSkills`/`portfolio`. `access.read: () => true`.
- Done when: editable singleton in admin.

### Step 19 — regenerate Payload types
- [x] Files: regenerate `src/payload-types.ts`.
- Do: run `bun run generate:types` (and `generate:importmap` if admin needs it).
- Done when: types for all new collections/globals exist and compile.

### Step 20 — seed script from source inputs
- [x] Files: create `src/db/seed/`; add `"seed"` script to `package.json`.
- Pre-req: confirm the Payload connection env var resolves before booting the Local API. `src/payload.config.ts` reads `process.env.DATABASE_URL`, but `src/config/env.ts` declares `DATABASE_URI` — ensure `.env` provides `DATABASE_URL` (or align the names) so seed + the Step 21 data layer can connect.
- Content sources (per-entity, NOT all from cv.json):
  - `settings`/`home`/`resume` globals, `skills`, `experience` → `cv.json` (+ reference `intro`/`proof` editorial copy). Use canonical `position` = "Middle Frontend Developer".
  - `archive` → reference `app/archive/page.tsx` entries + cv `portfolio.projects` (the 11 landing pages).
  - `projects` (flagship): `portfolio-cms` → reference `app/portfolio-cms/page.tsx`; `lms` + the 3 roadmap items have **no existing source** → seed explicit placeholder copy and flag for the user to supply real content. <!-- TODO(content): provide real copy for `lms` + 3 roadmap projects, or confirm placeholders are acceptable for MVP. -->
- Do: load Payload via Local API, upsert globals + collections for BOTH `en` and `uk` (write `en` then update `uk` locale). Use `console.log` progress + `WARN`/`ERROR`. Idempotent (find-by-slug before create).
- Done when: `bun run seed` populates admin; re-running does not duplicate.

**Commit checkpoint B:** `feat(cms): add collections, globals, localization & seed` (Steps 11-20). Verify build + admin browse.

---

## Phase 2 — Runtime Data Layer

### Step 21 — Payload client accessors
- [x] Files: create `src/lib/data/index.ts` (or one file per accessor).
- Do: `getPayload({ config })` via `@payload-config`; wrap each accessor in React `cache()`. Implement `getSettings(locale)`, `getHome(locale)`, `getResume(locale)`, `getProjects(locale)`, `getProject(slug, locale)`, `getArchive(locale)`, `getExperience(locale)`, `getSkills(locale)`. Pass `locale` + `depth` to Payload `find/findGlobal`; sort by `order`. Type returns from `payload-types`.
- Done when: a temporary RSC log confirms localized data returns for `en` and `uk`; remove temp log.
- Note: superseded by Steps 21a–21c (migrate to `db/client` + `server/repositories`, add Data Cache tags, wire revalidation). Keep `[x]` as historical baseline.

### Step 21a — migrate to `db/client` + `server/repositories`
- [x] Pre-req: Steps 21 (baseline accessors exist in `lib/data`).
- [x] Files: refactor `src/db/client.ts`; create `src/server/repositories/*.repository.ts`, `src/server/types.ts`, `src/server/repositories/index.ts`; delete `src/lib/data/`; edit `AGENTS.md`; add `server-only` dependency.
- Do:
  - `bun add server-only`.
  - `src/db/client.ts` — **single entry point** to Payload: `import 'server-only'`, `import config from '@payload-config'`, `export const getPayloadClient = cache(async () => getPayload({ config }))`.
  - One repository file per domain (`settings.repository.ts`, `home.repository.ts`, `resume.repository.ts`, `projects.repository.ts`, `archive.repository.ts`, `experience.repository.ts`, `skills.repository.ts`): import `getPayloadClient` from `@/db/client` only (never call `getPayload` elsewhere). Same public API: `getSettings(locale)`, `getHome(locale)`, `getResume(locale)`, `getProjects(locale)`, `getProject(slug, locale)`, `getArchive(locale)`, `getExperience(locale)`, `getSkills(locale)`. Pass `locale` + `depth: 1` to Payload `find`/`findGlobal`; sort by `order`. Return types from `payload-types`.
  - `src/db/seed/index.ts` — replace direct `getPayload({ config })` with `getPayloadClient()` from `@/db/client`.
  - Remove `src/lib/data/` entirely.
- Done when: `@/server/repositories` imports compile; seed runs via `db/client`; `lib/data` is gone; `AGENTS.md` documents `db/client` + `server/repositories`.

### Step 21b — Data Cache tags + `unstable_cache`
- [x] Pre-req: Step 21a.
- [x] Files: `src/server/cache/tags.ts`, `src/server/cache/query.ts`; update each repository.
- Do:
  - `CACHE_TAGS` constants: `settings`, `home`, `resume`, `projects`, `archive`, `experience`, `skills`.
  - `cachedQuery(keyParts, tags, fn)` — wrapper around `unstable_cache` from `next/cache`.
  - Each repository: outer `React.cache` (per-render dedup) + inner `cachedQuery` (cross-request cache + tag for `revalidateTag`).
  - Example: `getProjects(locale)` → `cache(async (locale) => cachedQuery(['projects', locale], [CACHE_TAGS.projects], async () => { ... payload.find ... }))`.
- Done when: repositories use tagged `unstable_cache`; `CACHE_TAGS` exported for hooks.

### Step 21c — Payload hooks → `revalidateTag`
- [x] Pre-req: Step 21b.
- [x] Files: `src/server/cache/revalidate.ts`; register hooks on `Projects`, `Archive`, `Experience`, `Skills` collections and `Settings`, `Home`, `Resume` globals.
- Do:
  - Shared hooks: `afterChange` / `afterDelete` (collections) → `revalidateTag(CACHE_TAGS.<domain>)` wrapped in `try/catch` (seed/standalone must not crash).
  - Seed writes: pass `context: { disableRevalidate: true }` on `updateGlobal` / `create` / `update` so bulk seed skips Next cache APIs.
  - Hooks respect `req.context.disableRevalidate` (Payload pattern).
  - For `projects`: optionally `revalidatePath` for `/en/case/[slug]` and `/uk/case/[slug]` when slug changes.
- Done when: editing content in `/admin` refreshes the corresponding static page without a full redeploy.

**Commit checkpoint C:** `feat(data): db client, repositories, cache tags & revalidation` (Steps 21a–21c). Verify `bun run lint && bun run build`.

---

## Phase 3 — Shared UI Primitives (atomic)

### Step 22 — `Button`
- [x] Files: `src/components/ui/button.tsx`.
- Do: CVA variants — `primary` (accent bg, accent-foreground, brutalist `shadow-[4px_4px_0_var(--foreground)]` + hover translate), `secondary` (surface + border), `ghost`. Mono uppercase label, `rounded-none`. Reduced-motion safe. Use `cn`.
- Done when: renders all variants from tokens.

### Step 23 — `SectionTag` + `MonoLabel`
- Files: `src/components/ui/section-tag.tsx`, `src/components/ui/mono-label.tsx`.
- Do: `SectionTag` = `[0x]` accent number + 1px rule + uppercase mono label (the `[02] — PROOF` header pattern). `MonoLabel` = small uppercase mono span.
- Done when: matches reference section headers via tokens.

### Step 24 — `Card` + `Badge`/`Tag`
- Files: `src/components/ui/card.tsx`, `src/components/ui/badge.tsx`.
- Do: `Card` flat surface + 1px border, sharp corners, optional hover offset-shadow. `Badge` neutral mono tag for stack/metadata.
- Done when: reusable across sections.

### Step 25 — `Drawer` (Radix Dialog as right sheet)
- Files: `src/components/ui/drawer.tsx`.
- Do: build on installed `radix-ui` Dialog → right-side panel, backdrop, focus trap, Esc close, `data-state` animations via `tw-animate-css`. Sharp corners, border-l. (No framer-motion.)
- Done when: accessible open/close; reduced-motion respected.

### Step 26 — `Toast` (copy feedback)
- Files: `src/components/ui/toast.tsx`.
- Do: minimal client toast (timeout-based) for "email copied"; mono, offset-shadow; reduced-motion safe.
- Done when: shows/auto-dismisses.

**Commit checkpoint D:** `feat(ui): atomic primitives` (Steps 22-26).

---

## Phase 4 — Layout Shell

Pre-req for data-consuming steps (30, 32): Steps 21a–21c complete.

### Step 27 — `Clock` (Kyiv time)
- Files: `src/components/layout/clock.tsx` (client).
- Do: `Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Kyiv',...})` ticking each second; `suppressHydrationWarning` on the value node.
- Done when: shows live Kyiv time, no hydration mismatch.

### Step 28 — `ThemeSwitcher`
- Files: `src/components/layout/theme-switcher.tsx` (client).
- Do: `useTheme()` from next-themes; 2x2 grid of 4 themes with swatches + active state; labels from `messages.themes`. Avoid hydration flash (render after mount or use `resolvedTheme` guard).
- Done when: switching updates `data-theme` instantly.

### Step 29 — `LocaleSwitcher`
- Files: `src/components/layout/locale-switcher.tsx` (client).
- Do: use `useRouter`/`usePathname` from `src/i18n/navigation`; switch locale preserving current path; EN/UK buttons with active state. No detection.
- Done when: `/en/resume` ↔ `/uk/resume` preserves route.

### Step 30 — `StatusPanel`
- Pre-req: Steps 21a–21c (data layer migrated).
- Files: `src/components/layout/status-panel.tsx`.
- Do: location / availability / local time (embeds `Clock`); data from `getSettings` via `@/server/repositories` (passed as props) + `messages.labels`.
- Done when: renders localized metadata block.

### Step 31 — `Nav` (index + scrollspy)
- Files: `src/components/layout/nav.tsx` (client).
- Do: numbered links `[01..06]` to `#hero…#contact`; `IntersectionObserver` active-section highlight; smooth scroll; labels from `messages.nav`.
- Done when: active item tracks scroll; clicks scroll smoothly.

### Step 32 — `Sidebar` (desktop)
- Files: `src/components/layout/sidebar.tsx`.
- Do: sticky left column (xl+): identity (name + `position`), `LocaleSwitcher`, `ThemeSwitcher`, `StatusPanel`, `Nav`, `DOWNLOAD CV` → `/resume`, footer chrome. Composes the above; receives `settings` props (fetched via `@/server/repositories` in parent page).
- Done when: matches reference left column via tokens.

### Step 33 — `Header` + `DrawerMenu` (mobile)
- Files: `src/components/layout/header.tsx`, `src/components/layout/drawer-menu.tsx` (client).
- Do: sticky top bar (<xl) with name + `[ MENU ]` opening `Drawer`; drawer contains `Nav`, `LocaleSwitcher`, `ThemeSwitcher`, `StatusPanel`, CV link.
- Done when: mobile nav works; desktop hides header.

**Commit checkpoint E:** `feat(layout): shell, sidebar, drawer, switchers` (Steps 27-33).

---

## Phase 5 — Home Sections

Pre-req: Steps 21a–21c (repositories + cache tags).

### Step 34 — `Hero` (`#hero`)
- Files: `src/components/sections/hero.tsx`.
- Do: badge/headline/copy from `getHome(locale)` (`@/server/repositories`).hero; CTAs (`viewProjects`→`#projects`, `contactMe`→`#contact`) using `Button`; technical grid background; reduced-motion safe.
- Done when: localized hero renders.

### Step 35 — `Stack` (`#stack`)
- Files: `src/components/sections/stack.tsx`.
- Do: 3 metric cells from `getHome(locale)` (`@/server/repositories`).proof; tech inventory from `getSkills(locale)` as bordered mono badges (icon optional via a small id→icon map using standard named `lucide-react` imports — `import { X } from 'lucide-react'`; tree-shaking handled by `optimizePackageImports` from Step 5, not deep-path imports).
- Done when: metrics + skills render localized.

### Step 36 — `Projects` (`#projects`)
- Files: `src/components/sections/projects.tsx` + `src/components/case/project-card.tsx` (client for expand).
- Do: list `getProjects(locale)` from `@/server/repositories`; card = node header + label + title + role/period + summary; expandable "telemetry" (highlights + stack) via local state (CSS height/opacity, reduced-motion safe); flagship card links `readDoc`→`/case/[slug]`.
- Done when: cards render, expand toggles, link routes to case page.

### Step 37 — `Archive` (`#archive`)
- Files: `src/components/sections/archive.tsx`.
- Do: featured grid (first ~4 of `getArchive(locale)` from `@/server/repositories`); `viewArchive` button → `/archive`.
- Done when: featured entries render + link works.

### Step 38 — `Experience` (`#experience`)
- Files: `src/components/sections/experience.tsx`.
- Do: timeline from `getExperience(locale)` (`@/server/repositories`) — role/company/period/bullets, localized.
- Done when: timeline renders localized.

### Step 39 — `Contact` (`#contact`)
- Files: `src/components/sections/contact.tsx` (client).
- Do: prominent email copy (clipboard + `Toast`) + social cards from `getSettings(locale)` (`@/server/repositories`).contacts (passed as props from server parent). No separate page.
- Done when: copy works; links open.

### Step 40 — assemble home page
- Files: rewrite `src/app/(frontend)/[locale]/page.tsx`.
- Do: server component; `setRequestLocale(locale)`; parallel-fetch via `@/server/repositories` (`getSettings`, `getHome`, `getProjects`, `getArchive`, `getExperience`, `getSkills` — use `Promise.all` where independent); render `Sidebar` + `Header`/`DrawerMenu` + sections in order hero→stack→projects→archive→experience→contact within the 2-column responsive container.
- Done when: full localized home renders at `/en` and `/uk`; lint+build pass.

**Commit checkpoint F:** `feat(home): sections + page assembly` (Steps 34-40).

---

## Phase 6 — Resume Page

### Step 41 — resume components
- Files: `src/components/resume/header.tsx`, `bento.tsx`, `print-button.tsx`.
- Do: print-ready bento (about / stack / experience / soft skills / languages / education / portfolio note) from `@/server/repositories` (`getResume`, `getSkills`, `getExperience`, `getSettings`); `print-button` calls `window.print()`; `print:*` classes hide chrome, normalize to B/W, keep one page.
- Done when: components render localized + print-clean.

### Step 42 — resume page
- Files: create `src/app/(frontend)/[locale]/resume/page.tsx`.
- Do: server component; `setRequestLocale`; back-to-index link; compose resume components; `savePdf` action.
- Done when: `/en/resume` + `/uk/resume` render; print preview = one clean page.

**Commit checkpoint G:** `feat(resume): print-ready resume page` (Steps 41-42).

---

## Phase 7 — Case Study Page

### Step 43 — case components
- Files: `src/components/case/index-nav.tsx` (client scrollspy) + `src/components/case/section.tsx`.
- Do: left index sidebar with anchors + section blocks (overview/goals/stack/etc.) driven by `getProject(slug, locale)` from `@/server/repositories` (summary, highlights, stack, technicalDepth, metrics).
- Done when: components render from a project record.

### Step 44 — case route
- Files: create `src/app/(frontend)/[locale]/case/[slug]/page.tsx`.
- Do: `generateStaticParams` from `getProjects` slugs × locales; `setRequestLocale`; `getProject(slug, locale)` from `@/server/repositories` → `notFound()` if missing; render header + index-nav + sections; back link.
- Done when: `/en/case/portfolio-cms` renders; bad slug → 404.

**Commit checkpoint H:** `feat(case): case study route` (Steps 43-44).

---

## Phase 8 — Archive Page

### Step 45 — archive components
- Files: `src/components/archive/table.tsx` (client search/filter) + `src/components/archive/toolbar.tsx`.
- Do: full ledger table from `getArchive(locale)` (`@/server/repositories`); client search + category filter (derive single-pass); localized role/metric; sharp-corner table.
- Done when: search/filter work; localized.

### Step 46 — archive route
- Files: create `src/app/(frontend)/[locale]/archive/page.tsx`.
- Do: server component; `setRequestLocale`; fetch `getArchive(locale)` from `@/server/repositories`; render toolbar + table + back link.
- Done when: `/en/archive` + `/uk/archive` render and filter.

**Commit checkpoint I:** `feat(archive): full archive ledger page` (Steps 45-46).

---

## Phase 9 — SEO, Metadata & Final Polish

### Step 47 — localized metadata + hreflang
- Files: edit `[locale]/layout.tsx` and each `page.tsx` (`generateMetadata`).
- Do: per-locale `title`/`description` from `getSettings`/`getHome` (`@/server/repositories`), `alternates.languages` for en/uk, canonical, OpenGraph. Use `NEXT_PUBLIC_SITE_URL`.
- Done when: correct `<title>`, `lang`, and hreflang per route.

### Step 47b — sitemap & robots (optional)
- Files: create `src/app/sitemap.ts` and `src/app/robots.ts`.
- Do: `sitemap.ts` emits all public routes (home, resume, archive, each `/case/[slug]`) × `en`/`uk` with `alternates.languages` hreflang, base from `NEXT_PUBLIC_SITE_URL`; `robots.ts` allows crawl + points to the sitemap, disallows `/admin` and `/api`. Low priority — drop if out of MVP scope.
- Done when: `/sitemap.xml` and `/robots.txt` resolve with correct per-locale entries.

### Step 48 — accessibility & reduced-motion pass
- Files: touch interactive components as needed.
- Do: visible focus rings (already in `globals.css`), keyboard nav for drawer/switchers/nav, `aria-*` on toggles, confirm all motion respects `prefers-reduced-motion`, verify High Contrast theme.
- Done when: keyboard-only flow works; reduced-motion disables transitions.

### Step 49 — responsive verification + cleanup
- Files: as needed.
- Do: verify mobile(375)/tablet(768)/desktop(1280+); remove any leftover prototype `localStorage`/dead code; confirm no client `motion/react` dependency leaked in.
- Done when: clean responsive behavior across breakpoints.

### Step 50 — final gate
- Files: none.
- Do: `bun run lint` + `bun run build`; manual smoke of `/en`, `/uk`, `/en/resume`, `/en/case/portfolio-cms`, `/en/archive`, `/admin`.
- Done when: lint + build pass; all routes load; admin intact.

**Commit checkpoint J:** `feat(seo): metadata, a11y, responsive polish` (Steps 47-50, incl. 47b).

---

## Commit Plan (summary)

| Checkpoint | Steps | Message |
| --- | --- | --- |
| A | 1-10 | feat(i18n): wire next-intl + theming foundations |
| B | 11-20 | feat(cms): collections, globals, localization & seed |
| C | 21a–21c | feat(data): db client, repositories, cache tags & revalidation |
| D | 22-26 | feat(ui): atomic primitives |
| E | 27-33 | feat(layout): shell, sidebar, drawer, switchers |
| F | 34-40 | feat(home): sections + page assembly |
| G | 41-42 | feat(resume): print-ready resume page |
| H | 43-44 | feat(case): case study route |
| I | 45-46 | feat(archive): full archive ledger page |
| J | 47-50 (+47b) | feat(seo): metadata, a11y, responsive polish |

## Assumptions & Notes

- **1-word rule scope:** enforced for site sections + their routes/folders/anchors/section-components; relaxed for shared atomic primitives and chrome (`ThemeProvider`, `LocaleSwitcher`, etc.). Flag if you want strict enforcement everywhere.
- **No framer-motion:** reference used `motion/react`; we use CSS/Tailwind transitions + Radix `data-state` + `tw-animate-css` to keep bundle lean. Add `motion` later only if needed.
- **shadcn:** tokens are already mapped in `globals.css`; we build primitives on the installed `radix-ui` package instead of pulling shadcn CLI components, to stay lean. Switch to shadcn CLI per-component if preferred.
- **Drawer** uses Radix Dialog (accessible) styled as a right sheet.
- **Payload admin/api** stay untouched; middleware matcher must exclude them.
- **Seed** is idempotent and is the source of initial bilingual content from `cv.json`.
- **Data layer:** `src/db/client.ts` is the **only** entry point to Payload (`getPayloadClient`). Repositories live in `src/server/repositories/` and import from `@/db/client` only. `lib/` holds utilities, not queries.
- **Caching (SSG):** `React.cache` deduplicates within a single render; `unstable_cache` + `CACHE_TAGS` persist across requests; `revalidateTag` from Payload hooks invalidates after admin edits. Seed passes `context: { disableRevalidate: true }` to skip cache APIs.
