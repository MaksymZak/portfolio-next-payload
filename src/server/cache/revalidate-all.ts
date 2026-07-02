import { revalidatePath, revalidateTag } from 'next/cache'

import { CACHE_TAGS } from './tags'

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'

export function revalidateEntireSite(): void {
  if (LOG_LEVEL === 'debug' || LOG_LEVEL === 'info') {
    console.log('[revalidate] revalidateEntireSite')
  }

  revalidateTag(CACHE_TAGS.site, 'max')
  revalidatePath('/', 'layout')
}
