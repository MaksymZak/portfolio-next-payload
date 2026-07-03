import type { Payload } from 'payload'

import { archiveSeed } from './data/archive'
import { log, warn } from './logger'
import { clearCollection } from './payload-helpers'
import { normalizeArchiveUrl } from './utils'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedArchive(payload: Payload) {
  log('Seeding archive')

  const removed = await clearCollection(payload, 'archive', (doc) => `id ${doc.id}`)

  const seenTitles = new Set<string>()
  const seenUrls = new Set<string>()
  let created = 0
  let skipped = 0

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

    const doc = await payload.create({
      collection: 'archive',
      locale: 'en',
      data: {
        ...base,
        role: item.role.en,
        ...(item.metric ? { metric: item.metric.en } : {}),
      },
      ...seedContext,
    })

    await payload.update({
      collection: 'archive',
      id: doc.id,
      locale: 'uk',
      data: {
        role: item.role.uk,
        ...(item.metric ? { metric: item.metric.uk } : {}),
      },
      ...seedContext,
    })

    created += 1
    log(`Created archive: ${item.title}`)
  }

  log(`Archive seed complete: ${created} created, ${skipped} skipped, ${removed} removed`)
}
