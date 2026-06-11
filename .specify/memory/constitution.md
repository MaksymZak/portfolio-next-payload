<!--
Sync Impact Report
- Version change: 1.2.0 -> 1.3.0
- Modified principles:
  - V. Small, Verifiable Delivery (added explicit no-automated-test-suite policy;
    verification is `bun run lint`, `bun run build`, and manual checks)
- Added sections:
  - None
- Removed sections:
  - None (all 8 principles preserved)
- Templates requiring updates:
  - ✅ .specify/templates/tasks-template.md (Tests note now forbids test tasks/tooling;
    `tests/` path convention removed)
- Follow-up TODOs:
  - None
-->

# Portfolio Next Payload Constitution

## Core Principles

### I. Hiring Outcome First

Every active scope decision MUST improve one of two outcomes: faster recruiter scanning
or a more usable MVP for real job outreach. Work that does not strengthen hiring proof,
clarify positioning, or remove an MVP blocker MUST be deferred. This keeps the project
focused on shipping a credible portfolio instead of a broad showcase app.

### II. Honest, Public-Safe Evidence

Public content MUST stay honest, compact, and safe to publish. The project MUST never
expose private repositories, corporate code, internal client architecture, or implied
proof that is not publicly supportable. Content MUST clearly separate what is already
built from what is planned next, and it MUST present strong frontend delivery,
CMS-driven website work, landing-page production experience, and reliable implementation
habits without overstating seniority or fullstack proof.

The primary professional label is "Middle Frontend Developer (React, Next.js,
CMS-driven websites)". Full-stack capability is secondary and supporting only; it MUST
NOT be presented as fully proven senior fullstack work. Trust is the product.

### III. Bilingual MVP Parity

English and Ukrainian MUST be treated as equal first-class MVP languages. Required MVP
routes, core sections, and public proof statements MUST exist in both languages with
equivalent meaning, status labeling, and hiring signal. Parity gaps are allowed only
when explicitly documented as deferred outside the active release. This protects scan
clarity for both audiences and prevents one language from becoming a stale fallback.

### IV. Swiss Technical Editorial Consistency

Visual and content-structure decisions MUST follow the design contract in `DESIGN.md`,
which is the single visual source of truth. The visual direction is **Swiss Technical
Editorial**: refined minimalism, a strict typographic grid, monospaced labels for
metadata and UI chrome, a single strong accent, sharp geometry (zero border radius),
and restrained motion. The underlying values are unchanged: recruiter scan speed,
restrained motion, sharp hierarchy, accessibility, and token-based theming take priority
over novel visual experiments. Any deviation MUST be justified in planning as a
necessary exception, not a stylistic preference.

- **Mobile-first is mandatory.** All UI MUST be implemented mobile-first: base styles
  target small screens (~375px) and scale up using Tailwind responsive prefixes.
  Components MUST NOT be designed for a single desktop screen. Every section MUST be
  verified at mobile, tablet, and desktop breakpoints before it is considered complete.
- **Tokens drive theming.** shadcn/ui semantic CSS variables MUST be mapped from the
  `DESIGN.md` token contract (`--background`, `--foreground`, `--surface`, `--border`,
  `--accent` -> `--primary`, `--ring`, `--radius` = 0, `--font-sans`, `--font-mono`),
  not invented separately. Bespoke hand-written component CSS class systems (such as the
  previous `.portfolio-*` approach) MUST NOT be reintroduced.

The portfolio must read as production-ready and technically reliable at first glance.

### V. Small, Verifiable Delivery

Implementation MUST prefer simple, maintainable solutions over speculative systems.
Work MUST be sliced into small, reviewable increments with explicit validation and
release-plan tracking. Plans and tasks MUST avoid premature abstraction,
premature runtime CMS dependency, and broad parallel work that obscures status. Small,
verifiable delivery is required because this project must ship quickly without losing
trust or maintainability.

This project does NOT maintain an automated test suite. There are no Vitest,
Playwright, or other unit/integration/e2e tests, and plans, tasks, and
implementations MUST NOT add test files, test tooling, or test tasks. Verification
is performed through `bun run lint`, `bun run build`, and manual checks (mobile/
tablet/desktop breakpoints, all four themes, and EN/UK parity).

### VI. Agent Skills & Usage

Agents and automated assistants MUST consult and use appropriate skills located in
the `.agents/skills` directory when those skills apply to the task. When an agent
uses one or more skills, the agent MUST record which skill(s) were consulted (path
and name) and include that reference in the feature plan, task list, or release-plan
notes so reviewers can reproduce or audit the automated steps.

Rationale: Keeping agents tied to curated local skills ensures predictable behavior,
reproducibility, and that project-specific conventions are followed rather than
relying solely on general model knowledge.

### VII. Documentation via Context7 MCP

Agents MUST use the Context7 MCP documentation tools (resolve-library-id and
query-docs) to fetch authoritative, up-to-date documentation for libraries, frameworks,
APIs, and SDKs before making implementation decisions that depend on external
behavior. Agents MUST cite the Context7 library ID or direct snippet references in the
Technical Context of plans and specs.

Rationale: Using Context7 for documentation removes ambiguity from stale training data
and ensures the agent references exact, versioned documentation for technical choices.

### VIII. Interview Mode for Clarifications

