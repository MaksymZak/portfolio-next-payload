import { cn } from '@/lib/cn'

/**
 * Brutalist motion contract for buttons, links, and compact controls.
 *
 * Hover: element translates up-left while the hard shadow grows so the shadow
 * corner stays visually anchored. Active: element presses into the shadow
 * (translate by shadow depth) and shadow collapses to none.
 *
 * Motion is gated behind `motion-safe:`; `globals.css` short-circuits transitions
 * when `prefers-reduced-motion: reduce`.
 */
export type BrutalistMotionScale = 'cta' | 'compact' | 'plack' | 'card' | 'tile'

const TRANSITION_ALL = 'motion-safe:transition-all motion-safe:ease-out'

const TRANSITION_100 = cn(TRANSITION_ALL, 'motion-safe:duration-100')

const TRANSITION_150 = cn(TRANSITION_ALL, 'motion-safe:duration-150')

const TRANSITION_200 = cn(TRANSITION_ALL, 'motion-safe:duration-200')

/**
 * Press state that wins over hover lift while the pointer is still down.
 * Hover uses motion-safe:hover; plain active: loses the cascade to hover until
 * the cursor leaves the control — hence hover:active pairs.
 */
function brutalistPressActive(
  translate: string,
  shadow: string = 'motion-safe:active:shadow-none motion-safe:hover:active:shadow-none',
) {
  return cn(translate, shadow)
}

const CTA_PRESS = brutalistPressActive(
  'motion-safe:active:translate-x-1 motion-safe:active:translate-y-1 motion-safe:hover:active:translate-x-1 motion-safe:hover:active:translate-y-1',
)

const COMPACT_PRESS = brutalistPressActive(
  'motion-safe:active:translate-x-0.5 motion-safe:active:translate-y-0.5 motion-safe:hover:active:translate-x-0.5 motion-safe:hover:active:translate-y-0.5',
)

const PLACK_PRESS = brutalistPressActive(
  'motion-safe:active:translate-x-px motion-safe:active:translate-y-px motion-safe:hover:active:translate-x-px motion-safe:hover:active:translate-y-px',
)

const PRESS_RESET = brutalistPressActive(
  'motion-safe:active:translate-x-0 motion-safe:active:translate-y-0 motion-safe:hover:active:translate-x-0 motion-safe:hover:active:translate-y-0',
)

const DISMISS_CHIP_PRESS =
  'motion-safe:active:translate-y-px motion-safe:hover:active:translate-y-px'

/** Scale presets aligned with Pass 1 visual QA (reference prototype unless noted). */
const LIFT_BY_SCALE = {
  /** R01, R04 — anchored CTA (4px → 5px). */
  cta: {
    transition: TRANSITION_100,
    shadow: 'shadow-[4px_4px_0_var(--foreground)]',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[5px_5px_0_var(--foreground)]',
    active: CTA_PRESS,
  },
  /** R02, R03 — card actions (2px → 3px). */
  compact: {
    transition: TRANSITION_100,
    shadow: 'shadow-[2px_2px_0_var(--foreground)]',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[3px_3px_0_var(--foreground)]',
    active: COMPACT_PRESS,
  },
  /** R11 — menu trigger (2px lift, 3px shadow, 1px active press). */
  plack: {
    transition: TRANSITION_ALL,
    shadow: '',
    hover:
      'motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[3px_3px_0_var(--foreground)]',
    active: PLACK_PRESS,
  },
  /** R13, R14 — large card shell (4px lift, 6px shadow). */
  card: {
    transition: TRANSITION_200,
    shadow: '',
    hover:
      'motion-safe:hover:-translate-x-1 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[6px_6px_0_var(--foreground)]',
    active: '',
  },
  /** R12, R15 — plack / badge (2px lift, 3px shadow). */
  tile: {
    transition: TRANSITION_150,
    shadow: '',
    hover:
      'motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[3px_3px_0_var(--foreground)]',
    active: PLACK_PRESS,
  },
} as const satisfies Record<
  BrutalistMotionScale,
  {
    transition: string
    shadow: string
    hover: string
    active: string
  }
>

