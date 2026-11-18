import { createHmac, timingSafeEqual } from 'node:crypto'

const OWNER_COOKIE_MESSAGE = 'owner'

export function signOwnerCookie(): string {
  const secret = process.env.PAYLOAD_SECRET

  if (!secret) {
    throw new Error('PAYLOAD_SECRET is not configured')
  }

  return createHmac('sha256', secret).update(OWNER_COOKIE_MESSAGE).digest('hex')
}

export function ownerCookieMatches(value: string | undefined): boolean {
  if (!value) return false

  let expected: string

  try {
    expected = signOwnerCookie()
  } catch {
    return false
  }

  const actual = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)

  if (actual.length !== expectedBuffer.length) return false

  return timingSafeEqual(actual, expectedBuffer)
}
