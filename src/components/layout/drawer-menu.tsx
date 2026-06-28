'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { linkControlVariants } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MonoLabel } from '@/components/ui/mono-label'
import { Link } from '@/i18n/navigation'
import { brutalistDrawerTriggerClasses } from '@/lib/brutalist-motion'
import { prefersReducedMotion } from '@/lib/home-scroll'
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

import { LocaleSwitcher } from './locale-switcher'
import { Nav, type NavSectionId } from './nav'
import { StatusPanel } from './status-panel'
import { ThemeSwitcher } from './theme-switcher'

type DrawerMenuProps = {
  settings: Pick<Setting, 'location' | 'availability'>
  className?: string
}

export function DrawerMenu({ settings, className }: DrawerMenuProps) {
  const tActions = useTranslations('actions')
  const tDrawer = useTranslations('drawer')
  const tLabels = useTranslations('labels')
  const [open, setOpen] = useState(false)

  const handleNavigate = (_sectionId: NavSectionId, navigate: () => void) => {
    setOpen(false)
    const delay = prefersReducedMotion() ? 0 : 200
    window.setTimeout(navigate, delay)
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
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
          <DrawerHeader className="flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <DrawerDescription>{tDrawer('registrar')}</DrawerDescription>
              <DrawerTitle>{tDrawer('title')}</DrawerTitle>
            </div>
            <DrawerClose className="cursor-pointer rounded-none border border-border bg-background px-2.5 py-1 font-mono text-[10px] font-bold text-foreground motion-safe:transition-[transform,border-color] motion-safe:hover:border-foreground active:translate-y-px">
              {tDrawer('close')}
            </DrawerClose>
          </DrawerHeader>

          <Nav variant="drawer" onNavigate={handleNavigate} />

          <div className="border-t border-border pt-4">
            <DrawerClose asChild>
              <Link
                href="/resume"
                className={cn(linkControlVariants({ variant: 'secondary' }), 'flex w-full gap-2 px-3 py-3')}
              >
                <Download size={13} aria-hidden />
                {tActions('downloadCv')}
              </Link>
            </DrawerClose>
          </div>

          <div className="space-y-3">
            <MonoLabel size="sm">{tLabels('locale')}</MonoLabel>
            <LocaleSwitcher />
          </div>

          <div className="space-y-3">
            <MonoLabel size="sm">{tLabels('theme')}</MonoLabel>
            <ThemeSwitcher />
          </div>

          <StatusPanel location={settings.location} availability={settings.availability} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
