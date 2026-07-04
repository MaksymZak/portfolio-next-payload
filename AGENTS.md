# Portfolio — Agent Guide

Personal portfolio site (Maksym Zak, Frontend) with a CMS-backed public frontend. Next.js App Router monolith + embedded Payload CMS v3.

**Status:** MVP implemented. Plan: [.ai-factory/plans/portfolio-mvp.md](.ai-factory/plans/portfolio-mvp.md) (all steps complete). Post-MVP fixes are a separate iteration.

## Stack

| Layer | Technology |
| --- | --- |
| Runtime | Bun / Node.js |
| Framework | Next.js 16 (App Router, RSC) |
| UI | React 19, Tailwind CSS 4, Radix UI primitives |
| CMS | Payload CMS 3.85, PostgreSQL |
| i18n | next-intl (`en`, `uk`) |
| Theming | next-themes (`light`, `dark`, `warm`, `contrast`) |

## Verification

No automated test suite. After code changes:

```bash
bun run lint
bun run build
```

Then manually check `/en`, `/uk`, `/en/resume`, `/en/archive`, `/en/case/portfolio-cms`, and `/admin`.

Other useful commands:

```bash
bun run dev
bun run seed          # idempotent bilingual content seed
bun run generate:types
bun run generate:importmap
```

## AI Context Files

Read these before making structural or architectural changes:

| Path | Purpose |
| --- | --- |
| [.ai-factory/ARCHITECTURE.md](.ai-factory/ARCHITECTURE.md) | Pattern, folder layout, dependency rules, data flow, anti-patterns |
| [.ai-factory/DESCRIPTION.md](.ai-factory/DESCRIPTION.md) | Project summary, features, content ownership |
| [.ai-factory/RULES.md](.ai-factory/RULES.md) | Plan-driven implementation rules (`/aif-implement`, step-by-step work) |
| [.ai-factory/plans/portfolio-mvp.md](.ai-factory/plans/portfolio-mvp.md) | Completed MVP implementation plan |
| [.ai-factory/docs/resume-pdf-sheet.md](.ai-factory/docs/resume-pdf-sheet.md) | Resume A4 sheet system: `sheet:` variant, PDF generation, preview toggle, layout budget & caps |

## Reference Documentation

| Path | Role |
| --- | --- |
| [.cursor/docs/design_system_new.md](.cursor/docs/design_system_new.md) | **Active** design system — tokens, themes, layout, components |
| [.cursor/docs/button.md](.cursor/docs/button.md) | Brutalist motion patterns R01–R22, exports, usage |
| [.cursor/docs/design_system_old.md](.cursor/docs/design_system_old.md) | Legacy design notes (context only) |
| [.cursor/docs/cv.json](.cursor/docs/cv.json) | Old CV facts (historical reference; seed is self-contained) |
| [.cursor/docs/reference/](.cursor/docs/reference/) | Decomposed UI prototype (reference only — do not copy verbatim) |
| [.cursor/docs/old_vision/](.cursor/docs/old_vision/) | Archived pre-MVP planning docs (may be outdated) |

## Project Structure

```
src/
├── middleware.ts                 # next-intl; excludes /admin, /api, static assets
├── i18n/                         # routing, request config, locale-aware navigation
├── app/
│   ├── (frontend)/               # public site
│   │   └── [locale]/             # home, resume, archive, case/[slug]
│   ├── (payload)/                # Payload admin + API routes
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                       # atomic primitives (button, card, badge, drawer, toast)
│   ├── layout/                   # shell (sidebar, header, nav, switchers)
│   ├── sections/                 # home sections (hero, stack, projects, …)
│   ├── resume/                   # resume page blocks
│   ├── case/                     # case study blocks
│   └── archive/                  # archive table + toolbar
├── config/
│   ├── collections/              # Payload collections (Skills, Experience, Archive, Projects, …)
│   └── globals/                  # Payload globals (Settings, Home, Resume)
├── db/
│   ├── client.ts                 # re-exports getPayloadClient (server-only)
│   ├── get-payload-client.ts     # single Payload Local API entry (React.cache)
│   └── seed/                     # idempotent seed script
├── server/
│   ├── repositories/             # cached read accessors (getSettings, getHome, …)
│   ├── cache/                    # CACHE_TAGS, cachedQuery, revalidation hooks
│   └── types.ts                  # DataLocale, shared server types
├── lib/                          # pure utilities (cn, metadata, brutalist-motion, home-scroll)
├── config/env.ts                 # typed env access
├── payload.config.ts             # Payload composition root
└── payload-types.ts              # generated — run generate:types after schema changes

messages/
├── en.json                       # UI chrome (nav, actions, labels, themes)
└── uk.json
```

