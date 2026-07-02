# Case Intake Template

Purpose: collect verified facts about a project (in that project's own repository) so the portfolio agent can add or update a case study in `src/db/seed/data/projects.ts` in one step — without inventing anything.

## How to use

1. Copy this file into the target project's repo (e.g. as `case-intake.md`) and ask an agent there to fill it in.
2. The agent fills every field from **observable sources only**: `package.json`, lockfile, README, config files, deploy dashboards, analytics you can open. Fields it cannot verify stay as `UNKNOWN — ask Maksym`.
3. Bring the completed file back to the portfolio repo and ask the agent to apply it: it maps 1:1 to the `Projects` collection (`src/config/collections/Projects/Projects.ts`) and the `ProjectSeed` type (`src/db/seed/types.ts`).

## Rules for the filling agent

- **Never invent metrics.** A metric goes in only if it is measured and reproducible (Lighthouse run, analytics dashboard, build output). Otherwise leave the field empty.
- **Correct terminology only.** ISR = Incremental Static Regeneration. Do not paraphrase technical terms.
- Stack entries must exist in `package.json` (or the actual infra). Name real versions only if certain.
- Highlights follow the pattern: **fact + technology + effect**. One sentence each, 3–4 total. No adjectives like "blazing", "cutting-edge", "seamless".
- UK texts must read as natural Ukrainian, not word-by-word translation. If unsure, write EN only and mark UK as `TODO: translate`.
- If the project contains employer branding or private data, list what must be sanitized before the case goes public.

---

## Intake Form

### Identity

| Field | Value | Source |
| --- | --- | --- |
| Project title (short, ≤3 words) | | |
| Slug (kebab-case, for `/case/[slug]`) | | |
| Status: `live` or `roadmap` | | deploy URL exists → live |
| Live URL (if any) | | |
| Repository URL (if public) | | |
| Period (e.g. `Q3 2025` or `2025 — present`) | | git history / deploy dates |

> Not collected here (decided in the portfolio repo when applying): `order` (project position among cases) and `screenshot` attachment. The applying agent sets `order` and you upload the screenshot via `/admin` → Media.

### Role

| Locale | Value |
| --- | --- |
| EN (e.g. `Full-Stack Developer — Pet Project`) | |
| UK | |

### Summary (2–3 sentences: what it is, who it serves, what makes it notable)

- EN:
- UK:

### Highlights (3–4, fact + technology + effect)

| # | EN | UK |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

### Stack (4–6 items, verified in package.json / infra)

- 

### Metrics (one outcome line per locale — NEVER invent numbers)

Maps to `ProjectSeed.metrics: Record<Locale, string>` — required for BOTH locales, so do not leave blank.

- If a metric is measured and reproducible (Lighthouse, analytics, build output), state it with a number.
- If not, use an observable outcome without numbers (e.g. `Publish-to-live with zero redeploys`).
- For roadmap/unreleased projects, use a neutral status phrase (e.g. `In development — sanitized demo`).

| Locale | Value | How it was measured (or "status only") |
| --- | --- | --- |
| EN | | |
| UK | | |

### Technical depth (1–2 sentences on architecture for the case page)

- EN:
- UK:

### Screenshot

- Path or link to capture: 
- Requirements: 1280×720 or wider, WebP or PNG, main screen without dev tools. Upload via `/admin` → Media, then attach to the project's `screenshot` field.

### Sanitization checklist (for work-derived projects)

- [ ] No employer branding (logos, names, domains)
- [ ] No real client/user data
- [ ] No private analytics numbers without permission
- [ ] Env secrets and tokens removed from all shown code

---

## Filled example (portfolio-cms)

| Field | Value |
| --- | --- |
| Title | Portfolio CMS |
| Slug | `portfolio-cms` |
| Status | live |
| Period | Q1–Q2 2026 |

- Role EN: `Solo Developer — Frontend & CMS Architecture`
- Summary EN: `This site itself: a bilingual portfolio platform on Next.js 16 App Router with embedded Payload CMS 3. Every piece of content is editable in the admin panel and goes live without a redeploy.`
- Highlight example: `Built a tagged cache layer: React.cache per request plus unstable_cache with revalidateTag fired from CMS hooks on publish.` (fact: cache layer; technology: React.cache/unstable_cache/revalidateTag; effect: publish without redeploy)
- Stack: `Next.js 16, Payload CMS 3, TypeScript, Tailwind CSS 4, PostgreSQL` (all in `package.json`)
- Metrics: `Publish-to-live with zero redeploys` (observable behavior, no invented numbers)
