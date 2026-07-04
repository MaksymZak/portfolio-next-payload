'use client'

import { Palette } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { MonoLabel } from '@/components/ui/mono-label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { brutalistSwitcherClasses, type BrutalistSwitcherVariant } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const THEME_TOOLTIP_DELAY_MS = 200

/** Must match ThemeProvider defaultTheme — stable SSR/hydration fallback before useTheme initializes. */
const DEFAULT_THEME = 'light' as const

const THEMES = [
  { id: 'light', shortLabel: 'LT', swatch: 'bg-[#f9f9f9] border-[#e2e8f0]' },
  { id: 'dark', shortLabel: 'DK', swatch: 'bg-[#0a0a0a] border-[#262626]' },
  { id: 'warm', shortLabel: 'WM', swatch: 'bg-[#f4f1ea] border-[#ded9d1]' },
  { id: 'contrast', shortLabel: 'CT', swatch: 'bg-[#ffffff] border-black border-2' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

type ThemeSwitcherProps = {
  variant?: BrutalistSwitcherVariant
  showSection?: boolean
}

export function ThemeSwitcher({ variant = 'sidebar', showSection = false }: ThemeSwitcherProps) {
  const t = useTranslations('themes')
  const tLabels = useTranslations('labels')
  const { theme, setTheme, resolvedTheme } = useTheme()

  const activeTheme = (theme ?? resolvedTheme ?? DEFAULT_THEME) as ThemeId
  const isSidebar = variant === 'sidebar'

  const handleSelect = (nextTheme: ThemeId) => {
    if (process.env.NODE_ENV === 'development' && nextTheme !== activeTheme) {
      console.debug('[ThemeSwitcher] theme changed', { from: activeTheme, to: nextTheme })
    }
    setTheme(nextTheme)
  }

  const buttons = THEMES.map((item) => {
    const isActive = activeTheme === item.id

    const button = (
      <button
        key={item.id}
        type="button"
        aria-pressed={isActive}
        aria-label={t(item.id)}
        onClick={() => handleSelect(item.id)}
        className={brutalistSwitcherClasses(
          isActive,
          variant,
          'flex w-full min-w-0 items-center justify-center gap-1.5',
        )}
      >
        <span className={cn('block h-2 w-2 shrink-0 rounded-none border', item.swatch)} />
        <span className="truncate">{isSidebar ? item.shortLabel : t(item.id)}</span>
      </button>
    )

    if (!isSidebar) return button

    return (
      <Tooltip key={item.id}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{t(item.id)}</TooltipContent>
      </Tooltip>
    )
  })

  return (
    <div className="w-full">
      {showSection ? (
        <div className="mb-2 flex w-full  items-center  gap-1.5 text-center">
          <MonoLabel size="sm" className="flex items-center justify-center gap-1">
            <Palette size={12} aria-hidden />
            {tLabels('theme')}
          </MonoLabel>
          <MonoLabel size="sm" variant="foreground">
            [{activeTheme.toUpperCase()}]
          </MonoLabel>
        </div>
      ) : null}

      <div
        className={cn('grid w-full gap-1', isSidebar ? 'grid-cols-4' : 'grid-cols-2')}
        role="group"
        aria-label={tLabels('theme')}
      >
        {isSidebar ? (
          <TooltipProvider delayDuration={THEME_TOOLTIP_DELAY_MS}>{buttons}</TooltipProvider>
        ) : (
          buttons
        )}
      </div>
    </div>
  )
}
