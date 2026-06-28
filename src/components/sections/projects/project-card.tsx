'use client'

import { BookOpen, Terminal } from 'lucide-react'
import { useCallback, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MonoLabel } from '@/components/ui/mono-label'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import type { Project } from '@/payload-types'

type ProjectCardActions = {
  viewTelemetry: string
  hideTelemetry: string
  readDoc: string
}

type ProjectCardProps = {
  project: Project
  actions: ProjectCardActions
  isFlagship?: boolean
}

function formatNodeId(slug: string) {
  return `NODE_${slug.toUpperCase()}`
}

function formatLabel(label: Project['label']) {
  return label === 'live' ? 'LIVE' : 'ROADMAP'
}

export function ProjectCard({ project, actions, isFlagship = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const panelId = `telemetry-${project.slug}`

  const toggleTelemetry = useCallback(() => {
    setIsExpanded((current) => !current)
  }, [])

  const highlights = project.highlights ?? []
  const stack = project.stack ?? []
  const isLive = project.label === 'live'
  const hasTelemetry = highlights.length > 0 || stack.length > 0 || Boolean(project.metrics)

  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200',
        isExpanded
          ? 'z-10 -translate-x-px -translate-y-px border-foreground shadow-[6px_6px_0_var(--foreground)]'
          : 'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:border-foreground motion-safe:hover:shadow-[6px_6px_0_var(--foreground)]',
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface-muted px-4 py-2 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 font-bold">
          <MonoLabel variant="accent" size="sm">
            {'//'}
          </MonoLabel>
          <MonoLabel variant="foreground" size="sm" className="tracking-wider">
            {formatNodeId(project.slug)}
          </MonoLabel>
        </div>
        <Badge
          size="sm"
          className={cn(
            isLive
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-surface text-muted-foreground',
          )}
        >
          {formatLabel(project.label)}
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="border-b border-border pb-3">
          <h3 className="font-mono text-base font-extrabold tracking-tight text-foreground uppercase">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase">
            ROLE: {project.role}{' '}
            <span aria-hidden className="mx-1.5 text-border">
              |
            </span>
            DATE: {project.period}
          </p>
        </div>

        <p className="text-sm leading-relaxed font-medium text-muted-foreground">{project.summary}</p>

        <div className="flex flex-wrap gap-4 pt-1 font-mono text-sm">
          {isFlagship ? (
            <Link
              href={`/case/${project.slug}`}
              className={cn(
                buttonVariants({ variant: 'primary', size: 'default' }),
                'px-4 py-2.5 tracking-widest',
              )}
            >
              <BookOpen size={12} aria-hidden />
              {actions.readDoc}
            </Link>
          ) : null}

          {hasTelemetry ? (
            <Button
              type="button"
              variant="secondary"
              size="default"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              className="border-2 border-foreground px-4 py-2.5 tracking-widest shadow-[2px_2px_0_0_var(--foreground)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-150 motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[3px_3px_0_0_var(--foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              onClick={toggleTelemetry}
            >
              <Terminal size={12} aria-hidden className="text-muted-foreground" />
              {isExpanded ? actions.hideTelemetry : actions.viewTelemetry}
            </Button>
          ) : null}
        </div>

        {hasTelemetry ? (
          <div
            id={panelId}
            role="region"
            aria-hidden={!isExpanded}
            className={cn(
              'grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-200 motion-reduce:transition-none',
              isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden">
              <div className="mt-4 space-y-5 border-t border-border pt-5">
                {project.metrics ? (
                  <div className="border-l-2 border-foreground bg-surface-muted px-2 py-1">
                    <MonoLabel variant="foreground" size="sm" className="tracking-widest">
                      {project.metrics}
                    </MonoLabel>
                  </div>
                ) : null}

                {highlights.length > 0 ? (
                  <ul className="ml-1 space-y-2">
                    {highlights.map((highlight, index) => (
                      <li
                        key={highlight.id ?? `${project.slug}-highlight-${index}`}
                        className="flex items-start gap-2.5 text-xs"
                      >
                        <MonoLabel variant="accent" size="sm" className="mt-0.5 shrink-0">
                          _0{index + 1}
                        </MonoLabel>
                        <span className="leading-relaxed font-medium text-foreground">
                          {highlight.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {stack.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stack.map((item, index) => (
                      <Badge
                        key={item.id ?? `${project.slug}-stack-${index}`}
                        variant="surface"
                        size="sm"
                      >
                        {item.name}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
