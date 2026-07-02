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

  // Seed writes to the database only. Next.js caches are not invalidated here
  // (bulk operations use disableRevalidate: true). Data Cache (unstable_cache) and
  // pre-rendered pages may still serve old content until you clear cache manually:
  // admin gear menu → "Clear site cache", POST /api/revalidate with x-revalidate-secret,
  // or remove .next/cache and restart dev / rebuild for production.
  log('Seed complete — clear Next.js cache manually (admin → Clear site cache)')
  process.exit(0)
}

main().catch((error) => {
  console.error('[seed] ERROR', error)
  process.exit(1)
})
