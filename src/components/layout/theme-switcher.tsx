'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/cn'

const THEMES = [
  { id: 'light', swatch: 'bg-[#f9f9f9] border-[#e2e8f0]' },
  { id: 'dark', swatch: 'bg-[#0a0a0a] border-[#262626]' },
  { id: 'warm', swatch: 'bg-[#f4f1ea] border-[#ded9d1]' },
  { id: 'contrast', swatch: 'bg-[#ffffff] border-black border-2' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

const switcherButtonClass = (isActive: boolean) =>
  cn(
    'flex items-center justify-center gap-1.5 rounded-none border p-2.5 text-center font-mono text-[9px] leading-tight font-bold motion-safe:transition-[transform,box-shadow,background-color,color,border-color]',
    isActive
      ? '-translate-x-[1px] -translate-y-[1px] border-foreground bg-foreground text-background shadow-[2px_2px_0px_0px_var(--foreground)]'
      : 'border-border bg-background text-muted-foreground motion-safe:hover:-translate-x-[1px] motion-safe:hover:-translate-y-[1px] motion-safe:hover:border-foreground motion-safe:hover:text-foreground motion-safe:hover:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none',
  )

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
            onClick={() => setTheme(item.id)}
            className={switcherButtonClass(isActive)}
          >
            <span className={cn('block h-1.5 w-1.5 shrink-0 rounded-none border', item.swatch)} />
            <span className="truncate">{t(item.id)}</span>
          </button>
        )
      })}
    </div>
  )
}
