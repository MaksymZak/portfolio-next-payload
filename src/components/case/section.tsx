import type { ReactNode } from 'react'

import { SectionTag } from '@/components/ui/section-tag'
import { cn } from '@/lib/cn'

type CaseSectionProps = {
  id: string
  index: number
  title: string
  children: ReactNode
  className?: string
}

export function CaseSection({ id, index, title, children, className }: CaseSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-52 border-b border-border bg-background p-6 lg:p-12 motion-safe:scroll-smooth',
        className,
      )}
    >
      <div className="max-w-4xl space-y-5">
        <SectionTag index={index}>{title}</SectionTag>
        {children}
      </div>
    </section>
  )
}
