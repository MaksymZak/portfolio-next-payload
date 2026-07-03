import type { Payload } from 'payload'

import { projectsSeed } from './data/projects'
import { log } from './logger'
import { clearCollection } from './payload-helpers'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedProjects(payload: Payload) {
  log('Seeding projects')

  const removed = await clearCollection(payload, 'projects', (doc) => `id ${doc.id}`)

  let created = 0

  for (const item of projectsSeed) {
    const base = {
      title: item.title,
      slug: item.slug,
      label: item.label,
      period: item.period,
      stack: item.stack.map((name) => ({ name })),
      order: item.order,
    }

    // Payload localization: create default locale first, then update other locales.
    // Array rows must reuse the ids returned by create(), otherwise a locale update
    // that omits ids creates brand-new rows and the previous locale's text is lost.
    const doc = await payload.create({
      collection: 'projects',
      locale: 'en',
      data: {
        ...base,
        role: item.role.en,
        summary: item.summary.en,
        highlights: item.highlights.en,
        metrics: item.metrics.en,
        technicalDepth: item.technicalDepth.en,
      },
      ...seedContext,
    })

    await payload.update({
      collection: 'projects',
      id: doc.id,
      locale: 'uk',
      data: {
        role: item.role.uk,
        summary: item.summary.uk,
        highlights: item.highlights.uk.map((highlight, index) => ({
          id: doc.highlights?.[index]?.id ?? undefined,
          text: highlight.text,
        })),
        metrics: item.metrics.uk,
        technicalDepth: item.technicalDepth.uk,
      },
      ...seedContext,
    })

    created += 1
    log(`Created project: ${item.slug}`)
  }

  log(`Projects seed complete: ${created} created, ${removed} removed`)
}
