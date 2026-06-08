import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { ThemeProviderScript } from '@/components/portfolio/theme/theme-provider-script'
import { ThemeSwitcher } from '@/components/portfolio/theme/theme-switcher'
import { getPortfolioContent } from '@/content/portfolio'
import {
  defaultPortfolioTheme,
} from '@/lib/portfolio/theme'
import {
  getPortfolioCasePath,
  getPortfolioHomePath,
  getPortfolioResumePath,
  getPortfolioRouteParams,
  isPortfolioLocale,
  type PortfolioLocale,
} from '@/lib/portfolio/routes'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    lang: string
  }>
}

function getLocaleSwitchTarget(locale: PortfolioLocale) {
  return locale === 'en' ? 'uk' : 'en'
}

export function generateStaticParams() {
  return getPortfolioRouteParams()
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    notFound()
  }

  const locale = lang
  const content = getPortfolioContent(locale)
  const alternateLocale = getLocaleSwitchTarget(locale)

  return (
    <>
      <ThemeProviderScript />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="portfolio-shell">
        <header className="portfolio-header print:hidden">
          <div className="portfolio-header__identity">
            <Link className="portfolio-wordmark" href={getPortfolioHomePath(locale)}>
              Maksym Zakaliuzhnyi
            </Link>
            <p className="portfolio-header__tagline">{content.home.hero.availability}</p>
          </div>

          <div className="portfolio-header__controls">
            <nav aria-label="Primary" className="portfolio-nav">
              <Link href={getPortfolioHomePath(locale)}>Home</Link>
              <Link href={getPortfolioResumePath(locale)}>{content.shared.labels.resumeLabel}</Link>
              <Link href={getPortfolioCasePath(locale)}>Portfolio CMS</Link>
            </nav>

            <div className="portfolio-locale-switcher print:hidden" aria-label="Language switcher">
              <span className="portfolio-chip">{locale.toUpperCase()}</span>
              <Link href={getPortfolioHomePath(alternateLocale)} lang={alternateLocale}>
                {alternateLocale.toUpperCase()}
              </Link>
            </div>

            <ThemeSwitcher
              label="Theme"
              options={content.shared.themeOptions}
              value={defaultPortfolioTheme}
            />
          </div>
        </header>

        <main className="portfolio-main" id="content" tabIndex={-1}>
          {children}
        </main>

        <footer className="portfolio-footer print:hidden">
          <p>{content.home.contactSection.location}</p>
          <p>{content.home.contactSection.availability}</p>
        </footer>
      </div>
    </>
  )
}
