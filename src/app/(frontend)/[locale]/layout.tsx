import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { AppShell } from '@/components/portfolio/layout/app-shell'
import { siteName } from '@/config/site'
import { routing } from '@/i18n/routing'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: 'Hiring-focused portfolio built with Next.js, React, and a typed content layer.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <NextIntlClientProvider>
      <AppShell locale={locale}>{children}</AppShell>
    </NextIntlClientProvider>
  )
}
