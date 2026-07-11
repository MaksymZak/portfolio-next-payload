# Resume Page — A4 Sheet System & PDF Generation

> Feature documentation for `/[locale]/resume`. Implemented July 2026.
> Read this before touching resume components, the `sheet:` variant, or `/api/cv`.

## What this feature is

The resume page serves two audiences with two coordinated views:

1. **Visitors** see the regular airy web page and can download an always-current PDF via the **SAVE PDF** button.
2. **The author** gets a **PDF PREVIEW** toggle that renders the page as a true A4 sheet on screen — pixel-identical to the downloaded file — for editing feedback while changing content in `/admin`.

The PDF is generated server-side by rendering the live page in headless Chromium, so it always reflects current CMS content. Filename is derived from `settings.name` + locale suffix: `Maksym_Zakaliuzhnyi_CV_EN.pdf` / `..._UA.pdf`.

## Architecture

### The `sheet:` variant — single source of truth

All "printed document" styles use a custom Tailwind variant defined in `src/app/(frontend)/globals.css`:

```css
@custom-variant sheet (&:where([data-sheet], [data-sheet] *));
```

The `data-sheet` attribute is set by **three consumers**, which guarantees the preview and the PDF can never diverge:

| Consumer | Where |
| --- | --- |
| PDF PREVIEW toggle | `src/components/resume/shell.tsx` (sets it on the sheet wrapper) |
| PDF generator | `src/app/api/cv/route.ts` (`page.evaluate` sets it on `<body>` before `page.pdf()`) |
| `window.print()` fallback | `src/components/resume/download-button.tsx` (sets/removes it around printing) |

**Known trade-off:** plain `Ctrl+P` prints the web view, not the document — sheet styles are attribute-driven, not `@media print`-driven. The official path is the SAVE PDF button.

### Fixed A4 grid — deterministic one-page layout

Printable A4 area at 96dpi with 8mm `@page` margins = **734×1063px**. The sheet rows have fixed heights budgeted to fill it exactly:

```
160 (header) + 12 + 310 (about/stack) + 12 + 410 (experience/side) + 12 + 147 (education/portfolio) = 1063
```

Heights live in `sheet:h-[…px]` classes in `src/components/resume/bento.tsx` and `header.tsx`; every block also has `sheet:overflow-hidden` as a safety net. **The PDF is always exactly one full page regardless of content volume.**

### Content caps — whole items, never mid-sentence truncation

Constants at the top of `src/components/resume/bento.tsx`:

```ts
const SHEET_MAX_JOBS = 3            // experience entries shown in the sheet
const SHEET_MAX_BULLETS_PER_JOB = 4 // bullets per entry
const SHEET_MAX_EDUCATION = 1       // education entries
```

Items past a cap get `sheet:hidden` — they stay visible on the live web page. Admin ordering in Payload decides what makes the cut. Long prose fields use line clamps instead (`sheet:line-clamp-8` on About, `sheet:line-clamp-2` on education/portfolio texts). Experience bullets and languages are **never** text-truncated: a visibly cut sentence in a CV reads as a rendering bug.

If you change row heights or caps, keep the 1063px budget: rendered `#main-content` height under `[data-sheet]` at 794px viewport must equal 1063.

## Key files

| File | Role |
| --- | --- |
| `src/app/(frontend)/[locale]/resume/page.tsx` | RSC: data fetching, renders `ResumeShell` → header + bento |
| `src/components/resume/shell.tsx` | Client: top bar, PDF PREVIEW toggle, A4 sheet frame + page-limit ruler |
| `src/components/resume/bento.tsx` | Sheet grid, caps constants, all section layouts |
| `src/components/resume/header.tsx` | Resume header (fixed 160px in sheet mode) |
| `src/components/resume/download-button.tsx` | Fetch-based download with loading state + print fallback |
| `src/app/api/cv/route.ts` | GET `?locale=en\|uk` → puppeteer-core PDF, `Content-Disposition` filename, CDN cache 10 min |
| `src/components/ui/brand-icons.tsx` | GitHub / LinkedIn / Telegram brand marks (shared with home contact section) |
| `src/app/(frontend)/globals.css` | `sheet:` variant definition, `@page` size/margins |

## PDF generation environment

- **Generation is local-only.** `/api/cv` renders the page in the locally installed Chrome (`puppeteer-core`, no bundled Chromium). Standard install paths are auto-detected; `CHROME_EXECUTABLE_PATH` in `.env` is an optional override for non-standard installs only.
- **Vercel (production):** `/api/cv` returns 404 (`process.env.VERCEL` guard) — headless Chromium does not fit the Hobby plan. `outputFileTracingExcludes` in `next.config.ts` keeps `puppeteer-core` out of the traced serverless bundle; the route imports `launch-browser` dynamically so the excluded module is never loaded there.
- **Production PDFs:** pre-generated and hosted on R2. Workflow: `bun run dev` → `bun run cv:generate` (writes `./cv-dist/`, prints wrangler upload commands) → upload to R2 → set `NEXT_PUBLIC_CV_URL_EN` / `NEXT_PUBLIC_CV_URL_UK` in Vercel. When set, the SAVE PDF button is a plain download link. **Re-run this after every meaningful CMS content edit — the hosted PDFs do not auto-update.**
- **Caching (local route only):** `Cache-Control: public, s-maxage=600, stale-while-revalidate=86400`.

## Verification routine

1. `bun run lint && bun run build`
2. Open `/en/resume` → toggle PDF PREVIEW → content must end at the dashed "A4 PAGE LIMIT" line.
3. `curl -o cv.pdf "http://localhost:3000/api/cv?locale=en"` → one page, correct `Content-Disposition` filename; repeat for `uk`.
4. Height check (must print 1063): render with `[data-sheet]` on body at 794px viewport and measure `#main-content.scrollHeight`.

## Future idea (backlog): interactive layout controls in preview mode

**Author's idea, not yet implemented.** When PDF PREVIEW is open, show an editing rail alongside the sheet:

- per-block height handles / steppers to redistribute the row budget (e.g. shrink About, grow Experience) with the 1063px total enforced as an invariant;
- inline visibility of the caps (`SHEET_MAX_*`) with +/- controls, so "what fits vs. what gets dropped" is immediately visible;
- live highlight of clipped/hidden items while adjusting.

Implementation sketch: lift the budget numbers out of Tailwind classes into CSS variables on the sheet wrapper (`--sheet-row-1: 310px` etc.), drive them from client state in `shell.tsx`, and persist chosen values to the Payload `resume` global (new group field, e.g. `sheetLayout`) so the PDF route picks them up. Constraint solver is trivial: rows must sum to 1063 minus gaps. This turns the preview into a small layout editor while keeping the deterministic one-page guarantee.
