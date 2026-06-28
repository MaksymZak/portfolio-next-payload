'use client'

import { useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { locales } from '@/i18n/routing'
import { brutalistSwitcherClasses, type BrutalistSwitcherVariant } from '@/lib/brutalist-motion'

type Locale = (typeof locales)[number]

const LOCALE_OPTIONS: { id: Locale; label: string }[] = [
  { id: 'en', label: 'ENGLISH [EN]' },
  { id: 'uk', label: 'УКРАЇНСЬКА [UK]' },
]

type LocaleSwitcherProps = {
  variant?: BrutalistSwitcherVariant
}

export function LocaleSwitcher({ variant = 'sidebar' }: LocaleSwitcherProps) {
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
            className={brutalistSwitcherClasses(isActive, variant)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
