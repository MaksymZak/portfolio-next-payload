import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { CACHE_TAGS, type CacheTag } from './tags'

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'
const DEBUG = LOG_LEVEL === 'debug'

declare module 'payload' {
  export interface RequestContext {
    disableRevalidate?: boolean
  }
}

const LOCALES = ['en', 'uk'] as const

function logInfo(message: string, data?: Record<string, unknown>) {
  if (DEBUG || LOG_LEVEL === 'info') {
    console.log(`[revalidate] ${message}`, data ?? '')
  }
}

function shouldSkipRevalidate(context: { disableRevalidate?: boolean }): boolean {
  return context.disableRevalidate === true
}

export function safeRevalidateTag(tag: CacheTag): void {
  try {
    logInfo('revalidateTag', { tag })
    revalidateTag(tag, 'max')
  } catch (error) {
    console.error('[revalidate] revalidateTag failed', { tag, error })
  }
}

export function safeRevalidatePath(path: string): void {
  try {
    logInfo('revalidatePath', { path })
    revalidatePath(path)
  } catch (error) {
    console.error('[revalidate] revalidatePath failed', { path, error })
  }
}

function projectCasePaths(slug: string | null | undefined): string[] {
  if (!slug) return []
  return LOCALES.map((locale) => `/${locale}/case/${slug}`)
}

function collectProjectCasePaths({
  doc,
  previousDoc,
}: {
  doc: { slug?: string | null }
  previousDoc?: { slug?: string | null } | null
}): string[] {
  const paths = new Set<string>()
  for (const slug of [doc.slug, previousDoc?.slug]) {
    for (const path of projectCasePaths(slug)) {
      paths.add(path)
    }
  }
  return [...paths]
}

export function createCollectionAfterChangeHook(
  tag: CacheTag,
  options?: {
    revalidatePaths?: (args: {
      doc: { slug?: string | null }
      previousDoc?: { slug?: string | null } | null
    }) => string[]
  },
): CollectionAfterChangeHook {
  return ({ doc, previousDoc, req: { context } }) => {
    if (shouldSkipRevalidate(context)) return doc

    safeRevalidateTag(tag)

    if (options?.revalidatePaths) {
      for (const path of options.revalidatePaths({ doc, previousDoc })) {
        safeRevalidatePath(path)
      }
    }

    return doc
  }
}

export function createCollectionAfterDeleteHook(
  tag: CacheTag,
  options?: {
    revalidatePaths?: (args: { doc: { slug?: string | null } }) => string[]
  },
): CollectionAfterDeleteHook {
  return ({ doc, req: { context } }) => {
    if (shouldSkipRevalidate(context)) return doc

    safeRevalidateTag(tag)

    if (options?.revalidatePaths) {
      for (const path of options.revalidatePaths({ doc })) {
        safeRevalidatePath(path)
      }
    }

    return doc
  }
}

export function createGlobalAfterChangeHook(tag: CacheTag): GlobalAfterChangeHook {
  return ({ req: { context } }) => {
    if (shouldSkipRevalidate(context)) return
    safeRevalidateTag(tag)
  }
}

export const projectsRevalidateHooks = {
  afterChange: [
    createCollectionAfterChangeHook(CACHE_TAGS.projects, {
      revalidatePaths: collectProjectCasePaths,
    }),
  ],
  afterDelete: [
    createCollectionAfterDeleteHook(CACHE_TAGS.projects, {
      revalidatePaths: ({ doc }) => collectProjectCasePaths({ doc }),
    }),
  ],
}

export const archiveRevalidateHooks = {
  afterChange: [createCollectionAfterChangeHook(CACHE_TAGS.archive)],
  afterDelete: [createCollectionAfterDeleteHook(CACHE_TAGS.archive)],
}

export const experienceRevalidateHooks = {
  afterChange: [createCollectionAfterChangeHook(CACHE_TAGS.experience)],
  afterDelete: [createCollectionAfterDeleteHook(CACHE_TAGS.experience)],
}

export const skillsRevalidateHooks = {
  afterChange: [createCollectionAfterChangeHook(CACHE_TAGS.skills)],
  afterDelete: [createCollectionAfterDeleteHook(CACHE_TAGS.skills)],
}

export const settingsRevalidateHooks = {
  afterChange: [createGlobalAfterChangeHook(CACHE_TAGS.settings)],
}

export const homeRevalidateHooks = {
  afterChange: [createGlobalAfterChangeHook(CACHE_TAGS.home)],
}

export const resumeRevalidateHooks = {
  afterChange: [createGlobalAfterChangeHook(CACHE_TAGS.resume)],
}
