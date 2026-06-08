import Link from 'next/link'

import type { HeroContent, PortfolioLocale } from '@/content/portfolio/types'
import { getPortfolioResumePath } from '@/lib/portfolio/routes'

type HomeHeroProps = {
  content: HeroContent
  locale: PortfolioLocale
}

export function HomeHero({ content, locale }: HomeHeroProps) {
  return (
    <section className="portfolio-hero" data-testid="home-hero">
      <div className="portfolio-hero__content">
        <p className="portfolio-section__eyebrow">{content.eyebrow}</p>
        <h1 className="portfolio-hero__title">{content.title}</h1>
        <p className="portfolio-hero__summary">{content.summary}</p>
        <p className="portfolio-lead">{content.availability}</p>
      </div>

      <div className="portfolio-actions">
        <Link className="portfolio-button portfolio-button--primary" href={getPortfolioResumePath(locale)}>
          {content.primaryCtaLabel}
        </Link>
        <a className="portfolio-button portfolio-button--secondary" href={content.secondaryCtaHref}>
          {content.secondaryCtaLabel}
        </a>
      </div>
    </section>
  )
}
