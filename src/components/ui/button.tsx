import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { brutalistCtaLift, brutalistPlackLift } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-none border-2 font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none'

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary: cn(
        'border-foreground bg-primary text-primary-foreground',
        brutalistCtaLift,
        'hover:bg-primary hover:text-primary-foreground',
      ),
      secondary: cn(
        'border-foreground bg-surface text-foreground',
        brutalistCtaLift,
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
          brutalistCtaLift,
          'hover:bg-primary hover:text-primary-foreground',
        ),
        secondary: cn(
          'border-foreground bg-surface text-foreground',
          brutalistCtaLift,
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
