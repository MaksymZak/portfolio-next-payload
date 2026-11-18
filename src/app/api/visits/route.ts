import { recordVisit } from '@/server/services/record-visit'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function isPrefetch(request: Request): boolean {
  if (request.headers.get('next-router-prefetch')) return true

  const purpose = `${request.headers.get('purpose') ?? ''} ${request.headers.get('sec-purpose') ?? ''}`
  return purpose.toLowerCase().includes('prefetch')
}

function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined

  for (const part of header.split(';')) {
    const separator = part.indexOf('=')
    if (separator === -1) continue

    const key = part.slice(0, separator).trim()
    if (key !== name) continue

    const raw = part.slice(separator + 1).trim()

    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }

  return undefined
}

function vidSetCookie(value: string): string {
  const parts = [`vid=${value}`, 'HttpOnly', 'SameSite=Lax', 'Path=/', `Max-Age=${ONE_YEAR_SECONDS}`]

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure')
  }

  return parts.join('; ')
}

export async function POST(request: Request) {
  if (isPrefetch(request)) {
    return new Response(null, { status: 204 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ ok: false }, { status: 400 })
  }

  const record = body as Record<string, unknown>

  try {
    const result = await recordVisit({
      path: record.path,
      locale: record.locale,
      referrer: record.referrer,
      ref: record.ref,
      vid: readCookie(request.headers.get('cookie'), 'vid'),
      ownerCookie: readCookie(request.headers.get('cookie'), 'mz_owner'),
      userAgent: request.headers.get('user-agent') ?? '',
      country:
        request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? '',
      prefetch: isPrefetch(request),
    })

    if ('mintedVid' in result && result.mintedVid) {
      return new Response(null, {
        status: 204,
        headers: {
          'set-cookie': vidSetCookie(result.mintedVid),
        },
      })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown'
    console.error(`[visits] record failed: ${message}`)
    return Response.json({ ok: false }, { status: 500 })
  }
}
