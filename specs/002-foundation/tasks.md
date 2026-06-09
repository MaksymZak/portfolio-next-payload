---
description: 'Task list for feature 002-foundation (App Shell & Infrastructure)'
---

# Tasks: Foundation (App Shell & Infrastructure)

**Input**: Design documents from `/specs/002-foundation/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/shell-foundation-contract.md](./contracts/shell-foundation-contract.md), [quickstart.md](./quickstart.md)

**Agent Automation Note**: Task generation referenced the project skills `.agents/skills/shadcn/SKILL.md`,
`.agents/skills/frontend-design/SKILL.md`, `.agents/skills/modern-web-guidance/SKILL.md`, and
`.agents/skills/vercel-react-best-practices/SKILL.md`. Context7 MCP library IDs recorded in
[plan.md](./plan.md) and [research.md](./research.md): `/websites/next-intl_dev`, `/pacocoursey/next-themes`,
`/websites/ui_shadcn`. Re-consult these at `/speckit.implement` time (notably `modern-web-guidance` for
skip-link / `:focus-visible` / reduced-motion and shadcn `@theme inline` mapping).

**Tests**: Tests ARE requested for this slice (Vitest `tests/int` parity + config invariants; Playwright
`tests/e2e` redirect / locale-switch / theme persistence + no-flash / skip-link / responsive). Old `[lang]`-based
specs MUST be migrated to the new `[locale]` structure so the suite stays green.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task serves (US1–US6). Setup / Foundational / Polish have no story label.
- Every task includes an exact file path.

## Path Conventions

Single Next.js App Router app. Public site under `src/app/(frontend)`, Payload under `src/app/(payload)` (unchanged).
i18n config in `src/i18n/*`, registries in `src/config/*`, shell chrome in `src/components/portfolio/layout/*`,
shadcn primitives in `src/components/ui/*`, token contract in `src/app/(frontend)/globals.css`, messages in `messages/*`.

---

## Phase 0: Cleanup & Restart (Visual/Architecture Reset)

**Purpose**: Remove the superseded hand-written shell and old non-mobile-first page layer, and migrate DATA/helpers
forward only. Per [research.md](./research.md) D12, the visual layer is **removed/replaced, not extended**.

**⚠️ Destructive**: deletes legacy UI files. Migrate typed data + helper logic first (T001–T002) before deleting.

- [ ] T001 [P] Migrate typed content forward: keep `src/content/portfolio/types.ts`, `src/content/portfolio/en.ts`, `src/content/portfolio/uk.ts`, `src/content/portfolio/index.ts` (data only; do NOT add new UI). Confirm `ContactMethod`, `ThemeOption`, `PortfolioLocale`, `PortfolioThemeId` exports remain available for re-use.
- [ ] T002 [P] Migrate helper logic forward in `src/lib/portfolio/routes.ts` (re-point path builders to `/[locale]`), `src/lib/portfolio/metadata.ts` (keep per-route title helpers), and `src/lib/portfolio/theme.ts` (keep theme id constants only; DELETE imperative `applyPortfolioTheme` / manual `localStorage` logic — superseded by next-themes).
- [ ] T003 Remove the legacy CSS shell: delete all `.portfolio-*` rules from `src/app/(frontend)/styles.css` (the file is rebuilt as `globals.css` in T015; keep no bespoke component CSS).
- [ ] T004 [P] Delete old non-mobile-first section components in `src/components/portfolio/sections/` (`commercial-proof.tsx`, `contact-section.tsx`, `core-skills.tsx`, `home-hero.tsx`, `home-page.tsx`, `index.ts`, `portfolio-case-page.tsx`, `proof-metrics.tsx`, `resume-page.tsx`, `selected-projects.tsx`).
- [ ] T005 [P] Delete old theme + ui component folders `src/components/portfolio/theme/` (`theme-provider-script.tsx`, `theme-switcher.tsx`) and `src/components/portfolio/ui/` (`print-resume-button.tsx`, `section-shell.tsx`).
- [ ] T006 Migrate the old custom route tree `src/app/(frontend)/[lang]/` to the new next-intl `[locale]` structure: delete `src/app/(frontend)/[lang]/layout.tsx`, `page.tsx`, `projects/portfolio-cms/page.tsx`, and `resume/page.tsx` (their content bodies are deferred to slices 003–005; only the routing skeleton is rebuilt under `[locale]` in Phase 3).
- [ ] T007 Temporarily stub/skip the e2e specs that target the removed `[lang]` routes so the suite is not red mid-restart: `tests/e2e/homepage.e2e.spec.ts`, `tests/e2e/portfolio-case.e2e.spec.ts`, `tests/e2e/resume.e2e.spec.ts`, `tests/e2e/frontend.e2e.spec.ts` (mark `test.skip` with a `// TODO(002): migrate to [locale]` note; they are rewritten in Phase 9). Leave `tests/e2e/admin.e2e.spec.ts` untouched.

**Checkpoint**: Old visual layer gone; data + helpers preserved; Payload `(payload)` group untouched; suite parks legacy specs.

---

## Phase 1: Setup (Dependencies & Tooling)

**Purpose**: Install the locked stack and initialize shadcn before any foundation code is written.

- [ ] T008 Install runtime dependencies with pnpm: `next-intl`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `geist` (update `package.json` / `pnpm-lock.yaml`).
- [ ] T009 Run shadcn init (`pnpm dlx shadcn@latest init`) writing `components.json` at repo root with `tailwind.css = src/app/(frontend)/globals.css`, `tailwind.cssVariables: true`, `tailwind.baseColor: "neutral"`, `rsc: true`, `iconLibrary: "lucide"`, aliases `@/components`, `@/components/ui`, `@/lib`, and `cn` at `@/lib/cn`.
- [ ] T010 [P] Create the `cn` helper in `src/lib/cn.ts` (`cn = (...inputs) => twMerge(clsx(inputs))`) per the shadcn skill.

**Checkpoint**: Dependencies resolved; `components.json` present; `cn` available.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: i18n config, token contract, theming provider, fonts, and the typed content/config registries that
ALL user stories depend on. **No user-story phase may start until this phase is complete.**

### i18n (next-intl) configuration

- [ ] T011 [P] Create `src/i18n/routing.ts` with `defineRouting({ locales: ['en','uk'], defaultLocale: 'en', localePrefix: 'always', localeDetection: false })`.
- [ ] T012 [P] Create `src/i18n/request.ts` with `getRequestConfig`: validate the incoming locale against `routing.locales` (fallback to `defaultLocale`) and load `messages/${locale}.json`.
- [ ] T013 [P] Create `src/i18n/navigation.ts` exporting `createNavigation(routing)` helpers (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`).
- [ ] T014 Create `src/middleware.ts` applying the next-intl middleware with matcher `['/', '/((?!api|admin|_next|_vercel|.*\\..*).*)']` so `/` → `/en`, locale prefix always present, and `/admin` + `/api/*` (Payload) are NOT intercepted (contract C1.7).

### Token contract & styling (Tailwind 4 + shadcn semantic mapping)

- [ ] T015 Create `src/app/(frontend)/globals.css` (replacing `styles.css`): `@import "tailwindcss"`; four `[data-theme='light'|'dark'|'warm'|'contrast']` blocks with the full token contract from [data-model.md](./data-model.md) (`--background`, `--foreground`, `--surface`, `--surface-muted`, `--border`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--ring`, `--radius`, `--font-sans`, `--font-mono`), with `[data-theme='light']` doubling as `:root`; `--radius: 0rem` in all four (FR-022).
- [ ] T016 In `src/app/(frontend)/globals.css`, add the `@theme inline { --color-background: var(--background); ... }` mapping exposing every token as a Tailwind utility-backed value (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`), plus `--radius-sm/md/lg` derived from `--radius`, and the shadcn semantic vars mapped FROM the tokens per the data-model table (`--primary→--accent`, `--secondary`/shadcn `--accent`→`--surface-muted` (NOT brand orange), `--card`/`--popover`→`--surface`, `--border`/`--input`→`--border`, `--ring→--ring`, `--destructive` neutral-safe) (FR-019–FR-022, contract C5).

### Theming (next-themes) + fonts

- [ ] T017 [P] Create `src/components/theme-provider.tsx` (`"use client"`) wrapping next-themes `ThemeProvider` with `attribute="data-theme"`, `themes={themeIds}`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange` (FR-013–FR-018).
- [ ] T018 [P] Create `src/lib/fonts.ts` loading `Geist` (`--font-sans`) and `JetBrains_Mono` (`--font-mono`) via `next/font/google` with `display: 'swap'` and `variable` set, exporting their class names for the `[locale]` layout (replaces prior `Inter`).

### Typed content-layer foundation (registries + messages + parity types)

- [ ] T019 [P] Create `src/config/locales.ts` — Locale registry (`{ code, label, isDefault }[]` = `[{en,'EN',true},{uk,'UK',false}]`) plus `defaultLocale`, derived to stay consistent with `routing.ts`.
- [ ] T020 [P] Create `src/config/themes.ts` — Theme registry (`{ id, nameKey, isDefault }[]` for `light|dark|warm|contrast`, `light` default) exporting `themes`, `themeIds`, `defaultThemeId`; single source feeding both the provider and the switcher.
- [ ] T021 [P] Create `src/config/site.ts` — public Contact Link config (`{ id, href, external }` for email `mailto:zaksumy1989@gmail.com`, telegram `https://t.me/MaksymZak`, linkedin `https://www.linkedin.com/in/mzakaliuzhnyi`, github `https://github.com/MaksymZak`) plus `site.wordmark` and `site.copyrightOwner`. PUBLIC-ONLY: no phone, no city, zero private-repo references (FR-009, FR-010, C8).
- [ ] T022 [P] Create `messages/en.json` — shell chrome strings under namespaces `nav` (work, experienceSkills, resume, contact, downloadCv, openMenu, closeMenu), `footer` (copyright), `contact` (email, telegram, linkedin, github), `themes` (light, dark, warm, contrast, label), `a11y` (skipToContent, languageSwitcher, themeSwitcher, activeLanguage).
- [ ] T023 [P] Create `messages/uk.json` — Ukrainian counterpart with the EXACT same key set as `messages/en.json`, equivalent meaning, no English fallback (FR-024, SC-009).
- [ ] T024 Create `global.d.ts` (repo root) with the next-intl `Messages` type augmentation keyed off `messages/en.json` so `useTranslations` namespaces/keys are build-time checked.

**Checkpoint**: Routing, tokens, theming, fonts, registries, and parity-typed messages exist — user stories can begin.

---

## Phase 3: User Story 1 — Visitor reaches a localized page through a stable URL (Priority: P1) 🎯 MVP

**Goal**: `/` redirects to `/en`; `/en` and `/uk` render the same shell (header + footer around a stub `main`) with locale-correct chrome.

**Independent Test**: Visit `/` → redirect to `/en`; open `/en` and `/uk` → identical shell structure, locale-correct strings, `<html lang>` matches, empty/stub `main`.

### Implementation for User Story 1

- [ ] T025 [US1] Convert `src/app/(frontend)/layout.tsx` into a thin passthrough that returns `children` (no `<html>`/`<body>`; locale-agnostic group root) and imports `./globals.css` once.
- [ ] T026 [US1] Create `src/app/(frontend)/[locale]/layout.tsx`: render `<html lang={locale} suppressHydrationWarning>` + font variable classes + `<body>`; call `setRequestLocale(locale)`; guard with `hasLocale(routing.locales, locale)` → `notFound()`; export `generateStaticParams` returning `routing.locales`; wrap children with `ThemeProvider` → `NextIntlClientProvider` → `AppShell` (FR-001–FR-005, FR-014).
- [ ] T027 [US1] Create `src/app/(frontend)/[locale]/page.tsx` — stub localized home rendering only an empty/stub `main` region (no page-body content; basic per-route title acceptable) (FR-004, FR-025, SC-010).
- [ ] T028 [US1] Create `src/components/portfolio/layout/skip-to-content.tsx` — first focusable element linking to `#main-content` (built here so AppShell can compose it; focus behavior verified in US5).
- [ ] T029 [US1] Create `src/components/portfolio/layout/site-header.tsx` — server component shell: wordmark from `site.wordmark`, primary nav placeholders (Work, Experience/Skills, Resume, Contact) labeled from `nav.*`, plus mount points/slots for the locale switcher, theme switcher, and Download CV action (filled in US2/US3/US4).
- [ ] T030 [US1] Create `src/components/portfolio/layout/site-footer.tsx` — name (`site.wordmark`), the four public contact links from `site.contactLinks` labeled via `contact.*`, and a copyright line from `footer.copyright` (needed for US1 parity render; exactness verified in US4).
- [ ] T031 [US1] Create `src/components/portfolio/layout/app-shell.tsx` composing `SkipToContent` + `SiteHeader` + `<main id="main-content" tabIndex={-1}>{children}</main>` + `SiteFooter` (FR-006, persistent wrap C2.10).
- [ ] T032 [US1] Update `src/lib/portfolio/metadata.ts` consumption so the stub `[locale]/page.tsx` (and layout) emit a basic per-route `<title>` via Next.js `metadata`/`generateMetadata` (no deep SEO; deferred to 006).
- [ ] T033 [P] [US1] Add integration test `tests/int/routing.int.spec.ts` asserting `routing` has `localeDetection:false`, `localePrefix:'always'`, `defaultLocale:'en'`, and `locales` is exactly `['en','uk']` (contract C1).
- [ ] T034 [P] [US1] Add e2e test `tests/e2e/foundation-routing.e2e.spec.ts`: `/` → `/en` redirect (C1.1); non-English `Accept-Language` still lands on `/en` (C1.2); `/en` and `/uk` render header+footer+`main` with correct `<html lang>` (C1.3–C1.4); unsupported `/xx` resolves predictably without breaking the shell (C1.6); `/admin` still loads (C1.7).

**Checkpoint**: Routing skeleton + shell render verified at `/en` and `/uk`; MVP foundation is reachable.

---

## Phase 4: User Story 2 — Visitor switches language without losing their place (Priority: P1)

**Goal**: The header switcher swaps locale while preserving the sub-path and visibly indicates the active language.

**Independent Test**: From `/en` and `/en/<sub-path>`, activate the switcher → land on `/uk` / `/uk/<sub-path>` with sub-path preserved; active language indicated.

### Implementation for User Story 2

- [ ] T035 [US2] Create `src/components/portfolio/layout/locale-switcher.tsx` (`"use client"`): use next-intl `usePathname`/`useRouter` from `src/i18n/navigation.ts` and `src/config/locales.ts` to swap the locale segment while preserving the sub-path; visibly mark the active locale (FR-011, FR-012).
- [ ] T036 [US2] Mount `LocaleSwitcher` into `src/components/portfolio/layout/site-header.tsx` (fill the switcher slot from T029).
- [ ] T037 [P] [US2] Add e2e test `tests/e2e/foundation-locale-switch.e2e.spec.ts`: switch `/en`→`/uk` (C3.1); switch on `/en/<sub-path>`→`/uk/<sub-path>` preserving sub-path (C3.2); active language indicated after switch (C3.3).

**Checkpoint**: Language switching preserves path and indicates active locale.

---

## Phase 5: User Story 3 — Visitor selects a comfortable theme that sticks (Priority: P1)

**Goal**: Theme switcher offers exactly four themes; selection applies via a single `data-theme`, persists across navigation/reload, and never flashes the wrong theme.

**Independent Test**: Open switcher → four named themes; pick a non-default → navigate + hard reload → persists; saved non-default theme shows no flash on first paint; corrupted value falls back to light.

### Implementation for User Story 3

- [ ] T038 [US3] Create `src/components/portfolio/layout/theme-switcher.tsx` (`"use client"`): use next-themes `useTheme` + `src/config/themes.ts`; render exactly four options with localized names from `themes.*`; indicate the active theme; rely on next-themes for persistence + pre-paint no-flash script (FR-013–FR-018, C4).
- [ ] T039 [US3] Mount `ThemeSwitcher` into `src/components/portfolio/layout/site-header.tsx` (fill the theme slot from T029); add a shadcn `dropdown-menu` primitive to `src/components/ui/` if used for the menu.
- [ ] T040 [P] [US3] Add integration test `tests/int/theme-config.int.spec.ts` asserting `themeIds` is exactly `['light','dark','warm','contrast']`, `defaultThemeId === 'light'`, and the globals token contract resolves `--radius: 0rem` across all four `[data-theme]` blocks (C4, C5.1, C5.4).
- [ ] T041 [P] [US3] Add e2e test `tests/e2e/foundation-theme.e2e.spec.ts`: default `data-theme="light"` with cleared storage (C4.1); exactly four options (C4.2); select non-default → reload persists (C4.3); no-flash check reading `html[data-theme]` immediately on load (C4.4); corrupted stored value → falls back to `light` (C4.6).

**Checkpoint**: Four-theme system persists with no flash and falls back safely.

---

## Phase 6: User Story 4 — Visitor navigates and contacts from the shell chrome (Priority: P2)

**Goal**: Header exposes wordmark, four nav placeholders, switchers, and a Download CV placeholder; footer exposes name, four public contact links, and copyright — all in the active language with EN/UK parity.

**Independent Test**: Inspect header for wordmark + four nav labels + switchers + Download CV; inspect footer for name + four public contact links + copyright; verify exact hrefs and zero private-repo references in both locales.

### Implementation for User Story 4

- [ ] T042 [US4] Add the Download CV action placeholder to `src/components/portfolio/layout/site-header.tsx` — present, labeled from `nav.downloadCv`, keyboard-focusable, non-functional this slice (FR-007, FR-008, C2.5); add a shadcn `button` primitive to `src/components/ui/` if needed.
- [ ] T043 [US4] Verify/finalize footer contact destinations in `src/components/portfolio/layout/site-footer.tsx` against the exact contract values in `src/config/site.ts`; ensure no phone/city and zero private-repo links (FR-009, FR-010, C2.6–C2.9, C8).
- [ ] T044 [P] [US4] Add integration test `tests/int/content-parity.int.spec.ts`: deep key-parity `keys(messages/en.json) === keys(messages/uk.json)` (C6.2, SC-009) and assert `contactLinks` contains zero `git@`/private-repo hrefs and matches the four exact public destinations (C8.1, SC-008).
- [ ] T045 [P] [US4] Add e2e test `tests/e2e/foundation-chrome.e2e.spec.ts`: header has wordmark + four nav labels + Download CV (C2.1–C2.5); footer has name + four contact links + copyright (C2.6–C2.8); each contact `href` matches the exact public destination in EN and UK (C2.9, C8).

**Checkpoint**: Chrome content is complete, public-safe, and at EN/UK parity.

---

## Phase 7: User Story 5 — Keyboard and assistive-technology user navigates the shell (Priority: P2)

**Goal**: Skip-to-content link is the first focusable element and moves focus to `#main-content`; all shell controls show a color-independent focus indicator; shell motion respects reduced-motion.

**Independent Test**: Tab once → skip link appears first → activate → focus on `#main-content`; tab through controls → visible, non-color-only focus ring; with reduced-motion on, theme/shell transitions are not animated.

### Implementation for User Story 5

- [ ] T046 [US5] Finalize `src/components/portfolio/layout/skip-to-content.tsx`: visually hidden until focused, labeled from `a11y.skipToContent`, targets `#main-content`, and ensure `<main id="main-content" tabIndex={-1}>` in `app-shell.tsx` receives programmatic focus on activation (FR-026, C7.1–C7.2).
- [ ] T047 [US5] Add the global `:focus-visible` outline (using `--ring` + non-color cue: outline width/offset) and the `@media (prefers-reduced-motion: reduce)` block neutralizing shell transitions in `src/app/(frontend)/globals.css` (FR-027, FR-028, C7.3–C7.4). Consult `modern-web-guidance` before implementing.
- [ ] T048 [P] [US5] Add e2e test `tests/e2e/foundation-a11y.e2e.spec.ts`: Tab once reveals skip link as first focusable (C7.1); activating moves focus to `#main-content` (C7.2); shell controls show a visible focus indicator (C7.3).

**Checkpoint**: Skip link, color-independent focus, and reduced-motion verified.

---

## Phase 8: User Story 6 — Visitor uses the shell on a small screen (Priority: P2)

**Goal**: Mobile-first shell with a mobile nav treatment at ~375px, adapting through tablet to a desktop layout capped at a max content width with no horizontal overflow.

**Independent Test**: Render at ~375px (mobile nav, no overflow), tablet (adapts), and wide desktop (content capped at 1440px, not edge-to-edge).

### Implementation for User Story 6

- [ ] T049 [US6] Make `src/components/portfolio/layout/site-header.tsx` mobile-first: base ~375px collapses primary nav into a toggle/`Sheet` drawer (add shadcn `sheet` primitive to `src/components/ui/`) with `nav.openMenu`/`nav.closeMenu` labels; locale + theme switchers remain reachable at mobile; scale up with `md:`/`lg:` prefixes (FR-029, FR-030, C7.5).
- [ ] T050 [US6] Add a max-width container (cap `max-w-[1440px]`, page margins 20px mobile / 64px desktop per DESIGN.md) in `src/components/portfolio/layout/app-shell.tsx` so header/main/footer content never stretches edge-to-edge beyond the bound (FR-030, C7.7).
- [ ] T051 [US6] Ensure `src/components/portfolio/layout/site-footer.tsx` reflows readably at ~375px with no horizontal overflow (FR-030, C7.5).
- [ ] T052 [P] [US6] Add e2e test `tests/e2e/foundation-responsive.e2e.spec.ts` exercising the viewport matrix 375 / 768 / 1440: mobile nav treatment + no horizontal overflow (C7.5), tablet adaptation (C7.6), desktop max-width cap (C7.7).

**Checkpoint**: Shell is usable and correctly laid out across mobile/tablet/desktop.

---

## Phase 9: Polish, Test Migration & Validation

**Purpose**: Migrate remaining legacy tests, run the quickstart validation matrix, and gate on lint + build.

- [ ] T053 Rewrite or remove the parked legacy specs from T007 (`tests/e2e/homepage.e2e.spec.ts`, `tests/e2e/portfolio-case.e2e.spec.ts`, `tests/e2e/resume.e2e.spec.ts`, `tests/e2e/frontend.e2e.spec.ts`) so they target the new `[locale]` shell (or are folded into the Phase 3–8 foundation specs); keep the suite green with no references to removed `[lang]` routes.
- [ ] T054 [P] Update legacy integration specs `tests/int/content.int.spec.ts`, `tests/int/metadata.int.spec.ts`, and `tests/int/api.int.spec.ts` for the migrated content/helper shapes and `[locale]` routes (stub gracefully where page bodies are deferred); confirm `tests/int/api.int.spec.ts` Payload coverage still passes.
- [ ] T055 Run quickstart manual validation ([quickstart.md](./quickstart.md)) covering SC-001..SC-010: `/`→`/en` (SC-001), EN/UK same shell (SC-002), locale switch preserves sub-path (SC-003), four themes + persistence (SC-004), no theme flash per theme (SC-005), responsive no-overflow (SC-006), skip-link + color-independent focus (SC-007), public contact links / no private repo (SC-008), full EN/UK key parity (SC-009), only shell + stubs ship (SC-010).
- [ ] T056 Public-safety + DESIGN.md review: confirm no private repos / corporate code / internal client info anywhere in the shell, brand `--accent` (`#ff4f00`) only backs `--primary`/high-signal (not shadcn hover surfaces), `--radius` is `0rem`, fonts are Geist + JetBrains Mono (C5.5, C8, DESIGN.md).
- [ ] T057 Gate: run `pnpm lint` and fix all reported issues.
- [ ] T058 Gate: run `pnpm build` and resolve any type/build errors (depends on T057).
- [ ] T059 Run `pnpm test:int` and `pnpm test:e2e`; ensure the full suite (foundation + migrated legacy) is green.
- [ ] T060 Update `.agents/docs/release-plan.md` to mark `002-foundation` complete and point to what is next (`003-homepage`), per the Definition of Done in [quickstart.md](./quickstart.md).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Cleanup)**: Start immediately. T001–T002 (migrate data/helpers) MUST precede the deletions T003–T007.
- **Phase 1 (Setup)**: After Phase 0. T008 → T009 → T010.
- **Phase 2 (Foundational)**: After Phase 1. BLOCKS all user stories. (T015 depends on T009; T016 depends on T015; T017/T020 share `themes.ts`; T024 depends on T022.)
- **Phase 3 (US1, P1)**: After Phase 2. Builds the renderable shell (layout, page, app-shell, header/footer/skip-link skeletons).
- **Phase 4 (US2, P1)** & **Phase 5 (US3, P1)**: After Phase 3 (both mount into `site-header.tsx` from T029). Can run in parallel if the header slot edits are coordinated.
- **Phase 6 (US4, P2)**: After Phase 3 (refines header/footer content); benefits from US2/US3 being mounted.
- **Phase 7 (US5, P2)**: After Phase 3 (needs `app-shell` + `skip-to-content`); T047 edits the same `globals.css` as T015/T016.
- **Phase 8 (US6, P2)**: After Phase 3 (responsive treatment of header/footer/app-shell).
- **Phase 9 (Polish/Validation)**: After all desired user stories. T058 depends on T057; T059 after T053–T054.

### User Story Dependencies

- **US1 (P1)**: Foundational only — no dependency on other stories (the MVP increment).
- **US2 (P1)**, **US3 (P1)**: Depend on US1's `site-header.tsx` slots; independently testable behaviors.
- **US4 (P2)**: Depends on US1 chrome; verifies/refines content and parity.
- **US5 (P2)**: Depends on US1 `app-shell`/`skip-to-content`.
- **US6 (P2)**: Depends on US1 chrome; mobile-first responsive layer.

### Parallel Opportunities

- Phase 0: T001 ∥ T002, then T004 ∥ T005 (different folders).
- Phase 2: T011 ∥ T012 ∥ T013 (i18n files), T017 ∥ T018, T019 ∥ T020 ∥ T021 ∥ T022 ∥ T023 (registries + messages, different files).
- Test tasks across stories are `[P]` (separate spec files): T033 ∥ T034, T037, T040 ∥ T041, T044 ∥ T045, T048, T052.

---

## Implementation Strategy

- **MVP scope = User Story 1 (Phase 0 → 1 → 2 → 3).** Delivers `/`→`/en` redirect and a renderable, EN/UK-parity shell — the substrate every later slice sits on.
- **Incremental delivery**: layer US2 (locale switch) and US3 (theme) onto the MVP header, then US4 (chrome correctness), US5 (a11y), US6 (responsive). Each phase ends at a verifiable checkpoint.
- **Restart discipline**: per constitution + research D12, the old visual layer is deleted (Phase 0), not extended; only typed data + helpers migrate forward.
- **Gates**: finish on `pnpm lint` + `pnpm build` green and the quickstart SC-001..SC-010 matrix passing.
