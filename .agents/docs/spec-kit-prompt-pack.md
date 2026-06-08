# Spec Kit Prompt Pack

Дата: 2026-06-06

## Purpose

This file is the ready-to-run prompt package for the first real Spec Kit cycle in this repository.

It exists to do three things:

- turn the approved planning docs into executable Spec Kit prompts;
- keep `portfolio-mvp` locked to `MVP1` only;
- reduce the chance of reopening already-approved scope decisions during specification.

Use this file together with:

- `.specify/memory/constitution.md`
- `README.md`
- `DESIGN.md`
- `.agents/docs/project-context.md`
- `.agents/docs/release-plan.md`

If there is a conflict, use this priority:

1. `.specify/memory/constitution.md`
2. `.agents/docs/release-plan.md`
3. `.agents/docs/project-context.md`
4. `DESIGN.md`
5. this file

## Working Rules

- The only active first implementation spec is `portfolio-mvp`.
- `portfolio-mvp` must describe `MVP1` only.
- `MVP2` and `MVP3` stay visible as deferred context, not active implementation scope.
- Already locked decisions should not be reopened unless a real contradiction is found.
- No private repository links, corporate code, or internal architecture details may appear in public-facing content.
- English and Ukrainian are full first-class versions for `MVP1`.
- The portfolio is a hiring tool, not a creative showpiece.

## Bootstrap Notes

Spec Kit is not initialized in this repository yet.

Recommended bootstrap options:

### Option A: `uvx`

If `uv` is available:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init . --script sh
```

Use `--script sh` if you stay in the current Bash terminal.

### Option B: `pipx`

If `uv` is still unavailable:

```bash
pipx install git+https://github.com/github/spec-kit.git
specify init . --script sh
```

Keep the setup minimal at the start:

- no extra presets unless needed later;
- no extra extensions unless they solve a concrete problem;
- one main spec first: `portfolio-mvp`.

## Suggested Execution Order

Recommended sequence for this repository:

1. initialize Spec Kit;
2. run `/speckit.constitution`;
3. run `/speckit.specify`;
4. run `/speckit.clarify`;
5. run `/speckit.checklist`;
6. run `/speckit.plan`;
7. run `/speckit.tasks`;
8. run `/speckit.analyze`;
9. run `/speckit.implement`.

## Prompt Package

### `/speckit.constitution`

```text
/speckit.constitution This project is a hiring-focused portfolio for a remote Middle Frontend role. Ship a usable MVP quickly, keep scope disciplined, and optimize for recruiter scan speed. MVP content must be honest, compact, and public-safe: never expose private repositories, corporate code, or internal client architecture. English and Ukrainian are equal first-class languages in MVP. Public content should clearly separate what is already built from what is coming next. The portfolio must present strong frontend delivery, CMS-driven website experience, landing-page production work, and reliable implementation habits without overstating seniority or fullstack proof. Visual decisions must follow the existing Clean Editorial Technical design contract. Prefer simple, maintainable solutions over speculative systems. Keep implementation slices small, verifiable, and explicitly tracked in release planning.
```

### `/speckit.specify`

```text
/speckit.specify Build the first public release of a hiring-focused portfolio called portfolio-mvp. The goal is to ship a clean, fast-to-scan portfolio that is strong enough to begin real job outreach for a remote Middle Frontend Developer role. The release must communicate real commercial frontend experience, production landing-page delivery, CMS-driven website work, and honest current scope.

This first release must include full English and Ukrainian public pages for the homepage, a short resume page, and one detailed case page for Portfolio CMS. The root route should send visitors into the English experience. The homepage should include an editorial hero, public proof metrics, a compact core skills or stack row, a commercial landing pages proof block, a selected projects block, a theme switcher, and a contact section. The hero must clearly state availability for remote frontend opportunities and present two equal primary actions: View resume and Get in touch. Get in touch should jump to the homepage contact section instead of opening a separate page.

The public proof signal should be based on 4 plus years of frontend work, 300 plus landing pages, and hands-on Next.js, CMS-driven, and production-support experience. The primary professional label on the first screen should be Middle Frontend Developer with React, Next.js, and CMS-driven websites. The homepage should not use a personal photo. The contact section must include email, LinkedIn, GitHub, and Telegram. The public GitHub profile may be shown, but the private portfolio repository must never be linked or referenced.

The selected projects block must contain exactly three cards in MVP1: Portfolio CMS, LMS coming next, and Landing Version System coming next. Only Portfolio CMS receives a full case page in this release. That case page must clearly cover Overview, Goals, Stack, What it demonstrates, Current scope and next steps, Architecture decisions, and the SDD or Spec Kit workflow used to shape the work. LMS and Landing Version System should be presented honestly as coming next items rather than pretending they are already complete.

