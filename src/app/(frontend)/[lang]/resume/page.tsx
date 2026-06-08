import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ResumePage as ResumePageSection } from '@/components/portfolio/sections/resume-page'
import { getPortfolioContent } from '@/content/portfolio'
import { buildPortfolioMetadata } from '@/lib/portfolio/metadata'
import { isPortfolioLocale } from '@/lib/portfolio/routes'

type ResumePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    return {}
  }

  const locale = lang
  const content = getPortfolioContent(locale)

  return buildPortfolioMetadata(locale, content.resume.meta)
}

export default async function ResumeRoutePage({ params }: ResumePageProps) {
  const { lang } = await params

  if (!isPortfolioLocale(lang)) {
    notFound()
  }

  const locale = lang

  return <ResumePageSection locale={locale} />
}
