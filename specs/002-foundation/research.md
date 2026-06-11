# Phase 0 Research: Foundation (App Shell & Infrastructure)

**Feature**: `002-foundation` | **Date**: 2026-06-09

All NEEDS CLARIFICATION items from Technical Context are resolved below. Each decision records rationale,
alternatives considered, and the authoritative source (Context7 MCP library ID or project skill) consulted per
constitution principles VI and VII.

---

## D1. Internationalized routing approach

- **Decision**: Use `next-intl` with a centralized `defineRouting` (`src/i18n/routing.ts`), middleware
  (`src/middleware.ts`), `getRequestConfig` (`src/i18n/request.ts`), and `createNavigation` (`src/i18n/navigation.ts`).
  Configure `locales: ['en','uk']`, `defaultLocale: 'en'`, `localePrefix: 'always'`, and `localeDetection: false`.
  The bare `/` is redirected to `/en` by the middleware (default behavior when `localePrefix: 'always'`).
- **Rationale**: Locked by the constitution's Mandatory Technical Stack ("locale path prefix ALWAYS present, default
  `en`, automatic locale detection MUST be disabled"). `defineRouting` is the single source the middleware,
  navigation helpers, and `generateStaticParams` all read, preventing config drift. Satisfies FR-001..FR-005, FR-011.
- **Alternatives considered**: (a) Next.js built-in i18n routing — removed in App Router, not viable. (b) Hand-rolled
  `[lang]` segment + manual redirect (the previous approach in `src/app/(frontend)/[lang]/*`) — rejected: not
  stack-compliant, duplicates locale logic, and lacks type-safe navigation/message loading.
- **Source**: Context7 `/websites/next-intl_dev` — `defineRouting`, `localePrefix: 'always'`, `[locale]` layout with
  `hasLocale` + `notFound()`, `setRequestLocale`, `generateStaticParams`.

## D2. Disabling automatic locale detection + `/` redirect

- **Decision**: Set `localeDetection: false` in `defineRouting`. Keep `localePrefix: 'always'` so `/` deterministically
  redirects to `/en` regardless of the `Accept-Language` header.
- **Rationale**: FR-002 and acceptance scenario US1.5 require non-default browser languages to still land on `/en`.
  Disabling detection makes the entry route fully predictable and testable (SC-001: 100% of `/` visits end on `/en`).
- **Alternatives considered**: Cookie/header negotiation — rejected as it contradicts the spec and adds nondeterminism.
- **Source**: Context7 `/websites/next-intl_dev` routing configuration; constitution Mandatory Technical Stack.

## D3. Middleware matcher (coexistence with Payload)

- **Decision**: Apply the `next-intl` middleware only to public routes. Matcher excludes `admin`, `api`, `_next`,
  Next internals, and any path containing a file extension; explicitly include `/` so the root redirect fires.
  Example matcher: `['/', '/((?!api|admin|_next|_vercel|.*\\..*).*)']`.
- **Rationale**: Payload owns `/admin` and `/api/*` under the `(payload)` group; the i18n middleware must not rewrite
  or redirect those, or the admin/API would break. FR-005 still requires unbuilt localized paths to render the shell.
- **Alternatives considered**: Running middleware on everything then early-returning for admin/api — more error-prone
  than a precise matcher.
- **Source**: Context7 `/websites/next-intl_dev` (middleware setup); existing `src/app/(payload)/api/*` structure.

## D4. Root layout / `<html>` ownership with route groups

- **Decision**: Render `<html lang={locale} suppressHydrationWarning>` and `<body>` inside
  `src/app/(frontend)/[locale]/layout.tsx` (where the locale is known). Convert `src/app/(frontend)/layout.tsx` into a
  thin passthrough that returns `children` (and is the place the group can host shared, locale-agnostic concerns).
  The `[locale]` layout calls `setRequestLocale(locale)`, guards with `hasLocale(routing.locales, locale)` → `notFound()`,
  exports `generateStaticParams`, loads fonts, and wraps children with `ThemeProvider` then `NextIntlClientProvider`
  then `AppShell`.
