'use client'

import { Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useTransition } from 'react'

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
  const [isPending, startTransition] = useTransition()
  const prefetchedLocales = useRef(new Set<Locale>())
  const wasPending = useRef(false)

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) return

    if (process.env.NODE_ENV === 'development') {
      console.debug('[LocaleSwitcher] switch triggered', { from: locale, to: nextLocale })
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false })
    })
  }

  const handlePrefetch = (targetLocale: Locale) => {
    if (targetLocale === locale || prefetchedLocales.current.has(targetLocale)) return
    prefetchedLocales.current.add(targetLocale)

    if (process.env.NODE_ENV === 'development') {
      console.debug('[LocaleSwitcher] prefetch fired', { locale: targetLocale })
    }

    router.prefetch(pathname, { locale: targetLocale })
  }

  useEffect(() => {
    if (wasPending.current && !isPending && process.env.NODE_ENV === 'development') {
      console.debug('[LocaleSwitcher] transition settled', { locale })
    }
    wasPending.current = isPending
  }, [isPending, locale])

  return (
    <div className="w-full">
      {showSection ? (
        <div className="mb-2 flex w-full  items-center  gap-1.5 text-center">
          <MonoLabel size="sm" className="flex items-center justify-center gap-1">
            <Globe size={12} aria-hidden />
            {tLabels('locale')}
          </MonoLabel>
          <MonoLabel size="sm" variant="foreground">
            [{locale.toUpperCase()}]
          </MonoLabel>
        </div>
      ) : null}

      <div
        className="grid w-full grid-cols-2 gap-2"
        role="group"
        aria-label={tLabels('locale')}
        aria-busy={isPending}
      >
        {LOCALE_OPTIONS.map((item) => {
          const isActive = locale === item.id

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              aria-label={item.label}
              disabled={isPending}
              onClick={() => handleSwitch(item.id)}
              onPointerEnter={() => handlePrefetch(item.id)}
              onFocus={() => handlePrefetch(item.id)}
              className={cn(
                brutalistSwitcherClasses(
                  isActive,
                  variant,
                  'flex w-full min-w-0 items-center justify-center gap-1.5',
                ),
                isPending && 'pointer-events-none opacity-60',
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
