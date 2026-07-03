import type { Payload } from 'payload'

import { log } from './logger'
import type { Locale } from './types'

const seedContext = { context: { disableRevalidate: true } } as const

/**
 * Reuses row ids from a previously-saved locale's array fields.
 * Array containers here are not localized (only their nested text fields are), so an
 * update that sends fresh row objects without ids creates brand-new rows instead of
 * attaching the translation to the existing ones — silently dropping the first locale's text.
 */
function withArrayIds(data: Record<string, unknown>, reference: Record<string, unknown>) {
  const result: Record<string, unknown> = { ...data }

  for (const [key, value] of Object.entries(data)) {
    if (!Array.isArray(value)) continue
    const refArray = reference[key]
    if (!Array.isArray(refArray)) continue

    result[key] = value.map((item, index) => {
      const refItem = refArray[index] as { id?: string | number } | undefined
      return refItem?.id !== undefined && typeof item === 'object' && item !== null
        ? { id: refItem.id, ...item }
        : item
    })
  }

  return result
}

export async function seedGlobal(
  payload: Payload,
  slug: 'settings' | 'home' | 'resume',
  dataByLocale: Record<Locale, Record<string, unknown>>,
) {
  log(`Upserting global: ${slug}`)
  const enDoc = await payload.updateGlobal({
    slug,
    locale: 'en',
    data: dataByLocale.en as never,
    ...seedContext,
  })

  await payload.updateGlobal({
    slug,
    locale: 'uk',
    data: withArrayIds(dataByLocale.uk, enDoc as unknown as Record<string, unknown>) as never,
    ...seedContext,
  })
}

export async function findDocByTitle(payload: Payload, collection: 'skills', title: string) {
  const result = await payload.find({
    collection,
    where: { title: { equals: title } },
    limit: 1,
  })
  return result.docs[0]
}

export async function clearCollection(
  payload: Payload,
  collection: 'experience' | 'projects' | 'archive',
  label: (doc: { id: number | string }) => string,
) {
  const existing = await payload.find({
    collection,
    limit: 500,
    pagination: false,
  })

  for (const doc of existing.docs) {
    await payload.delete({
      collection,
      id: doc.id,
      ...seedContext,
    })
    log(`Removed ${collection}: ${label(doc)}`)
  }

  return existing.docs.length
}
