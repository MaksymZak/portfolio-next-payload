# Tasks: Portfolio MVP

**Input**: Design documents from `/specs/001-portfolio-mvp/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `.specify/memory/constitution.md`, `.agents/docs/release-plan.md`

**Tests**: Required for this feature. Use Vitest for typed-content/metadata validation and Playwright for recruiter-facing route validation.

**Organization**: Tasks are grouped into small, verifiable implementation slices that fit the existing Next.js 16 App Router repository under `src/app/(frontend)`. Each story ends with a release-plan update and slice validation. MVP2 and MVP3 work stays deferred throughout.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Include exact file paths in descriptions
- Keep tasks ordered around working checkpoints, not large parallel buckets

## Path Conventions

- Public frontend routes: `src/app/(frontend)/`
- Shared portfolio components: `src/components/portfolio/`
- Typed portfolio content: `src/content/portfolio/`
- Shared portfolio helpers: `src/lib/portfolio/`
- Automated validation: `tests/e2e/` and `tests/int/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Replace the blank frontend with portfolio-specific scaffolding while locking the work to the approved MVP1 slice.

- [X] T001 Audit the current placeholder frontend in `src/app/(frontend)/layout.tsx`, `src/app/(frontend)/page.tsx`, and `tests/e2e/frontend.e2e.spec.ts` against `specs/001-portfolio-mvp/plan.md` and `.agents/docs/release-plan.md`
- [X] T002 Create portfolio module scaffolding in `src/content/portfolio/index.ts`, `src/content/portfolio/types.ts`, `src/lib/portfolio/routes.ts`, and `src/lib/portfolio/metadata.ts`
- [X] T003 Create shared frontend entrypoints in `src/components/portfolio/sections/index.ts`, `src/components/portfolio/theme/theme-switcher.tsx`, and `src/components/portfolio/ui/section-shell.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the typed content layer, locale-aware layout, and theme foundation that every MVP1 route depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T004 Define the typed MVP1 content contracts from `specs/001-portfolio-mvp/data-model.md` in `src/content/portfolio/types.ts`
- [X] T005 [P] Create the English typed content source for homepage, resume, case page, project cards, proof examples, contacts, and metadata in `src/content/portfolio/en.ts`
- [X] T006 [P] Create the Ukrainian typed content source with parity-safe structure in `src/content/portfolio/uk.ts`
- [X] T007 Build content access, locale guards, and route helpers in `src/content/portfolio/index.ts` and `src/lib/portfolio/routes.ts`
- [X] T008 Build route metadata helpers and theme persistence utilities in `src/lib/portfolio/metadata.ts` and `src/lib/portfolio/theme.ts`
- [X] T009 Implement the shared frontend shell with locale-aware layout and token-driven styling in `src/app/(frontend)/layout.tsx`, `src/app/(frontend)/[lang]/layout.tsx`, and `src/app/(frontend)/styles.css`
- [X] T010 Implement the theme bootstrap and reusable theme switcher in `src/components/portfolio/theme/theme-provider-script.tsx` and `src/components/portfolio/theme/theme-switcher.tsx`
- [X] T011 Add foundational parity and helper coverage in `tests/int/content.int.spec.ts` and `tests/int/metadata.int.spec.ts`
- [X] T012 Validate the foundation with `tests/int/content.int.spec.ts` and `tests/int/metadata.int.spec.ts` before starting user-story routes
- [X] T013 Update the foundational slice status and keep MVP2/MVP3 work deferred in `.agents/docs/release-plan.md`

**Checkpoint**: Typed content, locale layout, route helpers, and theme infrastructure are ready for story delivery.

---

## Phase 3: User Story 1 - Recruiter scans the homepage and understands the offer fast (Priority: P1) 🎯 MVP

**Goal**: Deliver the bilingual homepage, root redirect, and recruiter-scan sections with honest MVP1-only project status.

**Independent Test**: Visit `/`, `/en`, and `/uk`; confirm `/` redirects to `/en`, the homepage renders the required sections in both locales, both hero CTAs work, the four-theme switcher persists, and only `Portfolio CMS` is navigable in selected projects.

### Tests for User Story 1

- [X] T014 [US1] Replace the blank frontend smoke test with root redirect coverage in `tests/e2e/frontend.e2e.spec.ts`
- [X] T015 [US1] Add homepage recruiter-scan acceptance coverage in `tests/e2e/homepage.e2e.spec.ts`

### Implementation for User Story 1

- [X] T016 [US1] Implement the root redirect and localized homepage route in `src/app/(frontend)/page.tsx` and `src/app/(frontend)/[lang]/page.tsx`
- [X] T017 [US1] Build the homepage page-shell composition in `src/components/portfolio/sections/home-page.tsx` and `src/components/portfolio/ui/section-shell.tsx`
- [X] T018 [P] [US1] Implement the hero, proof metrics, and core skills sections in `src/components/portfolio/sections/home-hero.tsx`, `src/components/portfolio/sections/proof-metrics.tsx`, and `src/components/portfolio/sections/core-skills.tsx`
- [X] T019 [P] [US1] Implement the commercial proof, selected projects, and contact sections in `src/components/portfolio/sections/commercial-proof.tsx`, `src/components/portfolio/sections/selected-projects.tsx`, and `src/components/portfolio/sections/contact-section.tsx`
- [X] T020 [US1] Wire the localized CTA targets and theme control into `src/components/portfolio/sections/home-page.tsx` and `src/components/portfolio/theme/theme-switcher.tsx`
- [X] T021 [US1] Update the delivered homepage slice status and keep MVP2/MVP3 work deferred in `.agents/docs/release-plan.md`
- [X] T022 [US1] Validate the homepage slice with `tests/e2e/frontend.e2e.spec.ts`, `tests/e2e/homepage.e2e.spec.ts`, and the homepage checks in `specs/001-portfolio-mvp/quickstart.md`

**Checkpoint**: The recruiter-facing homepage is live in both locales and usable for outreach before deeper pages are added.

---

## Phase 4: User Story 2 - Recruiter reviews the short resume and saves it as PDF (Priority: P2)

**Goal**: Deliver bilingual compact resume pages that stay inside MVP1 scope and support browser print-to-PDF without separate document generation.

**Independent Test**: Visit `/en/resume` and `/uk/resume`; confirm only the approved sections render, the content stays compact, and browser print preview remains readable without manual cleanup.

### Tests for User Story 2

- [X] T023 [US2] Add localized resume and print-readiness coverage in `tests/e2e/resume.e2e.spec.ts`

### Implementation for User Story 2

- [X] T024 [US2] Implement the localized resume route in `src/app/(frontend)/[lang]/resume/page.tsx`
- [X] T025 [US2] Build the resume page sections and print trigger in `src/components/portfolio/sections/resume-page.tsx` and `src/components/portfolio/ui/print-resume-button.tsx`
- [X] T026 [US2] Apply compact print styles and hide nonessential chrome in `src/app/(frontend)/styles.css` and `src/components/portfolio/sections/resume-page.tsx`
- [X] T027 [US2] Keep resume project references and contact details aligned with MVP1-only scope in `src/content/portfolio/en.ts` and `src/content/portfolio/uk.ts`
- [X] T028 [US2] Update the delivered resume slice status in `.agents/docs/release-plan.md`
- [X] T029 [US2] Validate the resume slice with `tests/e2e/resume.e2e.spec.ts` and the print checks in `specs/001-portfolio-mvp/quickstart.md`

**Checkpoint**: Both localized resume pages are printable and independently useful for recruiter follow-up.

---

## Phase 5: User Story 3 - Recruiter checks project proof without being misled about scope (Priority: P3)

**Goal**: Deliver the single `Portfolio CMS` case page and reinforce honest `coming next` treatment for all deferred project proof.

**Independent Test**: Visit `/en/projects/portfolio-cms` and `/uk/projects/portfolio-cms`; confirm the required case-study sections render, public-safe architecture/workflow proof is present, and `LMS` plus `Landing Version System` remain non-navigating `coming next` items only.

### Tests for User Story 3

- [X] T030 [US3] Add case-page and proof-honesty coverage in `tests/e2e/portfolio-case.e2e.spec.ts`

### Implementation for User Story 3

- [X] T031 [US3] Implement the localized `Portfolio CMS` case-study route in `src/app/(frontend)/[lang]/projects/portfolio-cms/page.tsx`
- [X] T032 [US3] Build the case-page sections for overview, goals, stack, proof, scope, architecture, and workflow in `src/components/portfolio/sections/portfolio-case-page.tsx`
- [X] T033 [US3] Harden `coming next` project-card behavior and commercial-proof honesty in `src/components/portfolio/sections/selected-projects.tsx`, `src/components/portfolio/sections/commercial-proof.tsx`, `src/content/portfolio/en.ts`, and `src/content/portfolio/uk.ts`
- [X] T034 [US3] Update the delivered case-study slice status in `.agents/docs/release-plan.md`
- [X] T035 [US3] Validate the case-study slice with `tests/e2e/portfolio-case.e2e.spec.ts` and the route-coverage checks in `specs/001-portfolio-mvp/quickstart.md`

**Checkpoint**: The portfolio presents one honest detailed case study while clearly keeping MVP2 and MVP3 proof out of active implementation.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish metadata, accessibility, and full-slice validation without expanding MVP1 scope.

- [X] T036 Implement localized titles, descriptions, canonicals, alternates, and open graph metadata in `src/lib/portfolio/metadata.ts`, `src/app/(frontend)/[lang]/page.tsx`, `src/app/(frontend)/[lang]/resume/page.tsx`, and `src/app/(frontend)/[lang]/projects/portfolio-cms/page.tsx`
- [X] T037 Align focus states, reduced-motion behavior, and final token usage with `DESIGN.md` in `src/app/(frontend)/styles.css` and `src/components/portfolio/ui/section-shell.tsx`
- [X] T038 Refresh metadata/parity assertions after the route work in `tests/int/metadata.int.spec.ts` and `tests/int/content.int.spec.ts`
- [X] T039 Update `.agents/docs/release-plan.md` with the final MVP1 touched-slice status and explicit MVP2/MVP3 deferments
- [X] T040 Validate the touched MVP1 slice with `tests/int/content.int.spec.ts`, `tests/int/metadata.int.spec.ts`, `tests/e2e/frontend.e2e.spec.ts`, `tests/e2e/homepage.e2e.spec.ts`, `tests/e2e/resume.e2e.spec.ts`, `tests/e2e/portfolio-case.e2e.spec.ts`, and `specs/001-portfolio-mvp/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** → no dependencies
- **Phase 2: Foundational** → depends on Phase 1 and blocks all story work
- **Phase 3: US1** → depends on Phase 2 and delivers the first recruiter-ready checkpoint
- **Phase 4: US2** → depends on Phase 2; recommended after US1 to keep the most visible MVP slice working first
- **Phase 5: US3** → depends on Phase 2 and should follow US1 so the case-page entry already exists in selected projects
- **Phase 6: Polish** → depends on all desired story slices being complete

