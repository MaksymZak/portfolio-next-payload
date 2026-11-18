import { randomUUID } from 'node:crypto'

import type { Payload } from 'payload'

import { getPayloadClient } from '@/db/client'
import type { Visit } from '@/payload-types'

import { ownerCookieMatches } from './owner-cookie'

const SESSION_MS = 30 * 60 * 1000
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000
const NEW_SESSION_WINDOW_MS = 10 * 60 * 1000
const MAX_NEW_SESSIONS = 20
const MAX_PATHS = 30
const REF_PATTERN = /^[A-Za-z0-9_-]{1,64}$/
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const BOT_UA =
  /bot|crawler|spider|crawling|slurp|mediapartners|facebookexternalhit|headlesschrome|lighthouse|wget|curl\/|python-requests|go-http-client|bytespider|petalbot|semrush|ahrefs|bingpreview|duckduckbot|yandex/i

export type RecordVisitInput = {
  path: unknown
  locale: unknown
  referrer: unknown
  ref: unknown
  vid: string | undefined
  ownerCookie: string | undefined
  userAgent: string
  country: string
  prefetch: boolean
}

export type RecordVisitResult = { ignored: true } | { recorded: true; mintedVid?: string }

function readString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function isBot(userAgent: string): boolean {
  return BOT_UA.test(userAgent)
}

function isValidPath(path: string): boolean {
  return (
    path.startsWith('/') &&
    !path.startsWith('//') &&
    path.length <= 200 &&
    !path.includes('://')
  )
}

function isLocale(locale: string): locale is 'en' | 'uk' {
  return locale === 'en' || locale === 'uk'
}

function normalizeCountry(country: string): string {
  const code = country.trim().toUpperCase()
  return /^[A-Z]{2}$/.test(code) ? code : ''
}

function normalizeRef(ref: string): string | undefined {
  const trimmed = ref.trim()
  if (!trimmed || !REF_PATTERN.test(trimmed)) return undefined
  return trimmed
}

function nextPaths(current: Visit['paths'], path: string) {
  const paths = (current ?? []).flatMap((item) => (item?.path ? [{ id: item.id, path: item.path }] : []))
  if (paths.at(-1)?.path === path) return paths.slice(-MAX_PATHS)
  return [...paths, { path }].slice(-MAX_PATHS)
}

async function run<T>(operation: string, action: () => Promise<T>): Promise<T> {
  try {
    return await action()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown'
    console.error(`[visits] ${operation} failed: ${message}`)
    throw error
  }
}

async function newSessionsCapped(payload: Payload): Promise<boolean> {
  const since = new Date(Date.now() - NEW_SESSION_WINDOW_MS).toISOString()

  try {
    const { totalDocs } = await payload.count({
      collection: 'visits',
      overrideAccess: true,
      where: {
        createdAt: {
          greater_than_equal: since,
        },
      },
    })

    if (totalDocs >= MAX_NEW_SESSIONS) {
      console.error('[visits] create skipped: new session cap reached')
      return true
    }

    return false
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown'
    console.error(`[visits] session cap check failed: ${message}`)
    return true
  }
}

async function purgeExpired(payload: Payload): Promise<void> {
  const cutoff = new Date(Date.now() - RETENTION_MS).toISOString()

  try {
    await payload.delete({
      collection: 'visits',
      overrideAccess: true,
      where: {
        createdAt: {
          less_than: cutoff,
        },
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown'
    console.error(`[visits] purge failed: ${message}`)
  }
}

export async function recordVisit(input: RecordVisitInput): Promise<RecordVisitResult> {
  if (input.prefetch || isBot(input.userAgent)) {
    return { ignored: true }
  }

  const path = readString(input.path)
  const locale = readString(input.locale)

  if (!isValidPath(path) || !isLocale(locale)) {
    return { ignored: true }
  }

  const referrer = readString(input.referrer).slice(0, 500)
  const ref = normalizeRef(readString(input.ref))
  const country = normalizeCountry(input.country)
  const owner = ownerCookieMatches(input.ownerCookie)
  const existingVid = input.vid && UUID_PATTERN.test(input.vid) ? input.vid : undefined
  const visitorId = existingVid ?? randomUUID()
  const since = new Date(Date.now() - SESSION_MS).toISOString()

  const payload = await getPayloadClient()

  const existing = await run('find session', () =>
    payload.find({
      collection: 'visits',
      overrideAccess: true,
      limit: 1,
      sort: '-updatedAt',
      where: {
        and: [
          { visitorId: { equals: visitorId } },
          { owner: { equals: owner } },
          { updatedAt: { greater_than_equal: since } },
        ],
      },
    }),
  )

  const current = existing.docs[0]

  if (current) {
    await run('update session', () =>
      payload.update({
        collection: 'visits',
        id: current.id,
        overrideAccess: true,
        data: {
          paths: nextPaths(current.paths, path),
          ...(!current.ref && ref ? { ref } : {}),
        },
      }),
    )

    return existingVid ? { recorded: true } : { recorded: true, mintedVid: visitorId }
  }

  if (await newSessionsCapped(payload)) {
    return { ignored: true }
  }

  await run('create session', () =>
    payload.create({
      collection: 'visits',
      overrideAccess: true,
      data: {
        visitorId,
        owner,
        locale,
        country: country || undefined,
        referrer: referrer || undefined,
        ref,
        paths: [{ path }],
      },
    }),
  )

  await purgeExpired(payload)

  return existingVid ? { recorded: true } : { recorded: true, mintedVid: visitorId }
}
