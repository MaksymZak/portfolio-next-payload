import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PortfolioCasePage } from '@/components/portfolio/sections/portfolio-case-page'
import { getPortfolioContent } from '@/content/portfolio'
import { buildPortfolioMetadata } from '@/lib/portfolio/metadata'
import { isPortfolioLocale } from '@/lib/portfolio/routes'

type PortfolioCasePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: PortfolioCasePageProps): Promise<Metadata> {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    return {}
  }

  const locale = lang
  const content = getPortfolioContent(locale)

  return buildPortfolioMetadata(locale, content.portfolioCmsCase.meta)
}

export default async function PortfolioCmsCasePage({ params }: PortfolioCasePageProps) {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    notFound()
  }

  const locale = lang

  return <PortfolioCasePage locale={locale} />
}
