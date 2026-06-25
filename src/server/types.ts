import type { locales } from '@/i18n/routing'

export type DataLocale = (typeof locales)[number]

export const DEFAULT_DEPTH = 1 as const
