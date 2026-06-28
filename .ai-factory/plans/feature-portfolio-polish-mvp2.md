# Implementation Plan: Portfolio Polish MVP2

Branch: feature/portfolio-polish-mvp2
Created: 2026-06-28

## Settings

- Testing: no. Verification is `bun run lint`, `bun run build`, and manual browser QA only.
- Logging: standard. UI-only visual tasks should not leave noisy runtime logs in production; behavior tasks may use short-lived development logs while debugging and should keep only WARN/ERROR logs for recoverable failures.
- Docs: yes. `/aif-implement` must include a mandatory documentation checkpoint after implementation.

## Roadmap Linkage

Milestone: "none"
Rationale: No `.ai-factory/ROADMAP.md` artifact exists; this plan is the post-MVP polish and MVP2 readiness pass after `.ai-factory/plans/portfolio-mvp.md`.

## Source Context

- Completed MVP plan: `.ai-factory/plans/portfolio-mvp.md`
- Active design system: `.cursor/docs/design_system_new.md`
- Reference prototype: `.cursor/docs/reference/app/page.tsx`, `.cursor/docs/reference/app/globals.css`, `.cursor/docs/reference/app/cv/page.tsx`, `.cursor/docs/reference/app/archive/page.tsx`
- Current implementation hotspots: `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/layout/nav.tsx`, `src/components/layout/sidebar.tsx`, `src/components/layout/drawer-menu.tsx`, `src/components/sections/stack.tsx`, `src/components/sections/projects/project-card.tsx`, `src/components/sections/archive.tsx`, `src/components/resume/bento.tsx`, `src/components/case/index-nav.tsx`

## Goals

1. Make the portfolio feel intentional and polished instead of "toporno": consistent hover, active, card, and nav motion across the site.
2. Port the reference `stack` section styling and interaction quality into the modular Payload-backed implementation.
3. Fix scroll-spy and sidebar navigation behavior so clicking far sections does not create visual chaos while the page scrolls.
4. Turn remaining MVP gaps into an actionable MVP2 backlog focused on content truth, visual trust, accessibility, SEO, and manual QA.

## Key Decisions

- Use the reference as the visual source of truth, but preserve the production architecture: shared primitives, CSS/Tailwind utilities, `motion-safe`, reduced-motion support, and no direct monolithic copy-paste.
- Do not add Framer Motion or another runtime animation dependency for this pass. Match the feel with CSS transitions, `IntersectionObserver`, scroll offset handling, and small client-state improvements.
- Separate "selected/current" state from "hover lift" state. Active navigation items should not permanently shift list layout unless every row reserves the same visual space.
- Prefer one motion contract over one-off Tailwind strings: buttons, links, cards, nav items, switchers, and small placks should consume the same primitives.

## Scroll Navigation Options

The bottom-of-page limitation is real: when the user clicks `contact`, the browser cannot always align that section to the top if there is not enough content below it. The implementation should choose the recommended option and document the trade-off.

1. Recommended: manual scroll with offset + target lock. Compute `targetTop = element.getBoundingClientRect().top + window.scrollY - headerOffset`, clamp to document max scroll, set a temporary `targetSection`, and ignore observer churn until scroll settles or times out. This keeps nav feedback stable even when the page cannot scroll further.
2. Add bottom breathing room. Add `scroll-padding-bottom` or a lightweight terminal spacer after the final home section so the last section can align closer to the intended offset. This is visually simple, but it changes page height.
3. Use `block: 'center'` for lower sections. This avoids the "cannot reach top" issue, but the section alignment changes depending on which item is clicked.
4. Accept native behavior. Keep `scrollIntoView`, tune `rootMargin`, and only reduce visual jump. This is lowest risk but does not fully address the user's complaint.

Use option 1 as the primary fix. Add option 2 only if manual QA still shows the final section feeling stuck on desktop.

## Commit Plan

- Commit 1 (after tasks 1-3): "fix: standardize brutalist motion primitives"
- Commit 2 (after tasks 4-9): "fix: polish stack and navigation interactions"
- Commit 3 (after tasks 10-14): "fix: resolve mvp2 content accessibility and seo gaps"
- Commit 4 (after tasks 15-16): "docs: document portfolio polish qa"

## Tasks

### Phase 1: Shared Motion Contract