type BrutalistLiftOptions = {
  /** Include the resting hard shadow (default true). */
  shadow?: boolean
  /** Include hover lift + shadow growth (default true). */
  hover?: boolean
  /** Include active press-into-shadow (default true). */
  active?: boolean
}

/** Composable lift mechanics for a given scale. */
export function brutalistLiftClasses(
  scale: BrutalistMotionScale,
  { shadow = true, hover = true, active = true }: BrutalistLiftOptions = {},
) {
  const lift = LIFT_BY_SCALE[scale]

  return cn(
    lift.transition,
    shadow && lift.shadow,
    hover && lift.hover,
    active && lift.active,
  )
}

/** Precomposed CTA-scale lift (4px shadow, 100ms) for primary/secondary buttons and links. */
export const brutalistCtaLift = brutalistLiftClasses('cta')

/** Precomposed compact control lift (2px shadow, 150ms) for switchers and nav tiles. */
export const brutalistCompactLift = brutalistLiftClasses('compact')

/** Precomposed plack lift (3px shadow, 150ms) for drawer triggers and small CTAs. */
export const brutalistPlackLift = brutalistLiftClasses('plack')

/** Precomposed large card lift (6px hover shadow, 200ms) for project and archive cards. */
export const brutalistCardLift = brutalistLiftClasses('card', { shadow: false })

/** Precomposed compact tile lift (3px hover shadow, 150ms) for bento tiles and case goal rows. */
export const brutalistTileLift = brutalistLiftClasses('tile', { shadow: false })

/** R10 — drawer locale / theme selected (draft approved). */
export const brutalistDrawerSwitcherSelected =
  '-translate-x-px -translate-y-px shadow-[2px_2px_0_var(--foreground)]'

/** R08 — desktop sidebar locale / theme selected (draft approved). */
export const brutalistSidebarSwitcherSelected =
  '-translate-x-[1.5px] -translate-y-[1.5px] shadow-[2px_2px_0_var(--accent)]'

/** @deprecated Use brutalistDrawerSwitcherSelected — kept for call-site compatibility. */
export const brutalistCompactSelected = brutalistDrawerSwitcherSelected

/** Selected/active CTA control: lifted without hover-only motion. */
export const brutalistCtaSelected =
  '-translate-x-px -translate-y-px shadow-[5px_5px_0_var(--foreground)]'

/** R13 selected — large card baked lift (4px translate, 6px shadow). */
export const brutalistCardSelected =
  '-translate-x-1 -translate-y-1 border-foreground shadow-[6px_6px_0_var(--foreground)]'

/** R05 — sidebar / drawer Download CV (no rest shadow). */
export const brutalistCvLinkLift = cn(
  TRANSITION_150,
  'motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[4px_4px_0_var(--foreground)]',
  CTA_PRESS,
)

/** R06 — desktop sidebar section nav (inactive hover). */
export const brutalistSidebarNavLift = cn(
  TRANSITION_ALL,
  'motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[2px_2px_0_var(--foreground)]',
  PRESS_RESET,
)

/** R06 selected — desktop sidebar section nav (reference baked lift). */
export const brutalistSidebarNavSelected = cn(
  TRANSITION_ALL,
  '-translate-x-0.5 -translate-y-0.5 shadow-[2px_2px_0_var(--foreground)]',
  PRESS_RESET,
)

/** R07 — desktop sidebar locale / theme toggle (inactive). */
export const brutalistSidebarSwitcherLift = cn(
  TRANSITION_ALL,
  'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[2px_2px_0_var(--border)]',
  PRESS_RESET,
)

/** R09 — drawer locale / theme toggle (inactive). */
export const brutalistDrawerSwitcherLift = cn(
  TRANSITION_ALL,
  'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[2px_2px_0_var(--foreground)]',
  PRESS_RESET,
)

/** Visible keyboard focus ring aligned with globals.css focus treatment. */
export const brutalistFocusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]'

export type BrutalistSwitcherVariant = 'sidebar' | 'drawer'

const SWITCHER_BASE = cn(
  'cursor-pointer rounded-none border text-center font-mono text-[9px] leading-tight font-bold',
  brutalistFocusRing,
)

/**
 * Locale/theme switcher tile — sidebar (R07/R08) or drawer (R09/R10).
 */
