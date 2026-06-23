# Release Plan

Дата: 2026-06-06

## Purpose

This file is the working release map for the portfolio.

It exists to prevent three common failures:

- losing good ideas after cutting MVP scope;
- mixing implemented work with planned work;
- forgetting what belongs to `MVP2` and `MVP3` after `MVP1` is shipped.

## Status Rules

Use these labels explicitly and keep them current:

- `implemented` — already built in the repository.
- `in-progress` — currently being implemented.
- `planned` — approved for the current target release, but not built yet.
- `deferred` — intentionally moved to a later release.
- `open` — still needs a user decision in interview mode.

Important rule:

- if something is not built, do not describe it as done;
- if something moves out of `MVP1`, move it to `MVP2` or `MVP3` immediately;
- after every completed implementation slice, update this file.

## Current Project-Level Progress

### Restart — Spec-Based Rebuild (active)

The hand-written MVP1 UI was intentionally deleted and rebuilt from scratch on a
modern stack. Only typed data (`src/content/portfolio`, `src/lib/portfolio`) was
kept. Work is now sliced as one page-or-shell per spec under `specs/`.

Stack locked: Next.js 16 (App Router) · next-intl 4 (`en`/`uk`, prefix always) ·
next-themes (4 themes: light/dark/warm/contrast) · Tailwind 4 + shadcn/ui ·
IBM Plex Sans + JetBrains Mono (latin+cyrillic). Design direction: Swiss
Technical Editorial. Package manager: bun.

**Verification policy:** this project does NOT use an automated test suite. The
former `tests/` directory, Vitest, and Playwright were removed. Verification is
`bun run lint`, `bun run build`, and manual checks (mobile/tablet/desktop, four
themes, EN/UK parity).

- `implemented` — **`002-foundation`**: app shell complete. i18n routing
  (`src/i18n/*`) + Next 16 `proxy.ts`; root `/`→`/en` redirect; localized
  `[locale]` layout/home stub; 4-theme system via next-themes + token contract
  in `globals.css` mapped onto shadcn variables (`@theme inline`); responsive
  header (wordmark, nav placeholders, locale switcher, theme switcher, mobile
  Sheet nav), footer (public contacts only, no private repo), skip-to-content;
  EN/UK message catalogs at parity. `bun run lint` and `bun run build` pass;
  smoke test confirms `/`→`/en`, EN/UK render, localized nav.
- `implemented` — **`003-homepage`**: bilingual homepage shipped in section
  order hero → proof/metrics → core skills → selected projects (`#work`) →
  commercial proof (`#experience`) → contact (`#contact`). Server components read
  from `src/content/portfolio/home.ts` (`getHomeContent(locale)`); real contact
  channels and goiteens example URLs; only the `Portfolio CMS` card navigates
  (LMS / Landing Version System stay non-navigating `coming next`); outbound
  links use `rel="noopener noreferrer"`. `bun run lint` and `bun run build`
  pass; smoke test confirms EN/UK render, anchors, statuses, and parity.
  Follow-up: the hero `View resume` CTA (`/[locale]/resume`) and the
  `Portfolio CMS` card link (`/[locale]/projects/portfolio-cms`) land in
  `004-resume` / `005-case`; they 404 until those slices ship.
- `planned` — `004-resume`: localized compact resume + print action.
- `planned` — `005-case`: `Portfolio CMS` case page.
- `planned` — `006-seo`: metadata, hreflang, sitemap, structured data.

### Superseded by the restart

- `superseded` — the original hand-written MVP1 UI in
  `src/components/portfolio/{sections,theme,ui}`, the `[lang]` routes, and
  `styles.css` were removed; their behaviors are being rebuilt per spec above.
- `implemented` — typed content + helpers in `src/content/portfolio` and
  `src/lib/portfolio` were retained as data (the former integration tests were
  removed under the no-test policy).

### Implemented now

- `implemented` — active docs were consolidated.
- `implemented` — `DESIGN.md` became the visual source of truth.
- `implemented` — `.agents/docs/project-context.md` became the canonical project context file.
- `implemented` — `AGENTS.md` now requires interview mode for ambiguous decisions.
- `implemented` — `AGENTS.md` now requires explicit implementation status tracking.
- `implemented` — `.agents/docs/reference.md` now consolidates the former Stitch brief, Stitch workflow, Spec Kit prompt pack, and Spec Kit command reference into one reference file; per-page v0.dev design prompts live in `.agents/docs/v0/`.

### Not implemented yet

