import { ArrowUpRight } from 'lucide-react'

import type { HomeContent } from '@/content/portfolio/home'

import { SectionShell } from './section-shell'

export function CommercialProof({
  id,
  commercial,
}: {
  id?: string
  commercial: HomeContent['commercial']
}) {
  return (
    <SectionShell
      id={id}
      eyebrow={commercial.eyebrow}
      title={commercial.title}
      intro={commercial.intro}
    >
      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {commercial.examples.map((example) => (
          <a
            key={example.id}
            href={example.outboundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-surface p-6 transition-colors hover:bg-surface-muted"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {example.type}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{example.title}</h3>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <p className="mt-4 text-sm text-foreground">{example.summary}</p>
            <p className="mt-auto pt-4 font-mono text-xs text-muted-foreground">{example.role}</p>
          </a>
        ))}
      </div>
    </SectionShell>
  )
}