export function brutalistSwitcherClasses(
  isActive: boolean,
  variant: BrutalistSwitcherVariant = 'sidebar',
  className?: string,
) {
  const padding = variant === 'sidebar' ? 'p-2' : 'p-2.5'

  if (variant === 'sidebar') {
    return cn(
      SWITCHER_BASE,
      padding,
      isActive
        ? cn(
            TRANSITION_ALL,
            brutalistSidebarSwitcherSelected,
            PRESS_RESET,
            'border-foreground bg-foreground font-black text-background',
          )
        : cn(
            'border-border bg-surface text-muted-foreground',
            brutalistSidebarSwitcherLift,
            'motion-safe:hover:border-foreground motion-safe:hover:text-foreground',
          ),
      className,
    )
  }

  return cn(
    SWITCHER_BASE,
    padding,
    isActive
      ? cn(
          TRANSITION_ALL,
          brutalistDrawerSwitcherSelected,
          PRESS_RESET,
          'border-foreground bg-foreground text-background',
        )
      : cn(
          'border-border bg-background text-muted-foreground',
          brutalistDrawerSwitcherLift,
          'motion-safe:hover:border-foreground motion-safe:hover:text-foreground',
        ),
    className,
  )
}

const NAV_ITEM_BASE = cn(
  'flex w-full cursor-pointer items-center justify-between rounded-none border px-3 text-left font-mono text-xs',
  brutalistFocusRing,
)

export type BrutalistNavVariant = 'sidebar' | 'drawer'

/**
 * Home/case index nav rows — sidebar (R06): inactive hover lift + selected baked lift;
 * drawer (R16): color/border only, no brutalist lift.
 */
export function brutalistNavItemClasses(
  isActive: boolean,
  variant: BrutalistNavVariant = 'sidebar',
  className?: string,
) {
  if (variant === 'drawer') {
    return cn(
      NAV_ITEM_BASE,
      'py-2.5 motion-safe:transition-all',
      isActive
        ? 'border-foreground bg-foreground font-extrabold text-background'
        : cn(
            'border-border bg-background text-muted-foreground',
            'motion-safe:hover:border-foreground motion-safe:hover:text-foreground',
          ),
      className,
    )
  }

  return cn(
    NAV_ITEM_BASE,
    'border-transparent py-2',
    isActive
      ? cn(
          'border-foreground bg-foreground font-bold text-background',
          brutalistSidebarNavSelected,
        )
      : cn(
          'text-muted-foreground',
          brutalistSidebarNavLift,
          'motion-safe:hover:border-foreground motion-safe:hover:bg-surface-muted motion-safe:hover:text-foreground',
        ),
    className,
  )
}

/** R22 — Drawer dismiss chip (border hover, 1px active press, no lift). */
export const approvedMotionR22 = cn(
  TRANSITION_ALL,
  'motion-safe:hover:border-foreground',
  DISMISS_CHIP_PRESS,
)

/** Inverted drawer menu trigger — R11 (2px lift, 3px hover shadow, inverted hover colors). */
export function brutalistDrawerTriggerClasses(className?: string) {
  return cn(
    'cursor-pointer rounded-none border border-foreground bg-foreground px-3 py-1.5 font-mono text-[10px] font-bold text-background uppercase select-none',
    brutalistFocusRing,
    approvedMotionR11,
    'motion-safe:hover:bg-surface motion-safe:hover:text-foreground',
    className,
  )
}

/** Drawer close chip — R22 (border hover, 1px active press, no brutalist lift). */
export function brutalistDrawerDismissClasses(className?: string) {
  return cn(
    'cursor-pointer rounded-none border border-border bg-background px-2.5 py-1 font-mono text-[10px] font-bold text-foreground select-none',
    brutalistFocusRing,
    approvedMotionR22,
    className,
  )
}

// Pass 1 visual QA — approved pattern motion (R01–R15).
// R08, R10: draft (proposed). All others: reference (prototype).
// ---------------------------------------------------------------------------

/** R01 — Hero primary / secondary CTA (reference). */
export const approvedMotionR01 = brutalistLiftClasses('cta')

/** R02 — Project card actions (reference). */
export const approvedMotionR02 = brutalistLiftClasses('compact')

