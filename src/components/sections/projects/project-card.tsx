'use client'

import { BookOpen, Terminal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MonoLabel } from '@/components/ui/mono-label'
import { Link } from '@/i18n/navigation'
import { brutalistCardSelected } from '@/lib/brutalist-motion'
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

export function ProjectCard({ project, actions, isFlagship = false }: ProjectCardProps) {
  const t = useTranslations('projects')
  const [isExpanded, setIsExpanded] = useState(false)
  const panelId = `telemetry-${project.slug}`
  const toggleId = `telemetry-toggle-${project.slug}`

  const toggleTelemetry = useCallback(() => {
    setIsExpanded((current) => !current)
  }, [])

  const highlights = project.highlights ?? []
  const stack = project.stack ?? []
  const isLive = project.label === 'live'
  const hasTelemetry = highlights.length > 0 || stack.length > 0 || Boolean(project.metrics)

  return (
    <Card
      variant="interactive"
      className={cn('flex flex-col', isExpanded && cn('z-10', brutalistCardSelected))}
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
          {t(`status.${project.label ?? 'roadmap'}`)}
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="border-b border-border pb-3">
          <h3 className="font-mono text-base font-extrabold tracking-tight text-foreground uppercase">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase">
            {t('role')}: {project.role}{' '}
            <span aria-hidden className="mx-1.5 text-border">
              |
            </span>
            {t('date')}: {project.period}
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
              variant="plack"
              size="default"
              id={toggleId}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              className="px-4 py-2.5 tracking-widest"
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
            aria-labelledby={toggleId}
            aria-hidden={!isExpanded}
            inert={!isExpanded ? true : undefined}
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
