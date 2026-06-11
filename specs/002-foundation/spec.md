# Feature Specification: Foundation (App Shell & Infrastructure)

**Feature Branch**: `002-foundation`

**Created**: 2026-06-09

**Status**: Draft

**Input**: User description: "First implementation slice of a full visual/architecture restart. Scope covers ONLY the application shell and foundational infrastructure that every page will sit on: localized routing skeleton, persistent header and footer, four-theme system, token contract in code, typed content layer foundation for shell strings, skip-to-content link and accessible focus, and a mobile-first responsive shell. It does NOT build any real page content."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Visitor reaches a localized page through a stable URL (Priority: P1)

A first-time visitor opens the site at the bare root and is taken to the English experience. They can also open the Ukrainian experience directly. Both produce the same structured chrome (header + footer) around an empty/stub main area, with all visible shell text shown in the requested language.

**Why this priority**: Localized routing is the foundation every other page depends on. Without a predictable locale-prefixed URL scheme and a rendered shell, no later page (homepage, resume, case) can be built or linked. This story alone proves the routing skeleton and the bilingual chrome are in place.

**Independent Test**: Can be fully tested by visiting `/`, confirming a redirect to `/en`, then opening `/en` and `/uk` and confirming each renders the same header/footer with locale-correct chrome strings and an empty or stub main region.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/`, **When** the entry route resolves, **Then** the visitor is redirected to `/en`.
2. **Given** a visitor opens `/en`, **When** the page loads, **Then** the shell renders the header, an empty or stub main area, and the footer, with all chrome strings in English.
3. **Given** a visitor opens `/uk`, **When** the page loads, **Then** the same shell structure renders with all chrome strings in Ukrainian.
4. **Given** a visitor requests a locale-prefixed path that has no page yet, **When** the route resolves, **Then** the shell still renders consistently around the stub/empty content without breaking the header or footer.
5. **Given** a visitor's browser language is set to a non-default language, **When** they open `/`, **Then** they are still routed to the default `/en` (no automatic locale detection).

---

### User Story 2 - Visitor switches language without losing their place (Priority: P1)

A visitor on any localized path uses the header language switcher to move between English and Ukrainian. The same sub-path is preserved so they stay on the equivalent page in the other language.

**Why this priority**: Bilingual parity is a constitutional MVP requirement, and the switcher is the only control that makes both languages reachable from the UI. It must be correct from the foundation so every later page inherits working language switching.

**Independent Test**: Can be fully tested by loading a locale-prefixed path, activating the EN/UK switcher, and confirming the locale segment changes while the remainder of the path is preserved.

**Acceptance Scenarios**:

1. **Given** a visitor is on `/en`, **When** they choose UK in the language switcher, **Then** they land on `/uk` with the same shell rendered in Ukrainian.
2. **Given** a visitor is on a deeper localized path such as `/en/<sub-path>`, **When** they switch language, **Then** they land on `/uk/<sub-path>` with the locale segment swapped and the sub-path preserved.
3. **Given** a visitor switches language, **When** the new page loads, **Then** the active language is visibly indicated in the switcher.

---

### User Story 3 - Visitor selects a comfortable theme that sticks (Priority: P1)

A visitor opens the theme switcher in the header, sees exactly four curated themes, and selects one. The choice applies immediately, survives navigation and a full reload, and the page never briefly shows the wrong theme while loading.

**Why this priority**: The four-theme system is a core part of the design contract and the foundation must guarantee persistence and no flash-of-incorrect-theme before any real content exists, because retrofitting flash-free theming later is error-prone.

**Independent Test**: Can be fully tested by opening the theme switcher, confirming four options, selecting a non-default theme, navigating and reloading, and confirming the selection persists with no visible flash of the default theme on load.

**Acceptance Scenarios**:

1. **Given** a visitor with no saved preference opens any localized page, **When** the page loads, **Then** the light theme is applied by default.
2. **Given** a visitor opens the theme switcher, **When** they view the options, **Then** exactly four themes are offered: Editorial Light, Graphite Dark, Warm Neutral, and High Contrast.
3. **Given** a visitor selects a non-default theme, **When** they navigate to another localized path or reload the page, **Then** the selected theme is still applied.
4. **Given** a visitor has a saved non-default theme, **When** the page first paints, **Then** the saved theme is applied without a visible flash of the default theme.
5. **Given** the active theme, **When** it changes, **Then** the change is reflected through a single theme attribute on the root element so all themed surfaces update together.

---

### User Story 4 - Visitor navigates and contacts from the shell chrome (Priority: P2)

A visitor uses the header to see the wordmark and the primary navigation entries (Work, Experience/Skills, Resume, Contact), a "Download CV" action, and the footer's public contact links and copyright. The navigation entries and Download CV are placeholders at this slice but are present, labeled, and accessible.

**Why this priority**: The chrome establishes the site's navigation and contact surface that later pages will wire up. It must be present and accessible from the foundation, but its targets are intentionally stubbed until later page specs exist.

**Independent Test**: Can be fully tested by inspecting the header for the wordmark, the four navigation labels, the language switcher, the theme switcher, and the Download CV action, and inspecting the footer for the name, the four public contact links, and a copyright line — all in the active language.

**Acceptance Scenarios**:

1. **Given** a visitor views the header, **When** they scan it, **Then** they see a wordmark/name, four primary navigation labels (Work, Experience/Skills, Resume, Contact), a language switcher, a theme switcher, and a Download CV action.
2. **Given** a visitor views the footer, **When** they scan it, **Then** they see the name, public contact links for email, Telegram, LinkedIn, and GitHub, and a copyright line.
3. **Given** a visitor inspects the footer contact links, **When** they follow each link, **Then** each points to the real public channel and none references a private repository.
4. **Given** the active language, **When** the visitor reads the navigation labels, footer labels, and theme names, **Then** all of these strings are shown in the correct language with full EN/UK parity.

---

### User Story 5 - Keyboard and assistive-technology user navigates the shell (Priority: P2)

A keyboard-only or assistive-technology user can skip directly to the main content, move through the shell controls in a logical order, and always see a clear focus indicator that does not rely on color alone.

**Why this priority**: Accessibility is a constitutional baseline and is far cheaper to guarantee in the foundation shell than to retrofit across every page later.

**Independent Test**: Can be fully tested by tabbing from the top of the page, confirming a skip-to-content link appears and jumps focus to the main region, and confirming every interactive shell control shows a visible, color-independent focus indicator.

**Acceptance Scenarios**:

1. **Given** a keyboard user lands on a localized page, **When** they press Tab once, **Then** a skip-to-content link becomes visible and, when activated, moves focus to the main content region.
2. **Given** a keyboard user tabs through the header and footer, **When** focus moves between controls, **Then** each focused control shows a visible focus indicator that does not depend on color alone.
3. **Given** a user who prefers reduced motion, **When** they interact with the shell, **Then** shell transitions respect that preference.

---

### User Story 6 - Visitor uses the shell on a small screen (Priority: P2)

A visitor on a ~375px-wide phone sees a usable, correctly laid-out shell with a mobile navigation treatment, and the same shell adapts cleanly to tablet and desktop widths within a maximum content width.

**Why this priority**: Mobile-first is mandated by the constitution and the design contract. The shell must be verified across breakpoints from the start so later sections inherit a sound responsive frame.

**Independent Test**: Can be fully tested by rendering the shell at mobile (~375px), tablet, and desktop widths and confirming the header, footer, and content container remain usable and correctly laid out at each width.

**Acceptance Scenarios**:

1. **Given** a visitor on a ~375px-wide viewport, **When** the shell renders, **Then** the header presents a mobile navigation treatment and the footer remains readable without horizontal overflow.
2. **Given** a visitor on a tablet-width viewport, **When** the shell renders, **Then** the layout adapts appropriately between the mobile and desktop treatments.
3. **Given** a visitor on a wide desktop viewport, **When** the shell renders, **Then** content is constrained within a maximum content width and does not stretch edge-to-edge beyond that bound.

---

## Scope & Trust Guardrails _(mandatory)_

- **Active Release Slice**: MVP restart, slice `002-foundation` only. This is the first slice of the full visual/architecture restart and provides only the application shell and foundational infrastructure.
- **Built vs Next**:
  - **Adds now**: locale-prefixed routing skeleton with default `en` and no auto-detection; root `/` → `/en` redirect; persistent localized header and footer wrapping all localized pages; four-theme system with persistence and no flash; the DESIGN.md token contract expressed in code for all four themes and exposed to the styling system; shadcn/ui semantic variables mapped from those tokens; a typed content-layer foundation holding shell-level localized strings (nav labels, footer labels, contact links, theme names) in full EN/UK parity; skip-to-content link and accessible color-independent focus; mobile-first shell verified at mobile/tablet/desktop within a max content width.
  - **Coming next / deferred**: homepage sections — hero, proof metrics, core skills, commercial landing pages, selected projects, contact section body — deferred to `003-homepage`; resume page content and print/PDF flow deferred to `004-resume`; portfolio CMS case page content deferred to `005-case`; SEO/metadata/OG/sitemap/hreflang depth deferred to `006-seo` (a basic per-route title is acceptable but not the focus of this slice). Header navigation entries and the Download CV action are present as placeholders and are wired to real targets in later slices. Real page content modules may exist only as empty/typed stubs.
- **Public-Safety Constraints**: The shell exposes only public channels (email, Telegram, LinkedIn, GitHub) and a wordmark/copyright. No private repositories, corporate code, internal client architecture, or non-public proof appear anywhere in the shell. Footer links MUST never reference a private repository.
- **Language Coverage**: English and Ukrainian shell strings MUST exist with full parity for all chrome introduced by this slice (navigation labels, footer labels, contact link labels, theme names, skip-to-content label, language/theme switcher labels). English is the default locale. Russian localization is out of scope.
- **Slice Granularity**: This spec covers exactly one page-group — the global app shell and its foundational infrastructure — not the whole site and not a single UI section. No page-body content is built here. Any externally generated (e.g. v0.dev) chrome code MUST be refactored to project structure, tokens, i18n, and accessibility before commit.
- **Agent Tools & Documentation**: This specification was prepared with reference to the project constitution (`.specify/memory/constitution.md`, v1.2.0) and the visual contract (`DESIGN.md`). Implementation planning for this slice SHOULD consult the `payload`, `shadcn`, `frontend-design`, and `vercel-react-best-practices` skills in `.agents/skills`, and SHOULD use Context7 MCP for authoritative docs on the routing, theming, and component-primitive libraries chosen in the plan (library IDs and excerpts recorded in the plan, not here). No scope-changing decision in this spec required interview-mode approval; the scope was fully specified by the user.

### Edge Cases

- **Unknown or unsupported locale segment**: A path whose first segment is not a supported locale MUST resolve predictably (treated as not-found or redirected to the default locale) without breaking the shell.
- **No saved theme preference**: When no preference is stored, the shell falls back to the light theme.
- **Corrupted or invalid stored theme value**: An unrecognized stored theme value MUST fall back to the default light theme rather than rendering an unstyled or broken page.
- **JavaScript disabled or slow hydration**: The shell MUST still render readable, locale-correct chrome; the theme attribute MUST be applied early enough to avoid a flash of the wrong theme.
- **Very narrow viewport (below ~375px)**: The shell MUST avoid horizontal overflow and keep header/footer controls reachable.
- **Reduced-motion preference**: Shell transitions, including theme changes, MUST respect `prefers-reduced-motion`.
- **Deep-linking directly to `/uk` without visiting `/en` first**: The Ukrainian shell MUST render fully and independently.

## Requirements _(mandatory)_

### Functional Requirements

#### Localized routing skeleton

- **FR-001**: Every public route MUST be served under a locale path prefix (`/en` or `/uk`), with the locale segment always present.
- **FR-002**: The default locale MUST be `en`, and automatic locale detection MUST be disabled.
- **FR-003**: The bare root path `/` MUST redirect to `/en`.
- **FR-004**: Both `/en` and `/uk` MUST render the same shell structure (header + footer) around an empty or stub main region.
- **FR-005**: A request for a locale-prefixed path with no built page yet MUST still render the shell consistently without breaking the header or footer.

#### Localized app shell (header & footer)

- **FR-006**: A persistent header and footer MUST wrap all localized pages.
- **FR-007**: The header MUST contain a wordmark/name, primary navigation placeholders labeled Work, Experience/Skills, Resume, and Contact, a language switcher (EN/UK), a theme switcher control, and a Download CV action placeholder.
- **FR-008**: The header navigation entries and the Download CV action MAY be non-functional placeholders in this slice, but MUST be present, labeled, and keyboard-focusable.
- **FR-009**: The footer MUST contain the name, public contact links for email, Telegram, LinkedIn, and GitHub, and a copyright line.
- **FR-010**: Footer contact links MUST point to the real public channels and MUST NOT reference any private repository.

#### Language switching

- **FR-011**: The language switcher MUST swap the active locale between `en` and `uk` while preserving the current sub-path.
- **FR-012**: The language switcher MUST visibly indicate the currently active language.

#### Four-theme system

- **FR-013**: The shell MUST offer exactly four themes: Editorial Light (light, default), Graphite Dark (dark), Warm Neutral (warm), and High Contrast (contrast).
- **FR-014**: The active theme MUST be applied through a single theme attribute on the root element so all themed surfaces update together.
- **FR-015**: The selected theme MUST persist across navigation and full page reloads.
- **FR-016**: When no theme preference is saved, the shell MUST default to the light theme.
- **FR-017**: An unrecognized or invalid saved theme value MUST fall back to the light theme.
- **FR-018**: The shell MUST NOT show a flash of an incorrect theme before the saved/default theme is applied on load.

#### Token contract & styling foundation

- **FR-019**: The token contract from `DESIGN.md` MUST be present in code as CSS variables for all four themes, including background, foreground, surface, surface-muted, border, accent, accent-foreground, muted, muted-foreground, ring, radius, font-sans, and font-mono.
- **FR-020**: The token contract MUST be exposed to the styling system so utility classes and components resolve their values from the tokens rather than from separately invented values.
- **FR-021**: The component-primitive system (shadcn/ui) MUST be initialized with its semantic variables mapped from the `DESIGN.md` token contract, not from a second independent palette.
- **FR-022**: `--radius` MUST resolve to `0rem` across all four themes, preserving the sharp-geometry rule of the design contract.

#### Typed content layer foundation

- **FR-023**: Shell-level localized strings (navigation labels, footer labels, public contact link labels, theme names, skip-to-content label, switcher labels) MUST be held in typed code modules for both `en` and `uk`.
- **FR-024**: The EN and UK shell-string sets MUST be at full parity, covering the same keys with equivalent meaning.
- **FR-025**: Real page content modules MAY be stubbed (empty/typed placeholders), but shell strings MUST be first-class and complete for both locales.

#### Accessibility & responsive shell

- **FR-026**: A skip-to-content link MUST be available as the first focusable element and, when activated, MUST move focus to the main content region.
- **FR-027**: All interactive shell controls MUST show a visible focus indicator that does not rely on color alone.
- **FR-028**: Shell motion, including theme changes, MUST respect the user's reduced-motion preference.
- **FR-029**: The shell MUST be implemented mobile-first and remain usable and correctly laid out at mobile (~375px), tablet, and desktop widths.
- **FR-030**: At mobile width the header MUST present a mobile navigation treatment, and at all widths content MUST be constrained within a maximum content width.

#### Trust & parity (constitutional)

- **FR-031**: Public shell content MUST avoid exposing any non-public proof, private repository, or internal client information.
- **FR-032**: Because the shell is public-facing in MVP, its English and Ukrainian chrome MUST provide equivalent meaning and hiring signal.

### Key Entities _(include if feature involves data)_

- **Locale**: A supported language for the public site. Attributes: code (`en`, `uk`), default flag (`en` is default), display label shown in the switcher. Russian is explicitly excluded.
- **Theme**: A curated visual scheme. Attributes: identifier/attribute value (`light`, `dark`, `warm`, `contrast`), human-readable name (Editorial Light, Graphite Dark, Warm Neutral, High Contrast), default flag (`light` is default). Relationship: exactly four themes exist; one is active at a time.
- **Shell String Set**: The collection of localized chrome strings for one locale. Attributes: navigation labels, footer labels, contact link labels, theme names, skip/switcher labels. Relationship: one set per locale, kept at parity across `en` and `uk`.
- **Contact Link**: A public contact channel surfaced in the footer. Attributes: channel type (email, Telegram, LinkedIn, GitHub), display label, public destination. Constraint: destinations are public-only; private repositories are never referenced.
- **Design Token**: A named styling value from the `DESIGN.md` contract. Attributes: token name, per-theme value. Relationship: each token has a value in all four themes and is consumed by both the utility system and the component primitives.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of visits to `/` end on `/en` via redirect.
- **SC-002**: Both `/en` and `/uk` render the same shell (header + footer around an empty/stub main) with locale-correct chrome strings in 100% of loads.
- **SC-003**: Using the language switcher from any localized path changes only the locale segment and preserves the sub-path in 100% of attempts.
- **SC-004**: The theme switcher offers exactly four themes, defaults to light with no saved preference, and the selected theme persists across navigation and reload in 100% of attempts.
- **SC-005**: No visible flash of an incorrect theme occurs on load when a non-default theme is saved, verified across the supported themes.
- **SC-006**: The shell is usable and correctly laid out with no horizontal overflow at mobile (~375px), tablet, and desktop widths.
- **SC-007**: A keyboard user can reach the skip-to-content link as the first focusable element and jump to the main region, and every interactive shell control shows a visible, color-independent focus indicator.
- **SC-008**: Footer contact links resolve to the four real public channels (email, Telegram, LinkedIn, GitHub) and zero links reference a private repository.
- **SC-009**: Every shell chrome string present in English has an equivalent Ukrainian counterpart (full key parity), with no missing or fallback-to-English strings on `/uk`.
- **SC-010**: A reviewer can confirm that no real page-body content (hero, resume, case, proof, projects, contact body) is shipped by this slice — only the shell and stubs.

## Assumptions

- The four themes, their attribute values, default, and token values follow `DESIGN.md` exactly (`light`, `dark`, `warm`, `contrast`; default `light`; accent `#ff4f00`; `--radius` = `0rem`).
- The locale set is exactly `en` and `uk`; English is default; no automatic locale detection; Russian is out of scope per the constitution.
- The header navigation labels are Work, Experience/Skills, Resume, and Contact; their final destinations (anchors vs routes) are finalized in later page slices and are placeholders here.
- The public contact channels are email, Telegram, LinkedIn, and GitHub; the phone number and city are intentionally reserved for the resume page (a later slice) and are not part of the public shell footer.
- Theme persistence and flash-free application are handled by the chosen theming approach; no real page content is required for this slice to be complete.
- A basic per-route page title is acceptable for stub pages; full SEO/metadata/OG/sitemap/hreflang work is deferred to `006-seo`.
- Payload remains admin-only and is NOT a runtime content source for the public shell; the shell's strings come from the typed code content layer.
- "Maximum content width" follows the design contract's container bound; exact pixel values are an implementation detail for the plan.
