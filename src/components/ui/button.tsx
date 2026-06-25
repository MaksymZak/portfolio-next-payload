import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-none border font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary text-primary-foreground shadow-[4px_4px_0_var(--foreground)] motion-safe:transition-[transform,box-shadow,background-color,color] motion-safe:duration-150 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground active:translate-x-0 active:translate-y-0 active:shadow-none',
        secondary:
          'border-border bg-surface text-foreground motion-safe:transition-colors hover:border-foreground',
        ghost:
          'border-transparent bg-transparent text-muted-foreground motion-safe:transition-colors hover:bg-surface-muted hover:text-foreground',
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
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

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

export { Button, buttonVariants }
