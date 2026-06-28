import type { Metadata } from 'next'
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { SkipLink } from '@/components/layout/skip-link'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { routing } from '@/i18n/routing'
import { buildPageMetadata, buildSiteName, getSiteUrl } from '@/lib/metadata'
import { getHome, getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

import '../globals.css'

const sans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mono',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const dataLocale = locale as DataLocale
  const [settings, home] = await Promise.all([getSettings(dataLocale), getHome(dataLocale)])

  return {
    metadataBase: new URL(getSiteUrl()),
    ...buildPageMetadata({
      locale,
      title: buildSiteName(settings),
      description: home.hero.copy,
      siteName: settings.name,
    }),
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} motion-safe:scroll-smooth`}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SkipLink />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
