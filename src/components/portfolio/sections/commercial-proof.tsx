import type { CommercialProofBlock } from '@/content/portfolio/types'

type CommercialProofProps = {
  content: CommercialProofBlock
}

export function CommercialProof({ content }: CommercialProofProps) {
  return (
    <section className="portfolio-section" data-testid="commercial-proof">
      <header className="portfolio-section__header">
        <h2 className="portfolio-section__title portfolio-section__title--compact">{content.title}</h2>
        <p className="portfolio-section__intro">{content.intro}</p>
      </header>

      <ul className="portfolio-card-grid" role="list">
        {content.examples.map((example) => {
          const body = (
            <>
              <p className="portfolio-card__meta">
                {example.type} · {example.roleLabel}
              </p>
              <h3 className="portfolio-card__title">{example.title}</h3>
              <p>{example.summary}</p>
              <span className="portfolio-chip">{example.mode === 'visual' ? 'Visual preview' : 'Text-led proof'}</span>
            </>
          )

          return (
            <li className="portfolio-card" data-testid="commercial-proof-card" key={example.id}>
              {example.outboundUrl && example.status === 'available' ? (
                <a href={example.outboundUrl} rel="noreferrer" target="_blank">
                  {body}
                </a>
              ) : (
                body
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
