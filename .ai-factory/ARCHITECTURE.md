# Architecture: Structured Modules (Technical Layers)

## Overview

This project uses a **Structured Modules** architecture organized by **technical layers**, adapted for a Next.js App Router monolith with embedded Payload CMS. The public site and CMS admin share one codebase and one deployment, but runtime concerns are separated into distinct route groups and server-side layers.

The pattern fits a single-developer portfolio: domain complexity is low-to-medium (localized content, caching, i18n), velocity matters, and full Explicit Architecture (domain entities, ports/adapters) would add overhead without current benefit. Repositories act as the application read layer; Payload schema definitions live in `config/`; presentation is split between RSC pages and client components where interactivity is required.

Implementation follows `.ai-factory/plans/portfolio-mvp.md` (Phases 0–9, all steps complete).

## Decision Rationale

- **Project type:** Personal portfolio with CMS-backed sections and a few standalone pages
- **Tech stack:** Next.js 16 + Payload 3 + PostgreSQL + next-intl
- **Team size:** 1 developer
- **Key factor:** Clear layer boundaries (presentation → repositories → Payload) without over-engineering a mostly read-only, content-driven site

## Folder Structure

```
src/
├── middleware.ts                    # next-intl; excludes /admin, /api, static assets
├── i18n/
│   ├── routing.ts                   # locale config (always prefix, no detection)
│   ├── request.ts                 # message loading per request
│   └── navigation.ts              # locale-aware Link, redirect, useRouter
│
├── app/
│   ├── (frontend)/                # ── PRESENTATION: public site ──
│   │   ├── layout.tsx             # pass-through (no <html>)
│   │   ├── page.tsx               # redirect / → /en
│   │   ├── globals.css
│   │   └── [locale]/
│   │       ├── layout.tsx         # <html>, fonts, ThemeProvider, NextIntlClientProvider
│   │       ├── page.tsx           # home (parallel repository fetches)
│   │       ├── resume/page.tsx
│   │       ├── archive/page.tsx
│   │       └── case/[slug]/page.tsx
│   ├── (payload)/                 # ── PRESENTATION: CMS shell ──
│   │   ├── admin/[[...segments]]/
│   │   └── api/[...slug]/, graphql/
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── ui/                        # atomic primitives (button, card, badge, drawer, toast)
│   ├── layout/                    # shell chrome (sidebar, header, nav, switchers)
│   ├── sections/                  # home sections (hero, stack, projects, …)
│   ├── resume/                    # resume page blocks
│   ├── case/                      # case study blocks
│   └── archive/                   # archive table + toolbar
│
├── config/                        # ── INFRASTRUCTURE: Payload schema ──
│   ├── collections/               # Skills, Experience, Archive, Projects, Media, Users
│   └── globals/                   # Settings, Home, Resume
│
├── db/                            # ── INFRASTRUCTURE: data access entry ──
│   ├── client.ts                  # re-exports getPayloadClient (server-only)
│   ├── get-payload-client.ts      # React.cache(getPayload) — single Payload entry
│   └── seed/                      # idempotent bilingual seed script
│
├── server/
│   ├── repositories/              # ── APPLICATION: read accessors ──
│   │   ├── settings.repository.ts
│   │   ├── home.repository.ts
│   │   ├── resume.repository.ts
│   │   ├── projects.repository.ts
│   │   ├── archive.repository.ts
│   │   ├── experience.repository.ts
│   │   ├── skills.repository.ts
│   │   └── index.ts
│   ├── cache/                     # ── INFRASTRUCTURE: Next.js Data Cache ──
│   │   ├── tags.ts                # CACHE_TAGS constants
│   │   ├── query.ts               # cachedQuery (unstable_cache wrapper)
│   │   └── revalidate.ts          # Payload hooks → revalidateTag / revalidatePath
│   ├── services/                  # reserved for future business logic (empty on MVP)
│   └── types.ts                   # DataLocale, shared server types
│
├── lib/                           # pure utilities only (cn, metadata helpers)
├── payload.config.ts              # Payload composition root
└── payload-types.ts               # generated — do not edit manually

messages/
├── en.json                        # UI chrome (nav, actions, labels, themes)
└── uk.json
```

## Layer Responsibilities

| Layer | Location | Responsibility |
| --- | --- | --- |
| **Presentation** | `app/(frontend)/*`, `components/*` | RSC pages fetch data and compose UI; client components handle
where state, DOM APIs, or browser APIs are needed |
| **Application** | `server/repositories/*` | Locale-aware read accessors; one function per domain entity |
| **Infrastructure** | `db/*`, `config/*`, `server/cache/*`, `payload.config.ts` | Payload client, schema, caching, revalidation |
| **Shared utilities** | `lib/*`, `i18n/*`, `messages/*` | Framework-agnostic helpers and i18n config |

