import type { Payload } from 'payload'

import { archiveSeed } from './data/archive'
import { log, warn } from './logger'
import { findDocByTitle, upsertLocalizedCollectionDoc } from './payload-helpers'

export async function seedArchive(payload: Payload) {
  log('Seeding archive')
  const seenTitles = new Set<string>()

  for (const item of archiveSeed) {
    if (seenTitles.has(item.title)) {
      warn(`Skipping duplicate archive title: ${item.title}`)
      continue
    }
    seenTitles.add(item.title)

    const base = {
      title: item.title,
      stack: item.stack.map((name) => ({ name })),
      year: item.year,
      category: item.category,
      url: item.url,
      order: item.order,
    }

    await upsertLocalizedCollectionDoc(
      payload,
      'archive',
      () => findDocByTitle(payload, 'archive', item.title),
      {
        en: {
          ...base,
          role: item.role.en,
          ...(item.metric ? { metric: item.metric.en } : {}),
        },
        uk: {
          ...base,
          role: item.role.uk,
          ...(item.metric ? { metric: item.metric.uk } : {}),
        },
      },
    )
    log(`Upserted archive: ${item.title}`)
  }
}