Commercial Landing Pages should stay an aggregated proof block on the homepage in MVP1 instead of becoming a separate projects index. That proof block should include six selected public examples, using a mixed presentation with several stronger visual previews and several text-led outbound links. Inside the portfolio itself, brand names should not be over-emphasized, but real public examples may still be accessible through the outbound links. The role description for this proof block should stay honest and implementation-focused.

The resume must exist in English and Ukrainian and stay short. It should include only Header, Positioning summary, Core skills, Experience summary, Selected projects, and Contacts. The PDF flow for MVP1 should be simple and practical: a print-friendly resume page that users can save as PDF from the browser. It does not need a polished print automation system.

This first release must include a theme selector with four curated themes, keep English and Ukrainian in full parity for all required pages and major content blocks, and communicate current scope honestly wherever appropriate. It must include basic SEO and metadata. It must not include a separate contact page, a separate projects index page, Russian localization, automatic locale detection, a full LMS case study, a full Landing Version System demo, polished PDF automation, or a public-site dependency on CMS-managed runtime content before the structure is stable.
```

### `/speckit.clarify`

```text
/speckit.clarify Use the existing planning docs as approved source material and avoid reopening already locked decisions unless you find a real contradiction. Focus only on ambiguities that would block implementation quality. Prioritize these checks: measurable EN and UK parity requirements, the exact expected behavior of the theme selector and theme persistence, print-friendly resume behavior for browser PDF export, fallback behavior for external example links or missing previews, and acceptance criteria for honest coming-next project cards. If those points are already clear enough for implementation, keep the clarify phase minimal.
```

### `/speckit.checklist`

```text
/speckit.checklist
```

### `/speckit.plan`

```text
/speckit.plan Implement portfolio-mvp in the existing Next.js 16 App Router repository with React 19, Tailwind CSS 4, and the current public frontend under src/app/(frontend). Use the existing DESIGN.md token contract as the styling source of truth and load typography with next/font. Keep runtime public content in a typed content layer in code for MVP1; Payload stays installed in the repository but must not become the runtime content dependency for the public site yet. Build only the required EN and UK routes plus a root redirect into English. Use server-rendered components by default and keep client components limited to UI that genuinely needs browser state, such as theme switching and print-oriented actions. Persist the selected theme locally. Implement the four curated themes through root data-theme state and CSS variables in the frontend styles layer. Keep the structure simple, maintainable, and easy to validate.

Model the implementation as a small number of clear slices: typed content definitions, global layout and theme foundation, localized route structure, homepage sections, resume pages, Portfolio CMS case pages, metadata and SEO, and focused tests. The homepage must support fast recruiter scanning, honest proof communication, and strong accessibility. Resume pages must remain compact and print-friendly. All work must stay inside MVP1 and must not introduce LMS or Landing Version System as full cases. Update the release plan after each completed implementation slice.
```

### `/speckit.tasks`

```text
/speckit.tasks Break the plan into small, verifiable implementation slices that fit the existing repository structure. Favor ordered tasks that produce working checkpoints instead of large parallel buckets. Include validation steps for each slice when possible, and ensure the tasks explicitly keep MVP2 and MVP3 work out of active implementation. The task list should end with updating the release plan and validating the touched slice.
```

### `/speckit.analyze`

```text
/speckit.analyze Check the consistency of the constitution, portfolio-mvp specification, plan, and tasks against the existing repository guardrails. Verify that the active scope is only MVP1, that English and Ukrainian parity is preserved, that the public experience stays honest about current scope, that no task introduces runtime Payload dependency too early, and that the design contract in DESIGN.md is not contradicted. Flag anything that accidentally pulls MVP2 or MVP3 forward.
```

### `/speckit.implement`

```text
/speckit.implement Implement portfolio-mvp strictly from the approved constitution, specification, plan, and tasks. Work in small slices with immediate validation after each substantive edit set. Start from the content foundation and route structure, then build the global layout and theme system, then the homepage, resume pages, Portfolio CMS case pages, and finally metadata and focused tests. Keep the public site hiring-focused, fast to scan, accessible, and honest about current scope. Do not add out-of-scope case studies, extra pages, public private-repo references, or premature runtime Payload dependencies. After each completed slice, update the release plan so implemented, in-progress, planned, and deferred status stay explicit.
```

## Recommended First Implementation Slices

If the planning artifacts come out clean, the first practical build order should be:

1. typed content layer for EN and UK;
2. root redirect and localized route structure;
3. global layout, fonts, theme tokens, and theme switcher;
4. homepage sections and contact CTA flow;
5. resume pages and print-friendly PDF path;
6. `Portfolio CMS` case pages;
7. metadata and focused tests.

## Done Criteria For This Prompt Pack

This document is complete when it lets the next Spec Kit cycle start without reopening product strategy.

That means:

- the `constitution` prompt defines stable project principles;
- the `specify` prompt describes `MVP1` only;
- the later prompts protect scope, parity, and honesty;
- the execution order is obvious;
- the repository docs point to this file as the next planning artifact.
