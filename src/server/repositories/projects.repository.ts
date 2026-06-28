import { cache } from 'react'

import { getPayloadClient } from '@/db/client'
import type { Project } from '@/payload-types'
import { CACHE_TAGS, cachedQuery } from '@/server/cache'

import { DEFAULT_DEPTH, type DataLocale } from '../types'

export const getProjects = cache(async (locale: DataLocale): Promise<Project[]> => {
  return cachedQuery(['projects', locale], [CACHE_TAGS.projects], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      depth: DEFAULT_DEPTH,
      sort: 'order',
      limit: 100,
    })
    return docs
  })
})

export const getProject = cache(
  async (slug: string, locale: DataLocale): Promise<Project | null> => {
    return cachedQuery(['project', slug, locale], [CACHE_TAGS.projects], async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'projects',
        where: { slug: { equals: slug } },
        locale,
        depth: DEFAULT_DEPTH,
        limit: 1,
      })
      return docs[0] ?? null
    })
  },
)
