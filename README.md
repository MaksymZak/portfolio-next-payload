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
- [.agents/docs/project-context.md](./.agents/docs/project-context.md) — project purpose, positioning, constraints, MVP scope, and SDD direction.
- [.agents/docs/release-plan.md](./.agents/docs/release-plan.md) — current release slicing, implementation status, and deferred scope.
- [.agents/docs/spec-kit-prompt-pack.md](./.agents/docs/spec-kit-prompt-pack.md) — ready-to-run Spec Kit prompt package for the first `portfolio-mvp` cycle.
- [.agents/docs/stitch-portfolio-brief.md](./.agents/docs/stitch-portfolio-brief.md) — archived visual brief from Stitch.
- [.agents/docs/stitch-prompt-workflow.md](./.agents/docs/stitch-prompt-workflow.md) — archived Stitch workflow and prompt notes.

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
- `tests/e2e` and `tests/int` — end-to-end and integration coverage.

## Useful Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm test:int
pnpm test:e2e
pnpm build
```

## Recommended Next Step

After the documentation pass is approved, initialize Spec Kit and run the prepared prompt package from `.agents/docs/spec-kit-prompt-pack.md` in this order:

1. `constitution`
2. `specify`
3. `clarify`
4. `plan`
5. `tasks`
6. `analyze`
7. `implement`
