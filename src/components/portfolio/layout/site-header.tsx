import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { getHomeAnchor, navItems, siteName } from '@/config/site'
import type { Locale } from '@/i18n/routing'

import { LocaleSwitcher } from './locale-switcher'
import { MobileNav } from './mobile-nav'
import { ThemeSwitcher } from './theme-switcher'

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations('Nav')

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <a
          href={`/${locale}`}
          className="font-mono text-sm font-semibold tracking-tight transition-colors hover:text-primary"
        >
          {siteName}
        </a>

        <nav aria-label={t('ariaLabel')} className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.section}>
                <a
                  href={getHomeAnchor(locale, item.section)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(item.messageKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Button asChild size="sm">
              <a href={getHomeAnchor(locale, 'resume')}>{t('downloadCv')}</a>
            </Button>
          </div>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  )
}