- `planned` — Spec Kit bootstrap and initialization.
- `implemented` — `portfolio-mvp` specification artifact created at `specs/001-portfolio-mvp/spec.md`.
- `implemented` — actual MVP1 frontend implementation.
- `implemented` — MVP1 content foundation now exists in `src/content/portfolio` with EN/UK typed content, proof examples, project-card states, and shared theme labels.
- `implemented` — MVP1 route, metadata, and theme helper scaffolding now exists in `src/lib/portfolio`.
- `implemented` — foundational portfolio UI entrypoints now exist in `src/components/portfolio`.
- `implemented` — root redirect plus localized route skeletons now build for `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/projects/portfolio-cms`, and `/uk/projects/portfolio-cms`.
- `implemented` — global frontend shell, CSS-token theme foundation, `next/font` setup, and theme bootstrap/switcher are now active in `src/app/(frontend)`.
- `implemented` — homepage recruiter-scan slice now ships hero proof, metrics, core skills, commercial proof, selected projects, contact section, and theme persistence in both locales.
- `superseded` — former homepage E2E coverage was removed under the no-test policy; verification is now `bun run lint`, `bun run build`, and manual checks.
- `implemented` — localized compact resume pages now ship in EN/UK with recruiter-facing sections and a browser print action.
- `superseded` — former resume E2E coverage was removed under the no-test policy.
- `implemented` — localized `Portfolio CMS` case pages now ship the required overview, goals, stack, proof, scope, architecture, and workflow sections.
- `superseded` — former case-page E2E coverage was removed under the no-test policy.
- `planned` — actual Payload modeling and content migration.

## Locked Decisions For MVP1

- `planned` — root `/` redirects to `/en`.
- `planned` — required localized routes are `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/projects/portfolio-cms`, `/uk/projects/portfolio-cms`.
- `planned` — homepage has two equal hero CTAs: `View resume` and `Get in touch`.
- `planned` — `MVP1` explicitly states availability for remote frontend opportunities on the homepage.
- `planned` — the homepage in `MVP1` does not use a personal photo; the primary signal stays editorial and engineering-focused.
- `planned` — a personal photo is allowed in the CV / resume presentation.
- `planned` — `Get in touch` points to a contact section on the homepage, not a separate contact page.
- `planned` — the contact section in `MVP1` includes email, LinkedIn, GitHub, and Telegram.
- `planned` — `MVP1` shows the public GitHub profile, but does not link to the private portfolio repository.
- `planned` — homepage includes hero, proof/metrics, commercial landing pages block, selected projects block, theme switcher, and contact CTA.
- `planned` — the homepage in `MVP1` includes a compact `Core skills / stack` row, but not a full standalone skills section.
- `planned` — the `Selected Projects` block in `MVP1` contains 3 cards: `Portfolio CMS`, `LMS coming next`, and `Landing Version System coming next`.
- `planned` — `Portfolio CMS` gets its own case page in `MVP1`.
- `planned` — the `Portfolio CMS` case page in `MVP1` includes `Overview`, `Goals`, `Stack`, `What it demonstrates`, `Current scope / next steps`, `Architecture decisions`, and `SDD / Spec Kit workflow`.
- `planned` — `MVP1` openly communicates `Current scope / next steps` and `coming next` items instead of pretending the project is fully finished.
- `planned` — `Commercial Landing Pages` stays an aggregated block on the homepage in `MVP1`.
- `planned` — `Commercial Landing Pages` in `MVP1` uses a mixed format: an aggregated proof block inside the site plus several external links to the best public examples.
- `planned` — `Commercial Landing Pages` in `MVP1` includes 6 selected external public examples.
- `planned` — `Commercial Landing Pages` in `MVP1` uses mixed presentation for examples: a few visual previews for the strongest cases, while the rest can stay text-led with outbound links.
- `planned` — inside the site, `Commercial Landing Pages` avoids strong emphasis on brand names; real public brands remain accessible through the external links.
- `planned` — `LMS` and `Landing Version System` appear only as `coming next` cards in `MVP1`.
- `planned` — resume exists in EN and UK.
- `planned` — the `resume` in `MVP1` includes `Header`, `Positioning summary`, `Core skills`, `Experience summary`, `Selected projects`, and `Contacts`.
- `planned` — PDF flow exists in `MVP1` as a simple working export, not a polished print system.
- `planned` — `Download PDF` in `MVP1` opens a print-friendly resume page and relies on browser print-to-PDF, not prebuilt files or server-side generation.
- `planned` — initial content source is a typed content layer in code.
- `planned` — `EN` and `UK` content in the typed data layer are written as full first-class versions, not secondary simplified adaptations.
- `planned` — theme selector with 4 curated themes is part of `MVP1`.
- `planned` — default theme in `MVP1` is `light`, and the user-selected theme is persisted locally.
- `planned` — `Payload` remains in the project during `MVP1`, but the public site does not depend on it yet; runtime public content stays in typed code data for the first release.
- `planned` — `EN` and `UK` are full peers in `MVP1` across all required pages and key blocks.
- `planned` — the hero/proof signal in `MVP1` uses the public metrics `4+ years frontend`, `300+ landing pages`, and `Next.js / CMS-driven / production support`.
- `planned` — the primary professional label on the first screen in `MVP1` is `Middle Frontend Developer with React, Next.js, and CMS-driven websites`.

