import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type SectionShellProps = {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
  /** When true, removes the top border (used for the first section after hero). */
  bare?: boolean
}

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  bare = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 border-border', bare ? '' : 'border-t', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        {(eyebrow || title || intro) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            )}
            {intro && <p className="mt-4 text-base text-muted-foreground">{intro}</p>}
          </header>
        )}
        <div className={cn(eyebrow || title || intro ? 'mt-10' : '')}>{children}</div>
      </div>
    </section>
  )
}
