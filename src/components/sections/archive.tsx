import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { buttonVariants, linkControlVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SectionTag } from '@/components/ui/section-tag'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { resolveExternalUrl } from '@/lib/external-url'
import { HOME_SECTION_SCROLL_MT } from '@/lib/home-scroll'
import type { Archive } from '@/payload-types'

type ArchiveSectionProps = {
  items: Archive[]
}

type ArchiveFeaturedCardProps = {
  item: Archive
  index: number
  visitSiteLabel: string
  externalLinkLabel: string
}

function ArchiveFeaturedCard({
  item,
  index,
  visitSiteLabel,
  externalLinkLabel,
}: ArchiveFeaturedCardProps) {
  const externalUrl = resolveExternalUrl(item.url, { context: `archive:${item.title}` })

  return (
    <Card className="relative flex flex-col justify-between gap-6 bg-surface-muted p-5">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-sm leading-tight font-extrabold tracking-tight text-foreground uppercase">
            {item.title}
          </h4>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] font-bold text-muted-foreground">
            {externalUrl ? <ArrowUpRight size={10} aria-hidden /> : null}
            _0{index + 1}
          </span>
        </div>
        <p className="font-mono text-[10px] font-bold text-foreground">{item.role}</p>
        {item.metric ? (
          <p className="mt-2 font-mono text-[10px] text-primary">{item.metric}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground sm:flex-col sm:items-start sm:justify-end sm:gap-1">
          <span className="uppercase">{item.category}</span>
          <span>{item.year}</span>
        </div>
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={externalLinkLabel}
            className={cn(
              linkControlVariants({ variant: 'compact-link', size: 'compact' }),
              'group/link w-full justify-between sm:w-auto sm:justify-start',
            )}
          >
            <span>{visitSiteLabel}</span>
            <ArrowUpRight
              size={10}
              aria-hidden
              className="shrink-0 motion-safe:transition-transform motion-safe:group-hover/link:translate-x-px motion-safe:group-hover/link:-translate-y-px"
            />
          </a>
        ) : null}
      </div>
    </Card>
  )
}

export async function Archive({ items }: ArchiveSectionProps) {
  const tNav = await getTranslations('nav')
  const tActions = await getTranslations('actions')
  const tArchive = await getTranslations('archive')
  const tA11y = await getTranslations('a11y')
  const featured = items
    .filter((item) => item.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER),
    )
  const opensInNewTabHint = tA11y('opensInNewTab')

  return (
    <section id="archive" className={cn('border-b border-border bg-background p-6 lg:p-12', HOME_SECTION_SCROLL_MT)}>
      <div className="space-y-6">
        <SectionTag index={4}>{tNav('archive').replace(/^\d+\s+/, '')}</SectionTag>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
          {featured.map((item, index) => (
            <ArchiveFeaturedCard
              key={item.id}
              item={item}
              index={index}
              visitSiteLabel={tArchive('visitSite')}
              externalLinkLabel={tA11y('externalLink', {
                label: item.title,
                hint: opensInNewTabHint,
              })}
            />
          ))}
        </div>

        <Link
          href="/archive"
          className={buttonVariants({ variant: 'secondary', size: 'wide' })}
        >
          {tActions('viewArchive')}
        </Link>
      </div>
    </section>
  )
}
