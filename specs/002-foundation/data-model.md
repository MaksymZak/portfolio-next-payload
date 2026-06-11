# Phase 1 Data Model: Foundation (App Shell & Infrastructure)

**Feature**: `002-foundation` | **Date**: 2026-06-09

This slice has no runtime database entities. The "data" is the typed content/config layer in code plus the design
token contract. Entities below map directly to the spec's Key Entities and to concrete TypeScript shapes and
`next-intl` message namespaces. Existing primitives in `src/content/portfolio/types.ts`
(`PortfolioLocale`, `PortfolioThemeId`, `ContactMethod`, `ThemeOption`) are migrated and refined.

---

## Entity: Locale

A supported public-site language.

| Field       | Type           | Notes                                                    |
| ----------- | -------------- | -------------------------------------------------------- |
| `code`      | `'en' \| 'uk'` | Locale segment value; literal union (`PortfolioLocale`). |
| `label`     | `string`       | Switcher display label (e.g. `EN`, `UK`).                |
| `isDefault` | `boolean`      | Exactly one `true` (`en`).                               |

- **Rules**: Exactly two locales; `en` is default; Russian excluded (FR-002, FR-001). The set is the single source
  consumed by `defineRouting`, `generateStaticParams`, and the locale switcher.
- **Location**: `src/i18n/routing.ts` (canonical `locales`/`defaultLocale`) + `src/config/locales.ts` (registry with
  labels for UI).

```ts
// src/config/locales.ts (shape)
export type Locale = 'en' | 'uk'
export interface LocaleEntry {
  code: Locale
  label: string
  isDefault: boolean
}
export const locales: readonly LocaleEntry[] // [{en,'EN',true},{uk,'UK',false}]
export const defaultLocale: Locale = 'en'
```

## Entity: Theme

A curated visual scheme applied via `data-theme`.

| Field       | Type                                        | Notes                                                                                                  |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `id`        | `'light' \| 'dark' \| 'warm' \| 'contrast'` | `data-theme` attribute value (`PortfolioThemeId`).                                                     |
| `nameKey`   | `string`                                    | i18n key resolving to the human name (Editorial Light / Graphite Dark / Warm Neutral / High Contrast). |
| `isDefault` | `boolean`                                   | Exactly one `true` (`light`).                                                                          |

- **Rules**: Exactly four themes; one active at a time; `light` default; invalid stored value → default
  (FR-013..FR-017). Theme display names live in messages for EN/UK parity; ids are locale-agnostic.
- **Location**: `src/config/themes.ts` (registry) feeds both `ThemeProvider themes={...}` and the theme switcher.

```ts
// src/config/themes.ts (shape)
export type ThemeId = 'light' | 'dark' | 'warm' | 'contrast'
export interface ThemeEntry {
  id: ThemeId
  nameKey: string
  isDefault: boolean
}
export const themes: readonly ThemeEntry[]
export const themeIds: readonly ThemeId[] // passed to next-themes
export const defaultThemeId: ThemeId = 'light'
```

## Entity: Shell String Set

The localized chrome strings for one locale, held as a `next-intl` message tree at full key parity.

| Namespace | Keys (illustrative)                                                                    | Purpose                                                                 |
| --------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `nav`     | `work`, `experienceSkills`, `resume`, `contact`, `downloadCv`, `openMenu`, `closeMenu` | Header nav placeholders + mobile-nav controls.                          |
| `footer`  | `copyright`, `madeWith` (optional)                                                     | Footer non-link text.                                                   |
| `contact` | `email`, `telegram`, `linkedin`, `github`                                              | Public contact link labels (labels only; URLs in `src/config/site.ts`). |
| `themes`  | `light`, `dark`, `warm`, `contrast`, `label`                                           | Theme display names + switcher group label.                             |
| `a11y`    | `skipToContent`, `languageSwitcher`, `themeSwitcher`, `activeLanguage`                 | Skip link + switcher accessible labels.                                 |

- **Rules** (FR-023..FR-025, FR-032, SC-009): EN and UK MUST cover the **same key set** with equivalent meaning; no
  `/uk` fallback to English. Page-body content modules MAY be empty/typed stubs, but this set is complete for both.
- **Parity invariant** (tested): `keys(en.json) ≡ keys(uk.json)` (deep, including nested namespaces).
- **Type safety**: a global `Messages` augmentation derives types from `messages/en.json` so `useTranslations`
  namespaces/keys are checked at build time.
- **Location**: `messages/en.json`, `messages/uk.json`; types via `src/i18n/*` / `global.d.ts` augmentation.

## Entity: Contact Link

A public contact channel surfaced in the footer (label localized; destination locale-agnostic).

| Field      | Type                                              | Notes                                                      |
| ---------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `id`       | `'email' \| 'telegram' \| 'linkedin' \| 'github'` | Channel identity; label resolved from `contact.<id>`.      |
| `href`     | `string`                                          | Public destination (see values below).                     |
| `external` | `boolean`                                         | `true` for Telegram/LinkedIn/GitHub; email uses `mailto:`. |

