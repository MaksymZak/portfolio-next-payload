import 'dotenv/config'

import { getPayloadClient } from '@/db/get-payload-client'

import { ensureDatabaseUrl } from './env'
import { log } from './logger'
import { seedArchive } from './seed-archive'
import { seedExperience } from './seed-experience'
import { seedGlobals } from './seed-globals'
import { seedProjects } from './seed-projects'
import { seedSkills } from './seed-skills'

async function main() {
  ensureDatabaseUrl()
  log('Booting Payload Local API')

  const payload = await getPayloadClient()

  await seedGlobals(payload)
  await seedSkills(payload)
  await seedExperience(payload)
  await seedArchive(payload)
  await seedProjects(payload)

  log('Seed complete')
  process.exit(0)
}

main().catch((error) => {
  console.error('[seed] ERROR', error)
  process.exit(1)
})
