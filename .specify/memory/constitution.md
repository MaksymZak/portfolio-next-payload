<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
  - Added VI. Agent Skills & Usage
  - Added VII. Context7 Documentation Requirement
  - Added VIII. Interview Mode for Clarifications
- Added sections:
  - Agent Skills & Documentation
  - Documentation via Context7 MCP
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs:
  - ⚠ Ensure `.agents/docs/` references are updated where agent-context is used
  - None blocking for this change
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
habits without overstating seniority or fullstack proof. Trust is the product.

### III. Bilingual MVP Parity
English and Ukrainian MUST be treated as equal first-class MVP languages. Required MVP
routes, core sections, and public proof statements MUST exist in both languages with
equivalent meaning, status labeling, and hiring signal. Parity gaps are allowed only
when explicitly documented as deferred outside the active release. This protects scan
clarity for both audiences and prevents one language from becoming a stale fallback.

### IV. Clean Editorial Technical Consistency
Visual and content-structure decisions MUST follow the existing Clean Editorial
Technical contract in `DESIGN.md`. Recruiter scan speed, restrained motion, sharp
hierarchy, accessibility, and the established token contract take priority over novel
visual experiments. Any deviation MUST be justified in planning as a necessary
exception, not a stylistic preference. The portfolio must read as production-ready and
technically reliable at first glance.

### V. Small, Verifiable Delivery
Implementation MUST prefer simple, maintainable solutions over speculative systems.
Work MUST be sliced into small, testable, reviewable increments with explicit
validation and release-plan tracking. Plans and tasks MUST avoid premature abstraction,
premature runtime CMS dependency, and broad parallel work that obscures status. Small,
verifiable delivery is required because this project must ship quickly without losing
trust or maintainability.

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

## Workflow & Release Planning

- The canonical supporting documents are `DESIGN.md`,
  `.agents/docs/project-context.md`, and `.agents/docs/release-plan.md`.
- `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, and
  implementation work MUST stay inside the currently approved release slice unless the
  release plan is amended first.
- Every implementation plan MUST include a Constitution Check that verifies hiring
  outcome fit, public-safety compliance, EN/UK parity, design-contract alignment, and
  small-slice validation strategy.
- Every task list MUST organize work into independently verifiable slices, include the
  validation expected for each slice, and identify release-plan updates when delivery
  status changes.
- After each completed slice, `.agents/docs/release-plan.md` MUST be updated so current
  implementation status stays explicit.
- Ambiguities that can change scope, trust, or parity MUST be clarified before
  implementation. Non-blocking ideas belong in later release planning, not in the
  active MVP.

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
public-safe, bilingual where required, design-consistent, and tracked as small,
verifiable slices before work is considered complete.

**Version**: 1.1.0 | **Ratified**: 2026-06-08 | **Last Amended**: 2026-06-08
