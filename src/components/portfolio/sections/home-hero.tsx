import { Button } from '@/components/ui/button'
import type { HomeContent } from '@/content/portfolio/home'

export function HomeHero({ hero }: { hero: HomeContent['hero'] }) {
  return (
    <section className="border-border">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden="true" className="size-2 bg-primary" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{hero.summary}</p>

        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{hero.availability}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="sm:w-auto">
            <a href={hero.primaryCtaHref}>{hero.primaryCtaLabel}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="sm:w-auto">
            <a href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
