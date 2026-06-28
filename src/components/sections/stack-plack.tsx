import { createElement } from 'react'

import { getSkillIcon } from '@/lib/skill-icon'
import { approvedMotionR12 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
import type { Skill } from '@/payload-types'

type StackPlackProps = {
  skill: Skill
}

export function StackPlack({ skill }: StackPlackProps) {
  const plackId = `tech-badge-${skill.id}`

  return (
    <div
      id={plackId}
      className={cn(
        'flex cursor-default items-center gap-2 rounded-none border border-border bg-surface px-3 py-2 font-mono text-xs select-none',
        approvedMotionR12,
        'motion-safe:hover:border-foreground motion-safe:hover:bg-surface-muted',
      )}
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
      {skill.level > 0 ? (
        <span
          className="font-mono text-[9px] font-bold text-muted-foreground tabular-nums"
          aria-label={`Level ${skill.level} of 5`}
        >
          L{skill.level}
        </span>
      ) : null}
    </div>
  )
}
