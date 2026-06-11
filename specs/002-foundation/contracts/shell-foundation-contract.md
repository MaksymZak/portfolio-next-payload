# Contract: Shell, Routing & Theming Foundation

**Feature**: `002-foundation` | **Date**: 2026-06-09 | **Type**: Behavioral contract (UI shell + routing + theming)

This is the externally observable contract the foundation slice MUST satisfy. It is the source for `/speckit.tasks`
and for the Playwright/Vitest validation in [quickstart.md](../quickstart.md). Each clause cites the spec
requirement(s) it enforces. "Shell" = persistent header + footer + skip link + stub `main`.

---

## C1. Routing & locale prefix

| ID   | Given                                                      | When                 | Then                                                                                  | Spec                   |
| ---- | ---------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------- | ---------------------- |
| C1.1 | A visitor requests `/`                                     | Entry route resolves | 3xx redirect to `/en`                                                                 | FR-003, SC-001         |
| C1.2 | Browser `Accept-Language` is non-English                   | Visitor requests `/` | Still redirected to `/en` (no detection)                                              | FR-002, US1.5          |
| C1.3 | Visitor requests `/en`                                     | Page loads           | Shell renders; chrome strings in English; `<html lang="en">`                          | FR-001, FR-004, SC-002 |
| C1.4 | Visitor requests `/uk`                                     | Page loads           | Same shell structure; chrome strings in Ukrainian; `<html lang="uk">`                 | FR-001, FR-004, SC-002 |
| C1.5 | Visitor requests a locale-prefixed path with no built page | Route resolves       | Shell still renders consistently around stub/empty `main`; header/footer intact       | FR-005                 |
| C1.6 | First path segment is not a supported locale               | Route resolves       | Resolves predictably as not-found (or redirect to default) without breaking the shell | Edge case              |
| C1.7 | Any request to `/admin` or `/api/*`                        | Middleware runs      | Payload routes are NOT rewritten/redirected by i18n middleware                        | FR-005 (coexistence)   |

## C2. App shell chrome (header & footer)

| ID    | Surface         | MUST contain                                                                                                                                | Spec                   |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| C2.1  | Header          | Wordmark/name                                                                                                                               | FR-006, FR-007         |
| C2.2  | Header          | Primary nav placeholders labeled **Work, Experience/Skills, Resume, Contact** (present, labeled, keyboard-focusable; may be non-functional) | FR-007, FR-008         |
| C2.3  | Header          | Language switcher (EN/UK)                                                                                                                   | FR-007, FR-011         |
| C2.4  | Header          | Theme switcher control                                                                                                                      | FR-007, FR-013         |
| C2.5  | Header          | Download CV action placeholder (present, labeled, focusable)                                                                                | FR-007, FR-008         |
| C2.6  | Footer          | Name                                                                                                                                        | FR-009                 |
| C2.7  | Footer          | Public contact links: email, Telegram, LinkedIn, GitHub                                                                                     | FR-009                 |
| C2.8  | Footer          | Copyright line                                                                                                                              | FR-009                 |
| C2.9  | Footer          | Every contact link points to its real public channel; ZERO links reference a private repository                                             | FR-010, FR-031, SC-008 |
| C2.10 | Header + Footer | Wraps every localized page persistently                                                                                                     | FR-006                 |

**Contact destinations** (exact): `mailto:zaksumy1989@gmail.com`, `https://t.me/MaksymZak`,
`https://www.linkedin.com/in/mzakaliuzhnyi`, `https://github.com/MaksymZak`. Phone + city MUST NOT appear in the shell.

## C3. Language switching

| ID   | Given               | When            | Then                                                          | Spec           |
| ---- | ------------------- | --------------- | ------------------------------------------------------------- | -------------- |
| C3.1 | On `/en`            | Choose UK       | Land on `/uk`; shell in Ukrainian                             | FR-011, SC-003 |
| C3.2 | On `/en/<sub-path>` | Switch language | Land on `/uk/<sub-path>` (locale swapped, sub-path preserved) | FR-011, SC-003 |
| C3.3 | After switching     | New page loads  | Active language is visibly indicated in the switcher          | FR-012         |

## C4. Four-theme system

