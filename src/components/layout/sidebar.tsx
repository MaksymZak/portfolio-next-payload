import { Download } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { linkControlVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

import { LocaleSwitcher } from './locale-switcher'
import { MonoLabel } from '../ui/mono-label'
import { Nav } from './nav'
import { ResumeDownloadLink } from './resume-download-link'
import { StatusPanel } from './status-panel'
import { ThemeSwitcher } from './theme-switcher'

type SidebarProps = {
  settings: Pick<Setting, 'name' | 'position' | 'location' | 'availability' | 'resumeUrl'>
  className?: string
}

export async function Sidebar({ settings, className }: SidebarProps) {
  const tActions = await getTranslations('actions')
  const tLabels = await getTranslations('labels')
  const tFooter = await getTranslations('footer')
  const tA11y = await getTranslations('a11y')
  const downloadLabel = tActions('downloadCv')

  return (
    <aside
      id="left-column"
      className={cn(
        'hidden flex-col justify-between overflow-y-auto border-border bg-surface p-6 xl:sticky xl:top-0 xl:flex xl:h-screen xl:w-[32%] xl:border-r xl:p-8',
        className,
      )}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-1 text-2xl leading-none font-bold tracking-tight text-foreground">
            {settings.name}
          </h1>
          <p className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            {settings.position}
          </p>
        </div>

        <div className="my-2 space-y-3.5 border-y border-border py-4">
          <div className="flex w-full flex-col items-center space-y-2 text-center">
            <MonoLabel size="sm">{tLabels('locale')}</MonoLabel>
            <LocaleSwitcher variant="sidebar" />
          </div>

          <div className="flex w-full flex-col items-center space-y-2 text-center">
            <MonoLabel size="sm">{tLabels('theme')}</MonoLabel>
            <ThemeSwitcher variant="sidebar" />
          </div>
        </div>

        <StatusPanel location={settings.location} availability={settings.availability} />

        <Nav variant="sidebar" />

        <div className="pt-2">
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
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-border pt-6 xl:mt-0 xl:border-t-0 xl:pt-0">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>{tLabels('systemState')}</span>
          <span className="flex items-center gap-1 font-bold text-foreground">
            {tLabels('online')}
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-none bg-primary motion-reduce:animate-none"
              aria-hidden
            />
          </span>
        </div>
        <p className="font-mono text-[9px] leading-tight text-muted-foreground opacity-80">
          {tFooter('spec')}
          <br />
          {tFooter('intended')}
        </p>
      </div>
    </aside>
  )
}
