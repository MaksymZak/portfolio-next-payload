'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

type ThemeProviderProps = {
  children: ReactNode
}

/**
 * next-themes injects a blocking theme script. On the client (e.g. locale switch),
 * React 19 warns because inline scripts in client trees are not executed.
 * SSR keeps the default script type; client navigations use application/json
 * so React skips execution without a console warning — theme is already applied.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const scriptProps =
    typeof window === 'undefined' ? undefined : ({ type: 'application/json' } as const)

  return (
    <NextThemesProvider
      attribute="data-theme"
      themes={['light', 'dark', 'warm', 'contrast']}
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  )
}
