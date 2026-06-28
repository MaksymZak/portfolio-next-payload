import type { Payload } from 'payload'

import { log } from './logger'
import type { Locale } from './types'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedGlobal(
  payload: Payload,
  slug: 'settings' | 'home' | 'resume',
  dataByLocale: Record<Locale, Record<string, unknown>>,
) {
  log(`Upserting global: ${slug}`)
  await payload.updateGlobal({
    slug,
    locale: 'en',
    data: dataByLocale.en as never,
    ...seedContext,
  })
  await payload.updateGlobal({
    slug,
    locale: 'uk',
    data: dataByLocale.uk as never,
    ...seedContext,
  })
}

export async function findDocByTitle(
  payload: Payload,
  collection: 'skills' | 'archive',
  title: string,
) {
  const result = await payload.find({
    collection,
    where: { title: { equals: title } },
    limit: 1,
  })
  return result.docs[0]
}

export async function findExperience(payload: Payload, company: string, order: number) {
  const result = await payload.find({
    collection: 'experience',
    where: {
      and: [{ company: { equals: company } }, { order: { equals: order } }],
    },
    limit: 1,
  })
  return result.docs[0]
}

export async function findProjectBySlug(payload: Payload, slug: string) {
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0]
}

export async function upsertLocalizedCollectionDoc(
  payload: Payload,
  collection: 'archive' | 'experience' | 'projects',
  match: () => Promise<{ id: string | number } | undefined>,
  dataByLocale: Record<Locale, Record<string, unknown>>,
) {
  const existing = await match()
  const id =
    existing?.id ??
    (
      await payload.create({
        collection,
        locale: 'en',
        data: dataByLocale.en as never,
        ...seedContext,
      })
    ).id

  await payload.update({
    collection,
    id,
    locale: 'en',
    data: dataByLocale.en as never,
    ...seedContext,
  })
  await payload.update({
    collection,
    id,
    locale: 'uk',
    data: dataByLocale.uk as never,
    ...seedContext,
  })
}
