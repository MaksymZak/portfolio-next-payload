import { getTranslations } from 'next-intl/server'

import { SectionTag } from '@/components/ui/section-tag'
import type { Experience as ExperienceEntry } from '@/payload-types'

type ExperienceProps = {
  items: ExperienceEntry[]
}

export async function Experience({ items }: ExperienceProps) {
  const tNav = await getTranslations('nav')

  return (
    <section id="experience" className="border-b border-border bg-surface p-6 lg:p-12">
      <div className="max-w-4xl space-y-8">
        <SectionTag index={5}>{tNav('experience').replace(/^\d+\s+/, '')}</SectionTag>

        <div className="space-y-8">
          {items.map((job) => (
            <div
              key={job.id}
              className="relative space-y-3 border-l-2 border-border pb-8 pl-6 last:pb-0 sm:pl-8"
            >
              <div
                aria-hidden
                className="absolute top-1 -left-[5px] size-2 rounded-none border-[1.5px] border-foreground bg-background"
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight text-foreground uppercase">
                    {job.role}
                  </h4>
                  <div className="mt-1 font-mono text-[11px] font-bold text-foreground">
                    {job.company}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  {job.period}
                </span>
              </div>

              {job.bullets?.length ? (
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {job.bullets.map((bullet) => (
                    <li key={bullet.id ?? bullet.text} className="flex gap-2">
                      <span className="font-mono text-primary" aria-hidden>
                        →
                      </span>
                      <span>{bullet.text}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