/** R03 — Archive featured external link (reference, same as R02). */
export const approvedMotionR03 = approvedMotionR02

/** R04 — “View full archive” wide CTA (reference, same as R01). */
export const approvedMotionR04 = approvedMotionR01

/** R05 — Sidebar + drawer Download CV (reference). */
export const approvedMotionR05 = brutalistCvLinkLift

/** R06 — Desktop sidebar section nav inactive hover (reference). */
export const approvedMotionR06 = brutalistSidebarNavLift

/** R06 selected — Desktop sidebar section nav baked lift (reference). */
export const approvedMotionR06Selected = brutalistSidebarNavSelected

/** R07 — Desktop sidebar locale / theme toggle inactive (reference). */
export const approvedMotionR07 = brutalistSidebarSwitcherLift

/** R08 — Desktop sidebar locale / theme selected (draft approved). */
export const approvedMotionR08 = cn(
  TRANSITION_ALL,
  brutalistSidebarSwitcherSelected,
  PRESS_RESET,
)

/** R09 — Drawer locale / theme toggle inactive (reference). */
export const approvedMotionR09 = brutalistDrawerSwitcherLift

/** R10 — Drawer locale / theme selected (draft approved). */
export const approvedMotionR10 = cn(
  TRANSITION_ALL,
  brutalistDrawerSwitcherSelected,
  PRESS_RESET,
)

/** R11 — Sticky header [ MENU ] trigger (reference). */
export const approvedMotionR11 = brutalistLiftClasses('plack', { shadow: false })

/** R12 — Stack / skill plack (reference). */
export const approvedMotionR12 = brutalistLiftClasses('tile', { shadow: false })

/** R13 — Project case-study card shell (reference). */
export const approvedMotionR13 = brutalistLiftClasses('card', { shadow: false, active: false })

/** R14 — Archive preview card shell (reference). */
export const approvedMotionR14 = approvedMotionR13

/** R15 — CV resume stack badge (reference, no active press). */
export const approvedMotionR15 = cn(
  TRANSITION_150,
  'motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[3px_3px_0_var(--foreground)]',
)

/** R17 — resume “Back to index” text link (X-only micro-shift). */
export const approvedMotionR17 = cn(
  TRANSITION_ALL,
  'motion-safe:hover:-translate-x-1',
)

/** R18 — social icon hit-area (Y-only micro-shift). */
export const approvedMotionR18 = cn(
  'motion-safe:transition-transform',
  'motion-safe:hover:-translate-y-0.5',
)

/** R19 — archive page controls (color/border only, no brutalist lift). */
export const approvedMotionR19 = 'motion-safe:transition-colors'

/** R20 — contact email copy CTA (color only). */
export const approvedMotionR20 = 'motion-safe:transition-colors'

/** R21 — toast notification static chrome (fixed shadow, no hover motion). */
export const approvedMotionR21 =
  'shadow-[4px_4px_0_rgba(0,0,0,0.1)] motion-safe:duration-150'

export const APPROVED_MOTION_BY_PATTERN = {
  R01: approvedMotionR01,
  R02: approvedMotionR02,
  R03: approvedMotionR03,
  R04: approvedMotionR04,
  R05: approvedMotionR05,
  R06: approvedMotionR06,
  R07: approvedMotionR07,
  R08: approvedMotionR08,
  R09: approvedMotionR09,
  R10: approvedMotionR10,
  R11: approvedMotionR11,
  R12: approvedMotionR12,
  R13: approvedMotionR13,
  R14: approvedMotionR14,
  R15: approvedMotionR15,
} as const

export type ApprovedMotionPatternId = keyof typeof APPROVED_MOTION_BY_PATTERN

/** Which source won visual QA per pattern. */
export const APPROVED_MOTION_SOURCE: Record<
  ApprovedMotionPatternId,
  'reference' | 'draft'
> = {
  R01: 'reference',
  R02: 'reference',
  R03: 'reference',
  R04: 'reference',
  R05: 'reference',
  R06: 'reference',
  R07: 'reference',
  R08: 'draft',
  R09: 'reference',
  R10: 'draft',
  R11: 'reference',
  R12: 'reference',
  R13: 'reference',
  R14: 'reference',
  R15: 'reference',
}
