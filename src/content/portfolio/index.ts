import { portfolioContentEn } from './en'
import { portfolioContentUk } from './uk'
import { type LocalePortfolioContent, type PortfolioLocale } from './types'

import { getPortfolioLocaleOrThrow } from '@/lib/portfolio/routes'

export * from './types'

const portfolioContentByLocale: Record<PortfolioLocale, LocalePortfolioContent> = {
  en: portfolioContentEn,
  uk: portfolioContentUk,
}

export function getPortfolioContent(locale: PortfolioLocale): LocalePortfolioContent {
  return portfolioContentByLocale[locale]
}

export function getPortfolioContentFromParam(locale: string): LocalePortfolioContent {
  return getPortfolioContent(getPortfolioLocaleOrThrow(locale))
}
