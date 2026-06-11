import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { HomePage as HomePageSections } from '@/components/portfolio/sections/home-page'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return <HomePageSections locale={locale} />
}
