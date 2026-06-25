# Portfolio

## Agent Notes

- This repo uses version-matched Next.js docs bundled with the installed package. Read the relevant doc in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) before changing any Next.js behavior.
- The official Next.js guide for AI coding agents is [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents).
- Keep project-level instructions in this file so Claude Code and other agents load them at startup.
- Skills live in [.cursor/skills](.cursor/skills). Each skill has its own `SKILL.md`.
- Relevant skills in this repo are [`payload`](.cursor/skills/payload/SKILL.md), [`shadcn`](.cursor/skills/shadcn/SKILL.md), [`frontend-design`](.cursor/skills/frontend-design/SKILL.md), and [`vercel-react-best-practices`](.cursor/skills/vercel-react-best-practices/SKILL.md).
- Active planning docs are [DESIGN.md](DESIGN.md), [.specify/memory/constitution.md](.specify/memory/constitution.md), [.cursor/docs/project-context.md](.cursor/docs/project-context.md), and [.cursor/docs/release-plan.md](.cursor/docs/release-plan.md). [.cursor/docs/reference.md](.cursor/docs/reference.md) (consolidated CV/scope/workflow reference), [.cursor/docs/v0/](.cursor/docs/v0/) (per-page v0.dev design prompts), and `.cursor/docs/design-image/` are reference material only.
- For any ambiguous, disputed, or underspecified project decision, switch to interview mode and ask the user clarifying questions one at a time before choosing an approach or writing implementation code.
- Keep implementation status explicit. After each completed slice, update [.cursor/docs/release-plan.md](.cursor/docs/release-plan.md) so it clearly shows what is implemented, what is in progress, what is next, and what is deferred to later releases.

## Project Structure

- `src/app/(frontend)` contains the public site.
- `src/app/(payload)` contains the Payload app shell, admin entrypoints, and API routes.
- `src/collections` contains Payload collections.
- `src/components/ui` contains shared atomic UI primitives (e.g. `button`).
- `src/db/client.ts` is the single entry point to Payload Local API (`getPayloadClient`).
- `src/server/cache` contains Data Cache tags (`CACHE_TAGS`), `cachedQuery` (`unstable_cache` wrapper), and Payload revalidation hooks (`revalidateTag` / `revalidatePath`).
- `src/server/repositories` contains cached Payload data accessors (`getSettings`, `getHome`, etc.).
- `src/lib` contains utilities only (e.g. `cn`).
- `src/payload.config.ts` is the main Payload configuration.
- `src/payload-types.ts` is generated Payload type output.
- This project does not use an automated test suite; verification is `bun run lint`, `bun run build`, and manual checks.
