import type { HomeContent } from '@/content/portfolio/home'

import { SectionShell } from './section-shell'

export function CoreSkills({ skills }: { skills: HomeContent['skills'] }) {
  return (
    <SectionShell eyebrow={skills.eyebrow} title={skills.title} intro={skills.intro}>
      <ul className="flex flex-wrap gap-2">
        {skills.items.map((item) => (
          <li
            key={item}
            className="border border-border px-3 py-1.5 font-mono text-sm text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
