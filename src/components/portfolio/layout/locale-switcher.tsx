'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const active = useLocale()
  const t = useTranslations('Locale')

  return (
    <div
      role="group"
      aria-label={t('switchLabel')}
      className="flex items-center border border-border"
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === active
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'px-2.5 py-1 font-mono text-xs uppercase tracking-wide transition-colors',
              index > 0 && 'border-l border-border',
              isActive
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t(locale)}
          </Link>
        )
      })}
    </div>
  )
}