## Architecture (summary)

**Pattern:** Structured Modules (Technical Layers). Full details in [.ai-factory/ARCHITECTURE.md](.ai-factory/ARCHITECTURE.md).

**Dependency flow:**

```
RSC pages → server/repositories → db/get-payload-client → Payload → PostgreSQL
```

**Hard rules:**

- `getPayloadClient()` in `src/db/get-payload-client.ts` is the **only** Payload entry point — never call `getPayload()` elsewhere.
- Pages and layouts fetch via `@/server/repositories`, not from `db/` or `lib/`.
- `lib/` holds pure utilities — no queries, no Payload imports.
- Client components receive data as props from server parents; no direct CMS access.
- Payload schema lives in `src/config/collections/` and `src/config/globals/`, registered in `payload.config.ts`.

**Caching:** `React.cache` (per-request) + `unstable_cache` with `CACHE_TAGS` (cross-request). Payload hooks in `config/` call `revalidateTag` / `revalidatePath` on admin edits. Seed passes `context: { disableRevalidate: true }`.

## i18n & Content

| Source | Owns |
| --- | --- |
| `messages/{en,uk}.json` | Nav labels, section tags, button text, theme/locale labels, footer chrome |
| Payload (field-level `en`/`uk`) | Projects, archive, experience, skills, hero copy, contacts, resume content |

**i18n rules:**

- `localePrefix: 'always'` — every public URL is `/en/…` or `/uk/…`
- `localeDetection: false` — no automatic locale from `Accept-Language`
- RSC pages under `[locale]` must call `setRequestLocale(locale)`
- Use `Link` / `useRouter` from `@/i18n/navigation`, not from `next/navigation`

## Naming Conventions

**Site sections** (routes, folders, anchors, top-level section components) use **1-word English names:**

`hero`, `stack`, `projects`, `archive`, `experience`, `contact`, `resume`, `case`

**Shared chrome and atomic UI** may use descriptive names: `LocaleSwitcher`, `ThemeProvider`, `SectionTag`.

**No separate contacts page** — `contact` is a home section only; contact data lives in the `settings` global.

## Environment

See [.env.example](.env.example). Required:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Payload encryption secret |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, resume |

Seed script accepts `DATABASE_URI` as fallback for `DATABASE_URL`.

## Skills

Project skills live in [.cursor/skills](.cursor/skills). Use them instead of improvising:

| Skill | When |
| --- | --- |
| [payload](.cursor/skills/payload/SKILL.md) | Collections, globals, hooks, access control, Payload API |
| [shadcn](.cursor/skills/shadcn/SKILL.md) | UI primitives, Radix composition, styling |
| [frontend-design](.cursor/skills/frontend-design/SKILL.md) | New pages, sections, visual design |
| [vercel-react-best-practices](.cursor/skills/vercel-react-best-practices/SKILL.md) | React/Next.js performance, RSC patterns |
| [modern-web-guidance](.cursor/skills/modern-web-guidance/SKILL.md) | HTML/CSS/clientside JS best practices |

AI Factory skills (`.cursor/skills/aif-*`) are available for planning, fixes, QA, and architecture workflows.

## Agent Workflow

1. **Ambiguous decisions** — switch to interview mode; ask clarifying questions one at a time before coding.
2. **Plan-driven work** — read the full plan file first; follow [.ai-factory/RULES.md](.ai-factory/RULES.md) for step scope and completion markers.
3. **Next.js behavior** — read version-matched docs in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) before changing framework behavior. Official agent guide: [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents).
4. **Library docs** — use Context7 MCP for external package documentation and API references.
5. **Payload schema changes** — run `bun run generate:types` (and `generate:importmap` if admin UI changes).
6. **Status tracking** — after completing a plan slice, mark the step `[x]` in the plan file and summarize changes.

## Public Routes

| Route | Notes |
| --- | --- |
| `/` | Redirects to `/en` |
| `/[locale]` | Home with scroll-spy sections |
| `/[locale]/resume` | Print-ready resume |
| `/[locale]/archive` | Full project ledger with search/filter |
| `/[locale]/case/[slug]` | Case study (SSG via `generateStaticParams`) |
| `/admin` | Payload CMS admin |
| `/sitemap.xml`, `/robots.txt` | SEO |
