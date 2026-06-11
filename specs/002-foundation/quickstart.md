# Quickstart & Validation: Foundation (App Shell & Infrastructure)

**Feature**: `002-foundation` | **Date**: 2026-06-09

A runnable guide to verify the foundation slice end-to-end. It references the behavioral
[shell-foundation-contract.md](./contracts/shell-foundation-contract.md), [data-model.md](./data-model.md), and
[plan.md](./plan.md) instead of duplicating implementation. Implementation details belong in `tasks.md` and the
`/speckit.implement` phase.

## Prerequisites

- Node `>=20.9`, pnpm `^9 || ^10` (see `package.json` engines).
- `test.env` present; Postgres reachable for Payload admin (not required for shell rendering).
- Dependencies installed (this slice adds `next-intl`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`,
  `class-variance-authority`, plus shadcn-managed `src/components/ui/*` and `Geist`/`JetBrains_Mono` via `next/font`).

## Setup commands

```bash
pnpm install
# shadcn init writes components.json + src/components/ui primitives + edits globals.css
pnpm dlx shadcn@latest init          # cssVariables: true, baseColor neutral, css=src/app/(frontend)/globals.css, icon=lucide
pnpm dev                             # http://localhost:3000
```

## Manual validation scenarios

Run each against `pnpm dev`. IDs map to the contract.

### 1. Localized routing (C1)

1. Visit `/` → browser ends on `/en` (C1.1). Set browser language to non-English, repeat → still `/en` (C1.2).
2. Visit `/en` → header + stub `main` + footer; chrome in English; `<html lang="en">` (C1.3).
3. Visit `/uk` directly (no prior `/en`) → same shell; chrome in Ukrainian; `<html lang="uk">` (C1.4, deep-link edge).
4. Visit a locale-prefixed path with no page yet → shell still intact (C1.5).
5. Visit `/xx` (unsupported locale) → predictable not-found / default redirect, shell not broken (C1.6).
6. Confirm `/admin` and `/api/*` still load (Payload not intercepted by i18n middleware) (C1.7).

### 2. Shell chrome (C2)

1. Header shows wordmark, the four nav labels (Work, Experience/Skills, Resume, Contact), language switcher, theme
   switcher, Download CV (C2.1–C2.5).
2. Footer shows name, four public contact links, copyright (C2.6–C2.8).
3. Inspect each contact `href`: matches the exact destinations in the contract; ZERO private-repo links (C2.9, C8.1).

### 3. Language switching (C3)

1. On `/en`, choose UK → land on `/uk`, shell in Ukrainian (C3.1).
2. On a deeper `/en/<sub-path>`, switch → `/uk/<sub-path>` with sub-path preserved (C3.2).
3. Active language is visibly indicated in the switcher (C3.3).

### 4. Four-theme system (C4)

1. Fresh profile (cleared storage) → `data-theme="light"` (C4.1).
2. Open theme switcher → exactly four named themes (C4.2).
3. Pick `dark` (or `warm`/`contrast`), navigate + hard reload → selection persists (C4.3).
4. With a saved non-default theme, reload and watch first paint → NO flash of light first (C4.4). Repeat per theme (SC-005).
5. Manually corrupt the stored theme value in devtools → reload → falls back to `light`, no broken render (C4.6).
6. Confirm a single `<html data-theme="...">` drives all surfaces (C4.5).

### 5. Tokens & styling (C5)

1. In devtools, inspect `<html>` computed styles under each `data-theme` → all tokens from the data-model table
   resolve; `--radius` is `0rem` in all four (C5.1, C5.4).
2. Confirm utilities like `bg-background`, `text-muted-foreground`, `border-border` resolve from tokens (C5.2).
3. Confirm a shadcn primitive (e.g. Button `variant="default"`) uses `--primary` = brand accent, while hover
   surfaces use neutral `--secondary`/shadcn `--accent` (no orange hover backgrounds) (C5.3, C5.5).

### 6. Accessibility & responsive (C7)

1. From page top press Tab once → skip link appears first; activate → focus lands on `#main-content` (C7.1, C7.2).
2. Tab through header/footer → every control shows a visible, color-independent focus ring (C7.3).
3. Enable OS "reduce motion" → theme change + shell transitions are not animated (C7.4).
4. Resize / emulate at ~375px → mobile nav treatment, no horizontal scroll (C7.5); tablet adapts (C7.6); wide desktop
   capped at 1440px, not edge-to-edge (C7.7).

## Automated checks

```bash
pnpm lint
pnpm build
pnpm test:int     # EN/UK message key parity; routing/theme config invariants; token presence
pnpm test:e2e     # redirect (C1.1), locale switch (C3), theme persistence + no-flash (C4), skip-link (C7), responsive (C7.5–7.7)
```

Suggested automated coverage (authored in `/speckit.tasks`):

- **int** — `keys(messages/en.json) === keys(messages/uk.json)` deep equality (C6.2); `routing` has
  `localeDetection:false`, `localePrefix:'always'`, `defaultLocale:'en'`; `themeIds` has exactly the four ids;
  `contactLinks` contains zero `git@`/private-repo hrefs (C8.1).
- **e2e** — `/` → `/en` 200/redirect; `/en`+`/uk` render header/footer; locale switch preserves sub-path; select a
  theme, reload, assert `html[data-theme]` persists; no-flash check (read `data-theme` immediately on load before
  paint); Tab reveals skip link and moves focus to `#main-content`; viewport matrix 375/768/1440 with no overflow.

## Expected outcomes (Success Criteria)

| SC                                           | Verified by                                 |
| -------------------------------------------- | ------------------------------------------- |
| SC-001 `/` → `/en` 100%                      | Scenario 1.1; e2e redirect                  |
| SC-002 same shell both locales               | Scenario 1.2–1.3; e2e render                |
| SC-003 locale switch preserves sub-path      | Scenario 3; e2e                             |
| SC-004 four themes, default light, persists  | Scenario 4.1–4.3; e2e                       |
| SC-005 no theme flash                        | Scenario 4.4; e2e no-flash                  |
| SC-006 responsive, no overflow               | Scenario 6.4; e2e viewport matrix           |
| SC-007 skip link + color-independent focus   | Scenario 6.1–6.2; e2e                       |
| SC-008 public contact links, no private repo | Scenario 2.3; int + manual                  |
| SC-009 full EN/UK key parity                 | int parity test                             |
| SC-010 only shell + stubs ship               | Manual review; absence of page-body modules |

## Definition of done for this slice

- All contract clauses C1–C8 satisfied; `pnpm lint`, `pnpm build`, `pnpm test:int`, `pnpm test:e2e` green.
- Old `.portfolio-*` CSS and `(frontend)/[lang]/*` + `components/portfolio/sections|theme|ui/*` removed; data/helpers migrated.
- `.agents/docs/release-plan.md` updated to mark `002-foundation` status and what is next (`003-homepage`).
