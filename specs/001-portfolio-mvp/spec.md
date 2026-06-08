# Feature Specification: Portfolio MVP

**Feature Branch**: `[001-portfolio-mvp]`

**Created**: 2026-06-08

**Status**: Draft

**Input**: User description: "Build the first public release of a hiring-focused portfolio called portfolio-mvp. The goal is to ship a clean, fast-to-scan portfolio that is strong enough to begin real job outreach for a remote Middle Frontend Developer role. The release must communicate real commercial frontend experience, production landing-page delivery, CMS-driven website work, and honest current scope."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter scans the homepage and understands the offer fast (Priority: P1)

A recruiter lands on the public portfolio, immediately sees the professional positioning, proof metrics, core stack, selected proof blocks, and clear next actions, then can decide within a short scan whether the candidate fits a remote Middle Frontend role.

**Why this priority**: The homepage is the first hiring surface and must carry the strongest scan-speed and trust signal. If this story works, the portfolio is already useful for outreach even before deeper pages are opened.

**Independent Test**: Can be fully tested by visiting `/en` and `/uk`, confirming the required sections render, the primary positioning and proof metrics are visible above the fold, the `View resume` and `Get in touch` CTAs work, the theme selector offers four curated themes, and the homepage truthfully labels any `coming next` scope.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/`, **When** the site resolves the entry route, **Then** the visitor is redirected to `/en`.
2. **Given** a recruiter opens `/en` or `/uk`, **When** the homepage loads, **Then** it shows the editorial hero, proof metrics, compact core skills row, commercial landing pages proof block, selected projects block, theme switcher, and contact section in the requested language.
3. **Given** a recruiter uses the hero actions, **When** they select `View resume`, **Then** they are taken to the localized resume page, and **When** they select `Get in touch`, **Then** the page jumps to the homepage contact section instead of opening a separate contact page.
4. **Given** the homepage shows selected projects, **When** the recruiter reviews the cards, **Then** exactly three cards are shown: `Portfolio CMS`, `LMS coming next`, and `Landing Version System coming next`.

---

### User Story 2 - Recruiter reviews the short resume and saves it as PDF (Priority: P2)

A recruiter opens the localized resume page, sees a compact, curated summary of experience and contacts, and can save the page as PDF using the browser's print flow without needing a separate generated document.

**Why this priority**: The resume is a high-intent conversion surface after the homepage. It must stay short, credible, and easy to export without introducing unnecessary document-generation complexity.

**Independent Test**: Can be fully tested by opening `/en/resume` and `/uk/resume`, confirming only the approved sections appear, printing from the browser, and verifying the page remains readable and practical for browser PDF export.

**Acceptance Scenarios**:

1. **Given** a recruiter opens a localized resume route, **When** the page renders, **Then** it includes only `Header`, `Positioning summary`, `Core skills`, `Experience summary`, `Selected projects`, and `Contacts`.
2. **Given** a recruiter uses the browser print flow from the resume page, **When** the print dialog opens, **Then** the page is print-friendly and suitable for saving as PDF without requiring server-side PDF generation.
3. **Given** both localized resume routes exist, **When** content is compared between `/en/resume` and `/uk/resume`, **Then** both versions provide equivalent meaning and hiring signal.

---

### User Story 3 - Recruiter checks project proof without being misled about scope (Priority: P3)

A recruiter opens the `Portfolio CMS` case page and can understand what is already demonstrated, what it proves technically, and what remains next, while the other project cards remain clearly labeled as future work.

**Why this priority**: Honest proof is essential for trust. A strong single detailed case plus explicit `coming next` boundaries is more credible than pretending multiple unfinished projects are complete.

**Independent Test**: Can be fully tested by opening `/en/projects/portfolio-cms` and `/uk/projects/portfolio-cms`, checking the required case sections, validating the SDD/Spec Kit workflow reference, and confirming the other two projects remain card-level `coming next` items only.

**Acceptance Scenarios**:

1. **Given** a recruiter opens the localized `Portfolio CMS` case page, **When** the page loads, **Then** it includes `Overview`, `Goals`, `Stack`, `What it demonstrates`, `Current scope and next steps`, `Architecture decisions`, and `SDD / Spec Kit workflow`.
2. **Given** a recruiter reviews the selected projects area, **When** they inspect `LMS` and `Landing Version System`, **Then** both are presented as `coming next` only and do not behave like fully implemented case studies.
3. **Given** a recruiter reviews the commercial landing pages proof block, **When** they inspect the examples, **Then** they see an aggregated proof presentation with six selected public examples, mixed visual and text-led treatments, and honest implementation-focused role framing.

---

## Scope & Trust Guardrails *(mandatory)*

- **Active Release Slice**: `MVP1` only. This spec covers the first public hiring-ready release and must not pull `MVP2` or `MVP3` scope forward.
- **Built vs Next**: Already implemented in the repository are the documentation baseline, visual contract, constitution, and release planning guardrails. This spec adds the first public portfolio experience for `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/projects/portfolio-cms`, and `/uk/projects/portfolio-cms`. `LMS` and `Landing Version System` remain explicit `coming next` cards only. Richer Payload-managed runtime content, additional case studies, and broader system depth remain deferred.
- **Public-Safety Constraints**: Public proof may reference real public work, public profiles, and sanitized project descriptions, but it must never expose private repositories, corporate code, or internal client architecture. The public GitHub profile may be linked; the private portfolio repository must not be linked or referenced.
- **Language Coverage**: English and Ukrainian are required first-class languages for all MVP1 public routes and core blocks. Content may differ in phrasing, but meaning, trust labeling, and hiring signal must stay equivalent.

### Edge Cases

- What happens when a visitor lands on `/` directly? They are redirected to `/en`; there is no automatic locale detection beyond this fixed default.
- What happens when a commercial example lacks a strong preview image? The example remains in the block as a text-led outbound entry rather than forcing a weak visual card.
- What happens when an outbound commercial example link becomes unavailable later? The portfolio must not expose a broken outbound action; the example should be replaced, temporarily removed, or shown as non-clickable text-only proof until a valid public link exists.
- What happens when a user changes the theme and navigates between routes? The selected theme persists locally and remains stable across the localized portfolio pages.
- What happens on a first visit before any theme is saved? `Editorial Light` is applied as the default theme.
- What happens when browser print behavior varies? The resume pages should target a clean one-page PDF at standard desktop browser print settings; minor browser differences are acceptable only if readability is preserved and no manual content cleanup is required.
- What happens when a recruiter opens a `coming next` project card? The card remains a non-navigating status card and does not expose a case-study or demo destination.
- What happens when one language version is updated first during content iteration? The change is not complete until the paired language version is brought back to parity or the gap is explicitly deferred outside MVP1.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST redirect the root route `/` to `/en`.
- **FR-002**: The system MUST provide public localized routes for `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/projects/portfolio-cms`, and `/uk/projects/portfolio-cms`.
- **FR-003**: The homepage MUST include an editorial hero, public proof metrics, a compact core skills or stack row, a commercial landing pages proof block, a selected projects block, a theme switcher, and a contact section.
- **FR-004**: The homepage hero MUST state availability for remote frontend opportunities and use the primary professional label `Middle Frontend Developer with React, Next.js, and CMS-driven websites`.
- **FR-005**: The homepage hero MUST present two equal primary actions: `View resume` and `Get in touch`.
- **FR-006**: `Get in touch` MUST jump to the homepage contact section and MUST NOT open a separate contact page.
- **FR-007**: The homepage MUST surface public proof metrics based on `4+ years frontend`, `300+ landing pages`, and `Next.js / CMS-driven / production support` experience.
- **FR-008**: The homepage MUST NOT use a personal photo.
- **FR-009**: The contact section MUST include email, LinkedIn, GitHub, and Telegram.
- **FR-010**: The public GitHub profile MAY be shown, but the private portfolio repository MUST NOT be linked or referenced.
- **FR-011**: The selected projects block MUST contain exactly three cards in MVP1: `Portfolio CMS`, `LMS coming next`, and `Landing Version System coming next`.
- **FR-012**: Only `Portfolio CMS` MUST receive a full case page in MVP1.
- **FR-013**: The `Portfolio CMS` case page MUST include `Overview`, `Goals`, `Stack`, `What it demonstrates`, `Current scope and next steps`, `Architecture decisions`, and `SDD / Spec Kit workflow`.
- **FR-014**: `LMS` and `Landing Version System` MUST remain clearly labeled as `coming next` and MUST NOT expose full case-study routes or presentation that implies completion.
- **FR-015**: Commercial Landing Pages MUST remain an aggregated homepage proof block in MVP1 and MUST NOT become a separate projects index page.
- **FR-016**: The commercial proof block MUST include exactly six selected public examples in MVP1.
- **FR-017**: The commercial proof block MUST use mixed presentation, combining several stronger visual previews with several text-led outbound links.
- **FR-018**: The commercial proof block MUST keep role descriptions honest and implementation-focused, and MUST avoid over-emphasizing brand names inside the portfolio itself.
- **FR-019**: The resume MUST exist in English and Ukrainian and MUST remain short.
- **FR-020**: The resume MUST include only `Header`, `Positioning summary`, `Core skills`, `Experience summary`, `Selected projects`, and `Contacts`.
- **FR-021**: The PDF flow for MVP1 MUST rely on a print-friendly resume page that users can save as PDF from the browser, MUST NOT require polished print automation, server-side PDF generation, or prebuilt downloadable files, and MUST target a clean one-page export at standard desktop browser print settings.
- **FR-022**: The system MUST include a theme selector with exactly four curated themes: `Editorial Light`, `Graphite Dark`, `Warm Neutral`, and `High Contrast`.
- **FR-023**: Theme changes MUST preserve the Clean Editorial Technical hierarchy, MUST apply across all required portfolio routes and locales, MUST persist locally for returning visitors, and MUST fall back to `Editorial Light` when no saved preference exists.
- **FR-024**: Public-facing MVP1 content MUST keep English and Ukrainian in full parity across required pages and major content blocks, including the same route coverage, section structure, status labels, CTA intent, and proof-item counts.
- **FR-025**: Public content MUST clearly distinguish what is already built from what is planned next whenever that status affects user trust.
- **FR-026**: The public site in MVP1 MUST use a typed content layer in code as the runtime content source for the first release.
- **FR-027**: Payload MAY remain installed in the repository, but the public site MUST NOT depend on Payload-managed runtime content before the structure is stable.
- **FR-028**: The release MUST include basic SEO and metadata for the public portfolio routes.
- **FR-029**: The release MUST follow the `Clean Editorial Technical` design contract defined in `DESIGN.md`, including restrained motion, sharp geometry, and token-based theming.
- **FR-030**: The release MUST NOT add a separate contact page, a separate projects index page, Russian localization, automatic locale detection, a full LMS case study, a full Landing Version System demo, or polished PDF automation in MVP1.
- **FR-031**: Commercial proof entries without a strong preview image MUST render as text-led entries rather than as weak visual cards.
- **FR-032**: Commercial proof entries MUST NOT expose broken outbound links; when a public example URL is unavailable, the public UI MUST remove the outbound action until the entry is replaced or the link is restored.
- **FR-033**: `LMS` and `Landing Version System` cards MUST show only honest `coming next` status content in MVP1 and MUST NOT expose case-study navigation, live-demo CTAs, or wording that implies completion.

### Key Entities *(include if feature involves data)*

- **LocalizedPageContent**: Structured content for each required route and locale, including hero copy, proof statements, resume sections, and case-page sections.
- **ThemeOption**: One of the four curated themes with a stable identifier, label, and token set that preserves the same hierarchy across atmospheres.
- **CommercialProofExample**: A selected public landing-page example with locale-safe framing, optional preview asset, outbound URL, short role description, and presentation mode (`visual` or `text-led`).
- **SelectedProjectCard**: A homepage project summary item with title, status label, short proof statement, and either a live case-page destination (`Portfolio CMS`) or a `coming next` state.
- **ContactMethod**: A public outreach channel shown in the homepage contact section and resume, including label, destination, and display priority.
- **ProofMetric**: A concise homepage metric or statement used to establish credibility without overstating experience.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A recruiter can reach the English homepage from `/` without manual locale selection.
- **SC-002**: Both `/en` and `/uk` expose all required homepage sections and both localized resume routes expose only the approved short-resume sections.
- **SC-003**: Reviewers can identify the primary role positioning, public proof metrics, and the two main homepage CTAs within the first screen of the homepage.
- **SC-004**: Reviewers can distinguish implemented proof (`Portfolio CMS` case page and current homepage/resume content) from `coming next` proof (`LMS`, `Landing Version System`) without ambiguity because only `Portfolio CMS` offers case-page navigation and the other two cards remain clearly labeled status-only items.
- **SC-005**: The commercial proof block shows six selected public examples with mixed presentation and no requirement for a separate projects index page.
- **SC-006**: At standard desktop browser print settings, each localized resume route can be saved as a readable one-page PDF through the browser print flow without extra tooling or manual content cleanup.
- **SC-007**: Theme selection offers exactly four curated themes, defaults to `Editorial Light` when no preference is saved, and keeps the selected theme stable across navigation.
- **SC-008**: For every required English MVP1 route there is a Ukrainian counterpart with matching required sections, status labels, CTA intent, project-card count, and commercial-example count, while preserving equivalent meaning and hiring signal.
- **SC-009**: No public MVP1 page links to or references the private portfolio repository, private code, or internal client architecture.

## Assumptions

- The initial public content for MVP1 will be maintained in typed code data rather than pulled from runtime Payload collections.
- The localized public pages will be built in the existing Next.js App Router structure already present in the repository.
- A browser-based print-to-PDF flow is sufficient for MVP1 as long as the approved resume content fits on one page at standard desktop browser print settings; minor browser differences are acceptable only if readability is preserved without manual cleanup.
- The six commercial examples chosen for MVP1 are already public-safe to link outward and can be described without exposing confidential project details.
- Basic SEO and metadata mean route-level titles, descriptions, and essential open graph or equivalent metadata, not a full advanced SEO management system.
- Theme persistence may use client-side local storage because theme selection is a user preference rather than public content.
