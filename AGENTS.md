# Portfolio

## Agent Notes

- This repo uses version-matched Next.js docs bundled with the installed package. Read the relevant doc in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) before changing any Next.js behavior.
- The official Next.js guide for AI coding agents is [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents).
- Keep project-level instructions in this file so Claude Code and other agents load them at startup.
- Skills live in [.agents/skills](.agents/skills). Each skill has its own `SKILL.md`.
- Relevant skills in this repo are [`payload`](.agents/skills/payload/SKILL.md), [`shadcn`](.agents/skills/shadcn/SKILL.md), [`frontend-design`](.agents/skills/frontend-design/SKILL.md), and [`vercel-react-best-practices`](.agents/skills/vercel-react-best-practices/SKILL.md).

## Project Structure

- `src/app/(frontend)` contains the public site.
- `src/app/(payload)` contains the Payload app shell, admin entrypoints, and API routes.
- `src/collections` contains Payload collections.
- `src/payload.config.ts` is the main Payload configuration.
- `src/payload-types.ts` is generated Payload type output.
- `tests/e2e` and `tests/int` contain end-to-end and integration coverage.
