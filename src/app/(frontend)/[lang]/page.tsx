import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HomePage } from '@/components/portfolio/sections/home-page'
import { getPortfolioContent } from '@/content/portfolio'
import { buildPortfolioMetadata } from '@/lib/portfolio/metadata'
import { isPortfolioLocale } from '@/lib/portfolio/routes'

type HomePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    return {}
  }

  const locale = lang
  const content = getPortfolioContent(locale)

  return buildPortfolioMetadata(locale, content.home.meta)
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    notFound()
  }

  const locale = lang

  return <HomePage locale={locale} />
}
