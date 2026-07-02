import type { Payload } from 'payload'

import { experienceData } from './data/experience'
import { log, warn } from './logger'
import { clearCollection } from './payload-helpers'

const seedContext = { context: { disableRevalidate: true } } as const

export async function seedExperience(payload: Payload) {
  log('Seeding experience')

  const removed = await clearCollection(
    payload,
    'experience',
    (doc) => `id ${doc.id}`,
  )

  let created = 0

  for (const item of experienceData.en) {
    const ukItem = experienceData.uk.find((entry) => entry.order === item.order)

    if (!ukItem) {
      warn(`Missing Ukrainian experience row for order ${item.order}`)
      continue
    }

    // Payload localization: create default locale first, then update other locales.
    const doc = await payload.create({
      collection: 'experience',
      locale: 'en',
      data: {
        role: item.role,
        company: item.company,
        period: item.period,
        bullets: item.bullets,
        order: item.order,
      },
      ...seedContext,
    })

    await payload.update({
      collection: 'experience',
      id: doc.id,
      locale: 'uk',
      data: {
        role: ukItem.role,
        bullets: ukItem.bullets.map((bullet, index) => ({
          id: doc.bullets?.[index]?.id ?? undefined,
          text: bullet.text,
        })),
      },
      ...seedContext,
    })

    created += 1
    log(`Created experience: ${item.company}`)
  }

  log(`Experience seed complete: ${created} created, ${removed} removed`)
}
