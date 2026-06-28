---
archived: 2026-06-28
---

# Brutalist Motion Pixel-Parity with Reference Prototype

**Branch:** (not created — planning phase)
**Created:** 2026-06-28
**Status:** Steps 1–2 complete — **start implementation at Step 3**
**Reference files:** `.cursor/docs/reference/app/page.tsx`, `cv/page.tsx`, `archive/page.tsx`

## Settings (locked for final plan)

| Setting | Value                                                                                        |
| ------- | -------------------------------------------------------------------------------------------- |
| Testing | No automated tests — `bun run lint`, `bun run build`, manual side-by-side QA                 |
| Logging | Verbose (implementation phase)                                                               |
| Docs    | Yes — final task updates `button.md`, `design_system_new.md`, `ARCHITECTURE.md`, `AGENTS.md` |

## Roadmap Linkage

Milestone: `none` — skipped during planning gate (link optional at implementation).

---

## Verification Pass 1 — Reference Extraction

**Method:** Grep + read of `translate`, `shadow-[`, `transition`, `duration-` across the three reference pages.
**Anchor formula (per axis):** `outerCornerShift = hoverTranslatePx + (hoverShadowPx − restShadowPx)`
**Target:** `0` = hard-shadow outer corner stays fixed while content lifts.
**Tailwind scale:** `0.5` = 2px, `1` = 4px, `[-1px]` = 1px, `[-1.5px]` = 1.5px, `[-2px]` = 2px.

### Motion Matrix

