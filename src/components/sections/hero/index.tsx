import { Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { getHome } from '@/server/repositories'
import type { DataLocale } from '@/server/types'
import { cn } from '@/lib/cn'

import { HeroCtas } from './hero-ctas'
import { HOME_SECTION_SCROLL_MT } from '@/lib/home-scroll'

type HeroProps = {
  locale: DataLocale
}

export async function Hero({ locale }: HeroProps) {
  const home = await getHome(locale)

  const { badge, headline, copy } = home.hero

  return (
    <section
      id="hero"
      className={cn(
        'relative flex min-h-[48vh] flex-col justify-center overflow-hidden border-b border-border bg-surface p-6 lg:p-12',
        HOME_SECTION_SCROLL_MT,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.06]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-4 left-4 z-0 size-3 border-t border-l border-border opacity-65"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-4 right-4 z-0 size-3 border-t border-r border-border opacity-65"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 z-0 size-3 border-b border-l border-border opacity-65"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-4 z-0 size-3 border-b border-r border-border opacity-65"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-5 left-8 z-0 hidden font-mono text-[8px] tracking-widest text-muted-foreground opacity-40 select-none sm:block"
      >
        [SYS_INIT_COORD // 50.9N 34.8E]
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 bottom-5 z-0 hidden font-mono text-[8px] tracking-widest text-muted-foreground opacity-40 select-none sm:block"
      >
        [STAGE: PRODUCTION_VERIFIED]
      </div>

      <div className="relative z-10 max-w-xl space-y-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 bg-surface/60 backdrop-blur-md mask-[linear-gradient(to_right,white_40%,transparent_100%)]"
        />

        <Badge variant="accent" className="gap-1.5 px-3 py-1">
          <Sparkles size={10} aria-hidden className="text-primary" />
          {badge}
        </Badge>

        <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-foreground lg:text-3xl">
          {headline}
        </h2>

        <p className="max-w-lg text-sm leading-relaxed font-medium text-muted-foreground">{copy}</p>

        <HeroCtas />
      </div>
    </section>
  )
}
