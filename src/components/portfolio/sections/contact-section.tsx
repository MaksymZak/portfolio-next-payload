import type { ContactSectionContent } from '@/content/portfolio/types'

type ContactSectionProps = {
  content: ContactSectionContent
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section className="portfolio-section" data-testid="contact-section" id="contact">
      <header className="portfolio-section__header">
        <h2 className="portfolio-section__title portfolio-section__title--compact">{content.title}</h2>
        <p className="portfolio-section__intro">{content.intro}</p>
      </header>

      <div className="portfolio-flow">
        <p className="portfolio-card__meta">
          {content.location} · {content.availability}
        </p>

        <ul className="portfolio-contact-list" role="list">
          {content.methods
            .filter((method) => method.showOnHome)
            .sort((left, right) => left.priority - right.priority)
            .map((method) => (
              <li key={method.id}>
                {method.href ? (
                  <a href={method.href} rel="noreferrer" target={method.href.startsWith('mailto:') ? undefined : '_blank'}>
                    <strong>{method.label}</strong>
                    <span>{method.value}</span>
                  </a>
                ) : (
                  <div>
                    <strong>{method.label}</strong>
                    <span>{method.value}</span>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
