'use client'

import { Palette } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { MonoLabel } from '@/components/ui/mono-label'
import { brutalistSwitcherClasses, type BrutalistSwitcherVariant } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const THEMES = [
  { id: 'light', swatch: 'bg-[#f9f9f9] border-[#e2e8f0]' },
  { id: 'dark', swatch: 'bg-[#0a0a0a] border-[#262626]' },
  { id: 'warm', swatch: 'bg-[#f4f1ea] border-[#ded9d1]' },
  { id: 'contrast', swatch: 'bg-[#ffffff] border-black border-2' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

type ThemeSwitcherProps = {
  variant?: BrutalistSwitcherVariant
  showSection?: boolean
}

export function ThemeSwitcher({ variant = 'sidebar', showSection = false }: ThemeSwitcherProps) {
  const t = useTranslations('themes')
  const tLabels = useTranslations('labels')
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()

  const activeTheme = (mounted ? theme ?? resolvedTheme : 'light') as ThemeId

  if (!mounted) {
    return (
      <div className="grid w-full grid-cols-2 gap-1" aria-hidden>
        {THEMES.map((item) => (
          <div key={item.id} className="h-[34px] w-full rounded-none border border-border bg-surface" />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      {showSection ? (
        <div className="mb-2 flex w-full flex-col items-center justify-center gap-1.5 text-center">
          <MonoLabel size="sm" className="flex items-center justify-center gap-1">
            <Palette size={11} aria-hidden />
            {tLabels('theme')}
          </MonoLabel>
          <MonoLabel size="sm" variant="foreground">
            [{activeTheme.toUpperCase()}]
          </MonoLabel>
        </div>
      ) : null}

      <div className="grid w-full grid-cols-2 gap-1" role="group" aria-label={tLabels('theme')}>
        {THEMES.map((item) => {
          const isActive = activeTheme === item.id

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              aria-label={t(item.id)}
              onClick={() => setTheme(item.id)}
              className={brutalistSwitcherClasses(
                isActive,
                variant,
                'flex w-full min-w-0 items-center justify-center gap-1.5',
              )}
            >
              <span className={cn('block h-2 w-2 shrink-0 rounded-none border', item.swatch)} />
              <span className="truncate">{t(item.id)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
