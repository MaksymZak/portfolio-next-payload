import type { Payload } from 'payload'

import { cv } from './cv'
import { log } from './logger'
import { findDocByTitle } from './payload-helpers'
import { countSkillLevel } from './utils'

export async function seedSkills(payload: Payload) {
  log('Seeding skills')

  for (const [index, skill] of cv.hardSkills.list.entries()) {
    const existing = await findDocByTitle(payload, 'skills', skill.title)
    const data = {
      title: skill.title,
      level: countSkillLevel(skill.levels),
      order: index + 1,
    }

    if (existing) {
      await payload.update({
        collection: 'skills',
        id: existing.id,
        data,
        context: { disableRevalidate: true },
      })
      log(`Updated skill: ${skill.title}`)
    } else {
      await payload.create({
        collection: 'skills',
        data,
        context: { disableRevalidate: true },
      })
      log(`Created skill: ${skill.title}`)
    }
  }
}
