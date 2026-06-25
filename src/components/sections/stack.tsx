import { getTranslations } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import { SectionTag } from '@/components/ui/section-tag'
import type { Home, Skill } from '@/payload-types'

type StackProps = {
  proof: Home['proof']
  skills: Skill[]
}

export async function Stack({ proof, skills }: StackProps) {
  const tNav = await getTranslations('nav')

  const metrics = [
    { value: proof.years, caption: proof.yearsDesc },
    { value: proof.pages, caption: proof.pagesDesc },
    { value: proof.depth, caption: proof.depthDesc },
  ]

  return (
    <section id="stack" className="border-b border-border bg-background p-6 lg:p-12">
      <div className="space-y-10">
        <SectionTag index={2}>{tNav('stack').replace(/^\d+\s+/, '')}</SectionTag>

        <div className="grid grid-cols-1 divide-y divide-border rounded-none border border-border bg-surface md:grid-cols-3 md:divide-x md:divide-y-0">
          {metrics.map((metric) => (
            <div
              key={metric.caption}
              className="group relative flex flex-col justify-between p-5 motion-safe:transition-colors motion-safe:hover:bg-surface-muted"
            >
              <div>
                <span className="text-3xl leading-none font-extrabold tracking-tight text-foreground">
                  {metric.value}
                </span>
                <span className="mt-1 block font-mono text-[10px] font-bold text-primary">
                  {metric.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="max-w-2xl text-sm leading-relaxed font-medium text-muted-foreground">
            {proof.intro}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="surface" className="border-foreground/20">
                {skill.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