| Pattern ID | UI context                                       | Rest shadow                           | Hover translate                    | Hover shadow         | Active                                | Duration / easing                      | Padding / typography                                                 | Anchor check                        | Reference                            |
| ---------- | ------------------------------------------------ | ------------------------------------- | ---------------------------------- | -------------------- | ------------------------------------- | -------------------------------------- | -------------------------------------------------------------------- | ----------------------------------- | ------------------------------------ |
| **R01**    | Hero primary / secondary CTA                     | `4px` `--foreground`                  | `-1px` / `-1px`                    | `5px` `--foreground` | `+4px` / `+4px`, `shadow-none`        | `duration-100` `ease-out`              | `border-2`, `px-7 py-3`, `font-bold`, `text-sm` (implicit)           | **0** (−1 + (5−4))                  | `page.tsx:889–896`                   |
| **R02**    | Project card actions (accent + surface)          | `2px` `--foreground`                  | `-1px` / `-1px`                    | `3px` `--foreground` | `+2px` / `+2px`, `shadow-none`        | `duration-100` `ease-out`              | `border-2`, `px-4 py-2.5`, `text-[10px]` uppercase `tracking-widest` | **0**                               | `page.tsx:1044–1051`                 |
| **R03**    | Archive featured external link                   | `2px` `--foreground`                  | `-1px` / `-1px`                    | `3px` `--foreground` | `+2px` / `+2px`, `shadow-none`        | `duration-100` `ease-out`              | `border-2`, `px-3 py-1.5`, `text-[9px]` uppercase `tracking-widest`  | **0**                               | `page.tsx:1149`                      |
| **R04**    | “View full archive” wide CTA                     | `4px` `--foreground`                  | `-1px` / `-1px`                    | `5px` `--foreground` | `+4px` / `+4px`, `shadow-none`        | `duration-100` `ease-out`              | `border-2`, `px-6 py-3`, `text-[10px]` uppercase `tracking-widest`   | **0**                               | `page.tsx:1166`                      |
| **R05**    | Sidebar + drawer “Download CV”                   | none                                  | `-2px` / `-2px` (`-0.5`)           | `4px` `--foreground` | `+4px` / `+4px` (`+1`), `shadow-none` | `duration-150` `ease-out`              | `border-2`, `py-3`, `text-[10px]` uppercase, full width              | **+2** (−2 + 4) — shadow introduced | `page.tsx:541`, `827`                |
| **R06**    | Desktop sidebar section nav                      | none                                  | `-2px` / `-2px` (`-0.5`)           | `2px` `--foreground` | `0` / `0`, `shadow-none`              | `transition-all` (default ~150ms)      | `font-mono`, `py-2 px-3`, `text-xs`                                  | **0** (−2 + 2)                      | `page.tsx:807–810`                   |
| **R07**    | Desktop sidebar locale / theme toggle (inactive) | none                                  | `-1px` / `-1px`                    | `2px` `--border`     | `0` / `0`, `shadow-none`              | `transition-all`                       | `p-2`, `text-[9px]` mono                                             | **+1**                              | `page.tsx:708`, `719`, `751`         |
| **R08**    | Desktop sidebar locale / theme (selected)        | `2px` `--accent`                      | baked `-1.5px` / `-1.5px`          | same `2px`           | `0` / `0`, `shadow-none` on press     | `transition-all`                       | `p-2`, `text-[9px]`, `font-black`                                    | n/a (selected rest state)           | `page.tsx:707`, `718`, `750`         |
| **R09**    | Drawer locale / theme toggle (inactive)          | none                                  | `-1px` / `-1px`                    | `2px` `--foreground` | `0` / `0`, `shadow-none`              | `transition-all`                       | `p-2.5`, `text-[9px]`, `bg-background`                               | **+1**                              | `page.tsx:558`, `569`, `598`         |
| **R10**    | Drawer locale / theme (selected)                 | `2px` `--foreground`                  | baked `-1px` / `-1px`              | same `2px`           | `0` / `0`, `shadow-none`              | `transition-all`                       | `p-2.5`, `text-[9px]`                                                | n/a                                 | `page.tsx:557`, `568`, `597`         |
| **R11**    | Sticky header `[ MENU ]` trigger                 | none                                  | `-2px` / `-2px` (`-0.5`)           | `3px` `--foreground` | `+4px` (`+1`), `shadow-none`          | `transition-all`                       | `px-3 py-1.5`, `text-[10px]` uppercase                               | **+1**                              | `page.tsx:663`                       |
| **R12**    | Stack / skill plack (home)                       | none                                  | `-2px` / `-2px` (`-0.5`)           | `3px` `--foreground` | `+4px` (`+1`), `shadow-none`          | `duration-150`                         | `px-3 py-2`, `text-xs` mono                                          | **+1**                              | `page.tsx:957`                       |
| **R13**    | Project case-study card shell                    | none (selected: `6px` + `-4px` baked) | `-4px` / `-4px` (`-1`)             | `6px` `--foreground` | none                                  | `duration-200` `ease-out`              | card border, `p-5` inner                                             | **+2** on hover from rest           | `page.tsx:1001–1004`                 |
| **R14**    | Archive preview card shell (home)                | none                                  | `-4px` / `-4px` (`-1`)             | `6px` `--foreground` | none                                  | `duration-200` `ease-out`              | `p-5`, `bg-surface-muted`                                            | **+2**                              | `page.tsx:1122`                      |
| **R15**    | CV resume stack badge                            | none                                  | `-2px` / `-2px`                    | `3px` `--foreground` | none                                  | `duration-150`                         | `px-2.5 py-1.5`, `text-[9px]` uppercase                              | **+1**                              | `cv/page.tsx:83`                     |
| **R16**    | Drawer section nav buttons                       | none                                  | none                               | none                 | none                                  | `transition-all`                       | `py-2.5 px-3`                                                        | n/a — **no brutalist lift**         | `page.tsx:520–524`                   |
| **R17**    | CV “Back to index” text link                     | none                                  | `-4px` X only (`-translate-x-1`)   | none                 | none                                  | `transition-all`                       | `text-[10px]` bold                                                   | n/a                                 | `cv/page.tsx:15`                     |
| **R18**    | CV / contact social icon hit-area                | none                                  | `-2px` Y only (`-translate-y-0.5`) | none                 | none                                  | `transition-transform`                 | `p-2 -m-2`                                                           | n/a                                 | `cv/page.tsx:48–54`, `page.tsx:1273` |
| **R19**    | Archive page controls (back, filters, search)    | none                                  | none                               | none                 | none                                  | `transition-colors` / `transition-all` | mixed compact                                                        | n/a — color/border only             | `archive/page.tsx:148–221`           |
| **R20**    | Contact email copy CTA                           | none                                  | none                               | none                 | none                                  | `transition-colors`                    | `px-6 py-3`, `text-[10px]`                                           | n/a                                 | `page.tsx:1254`                      |
| **R21**    | Toast notification (fixed)                       | static `4px` rgba                     | none                               | none                 | none                                  | framer `0.15s`                         | `px-4 py-3`, `text-xs` mono                                          | n/a                                 | `page.tsx:449`                       |
| **R22**    | Drawer dismiss chip                              | none                                  | none                               | none                 | `+4px` Y (`active:translate-y-[1px]`) | `transition-all`                       | `px-2.5 py-1`, `text-[10px]`                                         | n/a                                 | `page.tsx:491`                       |

