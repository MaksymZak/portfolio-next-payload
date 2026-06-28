import type { Payload } from 'payload'

import { experienceData } from './data/experience'
import { log, warn } from './logger'
import { findExperience, upsertLocalizedCollectionDoc } from './payload-helpers'

export async function seedExperience(payload: Payload) {
  log('Seeding experience')

  for (const item of experienceData.en) {
    const enData = {
      role: item.role,
      company: item.company,
      period: item.period,
      bullets: item.bullets,
      order: item.order,
    }
    const ukItem = experienceData.uk.find((entry) => entry.order === item.order)

    if (!ukItem) {
      warn(`Missing Ukrainian experience row for order ${item.order}`)
      continue
    }

    await upsertLocalizedCollectionDoc(
      payload,
      'experience',
      () => findExperience(payload, item.company, item.order),
      {
        en: enData,
        uk: {
          role: ukItem.role,
          company: ukItem.company,
          period: ukItem.period,
          bullets: ukItem.bullets,
          order: ukItem.order,
        },
      },
    )
    log(`Upserted experience: ${item.company}`)
  }
}
