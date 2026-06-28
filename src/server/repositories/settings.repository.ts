import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Setting } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getSettings = cache(async (locale: DataLocale): Promise<Setting> => {
  return cachedQuery(['settings', locale], [CACHE_TAGS.settings], async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'settings', locale, depth: DEFAULT_DEPTH })
  })
})
