import { createElement } from 'react'

import { getSkillIcon } from '@/lib/skill-icon'
import type { Skill } from '@/payload-types'

type StackPlackProps = {
  skill: Skill
}

export function StackPlack({ skill }: StackPlackProps) {
  const plackId = `tech-badge-${skill.id}`

  return (
    <div
      id={plackId}
      className="flex cursor-default items-center gap-2 rounded-none border border-border bg-surface px-3 py-2 font-mono text-xs select-none"
    >
      <div className="flex size-5 shrink-0 items-center justify-center rounded-none border border-border bg-background">
        {createElement(getSkillIcon(skill.title), {
          size: 11,
          className: 'text-foreground',
          'aria-hidden': true,
        })}
      </div>
      <span className="font-mono text-xs font-bold tracking-tight text-foreground uppercase">
        {skill.title}
      </span>
    </div>
  )
}
