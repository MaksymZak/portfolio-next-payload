# Research: Portfolio MVP

## Decision: Use a shared `src/app/(frontend)/[lang]` route segment for the public pages

**Rationale**:
- A shared locale segment keeps EN/UK route coverage aligned while still producing only the required public pages.
- Putting the public layout at the `[lang]` level lets the app set `html[lang]`, locale-aware metadata, and shared layout behavior once.
- Static locale enumeration keeps the surface small and predictable for MVP1.

**Alternatives considered**:
- Separate hardcoded `/en` and `/uk` directory trees — rejected because it duplicates page structure and increases parity drift risk.
- Middleware/proxy locale detection — rejected because the spec explicitly requires a fixed root redirect to English, not automatic locale detection.

## Decision: Redirect `/` directly to `/en`

**Rationale**:
- The spec and release plan lock the default route to English.
- A server redirect from `src/app/(frontend)/page.tsx` is the simplest, most explicit way to satisfy the contract.
- Avoiding locale negotiation keeps the MVP easy to reason about and easy to validate.

**Alternatives considered**:
- `proxy.ts` `Accept-Language` detection — rejected as out of scope for MVP1 and contrary to the fixed-default requirement.
- `next.config.ts` redirect rules — workable, but less colocated with the public app flow than a route-level redirect.

## Decision: Keep public runtime content in typed TypeScript modules under `src/content/portfolio`

**Rationale**:
- Typed modules match the approved MVP1 requirement that public content stay in code instead of depending on Payload at runtime.
- `en.ts` and `uk.ts` can share a single structural type so missing parity becomes a compile-time problem instead of a runtime surprise.
- Centralized content keeps homepage, resume, case-study, metadata, contacts, and project-card copy easy to audit for trust and parity.

**Alternatives considered**:
- Runtime Payload queries for public pages — rejected because MVP1 explicitly forbids a runtime CMS dependency.
- JSON files — rejected because TypeScript modules provide better validation, editor support, and structural parity checks.

## Decision: Put theme state on the root `html[data-theme]` element and implement themes with CSS variables from `DESIGN.md`

**Rationale**:
- The design contract already defines the four approved themes and their shared token set.
- A root `data-theme` attribute keeps theming simple, framework-light, and compatible with server-rendered components.
- CSS variables make it easy to share the same design hierarchy across homepage, resume, and case-study pages without multiplying Tailwind-specific tokens.

**Alternatives considered**:
- A `dark` class-only approach — rejected because MVP1 has four themes, not two.
- A theming library such as `next-themes` — rejected because the required behavior is small enough to implement directly with less abstraction.

## Decision: Persist the selected theme with a minimal localStorage bootstrap plus a tiny client switcher

**Rationale**:
- Theme choice is a browser preference, not public content, so client-side persistence is acceptable within the spec.
- A small inline bootstrap script can set the correct `data-theme` before paint, preventing a visible theme flash.
- Only the interactive theme-switching control needs to be a Client Component; the rest of the public UI can remain server-rendered.

**Alternatives considered**:
- Reading the theme from cookies on every request — rejected because it adds unnecessary server complexity for an MVP preference.
- Converting the whole layout into a Client Component — rejected because it would increase client JavaScript and work against the server-first requirement.

## Decision: Load typography with `next/font` using CSS variables for `Inter` and `JetBrains Mono`

**Rationale**:
- `DESIGN.md` explicitly requires `next/font` and names `Inter` and `JetBrains Mono` as the font contract.
- CSS-variable loading fits well with Tailwind CSS 4 and the root token contract.
- Self-hosted `next/font` loading improves performance and avoids external font requests.

**Alternatives considered**:
- Traditional remote font imports — rejected because `next/font` is already the approved project pattern.
- Local font files — unnecessary for MVP1 given the approved font families.

## Decision: Use route-level metadata generation with canonical and language alternates

**Rationale**:
- The spec defines basic SEO as route titles, descriptions, and essential open graph metadata.
- Shared metadata helpers can derive canonical and alternate links from the typed content layer while keeping the locale contract explicit.
- Locale-aware metadata supports recruiter-facing sharing and search clarity without introducing a broader SEO system.

**Alternatives considered**:
- One static metadata object for the whole frontend — rejected because homepage, resume, and case-study pages need distinct metadata per locale.
- Advanced SEO management in Payload — rejected as MVP2+ work.

## Decision: Keep resume export browser-based with print CSS, not generated PDFs

**Rationale**:
- The spec explicitly requires print-friendly resume pages and rejects server-side PDF generation or prebuilt files.
- Print styles can remove nonessential chrome, force a readable page format, and keep the resume compact for one-page export.
- This keeps resume behavior maintainable because the browser page and PDF output stay the same document.

**Alternatives considered**:
- Separate PDF generation services — rejected as out of scope and overly complex for MVP1.
- A dedicated `/print` route — rejected because print styling on the same resume page is simpler and easier to validate.

## Decision: Validate the MVP with Playwright acceptance tests plus Vitest content/parity tests

**Rationale**:
- The spec already defines independent user-story acceptance scenarios that map directly to Playwright flows.
- Vitest is a good fit for fast checks around content parity, route metadata helpers, and theme/section invariants.
- Keeping tests focused on redirect behavior, required sections, theme persistence, print readiness, and public-safety rules matches the MVP scope.

**Alternatives considered**:
- Heavy component snapshot coverage — rejected because the public pages are mostly server-rendered content surfaces where route-level behavior matters more.
- Visual regression baselines — rejected for MVP1 because content will still iterate and the maintenance cost is not justified yet.
