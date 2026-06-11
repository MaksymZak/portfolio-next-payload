# Portfolio Design System

## Role Of This File

`DESIGN.md` is the active source of truth for the portfolio visual system.

It should answer four questions:

1. What impression should the product create?
2. Which visual rules are fixed for MVP?
3. Which tokens and themes must exist in code?
4. How should layout, typography, and components behave?

If this file conflicts with old Stitch notes or previous summaries, this file wins.

## Product Signal

The portfolio should read as a reliable hiring tool for a remote Middle Frontend / Next.js role.

The desired first impression is:

> production-ready, structured, technically strong, and visually restrained

This is not a creative showpiece, an experimental art portfolio, or a generic template landing page.

## Non-Goals

- No glossy startup aesthetic.
- No purple-blue gradient identity.
- No decorative blobs or empty visual tricks.
- No heavy animation that slows recruiter scanning.
- No overly playful tone.
- No design choices that make the content feel secondary.

## Visual Direction

Chosen direction: `Swiss Technical Editorial`.

The visual language combines:

- Swiss/International typographic discipline (strict grid, decisive hierarchy, generous structure);
- technical documentation clarity;
- strict geometry and sharp corners;
- monochrome surfaces with one strong accent;
- mono labels for metadata and UI chrome;
- dense but readable information blocks.

The accent color is the only intentional signal in the system. Everything else should support structure, contrast, and reading rhythm. The result must read as an engineer's reference document, not a marketing landing page.

## Theme Strategy

MVP includes a theme selector with four curated schemes. Themes change atmosphere, but they must preserve the same hierarchy, spacing, contrast discipline, and component shapes.

| Theme           | `data-theme` value | Use                                               |
| --------------- | ------------------ | ------------------------------------------------- |
| Editorial Light | `light`            | default theme for recruiters and general browsing |
| Graphite Dark   | `dark`             | darker technical reading mode                     |
| Warm Neutral    | `warm`             | softer editorial alternative                      |
| High Contrast   | `contrast`         | strict accessibility-first mode                   |

## Core Token Contract

For MVP, all styling should derive from this token contract before any component-specific expansion:

```css
--background
--foreground
--surface
--surface-muted
--border
--accent
--accent-foreground
--muted
--muted-foreground
--ring
--radius
--font-sans
--font-mono
```

Rules:

- `--accent` is reserved for primary action, active state, and high-signal UI only.
- `--radius` stays `0rem` for MVP.
- New tokens should only be added when a real component or layout requirement cannot be expressed through the core set.
- If shadcn/ui is introduced later, map its semantic variables from this contract instead of inventing a second palette.

## Theme Tokens

```css
[data-theme='light'] {
  --background: #f9f9f9;
  --foreground: #000000;
  --surface: #ffffff;
  --surface-muted: #f0f0f0;
  --border: #e5e5e5;
  --accent: #ff4f00;
  --accent-foreground: #ffffff;
  --muted: #f3f3f3;
  --muted-foreground: #666666;
  --ring: #ff4f00;
  --radius: 0rem;
}

[data-theme='dark'] {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --surface: #141414;
  --surface-muted: #1f1f1f;
  --border: #262626;
  --accent: #ff4f00;
  --accent-foreground: #ffffff;
  --muted: #1a1a1a;
  --muted-foreground: #a0a0a0;
  --ring: #ff4f00;
  --radius: 0rem;
}

[data-theme='warm'] {
  --background: #f4f1ea;
  --foreground: #1a1a1a;
  --surface: #faf8f4;
  --surface-muted: #efebe0;
  --border: #ded9d1;
  --accent: #ff4f00;
  --accent-foreground: #ffffff;
  --muted: #eae5d8;
  --muted-foreground: #5c5c5c;
  --ring: #ff4f00;
  --radius: 0rem;
}

[data-theme='contrast'] {
  --background: #ffffff;
  --foreground: #000000;
  --surface: #ffffff;
  --surface-muted: #f2f2f2;
  --border: #000000;
  --accent: #ff4f00;
  --accent-foreground: #ffffff;
  --muted: #f2f2f2;
  --muted-foreground: #000000;
  --ring: #000000;
  --radius: 0rem;
}
```

## Typography

