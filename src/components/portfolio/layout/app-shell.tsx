import type { ReactNode } from 'react'

import type { Locale } from '@/i18n/routing'

import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { SkipToContent } from './skip-to-content'

export function AppShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <>
      <SkipToContent />
      <div className="flex min-h-dvh flex-col">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
