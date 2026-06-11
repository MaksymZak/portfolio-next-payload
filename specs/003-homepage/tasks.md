# Tasks: Homepage (003)

**Verification policy**: no automated tests. Each task is verified by `bun run lint`,
`bun run build`, and manual checks (mobile ~375px / tablet / desktop, all four
themes, EN/UK parity).

## Phase 1 — Content

- [ ] T001 Create `src/content/portfolio/home.ts`: types + EN/UK data +
      `getHomeContent(locale)`. Reuse vetted copy from existing `content/portfolio`
      and public contacts from `src/config/site.ts`.

## Phase 2 — Section primitives (US1–US5)

- [ ] T002 `src/components/portfolio/sections/section-shell.tsx` — consistent
      section wrapper (max-width, padding, optional eyebrow/heading, anchor id).
- [ ] T003 `home-hero.tsx` — positioning, availability, summary, two CTAs (US1).
- [ ] T004 `proof-metrics.tsx` — three metrics row (US1).
- [ ] T005 `core-skills.tsx` — mono-styled stack tags (US2).
- [ ] T006 `selected-projects.tsx` — three cards, only Portfolio CMS navigable (US3).
- [ ] T007 `commercial-proof.tsx` — curated examples, outbound links, modes (US2).
- [ ] T008 `contact-section.tsx` — public channels, location/availability (US4).

## Phase 3 — Composition

- [ ] T009 `home-page.tsx` — compose sections in recruiter-scan order with anchors.
- [ ] T010 Wire into `src/app/(frontend)/[locale]/page.tsx` (validate locale,
      `setRequestLocale`, `getHomeContent`).

## Phase 4 — Verify & track

- [ ] T011 `bun run lint` + `bun run build` green; manual scan EN/UK, 4 themes,
      breakpoints; only Portfolio CMS navigable; outbound links work; `#contact` jumps.
- [ ] T012 Update `.agents/docs/release-plan.md` (003 status + resume/case follow-ups).
