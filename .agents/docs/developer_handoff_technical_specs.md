# Developer Handoff: Maksym Zakaliuzhnyi Portfolio
**Source of Truth:** Clean Editorial Technical Design ({{DATA:SCREEN:SCREEN_19}}, {{DATA:SCREEN:SCREEN_20}})

## 1. CSS Theme Variables
Implement using a `data-theme` attribute on the `<html>` or `<body>` tag.

### Editorial Light (Default)
```css
[data-theme='light'] {
  --background: #F9F9F9;
  --foreground: #000000;
  --surface: #FFFFFF;
  --surface-muted: #F0F0F0;
  --border: #E5E5E5;
  --accent: #FF4F00;
  --accent-foreground: #FFFFFF;
  --muted: #F3F3F3;
  --muted-foreground: #666666;
  --ring: #FF4F00;
}
```

### Graphite Dark
```css
[data-theme='dark'] {
  --background: #0A0A0A;
  --foreground: #FAFAFA;
  --surface: #141414;
  --surface-muted: #1F1F1F;
  --border: #262626;
  --accent: #FF4F00;
  --accent-foreground: #FFFFFF;
  --muted: #1A1A1A;
  --muted-foreground: #A0A0A0;
  --ring: #FF4F00;
}
```

### Warm Neutral
```css
[data-theme='warm'] {
  --background: #F4F1EA;
  --foreground: #1A1A1A;
  --surface: #FAF8F4;
  --surface-muted: #EFEBE0;
  --border: #DED9D1;
  --accent: #FF4F00;
  --accent-foreground: #FFFFFF;
  --muted: #EAE5D8;
  --muted-foreground: #5C5C5C;
  --ring: #FF4F00;
}
```

### High Contrast
```css
[data-theme='contrast'] {
  --background: #FFFFFF;
  --foreground: #000000;
  --surface: #FFFFFF;
  --surface-muted: #FFFFFF;
  --border: #000000;
  --accent: #FF4F00;
  --accent-foreground: #FFFFFF;
  --muted: #000000;
  --muted-foreground: #000000;
  --ring: #000000;
}
```

---

## 2. Tailwind Design Tokens

### Typography
- **Font Families:**
  - `font-sans`: 'Inter', sans-serif
  - `font-mono`: 'JetBrains Mono', monospace
- **Font Sizes:**
  - `text-xs`: 0.75rem (12px) - Mono labels
  - `text-sm`: 0.875rem (14px) - Small body/metadata
  - `text-base`: 1rem (16px) - Standard body
  - `text-lg`: 1.125rem (18px) - Large body/intro
  - `text-xl`: 1.25rem (20px) - Small headings
  - `text-2xl`: 1.5rem (24px) - Section subtitles / Card titles
  - `text-3xl`: 1.875rem (30px)
  - `text-4xl`: 2.25rem (36px)
  - `text-5xl`: 3rem (48px) - Section titles
  - `text-6xl`: 3.75rem (60px)
  - `text-7xl`: 4.5rem (72px) - Hero display
- **Line Heights:**
  - `tight`: 1.1 (Hero)
  - `snug`: 1.25 (Headings)
  - `normal`: 1.5 (Body)
  - `relaxed`: 1.625 (Article/Resume)
- **Font Weights:**
  - `regular`: 400
  - `medium`: 500
  - `semibold`: 600
  - `bold`: 700
  - `extrabold`: 800

### Layout & Containers
- **Max-Widths:**
  - `max-w-7xl`: 1280px (Main container)
  - `max-w-[1440px]`: 1440px (2xl wide)
- **Grid:**
  - 12-column symmetrical grid on desktop (`lg:` and up).
  - Gaps: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px), `gap-12` (48px).
- **Spacing Scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64, 80, 120, 160).
- **Borders:**
  - Width: `border`, `border-2`
  - Radius: `rounded-none` (0px) - Sharp architectural corners are critical to the DNA.

---

## 3. Component Specifications

### Header & Navigation
- **Layout:** Sticky, top-0, w-full, z-50.
- **Background:** `var(--background)` with `backdrop-blur-md` and opacity (80%).
- **Border:** `border-b border-[var(--border)]`.
- **Padding:** `py-4 px-6 md:px-12`.
- **Nav Links:** `text-xs font-mono uppercase tracking-widest text-[var(--muted-foreground)]`.
- **Active State:** `text-[var(--foreground)] border-b border-[var(--accent)]`.
- **Mobile Menu:** Full-screen overlay, `fixed inset-0`, vertical list, text-2xl links.

### Buttons
- **Primary:**
  - Layout: Inline-flex, center.
  - Padding: `py-3 px-8`.
  - Style: `bg-[var(--accent)] text-[var(--accent-foreground)] rounded-none font-mono text-xs uppercase font-bold`.
  - Hover: `opacity-90 -translate-y-0.5 transition-all`.
- **Secondary:**
  - Style: `border border-[var(--foreground)] text-[var(--foreground)] bg-transparent`.
  - Hover: `bg-[var(--foreground)] text-[var(--background)]`.

### Cards (Project & Commercial)
- **Border:** `border border-[var(--border)]`.
- **Radius:** `rounded-none`.
- **Gap:** `gap-4` between image and text.
- **Image Ratio:** `aspect-video` (16:9).
- **Hover:** `border-[var(--accent)] transition-colors duration-300`.
- **Metadata:** `font-mono text-[10px] uppercase text-[var(--muted-foreground)]`.

### Experience Timeline
- **Structure:** Vertical line `w-px bg-[var(--border)]`.
- **Indicators:** `w-2 h-2 rounded-full bg-[var(--accent)]`.
- **Grid:** 2-column on desktop (Date/Company | Role/Description).

### Skill Tags
- **Style:** `bg-[var(--muted)] border border-[var(--border)] px-3 py-1 font-mono text-[11px]`.

---

## 4. Section Layout Specs

### Hero
- **Max-width:** `max-w-7xl`.
- **Vertical Padding:** `pt-24 pb-16 md:pt-40 md:pb-32`.
- **Heading:** `text-4xl md:text-7xl font-extrabold tracking-tighter leading-tight`.
- **Metric Grid:** 3-column on desktop, vertical on mobile. `border-l border-[var(--border)] pl-6`.

### Commercial Work
- **Layout:** Grid, `cols-1 md:cols-2`.
- **Gap:** `gap-8`.
- **Heading:** `text-3xl font-bold uppercase mb-12`.

### Featured Projects
- **Layout:** Alternating horizontal cards (Large image left/right).
- **Grid:** `cols-1 lg:cols-12`. Image spans 7 cols, text spans 5 cols.

### Resume Page (Refined)
- **Container:** `max-w-4xl mx-auto`.
- **Vertical Padding:** `py-16 md:py-24`.
- **Layout:** Split `cols-1 md:grid-cols-[1fr_2fr]`.
- **Typography:** Increased density, `text-sm` body, `text-xs` mono metadata.

---

## 5. Accessibility Notes
- **Contrast:** High Contrast theme (Black/White) targets WCAG AAA (7:1+). Default theme targets WCAG AA (4.5:1+).
- **Focus:** `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`.
- **Reduced Motion:** Wrap all Framer Motion / CSS transitions in `@media (prefers-reduced-motion: no-preference)`.
- **Persistence:** Use `localStorage` to persist theme choice across sessions.