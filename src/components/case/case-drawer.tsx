'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { ThemeSwitcher } from '@/components/layout/theme-switcher'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  brutalistDrawerDismissClasses,
  brutalistDrawerTriggerClasses,
  brutalistNavItemClasses,
} from '@/lib/brutalist-motion'
import { prefersReducedMotion, scrollToSectionTarget } from '@/lib/home-scroll'

import type { CaseIndexItem } from './index-nav'

const SCROLL_OFFSET = 220

type CaseDrawerProps = {
  items: CaseIndexItem[]
  indexTitle: string
  className?: string
}

export function CaseDrawer({ items, indexTitle, className }: CaseDrawerProps) {
  const tDrawer = useTranslations('drawer')
  const [open, setOpen] = useState(false)

  const handleNavigate = (id: string) => {
    setOpen(false)
    const delay = prefersReducedMotion() ? 0 : 200
    window.setTimeout(() => scrollToSectionTarget(id, SCROLL_OFFSET), delay)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label={tDrawer('menu')}
        className={brutalistDrawerTriggerClasses(className)}
      >
        {tDrawer('menu')}
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className="flex flex-1 flex-col gap-6 px-0.5 pt-0.5">
          <DrawerHeader className="flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <DrawerDescription>{tDrawer('registrar')}</DrawerDescription>
              <DrawerTitle>{tDrawer('title')}</DrawerTitle>
            </div>
            <DrawerClose className={brutalistDrawerDismissClasses()}>
              {tDrawer('close')}
            </DrawerClose>
          </DrawerHeader>

          <nav className="space-y-2" aria-label={indexTitle}>
            <p className="mb-2 block font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              {indexTitle}
            </p>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                aria-label={`${item.num} ${item.title}`}
                className={brutalistNavItemClasses(false, 'drawer')}
              >
                <span className="truncate">{item.title}</span>
                <span className="text-[10px] font-bold text-primary">[{item.num}]</span>
              </button>
            ))}
          </nav>

          <LocaleSwitcher variant="sidebar" showSection />
          <ThemeSwitcher variant="sidebar" showSection />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