- Sans family: `IBM Plex Sans` (display + body). Distinctive, technical, editorial; supports full Cyrillic (required for Ukrainian) and avoids the generic `Inter`/`Arial`/system look.
- Mono family: `JetBrains Mono` (also supports Cyrillic).
- Both families MUST be loaded with the `latin` and `cyrillic` subsets so Ukrainian renders in the correct typeface, never a fallback.
- Font loading MUST use `next/font` with CSS variables mapped to `--font-sans` and `--font-mono`.
- Display and heading text should be tight, dense, and confident.
- Body text must stay readable first; avoid over-tightening long copy.
- Mono is for labels, metadata, dates, filters, badges, and technical support text.
- Prefer uppercase mono labels for section metadata and UI chrome.

### Recommended Scale

- Display: `72px-80px`, weight `800`, line-height `1.0-1.05`.
- Large heading: `48px`, weight `700`, line-height `1.1`.
- Large heading mobile: `32px`, weight `700`, line-height `1.2`.
- Section heading: `24px`, weight `600`, line-height `1.3`.
- Body large: `18px`, line-height `1.6`.
- Body default: `16px`, line-height `1.5`.
- Mono label: `12px-13px`, uppercase.

## Layout And Spacing

- Use a 4px spacing base.
- Preferred spacing steps: `4, 8, 12, 16, 24, 32, 48, 64, 80, 120, 160`.
- Desktop layout uses a 12-column grid.
- Tablet uses 8 columns.
- Mobile uses 4 columns.
- Desktop page margin: `64px`.
- Mobile page margin: `20px`.
- Max container width: `1440px`.

Practical rule:

- hero and editorial sections may breathe;
- proof blocks, metadata rows, and technical sections should stay dense;
- body copy should usually sit within 5-6 columns for readable line length.

## Surfaces, Borders, And Depth

- No blur-based soft shadows as the primary separation mechanism.
- Default separation comes from tone and border.
- Borders are `1px` by default.
- Hard offset shadows may be used sparingly for active or tactile states.
- All main UI surfaces use sharp corners.
- Overlays should stay crisp, not glassy.

## Component Rules

### Buttons

- Primary button: accent background, accent foreground text, mono label, uppercase.
- Secondary button: transparent or surface background, visible border, no rounded corners.
- Hover states should feel precise, not playful.

### Cards

- Flat surface with border.
- No generic drop shadow.
- Project cards should prioritize screenshot, title, role, stack, and outcome.
- Metadata uses mono text.

### Inputs

- Visible border on all sides.
- Focus state should rely on accent border or ring.
- No rounded corners.

### Tags And Metadata

- Use mono.
- Keep them small and structured.
- Backgrounds should stay neutral so the accent remains rare.

### Code And Technical Blocks

- Dark technical blocks are allowed even in light themes.
- Mono content should remain compact and readable.
- Avoid decorative syntax-card treatments.

## Motion And Interaction

- Motion is supportive, not central.
- Prefer reveal, hover, and state transitions over theatrical timeline animation.
- All motion must respect `prefers-reduced-motion`.
- Theme switching should feel immediate and stable.
- Recruiter scan speed is more important than visual spectacle.

## Accessibility Requirements

- Default themes should target WCAG AA.
- High contrast theme should be the fallback accessibility-first mode.
- Focus indicators must be obvious and never rely on color alone.
- Text contrast and interactive states matter more than aesthetic purity.

## Implementation Notes For The Next Pass

- Theme state is managed by `next-themes` using the `data-theme` attribute on the root element, with themes `light`, `dark`, `warm`, `contrast` and default `light`.
- Define global CSS variables (the token contract above) in the global stylesheet, and expose them to Tailwind 4 via the `@theme inline` mapping so utilities resolve from tokens.
- shadcn/ui semantic variables MUST be mapped from this token contract, not invented separately: `--background`->`--background`, `--foreground`->`--foreground`, `--card`->`--surface`, `--border`->`--border`, `--primary`->`--accent`, `--primary-foreground`->`--accent-foreground`, `--muted`/`--muted-foreground` direct, `--ring`->`--ring`, `--radius`->`--radius` (0rem).
- Load fonts with `next/font` (`IBM Plex Sans` + `JetBrains Mono`, both with `latin` + `cyrillic` subsets) exposing `--font-sans` and `--font-mono`.
- `next-themes` handles persistence; no manual `localStorage` theme code is required.
- All UI is implemented mobile-first (base styles ~375px, scale up with Tailwind responsive prefixes) and verified at mobile, tablet, and desktop.

## Reference Material

These are reference inputs, not active source-of-truth files:

- `.agents/docs/reference.md`
- `.agents/docs/v0/`
- `.agents/docs/design-image/`
