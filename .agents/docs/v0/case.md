# v0 Prompts — Portfolio CMS Case (`005-case`)

Дата: 2026-06-09

## Как этим пользоваться (RU)

1. Открой [v0.dev](https://v0.dev).
2. Вставь **Shared context** первым в каждый запрос.
3. Сгенерируй всю страницу кейса (**Full-page prompt**) или по секциям.
4. Пришли мне результат/скриншот — я отрефакторю под токены, next-intl (EN/UK) и
   структуру. **v0-код не идёт в прод напрямую.**

> Маршруты: `/en/projects/portfolio-cms`, `/uk/projects/portfolio-cms`. Это
> детальная case-страница одного проекта — длинночитаемый технический документ,
> а не лендинг. Без приватных ссылок/корпоративного кода.

---

## Shared context (вставлять первым в КАЖДЫЙ промпт)

```text
You are designing a section of a technical project case study page. Output a single static React + Tailwind component. No data fetching, no i18n libraries, no routing — plain static English copy I will wire up later.

DESIGN LANGUAGE: "Swiss Technical Editorial". This page should read like clean engineering documentation. Strict typographic grid, sharp corners (border-radius: 0), 1px borders as the main separation device, monochrome surfaces with ONE rare accent (#ff4f00). No drop shadows for separation, no gradients, no rounded cards, no emoji, no decorative icons, no marketing hype.

EXACT PALETTE (light): background #f9f9f9, foreground #000000, surface #ffffff, surface-muted #f0f0f0, border #e5e5e5, accent #ff4f00 (rare — for the active/section marker only), muted-foreground #666666, focus ring #ff4f00.

TYPOGRAPHY: "IBM Plex Sans" for body/headings; "JetBrains Mono" for eyebrows, section numbers, labels, tags — uppercase, wide tracking. Confident headings, highly readable long-form body (line-height ~1.6, comfortable measure ~60-70ch).

CASE-PAGE LAYOUT:
- Long-form, document-like, scannable. A clear vertical reading flow of numbered sections, each with a mono eyebrow/number and a 1px top border.
- Optional left-aligned mono section index/table-of-contents at the top.
- Mobile-first; on desktop allow a sticky mono section nav or a roomy single reading column.
- Dense, honest, technical tone — no overstated claims.

ACCESSIBILITY: visible focus outlines, WCAG AA contrast, semantic HTML (real heading hierarchy, lists for bullet content).
```

---

## Full-page prompt (вся страница кейса)

```text
Design the full PORTFOLIO CMS case study page using the design language above.

Header: project title "Portfolio CMS", a mono subtitle "Bilingual Next.js portfolio · public hiring surface", and a mono tech-tag row (Next.js 16, React 19, TypeScript, Tailwind CSS 4, Payload CMS 3, Postgres).

Numbered sections in this exact order, each with a mono number + eyebrow and a 1px top border:
01 OVERVIEW
02 GOALS
03 STACK
04 WHAT IT DEMONSTRATES
05 CURRENT SCOPE / NEXT STEPS
06 ARCHITECTURE DECISIONS
07 SDD / SPEC KIT WORKFLOW

Use the per-section content below. One cohesive, document-style page. End with a small back-to-home / contact affordance.
```

---

## Section 01 — Overview

```text
Build section "01 — OVERVIEW".

- Mono number "01" + eyebrow "OVERVIEW".
- Two paragraphs:
  1. "Portfolio CMS is the public hiring surface for this repository: a bilingual portfolio built with Next.js App Router and a deliberately code-owned content layer."
  2. "The case focuses on presenting recruiter-ready proof quickly while keeping Payload available in the repo for later migrations, not as the runtime source of public content."
```

## Section 02 — Goals

```text
Build section "02 — GOALS" as a clean bullet list.

- "Ship a fast recruiter-scanning public surface that is honest about current scope."
- "Keep English and Ukrainian as equal first-class routes."
- "Use small slices so the portfolio can go live before larger product proof is polished."
```

## Section 03 — Stack

```text
Build section "03 — STACK" as a row/grid of mono tags (bordered, sharp corners, neutral background): Next.js 16, React 19, TypeScript, Tailwind CSS 4, Payload CMS 3, Postgres.

Optionally add a one-line caption: "Server-first public UI; theme state is the main client concern."
```

## Section 04 — What it demonstrates

```text
Build section "04 — WHAT IT DEMONSTRATES" as a bullet list.

- "A practical App Router structure for localized public routes."
- "Clear separation between public runtime content and future CMS ownership."
- "Spec-driven delivery with explicit scope, parity, and trust guardrails."
```

## Section 05 — Current scope / next steps

```text
Build section "05 — CURRENT SCOPE / NEXT STEPS". Honest tone — separate what's done from what's deferred.

- "The public surface includes a homepage, resume pages, and one public-safe case page."
- "LMS and Landing Version System remain coming-next cards only until stronger public proof is ready."
- "Payload stays installed for admin and future migration, but the public runtime does not depend on it yet."

Consider a two-column "Now / Next" split, but keep it simple.
```

## Section 06 — Architecture decisions

```text
Build section "06 — ARCHITECTURE DECISIONS" as a list, each item a short decision + rationale.

- "Localized content lives in typed TypeScript modules — keeps EN/UK parity reviewable and explicit."
- "Root route behavior stays simple — a fixed redirect to English instead of automatic locale detection."
- "Theme state is a lightweight client preference, while the rest of the public UI remains server-first."
```

## Section 07 — SDD / Spec Kit workflow

```text
Build section "07 — SDD / SPEC KIT WORKFLOW".

- Short intro: "This portfolio was shaped through a documentation-first flow before implementation began."
- An ordered, numbered list of steps (mono numbers):
  1. "Lock product scope, design rules, and release slices."
  2. "Define specification, plan, and tasks for each page-sized slice."
  3. "Implement in small validated slices and keep the release plan in sync after each checkpoint."

Make it feel like a process diagram in text — structured and technical.
```