### User Story Dependencies

- **US1 (P1)**: starts immediately after the foundational slice
- **US2 (P2)**: reuses the typed content layer and shared layout, but remains independently testable once implemented
- **US3 (P3)**: reuses the typed content layer and homepage project-card entry point from US1

### Recommended Delivery Graph

`Setup → Foundational → US1 → US2 → US3 → Polish`

### Within Each User Story

- Write or update the story tests before route implementation
- Build the route shell before section composition
- Keep copy/status updates inside the typed content layer, not Payload runtime data
- Update `.agents/docs/release-plan.md` before marking the slice complete
- Validate the touched slice before moving to the next priority

### Parallel Opportunities

- **Foundational**: T005 and T006 can be completed in parallel after T004
- **US1**: T018 and T019 can run in parallel after T017
- **US2**: Keep the slice mostly sequential; only split follow-up polish after T024 if extra staffing exists
- **US3**: T032 and T033 can run in parallel after T031 if they are assigned to different developers

---

## Parallel Example: User Story 1

```bash
# After the homepage shell exists in src/components/portfolio/sections/home-page.tsx:
Task: "Implement the hero, proof metrics, and core skills sections in src/components/portfolio/sections/home-hero.tsx, src/components/portfolio/sections/proof-metrics.tsx, and src/components/portfolio/sections/core-skills.tsx"
Task: "Implement the commercial proof, selected projects, and contact sections in src/components/portfolio/sections/commercial-proof.tsx, src/components/portfolio/sections/selected-projects.tsx, and src/components/portfolio/sections/contact-section.tsx"
```

