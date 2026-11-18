import { APIError, type Endpoint } from 'payload'

import { signOwnerCookie } from '@/server/services/owner-cookie'

const NINETY_DAYS_SECONDS = 60 * 60 * 24 * 90

function ownerSetCookie(value: string): string {
  const parts = [
    `mz_owner=${value}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${NINETY_DAYS_SECONDS}`,
  ]

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure')
  }

  return parts.join('; ')
}

export const claimOwnerEndpoint: Endpoint = {
  path: '/claim-owner',
  method: 'post',
  handler: async (req) => {
    if (!req.user) {
      throw new APIError('Unauthorized', 401)
    }

    let value: string

    try {
      value = signOwnerCookie()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown'
      console.error(`[visits] claim-owner sign failed: ${message}`)
      throw new APIError('Unable to issue owner cookie', 500)
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'set-cookie': ownerSetCookie(value),
      },
    })
  },
}
