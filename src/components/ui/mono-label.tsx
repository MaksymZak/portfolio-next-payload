import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/cn'

const monoLabelVariants = cva(
  'inline-block font-mono font-bold uppercase tracking-widest',
  {
    variants: {
      variant: {
        muted: 'text-muted-foreground',
        accent: 'text-primary',
        foreground: 'text-foreground',
      },
      size: {
        default: 'text-[10px]',
        sm: 'text-[9px]',
      },
    },
    defaultVariants: {
      variant: 'muted',
      size: 'default',
    },
  },
)

export type MonoLabelProps = React.ComponentProps<'span'> &
  VariantProps<typeof monoLabelVariants>

function MonoLabel({ className, variant, size, ...props }: MonoLabelProps) {
  return (
    <span
      data-slot="mono-label"
      className={cn(monoLabelVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { MonoLabel, monoLabelVariants }
