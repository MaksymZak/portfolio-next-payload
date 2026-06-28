import type { Payload } from 'payload'

import { deprecatedProjectSlugs, projectsSeed } from './data/projects'
import { log } from './logger'
import { findProjectBySlug, upsertLocalizedCollectionDoc } from './payload-helpers'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedProjects(payload: Payload) {
  log('Seeding projects')
  let upserted = 0
  let removed = 0

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
    upserted += 1
    log(`Upserted project: ${item.slug}`)
  }

  for (const slug of deprecatedProjectSlugs) {
    const existing = await findProjectBySlug(payload, slug)
    if (!existing) continue

    await payload.delete({
      collection: 'projects',
      id: existing.id,
      ...seedContext,
    })
    removed += 1
    log(`Removed deprecated placeholder project: ${slug}`)
  }

  log(`Projects seed complete: ${upserted} upserted, ${removed} removed`)
}
