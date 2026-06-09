import { getHomeContent } from '@/content/portfolio/home'
import type { Locale } from '@/i18n/routing'

import { CommercialProof } from './commercial-proof'
import { ContactSection } from './contact-section'
import { CoreSkills } from './core-skills'
import { HomeHero } from './home-hero'
import { ProofMetrics } from './proof-metrics'
import { SelectedProjects } from './selected-projects'

export function HomePage({ locale }: { locale: Locale }) {
  const content = getHomeContent(locale)

  return (
    <>
      <HomeHero hero={content.hero} />
      <ProofMetrics metrics={content.metrics} />
      <CoreSkills skills={content.skills} />
      <SelectedProjects id="work" projects={content.projects} />
      <CommercialProof id="experience" commercial={content.commercial} />
      <ContactSection id="contact" contact={content.contact} />
    </>
  )
}
