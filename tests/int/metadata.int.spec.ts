import { describe, expect, it } from 'vitest'

import { getPortfolioContent } from '@/content/portfolio'
import { buildPortfolioMetadata } from '@/lib/portfolio/metadata'
import { defaultPortfolioTheme, normalizePortfolioTheme } from '@/lib/portfolio/theme'

describe('portfolio metadata helpers', () => {
  it('builds alternate metadata for localized routes', () => {
    const en = getPortfolioContent('en')
    const metadata = buildPortfolioMetadata('en', en.home.meta)

    expect(metadata.title).toBe(en.home.meta.title)
    expect(metadata.alternates?.canonical).toBe('/en')
    expect(metadata.alternates?.languages).toEqual({
      en: '/en',
      uk: '/uk',
      'x-default': '/en',
    })
  })

  it('keeps route-level metadata localized for resume and case pages', () => {
    const uk = getPortfolioContent('uk')
    const resumeMetadata = buildPortfolioMetadata('uk', uk.resume.meta)
    const caseMetadata = buildPortfolioMetadata('uk', uk.portfolioCmsCase.meta)

    expect(resumeMetadata.title).toBe('Резюме | Максим Закалюжний')
    expect(resumeMetadata.alternates?.canonical).toBe('/uk/resume')
    expect(caseMetadata.title).toBe('Кейс Portfolio CMS | Максим Закалюжний')
    expect(caseMetadata.alternates?.canonical).toBe('/uk/projects/portfolio-cms')
  })

  it('normalizes unknown themes to the default theme', () => {
    expect(normalizePortfolioTheme('contrast')).toBe('contrast')
    expect(normalizePortfolioTheme('unknown')).toBe(defaultPortfolioTheme)
    expect(normalizePortfolioTheme(undefined)).toBe('light')
  })
})
