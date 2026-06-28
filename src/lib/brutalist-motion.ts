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

const TRANSITION_BASE =
  'motion-safe:transition-[transform,box-shadow,background-color,color,border-color] motion-safe:ease-out'

const LIFT_BY_SCALE = {
  cta: {
    transition: cn(TRANSITION_BASE, 'motion-safe:duration-100'),
    shadow: 'shadow-[4px_4px_0_var(--foreground)]',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[5px_5px_0_var(--foreground)]',
    active: 'active:translate-x-1 active:translate-y-1 active:shadow-none',
  },
  compact: {
    transition: cn(TRANSITION_BASE, 'motion-safe:duration-150'),
    shadow: 'shadow-[2px_2px_0_var(--foreground)]',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[2px_2px_0_var(--foreground)]',
    active: 'active:translate-x-0 active:translate-y-0 active:shadow-none',
  },
  plack: {
    transition: cn(TRANSITION_BASE, 'motion-safe:duration-150'),
    shadow: 'shadow-[3px_3px_0_var(--foreground)]',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[4px_4px_0_var(--foreground)]',
    active: 'active:translate-x-px active:translate-y-px active:shadow-none',
  },
  card: {
    transition: cn(TRANSITION_BASE, 'motion-safe:duration-200'),
    shadow: '',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[6px_6px_0_var(--foreground)]',
    active: 'active:translate-x-1.5 active:translate-y-1.5 active:shadow-none',
  },
  tile: {
    transition: cn(TRANSITION_BASE, 'motion-safe:duration-150'),
    shadow: '',
    hover:
      'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[3px_3px_0_var(--foreground)]',
    active: 'active:translate-x-px active:translate-y-px active:shadow-none',
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

/** Selected/active compact control: lifted without hover-only motion. */
export const brutalistCompactSelected =
  '-translate-x-px -translate-y-px shadow-[2px_2px_0_var(--foreground)]'

/** Selected/active CTA control: lifted without hover-only motion. */
export const brutalistCtaSelected =
  '-translate-x-px -translate-y-px shadow-[5px_5px_0_var(--foreground)]'

/** Selected/expanded large card: lifted with 6px shadow, no hover-only motion. */
export const brutalistCardSelected =
  '-translate-x-px -translate-y-px border-foreground shadow-[6px_6px_0_var(--foreground)]'

const SWITCHER_BASE =
  'rounded-none border p-2.5 text-center font-mono text-[9px] leading-tight font-bold'

/** Compact switcher tile (locale/theme): selected lift or hover-only compact motion. */
export function brutalistSwitcherClasses(isActive: boolean, className?: string) {
  return cn(
    SWITCHER_BASE,
    isActive
      ? cn(
          brutalistCompactSelected,
          'border-foreground bg-foreground text-background',
        )
      : cn(
          'border-border bg-background text-muted-foreground',
          brutalistLiftClasses('compact', { shadow: false }),
          'motion-safe:hover:border-foreground motion-safe:hover:text-foreground',
        ),
    className,
  )
}

/** Inverted drawer menu trigger: plack hover lift without a resting shadow. */
export function brutalistDrawerTriggerClasses(className?: string) {
  return cn(
    'cursor-pointer rounded-none border border-foreground bg-foreground px-3 py-1.5 font-mono text-[10px] font-bold text-background uppercase select-none',
    brutalistLiftClasses('plack', { shadow: false }),
    'motion-safe:hover:bg-surface motion-safe:hover:text-foreground',
    className,
  )
}