### Pass 1 findings (hypothesis check)

| Hypothesis                                             | Verdict                           | Evidence                                                                                                                                                                                |
| ------------------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Values flattened to `-translate-x-px` (1px) everywhere | **Partially true in reference**   | Reference uses **1px, 1.5px, 2px (0.5), and 4px (1)** by context — not a single scale. See R01–R15.                                                                                     |
| One CTA lift for hero AND sidebar/drawer CV            | **False in reference**            | **R01** (hero: rest `4px`, hover `5px`, active `4px`) ≠ **R05** (CV: no rest shadow, `4px` hover shadow, `2px` hover translate, `4px` active).                                          |
| `button.md` documents drawer-CV only                   | _Deferred to Pass 2_              | —                                                                                                                                                                                       |
| Hero numbers may match; typography/sizing may not      | **Typography differs by pattern** | Hero **R01**: `px-7 py-3`; CV **R05**: `py-3` full-width `text-[10px]`; card actions **R02**: `px-4 py-2.5 text-[10px]`; compact **R03**: `px-3 py-1.5 text-[9px]`.                     |
| Hard shadow corner anchored on hover                   | **Only when rest shadow exists**  | **R01–R04** achieve anchor **0**. Patterns that introduce shadow from none (**R05, R11, R12, R13–R15**) have positive `outerCornerShift` — reference accepts “pop-in” shadow for those. |
| Sidebar vs drawer locale/theme differ                  | **Confirmed**                     | Desktop **R07/R08**: hover shadow `--border`, selected `--accent`, `p-2`. Drawer **R09/R10**: shadow `--foreground`, `p-2.5`, inactive `bg-background`.                                 |
| Drawer nav vs sidebar nav differ                       | **Confirmed**                     | Sidebar **R06** has 2px lift + shadow; drawer **R16** has no translate/shadow.                                                                                                          |

### Pattern families (for Pass 2 mapping)

```
Anchored CTA (rest shadow → grow +1px):     R01, R02, R03, R04
CV / sidebar link (no rest, 2px lift, 4px): R05
Nav item (2px lift, 2px shadow):            R06
Compact toggle (1px lift, 2px shadow):      R07, R09  (+ selected baked states R08, R10)
Menu + plack (2px lift, 3px shadow):        R11, R12, R15
Large card lift (4px lift, 6px shadow):     R13, R14
Non-brutalist / micro-motion:               R16–R22
```

---

## Verification Pass 2 — Production Gap

Mapping: approved pattern → current production file → gap.