| ID   | Given                                        | When               | Then                                                                                               | Spec              |
| ---- | -------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------- | ----------------- |
| C4.1 | No saved preference                          | Page loads         | `data-theme="light"` applied by default                                                            | FR-016, SC-004    |
| C4.2 | Theme switcher opened                        | Options viewed     | Exactly four: Editorial Light, Graphite Dark, Warm Neutral, High Contrast                          | FR-013, SC-004    |
| C4.3 | Non-default theme selected                   | Navigate or reload | Selected theme still applied (persisted)                                                           | FR-015, SC-004    |
| C4.4 | Saved non-default theme                      | First paint        | No visible flash of the default theme before the saved theme applies                               | FR-018, SC-005    |
| C4.5 | Theme changes                                | —                  | Reflected through a single `data-theme` attribute on `<html>`; all themed surfaces update together | FR-014            |
| C4.6 | Stored theme value is unrecognized/corrupted | Page loads         | Falls back to `light`; no unstyled/broken render                                                   | FR-017, Edge case |

## C5. Token contract & styling foundation

| ID   | Requirement                                                                                                                                                                                                                            | Spec              |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| C5.1 | All tokens (`--background, --foreground, --surface, --surface-muted, --border, --accent, --accent-foreground, --muted, --muted-foreground, --ring, --radius, --font-sans, --font-mono`) are defined for ALL four `[data-theme]` blocks | FR-019            |
| C5.2 | Tokens are exposed to the styling system (Tailwind `@theme inline`); utilities/components resolve from tokens, not re-invented values                                                                                                  | FR-020            |
| C5.3 | shadcn/ui semantic variables are mapped FROM the token contract (single palette), per the data-model mapping table                                                                                                                     | FR-021            |
| C5.4 | `--radius` resolves to `0rem` in all four themes                                                                                                                                                                                       | FR-022            |
| C5.5 | Brand `--accent` (`#ff4f00`) maps only to shadcn `--primary`/active/high-signal; it does NOT back shadcn hover surfaces (`--secondary`/`--accent`)                                                                                     | DESIGN.md, FR-021 |

## C6. Typed content layer & parity

| ID   | Requirement                                                                                                                            | Spec                   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| C6.1 | Shell chrome strings (nav, footer, contact labels, theme names, skip/switcher labels) are held in typed code modules for `en` and `uk` | FR-023                 |
| C6.2 | EN and UK shell-string sets are at full key parity (same keys, equivalent meaning); `/uk` shows no fallback-to-English                 | FR-024, FR-032, SC-009 |
| C6.3 | Real page-body content is absent or stubbed; only shell + stubs ship                                                                   | FR-025, SC-010         |

## C7. Accessibility & responsive shell

| ID   | Given                             | When                                      | Then                                                                      | Spec                   |
| ---- | --------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------- | ---------------------- |
| C7.1 | Keyboard user on a localized page | Press Tab once                            | Skip-to-content link becomes visible as the first focusable element       | FR-026, SC-007         |
| C7.2 | Skip link focused                 | Activated                                 | Focus moves to the main content region (`#main-content`)                  | FR-026, SC-007         |
| C7.3 | Tabbing through header/footer     | Focus moves                               | Each control shows a visible focus indicator NOT reliant on color alone   | FR-027, SC-007         |
| C7.4 | User prefers reduced motion       | Interacts with shell (incl. theme change) | Shell transitions respect `prefers-reduced-motion`                        | FR-028                 |
| C7.5 | Viewport ~375px                   | Shell renders                             | Mobile nav treatment; footer readable; NO horizontal overflow             | FR-029, FR-030, SC-006 |
| C7.6 | Tablet viewport                   | Shell renders                             | Layout adapts between mobile and desktop treatments                       | FR-029, SC-006         |
| C7.7 | Wide desktop viewport             | Shell renders                             | Content constrained within max width (1440px); not edge-to-edge beyond it | FR-030, SC-006         |

## C8. Trust & safety invariants (always)

| ID   | Requirement                                                                                            | Spec             |
| ---- | ------------------------------------------------------------------------------------------------------ | ---------------- |
| C8.1 | No private repository, corporate code, internal client info, or non-public proof anywhere in the shell | FR-031, SC-008   |
| C8.2 | Only public channels + wordmark/copyright are exposed; phone/city reserved for resume                  | Scope guardrails |
| C8.3 | EN/UK chrome provide equivalent meaning and hiring signal                                              | FR-032           |

---

## Non-goals (explicitly OUT of this contract)

- Homepage sections, resume body + print/PDF, portfolio CMS case body (slices 003/004/005).
- Full SEO/metadata/OG/sitemap/hreflang depth (006). A basic per-route `<title>` for stubs is acceptable.
- Wiring nav entries / Download CV to real targets (later slices). They remain accessible placeholders here.
- Payload as a runtime content source (stays admin-only).
