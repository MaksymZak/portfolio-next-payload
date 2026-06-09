import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

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

export default async function FrontendRootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
