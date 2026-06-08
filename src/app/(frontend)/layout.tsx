import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import './styles.css'

import { defaultPortfolioTheme } from '@/lib/portfolio/theme'
import { defaultPortfolioLocale, isPortfolioLocale } from '@/lib/portfolio/routes'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Maksym Zakaliuzhnyi',
    template: '%s',
  },
  description: 'Hiring-focused portfolio built with Next.js, React, and a typed content layer.',
}

type RootLayoutProps = {
  children: ReactNode
  params: Promise<{
    lang?: string
  }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const resolvedParams = await params
  const lang =
    resolvedParams?.lang && isPortfolioLocale(resolvedParams.lang)
      ? resolvedParams.lang
      : defaultPortfolioLocale

  return (
    <html
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      data-theme={defaultPortfolioTheme}
      lang={lang}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
