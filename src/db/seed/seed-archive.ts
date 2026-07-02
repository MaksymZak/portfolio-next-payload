import type { Payload } from 'payload'

import { archiveSeed } from './data/archive'
import { log, warn } from './logger'
import { findDocByTitle, upsertLocalizedCollectionDoc } from './payload-helpers'
import { normalizeArchiveUrl } from './utils'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedArchive(payload: Payload) {
  log('Seeding archive')
  const seedTitles = new Set(archiveSeed.map((item) => item.title))
  const seenTitles = new Set<string>()
  const seenUrls = new Set<string>()
  let upserted = 0
  let skipped = 0
  let removed = 0

  for (const item of archiveSeed) {
    const normalizedUrl = normalizeArchiveUrl(item.url)

    if (seenTitles.has(item.title)) {
      warn(`Skipping duplicate archive title: ${item.title}`)
      skipped += 1
      continue
    }

    if (normalizedUrl && seenUrls.has(normalizedUrl)) {
      warn(`Skipping duplicate archive URL: ${item.url} (${item.title})`)
      skipped += 1
      continue
    }

    seenTitles.add(item.title)
    if (normalizedUrl) seenUrls.add(normalizedUrl)

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
    upserted += 1
    log(`Upserted archive: ${item.title}`)
  }

  const existingArchive = await payload.find({
    collection: 'archive',
    limit: 500,
    pagination: false,
  })

  for (const doc of existingArchive.docs) {
    if (seedTitles.has(doc.title)) continue

    await payload.delete({
      collection: 'archive',
      id: doc.id,
      ...seedContext,
    })
    removed += 1
    log(`Removed stale archive entry: ${doc.title}`)
  }

  log(`Archive seed complete: ${upserted} upserted, ${skipped} skipped, ${removed} removed`)
}
