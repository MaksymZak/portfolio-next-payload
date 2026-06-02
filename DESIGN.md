---
name: Technical Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5c4037'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#916f65'
  outline-variant: '#e6beb2'
  surface-tint: '#ad3300'
  primary: '#a93100'
  on-primary: '#ffffff'
  primary-container: '#d34000'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59e'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#005da8'
  on-tertiary: '#ffffff'
  tertiary-container: '#0076d3'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#842500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a4c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004884'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

This design system is built for precision-engineered documentation and high-performance technical environments. The brand personality is authoritative, clinical, and unapologetically functional. It draws heavily from **Minimalism** and **Neo-Brutalism**, utilizing a monochrome foundation to allow content to lead, while employing a single high-visibility accent to denote action and urgency.

The aesthetic evokes the feeling of a modern technical manual or a high-end architectural specification. It prioritizes clarity, structural integrity, and the beauty of systematic information hierarchy. The target audience includes developers, engineers, and designers who value density without clutter and find beauty in rigorous documentation.

## Colors

The palette is strictly constrained to ensure maximum impact for the "International Orange" accent.

- **Primary (#FF4F00):** Used exclusively for primary calls-to-action, critical status indicators, and active states. It is the "signal" in the noise.
- **Monochrome Foundation:** Use `#0A0A0A` for primary text and structural elements. `#FAFAFA` and `#FFFFFF` provide the canvas.
- **Functional Greys:** Use a neutral scale for secondary text and borders to maintain a clinical, "un-designed" feel.
- **Semantic Usage:** Red, green, and yellow should be avoided unless strictly necessary for status; even then, they should be desaturated to not compete with the International Orange.

## Typography

The typography system relies on the tension between the massive, aggressive weight of **Inter** (tightened for a neo-grotesque feel) and the technical precision of **JetBrains Mono**.

- **Headings:** Should be set with tight letter-spacing and low line-height to create dense "blocks" of text.
- **Accents:** Use JetBrains Mono for metadata, labels, small captions, and technical data points. 
- **Body:** Inter provides high legibility for long-form documentation.
- **Case:** Use All-Caps for Monospaced labels to reinforce the "technical spec" aesthetic.

## Layout & Spacing

The design system utilizes a **12-column editorial grid** that emphasizes asymmetrical layouts and intentional "dead space."

- **Grid:** Use a 12-column grid on desktop. Large display type should often span 8-10 columns, while body text is restricted to 6 columns for optimal line length.
- **Rhythm:** All spacing is based on a 4px baseline grid. Use 8px, 16px, 24px, 32px, 48px, and 64px increments.
- **Density:** Technical areas (dashboards, code blocks) should use tight 8px/12px spacing, while editorial sections (articles, landing pages) should use 64px+ margins to provide breathing room.
- **Breakpoints:** 
  - Mobile: 4 columns, 20px margins.
  - Tablet: 8 columns, 40px margins.
  - Desktop: 12 columns, 64px margins.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers** and **Bold Outlines**.

- **Flat Construction:** No blur-based shadows. Objects are separated by hair-line borders (1px) in `#E5E5E5` or `#0A0A0A`.
- **Tonal Stepping:** Use `#FFFFFF` for the base layer and `#FAFAFA` for inset containers or sidebars. 
- **Active State Depth:** Instead of a shadow, use a solid 2px or 4px offset "hard shadow" in `#0A0A0A` for interactive elements that need to pop, creating a tactile, paper-like lift.
- **Overlays:** Modals should use a solid `#0A0A0A` backdrop at 40% opacity with no blur, maintaining the crispness of the interface.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—from buttons and input fields to cards and images—must have 90-degree corners. This reinforces the technical, grid-based nature of the system. Circular elements are permitted only for specific functional icons (e.g., status pips) or user avatars, but even those should ideally be contained within square frames.

## Components

- **Buttons:** Rectangular with 1px black borders. Primary button is solid International Orange with white text. Secondary button is white with black text and border. Use JetBrains Mono for button labels.
- **Input Fields:** 1px borders on all sides. On focus, the border thickens to 2px International Orange. No rounded corners.
- **Chips/Tags:** Small JetBrains Mono text inside a light grey (`#F0F0F0`) box. Use for metadata or technical tags.
- **Cards:** Defined by a 1px `#E5E5E5` border. No shadow. The header of the card should be separated by a 1px horizontal rule.
- **Code Blocks:** Background `#0A0A0A` with `#FAFAFA` JetBrains Mono text. Line numbers are mandatory for the technical aesthetic.
- **Lists:** Unordered lists use a small square bullet (4px x 4px) in International Orange rather than a standard circle.
- **Progress Bars:** Solid International Orange fill on a `#E5E5E5` background. No animation except for the width transition.