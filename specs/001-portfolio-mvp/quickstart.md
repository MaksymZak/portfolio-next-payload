# Quickstart Validation Guide: Portfolio MVP

## Purpose

Validate the MVP1 public portfolio end-to-end after implementation, using the typed content layer, localized routes, and focused automated coverage defined in this feature.

## Prerequisites

- Node.js version supported by the repo (`^18.20.2 || >=20.9.0`)
- `pnpm` available
- Repository dependencies installed
- Existing project environment configured according to the repo's normal setup

## Setup

```bash
cd D:\Work\porfolio-next-payload
pnpm install
pnpm dev
```

Open `http://localhost:3000` once the dev server is ready.

## Validation Scenarios

### 1. Root redirect and route coverage

**Goal**: confirm only the approved public routes exist and `/` redirects to English.

Steps:
1. Visit `/`
2. Confirm the browser redirects to `/en`
3. Open each required route directly:
   - `/en`
   - `/uk`
   - `/en/resume`
   - `/uk/resume`
   - `/en/projects/portfolio-cms`
   - `/uk/projects/portfolio-cms`

Expected outcomes:
- `/` redirects to `/en`
- All six localized routes load successfully
- No extra full case-study routes exist for `LMS` or `Landing Version System`

### 2. Homepage recruiter-scan validation

**Goal**: confirm the homepage meets the MVP1 hiring surface contract.

Reference: [`contracts/public-site-contract.md`](./contracts/public-site-contract.md)

Steps:
1. Open `/en`, then `/uk`
2. Verify the page includes:
   - editorial hero
   - proof metrics
   - compact core skills / stack row
   - commercial proof block
   - selected projects block
   - theme switcher
   - contact section
3. Verify the hero contains the required positioning and two primary CTAs
4. Click `Get in touch`
5. Verify the page jumps to the contact section
6. Check the selected projects area

Expected outcomes:
- Both locales expose the same section structure
- `Get in touch` jumps to contact instead of opening another page
- Exactly three project cards are visible
- Only `Portfolio CMS` is navigable
- The commercial proof block shows six examples

### 3. Theme behavior validation

**Goal**: confirm the frontend theme foundation works across routes.

Reference: [`data-model.md`](./data-model.md#5-themeoption)

Steps:
1. Open `/en`
2. Switch between all four themes
3. Refresh the page
4. Navigate to `/en/resume` and `/en/projects/portfolio-cms`

Expected outcomes:
- Available themes are `Editorial Light`, `Graphite Dark`, `Warm Neutral`, and `High Contrast`
- The root `data-theme` value changes correctly
- The selected theme persists after refresh and route changes
- The overall hierarchy remains consistent across themes

### 4. Resume print validation

**Goal**: confirm the compact resume can be exported through browser print.

Steps:
1. Open `/en/resume`
2. Trigger the print flow from the browser (or the page's print-oriented action if present)
3. Repeat for `/uk/resume`

Expected outcomes:
- Only the approved resume sections appear
- Nonessential interactive chrome is hidden in print preview
- The printed result is readable and compact without separate PDF generation

### 5. `Portfolio CMS` case-page validation

**Goal**: confirm the single MVP1 case page stays honest and complete.

Steps:
1. Open `/en/projects/portfolio-cms`
2. Repeat on `/uk/projects/portfolio-cms`
3. Verify the required sections appear
4. Check that the page distinguishes current scope from future work

Expected outcomes:
- Both locales expose the same case-page structure
- The page includes `Overview`, `Goals`, `Stack`, `What it demonstrates`, `Current scope and next steps`, `Architecture decisions`, and `SDD / Spec Kit workflow`
- No private repository or internal architecture references are exposed

### 6. Metadata and SEO validation

**Goal**: confirm basic route-level metadata is present for all public routes.

Reference: [`contracts/public-site-contract.md`](./contracts/public-site-contract.md#metadata-contract)

Steps:
1. Inspect the document title and metadata for each required route
2. Confirm localized titles/descriptions change between EN and UK routes
3. Check canonical and alternate-language metadata

Expected outcomes:
- Each route exposes localized title and description data
- EN/UK alternates are present
- `/en` is treated as the default canonical fallback

## Automated Checks

Run focused automated validation after the feature is implemented:

```bash
pnpm run test:int
pnpm run test:e2e
```

Expected automated coverage:
- content parity across EN/UK typed data
- redirect behavior
- homepage required sections
- `Portfolio CMS` case-page coverage
- theme persistence
- resume print readiness

## Notes

- Keep Payload admin/API validation separate from this MVP1 public-site validation pass.
- If a commercial example URL becomes invalid, update the typed content layer before rerunning the homepage validation.
