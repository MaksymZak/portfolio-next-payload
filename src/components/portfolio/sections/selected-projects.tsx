import Link from 'next/link'

import type { SelectedProjectCard } from '@/content/portfolio/types'

type SelectedProjectsProps = {
  projects: SelectedProjectCard[]
  title: string
}

export function SelectedProjects({ projects, title }: SelectedProjectsProps) {
  return (
    <section className="portfolio-section" data-testid="selected-projects">
      <div className="portfolio-section__header">
        <h2 className="portfolio-section__title portfolio-section__title--compact">{title}</h2>
      </div>

      <ul className="portfolio-card-grid" role="list">
        {projects.map((project) => {
          const content = (
            <>
              <p className="portfolio-card__meta">{project.statusLabel}</p>
              <h3 className="portfolio-card__title">{project.title}</h3>
              <p>{project.summary}</p>
              <p>{project.proof}</p>
            </>
          )

          return (
            <li className="portfolio-card" data-testid="selected-project-card" key={project.id}>
              {project.isNavigable && project.href ? (
                <Link data-testid="selected-project-card-link" href={project.href}>
                  {content}
                </Link>
              ) : (
                <div>{content}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