## MVP1

### Goal

Ship a public hiring-ready portfolio that is clean, fast to scan, and strong enough to start real job outreach.

### Must be in scope

- localized homepage in EN and UK;
- localized resume pages in EN and UK;
- resume sections limited to `Header`, `Positioning summary`, `Core skills`, `Experience summary`, `Selected projects`, and `Contacts`;
- one detailed `Portfolio CMS` case page in EN and UK;
- `Portfolio CMS` case content covering overview, goals, stack, proof value, architecture decisions, and SDD workflow;
- honest communication of `Current scope / next steps` and `coming next` items where relevant;
- homepage sections already agreed in interview mode;
- explicit availability signal for remote frontend opportunities on the homepage;
- compact `Core skills / stack` row on the homepage, without a separate full skills section;
- `Selected Projects` block with 3 cards: one active case and two `coming next` cards;
- aggregated `Commercial Landing Pages` proof block;
- mixed `Commercial Landing Pages` presentation with selected external example links;
- 6 selected external public examples for the commercial proof block;
- mixed visual treatment for commercial examples: several screenshot-led previews plus text-led linked entries;
- muted in-site brand emphasis for commercial examples, with real brands available through outbound public links;
- public proof metrics based on `4+ years frontend`, `300+ landing pages`, and `Next.js / CMS-driven / production support`;
- first-screen professional label: `Middle Frontend Developer with React, Next.js, and CMS-driven websites`;
- public GitHub profile only, without exposing or referencing a private portfolio repository;
- no personal photo on the homepage;
- simple contact section on homepage;
- simple working PDF export path;
- theme switcher with 4 themes;
- basic SEO and metadata;
- typed content layer in code;
- full first-class `EN` and `UK` content in the typed data layer;
- full `EN` and `UK` parity across required pages and core sections;
- `Payload` present in the repository, but not required as the public content source for `MVP1`.

### Must stay out of scope

- separate projects index page;
- separate contact page;
- automatic locale detection;
- polished print-quality PDF system;
- full LMS case study;
- full Landing Version System demo;
- broad Payload admin/content modeling before structure is approved;
- public-site dependency on Payload content before the first release structure is stable.

### Current status

- `implemented` — documentation and planning baseline.
- `implemented` — `portfolio-mvp` specification artifact exists at `specs/001-portfolio-mvp/spec.md`.
- `implemented` — slice 1 content foundation and route helper layer.
- `implemented` — foundational parity/helper coverage for typed content and metadata helpers.
- `implemented` — slice 2 layout/theme foundation and localized route skeletons.
- `implemented` — slice 3 homepage composition and recruiter-scan sections.
- `implemented` — slice 4 resume composition and print-readiness.
- `implemented` — slice 5 `Portfolio CMS` case-page composition and proof-honesty polish.
- `implemented` — final metadata polish, accessibility pass, and cross-slice validation.

## MVP2

### Purpose

Turn the first release from a strong static portfolio into a stronger product/system showcase.

### Candidate scope

- move approved content from typed code data into Payload where it actually helps;
- add minimal Payload collections and admin flow after structure is validated;
- integrate media storage flow with Cloudflare R2;
- improve the `Portfolio CMS` case depth;
- upgrade `LMS` from `coming next` into a real case if ready;
- add more structured SEO and richer metadata where justified.

### Recommended first migration order

1. `Portfolio CMS` case content
2. `Commercial Landing Pages` structured case data
3. media assets and R2-backed media flow
4. experience and skills support content
5. optional broader SEO-managed content

Keep the short `resume` content curated in code unless there is a strong reason to move it later.

### Status

- `planned` — `MVP2` is the first release where Payload should begin taking ownership of approved public content.
- `planned` — the first Payload migration targets are `Portfolio CMS`, commercial case data, and media, while `resume` stays code-curated by default.
- `deferred` — all items above are later than `MVP1` unless explicitly pulled forward.

## MVP3

### Purpose

Add secondary proof and broader depth without bloating the first two releases.

### Candidate scope

- full `Landing Version System` sanitized demo;
- deeper case-study system or richer project architecture pages;
- stronger CMS workflows and richer admin ergonomics;
- better production polish around PDF/export/automation if still valuable;
- any non-critical experimental enhancements.

### Status

- `deferred` — intentionally later.

## Open Decisions

- `open` — none currently blocking `portfolio-mvp clarify` or `portfolio-mvp plan`.

## Next Planning Move

The next practical step is to run `clarify` for `portfolio-mvp`, then move into `plan` using the created specification artifact.

That package must still follow these rules:

- `constitution` defines project principles;
- `portfolio-mvp specify` describes only `MVP1` and is now captured in `specs/001-portfolio-mvp/spec.md`;
- `clarify` checks implementation-blocking ambiguity without reopening locked decisions;
- `plan` and `tasks` must keep `MVP2` and `MVP3` out of active implementation unless explicitly promoted.