| Pattern | Production touchpoint                                                                     | Current motion export                                              | Gap                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| R01     | `hero/hero-ctas.tsx` → `Button` primary/secondary + `px-7 py-3`                           | `brutalistCtaLift` via `button.tsx`                                | Scale updated in contract; verify typography (`text-sm` wrapper vs `text-[10px]` on button base)       |
| R02     | `projects/project-card.tsx` → `Button` plack / case link                                  | `brutalistPlackLift` on `plack` variant                            | **Wrong pattern** — should use R02 (`compact` / `approvedMotionR02`), not plack; sizing `px-4 py-2.5`  |
| R03     | `sections/archive.tsx` featured links                                                     | ad-hoc / `LinkControl`                                             | Needs dedicated compact link variant or `approvedMotionR03` + `text-[9px] px-3 py-1.5`                 |
| R04     | `sections/archive.tsx` “view full archive”                                                | `LinkControl` secondary                                            | Should use R04 motion + `px-6 py-3 tracking-widest`                                                    |
| R05     | `sidebar.tsx`, `drawer-menu.tsx` → `ResumeDownloadLink` + `linkControlVariants secondary` | `brutalistCtaLift` (R01)                                           | **Wrong pattern** — must switch to `brutalistCvLinkLift` / R05 (no rest shadow)                        |
| R06     | `nav.tsx` `variant="sidebar"` inactive                                                    | `brutalistLiftClasses('compact')` in `brutalistNavItemClasses`     | **Wrong scale** — use `brutalistSidebarNavLift` / R06; active row in reference has baked lift — verify |
| R07/R08 | `locale-switcher.tsx`, `theme-switcher.tsx` in **sidebar**                                | `brutalistSwitcherClasses` — single path, `p-2.5`, drawer selected | **No sidebar/drawer split**; wrong padding (`p-2.5` vs `p-2`); R08 must use **draft** accent selected  |
| R09/R10 | Same switchers in **drawer**                                                              | same as above                                                      | Drawer inactive R09 + selected R10 (**draft**) not wired                                               |
| R11     | `drawer-menu.tsx` `DrawerTrigger`                                                         | `brutalistDrawerTriggerClasses` → `plack` scale                    | Contract plack updated; verify inverted colors + active press (+1px in reference, not +4px)            |
| R12     | `stack-plack.tsx`                                                                         | `brutalistPlackLift`                                               | **Wrong export** — use `approvedMotionR12` / `brutalistTileLift` (tile scale)                          |
| R13     | `card.tsx` interactive + `project-card.tsx` expanded                                      | `brutalistCardLift`, `brutalistCardSelected`                       | Contract updated (-4px hover, -4px selected); components not yet on new exports                        |
| R14     | `sections/archive.tsx` preview cards                                                      | `Card variant="interactive"`                                       | Uses card lift; archive cards need `bg-surface-muted` + R14                                            |
| R15     | `resume/bento.tsx` stack badges                                                           | `brutalistTileLift` on `Card interactive-tile`                     | R15 has **no active** — tile lift includes active press; align or override                             |
| R16     | `nav.tsx` `variant="drawer"`                                                              | no lift in `brutalistNavItemClasses`                               | **OK** — matches reference                                                                             |
| R17–R22 | resume top bar, contact icons, archive toolbar, contact copy, toast, drawer close         | mixed / none                                                       | Verify only in Step 11 — no brutalist lift expected except R22 dismiss chip                            |

**Key structural gaps (must fix in helpers before scattered call sites):**

1. `brutalistSwitcherClasses(isActive)` — add `variant: 'sidebar' | 'drawer'`; map R07/R08 vs R09/R10.
2. `brutalistNavItemClasses` sidebar inactive — swap `compact` → R06.
3. `button.tsx` — split variants: `cta` (R01), `card-action` (R02), `cv-link` (R05); stop overloading `plack` for R02.
4. Sidebar CV link — stop using `linkControlVariants secondary` (R01) for R05.

---

## Tasks

Execute in order via `/aif-implement`. Do not skip ahead.

> **Start here:** Step 3 — Steps 1–2 уже закрыты (visual QA + контракт в коде). Production-компоненты ещё не тронуты.

### Step 1 — Visual QA: зафиксировать выбор (sandbox `/dev/motion`)

- [x] Сверка R01–R15: reference (prototype) vs draft (proposed) в sandbox.
- [x] Зафиксировать победителя по каждому паттерну:

