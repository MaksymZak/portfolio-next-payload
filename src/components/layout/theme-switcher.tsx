'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { brutalistSwitcherClasses } from '@/lib/brutalist-motion'
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

export function ThemeSwitcher() {
  const t = useTranslations('themes')
  const tLabels = useTranslations('labels')
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()

  const activeTheme = (mounted ? theme ?? resolvedTheme : 'light') as ThemeId

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-1.5" aria-hidden>
        {THEMES.map((item) => (
          <div key={item.id} className="h-[34px] rounded-none border border-border bg-surface" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label={tLabels('theme')}>
      {THEMES.map((item) => {
        const isActive = activeTheme === item.id

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            aria-label={t(item.id)}
            onClick={() => setTheme(item.id)}
            className={brutalistSwitcherClasses(isActive, 'flex items-center justify-center gap-1.5')}
          >
            <span className={cn('block h-1.5 w-1.5 shrink-0 rounded-none border', item.swatch)} />
            <span className="truncate">{t(item.id)}</span>
          </button>
        )
      })}
    </div>
  )
}
