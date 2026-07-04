import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Archive } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getArchive = cache(async (locale: DataLocale): Promise<Archive[]> => {
  return cachedQuery(['archive', locale], [CACHE_TAGS.archive], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'archive',
      locale,
      depth: DEFAULT_DEPTH,
      sort: '_order',
      limit: 200,
    })
    return docs
  })
})
