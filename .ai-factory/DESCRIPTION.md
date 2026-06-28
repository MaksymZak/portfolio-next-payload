# Portfolio — Maksym Zak

Personal portfolio site with a CMS-backed public frontend. Built as a Next.js App Router monolith with embedded Payload CMS v3.

## Project Type

- **Kind:** Personal portfolio / marketing site with editorial CMS
- **Scale:** Single developer, low traffic, single deployment unit
- **Status:** MVP implemented (see `.ai-factory/plans/portfolio-mvp.md`)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js, Bun |
| Framework | Next.js 16 (App Router, RSC) |
| CMS | Payload CMS 3.85 |
| Database | PostgreSQL (`@payloadcms/db-postgres`) |
| i18n | next-intl (`en`, `uk`; no auto-detection) |
| Styling | Tailwind CSS 4, CSS custom properties (design tokens) |
| UI | Radix UI primitives, custom atomic components |
| Theming | next-themes (`light`, `dark`, `warm`, `contrast`) |

## Core Features

- Localized public site at `/[locale]/` (`en`, `uk`)
- Home page with scroll-spy sections: hero, stack, projects, archive, experience, contact
- Dedicated routes: `/resume`, `/archive`, `/case/[slug]`
- Payload admin at `/admin` for all dynamic content
- Bilingual content via Payload field localization + next-intl UI chrome
- Tagged Data Cache with admin-triggered revalidation
- SEO: metadata, hreflang, sitemap, robots

## Non-Functional Requirements

- **Verification:** `bun run lint`, `bun run build`, manual browser checks — no automated test suite
- **Performance:** SSG-friendly data layer (`React.cache` + `unstable_cache` + `revalidateTag`)
- **Accessibility:** keyboard nav, focus rings, reduced-motion support
- **Content seed:** idempotent `bun run seed` from `.cursor/docs/cv.json` and reference prototypes

## Content Ownership

| Source | Owns |
| --- | --- |
| `messages/{en,uk}.json` (next-intl) | Nav labels, section tags, button labels, theme/locale labels, footer chrome |
| Payload collections/globals | Projects, archive, experience, skills, identity, contacts, editorial blocks |

## Architecture

Detailed architecture guidelines: [`.ai-factory/ARCHITECTURE.md`](.ai-factory/ARCHITECTURE.md)

**Pattern:** Structured Modules (Technical Layers) — Next.js App Router monolith
