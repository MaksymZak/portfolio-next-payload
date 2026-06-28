# Project Rules

> Short, actionable rules and conventions for this project. Loaded automatically by /aif-implement.

## Rules

- Before plan work (`/aif-implement` or any plan-backed task), read the full plan file from start to end.
- If the user provides a specific step/task number, execute only that step — no other steps, no refactors, and no fixes outside that step's scope.
- If the user does not provide a step number, execute the entire plan sequentially — all pending unchecked steps until complete or blocked.
- In single-step mode: announce `Current task: Step N — <name>` before coding; if the user did not name a step, pick the first unchecked step with the lowest number.
- In single-step mode: never start the next step after finishing, even if it looks trivial or related.
- If a step lacks files, data, or requirements: stop immediately, list only what is missing, or switch to interview mode — do not guess and do not work on other steps.
- After completing a step: mark only that step `[x]` in the plan file immediately, then give a brief summary of changes.
- If the task is ambiguous or required information is missing, switch to interview mode and ask the user clarifying questions one at a time before choosing an approach or writing implementation code.
- Use project skills for stack-specific work (e.g. Payload, shadcn, frontend-design, vercel-react-best-practices) instead of improvising without them.
- When library documentation, API references, or code examples are needed, use the Context7 MCP server instead of relying on memory or ad-hoc web search.
- This repo uses version-matched Next.js docs bundled with the installed package. Read the relevant doc in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) before changing any Next.js behavior.
