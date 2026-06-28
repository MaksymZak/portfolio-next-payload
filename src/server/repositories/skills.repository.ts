import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Skill } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getSkills = cache(async (locale: DataLocale): Promise<Skill[]> => {
  return cachedQuery(['skills', locale], [CACHE_TAGS.skills], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'skills',
      locale,
      depth: DEFAULT_DEPTH,
      sort: 'order',
      limit: 100,
    })
    return docs
  })
})