## Dependency Rules

Dependencies flow **downward** — outer layers call inner layers, never the reverse.

- ✅ RSC pages / layouts → `@/server/repositories`
- ✅ Repositories → `@/db/client`, `@/server/cache`, `@/payload-types`
- ✅ Seed script → `@/db/client` (same entry point as repositories)
- ✅ Payload hooks in `config/` → `@/server/cache/revalidate`
- ✅ Client components → props from server parents, `@/i18n/navigation`, `@/components/ui`
- ✅ `lib/*` → no imports from `server/`, `db/`, or `app/`

- ❌ `components/*` → `@/db/client` or direct Payload calls
- ❌ `lib/*` → `@/server/repositories` (queries do not belong in utilities)
- ❌ Any file outside `db/` → `getPayload()` directly (use `getPayloadClient` only)
- ❌ Repositories → React components or Next.js page modules
- ❌ Public frontend → `(payload)` route internals

## Data Flow

```
Browser request
    ↓
middleware (next-intl locale routing)
    ↓
RSC page (app/(frontend)/[locale]/…)
    ↓  Promise.all([ getSettings, getHome, … ])
server/repositories/*.repository.ts
    ↓  React.cache (per-request dedup)
    ↓  cachedQuery → unstable_cache (cross-request, tagged)
db/get-payload-client.ts
    ↓  React.cache (single Payload instance per request)
Payload Local API (find / findGlobal)
    ↓
PostgreSQL
```

**Cache invalidation:** Payload `afterChange` / `afterDelete` hooks call `revalidateTag(CACHE_TAGS.*)`. Seed passes `context: { disableRevalidate: true }` to skip Next cache APIs during bulk writes.

## i18n Split

Two localization systems coexist by design:

| Concern | System | Examples |
| --- | --- | --- |
| UI chrome | next-intl (`messages/*.json`) | Nav labels, button text, theme names |
| Dynamic content | Payload field localization | Project titles, hero copy, experience bullets |

Rules:
- `localePrefix: 'always'` — every public URL is `/en/…` or `/uk/…`
- `localeDetection: false` — no automatic locale redirect from `Accept-Language`
- Repositories receive `DataLocale` (`'en' | 'uk'`) and pass it to Payload `locale` option
- RSC pages call `setRequestLocale(locale)` before rendering

## Component Conventions

### Naming (MVP hard rules)

- **Site sections** use **1-word English names** for routes, folders, anchors, and top-level section components: `hero`, `stack`, `projects`, `archive`, `experience`, `contact`, `resume`, `case`
- **Shared chrome and atomic UI** may use descriptive names: `LocaleSwitcher`, `ThemeProvider`, `SectionTag`

### Server vs client

- **Default to Server Components** — fetch in pages/layouts, pass serializable props down
- **Client Components** (`'use client'`) only for: scroll-spy, drawer, theme/locale switchers, clipboard/toast, search/filter tables, print button, live clock
- **Parallel fetching** in pages: independent repository calls via `Promise.all`

### Component placement

| Folder | Contains |
| --- | --- |
| `components/ui/` | Reusable atoms — no domain knowledge |
| `components/layout/` | App shell — sidebar, header, nav, switchers |
| `components/sections/` | Home page sections — may have subfolders when complex (`hero/`, `projects/`) |
| `components/{resume,case,archive}/` | Route-specific presentation blocks |

## Payload Schema Conventions

- Collection/global definitions live in `src/config/collections/` and `src/config/globals/`
- Register in `src/config/collections/index.ts` and `src/config/globals/index.ts`
- `payload.config.ts` imports from `@/config/*` — keep it thin
- After schema changes: `bun run generate:types` (and `generate:importmap` if admin UI changes)
- Public read access: `access.read: () => true` on all public collections/globals
- Revalidation hooks imported from `@/server/cache/revalidate` and attached per collection/global

### Content domains

| Payload entity | Consumed by |
| --- | --- |
| `settings` global | Sidebar identity, contacts, metadata |
| `home` global | Hero, proof metrics |
| `resume` global | Resume page bento |
| `skills` collection | Stack section, resume |
| `experience` collection | Home timeline, resume |
| `archive` collection | Home featured grid, archive page |
| `projects` collection | Home cards, case study pages |

## Key Principles

