'use client'

import { Check, Palette } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { themes } from '@/config/themes'

const emptySubscribe = () => () => {}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Theme')
  // `false` on the server and first client render, `true` after hydration —
  // avoids a hydration mismatch on the active-theme checkmark without calling
  // setState inside an effect.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('label')}>
          <Palette className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t('label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map(({ id, messageKey }) => (
          <DropdownMenuItem
            key={id}
            onSelect={() => setTheme(id)}
            className="flex items-center justify-between gap-6"
          >
            {t(messageKey)}
            {mounted && theme === id ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
