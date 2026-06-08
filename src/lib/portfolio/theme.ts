import { portfolioThemeIds, type PortfolioThemeId } from '@/content/portfolio/types'

export const portfolioThemeStorageKey = 'portfolio-theme'
export const portfolioThemeChangeEvent = 'portfolio-theme-change'
export const defaultPortfolioTheme: PortfolioThemeId = 'light'

export function isPortfolioThemeId(value: string): value is PortfolioThemeId {
  return portfolioThemeIds.includes(value as PortfolioThemeId)
}

export function normalizePortfolioTheme(value: string | null | undefined): PortfolioThemeId {
  if (value && isPortfolioThemeId(value)) {
    return value
  }

  return defaultPortfolioTheme
}

export function applyPortfolioTheme(value: string | null | undefined) {
  const normalizedTheme = normalizePortfolioTheme(value)

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = normalizedTheme
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(portfolioThemeStorageKey, normalizedTheme)
    window.dispatchEvent(new Event(portfolioThemeChangeEvent))
  }

  return normalizedTheme
}