- [x] Task 1: Define reusable brutalist motion primitives for buttons, links, and small interactive controls.
  - Files: `src/components/ui/button.tsx`, optionally `src/lib/brutalist-motion.ts` or `src/app/(frontend)/globals.css`, plus affected imports.
  - Deliverable: primary and secondary button/link variants match the reference CTA feel: `border-2`, hard `4px` base shadow where appropriate, `duration-100/150 ease-out`, hover translate paired with shadow growth, active press into the shadow, `motion-safe` and `motion-reduce` support.
  - Expected behavior: the object moves while the shadow remains visually anchored; the shadow should not look like the thing moving by itself.
  - Logging requirements: no persistent runtime logs for pure styling; if a temporary dev-only log is used to validate active/pressed state, remove it before completion. Keep WARN/ERROR only for unexpected interactive failures introduced by this task.

- [x] Task 2: Standardize card interaction variants and remove ad-hoc card motion drift.
  - Files: `src/components/ui/card.tsx`, `src/components/sections/projects/project-card.tsx`, `src/components/sections/archive.tsx`, `src/components/resume/bento.tsx`, `src/app/(frontend)/[locale]/case/[slug]/page.tsx`, `src/components/case/section.tsx` if needed.
  - Deliverable: interactive cards use one shared scale for large cards (`6px` hard shadow, `duration-200 ease-out`) and one small scale for compact tiles/placks (`3px` shadow, `duration-150 ease-out`).
  - Expected behavior: project cards, archive tiles, resume bento tiles, and related case links feel like the same interface system; shadows are not clipped by `overflow-hidden`.
  - Logging requirements: no runtime logs for visual-only changes. If expanded project telemetry logic is touched, log only WARN/ERROR for impossible panel state or missing `aria-controls` target during development.

- [x] Task 3: Replace duplicated button/link motion callsites with the shared primitives.
  - Files: `src/components/sections/hero/hero-ctas.tsx`, `src/components/sections/archive.tsx`, `src/components/layout/sidebar.tsx`, `src/components/layout/drawer-menu.tsx`, `src/components/resume/print-button.tsx`, `src/components/layout/theme-switcher.tsx`, `src/components/layout/locale-switcher.tsx`, `src/components/sections/projects/project-card.tsx`.
  - Deliverable: resume/download links, hero CTAs, archive CTA, print button, telemetry button, theme/locale switchers, and drawer trigger no longer carry inconsistent one-off shadow/translate values.
  - Expected behavior: active press, hover lift, and selected state use consistent geometry across desktop and mobile.
  - Logging requirements: no persistent logs for class migration. If switcher state handling is touched, keep only WARN logs for invalid theme/locale values.

### Phase 2: Stack Section Reference Parity

- [x] Task 4: Port the reference `stack` metrics hierarchy.
  - Files: `src/components/sections/stack.tsx`, `messages/en.json`, `messages/uk.json` if labels are missing.
  - Deliverable: metrics follow the reference order: small uppercase label, large value, accent description; the long CMS/depth value uses the reference's smaller `text-2xl` treatment when needed; group hover shifts label color from muted to foreground.
  - Expected behavior: `#stack` reads like the reference proof grid, not three generic CMS counters.
  - Logging requirements: no runtime logs. During implementation, validate missing translated metric labels with build-time TypeScript/message coverage, not console output.

- [x] Task 5: Replace static skill badges with reference-style stack placks.
  - Files: `src/components/sections/stack.tsx`, optionally a new `src/components/sections/stack-plack.tsx` or `src/components/ui/skill-plack.tsx`.
  - Deliverable: each skill renders as a compact bordered plack with an icon box, uppercase mono title, reference-style `3px` hover shadow, active press, and optional skill level display if the existing `skills.level` field is available.
  - Expected behavior: the stack block gains the tactile inventory feel from `.cursor/docs/reference/app/page.tsx` without adding new dependencies.
  - Logging requirements: no runtime logs. If icon/category mapping has an unknown fallback, log a development-only WARN once per unknown category or use a silent default icon with no production noise.

- [x] Task 6: Align stack intro and spacing with the reference while preserving Payload ownership.
  - Files: `src/components/sections/stack.tsx`, `messages/en.json`, `messages/uk.json`, seed files under `src/db/seed/data/` only if content fields must be adjusted.
  - Deliverable: stack intro has a clear small heading with a `Layers`-style icon treatment and descriptive copy; spacing, `pb-4`, gaps, and section rhythm match the reference.
  - Expected behavior: no schema change unless the current `proof.intro` cannot support the desired layout; prefer messages for UI chrome and Payload for editorial copy.
  - Logging requirements: no runtime logs. If seed content is changed, seed script should continue its existing progress/error logging style without adding verbose output.

