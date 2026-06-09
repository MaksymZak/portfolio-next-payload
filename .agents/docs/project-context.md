# Project Context

Дата: 2026-06-06

## Why This Project Exists

This portfolio is a hiring tool for a remote Middle Frontend / Next.js role.

Its job is to quickly communicate:

- real commercial frontend experience;
- strong delivery on production landing pages;
- confidence with CMS-driven websites;
- honest scope and positioning;
- modern Next.js, Payload, and AI-assisted workflow thinking.

This project is not meant to be a creative showpiece, a generic resume page, or a bloated experimental app.

## Positioning

Primary positioning:

> Middle Frontend Developer with React, Next.js, TypeScript, CMS-driven websites, landing systems, performance optimization, and production support experience.

Secondary positioning:

> Frontend developer with backend integration experience and growing fullstack skills.

Important constraint: do not present as a fully proven fullstack engineer yet.

## Market And Delivery Constraints

- Target market: remote only.
- Geography focus: Ukraine and Europe.
- Russian market is out of scope.
- English level is still limited, so the portfolio should support fast recruiter scanning and clear structure.
- Job search should start early; the portfolio must reach a usable MVP quickly.

## Product Scope For MVP

### Public experience

- `/en`
- `/uk`
- `/en/resume`
- `/uk/resume`
- `/en/projects/portfolio-cms`
- `/uk/projects/portfolio-cms`

### Content model direction

For MVP1, code should manage the public runtime content for:

- projects;
- commercial landing cases;
- technologies and skills;
- experience items;
- SEO and media;
- localized content fields for English and Ukrainian.

Payload should remain installed in the repository for admin work and later migration, but it must not become the runtime content source for the public site until MVP2+ after the structure is validated.

Code should keep ownership of:

- layout;
- navigation;
- route labels;
- footer labels;
- base UI copy and fallbacks;
- theme behavior.

### Resume / PDF

- Resume stays short and curated.
- PDF should remain one page.
- Do not auto-generate a long resume from full CMS content.
- Live site can be richer; PDF must stay compact and controlled.

## Content Priorities

### First-class portfolio proof

1. Commercial Landing Pages
2. Portfolio CMS itself

### Later or secondary proof

1. LMS cleanup and public presentation
2. Landing Version System sanitized demo

### Commercial Landing Pages rules

- show exactly 6 best public links in MVP1, not 100+;
- describe role honestly;
- emphasize implementation, support, optimization, responsive work, CMS/content updates, and fixes.

## Visual Direction

Chosen direction: `Clean Editorial Technical`.

Required outcome:

- premium editorial feel;
- strong technical clarity;
- restrained motion;
- reliable production impression;
- no creative noise that fights readability.

The active visual source of truth is [../../DESIGN.md](../../DESIGN.md).

## Technical Direction

- Next.js 16
- React 19
- Tailwind CSS 4
- Payload CMS 3
- Postgres
- Vercel deployment target

This repo is already the implementation base; the current task is to finish the project contract before real feature work.

## SDD / Spec Kit Direction

Use GitHub Spec Kit core workflow.

Sequence for the first real implementation cycle:

1. `constitution`
2. `specify`
3. `clarify`
4. `plan`
5. `tasks`
6. `analyze`
7. `implement`

Working rule:

- start with one main specification: `portfolio-mvp`;
- do not add many presets or extensions at the beginning;
- do not turn the process into bureaucracy;
- use the workflow to lock scope, acceptance criteria, and implementation order.

## What Must Not Happen In MVP

- no Russian version;
- no public portfolio repo;
- no corporate code or internal architecture exposure;
- no attempt to sell as senior or fullstack without proof;
- no 100-link case dump;
- no long auto-generated PDF;
- no whole site pushed into CMS;
- no long design exploration loop before shipping a usable version.

## Immediate Working Priorities

1. Keep documentation small, clear, and canonical.
2. Lock the visual system and token contract.
3. Keep release scope explicit across `MVP1`, `MVP2`, and `MVP3`.
4. Initialize Spec Kit.
5. Write `portfolio-mvp` specification.
6. Split implementation into small verifiable slices.

## Reference Material

These files are useful references, but not active source-of-truth documents:

- `reference.md` (consolidated CV facts, contacts, examples, scope, workflows)
- `v0/` (per-page v0.dev design prompts)
- `design-image/`
