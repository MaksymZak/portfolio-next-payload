# Data Model: Portfolio MVP

## Overview

The MVP1 public site uses a typed in-code content layer. The runtime model is intentionally small: one localized aggregate per supported locale plus a few reusable entities shared across homepage, resume, and the `Portfolio CMS` case page.

## Entities

### 1. `LocalePortfolioContent`

Represents all public content needed to render one locale.

| Field | Type | Description |
|---|---|---|
| `locale` | `'en' \| 'uk'` | Supported locale identifier |
| `home` | `HomePageContent` | Homepage content and metadata |
| `resume` | `ResumePageContent` | Compact resume content and metadata |
| `portfolioCmsCase` | `PortfolioCaseContent` | Case-study page content and metadata |
| `shared` | `SharedContent` | Shared contact methods, theme labels, reusable labels/status strings |

**Validation rules**
- Exactly two locale aggregates exist in MVP1: `en` and `uk`.
- EN and UK must expose the same route keys and section keys.
- All locale aggregates must preserve equivalent hiring signal and proof counts.

### 2. `HomePageContent`

| Field | Type | Description |
|---|---|---|
| `meta` | `RouteMetadata` | Homepage metadata |
| `hero` | `HeroContent` | Primary role positioning, summary, CTA labels |
| `proofMetrics` | `ProofMetric[]` | Credibility row on the homepage |
| `coreSkills` | `string[]` | Compact stack/skills row |
| `commercialProof` | `CommercialProofBlock` | Aggregated landing-page proof section |
| `selectedProjects` | `SelectedProjectCard[]` | Exactly three project cards |
| `contactSection` | `ContactSectionContent` | Contact heading, intro, and methods |

**Validation rules**
- `proofMetrics` must include the approved signals for `4+ years frontend`, `300+ landing pages`, and `Next.js / CMS-driven / production support`.
- `selectedProjects` must contain exactly three cards.
- `commercialProof.examples` must contain exactly six public-safe examples.

### 3. `ResumePageContent`

| Field | Type | Description |
|---|---|---|
| `meta` | `RouteMetadata` | Resume metadata |
| `header` | `ResumeHeaderContent` | Name, role, locale-safe summary |
| `positioningSummary` | `string[]` | Compact narrative bullets or short paragraphs |
| `coreSkills` | `string[]` | Resume skill list |
| `experienceSummary` | `ExperienceSummaryItem[]` | Curated experience proof |
| `selectedProjects` | `SelectedProjectCard[]` | Short project references |
| `contacts` | `ContactMethod[]` | Resume contact methods |

**Validation rules**
- Resume sections are limited to `Header`, `Positioning summary`, `Core skills`, `Experience summary`, `Selected projects`, and `Contacts`.
- Content must remain compact enough for a one-page print-oriented layout at standard browser print settings.

### 4. `PortfolioCaseContent`

| Field | Type | Description |
|---|---|---|
| `meta` | `RouteMetadata` | Case-page metadata |
| `slug` | `'portfolio-cms'` | Stable MVP1 case identifier |
| `overview` | `string[]` | Short overview section |
| `goals` | `string[]` | Goals section |
| `stack` | `string[]` | Technologies and platform choices |
| `demonstrates` | `string[]` | Public-safe proof statements |
| `currentScope` | `string[]` | Built-now vs next-step boundaries |
| `architectureDecisions` | `string[]` | Sanitized implementation decisions |
| `workflow` | `WorkflowReference` | SDD / Spec Kit workflow section |

**Validation rules**
- Only `portfolio-cms` has a case page in MVP1.
- `architectureDecisions` and `demonstrates` must avoid private repository details, corporate code, or internal client architecture.

### 5. `ThemeOption`

| Field | Type | Description |
|---|---|---|
| `id` | `'light' \| 'dark' \| 'warm' \| 'contrast'` | `data-theme` value |
| `label` | `string` | Human-readable theme name |
| `description` | `string` | Optional accessibility/help text |
| `tokens` | `ThemeTokenSet` | CSS-variable values derived from `DESIGN.md` |

