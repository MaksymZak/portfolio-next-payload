import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Resume } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getResume = cache(async (locale: DataLocale): Promise<Resume> => {
  return cachedQuery(['resume', locale], [CACHE_TAGS.resume], async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'resume', locale, depth: DEFAULT_DEPTH })
  })
})
