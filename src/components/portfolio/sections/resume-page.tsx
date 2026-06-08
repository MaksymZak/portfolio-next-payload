import { SectionShell } from '@/components/portfolio/ui/section-shell'
import { PrintResumeButton } from '@/components/portfolio/ui/print-resume-button'
import { getPortfolioContent } from '@/content/portfolio'
import type { PortfolioLocale } from '@/content/portfolio/types'

type ResumePageContentProps = {
  locale: PortfolioLocale
}

const resumeHeadings = {
  en: {
    positioning: 'Positioning summary',
    skills: 'Core skills',
    experience: 'Experience summary',
    projects: 'Selected projects',
    contacts: 'Contacts',
    print: 'Print resume',
  },
  uk: {
    positioning: 'Позиціонування',
    skills: 'Ключові навички',
    experience: 'Досвід',
    projects: 'Обрані проєкти',
    contacts: 'Контакти',
    print: 'Друкувати резюме',
  },
} as const

export function ResumePage({ locale }: ResumePageContentProps) {
  const content = getPortfolioContent(locale)
  const labels = resumeHeadings[locale]

  return (
    <article className="portfolio-stack portfolio-resume">
      <section className="portfolio-section portfolio-resume__hero">
        <div className="portfolio-resume__hero-copy">
          <p className="portfolio-section__eyebrow">{content.resume.header.role}</p>
          <h1 className="portfolio-section__title portfolio-section__title--compact">{content.resume.header.name}</h1>
          <p className="portfolio-section__intro">{content.resume.header.summary}</p>
          <p className="portfolio-card__meta">{content.resume.header.location}</p>
        </div>
        <PrintResumeButton label={labels.print} />
      </section>

      <SectionShell title={labels.positioning}>
        <ul className="portfolio-compact-list" role="list">
          {content.resume.positioningSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell title={labels.skills}>
        <ul className="portfolio-inline-list" role="list">
          {content.resume.coreSkills.map((skill) => (
            <li className="portfolio-chip" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell title={labels.experience}>
        <ul className="portfolio-compact-list" role="list">
          {content.resume.experienceSummary.map((item) => (
            <li className="portfolio-card" key={item.company}>
              <p className="portfolio-card__meta">
                {item.role} · {item.period}
              </p>
              <h3 className="portfolio-card__title">{item.company}</h3>
              <ul className="portfolio-compact-list" role="list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell title={labels.projects}>
        <ul className="portfolio-compact-list" role="list">
          {content.resume.selectedProjects.map((project) => (
            <li key={project.id}>
              <strong>{project.title}</strong> — {project.proof}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell title={labels.contacts}>
        <ul className="portfolio-compact-list" role="list">
          {content.resume.contacts
            .filter((contact) => contact.showOnResume)
            .sort((left, right) => left.priority - right.priority)
            .map((contact) => (
              <li key={contact.id}>
                {contact.label}: {contact.value}
              </li>
            ))}
        </ul>
      </SectionShell>
    </article>
  )
}
