import type { Project } from '@/payload-types'

export type CaseSectionKey = 'overview' | 'goals' | 'stack' | 'metrics' | 'depth'

export type CaseSectionDefinition = {
  key: CaseSectionKey
  id: string
  num: string
  title: string
}

type CaseSectionTitles = {
  overview: string
  goals: string
  stack: string
  metrics: string
  depth: string
}

function formatSectionNum(index: number) {
  return String(index).padStart(2, '0')
}

export function buildCaseSections(
  project: Project,
  titles: CaseSectionTitles,
): CaseSectionDefinition[] {
  const sections: CaseSectionDefinition[] = []
  let counter = 1

  const push = (key: CaseSectionKey, title: string) => {
    const num = formatSectionNum(counter)
    sections.push({
      key,
      id: `section-${num}`,
      num,
      title,
    })
    counter += 1
  }

  push('overview', titles.overview)

  const highlights = project.highlights ?? []
  if (highlights.length > 0) {
    push('goals', titles.goals)
  }

  const stack = project.stack ?? []
  if (stack.length > 0) {
    push('stack', titles.stack)
  }

  if (project.metrics) {
    push('metrics', titles.metrics)
  }

  if (project.technicalDepth) {
    push('depth', titles.depth)
  }

  return sections
}