| Pattern | Выбор         | Контекст                                                       |
| ------- | ------------- | -------------------------------------------------------------- |
| R01     | **reference** | Hero CTA                                                       |
| R02     | **reference** | Project card actions                                           |
| R03     | **reference** | Archive featured link                                          |
| R04     | **reference** | View full archive CTA                                          |
| R05     | **reference** | Download CV (sidebar + drawer)                                 |
| R06     | **reference** | Sidebar section nav                                            |
| R07     | **reference** | Sidebar locale/theme inactive                                  |
| **R08** | **draft**     | Sidebar locale/theme selected — accent shadow, `-1.5px` baked  |
| R09     | **reference** | Drawer locale/theme inactive                                   |
| **R10** | **draft**     | Drawer locale/theme selected — foreground shadow, `-1px` baked |
| R11     | **reference** | `[ MENU ]` trigger                                             |
| R12     | **reference** | Stack skill plack                                              |
| R13     | **reference** | Project card shell                                             |
| R14     | **reference** | Archive preview card                                           |
| R15     | **reference** | Resume stack badge                                             |

### Step 2 — Motion contract в `brutalist-motion.ts` (только exports, без helpers)

- [x] `APPROVED_MOTION_BY_PATTERN` (R01–R15) по таблице Step 1.
- [x] `APPROVED_MOTION_SOURCE` (R08, R10 = `draft`; остальные = `reference`).
- [x] `LIFT_BY_SCALE` — значения по reference (кроме R08/R10 selected).
- [x] Pattern-specific exports: `brutalistCvLinkLift`, `brutalistSidebarNavLift`, `brutalistSidebarSwitcherLift`, `brutalistDrawerSwitcherLift`, `brutalistSidebarSwitcherSelected`, `brutalistDrawerSwitcherSelected`, `brutalistCardSelected`.

**Files:** `src/lib/brutalist-motion.ts`

### Step 3 — Refactor helpers в `brutalist-motion.ts`

- [x] `brutalistSwitcherClasses(isActive, variant)` — `sidebar` → R07/R08, `drawer` → R09/R10 (R08/R10 = draft selected).
- [x] `brutalistNavItemClasses` — sidebar inactive → R06; drawer → R16 (без lift).
- [x] `brutalistDrawerTriggerClasses` → R11.

**Files:** `src/lib/brutalist-motion.ts`

### Step 4 — Switchers (R07–R10)

- [x] Add `variant` prop to `LocaleSwitcher` and `ThemeSwitcher` (`sidebar` | `drawer`).
- [x] Pass `variant="sidebar"` from `sidebar.tsx`, `variant="drawer"` from `drawer-menu.tsx`.
- [x] Wire updated `brutalistSwitcherClasses(isActive, variant)`.

**Files:** `src/lib/brutalist-motion.ts`, `src/components/layout/locale-switcher.tsx`, `src/components/layout/theme-switcher.tsx`, `src/components/layout/sidebar.tsx`, `src/components/layout/drawer-menu.tsx`

### Step 5 — Navigation (R06, R16)

- [x] Sidebar nav inactive rows → R06 (`brutalistSidebarNavLift`).
- [x] Confirm drawer nav stays flat (R16) — no lift on hover.

**Files:** `src/lib/brutalist-motion.ts`, `src/components/layout/nav.tsx`

### Step 6 — Button / link variants (R01–R04)

- [x] `button.tsx`: map variants to approved patterns — primary/secondary hero → R01; new or renamed variant for card actions → R02; optional `compact-link` → R03.
- [x] Hero CTAs: keep `px-7 py-3`, confirm R01 motion on primary/secondary.
- [x] Archive section: featured external links → R03; “view full archive” → R04.

**Files:** `src/components/ui/button.tsx`, `src/components/sections/hero/hero-ctas.tsx`, `src/components/sections/archive.tsx`, `src/components/sections/projects/project-card.tsx`

### Step 7 — Download CV links (R05)

