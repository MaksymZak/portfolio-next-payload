# Implementation Plan: Homepage (003)

## Technical Context
- **Stack**: Next.js 16 App Router · next-intl 4 · next-themes · Tailwind 4 +
  shadcn/ui · TypeScript. Package manager: bun.
- **Builds on**: `002-foundation` shell (`AppShell`, header/footer, theme + i18n).
- **Content**: typed bilingual module `src/content/portfolio/home.ts` exporting
  `getHomeContent(locale)`; chrome strings stay in `messages/*.json`.
- **Rendering**: server components; sections are presentational and receive
  content via props. No client state added beyond existing shell.
- **Tokens**: only DESIGN.md tokens via shadcn semantic classes; brand accent
  (`--primary`, orange) used sparingly.

## Constitution Check
- **Hiring outcome first**: page is a recruiter-scan surface; positioning + proof first. ✅
- **Honest, public-safe evidence**: real goiteens links, honest "coming next"
  statuses, no private repo link. ✅
- **Bilingual parity**: EN/UK from one typed content module. ✅
- **Swiss Technical Editorial + mobile-first**: strict grid, mono labels, single
  accent, verified at 375px/tablet/desktop and four themes. ✅
- **Mandatory stack**: Next.js/next-intl/next-themes/Tailwind/shadcn only. ✅
- **Small, verifiable delivery**: one page; sections implemented one at a time;
  verification = bun lint + bun build + manual. No automated tests. ✅
- **Skills consulted**: `frontend-design`, `vercel-react-best-practices` (server-first,
  no needless client components).

## Approach
1. Content module `home.ts` (types + EN/UK data + `getHomeContent`).
2. Section components under `src/components/portfolio/sections/`:
   `home-hero`, `proof-metrics`, `core-skills`, `selected-projects`,
   `commercial-proof`, `contact-section`, plus a `section-shell` wrapper and a
   `home-page` composition.
3. Wire `home-page` into `src/app/(frontend)/[locale]/page.tsx`.
4. Verify lint + build + manual scan; update release plan.

## Section order (recruiter scan)
hero → proof metrics → core skills → selected projects (`id=work`) →
commercial proof (`id=experience`) → contact (`id=contact`).

## Risks / Follow-ups
- Internal links to resume/case routes 404 until `004`/`005`; acceptable on the
  feature branch, tracked in release-plan.
