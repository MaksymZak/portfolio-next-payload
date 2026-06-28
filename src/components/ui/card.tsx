import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { brutalistCardLift, brutalistTileLift } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const cardVariants = cva('rounded-none border border-border bg-surface text-foreground', {
  variants: {
    variant: {
      default: '',
      interactive: cn(
        'hover:border-foreground hover:bg-surface-muted',
        brutalistCardLift,
      ),
      'interactive-tile': cn(
        'hover:border-foreground hover:bg-surface-muted',
        brutalistTileLift,
      ),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type CardProps = React.ComponentProps<'div'> & VariantProps<typeof cardVariants>

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-sm font-bold uppercase tracking-tight text-foreground', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-xs leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('p-4 pt-0', className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-4 pt-0', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
}