Any question that requires the user's explicit approval or that is ambiguous enough to
affect scope, public-safety, parity, or governance MUST be asked in interview/clarify
mode (interactive prompts) and not assumed by the agent. Agents MUST not proceed
with approval-required changes without explicit user confirmation captured in the
conversation history.

Rationale: This preserves human governance over sensitive or scope-changing decisions
and ensures the user remains the final approver for policy-sensitive actions.

## Delivery Scope & Evidence Boundaries

- The active product is a hiring-focused portfolio for a remote Middle Frontend role
  built with Next.js and Payload in this repository.
- MVP scope MUST stay disciplined and optimized for recruiter scan speed.
- MVP public proof MUST prioritize frontend delivery, CMS-driven website experience,
  landing-page production work, and reliable implementation habits.
- Public-facing content MUST distinguish `implemented`, `in-progress`, `planned`,
  `deferred`, and `coming next` states whenever status affects trust.
- Russian localization is out of scope for MVP.
- Public GitHub presence MAY be shown, but private repository links or references MUST
  remain absent from public experience and public docs.
- Payload MAY exist in the repository before it becomes a runtime public content source,
  but that shift MUST not happen until the active release plan explicitly approves it.

### Mandatory Technical Stack

The following stack is locked for this project. Substitutions MUST be approved through
an amendment (interview mode) and reflected here before use.

- **Framework & language**: Next.js 16 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS 4, utility-first. Bespoke hand-written component CSS class
  systems (e.g. the previous `.portfolio-*` approach) MUST NOT be used.
- **Component primitives**: shadcn/ui (Radix-based), managed via `components.json`.
- **Internationalization**: next-intl for EN/UK. The locale path prefix is ALWAYS
  present, the default locale is `en`, and automatic locale detection MUST be disabled.
- **Theming**: next-themes for the 4-theme switcher using a `data-theme` attribute,
  default `light`, persisted locally.
- **CMS**: Payload CMS 3 remains installed for admin/migration but MUST NOT be the
  runtime public content source for MVP1. The public site uses a typed content layer in
  code.
- **Database & deployment**: Postgres as the database; Vercel as the deployment target.
- **Icons & component utilities**: lucide-react for icons; `clsx` + `tailwind-merge`
  (the `cn` helper) + `class-variance-authority` for component variants.
- **State management**: minimal. No Zustand for MVP1 — theme and locale state are
  handled by next-themes and routing. Zustand MAY be introduced only if a future release
  explicitly justifies it.

### Accessibility & Performance Baseline

- Default themes MUST target WCAG AA contrast; the High Contrast theme is the
  accessibility-first fallback.
- All motion MUST respect `prefers-reduced-motion`.
- Focus indicators MUST be visible and MUST NOT rely on color alone.
- Each page MUST keep recruiter scan speed as the priority over visual spectacle.

## Workflow & Release Planning

- The canonical supporting documents are `DESIGN.md`,
  `.agents/docs/project-context.md`, and `.agents/docs/release-plan.md`.
- `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, and
  implementation work MUST stay inside the currently approved release slice unless the
  release plan is amended first.
- Every implementation plan MUST include a Constitution Check that verifies hiring
  outcome fit, public-safety compliance, EN/UK parity, design-contract alignment
  (including mobile-first), mandatory-stack compliance, and small-slice validation
  strategy.
- Every task list MUST organize work into independently verifiable slices, include the
  validation expected for each slice (including mobile/tablet/desktop verification for
  UI work), and identify release-plan updates when delivery status changes.
- After each completed slice, `.agents/docs/release-plan.md` MUST be updated so current
  implementation status stays explicit.
- Ambiguities that can change scope, trust, or parity MUST be clarified before
  implementation. Non-blocking ideas belong in later release planning, not in the
  active MVP.

### Specification Slice Granularity

To avoid overloading a single specification (a past failure), specifications MUST be
scoped at **one-page-per-spec** granularity for this project:

- One `/speckit.specify` per page or page-group (e.g. foundation, homepage, resume,
  case page, seo). A single giant spec for the whole site is NOT allowed, and a separate
  spec per individual UI section is also NOT allowed.
- Within a page spec, individual UI sections MUST be implemented one at a time.
- When an external design tool (e.g. v0.dev) is used to draft a section, each design
  prompt MUST cover exactly one section. Generated code MUST be refactored to the
  project's structure, tokens, i18n, and accessibility before being committed.
  Generated code MUST NOT be copied verbatim into production.

## Governance

This constitution overrides conflicting lower-level planning notes, prompt packs, and
workflow defaults. Amendments MUST: (1) describe the governance change, (2) update any
affected templates or runtime guidance in the same change, and (3) include a Sync
Impact Report at the top of this file summarizing what changed.

Versioning follows semantic versioning for governance:

- MAJOR: remove or redefine a principle in a backward-incompatible way.
- MINOR: add a new principle or materially expand governance requirements.
- PATCH: clarify wording, tighten language, or make non-semantic refinements.

Compliance review is mandatory for every new specification, plan, task list, and
release-plan update. Reviewers and implementers MUST verify that scope remains honest,
public-safe, bilingual where required, design-consistent (Swiss Technical Editorial,
mobile-first, token-mapped), stack-compliant, and tracked as small, verifiable slices
before work is considered complete.

**Version**: 1.3.0 | **Ratified**: 2026-06-08 | **Last Amended**: 2026-06-09
