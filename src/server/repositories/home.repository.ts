import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Home } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getHome = cache(async (locale: DataLocale): Promise<Home> => {
  return cachedQuery(['home', locale], [CACHE_TAGS.home], async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'home', locale, depth: DEFAULT_DEPTH })
  })
})
