import { SectionShell } from '@/components/portfolio/ui/section-shell'
import { getPortfolioContent } from '@/content/portfolio'
import type { PortfolioLocale } from '@/content/portfolio/types'

type PortfolioCasePageProps = {
  locale: PortfolioLocale
}

const caseHeadings = {
  en: {
    overview: 'Overview',
    goals: 'Goals',
    stack: 'Stack',
    demonstrates: 'What it demonstrates',
    scope: 'Current scope and next steps',
    architecture: 'Architecture decisions',
    workflow: 'SDD / Spec Kit workflow',
  },
  uk: {
    overview: 'Огляд',
    goals: 'Цілі',
    stack: 'Стек',
    demonstrates: 'Що це демонструє',
    scope: 'Поточний scope і наступні кроки',
    architecture: 'Архітектурні рішення',
    workflow: 'SDD / Spec Kit workflow',
  },
} as const

function ListSection({ items }: { items: string[] }) {
  return (
    <ul className="portfolio-compact-list" role="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function PortfolioCasePage({ locale }: PortfolioCasePageProps) {
  const content = getPortfolioContent(locale)
  const labels = caseHeadings[locale]
  const { portfolioCmsCase } = content

  return (
    <article className="portfolio-stack">
      <section className="portfolio-section">
        <div className="portfolio-section__header">
          <p className="portfolio-section__eyebrow">{portfolioCmsCase.slug}</p>
          <h1 className="portfolio-section__title portfolio-section__title--compact">Portfolio CMS</h1>
          <p className="portfolio-section__intro">{portfolioCmsCase.overview[0]}</p>
        </div>
      </section>

      <SectionShell title={labels.overview}>
        <ListSection items={portfolioCmsCase.overview} />
      </SectionShell>

      <SectionShell title={labels.goals}>
        <ListSection items={portfolioCmsCase.goals} />
      </SectionShell>

      <SectionShell title={labels.stack}>
        <ul className="portfolio-inline-list" role="list">
          {portfolioCmsCase.stack.map((item) => (
            <li className="portfolio-chip" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell title={labels.demonstrates}>
        <ListSection items={portfolioCmsCase.demonstrates} />
      </SectionShell>

      <SectionShell title={labels.scope}>
        <ListSection items={portfolioCmsCase.currentScope} />
      </SectionShell>

      <SectionShell title={labels.architecture}>
        <ListSection items={portfolioCmsCase.architectureDecisions} />
      </SectionShell>

      <SectionShell intro={portfolioCmsCase.workflow.summary} title={labels.workflow}>
        <ListSection items={portfolioCmsCase.workflow.steps} />
      </SectionShell>
    </article>
  )
}