- [x] Replace `linkControlVariants({ variant: 'secondary' })` on CV links with R05 (`brutalistCvLinkLift` + full-width chrome).
- [x] Sidebar + drawer must match (same R05).

**Files:** `src/components/layout/sidebar.tsx`, `src/components/layout/drawer-menu.tsx`

### Step 8 — Menu trigger + drawer dismiss (R11, R22)

- [x] `DrawerTrigger` → R11 via updated `brutalistDrawerTriggerClasses`.
- [x] `DrawerClose` chip → R22 active press (`active:translate-y-px`).

**Files:** `src/components/layout/drawer-menu.tsx`, `src/lib/brutalist-motion.ts`

### Step 9 — Stack plack (R12)

- [x] `stack-plack.tsx`: replace `brutalistPlackLift` with `approvedMotionR12` / tile lift.

**Files:** `src/components/sections/stack-plack.tsx`

### Step 10 — Cards (R13, R14)

- [x] `card.tsx` `interactive` → R13 hover; verify `brutalistCardSelected` on expanded project card.
- [x] Archive preview cards → R14 (`bg-surface-muted`, same hover as R13).

**Files:** `src/components/ui/card.tsx`, `src/components/sections/projects/project-card.tsx`, `src/components/sections/archive.tsx`

### Step 11 — Resume stack badges (R15)

- [x] `resume/bento.tsx`: R15 motion (no active press) on stack badge tiles.

**Files:** `src/components/resume/bento.tsx`, `src/lib/brutalist-motion.ts`

### Step 12 — Micro-motion verify (R17–R21)

- [x] Spot-check: resume back link (R17), contact social icons (R18), archive toolbar (R19), contact copy (R20), toast (R21). Fix only if production diverges from reference.

**Files:** as needed (read-only pass first)

### Step 13 — Docs

- [x] Update `.cursor/docs/button.md` with pattern IDs R01–R15 and motion table.
- [x] Update `design_system_new.md` motion section.
- [x] Note pattern registry in `ARCHITECTURE.md` / `AGENTS.md` if helpers change.

### Step 14 — Cleanup temp sandbox

- [x] Delete `src/app/(frontend)/[locale]/dev/motion/page.tsx`
- [x] Delete `src/lib/motion-sandbox-patterns.ts`
- [x] Remove deprecated `DRAFT_MOTION_BY_PATTERN` alias if unused
- [x] `bun run lint` + `bun run build`

### Step 15 — Manual QA

- [x] `/en`, `/uk` — hero CTAs, stack placks, project cards, archive preview, sidebar nav, switchers, CV link, drawer menu
- [x] `/en/resume` — stack badges (R15)
- [x] Compare motion feel to reference prototype for R01–R15

---

## Commit Plan

1. `refactor(motion): wire switchers and nav to approved patterns (R06–R10)`
2. `refactor(motion): button and link variants R01–R05`
3. `refactor(motion): cards, placks, drawer trigger R11–R15`
4. `chore(motion): remove dev sandbox, update docs`

---

## Manual QA Checklist

- [ ] R01 hero primary + secondary — 4px rest, 5px hover, 4px active press
- [ ] R02 project card buttons — 2px→3px shadow growth
- [ ] R05 CV link sidebar + drawer — no rest shadow, 2px hover lift, 4px hover shadow
- [ ] R07 sidebar switcher inactive — border-colored hover shadow
- [ ] R08 sidebar switcher selected — **draft**: accent shadow, 1.5px baked
- [ ] R09 drawer switcher inactive — foreground hover shadow, p-2.5
- [ ] R10 drawer switcher selected — **draft**: foreground shadow, 1px baked
- [ ] R11 menu trigger — 3px hover shadow, inverted hover colors
- [ ] R12 stack placks — 3px shadow on hover
- [ ] R13/R14 cards — 4px lift, 6px shadow on hover
- [ ] R15 resume badges — 2px lift, 3px shadow, no active press
- [ ] Drawer nav (R16) — no brutalist lift
- [ ] `prefers-reduced-motion: reduce` — no transform/shadow animation
