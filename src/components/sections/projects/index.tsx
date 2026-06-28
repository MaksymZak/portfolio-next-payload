import { getTranslations } from 'next-intl/server'

import { MonoLabel } from '@/components/ui/mono-label'
import { SectionTag } from '@/components/ui/section-tag'
import { HOME_SECTION_SCROLL_MT } from '@/lib/home-scroll'
import type { Project } from '@/payload-types'

import { ProjectCard } from './project-card'
import { cn } from '@/lib/cn'

type ProjectsProps = {
  projects: Project[]
}

export async function Projects({ projects }: ProjectsProps) {
  const [tNav, tActions] = await Promise.all([getTranslations('nav'), getTranslations('actions')])

  const sectionTitle = tNav('projects').replace(/^\d+\s+/, '')
  const actions = {
    viewTelemetry: tActions('viewTelemetry'),
    hideTelemetry: tActions('hideTelemetry'),
    readDoc: tActions('readDoc'),
  }

  return (
    <section id="projects" className={cn('border-b border-border bg-surface p-6 lg:p-12', HOME_SECTION_SCROLL_MT)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <SectionTag index={3}>{sectionTitle}</SectionTag>
          <MonoLabel size="sm" className="tracking-wider">
            NODES: {projects.length}
          </MonoLabel>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              actions={actions}
              isFlagship={project.label === 'live'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
