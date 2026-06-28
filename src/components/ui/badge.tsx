import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-none border font-mono font-bold uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface-muted text-muted-foreground',
        surface: 'border-border bg-surface text-foreground',
        accent: 'border-border bg-surface-muted text-primary',
      },
      size: {
        default: 'px-2.5 py-0.5 text-[10px]',
        sm: 'px-2 py-0.5 text-[9px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type BadgeProps = React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
