import type { Payload } from 'payload'

import { homeData } from './data/home'
import { resumeData } from './data/resume'
import { settingsData } from './data/settings'
import { seedGlobal } from './payload-helpers'

export async function seedGlobals(payload: Payload) {
  await seedGlobal(payload, 'settings', settingsData)
  await seedGlobal(payload, 'home', homeData)
  await seedGlobal(payload, 'resume', resumeData)
}