- **Rationale**: `lang` must reflect the active locale for accessibility and correct font shaping; that value only
  exists at the `[locale]` level. `setRequestLocale` enables static rendering; the `hasLocale` guard makes unknown
  locale segments resolve as not-found (edge case "unknown locale segment"). Global CSS is imported once.
- **Alternatives considered**: Keeping `<html>` in the group root `(frontend)/layout.tsx` (previous approach) — it
  cannot read the `[locale]` param, so `lang` and locale would be wrong/duplicated. Rejected.
- **Source**: Context7 `/websites/next-intl_dev` (App Router layout + `setRequestLocale` + `generateStaticParams`).

## D5. Theming engine, four themes, and flash prevention

- **Decision**: Use `next-themes` `ThemeProvider` (in a `"use client"` wrapper `src/components/theme-provider.tsx`)
  with `attribute="data-theme"`, `themes={['light','dark','warm','contrast']}`, `defaultTheme="light"`,
  `enableSystem={false}`, `disableTransitionOnChange`. Put `suppressHydrationWarning` on `<html>`. Persistence and the
  pre-paint inline script are handled by `next-themes`; no manual `localStorage`/`document.documentElement` code.
- **Rationale**: Matches `DESIGN.md` (`data-theme`, four schemes, default `light`) and FR-013..FR-018. With
  `enableSystem={false}`, next-themes' documented default theme is `light`, satisfying FR-016. The injected script sets
  `data-theme` before first paint, preventing the flash (FR-018, SC-005). An unrecognized stored value is ignored and
  the provider falls back to the default, satisfying FR-017 (corrupted-theme edge case). `disableTransitionOnChange`
  keeps theme switching immediate and stable per `DESIGN.md`.
- **Alternatives considered**: (a) The existing hand-written `applyPortfolioTheme` + custom event + manual
  `localStorage` in `src/lib/portfolio/theme.ts` — rejected: duplicates next-themes, risks flash, not stack-compliant;
  its theme constants are migrated but the imperative apply/persist logic is dropped. (b) Zustand for theme state —
  explicitly forbidden by the constitution for MVP1.
- **Source**: Context7 `/pacocoursey/next-themes` (`attribute="data-theme"`, custom `themes`, `enableSystem={false}` ⇒
  default `light`, `suppressHydrationWarning`, `disableTransitionOnChange`, `storageKey`).

## D6. Token contract in code + Tailwind 4 exposure

