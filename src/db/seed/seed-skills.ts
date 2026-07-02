import type { Payload } from 'payload'

import { skillsSeed } from './data/skills'
import { log } from './logger'
import { findDocByTitle } from './payload-helpers'

const seedContext = { context: { disableRevalidate: true } } as const
const seedTitles = new Set(skillsSeed.map((skill) => skill.title))

export async function seedSkills(payload: Payload) {
  log('Seeding skills')
  let upserted = 0
  let removed = 0

  for (const [index, skill] of skillsSeed.entries()) {
    const existing = await findDocByTitle(payload, 'skills', skill.title)
    const data = {
      title: skill.title,
      order: index + 1,
    }

    if (existing) {
      await payload.update({
        collection: 'skills',
        id: existing.id,
        data,
        ...seedContext,
      })
      log(`Updated skill: ${skill.title}`)
    } else {
      await payload.create({
        collection: 'skills',
        data,
        ...seedContext,
      })
      log(`Created skill: ${skill.title}`)
    }
    upserted += 1
  }

  const allSkills = await payload.find({
    collection: 'skills',
    limit: 100,
  })

  for (const doc of allSkills.docs) {
    if (seedTitles.has(doc.title)) continue

    await payload.delete({
      collection: 'skills',
      id: doc.id,
      ...seedContext,
    })
    removed += 1
    log(`Removed obsolete skill: ${doc.title}`)
  }

  log(`Skills seed complete: ${upserted} upserted, ${removed} removed`)
}
