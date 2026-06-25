import { getTranslations } from 'next-intl/server'

import { buttonVariants } from '@/components/ui/button'
import { SectionTag } from '@/components/ui/section-tag'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import type { Archive } from '@/payload-types'

const FEATURED_COUNT = 4

type ArchiveSectionProps = {
  items: Archive[]
}

export async function Archive({ items }: ArchiveSectionProps) {
  const tNav = await getTranslations('nav')
  const tActions = await getTranslations('actions')
  const featured = items.slice(0, FEATURED_COUNT)

  return (
    <section id="archive" className="border-b border-border bg-background p-6 lg:p-12">
      <div className="space-y-6">
        <SectionTag index={4}>{tNav('archive').replace(/^\d+\s+/, '')}</SectionTag>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
          {featured.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between gap-6 border border-border bg-surface-muted p-5 motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:hover:-translate-x-1 motion-safe:hover:-translate-y-1 motion-safe:hover:border-foreground motion-safe:hover:shadow-[6px_6px_0px_var(--foreground)]"
            >
              <div>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h4 className="text-sm leading-tight font-extrabold tracking-tight text-foreground uppercase">
                    {item.title}
                  </h4>
                  <span className="shrink-0 font-mono text-[10px] font-bold text-muted-foreground group-hover:text-primary motion-safe:transition-colors">
                    _0{index + 1}
                  </span>
                </div>
                <p className="font-mono text-[10px] font-bold text-foreground">{item.role}</p>
                {item.metric ? (
                  <p className="mt-2 font-mono text-[10px] text-primary">{item.metric}</p>
                ) : null}
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span className="uppercase">{item.category}</span>
                <span>{item.year}</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/archive"
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
        >
          {tActions('viewArchive')}
        </Link>
      </div>
    </section>
  )
}
