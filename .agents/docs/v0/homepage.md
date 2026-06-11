# v0 Prompts — Homepage (`003-homepage`)

Дата: 2026-06-09

## Как этим пользоваться (RU)

1. Открой [v0.dev](https://v0.dev).
2. Скопируй **«Shared context»** (ниже) — это общий префикс. Его нужно вставлять
   **в начало каждого** запроса к v0, чтобы стиль, палитра и шрифты совпадали.
3. Дальше выбери режим:
   - **Вся страница сразу** — вставь Shared context + блок **«Full-page prompt»**.
   - **По секциям** — вставь Shared context + промпт нужной секции. Так удобнее
     сравнивать варианты и выбирать лучший.
4. v0 даст React + Tailwind. **Этот код не идёт в прод напрямую** — пришли мне
   результат (или скриншот), я отрефакторю его под наши токены, i18n (next-intl)
   и a11y, и только потом заменю текущую вёрстку.
5. Хочешь сравнить варианты — добавь в конце промпта: `Give me 2 distinct layout
variations.`

> Текущая homepage уже собрана по этому же дизайн-контракту (без v0). Эти промпты
> нужны, чтобы посмотреть альтернативные дизайн-идеи и выбрать лучшую.

---

## Shared context (вставлять первым в КАЖДЫЙ промпт)

```text
You are designing a section of a hiring-focused developer portfolio. Output a single static React + Tailwind component. No data fetching, no i18n libraries, no routing — plain static English copy I will wire up later.

DESIGN LANGUAGE: "Swiss Technical Editorial". It must read like an engineer's reference document, not a marketing landing page. Strict typographic grid, decisive hierarchy, sharp corners (border-radius: 0 everywhere), 1px borders as the main separation device, monochrome surfaces with ONE rare accent. No drop shadows for separation, no gradients, no blobs, no glassmorphism, no rounded cards, no emoji, no stock photos, no heavy animation.

EXACT COLOR PALETTE (light theme — use these hex values, do NOT invent your own):
- background #f9f9f9, foreground #000000
- surface #ffffff, surface-muted #f0f0f0
- border #e5e5e5
- accent #ff4f00 (ONLY for primary action, active state, one high-signal mark — keep it rare), accent text on accent #ffffff
- muted #f3f3f3, muted-foreground #666666
- focus ring #ff4f00

TYPOGRAPHY:
- Sans: "IBM Plex Sans" for display + body.
- Mono: "JetBrains Mono" for eyebrows, labels, metadata, dates, tags, badges — uppercase with wide letter-spacing (tracking ~0.2em).
- Display headings: large, tight, confident (line-height ~1.05, weight 700-800). Body stays readable (line-height 1.5-1.6).

LAYOUT:
- Mobile-first (base ~375px), scale up with Tailwind breakpoints (sm/md/lg/xl).
- 12-col feel on desktop, generous structure, content max-width ~1200-1440px, desktop side padding ~64px, mobile ~20px.
- Sections separated by 1px top borders, not cards-in-cards.

ACCESSIBILITY: visible focus-visible outlines, WCAG AA contrast, respect prefers-reduced-motion, semantic HTML.

The whole portfolio supports 4 themes (light/dark/warm/contrast) via CSS variables, so build with semantic intent (background/foreground/border/accent), not hardcoded one-off colors where avoidable.
```

---

## Full-page prompt (вся homepage)

```text
Design the full homepage for this portfolio using the design language above.

Person: Maksym Zakaliuzhnyi — Middle Frontend Developer (React, Next.js, CMS-driven websites), remote from Sumy, Ukraine.

Section order (top to bottom), each separated by a 1px top border:
1. HERO
2. PROOF METRICS
3. CORE SKILLS / STACK
4. SELECTED PROJECTS
5. COMMERCIAL LANDING PAGES
6. CONTACT

Use the per-section content I provide below. Keep one consistent grid and rhythm across all sections. Mobile-first. Output one cohesive page component.
```

(Контент секций — в промптах ниже; можно вставить их все следом за этим блоком.)

---

## Section 1 — Hero

```text
Build the HERO section.

- Mono uppercase eyebrow with a small solid accent square before it: "OPEN TO REMOTE FRONTEND ROLES".
- Large display headline (text-balance): "Middle Frontend Developer with React, Next.js, and CMS-driven websites."
- Supporting paragraph (max ~5-6 col width): "I build and support production landing pages, bilingual content surfaces, and CMS-connected frontend experiences with a practical delivery mindset."
- A short availability line in muted-foreground: "Open to remote product, marketing, and CMS-driven frontend roles from Sumy, Ukraine."
- Two equal-weight CTAs side by side: primary "View resume" (accent background, mono uppercase label, sharp corners) and secondary "Get in touch" (transparent, 1px border, sharp corners). On mobile they stack full-width.

No photo. Keep the focus on positioning, not decoration.
```

## Section 2 — Proof metrics

```text
Build the PROOF METRICS strip on a surface-muted background, divided by 1px borders into 3 equal cells (stacked on mobile, 3-up on desktop).

Each cell: a large value and a mono-label description.
1. "4+ years" — "Commercial frontend delivery"
2. "300+ pages" — "Landing pages shipped or supported"
3. "Next.js / CMS" — "Production support and content-managed websites"

Dense, factual, no icons. The numbers are the signal.
```

## Section 3 — Core skills / stack

```text
Build the CORE SKILLS section.

- Mono uppercase eyebrow: "CORE STACK".
- Section heading: "The tools I reach for in production."
- Short intro: "A focused stack for content-driven, conversion-oriented frontend work."
- A flex-wrap row of bordered mono tags (sharp corners, neutral background so the accent stays rare): TypeScript, React, Next.js, Tailwind CSS, Payload CMS, Responsive UI, A/B testing, Production support.

Compact, scannable, no skill bars or star ratings.
```

## Section 4 — Selected projects

```text
Build the SELECTED PROJECTS section as a grid of 3 cards (1 col mobile, 3 col desktop), separated by 1px borders (gap-px over a border).

- Eyebrow: "SELECTED PROJECTS". Heading: "What I am building, stated honestly." Intro: "One implemented case and two openly marked as coming next — no overstated proof."

Card 1 (navigable):
- Title "Portfolio CMS"
- A mono status badge in ACCENT: "IMPLEMENTED NOW"
- Summary: "This portfolio as a bilingual Next.js 16 public surface with Payload kept out of the runtime content path."
- Proof line: "Demonstrates localization, clean content ownership, and structured public proof."
- An "open" affordance (e.g. an up-right arrow) showing it links to a case page.

Card 2 (NOT navigable, visually quieter / disabled):
- Title "LMS", neutral mono badge "COMING NEXT"
- Summary: "Planned as a future cleaned-up product case once public-safe materials are ready."
- Proof: "Reserved for deeper auth, data-flow, and product-system proof in a later slice."

Card 3 (NOT navigable, visually quieter / disabled):
- Title "Landing Version System", neutral mono badge "COMING NEXT"
- Summary: "Deferred until a sanitized public demo can explain versioned landing workflows honestly."
- Proof: "Stays out of scope to avoid implying shipped proof before the public demo exists."

The two "coming next" cards must clearly read as not-yet-clickable (no hover lift, muted tone), while only Portfolio CMS reads as an active link.
```

## Section 5 — Commercial landing pages

```text
Build the COMMERCIAL LANDING PAGES proof section.

- Eyebrow: "COMMERCIAL PROOF". Heading: "Commercial landing pages." Intro: "A focused sample of public work that shows implementation, responsive delivery, support, and practical iteration at production speed."
- A grid of 6 cards (1 col mobile, 2 col desktop), separated by 1px borders. Each card is an outbound link (opens in a new tab).

Each card shows: title, a mono type label, a short summary, and a mono role line. Use these 6:
1. "Fast Reading" — type "Course landing page" — "Built and maintained a conversion-focused landing flow with clear CTA hierarchy and fast reading paths." — role "Frontend implementation · responsive layout · production support"
2. "NMT 2026" — "Webinar funnel" — "Supported a live education funnel with iteration-ready sections and content updates." — "Frontend implementation · production updates · analytics-aware changes"
3. "Painting: Three Courses" — "Course landing page" — "Delivered a structured page focused on clear packages, proof blocks, and mobile readability." — "Responsive implementation · layout refinement · production support"
4. "AI Creator" — "Education landing page" — "Shipped a modern course landing with implementation-focused collaboration around promotion flows." — "Frontend implementation · content updates · launch support"
5. "School Webinar" — "Webinar signup page" — "Supported a webinar page with conversion-oriented frontend updates and practical launch fixes." — "Frontend implementation · responsive fixes · production maintenance"
6. "Interior Design" — "Course landing page" — "Implemented and maintained a polished landing page with dense content blocks and clean scanning rhythm." — "Frontend implementation · responsive layout · production support"

Keep brand names understated; the value is the implementation + support story, with the live link as proof.
```

## Section 6 — Contact

```text
Build the CONTACT section (this is the in-page anchor target for "Get in touch").

- Eyebrow: "CONTACT". Heading: "Get in touch." Intro: "Open to remote Middle Frontend / Next.js roles in Ukrainian and European companies. Fastest path: email or GitHub."
- A small definition-list block: Location = "Sumy, Ukraine"; Availability = "Remote only".
- A grid of contact channels as links (external ones open in a new tab):
  - Email — zaksumy1989@gmail.com
  - Telegram — @MaksymZak
  - LinkedIn — mzakaliuzhnyi
  - GitHub — MaksymZak

Mono labels for channel names, clear large tap targets, sharp corners, accent reserved for hover/active only.
```