### Phase 3: Sidebar, Drawer, and Scroll-Spy Behavior

- [ ] Task 7: Refactor home navigation item styling to separate active state from hover lift.
  - Files: `src/components/layout/nav.tsx`, `src/components/layout/drawer-menu.tsx`, `src/components/case/index-nav.tsx` if the pattern is shared.
  - Deliverable: active nav rows use stable border/background/font treatment without permanent list-shifting translate, or all rows reserve identical visual space so active changes do not jump. Hover lift should apply only to pointer hover and should not fight active selection.
  - Expected behavior: moving the mouse during scroll no longer creates a cascade of active/hover/shadow shifts.
  - Logging requirements: add temporary development logs only while debugging nav state transitions, e.g. `[Nav] target section settled`; remove them before completion. Keep no production INFO logs for ordinary scrolling.

- [ ] Task 8: Implement stable programmatic scroll targeting for home nav.
  - Files: `src/components/layout/nav.tsx`, `src/components/sections/*` section wrappers, `src/app/(frontend)/globals.css` if scroll utilities are added.
  - Deliverable: replace raw `scrollIntoView` with offset-aware scroll targeting and a temporary target lock that suppresses observer churn until the target settles or a timeout expires. Add `scroll-mt-*` / offset utilities to home sections.
  - Expected behavior: clicking from the first link to the last link gives stable feedback; the active item does not rapidly flicker through every intermediate section.
  - Logging requirements: standard logs are allowed only during development for target lock diagnostics; final code should keep WARN logs for missing target elements and no logs for successful clicks.

- [ ] Task 9: Tune mobile drawer navigation to match reference behavior and accessibility expectations.
  - Files: `src/components/layout/drawer-menu.tsx`, `src/components/layout/nav.tsx`, `src/components/ui/drawer.tsx`.
  - Deliverable: drawer nav can use a flatter active variant than desktop, closes before scroll, respects reduced motion, and returns focus predictably via Radix Dialog behavior.
  - Expected behavior: mobile drawer navigation feels calm and not over-animated; clicking a link does not combine drawer close animation, hover lift, active shift, and page scroll into visual noise.
  - Logging requirements: no ordinary interaction logs. Keep WARN/ERROR only for missing section targets or unexpected drawer state during development.

### Phase 4: MVP2 Content and Product Gaps

- [ ] Task 10: Fix launch-blocking content truth issues in seed/CMS data.
  - Files: `src/db/seed/data/projects.ts`, `src/db/seed/data/archive.ts`, `src/db/seed/data/resume.ts`, related seed scripts if dedupe behavior changes.
  - Deliverable: placeholder roadmap case studies are either hidden/noindexed or clearly marked; archive entries dedupe by normalized URL where possible; portfolio stack mentions Next.js 16; EN/UK positioning copy consistently says Middle Frontend rather than drifting into Full Stack.
  - Expected behavior: public content feels real and trustworthy, not like unfinished placeholders.
  - Logging requirements: seed changes should log INFO for created/updated counts and WARN for deduped/skipped entries; preserve existing seed error logging.

- [ ] Task 11: Wire dormant CMS fields that improve visual and product polish.
  - Files: `src/components/sections/archive.tsx`, `src/components/archive/table.tsx`, `src/components/layout/sidebar.tsx`, `src/components/layout/drawer-menu.tsx`, `src/components/sections/stack.tsx`, `src/app/(frontend)/[locale]/case/[slug]/page.tsx`, seed data under `src/db/seed/data/`.
  - Deliverable: render `archive.url` as external links, use `settings.resumeUrl` when present with `/resume` fallback, show `skills.level` in stack/resume where useful, and add at least one case screenshot path or admin guidance if screenshots remain manual.
  - Expected behavior: data already modeled in Payload becomes visible in the portfolio instead of sitting unused.
  - Logging requirements: WARN on malformed external URLs during server-side mapping or seed normalization; do not log ordinary render paths.

