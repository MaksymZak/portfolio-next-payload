'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

import { LocaleSwitcher } from './locale-switcher'
import { Nav } from './nav'
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

  const handleNavigate = () => {
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={cn(
          'cursor-pointer rounded-none border border-foreground bg-foreground px-3 py-1.5 font-mono text-[10px] font-bold text-background uppercase select-none motion-safe:transition-[transform,box-shadow,background-color,color] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-surface motion-safe:hover:text-foreground motion-safe:hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-px active:translate-y-px active:shadow-none',
          className,
        )}
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

          <Nav onNavigate={handleNavigate} />

          <div className="border-t border-border pt-4">
            <DrawerClose asChild>
              <Link
                href="/resume"
                className="flex w-full items-center justify-center gap-2 rounded-none border-2 border-foreground bg-surface px-3 py-3 font-mono text-[10px] font-bold text-foreground uppercase select-none motion-safe:transition-[transform,box-shadow] motion-safe:duration-150 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-px active:translate-y-px active:shadow-none"
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