## Parallel Example: User Story 2

```bash
# Keep resume work mostly ordered; split only after the route exists:
Task: "Build the resume page sections and print trigger in src/components/portfolio/sections/resume-page.tsx and src/components/portfolio/ui/print-resume-button.tsx"
Task: "Apply compact print styles and hide nonessential chrome in src/app/(frontend)/styles.css and src/components/portfolio/sections/resume-page.tsx"
```

## Parallel Example: User Story 3

```bash
# After the case route file is in place:
Task: "Build the case-page sections for overview, goals, stack, proof, scope, architecture, and workflow in src/components/portfolio/sections/portfolio-case-page.tsx"
Task: "Harden coming-next project-card behavior and commercial-proof honesty in src/components/portfolio/sections/selected-projects.tsx, src/components/portfolio/sections/commercial-proof.tsx, src/content/portfolio/en.ts, and src/content/portfolio/uk.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Deliver User Story 1 as the first working recruiter-facing checkpoint
3. Update `.agents/docs/release-plan.md`
4. Validate `/`, `/en`, and `/uk` before expanding the scope

### Incremental Delivery

1. **Foundation first**: typed content layer, locale routing, and theme infrastructure
2. **Homepage second**: ship the public scan surface and root redirect
3. **Resume third**: add the compact print-friendly follow-up surface
4. **Case page fourth**: add the single honest detailed proof page
5. **Polish last**: finish metadata, accessibility tuning, release-plan sync, and full validation

### Scope Guardrails

- Keep Payload out of the public runtime path for MVP1
- Do not add routes for `LMS` or `Landing Version System`
- Do not add a separate contact page, separate projects index, auto-locale detection, or polished PDF automation
- Treat MVP2 and MVP3 items in `.agents/docs/release-plan.md` as deferred unless a real contradiction is discovered

---

## Notes

- `[P]` tasks are intentionally limited; the default mode is ordered delivery with small checkpoints
- Every task references the existing or planned repository paths from `plan.md`
- Each story ends with `.agents/docs/release-plan.md` and validation work to keep implementation status explicit
- The final two tasks are the required release-plan update and touched-slice validation pass
- All MVP1 tasks preserve bilingual parity, public-safe proof, and Clean Editorial Technical constraints
