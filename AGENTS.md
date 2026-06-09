# Portfolio

## Agent Notes

- This repo uses version-matched Next.js docs bundled with the installed package. Read the relevant doc in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) before changing any Next.js behavior.
- The official Next.js guide for AI coding agents is [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents).
- Keep project-level instructions in this file so Claude Code and other agents load them at startup.
- Skills live in [.agents/skills](.agents/skills). Each skill has its own `SKILL.md`.
- Relevant skills in this repo are [`payload`](.agents/skills/payload/SKILL.md), [`shadcn`](.agents/skills/shadcn/SKILL.md), [`frontend-design`](.agents/skills/frontend-design/SKILL.md), and [`vercel-react-best-practices`](.agents/skills/vercel-react-best-practices/SKILL.md).
- Active planning docs are [DESIGN.md](DESIGN.md), [.specify/memory/constitution.md](.specify/memory/constitution.md), [.agents/docs/project-context.md](.agents/docs/project-context.md), and [.agents/docs/release-plan.md](.agents/docs/release-plan.md). Stitch documents under `.agents/docs/` are reference material only.
- For any ambiguous, disputed, or underspecified project decision, switch to interview mode and ask the user clarifying questions one at a time before choosing an approach or writing implementation code.
- Keep implementation status explicit. After each completed slice, update [.agents/docs/release-plan.md](.agents/docs/release-plan.md) so it clearly shows what is implemented, what is in progress, what is next, and what is deferred to later releases.

## Project Structure

- `src/app/(frontend)` contains the public site.
- `src/app/(payload)` contains the Payload app shell, admin entrypoints, and API routes.
- `src/collections` contains Payload collections.
- `src/payload.config.ts` is the main Payload configuration.
- `src/payload-types.ts` is generated Payload type output.
- This project does not use an automated test suite; verification is `bun run lint`, `bun run build`, and manual checks.
