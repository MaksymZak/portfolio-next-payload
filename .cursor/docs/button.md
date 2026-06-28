# Brutalist Button & Control Motion

Instructions for interactive elements in this portfolio. All brutalist lift/shadow motion is centralized in `src/lib/brutalist-motion.ts` — do not copy ad-hoc Tailwind hover classes into new components.

**Related:** [design_system_new.md](./design_system_new.md) (motion contract), [reference prototype](./reference/) (visual source for R01–R15).

## Concept

Instead of soft blurred shadows and rounded corners, controls use hard `translate` paired with solid offset shadows. On hover the element lifts toward the user while the shadow grows so the outer corner stays visually anchored (when a rest shadow exists). On active press the element moves into the shadow and the shadow collapses.

## Pattern registry (R01–R15)

Each pattern ID maps to an approved export in `brutalist-motion.ts`. Visual QA chose **reference** (prototype) for all patterns except **R08** and **R10** (draft selected states).

| ID | UI context | Export / helper | Rest shadow | Hover translate | Hover shadow | Active | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **R01** | Hero primary / secondary CTA | `approvedMotionR01` / `Button` primary, secondary | 4px `--foreground` | −1px / −1px | 5px | +4px, shadow-none | 100ms |
| **R02** | Project card actions | `approvedMotionR02` / `Button` card-action | 2px | −1px / −1px | 3px | +2px, shadow-none | 100ms |
| **R03** | Archive featured link | `approvedMotionR03` / `Button` compact-link | 2px | −1px / −1px | 3px | +2px, shadow-none | 100ms |
| **R04** | “View full archive” CTA | `approvedMotionR04` / `Button` secondary | 4px | −1px / −1px | 5px | +4px, shadow-none | 100ms |
| **R05** | Download CV (sidebar + drawer) | `approvedMotionR05` / `brutalistCvLinkLift` | none | −2px / −2px | 4px | +4px, shadow-none | 150ms |
| **R06** | Sidebar section nav | `approvedMotionR06` / `brutalistNavItemClasses('sidebar')` | none | −2px / −2px | 2px | 0, shadow-none | default ~150ms |
| **R07** | Sidebar locale/theme inactive | `approvedMotionR07` / `brutalistSwitcherClasses(_, 'sidebar')` | none | −1px / −1px | 2px `--border` | 0 | default |
| **R08** | Sidebar locale/theme selected | `approvedMotionR08` (**draft**) | 2px `--accent` | −1.5px baked | same | 0 | default |
| **R09** | Drawer locale/theme inactive | `approvedMotionR09` / `brutalistSwitcherClasses(_, 'drawer')` | none | −1px / −1px | 2px `--foreground` | 0 | default |
| **R10** | Drawer locale/theme selected | `approvedMotionR10` (**draft**) | 2px `--foreground` | −1px baked | same | 0 | default |
| **R11** | `[ MENU ]` drawer trigger | `approvedMotionR11` / `brutalistDrawerTriggerClasses` | none | −2px / −2px | 3px | +1px, shadow-none | default |
| **R12** | Stack skill plack | `approvedMotionR12` / `stack-plack.tsx` | none | −2px / −2px | 3px | +1px | 150ms |
| **R13** | Project card shell | `approvedMotionR13` / `Card` interactive | none | −4px / −4px | 6px | none | 200ms |
| **R14** | Archive preview card | `approvedMotionR14` / `Card` interactive + `bg-surface-muted` | none | −4px / −4px | 6px | none | 200ms |
| **R15** | Resume stack badge | `approvedMotionR15` / `resume/bento.tsx` | none | −2px / −2px | 3px | **none** | 150ms |

### Micro-motion (no brutalist lift)

| ID | Context | Export |
| --- | --- | --- |
| R16 | Drawer section nav | `brutalistNavItemClasses(_, 'drawer')` — color/border only |
| R17 | Resume “Back to index” | `approvedMotionR17` — X-only −4px |
| R18 | Social icon hit-area | `approvedMotionR18` — Y-only −2px |
| R19 | Archive toolbar controls | `approvedMotionR19` — `transition-colors` |
| R20 | Contact email copy | `approvedMotionR20` — `transition-colors` |
| R21 | Toast notification | `approvedMotionR21` — static shadow |
| R22 | Drawer dismiss chip | `approvedMotionR22` / `brutalistDrawerDismissClasses` — 1px active press |

## Scale presets (`LIFT_BY_SCALE`)

Lower-level scales used by pattern exports:

| Scale | Patterns | Rest → hover shadow | Duration |
| --- | --- | --- | --- |
| `cta` | R01, R04 | 4px → 5px | 100ms |
| `compact` | R02, R03 | 2px → 3px | 100ms |
| `plack` | R11 | none → 3px | default |
| `card` | R13, R14 | none → 6px | 200ms |
| `tile` | R12 | none → 3px | 150ms |

Custom patterns (R05–R10, R15) use dedicated exports — not every control maps 1:1 to a scale name.

## Usage for new controls

1. Find the closest pattern ID in the table above.
2. Import the matching export or helper from `@/lib/brutalist-motion`.
3. Compose through `Button`, `Card`, or existing layout helpers — avoid duplicating translate/shadow classes.

```tsx
import { approvedMotionR02 } from '@/lib/brutalist-motion'
import { Button } from '@/components/ui/button'

<Button variant="card-action" className="px-4 py-2.5 text-[10px] uppercase tracking-widest">
  Open case
</Button>
```

```tsx
import { brutalistSwitcherClasses } from '@/lib/brutalist-motion'

<button type="button" className={brutalistSwitcherClasses(isActive, 'sidebar')}>
  EN
</button>
```

## Tailwind mechanics

- **Transitions:** `motion-safe:transition-all`, `motion-safe:duration-{100|150|200}`, `motion-safe:ease-out`.
- **Hover lift:** `motion-safe:hover:-translate-x-*` / `-translate-y-*` paired with matching `shadow-[Npx_Npx_0_var(--token)]`.
- **Active press:** `motion-safe:active:translate-*` + `motion-safe:active:shadow-none` (and `hover:active` pairs so press wins while pointer is down).
- **Accessibility:** all motion gated behind `motion-safe:`; `prefers-reduced-motion: reduce` disables transforms in `globals.css`.
- **Focus:** `brutalistFocusRing` — do not use `focus-visible:outline-none` on interactive controls.

## Typography & chrome by pattern

Sizing is part of the pattern — do not flatten everything to one button size:

- **R01:** `border-2`, `px-7 py-3`, `font-bold`, `text-sm`
- **R02:** `border-2`, `px-4 py-2.5`, `text-[10px]` uppercase `tracking-widest`
- **R03:** `border-2`, `px-3 py-1.5`, `text-[9px]` uppercase
- **R05:** `border-2`, full-width, `py-3`, `text-[10px]` uppercase
- **R07/R08:** sidebar switcher `p-2`, `text-[9px]` mono
- **R09/R10:** drawer switcher `p-2.5`, `text-[9px]` mono

## Registry API

```ts
import {
  APPROVED_MOTION_BY_PATTERN,
  APPROVED_MOTION_SOURCE,
  type ApprovedMotionPatternId,
} from '@/lib/brutalist-motion'

// APPROVED_MOTION_BY_PATTERN.R01 → class string for R01
// APPROVED_MOTION_SOURCE.R08 → 'draft' | 'reference'
```
