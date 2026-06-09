'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { defaultThemeId, themeIds } from '@/config/themes'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={defaultThemeId}
      themes={[...themeIds]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