- **Rules** (FR-009, FR-010, FR-031, SC-008): destinations are PUBLIC-ONLY; a private repository MUST never be
  referenced. Phone + city are NOT in the shell footer (resume-only). The four channels and order:
  | id | href |
  | --- | --- |
  | `email` | `mailto:zaksumy1989@gmail.com` |
  | `telegram` | `https://t.me/MaksymZak` |
  | `linkedin` | `https://www.linkedin.com/in/mzakaliuzhnyi` |
  | `github` | `https://github.com/MaksymZak` |
- **Location**: `src/config/site.ts` (channels + `wordmark`/owner for copyright). Migrated from `ContactMethod` but
  trimmed to public shell needs; resume-only fields stay out of this config.

```ts
// src/config/site.ts (shape)
export interface ContactLink {
  id: 'email' | 'telegram' | 'linkedin' | 'github'
  href: string
  external: boolean
}
export const contactLinks: readonly ContactLink[]
export const site: { wordmark: string; copyrightOwner: string }
```

## Entity: Design Token

A named styling value from the `DESIGN.md` contract with a value per theme.

| Token                 | light              | dark      | warm      | contrast  |
| --------------------- | ------------------ | --------- | --------- | --------- |
| `--background`        | `#f9f9f9`          | `#0a0a0a` | `#f4f1ea` | `#ffffff` |
| `--foreground`        | `#000000`          | `#fafafa` | `#1a1a1a` | `#000000` |
| `--surface`           | `#ffffff`          | `#141414` | `#faf8f4` | `#ffffff` |
| `--surface-muted`     | `#f0f0f0`          | `#1f1f1f` | `#efebe0` | `#ffffff` |
| `--border`            | `#e5e5e5`          | `#262626` | `#ded9d1` | `#000000` |
| `--accent`            | `#ff4f00`          | `#ff4f00` | `#ff4f00` | `#ff4f00` |
| `--accent-foreground` | `#ffffff`          | `#ffffff` | `#ffffff` | `#ffffff` |
| `--muted`             | `#f3f3f3`          | `#1a1a1a` | `#eae5d8` | `#000000` |
| `--muted-foreground`  | `#666666`          | `#a0a0a0` | `#5c5c5c` | `#000000` |
| `--ring`              | `#ff4f00`          | `#ff4f00` | `#ff4f00` | `#000000` |
| `--radius`            | `0rem`             | `0rem`    | `0rem`    | `0rem`    |
| `--font-sans`         | Geist var          | Geist var | Geist var | Geist var |
| `--font-mono`         | JetBrains Mono var | (same)    | (same)    | (same)    |

- **Rules** (FR-019..FR-022): every token has a value in all four themes; `--radius` is `0rem` everywhere; values are
  copied verbatim from `DESIGN.md`. Tokens are consumed by BOTH Tailwind utilities (`@theme inline`) and shadcn
  semantic variables (mapped, not duplicated).
- **shadcn semantic mapping** (derived from tokens, per D7):

  | shadcn var                                                | source token                             |
  | --------------------------------------------------------- | ---------------------------------------- |
  | `--primary`                                               | `--accent`                               |
  | `--primary-foreground`                                    | `--accent-foreground`                    |
  | `--card` / `--popover`                                    | `--surface`                              |
  | `--card-foreground` / `--popover-foreground`              | `--foreground`                           |
  | `--secondary` / `--accent` (shadcn)                       | `--surface-muted`                        |
  | `--secondary-foreground` / `--accent-foreground` (shadcn) | `--foreground`                           |
  | `--muted` / `--muted-foreground`                          | direct                                   |
  | `--border` / `--input`                                    | `--border`                               |
  | `--ring`                                                  | `--ring`                                 |
  | `--radius`                                                | `--radius` (`0rem`)                      |
  | `--destructive`                                           | added neutral-safe red (no DESIGN token) |

- **Location**: `src/app/(frontend)/globals.css` (`[data-theme='...']` blocks + `@theme inline`).

---

## Typed content-layer shape (overview)

```text
messages/                      # translatable chrome strings (Shell String Set) — EN/UK parity
  en.json  uk.json
src/config/
  locales.ts                   # Locale registry
  themes.ts                    # Theme registry (feeds next-themes + switcher)
  site.ts                      # Contact Link destinations + wordmark/copyright owner
src/content/portfolio/         # typed page content (DEFERRED bodies; types retained, may be stubs)
  types.ts en.ts uk.ts index.ts
src/lib/portfolio/             # migrated helpers
  routes.ts                    # /[locale] path builders (home/resume/case)
  metadata.ts                  # per-route metadata helpers (basic titles ok this slice)
  theme.ts                     # theme id constants only (imperative apply/persist removed → next-themes)
```

## State transitions

- **Theme**: `default(light)` → user selects `{light|dark|warm|contrast}` → persisted by next-themes → reapplied
  pre-paint on reload/navigation. Invalid persisted value → `light`.
- **Locale**: active locale = URL `[locale]` segment. Switcher transition: `/(<locale>)/<sub-path>` →
  `/(<otherLocale>)/<sub-path>` (sub-path preserved; FR-011, SC-003).

## Validation rules summary

- Locale set is exactly `{en, uk}`; default `en`; no detection.
- Theme set is exactly `{light, dark, warm, contrast}`; default `light`; invalid → default.
- EN/UK message key sets are identical (parity invariant; integration-tested).
- Contact links are public-only; zero private-repo references (security/trust invariant; e2e-tested).
- Every design token resolves in all four `[data-theme]` blocks; `--radius` = `0rem` in all four.
