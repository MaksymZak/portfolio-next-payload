'use client'

import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getHomeAnchor, navItems } from '@/config/site'
import type { Locale } from '@/i18n/routing'

import { LocaleSwitcher } from './locale-switcher'
import { ThemeSwitcher } from './theme-switcher'

export function MobileNav({ locale }: { locale: Locale }) {
  const t = useTranslations('Nav')
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label={t('openMenu')}>
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm">{t('menuTitle')}</SheetTitle>
        </SheetHeader>

        <nav aria-label={t('ariaLabel')} className="flex flex-col px-4">
          {navItems.map((item) => (
            <SheetClose asChild key={item.section}>
              <a
                href={getHomeAnchor(locale, item.section)}
                className="border-b border-border py-3 text-sm text-foreground"
              >
                {t(item.messageKey)}
              </a>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <a
              href={getHomeAnchor(locale, 'resume')}
              className="mt-4 bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              {t('downloadCv')}
            </a>
          </SheetClose>
        </nav>

        <div className="mt-auto flex items-center gap-2 px-4 pb-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  )
}
