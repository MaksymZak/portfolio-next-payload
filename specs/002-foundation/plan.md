# Implementation Plan: Foundation (App Shell & Infrastructure)

**Branch**: `002-foundation` | **Date**: 2026-06-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-foundation/spec.md`

**Note**: This plan was produced by the `/speckit.plan` workflow. It governs the first slice of a full
visual/architecture restart and supersedes the previous `.portfolio-*` custom-CSS shell.

## Summary

Build the localized application shell and styling/i18n/theming foundation that every later page will sit on —
and **only** that. The slice delivers: a `next-intl` locale-prefixed routing skeleton (`/en`, `/uk`, `/` → `/en`,
no auto-detection), a persistent localized header + footer wrapping a stub `main`, a four-theme `next-themes`
system (`light` default, `dark`, `warm`, `contrast`) on `data-theme` with no flash, the `DESIGN.md` token
contract encoded as CSS variables for all four themes and exposed to Tailwind 4 via `@theme inline`, `shadcn/ui`
initialized with its semantic variables mapped from those tokens (not a second palette), a typed shell-string
content layer at full EN/UK parity, a skip-to-content link with color-independent focus, and a mobile-first
responsive shell verified at ~375px / tablet / desktop within a 1440px max width. No page-body content ships.

The previous hand-written `.portfolio-*` CSS in `src/app/(frontend)/styles.css` and the
`src/components/portfolio/sections/*` and `src/app/(frontend)/[lang]/*` trees are **removed/replaced**, not
extended. Only typed data primitives and helper logic (locales, themes, contact channels, route/metadata helpers)
are migrated forward.

## Technical Context

**Language/Version**: TypeScript 5.7 (strict), React 19.2, Next.js 16.2 (App Router).

**Primary Dependencies** (locked by constitution v1.2.0 → "Mandatory Technical Stack"):

- **Routing/i18n**: `next-intl` (App Router: `defineRouting`, middleware, `getRequestConfig`, `createNavigation`).
- **Theming**: `next-themes` (`attribute="data-theme"`, custom `themes`, `defaultTheme="light"`, `enableSystem={false}`).
- **Styling**: Tailwind CSS 4 (CSS-first, `@theme inline`), `@tailwindcss/postcss` (already installed).
- **Component primitives**: `shadcn/ui` (Radix base) via `components.json`, `cssVariables: true`, `baseColor: neutral`.
- **Icons**: `lucide-react`. **Class utilities**: `clsx` + `tailwind-merge` (`cn`) + `class-variance-authority`.
- **Fonts**: `next/font/google` — `Geist` (`--font-sans`) + `JetBrains_Mono` (`--font-mono`).
- **CMS**: Payload 3.85 stays admin-only under `(payload)`; it is NOT a runtime content source for the shell.

**Storage**: None at runtime for this slice. Shell strings come from the typed content layer / `next-intl`
messages in code. Theme preference persists in `localStorage` (managed entirely by `next-themes`). Postgres +
Payload remain installed for admin only.

**Testing**: Vitest (`tests/int`) for content parity + routing/theming config invariants; Playwright (`tests/e2e`)
for redirect, locale switch, theme persistence/no-flash, skip-link focus, and mobile/tablet/desktop layout.

**Target Platform**: Web (Vercel deployment target); modern evergreen browsers; mobile-first from ~375px.

**Project Type**: Web application (Next.js App Router single app with `(frontend)` + `(payload)` route groups).

**Performance Goals**: Recruiter scan speed first. No theme flash on first paint; shell is static-renderable
(`generateStaticParams` + `setRequestLocale`); restrained motion honoring `prefers-reduced-motion`.

**Constraints**: Locale prefix ALWAYS present; default `en`; NO automatic locale detection. `--radius` = `0rem`
across all four themes. `--accent` (`#ff4f00`) reserved for primary/active/high-signal only — it MUST NOT leak
into shadcn hover surfaces (`--accent`/`--secondary` map to neutral `surface-muted`, not the brand orange).
Footer exposes public channels only (email, Telegram, LinkedIn, GitHub); phone + city are resume-only.

**Scale/Scope**: 2 locales, 4 themes, 1 shell (header/footer/skip-link/main), N stub localized routes. No page bodies.

### Documentation consulted (Context7 MCP — constitution principle VII)

| Library        | Context7 ID                                         | Snippets used in this plan                                                                                                                                                                                                                                                                          |
| -------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| next-intl      | `/websites/next-intl_dev` (alt `/amannn/next-intl`) | `defineRouting` (locales `['en','uk']`, `defaultLocale 'en'`, `localePrefix 'always'`); `[locale]` layout with `hasLocale` + `notFound()`; `setRequestLocale` for static rendering; `generateStaticParams` returning `routing.locales`                                                              |
| next-themes    | `/pacocoursey/next-themes`                          | `ThemeProvider attribute="data-theme"`; `themes={['light','dark','warm','contrast']}` + `defaultTheme="light"`; `enableSystem={false}` ⇒ default falls back to `light`; `suppressHydrationWarning` on `<html>`; `disableTransitionOnChange`; injected pre-paint script prevents flash; `storageKey` |
| shadcn/ui      | `/websites/ui_shadcn`                               | `components.json` `tailwind.cssVariables: true` (semantic tokens, cannot change post-init); Tailwind v4 `@theme inline { --color-*: var(--*) }` mapping; `--radius-*` derived from `--radius`; `@layer base` applying `bg-background text-foreground`                                               |
| Tailwind CSS 4 | (covered via shadcn theming doc above)              | CSS-first `@import "tailwindcss"` + `@theme inline` exposes the token contract as utilities (`bg-background`, `text-muted-foreground`, `border-border`, `ring-ring`)                                                                                                                                |

### Skills consulted (constitution principle VI)

- `.agents/skills/shadcn/SKILL.md` — token-mapping rules, `@theme inline` for Tailwind v4, semantic colors only
  (`bg-primary`, `text-muted-foreground`), `cn()` usage, `gap-*` over `space-*`, `size-*`, icons via `data-icon`,
  `isRSC` ⇒ `"use client"` for theme/locale switchers, never invent a second palette.
- `.agents/skills/frontend-design/SKILL.md` — Swiss Technical Editorial polish, restraint, hierarchy.
- `.agents/skills/modern-web-guidance/SKILL.md` — run `npx -y modern-web-guidance@latest search "<query>"` before
  implementing skip-link/focus-visible, dropdown menus, and reduced-motion patterns during `/speckit.implement`.
- `.agents/skills/vercel-react-best-practices/SKILL.md` — keep switchers as small client islands; Server Components
  for the static shell; avoid unnecessary client state (no Zustand).

## Constitution Check

_GATE: evaluated before Phase 0 and re-confirmed after Phase 1 design. Result: PASS (no violations)._

- **Hiring Outcome Fit** — PASS. The shell is the unavoidable substrate for every recruiter-facing page; getting
  routing, bilingual chrome, theming, tokens, and accessibility right once prevents costly per-page retrofits and
  keeps later slices fast. No non-foundation work is added.
- **Public-Safe Honesty** — PASS. Footer surfaces only public channels (email, Telegram, LinkedIn, GitHub) and a
  wordmark/copyright; no private repos, corporate code, or internal client info. Nav entries + Download CV are
  honest placeholders, clearly "coming next", wired in later slices. Phone/city deferred to resume.
- **Bilingual Parity** — PASS. Every shell string (nav, footer, contact labels, theme names, skip/switcher labels)
  exists for `en` and `uk` at full key parity; an integration test asserts identical key sets. Russian out of scope.
- **Design Contract** — PASS. `DESIGN.md` is the single visual source: four `data-theme` token blocks copied
  verbatim, `--radius: 0rem`, single accent reserved for high-signal UI, mono labels (JetBrains Mono), Geist sans,
  restrained motion with `prefers-reduced-motion`. shadcn semantic vars mapped from the token contract.
- **Mobile-First & Stack Compliance** — PASS. Base styles target ~375px and scale up with Tailwind prefixes
  (`md:`, `lg:`); header uses a mobile nav treatment; content capped at 1440px. Stack is exactly Next.js 16 +
  React 19 + TS, Tailwind 4, shadcn/ui, next-intl, next-themes, lucide-react, `cn`/`cva`; no Zustand. The old
  `.portfolio-*` class system is deleted, not reintroduced.
- **Small, Verifiable Slices** — PASS. Work is broken into independently testable increments (deps/init → tokens →
  i18n → theming → shell chrome → a11y/responsive → cleanup), each with explicit validation, and
  `.agents/docs/release-plan.md` is updated when status changes. No external (v0.dev) chrome is committed without
  refactor to project structure, tokens, i18n, and a11y.
- **Agent Skills & Documentation** — PASS. Context7 IDs and skill paths are recorded above and reused at task time.

## Project Structure

### Documentation (this feature)

```text
specs/002-foundation/
├── plan.md              # This file
├── research.md          # Phase 0: decisions + Context7 citations
├── data-model.md        # Phase 1: Locale, Theme, ShellStringSet, ContactLink, DesignToken + typed layer shape
├── quickstart.md        # Phase 1: runnable validation guide
├── contracts/
│   └── shell-foundation-contract.md   # Phase 1: routing/shell/theming/token/a11y behavioral contract
├── spec.md              # Feature specification (input)
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root) — target layout for this slice

```text
messages/
├── en.json                          # next-intl messages: shell chrome strings (EN)
└── uk.json                          # next-intl messages: shell chrome strings (UK) — full key parity

components.json                      # shadcn/ui config (Tailwind v4, cssVariables: true, baseColor neutral, aliases)

src/
├── middleware.ts                    # next-intl middleware: locale prefix always, NO detection, `/` → `/en`; matcher excludes admin/api/_next/files
├── i18n/
│   ├── routing.ts                   # defineRouting({ locales:['en','uk'], defaultLocale:'en', localePrefix:'always', localeDetection:false })
│   ├── request.ts                   # getRequestConfig: validate locale, load `messages/${locale}.json`
│   └── navigation.ts                # createNavigation(routing) → Link, redirect, usePathname, useRouter, getPathname
├── config/
│   ├── locales.ts                   # Locale registry (code, label, isDefault) — derived from routing
│   ├── themes.ts                    # Theme registry: 4 themes (id, nameKey, isDefault) — single source for switcher + provider
│   ├── site.ts                      # Public contact channels (type, href), wordmark, copyright owner — locale-agnostic config
│   ├── env.ts                       # (existing) environment mapping
│   └── collections/                 # (existing) Payload collections — unchanged
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx               # Thin passthrough root for the group (returns children; no <html>)
│   │   ├── globals.css              # RENAMED from styles.css: @import "tailwindcss"; @theme inline mapping; 4× [data-theme] token blocks; reduced-motion; focus-visible base
│   │   └── [locale]/
│   │       ├── layout.tsx           # Renders <html lang={locale} suppressHydrationWarning> + fonts + <body>; ThemeProvider; NextIntlClientProvider; AppShell; setRequestLocale; hasLocale guard; generateStaticParams
│   │       └── page.tsx             # Stub localized home: empty/stub <main> only (no page body)
│   └── (payload)/                   # (existing) admin shell + API routes — UNCHANGED
├── components/
│   ├── ui/                          # shadcn primitives added on demand (button, dropdown-menu, ...)
│   ├── theme-provider.tsx           # "use client" wrapper around next-themes ThemeProvider
│   └── portfolio/
│       └── layout/                  # NEW shell chrome (replaces old sections/* visual layer)
│           ├── app-shell.tsx        # Composes skip-link + site-header + <main id="main-content"> + site-footer
│           ├── site-header.tsx      # Wordmark, nav placeholders (Work/Experience-Skills/Resume/Contact), locale + theme switchers, Download CV placeholder, mobile nav (Sheet)
│           ├── site-footer.tsx      # Name, public contact links, copyright line
│           ├── skip-to-content.tsx  # First focusable element → focuses #main-content
│           ├── locale-switcher.tsx  # "use client"; next-intl usePathname/useRouter; preserves sub-path, swaps locale
│           └── theme-switcher.tsx   # "use client"; next-themes useTheme; exactly 4 options; active indicated
├── content/
│   └── portfolio/                   # Typed page content (types kept; page bodies DEFERRED, may remain stubs)
└── lib/
    ├── cn.ts                        # cn = twMerge(clsx(...)) helper
    └── portfolio/                   # Migrated helpers: routes (now /[locale]), metadata, theme constants

tests/
├── int/                             # content parity, routing/theme config invariants, token presence
└── e2e/                             # redirect, locale switch, theme persistence/no-flash, skip-link, responsive
```

**Structure Decision**: Single Next.js App Router application (Project Type: web). The public site lives in the
`src/app/(frontend)` route group and is fully localized under a `[locale]` segment driven by `next-intl`
middleware; Payload stays isolated in `src/app/(payload)`. `next-intl` config is centralized in `src/i18n/*`,
locale/theme/contact registries in `src/config/*`, the shell chrome in `src/components/portfolio/layout/*`, shadcn
primitives in `src/components/ui/*`, and the global token contract in `src/app/(frontend)/globals.css`. This
supersedes the old `src/app/(frontend)/[lang]/*` routes and the `.portfolio-*` CSS in `styles.css`.

## Complexity Tracking

No constitution violations — table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| (none)    | —          | —                                    |
