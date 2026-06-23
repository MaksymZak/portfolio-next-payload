# Reference

Дата: 2026-06-09

Consolidated reference distilled from the former `stitch-portfolio-brief.md`,
`stitch-prompt-workflow.md`, `spec-kit-prompt-pack.md`, and
`spec-kit-commands-ru.md`. Those four files were removed; everything still needed
is captured here so no context is lost.

This file is **reference material**, not an active source of truth. The active
docs are, in priority order:

1. `.specify/memory/constitution.md`
2. `.agents/docs/release-plan.md`
3. `.agents/docs/project-context.md`
4. `DESIGN.md`

---

## Person & positioning

- **Name:** Maksym Zakaliuzhnyi.
- **Location:** Sumy, Ukraine. **Remote only.** Target market: Ukraine + Europe.
  Russian market is explicitly out of scope.
- **Primary positioning:** Middle Frontend Developer with React, Next.js,
  TypeScript, CMS-driven websites, landing systems, performance, and production
  support.
- **Secondary positioning:** Frontend developer with backend-integration
  experience and growing fullstack skills.
- **Constraint:** do not present as a proven senior/fullstack engineer yet.
- **Resume role label:** "Middle Frontend / Next.js Developer". Avoid "Full Stack
  Developer" as the headline until backend proof is stronger.

## Contacts

- Email: `zaksumy1989@gmail.com`
- Phone: `+380 99 432 20 85` (**resume only**, not on the public homepage)
- Telegram: `https://t.me/MaksymZak`
- GitHub: `https://github.com/MaksymZak`
- LinkedIn: `https://www.linkedin.com/in/mzakaliuzhnyi/`

Public site contacts = email, Telegram, LinkedIn, GitHub. Never link the private
portfolio repository.

## Experience

- **GoITeens Company — Frontend Developer — June 2024 → Present:** production
  landing pages with Next.js, Payload CMS, Astro, Gulp; A/B testing,
  analytics-aware updates, conversion-oriented changes; mentoring via review.
- **SoftRyzen Company — Frontend Developer — July 2022 → April 2024:** high
  volume of commercial landing pages and frontend interfaces with Gulp, React,
  JS, CSS; responsive production UI; maintainability/performance improvements.
- **Totals:** 4+ years commercial frontend; 300+ landing pages delivered or
  supported.

## Education & languages

- Full Stack Web Development Bootcamp — 2021.
- Ukrainian — native. English — pre-intermediate (working level for technical
  reading).

## Skills (grouped, no self-rated bars)

- **Core frontend:** HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind.
- **CMS / backend integration:** Payload CMS, REST APIs, auth flows, PostgreSQL,
  MongoDB.
- **State / data:** Redux, Zustand, React Query.
- **Tooling:** Git, Vercel, Docker basics, Gulp, Astro, npm/pnpm/bun.
- **Growing:** Nest.js, testing, fullstack architecture, Spec-Driven Development,
  AI-assisted workflow with manual review.

## Commercial landing examples (public, goiteens)

Six selected for the homepage proof block (real public links):

1. Fast Reading — https://fast-reading.goiteens.com/
2. NMT 2026 — https://nmt.goiteens.com/nmt-2026/
3. Painting: Three Courses — https://painting.goiteens.com/three-courses/
4. AI Creator — https://ai-creator.goiteens.com/
5. School Webinar — https://school-lp.goiteens.com/webinar-ai/
6. Interior Design — https://interior-design.goiteens.com/

Additional candidates (not used in MVP1, kept for reference): Painting Tablet
`https://painting-on-tablet.goiteens.com/v-1/`, Summer AI
`https://summer-ai-courses.goiteens.com/`, Python `https://python.goiteens.com/`.

Rule: describe the role honestly (implementation, responsive work, production
support, A/B testing, content updates); keep brand names understated; the live
link is the proof.

## Scope & honesty guardrails

- **Public routes (MVP1):** `/en`, `/uk`, `/en/resume`, `/uk/resume`,
  `/en/projects/portfolio-cms`, `/uk/projects/portfolio-cms`. Root `/` → `/en`.
- **Selected Projects:** exactly 3 cards — Portfolio CMS (implemented, has a case
  page) + LMS and Landing Version System (honest "coming next", no case page).
- **Commercial Landing Pages:** stays an aggregated homepage proof block (not a
  separate index), 6 examples, mixed visual + text-led.
- **Resume:** short, one A4 page when printed; sections = Header, Positioning
  summary, Core skills, Experience summary, Selected projects, (Education &
  languages), Contacts. Browser print → PDF; no heavy print automation.
- **Content ownership:** code owns runtime public content for MVP1. Payload stays
  installed for admin + future migration but is **not** the public runtime source
  until the structure is validated (MVP2+).
- **Must not happen in MVP:** Russian version; public/private repo of portfolio
  code; corporate code or internal architecture exposure; selling as
  senior/fullstack without proof; 100-link case dump; long auto-generated PDF;
  whole site pushed into CMS; long design loop before shipping.

## Design direction (summary)

Full contract: `DESIGN.md`. Direction = **Swiss Technical Editorial**: strict
grid, sharp corners (`--radius: 0`), 1px borders, monochrome surfaces, one rare
accent `#ff4f00`, mono uppercase labels (IBM Plex Sans + JetBrains Mono, latin +
cyrillic). Four themes: light / dark / warm / contrast. Mobile-first. Restrained
motion; recruiter scan speed over spectacle.

## Design generation workflow (v0)

We use **v0.dev** (Vercel) for visual exploration — the earlier Stitch workflow is
retired. Per-page, ready-to-paste v0 prompts live in `.agents/docs/v0/`:
`homepage.md`, `resume.md`, `case.md`. Each has a shared design-context prefix +
section-by-section prompts.

Cycle per page: spec → plan → tasks → (optional v0 visual exploration) → I
integrate/refactor v0 output into tokenized server components with i18n + a11y →
implement → verify (`bun run lint`, `bun run build`, manual: breakpoints, 4
themes, EN/UK parity) → update `release-plan.md` → commit. **v0 output never goes
to production directly** — always through the refactor layer.

## Spec Kit command quick reference

Run order: `constitution → specify → clarify → checklist → plan → tasks →
analyze → implement`. (Available as agents, e.g. `speckit.specify`.)

- **constitution** — create/update `.specify/memory/constitution.md` (project-wide
  rules, scope, governance). Re-run to amend.
- **specify** — create one feature spec under `specs/<feature>/spec.md` (user
  scenarios, functional requirements, success criteria).
- **clarify** — ask targeted questions to remove ambiguity; encode answers back
  into the spec.
- **checklist** — generate a requirements-quality checklist for the feature.
- **plan** — produce the implementation plan / design artifacts for the feature.
- **tasks** — generate an ordered, verifiable `tasks.md`.
- **analyze** — non-destructive consistency check across spec/plan/tasks.
- **implement** — execute the tasks.

Working rule: 1 spec = 1 page-sized slice. Keep the process lightweight; don't
reopen already-locked decisions without a real contradiction.
