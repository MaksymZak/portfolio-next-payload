# v0 Prompts — Resume (`004-resume`)

Дата: 2026-06-09

## Как этим пользоваться (RU)

1. Открой [v0.dev](https://v0.dev).
2. Вставь **Shared context** (см. ниже — он тот же, что для homepage, но с
   resume-уточнениями) первым в каждый запрос.
3. Сгенерируй всю страницу резюме (**Full-page prompt**) или по секциям.
4. Пришли мне результат/скриншот — я отрефакторю под токены, next-intl (EN/UK) и
   print-стили. **v0-код не идёт в прод напрямую.**
5. Резюме должно влезать в **одну страницу A4 при печати** — об этом сказано в
   промпте, но финальные print-стили доведу я.

> Маршруты: `/en/resume`, `/uk/resume`. Это компактная страница, плотнее
> homepage, оптимизированная под печать/экспорт в PDF из браузера.

---

## Shared context (вставлять первым в КАЖДЫЙ промпт)

```text
You are designing a section of a hiring-focused developer resume page. Output a single static React + Tailwind component. No data fetching, no i18n libraries, no routing — plain static English copy I will wire up later.

DESIGN LANGUAGE: "Swiss Technical Editorial". Reads like an engineer's reference document. Strict typographic grid, sharp corners (border-radius: 0), 1px borders as the main separation device, monochrome surfaces with ONE rare accent (#ff4f00). No drop shadows for separation, no gradients, no rounded cards, no emoji, no icons-as-decoration.

EXACT PALETTE (light): background #f9f9f9, foreground #000000, surface #ffffff, surface-muted #f0f0f0, border #e5e5e5, accent #ff4f00 (rare), muted-foreground #666666, focus ring #ff4f00.

TYPOGRAPHY: "IBM Plex Sans" for body/headings; "JetBrains Mono" for eyebrows/labels/dates/tags — uppercase, wide tracking. Tight confident headings, readable body.

RESUME-SPECIFIC LAYOUT:
- This is DENSER than the homepage. Compact vertical rhythm, single readable column for prose, two-column where it helps scanning (e.g. experience meta vs. bullets).
- It MUST fit a single A4 page when printed: avoid oversized hero whitespace, keep section spacing tight, no giant display type.
- Mobile-first, but optimize the print/desktop density too.
- Include a top action bar with a "Print / Save as PDF" button (mono uppercase, accent) that is visually present on screen but understood to be hidden in print.

ACCESSIBILITY: visible focus outlines, WCAG AA contrast, semantic HTML (use a real heading hierarchy, <dl> for contact pairs, <ul> for bullets).
```

---

## Full-page prompt (вся страница резюме)

```text
Design the full RESUME page using the design language above. Keep it compact enough to print to one A4 page.

Section order:
1. HEADER (name, role, summary, location, contacts inline) + a "Print / Save as PDF" action.
2. POSITIONING SUMMARY (3 bullet lines).
3. CORE SKILLS (mono tag row).
4. EXPERIENCE SUMMARY (2 roles, each with company/role/period meta + bullets).
5. SELECTED PROJECTS (compact list).
6. EDUCATION & LANGUAGES (compact two-up).
7. CONTACTS footer.

Use the per-section content below. One cohesive, print-friendly component.
```

---

## Section 1 — Header

```text
Build the RESUME HEADER.

- Name (display): "Maksym Zakaliuzhnyi".
- Role (mono uppercase, accent): "MIDDLE FRONTEND / NEXT.JS DEVELOPER".
- One-line summary: "Production-focused frontend developer with strong landing-page delivery, CMS-driven website work, and practical backend-integration experience."
- Location line (muted): "Sumy, Ukraine · Remote only".
- Inline contact row (mono): zaksumy1989@gmail.com · +380 99 432 20 85 · t.me/MaksymZak · github.com/MaksymZak · linkedin.com/in/mzakaliuzhnyi
- A top-right "PRINT / SAVE AS PDF" button (accent, mono uppercase, sharp corners). Mark it as screen-only (hidden when printing).

Compact, no photo required.
```

## Section 2 — Positioning summary

```text
Build the POSITIONING SUMMARY block.

- Mono uppercase eyebrow: "POSITIONING".
- Three concise bullet lines:
  1. "4+ years of commercial frontend work across landing systems, product-facing UI, and content-managed websites."
  2. "Strongest proof: React, Next.js, TypeScript, Tailwind CSS, Payload CMS, responsive implementation, and production support."
  3. "Targeting remote Middle Frontend roles with honest scope, fast recruiter scanning, and public-safe proof."

Tight spacing, no decorative bullets — use a clean structured list.
```

## Section 3 — Core skills

```text
Build the CORE SKILLS row.

- Mono uppercase eyebrow: "CORE SKILLS".
- A flex-wrap row of bordered mono tags (sharp corners, neutral background): HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Payload CMS, REST APIs, PostgreSQL.

Dense, scannable, no skill bars.
```

## Section 4 — Experience summary

```text
Build the EXPERIENCE SUMMARY section. Two roles. Each role uses a two-column layout on desktop (left: mono meta = company, role, period; right: bullet list), stacking on mobile.

Role 1:
- Company "GoITeens Company", Role "Frontend Developer", Period "June 2024 – Present".
- Bullets:
  - "Developed and supported production landing pages with Next.js, Payload CMS, Astro, and modern frontend tooling."
  - "Implemented A/B testing logic, analytics-aware updates, and conversion-oriented frontend improvements."
  - "Supported scalable frontend delivery and contributed through review and guidance."

Role 2:
- Company "SoftRyzen Company", Role "Frontend Developer", Period "July 2022 – April 2024".
- Bullets:
  - "Delivered a high volume of commercial landing pages and frontend interfaces with Gulp, React, JavaScript, and CSS."
  - "Collaborated with designers and backend developers to ship responsive, production-ready UI."
  - "Improved layout quality, maintainability, and frontend performance across client work."

Separate the two roles with a 1px border. Mono for company/period, sans for bullets.
```

## Section 5 — Selected projects

```text
Build a compact SELECTED PROJECTS list (not big cards — resume density).

- Mono uppercase eyebrow: "SELECTED PROJECTS".
- Three rows, each: title + one-line description.
  1. "Portfolio CMS" — "Bilingual Next.js 16 portfolio with a code-owned content layer; demonstrates localization and clean content ownership."
  2. "Commercial Landing Pages" — "300+ production landing pages delivered or supported: responsive implementation, performance, A/B testing, content updates."
  3. "LMS / Landing Version System" — "Coming-next product cases, kept honest until public-safe materials are ready."

Tight rows divided by 1px borders.
```

## Section 6 — Education & languages

```text
Build a compact EDUCATION & LANGUAGES block, two columns on desktop, stacked on mobile.

EDUCATION (mono eyebrow "EDUCATION"):
- "Full Stack Web Development Bootcamp — 2021".

LANGUAGES (mono eyebrow "LANGUAGES"):
- "Ukrainian — Native".
- "English — Pre-intermediate (reading/technical: working level)".

Minimal, factual.
```

## Section 7 — Contacts footer

```text
Build the CONTACTS footer for the resume.

- Mono uppercase eyebrow: "CONTACTS".
- A <dl> of pairs: Email zaksumy1989@gmail.com · Phone +380 99 432 20 85 · Telegram t.me/MaksymZak · GitHub github.com/MaksymZak · LinkedIn linkedin.com/in/mzakaliuzhnyi · Portfolio (live site).
- Availability line (mono): "REMOTE ONLY · OPEN TO FRONTEND / NEXT.JS ROLES".

Mono labels, clean alignment, sharp corners.
```
