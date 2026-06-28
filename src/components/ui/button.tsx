import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  approvedMotionR02,
  approvedMotionR03,
  brutalistCtaLift,
  brutalistCvLinkLift,
  brutalistPlackLift,
} from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-none border-2 font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50'

/** R01 — hero / wide CTA lift (4px rest shadow → 5px hover). */
const motionR01 = brutalistCtaLift

/** R02 — card action lift (2px rest shadow → 3px hover). */
const motionR02 = approvedMotionR02

/** R03 — compact external link lift (same scale as R02). */
const motionR03 = approvedMotionR03

/** R05 — sidebar / drawer Download CV (no rest shadow). */
const motionR05 = brutalistCvLinkLift

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary: cn(
        'border-foreground bg-primary text-primary-foreground',
        motionR01,
        'hover:bg-primary hover:text-primary-foreground',
      ),
      secondary: cn(
        'border-foreground bg-surface text-foreground',
        motionR01,
        'hover:border-foreground hover:bg-surface hover:text-foreground',
      ),
      'card-accent': cn(
        'border-foreground bg-primary text-primary-foreground',
        motionR02,
        'hover:bg-primary hover:text-primary-foreground',
      ),
      'card-action': cn(
        'border-foreground bg-surface text-foreground',
        motionR02,
        'hover:border-foreground hover:bg-surface hover:text-foreground',
      ),
      'compact-link': cn(
        'border-foreground bg-surface text-foreground',
        motionR03,
        'hover:border-foreground hover:bg-surface hover:text-foreground',
      ),
      ghost:
        'border-transparent bg-transparent text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:bg-surface-muted hover:text-foreground',
      plack: cn(
        'border-foreground bg-surface text-foreground',
        brutalistPlackLift,
        'hover:border-foreground hover:bg-surface hover:text-foreground',
      ),
    },
    size: {
      default: 'h-9 px-3 py-1',
      sm: 'h-8 px-2.5',
      lg: 'h-10 px-4',
      hero: 'px-7 py-3 text-sm',
      wide: 'px-6 py-3',
      card: 'px-4 py-2.5',
      compact: 'px-3 py-1.5 text-[9px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

/** Link-styled control using the same brutalist CTA / ghost variants as Button. */
const linkControlVariants = cva(
  cn(buttonBase, 'no-underline'),
  {
    variants: {
      variant: {
        primary: cn(
          'border-foreground bg-primary text-primary-foreground',
          motionR01,
          'hover:bg-primary hover:text-primary-foreground',
        ),
        secondary: cn(
          'border-foreground bg-surface text-foreground',
          motionR01,
          'hover:border-foreground hover:bg-surface hover:text-foreground',
        ),
        'card-accent': cn(
          'border-foreground bg-primary text-primary-foreground',
          motionR02,
          'hover:bg-primary hover:text-primary-foreground',
        ),
        'card-action': cn(
          'border-foreground bg-surface text-foreground',
          motionR02,
          'hover:border-foreground hover:bg-surface hover:text-foreground',
        ),
        'compact-link': cn(
          'border-foreground bg-surface text-foreground',
          motionR03,
          'hover:border-foreground hover:bg-surface hover:text-foreground',
        ),
        'cv-link': cn(
          'border-foreground bg-surface text-foreground',
          motionR05,
          'hover:border-foreground hover:bg-surface hover:text-foreground',
        ),
        ghost:
          'border-transparent bg-transparent text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:bg-surface-muted hover:text-foreground',
        plack: cn(
          'border-foreground bg-surface text-foreground',
          brutalistPlackLift,
          'hover:border-foreground hover:bg-surface hover:text-foreground',
        ),
      },
      size: {
        default: 'h-9 px-3 py-1',
        sm: 'h-8 px-2.5',
        lg: 'h-10 px-4',
        hero: 'px-7 py-3 text-sm',
        wide: 'px-6 py-3',
        card: 'px-4 py-2.5',
        compact: 'px-3 py-1.5 text-[9px]',
        cv: 'w-full py-3',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export type LinkControlProps = React.ComponentProps<'a'> &
  VariantProps<typeof linkControlVariants>

function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function LinkControl({ className, variant, size, ...props }: LinkControlProps) {
  return (
    <a
      data-slot="link-control"
      className={cn(linkControlVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, LinkControl, linkControlVariants }
