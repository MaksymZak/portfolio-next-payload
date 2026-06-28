import type { Payload } from 'payload'

import { projectsSeed } from './data/projects'
import { log } from './logger'
import { findProjectBySlug, upsertLocalizedCollectionDoc } from './payload-helpers'

export async function seedProjects(payload: Payload) {
  log('Seeding projects')

  for (const item of projectsSeed) {
    const base = {
      title: item.title,
      slug: item.slug,
      label: item.label,
      period: item.period,
      stack: item.stack.map((name) => ({ name })),
      order: item.order,
    }

    await upsertLocalizedCollectionDoc(payload, 'projects', () => findProjectBySlug(payload, item.slug), {
      en: {
        ...base,
        role: item.role.en,
        summary: item.summary.en,
        highlights: item.highlights.en,
        metrics: item.metrics.en,
        technicalDepth: item.technicalDepth.en,
      },
      uk: {
        ...base,
        role: item.role.uk,
        summary: item.summary.uk,
        highlights: item.highlights.uk,
        metrics: item.metrics.uk,
        technicalDepth: item.technicalDepth.uk,
      },
    })
    log(`Upserted project: ${item.slug}`)
  }
}
