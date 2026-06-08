import { ContactSection } from '@/components/portfolio/sections/contact-section'
import { CommercialProof } from '@/components/portfolio/sections/commercial-proof'
import { CoreSkills } from '@/components/portfolio/sections/core-skills'
import { HomeHero } from '@/components/portfolio/sections/home-hero'
import { ProofMetrics } from '@/components/portfolio/sections/proof-metrics'
import { SelectedProjects } from '@/components/portfolio/sections/selected-projects'
import { getPortfolioContent } from '@/content/portfolio'
import type { PortfolioLocale } from '@/content/portfolio/types'

type HomePageProps = {
  locale: PortfolioLocale
}

export function HomePage({ locale }: HomePageProps) {
  const content = getPortfolioContent(locale)

  return (
    <div className="portfolio-stack">
      <HomeHero content={content.home.hero} locale={locale} />
      <ProofMetrics metrics={content.home.proofMetrics} />
      <CoreSkills skills={content.home.coreSkills} title="Core skills / stack" />
      <CommercialProof content={content.home.commercialProof} />
      <SelectedProjects projects={content.home.selectedProjects} title={content.shared.labels.selectedProjectsTitle} />
      <ContactSection content={content.home.contactSection} />
    </div>
  )
}
