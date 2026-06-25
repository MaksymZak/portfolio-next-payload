import * as React from 'react'

import { cn } from '@/lib/cn'

type SectionTagProps = React.ComponentProps<'div'> & {
  index: number
}

function SectionTag({ index, className, children, ...props }: SectionTagProps) {
  const formattedIndex = `[${String(index).padStart(2, '0')}]`

  return (
    <div
      data-slot="section-tag"
      className={cn(
        'flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    >
      <span className="text-primary">{formattedIndex}</span>
      <span aria-hidden className="block h-px w-4 shrink-0 bg-border" />
      <span>{children}</span>
    </div>
  )
}

export { SectionTag }
