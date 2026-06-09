import { ArrowUpRight } from 'lucide-react'

import type { HomeContent, ProjectCard } from '@/content/portfolio/home'
import { cn } from '@/lib/cn'

import { SectionShell } from './section-shell'

function StatusBadge({ card }: { card: ProjectCard }) {
  const isImplemented = card.status === 'implemented'
  return (
    <span
      className={cn(
        'inline-block border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em]',
        isImplemented
          ? 'border-primary text-primary'
          : 'border-border text-muted-foreground',
      )}
    >
      {card.statusLabel}
    </span>
  )
}

function CardBody({ card }: { card: ProjectCard }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
        {card.href ? (
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        ) : null}
      </div>
      <StatusBadge card={card} />
      <p className="mt-4 text-sm text-foreground">{card.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">{card.proof}</p>
    </>
  )
}

export function SelectedProjects({
  id,
  projects,
}: {
  id?: string
  projects: HomeContent['projects']
}) {
  return (
    <SectionShell
      id={id}
      eyebrow={projects.eyebrow}
      title={projects.title}
      intro={projects.intro}
    >
      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
        {projects.cards.map((card) =>
          card.href ? (
            <a
              key={card.id}
              href={card.href}
              className="group flex flex-col bg-surface p-6 transition-colors hover:bg-surface-muted"
            >
              <CardBody card={card} />
            </a>
          ) : (
            <div key={card.id} className="flex flex-col bg-surface p-6" aria-disabled="true">
              <CardBody card={card} />
            </div>
          ),
        )}
      </div>
    </SectionShell>
  )
}