- [ ] Task 12: Move hardcoded UI chrome to `messages/{en,uk}.json` and do a Ukrainian copy pass.
  - Files: `messages/en.json`, `messages/uk.json`, `src/components/sections/projects/project-card.tsx`, `src/components/sections/projects/index.tsx`, `src/app/(frontend)/[locale]/case/[slug]/page.tsx`, `src/components/archive/table.tsx`.
  - Deliverable: hardcoded labels such as `ROLE:`, `DATE:`, `LIVE`, `ROADMAP`, `NODES`, `GOAL`, and `SUMY/KYIV` are localized; `archive.sectionTag` in Ukrainian no longer remains English.
  - Expected behavior: `/uk` feels intentionally localized, not partially translated.
  - Logging requirements: no runtime logs. Rely on `next-intl` key coverage and build errors for missing messages.

### Phase 5: Accessibility, SEO, Docs, and QA

- [ ] Task 13: Add accessibility polish tied to the visual changes.
  - Files: `src/app/(frontend)/[locale]/layout.tsx`, `src/components/sections/contact.tsx`, `src/components/archive/table.tsx`, `src/components/sections/projects/project-card.tsx`, `src/components/layout/nav.tsx`.
  - Deliverable: add a skip link, verify focus rings on all brutalist controls, add accessible external-link labels, improve clipboard failure feedback, add archive table column scopes/caption, and verify telemetry region labelling.
  - Expected behavior: the sharper visual system remains keyboard and screen-reader friendly.
  - Logging requirements: clipboard failure should produce a user-facing toast and may log WARN in development; no logs for successful focus/navigation behavior.

- [ ] Task 14: Add SEO/social polish appropriate for public MVP2.
  - Files: `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `public/` assets, `src/app/(frontend)/[locale]/case/[slug]/page.tsx`.
  - Deliverable: favicon/apple icon/default OG image exist, metadata includes OG/Twitter images, placeholder/roadmap case policy is reflected in sitemap/noindex behavior, and case screenshots can be used as OG images when available.
  - Expected behavior: shared links look professional and crawlers do not promote unfinished case pages.
  - Logging requirements: no runtime logs. If metadata generation encounters invalid URLs, handle with deterministic fallbacks and WARN only in development.

- [ ] Task 15: Update documentation for the finalized polish system.
  - Files: `.cursor/docs/design_system_new.md`, `AGENTS.md` if workflow/rules change, optionally `.ai-factory/DESCRIPTION.md`.
  - Deliverable: document the shared brutalist motion contract, nav scroll behavior, stack section pattern, reduced-motion expectations, and manual QA checklist.
  - Expected behavior: future agents do not reintroduce inconsistent hover/card/nav motion.
  - Logging requirements: no runtime logs; documentation task only.

- [ ] Task 16: Run the full manual verification gate.
  - Files: no source changes expected except fixes discovered during QA.
  - Deliverable: run `bun run lint`, `bun run build`, and manually check `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/archive`, `/uk/archive`, `/en/case/portfolio-cms`, `/uk/case/portfolio-cms`, `/admin`, all four themes, keyboard navigation, reduced motion, mobile drawer, and print preview.
  - Expected behavior: site feels smooth and pleasant on desktop and mobile; there are no obvious "toporno" hover/shadow/scroll artifacts.
  - Logging requirements: command output is enough for lint/build; do not add new app logs for QA unless a bug fix requires WARN/ERROR handling.

## Manual QA Checklist

- [ ] Buttons: primary, secondary, archive CTA, print, resume/download, drawer trigger, telemetry, locale/theme switchers all use consistent hover and active geometry.
- [ ] Cards: project, archive, resume bento, related case links, and stack placks keep shadow visually anchored and avoid clipping.
- [ ] Nav: desktop click from `hero` to `contact` remains visually stable; moving the mouse during smooth scroll does not create flicker.
- [ ] Drawer: link click closes drawer calmly, scrolls to target, respects reduced motion, and focus returns correctly.
- [ ] Stack: metrics and skill placks visually match the reference prototype while using production data.
- [ ] Content: no obvious placeholder case copy, duplicate archive URLs, outdated Next.js version, or mixed EN/UK labels.
- [ ] Themes: light, dark, warm, contrast all preserve hard-shadow contrast and visible focus rings.
- [ ] Reduced motion: no smooth scroll or hover animation dependence for core usability.
- [ ] Verification commands: `bun run lint`, `bun run build`.

