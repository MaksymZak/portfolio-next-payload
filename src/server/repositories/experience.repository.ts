import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Experience } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getExperience = cache(async (locale: DataLocale): Promise<Experience[]> => {
  return cachedQuery(['experience', locale], [CACHE_TAGS.experience], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'experience',
      locale,
      depth: DEFAULT_DEPTH,
      sort: 'order',
      limit: 100,
    })
    return docs
  })
})