- **Decision**: Define the `DESIGN.md` token contract as CSS variables in `src/app/(frontend)/globals.css` under four
  `[data-theme='...']` selector blocks (values copied verbatim from `DESIGN.md`), with `[data-theme='light']` doubling
  as `:root` defaults. Expose tokens to Tailwind 4 via a single `@theme inline { --color-*: var(--*); ... }` block so
  utilities (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`) resolve from
  tokens. Map `--radius` and derive `--radius-sm/md/lg` from it (all collapse to `0rem`).
- **Rationale**: FR-019..FR-022 require all four themes' tokens present, exposed to the styling system, with
  `--radius: 0rem`. Tailwind v4 is CSS-first; `@theme inline` is the documented mechanism to surface CSS variables as
  utility-backed tokens. Keeping one global file (the shadcn `tailwindCssFile`) avoids a second palette.
- **Alternatives considered**: Per-component CSS or a JS theme object — rejected (re-creates the banned `.portfolio-*`
  system and a parallel palette). Tailwind v3 `tailwind.config.js` — not the installed/locked version.
- **Source**: Context7 `/websites/ui_shadcn` (Tailwind v4 `@theme inline` mapping, `@layer base` applying
  `bg-background text-foreground`); `DESIGN.md` theme token blocks; skill `.agents/skills/shadcn/SKILL.md`.

## D7. shadcn/ui initialization and semantic-variable mapping

- **Decision**: Initialize shadcn via `components.json` with `style` (project default), `rsc: true`,
  `tailwind.cssVariables: true`, `baseColor: "neutral"`, `tailwind.css: "src/app/(frontend)/globals.css"`,
  `iconLibrary: "lucide"`, and aliases (`@/components`, `@/components/ui`, `@/lib`, `cn` at `@/lib/cn`). Map shadcn
  semantic variables FROM the `DESIGN.md` tokens, not a new palette:
  `--background→background`, `--foreground→foreground`, `--card→surface`, `--card-foreground→foreground`,
  `--popover→surface`, `--popover-foreground→foreground`, `--primary→accent`, `--primary-foreground→accent-foreground`,
  `--secondary→surface-muted`, `--secondary-foreground→foreground`, `--muted→muted`, `--muted-foreground→muted-foreground`,
  `--accent (shadcn)→surface-muted`, `--accent-foreground→foreground`, `--border→border`, `--input→border`,
  `--ring→ring`, `--radius→radius` (`0rem`). A `--destructive` value is added (neutral-safe red) since the token
  contract has none.
- **Rationale**: FR-021 mandates shadcn semantic vars mapped from the token contract, not a second independent palette.
  Critically, shadcn's own `--accent`/`--secondary` are hover/muted SURFACES — they map to neutral `surface-muted`, NOT
  the brand `#ff4f00` (which maps only to `--primary`). This keeps the accent rare per `DESIGN.md`. `cssVariables: true`
  cannot be changed after init, so it is fixed up front.
- **Alternatives considered**: shadcn default OKLCH neutral palette as-is — rejected: it would be a second palette and
  ignore `DESIGN.md`. Mapping brand orange onto shadcn `--accent` — rejected: would scatter orange across hover states.
- **Source**: Context7 `/websites/ui_shadcn` (`components.json` `cssVariables`, `@theme inline`, mapping example);
  `DESIGN.md` "Implementation Notes" mapping; skill `.agents/skills/shadcn/SKILL.md` (semantic colors only).

## D8. Typed shell-string content layer (and its boundary with page content)

- **Decision**: Hold translatable shell chrome strings (nav labels, footer labels, contact link labels, theme names,
  skip-to-content label, switcher labels) in `next-intl` messages: `messages/en.json` + `messages/uk.json`, organized
  under stable namespaces (e.g. `nav`, `footer`, `contact`, `themes`, `a11y`). Make them type-safe via a `Messages`
  global augmentation keyed off the EN file. Hold NON-translatable structured config (public contact destinations/URLs,
  theme registry, locale registry, wordmark, copyright owner) in typed TS modules under `src/config/*`. Real page
  content stays in `src/content/portfolio/*` (typed; bodies deferred, may remain stubs).
- **Rationale**: FR-023..FR-025 require typed shell strings at full EN/UK parity while real page modules may be stubs.
  `next-intl` messages with type augmentation are first-class and type-checked, and pairing them with `src/config`
  structured data keeps URLs locale-agnostic (one source of truth for the public channels) while labels stay localized.
  This is the idiomatic next-intl pattern and satisfies "typed code modules" + parity (SC-009).
- **Alternatives considered**: Pure TS string maps with no next-intl (would fight the chosen i18n engine and lose
  `useTranslations`/server access). Putting URLs in messages (duplicating identical destinations across locales,
  risking drift). Both rejected.
- **Source**: Context7 `/websites/next-intl_dev` (messages + `getRequestConfig`); existing typed primitives in
  `src/content/portfolio/types.ts` (`ContactMethod`, `ThemeOption`, `PortfolioLocale`, `PortfolioThemeId`) migrated.

## D9. Fonts (Geist + JetBrains Mono) and Cyrillic coverage

- **Decision**: Load `Geist` (`--font-sans`) and `JetBrains_Mono` (`--font-mono`) via `next/font/google` with
  `display: 'swap'` and `variable` set; reference them on `<html className>`. Replace the current `Inter` usage in
  `src/app/(frontend)/layout.tsx` with `Geist` per `DESIGN.md`.
- **Rationale**: `DESIGN.md` mandates Geist (sans) + JetBrains Mono (mono) exposed as `--font-sans`/`--font-mono`.
  JetBrains Mono provides Cyrillic, covering UK mono labels. Geist's primary subset is Latin; UK body/heading text in
  Geist will use the platform Cyrillic fallback. This is acceptable for the foundation slice (shell strings are short),
  is flagged here, and is revisited if UK rendering looks poor (no scope change for 002).
- **Alternatives considered**: Swapping sans to a Cyrillic-complete grotesk — rejected: contradicts the locked
  `DESIGN.md` font choice; would need a constitution/DESIGN amendment.
- **Source**: `DESIGN.md` Typography; `next/font` (bundled Next.js 16 docs in `node_modules/next/dist/docs/`).

## D10. Accessibility primitives (skip link, focus, reduced motion)

- **Decision**: Render a skip-to-content link as the first focusable element in `app-shell.tsx`, visually hidden until
  focused, targeting `#main-content` (the `<main>` element, made focusable for programmatic focus). Provide a global
  `:focus-visible` outline using `--ring` plus a non-color cue (outline width/offset), and a global
  `@media (prefers-reduced-motion: reduce)` block that neutralizes shell transitions (including theme change).
- **Rationale**: FR-026..FR-028, SC-007. Color-independent focus and reduced-motion are constitutional accessibility
  baselines. Implementing them once in the shell guarantees inheritance by later pages.
- **Alternatives considered**: Per-control focus styles — rejected as inconsistent and harder to audit.
- **Source**: Skill `.agents/skills/modern-web-guidance/SKILL.md` (run `search` for skip-link/focus-visible/reduced-motion
  guides at implement time); `DESIGN.md` Accessibility Requirements.

## D11. Mobile-first responsive shell + mobile nav treatment

- **Decision**: Author all shell styles mobile-first (base ~375px) and scale up with Tailwind prefixes. On mobile the
  header collapses primary nav into a toggle/`Sheet` (shadcn) drawer; the locale and theme switchers remain reachable;
  content is wrapped in a container capped at `max-w-[1440px]` with `DESIGN.md` page margins (20px mobile, 64px desktop).
- **Rationale**: FR-029, FR-030, SC-006 and the constitution's mobile-first mandate. Verified at mobile/tablet/desktop.
- **Alternatives considered**: Desktop-first with `max-*:` overrides — explicitly forbidden by the constitution.
- **Source**: `DESIGN.md` Layout And Spacing; skills `frontend-design`, `vercel-react-best-practices`.

## D12. Migration vs. removal of existing code

- **Decision**: **Remove/replace** `src/app/(frontend)/[lang]/*`, `src/components/portfolio/sections/*`,
  `src/components/portfolio/theme/*`, `src/components/portfolio/ui/*`, and the `.portfolio-*` rules in
  `src/app/(frontend)/styles.css` (file becomes `globals.css` with only the token contract + Tailwind import).
  **Migrate forward** the typed data + helper logic: `src/content/portfolio/*` (types + EN/UK data), and from
  `src/lib/portfolio/*` the route helpers (re-pointed to `/[locale]`), metadata helpers, and theme/locale constants
  (dropping the imperative `applyPortfolioTheme`/manual-localStorage logic superseded by next-themes).
- **Rationale**: Constitution forbids reintroducing bespoke component CSS; the restart replaces the visual layer while
  preserving honest, already-authored content/data and routing helpers to avoid rework and keep EN/UK parity.
- **Alternatives considered**: Extending the old shell — rejected (not mobile-first, not Tailwind/shadcn, banned CSS).
- **Source**: Constitution Mandatory Technical Stack + principle V; user restart directive.

---

## Resolved unknowns summary

| Technical Context item  | Resolution                                                                    |
| ----------------------- | ----------------------------------------------------------------------------- |
| i18n engine + config    | next-intl, `defineRouting` (D1), detection off + `/`→`/en` (D2), matcher (D3) |
| Root layout/`<html>`    | rendered in `[locale]/layout.tsx`; group root is passthrough (D4)             |
| Theme engine + flash    | next-themes `data-theme`, 4 themes, default light, no-flash script (D5)       |
| Token contract exposure | globals.css `[data-theme]` blocks + Tailwind `@theme inline` (D6)             |
| shadcn mapping          | from DESIGN tokens; brand accent → `--primary` only (D7)                      |
| Typed shell strings     | next-intl messages (typed) + `src/config` structured data (D8)                |
| Fonts / Cyrillic        | Geist + JetBrains Mono; Geist Latin, system Cyrillic fallback (D9)            |
| Accessibility           | skip link, color-independent focus, reduced motion (D10)                      |
| Responsive              | mobile-first, mobile nav Sheet, 1440px cap (D11)                              |
| Old code                | remove visual layer; migrate data + helpers (D12)                             |
