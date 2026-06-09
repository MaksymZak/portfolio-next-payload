# Feature Specification: Homepage (003)

**Feature Branch**: `003-homepage`
**Status**: In progress
**Slice**: One page (homepage `/[locale]`) — builds on the `002-foundation` shell.

## Summary

The homepage is the recruiter landing surface. It must let a hiring reader
understand, within a fast top-to-bottom scan, who Maksym is (Middle Frontend
Developer — React/Next.js, CMS-driven websites), the strength of his commercial
proof, his core stack, selected projects with honest status, and how to reach
him. It ships in English and Ukrainian at parity, across all four themes, and is
mobile-first.

## User Scenarios

### US1 — Recruiter scan (Priority: P1)

A recruiter opens `/en` (or `/uk`) and within seconds reads the positioning,
availability, and headline proof metrics without scrolling far.
**Independent check**: hero shows positioning, availability, two CTAs, and three
proof metrics; verified at ~375px, tablet, desktop, all four themes.

### US2 — Evidence of commercial work (Priority: P1)

The reader sees a focused set of real public landing pages with role context and
outbound links, plus a compact core-skills row.
**Independent check**: commercial-proof block renders the curated examples with
working outbound links (`target=_blank`, `rel=noopener noreferrer`); core-skills
row lists the stack.

### US3 — Selected projects with honest status (Priority: P1)

The reader sees project cards. `Portfolio CMS` is navigable to its case page;
`LMS` and `Landing Version System` are clearly marked "coming next" and are NOT
navigable.
**Independent check**: only `Portfolio CMS` is an actionable link; the other two
render as non-interactive "coming next" cards.

### US4 — Contact (Priority: P1)

The reader reaches a contact section (anchor `#contact`) with public channels
(email, Telegram, LinkedIn, GitHub) and location/availability.
**Independent check**: `#contact` jump works from nav and hero secondary CTA; all
public channels render with correct hrefs; no private repository link.

### US5 — Bilingual parity (Priority: P1)

Every section exists with equivalent meaning in EN and UK.
**Independent check**: `/en` and `/uk` render the same sections; copy is
translated; no missing-translation fallbacks.

## Requirements

### Functional

- FR1 The homepage MUST render at `/[locale]` for `en` and `uk`.
- FR2 Hero MUST show eyebrow/availability, headline positioning, summary, and two
  equal CTAs: "View resume" (→ `/[locale]/resume`) and "Get in touch" (→ `#contact`).
- FR3 A proof-metrics row MUST show three metrics (4+ years, 300+ pages, Next.js/CMS).
- FR4 A core-skills row MUST list the primary stack as compact mono-styled tags.
- FR5 A commercial-proof block MUST show the curated public landing examples with
  type, role, summary, and outbound link; visual vs text-led modes MAY differ.
- FR6 A selected-projects block MUST show three cards with status labels; only
  `Portfolio CMS` is navigable.
- FR7 A contact section MUST expose the public channels and carry the `#contact`
  anchor and an `id="work"` / `id="experience"` anchor on the relevant sections.
- FR8 All copy MUST exist in EN and UK via a typed bilingual content module.
- FR9 The page MUST be mobile-first and pass all four themes using DESIGN.md tokens.
- FR10 Outbound links MUST use `rel="noopener noreferrer"` and open in a new tab.
- FR11 No private repository link anywhere on the page.

### Non-Functional

- NFR1 Recruiter scan speed is prioritized over visual spectacle.
- NFR2 Motion (if any) MUST respect `prefers-reduced-motion`.
- NFR3 Focus indicators MUST be visible and not rely on color alone.

## Success Criteria

- SC1 `/en` and `/uk` render all six sections at EN/UK parity.
- SC2 `bun run lint` and `bun run build` pass.
- SC3 Manual check passes at mobile/tablet/desktop and across all four themes.
- SC4 Only `Portfolio CMS` is navigable among project cards; outbound proof links work.
- SC5 `#contact` and section anchors resolve from header/hero navigation.

## Out of Scope (deferred)

- Resume page content (`004-resume`).
- `Portfolio CMS` case page content (`005-case`).
- SEO metadata/OG/hreflang/sitemap (`006-seo`).
- Payload runtime content sourcing.

## Notes

- Internal links to `/[locale]/resume` and `/[locale]/projects/portfolio-cms`
  target routes that land in `004`/`005`; tracked as follow-ups in the release plan.
- Content is harvested from the retained, vetted data in `src/content/portfolio`.
