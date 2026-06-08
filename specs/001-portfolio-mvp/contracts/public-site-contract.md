# Public Site Contract: Portfolio MVP

## Purpose

This contract defines the public-facing interface of MVP1: routes, required sections, interaction rules, and metadata expectations for the hiring-focused frontend.

## Route Contract

| Route | Type | Required behavior |
|---|---|---|
| `/` | Redirect | Must redirect to `/en` |
| `/en` | Homepage | English homepage with all required sections |
| `/uk` | Homepage | Ukrainian homepage with equivalent sections and hiring signal |
| `/en/resume` | Resume | English compact resume page |
| `/uk/resume` | Resume | Ukrainian compact resume page |
| `/en/projects/portfolio-cms` | Case page | English `Portfolio CMS` case page |
| `/uk/projects/portfolio-cms` | Case page | Ukrainian `Portfolio CMS` case page |

No additional public routes are part of MVP1.

## Homepage Contract

Both `/en` and `/uk` must render these sections in equivalent structure:

1. Editorial hero
2. Public proof metrics
3. Compact core skills / stack row
4. Commercial landing pages proof block
5. Selected projects block
6. Theme switcher
7. Contact section

### Homepage interaction rules

- The hero exposes exactly two equal primary actions:
  - `View resume` → localized resume route
  - `Get in touch` → in-page jump to the contact section
- The selected projects block shows exactly three cards:
  - `Portfolio CMS` — navigable to the localized case page
  - `LMS coming next` — non-navigating status-only card
  - `Landing Version System coming next` — non-navigating status-only card
- The commercial proof block shows exactly six public-safe examples with mixed presentation:
  - visual preview entries
  - text-led entries
- Outbound proof links must be omitted when the source URL is unavailable.

## Resume Contract

Both resume routes must include only:

1. Header
2. Positioning summary
3. Core skills
4. Experience summary
5. Selected projects
6. Contacts

### Resume interaction rules

- Resume pages must be printable via normal browser print-to-PDF flow.
- The UI may include a print-oriented action, but must not rely on generated PDFs or download-only assets.
- Print styles must hide nonessential interactive chrome and preserve readability on one page where practical.

## `Portfolio CMS` Case-Page Contract

Both localized case pages must include:

1. Overview
2. Goals
3. Stack
4. What it demonstrates
5. Current scope and next steps
6. Architecture decisions
7. SDD / Spec Kit workflow

### Case-page trust rules

- Content must remain public-safe and honest.
- The page may describe architecture decisions and implementation proof, but may not expose private repositories, confidential client details, or internal corporate architecture.

## Theme Contract

The public UI must support exactly four themes through the root `data-theme` attribute:

| Label | `data-theme` value |
|---|---|
| Editorial Light | `light` |
| Graphite Dark | `dark` |
| Warm Neutral | `warm` |
| High Contrast | `contrast` |

### Theme behavior

- Default theme: `light`
- Persistence: local browser storage
- Scope: all required public routes
- Styling source of truth: `DESIGN.md`

## Metadata Contract

Every required public route must provide:

- localized page title
- localized page description
- canonical path
- EN/UK alternate language links
- essential open graph title/description

`x-default` must resolve to `/en`.

## Accessibility Contract

The MVP public frontend must provide:

- semantic landmark structure
- visible focus states
- keyboard access for all interactive elements
- reduced-motion-safe transitions
- parity-safe language metadata via `html[lang]`
- non-misleading status treatment for `coming next` cards

## Validation Notes

- EN and UK must remain structurally equivalent across all required public routes.
- Only `Portfolio CMS` is a full case page in MVP1.
- Payload remains outside the public runtime content path for MVP1.
