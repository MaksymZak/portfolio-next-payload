'use client'

import { useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { locales } from '@/i18n/routing'
import { cn } from '@/lib/cn'

type Locale = (typeof locales)[number]

const LOCALE_OPTIONS: { id: Locale; label: string }[] = [
  { id: 'en', label: 'ENGLISH [EN]' },
  { id: 'uk', label: 'УКРАЇНСЬКА [UK]' },
]

const switcherButtonClass = (isActive: boolean) =>
  cn(
    'rounded-none border p-2.5 text-center font-mono text-[9px] leading-tight font-bold motion-safe:transition-[transform,box-shadow,background-color,color,border-color]',
    isActive
      ? '-translate-x-[1px] -translate-y-[1px] border-foreground bg-foreground text-background shadow-[2px_2px_0px_0px_var(--foreground)]'
      : 'border-border bg-background text-muted-foreground motion-safe:hover:-translate-x-[1px] motion-safe:hover:-translate-y-[1px] motion-safe:hover:border-foreground motion-safe:hover:text-foreground motion-safe:hover:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none',
  )

export function LocaleSwitcher() {
  const tLabels = useTranslations('labels')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label={tLabels('locale')}>
      {LOCALE_OPTIONS.map((item) => {
        const isActive = locale === item.id

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            aria-label={item.label}
            onClick={() => handleSwitch(item.id)}
            className={switcherButtonClass(isActive)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
