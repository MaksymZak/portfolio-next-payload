# Implementation Plan: Portfolio MVP

**Branch**: `[001-portfolio-mvp]` | **Date**: 2026-06-08 | **Spec**: [`specs/001-portfolio-mvp/spec.md`](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-mvp/spec.md`

## Summary

Build the MVP1 public portfolio inside the existing Next.js 16 App Router repository by replacing the placeholder frontend with a bilingual, server-rendered public surface under `src/app/(frontend)`. The public site will use a typed in-code content layer for EN/UK content, a root redirect to English, a shared `[lang]` route segment for all required localized pages, and a CSS-variable theme foundation driven by `DESIGN.md`. Payload remains installed for admin and future content migration, but the public runtime stays independent from Payload in MVP1.

## Technical Context

**Language/Version**: TypeScript 5.7, Next.js 16.2.6 App Router, React 19.2.6

**Primary Dependencies**: `next`, `react`, `react-dom`, `tailwindcss@4`, `@payloadcms/next` / `payload` (repository dependency only for admin/runtime outside public site), `next/font`

**Storage**: Typed TypeScript content modules for public runtime content; `localStorage` for theme preference; existing Postgres/Payload storage remains available but out of scope for public MVP runtime

**Testing**: Playwright 1.58 E2E for route-level acceptance, Vitest 4 integration/unit coverage for content parity and route/theme helpers

**Target Platform**: Vercel-hosted Next.js web app, modern desktop/mobile browsers, print-to-PDF via standard browser print flow

**Project Type**: Web application with separate public frontend and Payload admin route groups

**Performance Goals**: Public pages render without runtime CMS fetches, keep client JavaScript limited to theme/print-oriented UI, preserve fast first-screen rendering for recruiter scanning, and keep the required locale routes statically enumerable

**Constraints**: MVP1 only; support `/`, `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/projects/portfolio-cms`, `/uk/projects/portfolio-cms`; use `DESIGN.md` token contract and `next/font`; no runtime Payload dependency for public content; no auto locale detection; no LMS or Landing Version System full cases; print-friendly resume only

**Scale/Scope**: 1 redirect route, 6 localized public routes, 4 curated themes, 6 commercial proof examples, 3 project cards, 2 locales with parity across homepage/resume/case content, focused regression tests around MVP1 flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Gate

- **Hiring Outcome Fit**: Pass. The planned slices all improve recruiter scan speed, trust, or conversion: typed content keeps copy controlled, the layout/theme foundation supports immediate readability, localized routes cover the required audiences, and tests validate the MVP hiring flow.
- **Public-Safe Honesty**: Pass. The public contract keeps `Portfolio CMS` as the only full case, preserves `LMS` and `Landing Version System` as `coming next`, and keeps Payload/private repository details out of the public runtime.
- **Bilingual Parity**: Pass. A single `[lang]` route structure with typed EN/UK content modules and parity-focused tests keeps route coverage, section structure, labels, and proof counts aligned.
- **Design Contract**: Pass. Theme tokens, typography loading, `data-theme` state, restrained motion, and print/accessibility rules all derive from `DESIGN.md` without introducing a second styling system.
- **Small, Verifiable Slices**: Pass. The plan is organized into eight maintainable implementation slices with direct validation checkpoints and a release-plan update after each completed slice.

### Post-Design Re-Check

- **Hiring Outcome Fit**: Still passes. The design artifacts stay focused on homepage scanability, compact resume proof, and one honest case study.
- **Public-Safe Honesty**: Still passes. Contracts and data model explicitly constrain project-card navigation, proof-link behavior, and public-safe case-study content.
- **Bilingual Parity**: Still passes. The content model, route contract, and tests require EN/UK parity at the same structural keys and counts.
- **Design Contract**: Still passes. The design artifacts standardize fonts, token usage, focus treatment, and print overrides around the approved contract.
- **Small, Verifiable Slices**: Still passes. The structure avoids premature abstractions and keeps the future Payload migration deferred to later releases.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── public-site-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (frontend)/
│   │   ├── page.tsx
│   │   ├── styles.css
│   │   └── [lang]/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── resume/
│   │       │   └── page.tsx
│   │       └── projects/
│   │           └── portfolio-cms/
│   │               └── page.tsx
│   └── (payload)/
│       ├── admin/[[...segments]]/page.tsx
│       ├── api/[...slug]/route.ts
│       └── layout.tsx
├── components/
│   └── portfolio/
│       ├── sections/
│       ├── theme/
│       └── ui/
├── content/
│   └── portfolio/
│       ├── en.ts
│       ├── uk.ts
│       ├── index.ts
│       └── types.ts
├── lib/
│   └── portfolio/
│       ├── metadata.ts
│       ├── routes.ts
│       └── theme.ts
└── payload.config.ts

tests/
├── e2e/
│   ├── frontend.e2e.spec.ts
│   ├── homepage.e2e.spec.ts
│   ├── resume.e2e.spec.ts
│   └── portfolio-case.e2e.spec.ts
└── int/
    ├── api.int.spec.ts
    ├── content.int.spec.ts
    └── metadata.int.spec.ts
```

**Structure Decision**: Use the existing `(frontend)` and `(payload)` route-group split, but move the public root layout into `src/app/(frontend)/[lang]/layout.tsx` so locale-aware metadata, `html[lang]`, and shared public structure live in one place. Keep typed public content centralized in `src/content/portfolio`, shared rendering in `src/components/portfolio`, and thin route/metadata/theme helpers in `src/lib/portfolio`. This keeps the MVP simple, avoids a runtime CMS dependency, and makes EN/UK parity easy to validate.

## Complexity Tracking

No constitution violations are required for this plan.

## Implementation Phases

1. **Typed content definitions** — create shared types plus EN/UK content modules for homepage, resume, case-study, metadata, contact methods, project cards, proof metrics, and themes.
2. **Global layout and theme foundation** — introduce locale-aware frontend layout, `next/font` loading, token-driven global styles, a minimal theme bootstrap script, and a client-only theme switcher.
3. **Localized route structure** — redirect `/` to `/en`, add the `[lang]` route segment, lock supported locales to EN/UK, and share route helpers for homepage/resume/case pages.
4. **Homepage sections** — implement the hero, proof metrics, skills row, commercial proof block, selected projects, theme control, and contact section for both locales.
5. **Resume pages** — build compact EN/UK resume pages with print-oriented styles and a simple browser print action.
6. **Portfolio CMS case pages** — add the localized case-study route with overview, goals, stack, proof, current scope, architecture decisions, and Spec Kit workflow sections.
7. **Metadata and SEO** — add route-level metadata, canonical/alternate language metadata, sitemap/robots follow-up if needed, and explicit language-safe titles/descriptions.
8. **Focused tests** — cover redirect behavior, required sections, theme persistence, print readiness, EN/UK parity, and public-safety guards with Playwright/Vitest.