1. **Single Payload entry point** — `getPayloadClient()` in `src/db/get-payload-client.ts` is the only way to reach Payload Local API from app code.
2. **Repositories are the public data API** — pages and layouts import from `@/server/repositories`, never from `db/` directly (except seed).
3. **Thin pages, fat composition** — route files orchestrate fetches and wire sections; business logic stays in repositories (MVP) or future `server/services/`.
4. **Minimize client bundle** — no framer-motion; CSS transitions + Radix `data-state`; `optimizePackageImports: ['lucide-react']`.
5. **Content vs chrome separation** — static UI strings in next-intl; editorial content in Payload with field-level locales.
6. **Tagged cache by domain** — one `CACHE_TAGS.*` per repository domain; hooks invalidate the matching tag on admin edit.

## Code Examples

### RSC page — parallel repository fetch

```tsx
// src/app/(frontend)/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server'
import {
  getSettings,
  getHome,
  getProjects,
  getArchive,
  getExperience,
  getSkills,
} from '@/server/repositories'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [settings, home, projects, archive, experience, skills] = await Promise.all([
    getSettings(locale),
    getHome(locale),
    getProjects(locale),
    getArchive(locale),
    getExperience(locale),
    getSkills(locale),
  ])

  return (
    <>
      <Sidebar settings={settings} />
      <Hero home={home} />
      {/* … */}
    </>
  )
}
```

### Repository — per-request dedup + tagged cross-request cache

```tsx
// src/server/repositories/projects.repository.ts
import { cache } from 'react'
import { getPayloadClient } from '@/db/client'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

export const getProjects = cache(async (locale: DataLocale) => {
  return cachedQuery(['projects', locale], [CACHE_TAGS.projects], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      depth: 1,
      sort: 'order',
      limit: 100,
    })
    return docs
  })
})
```

### Payload hook — safe revalidation after admin edit

```tsx
// Registered on collection config in src/config/collections/Projects/Projects.ts
import { createCollectionAfterChangeHook } from '@/server/cache/revalidate'
import { CACHE_TAGS } from '@/server/cache/tags'

hooks: {
  afterChange: [
    createCollectionAfterChangeHook(CACHE_TAGS.projects, {
      revalidatePaths: ({ doc, previousDoc }) => /* /en/case/[slug], /uk/case/[slug] */,
    }),
  ],
}
```

## Route Map

| Route | Type | Data sources |
| --- | --- | --- |
| `/` | redirect | → `/en` |
| `/[locale]` | SSG/RSC | settings, home, projects, archive, experience, skills |
| `/[locale]/resume` | SSG/RSC | settings, resume, skills, experience |
| `/[locale]/archive` | SSG/RSC | archive |
| `/[locale]/case/[slug]` | SSG | project by slug; `generateStaticParams` from all slugs × locales |
| `/admin` | Payload admin | — |
| `/api/*` | Payload REST | — |
| `/sitemap.xml`, `/robots.txt` | static routes | projects slugs for case URLs |

## Evolution Path

Current state is appropriate for MVP. Consider these migrations only when triggers appear:

| Signal | Action |
| --- | --- |
| Write paths (forms, mutations, server actions) grow | Add `server/services/` for orchestration; keep repositories read-focused |
| Complex validation or cross-entity rules | Extract domain types/functions into `server/domain/` |
| Feature folders exceed ~500 LOC with tangled imports | Split into vertical slices under `components/` or introduce feature modules |
| Independent scaling or team boundaries | Unlikely for this project — stay monolith |

**Do not** introduce Explicit Architecture layers (Domain/Application/Infrastructure folders per bounded context) until domain logic outgrows thin repository accessors.

## Anti-Patterns

- ❌ Calling `getPayload({ config })` outside `db/get-payload-client.ts`
- ❌ Putting Payload queries in `lib/` or client components
- ❌ Storing editorial copy in `messages/*.json` instead of Payload
- ❌ Storing nav/button labels in Payload instead of next-intl
- ❌ Fetching sequentially in pages when repository calls are independent (use `Promise.all`)
- ❌ Importing server-only modules into client components
- ❌ Skipping `setRequestLocale` in RSC pages under `[locale]`
- ❌ Creating a separate contacts page — contact is a home section only; data lives in `settings` global
- ❌ Adding automated tests without an explicit project decision (MVP rule: lint + build + manual only)

## Related Artifacts

- Implementation plan: `.ai-factory/plans/portfolio-mvp.md`
- Agent rules: `.ai-factory/RULES.md`, `AGENTS.md`
- Design tokens: `.cursor/docs/design_system_new.md`
- Project skills: `.cursor/skills/payload`, `shadcn`, `frontend-design`, `vercel-react-best-practices`