**Validation rules**
- Exactly four themes exist: `Editorial Light`, `Graphite Dark`, `Warm Neutral`, `High Contrast`.
- `light` is the default when no preference is stored.
- All themes share the same token keys from `DESIGN.md`.

### 6. `CommercialProofExample`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable content identifier |
| `title` | `string` | Public-safe project/example title |
| `roleLabel` | `string` | Honest implementation-focused role framing |
| `summary` | `string` | Short proof statement |
| `mode` | `'visual' \| 'text-led'` | Presentation mode |
| `previewImage` | `string \| null` | Optional preview asset reference |
| `outboundUrl` | `string \| null` | Public destination when available |
| `status` | `'available' \| 'link-disabled'` | Outbound link state |

**Validation rules**
- Exactly six examples appear in the homepage proof block.
- Visual entries may include previews; text-led entries must remain strong without a preview.
- If `outboundUrl` is unavailable, `status` must become `link-disabled` and the UI must remove the outbound action.

### 7. `SelectedProjectCard`

| Field | Type | Description |
|---|---|---|
| `id` | `'portfolio-cms' \| 'lms-coming-next' \| 'landing-version-system-coming-next'` | Stable project-card identifier |
| `title` | `string` | Card title |
| `status` | `'implemented' \| 'coming-next'` | Trust-facing status label |
| `summary` | `string` | Short proof statement |
| `href` | `string \| null` | Case-page destination when allowed |
| `isNavigable` | `boolean` | Interaction contract for the card |

**Validation rules**
- Exactly three cards exist in MVP1.
- Only `portfolio-cms` is navigable.
- `LMS` and `Landing Version System` remain `coming-next` with no case-study navigation or demo CTA.

### 8. `ContactMethod`

| Field | Type | Description |
|---|---|---|
| `id` | `'email' \| 'linkedin' \| 'github' \| 'telegram'` | Stable method identifier |
| `label` | `string` | Localized display label |
| `href` | `string` | Public destination |
| `priority` | `number` | Display order |
| `showOnHome` | `boolean` | Render in homepage contact section |
| `showOnResume` | `boolean` | Render in resume contact section |

**Validation rules**
- Homepage and resume both include email, LinkedIn, GitHub, and Telegram.
- GitHub may point only to the public profile, never the private portfolio repository.

### 9. `RouteMetadata`

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Route title |
| `description` | `string` | Route description |
| `canonicalPath` | `string` | Locale-specific canonical path |
| `alternatePaths` | `Record<'en' \| 'uk' \| 'x-default', string>` | Language alternate paths |
| `ogTitle` | `string` | Open graph title |
| `ogDescription` | `string` | Open graph description |

**Validation rules**
- Each required route has localized metadata.
- `x-default` always points to `/en`.
- Alternate-language paths must match actual route coverage.

## Relationships

- `LocalePortfolioContent` **has one** `HomePageContent`, `ResumePageContent`, and `PortfolioCaseContent`.
- `HomePageContent` **has many** `ProofMetric`, `CommercialProofExample`, and `SelectedProjectCard`.
- `ResumePageContent` **has many** `ExperienceSummaryItem`, `SelectedProjectCard`, and `ContactMethod`.
- `ContactMethod` and `ThemeOption` are shared lookup-style entities reused across the public UI.
- `RouteMetadata` belongs to every public route surface.

## State Transitions

### Theme preference

`default-light` → `user-selected-theme` → `persisted-theme-on-next-visit`

- First visit defaults to `light`.
- User interaction updates the root `data-theme`.
- Stored preference is restored on subsequent visits.

### Project-card trust state

`coming-next` → `implemented` (future releases only)

- In MVP1, only `portfolio-cms` is `implemented`.
- `LMS` and `Landing Version System` stay fixed in `coming-next`.

### Commercial proof link state

`available` → `link-disabled` → `available`

- If a public example URL becomes invalid, the outbound action is removed.
- Once a valid public URL exists again, the outbound action can return.
