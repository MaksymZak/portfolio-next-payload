import { APIError, type Endpoint } from 'payload'

import { revalidateEntireSite } from '@/server/cache/revalidate-all'

export const revalidateSiteCacheEndpoint: Endpoint = {
  path: '/revalidate-site-cache',
  method: 'post',
  handler: async (req) => {
    if (!req.user) {
      throw new APIError('Unauthorized', 401)
    }

    revalidateEntireSite()

    return Response.json({ ok: true })
  },
}
