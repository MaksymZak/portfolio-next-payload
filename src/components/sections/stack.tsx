import { Layers } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { StackPlack } from '@/components/sections/stack-plack'
import { SectionTag } from '@/components/ui/section-tag'
import { cn } from '@/lib/cn'
import type { Home, Skill } from '@/payload-types'

type StackProps = {
  proof: Home['proof']
  skills: Skill[]
}

type MetricConfig = {
  id: string
  labelKey: 'years' | 'pages' | 'depth'
  value: string
  description: string
  compactValue?: boolean
}

export async function Stack({ proof, skills }: StackProps) {
  const tNav = await getTranslations('nav')
  const tStack = await getTranslations('stack')

  const metrics: MetricConfig[] = [
    {
      id: 'metric-years',
      labelKey: 'years',
      value: proof.years,
      description: proof.yearsDesc,
    },
    {
      id: 'metric-pages',
      labelKey: 'pages',
      value: proof.pages,
      description: proof.pagesDesc,
    },
    {
      id: 'metric-cms',
      labelKey: 'depth',
      value: proof.depth,
      description: proof.depthDesc,
      compactValue: true,
    },
  ]

  return (
    <section id="stack" className="border-b border-border bg-background p-6 lg:p-12">
      <div className="space-y-10">
        <SectionTag index={2}>{tNav('stack').replace(/^\d+\s+/, '')}</SectionTag>

        <div className="grid grid-cols-1 divide-y divide-border rounded-none border border-border bg-surface md:grid-cols-3 md:divide-x md:divide-y-0">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              id={metric.id}
              className="group relative flex flex-col justify-between p-5 motion-safe:transition-colors motion-safe:hover:bg-surface-muted"
            >
              <span className="mb-3 block font-mono text-[10px] font-bold text-muted-foreground uppercase motion-safe:transition-colors motion-safe:group-hover:text-foreground">
                {tStack(`metrics.${metric.labelKey}.label`)}
              </span>
              <div>
                <span
                  className={cn(
                    'font-extrabold tracking-tight text-foreground',
                    metric.compactValue
                      ? 'block text-2xl leading-tight'
                      : 'text-3xl leading-none',
                  )}
                >
                  {metric.value}
                </span>
                <span
                  className={cn(
                    'block font-mono text-[10px] font-bold text-primary',
                    metric.compactValue ? 'mt-1.5' : 'mt-1',
                  )}
                >
                  {metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 pb-4">
          <div className="space-y-1.5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-wider text-foreground uppercase">
              <Layers size={14} className="text-primary" aria-hidden />
              {tStack('engineHead')}
            </h3>
            <p className="max-w-lg font-sans text-xs leading-relaxed text-muted-foreground">
              {proof.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 md:gap-3">
            {skills.map((skill) => (
              <StackPlack key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
