import 'server-only'

import { unstable_cache } from 'next/cache'

import type { CacheTag } from './tags'

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'
const DEBUG = LOG_LEVEL === 'debug'

function logDebug(message: string, data?: Record<string, unknown>) {
  if (DEBUG) {
    console.log(`[cachedQuery] ${message}`, data ?? '')
  }
}

export async function cachedQuery<T>(
  keyParts: string[],
  tags: CacheTag[],
  fn: () => Promise<T>,
): Promise<T> {
  logDebug('START', { keyParts, tags })

  const cached = unstable_cache(fn, keyParts, { tags })
  const result = await cached()

  logDebug('DONE', { keyParts, tags })
  return result
}
