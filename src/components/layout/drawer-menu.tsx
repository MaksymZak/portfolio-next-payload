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
import {
  brutalistDrawerDismissClasses,
  brutalistDrawerTriggerClasses,
} from '@/lib/brutalist-motion'
import { prefersReducedMotion } from '@/lib/home-scroll'
import type { Setting } from '@/payload-types'

import { LocaleSwitcher } from './locale-switcher'
import { Nav, type NavSectionId } from './nav'
import { ResumeDownloadLink } from './resume-download-link'
import { StatusPanel } from './status-panel'
import { ThemeSwitcher } from './theme-switcher'

type DrawerMenuProps = {
  settings: Pick<Setting, 'location' | 'availability' | 'resumeUrl'>
  className?: string
}

export function DrawerMenu({ settings, className }: DrawerMenuProps) {
  const tActions = useTranslations('actions')
  const tDrawer = useTranslations('drawer')
  const tA11y = useTranslations('a11y')
  const downloadLabel = tActions('downloadCv')
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
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-visible!">
          <DrawerHeader className="flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <DrawerDescription>{tDrawer('registrar')}</DrawerDescription>
              <DrawerTitle>{tDrawer('title')}</DrawerTitle>
            </div>
            <DrawerClose className={brutalistDrawerDismissClasses()}>
              {tDrawer('close')}
            </DrawerClose>
          </DrawerHeader>

          <Nav variant="drawer" onNavigate={handleNavigate} />

          <div className="border-t border-border pt-4">
            <DrawerClose asChild>
              <ResumeDownloadLink
                resumeUrl={settings.resumeUrl}
                linkLabel={downloadLabel}
                externalAriaLabel={tA11y('externalLink', {
                  label: downloadLabel,
                  hint: tA11y('opensInNewTab'),
                })}
                className={linkControlVariants({ variant: 'cv-link', size: 'cv' })}
              >
                <Download size={13} aria-hidden />
                {downloadLabel}
              </ResumeDownloadLink>
            </DrawerClose>
          </div>

          <LocaleSwitcher variant="sidebar" showSection />
          <ThemeSwitcher variant="sidebar" showSection />

          <StatusPanel location={settings.location} availability={settings.availability} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
