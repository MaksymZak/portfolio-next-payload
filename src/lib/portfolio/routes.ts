import { portfolioLocales, type PortfolioLocale } from '@/content/portfolio/types'

export { portfolioLocales }
export type { PortfolioLocale }

export const defaultPortfolioLocale: PortfolioLocale = 'en'
export const portfolioCaseSlug = 'portfolio-cms'

export function isPortfolioLocale(value: string): value is PortfolioLocale {
  return portfolioLocales.includes(value as PortfolioLocale)
}

export function getPortfolioLocaleOrThrow(value: string): PortfolioLocale {
  if (!isPortfolioLocale(value)) {
    throw new Error(`Unsupported portfolio locale: ${value}`)
  }

  return value
}

export function getPortfolioHomePath(locale: PortfolioLocale): string {
  return `/${locale}`
}

export function getPortfolioResumePath(locale: PortfolioLocale): string {
  return `/${locale}/resume`
}

export function getPortfolioCasePath(locale: PortfolioLocale): string {
  return `/${locale}/projects/${portfolioCaseSlug}`
}

export function getPortfolioRouteParams(): { lang: PortfolioLocale }[] {
  return portfolioLocales.map((lang) => ({ lang }))
}

export function getAlternatePortfolioPaths(pathForLocale: Record<PortfolioLocale, string>) {
  return {
    en: pathForLocale.en,
    uk: pathForLocale.uk,
    'x-default': pathForLocale[defaultPortfolioLocale],
  }
}
