import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

import type { ReactNode } from 'react'

import './globals.css'

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
  return (
    <html lang={'uk'} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
