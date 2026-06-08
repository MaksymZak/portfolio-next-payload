import { describe, expect, it } from 'vitest'

import { getPortfolioContent } from '@/content/portfolio'
import { portfolioLocales } from '@/content/portfolio/types'

describe('portfolio content', () => {
  it('keeps required locales in parity for route-bearing structures', () => {
    const [en, uk] = portfolioLocales.map((locale) => getPortfolioContent(locale))

    expect(en.home.proofMetrics).toHaveLength(3)
    expect(uk.home.proofMetrics).toHaveLength(3)

    expect(en.home.commercialProof.examples).toHaveLength(6)
    expect(uk.home.commercialProof.examples).toHaveLength(6)

    expect(en.home.selectedProjects).toHaveLength(3)
    expect(uk.home.selectedProjects).toHaveLength(3)

    expect(en.home.selectedProjects.map((item) => item.id)).toEqual(
      uk.home.selectedProjects.map((item) => item.id),
    )

    expect(en.resume.contacts.map((item) => item.id)).toEqual(
      uk.resume.contacts.map((item) => item.id),
    )

    expect(en.portfolioCmsCase.stack).toHaveLength(6)
    expect(uk.portfolioCmsCase.stack).toHaveLength(6)
    expect(en.portfolioCmsCase.workflow.steps).toHaveLength(3)
    expect(uk.portfolioCmsCase.workflow.steps).toHaveLength(3)
  })

  it('preserves public-safety and coming-next rules', () => {
    const en = getPortfolioContent('en')

    expect(en.home.selectedProjects.filter((item) => item.isNavigable)).toEqual([
      expect.objectContaining({ id: 'portfolio-cms' }),
    ])

    expect(
      en.home.selectedProjects.filter((item) => item.status === 'coming-next').every((item) => item.href === null),
    ).toBe(true)

    expect(en.resume.contacts.find((item) => item.id === 'github')?.href).toContain('github.com/MaksymZak')
  })
})
