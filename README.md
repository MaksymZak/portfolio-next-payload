# Portfolio Workspace

This repository is a hiring-focused portfolio site for a remote Middle Frontend / Next.js role. The project is intentionally being developed through a documentation-first workflow before feature implementation starts.

## Current Phase

- Design system cleanup and documentation consolidation.
- Spec-Driven Development setup preparation.
- No feature work should outrun the agreed context and visual contract.

## Product Goal

- Present commercial frontend experience quickly and honestly.
- Show production landing page work, CMS-driven websites, and reliable implementation skills.
- Support English and Ukrainian MVP routes.
- Keep resume and PDF output as a short curated artifact, not a dump of all CMS content.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Payload CMS 3
- Postgres
- Vercel as the intended deployment target

## Active Documentation

- [DESIGN.md](./DESIGN.md) — source of truth for visual direction, themes, token contract, layout, and component rules.
- [.specify/memory/constitution.md](./.specify/memory/constitution.md) — governance source of truth for MVP scope, trust, parity, and delivery rules.
- [.agents/docs/project-context.md](./.agents/docs/project-context.md) — project purpose, positioning, constraints, MVP scope, and SDD direction.
- [.agents/docs/release-plan.md](./.agents/docs/release-plan.md) — current release slicing, implementation status, and deferred scope.
- [.agents/docs/reference.md](./.agents/docs/reference.md) — consolidated reference: CV facts, contacts, commercial examples, scope guardrails, design + v0 workflow, and Spec Kit command quick reference.
- [.agents/docs/v0/](./.agents/docs/v0/) — ready-to-paste v0.dev design prompts per page (`homepage.md`, `resume.md`, `case.md`).

## Key Constraints

- This portfolio is a hiring tool, not a creative showpiece.
- MVP languages are English and Ukrainian only.
- Russian is out of scope for MVP.
- The first delivery should use one main Spec Kit specification: `portfolio-mvp`.
- Corporate code and private internal systems must never appear in the repository.

## Repository Areas

- `src/app/(frontend)` — public site.
- `src/app/(payload)` — Payload admin shell and API routes.
- `src/config/collections` — collection registration.
- `src/payload.config.ts` — main Payload configuration.

## Useful Commands

```bash
bun install
bun run dev
bun run lint
bun run build
```

This project does not use an automated test suite; verification is `bun run lint`, `bun run build`, and manual checks.

## Recommended Next Step

Spec Kit is initialized and the rebuild is underway one page-sized slice at a time
(see `.agents/docs/release-plan.md`). Each page follows: `specify` → `clarify` →
`plan` → `tasks` → (optional v0 visual exploration from `.agents/docs/v0/`) →
`implement` → verify (`bun run lint`, `bun run build`, manual) → update the
release plan → commit.
