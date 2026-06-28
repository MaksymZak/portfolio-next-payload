import { getTranslations } from 'next-intl/server'

import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

import { DrawerMenu } from './drawer-menu'

type HeaderProps = {
  settings: Pick<Setting, 'name' | 'location' | 'availability' | 'resumeUrl'>
  className?: string
}

export async function Header({ settings, className }: HeaderProps) {
  const t = await getTranslations('header')

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex w-full items-center justify-between border-b border-border bg-surface px-6 py-4 xl:hidden',
        className,
      )}
    >
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-none bg-primary motion-reduce:animate-none"
            aria-hidden
          />
          <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
            {t('systemActive')}
          </span>
        </div>
        <span className="font-mono text-[12px] font-extrabold tracking-wider text-foreground uppercase">
          {settings.name}
        </span>
      </div>

      <DrawerMenu settings={settings} />
    </header>
  )
}
