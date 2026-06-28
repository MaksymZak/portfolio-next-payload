'use client'

import { Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { MonoLabel } from '@/components/ui/mono-label'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales } from '@/i18n/routing'
import { brutalistSwitcherClasses, type BrutalistSwitcherVariant } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

type Locale = (typeof locales)[number]

const LOCALE_OPTIONS: { id: Locale; label: string; swatch: string }[] = [
  { id: 'en', label: 'ENGLISH [EN]', swatch: 'bg-[#1e3a8a] border-[#dc2626]' },
  { id: 'uk', label: 'УКРАЇНСЬКА [UK]', swatch: 'bg-[#005bbb] border-[#ffd500]' },
]

type LocaleSwitcherProps = {
  variant?: BrutalistSwitcherVariant
  showSection?: boolean
}

export function LocaleSwitcher({ variant = 'sidebar', showSection = false }: LocaleSwitcherProps) {
  const tLabels = useTranslations('labels')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div className="w-full">
      {showSection ? (
        <div className="mb-2 flex w-full flex-col items-center justify-center gap-1.5 text-center">
          <MonoLabel size="sm" className="flex items-center justify-center gap-1">
            <Globe size={11} aria-hidden />
            {tLabels('locale')}
          </MonoLabel>
          <MonoLabel size="sm" variant="foreground">
            [{locale.toUpperCase()}]
          </MonoLabel>
        </div>
      ) : null}

      <div className="grid w-full grid-cols-2 gap-1" role="group" aria-label={tLabels('locale')}>
        {LOCALE_OPTIONS.map((item) => {
          const isActive = locale === item.id

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              aria-label={item.label}
              onClick={() => handleSwitch(item.id)}
              className={brutalistSwitcherClasses(
                isActive,
                variant,
                'flex w-full min-w-0 items-center justify-center gap-1.5',
              )}
            >
              <span
                className={cn('block h-2 w-2 shrink-0 rounded-none border', item.swatch)}
                aria-hidden
              />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
