import type { Metadata } from 'next'

import { env } from '@/config/env'
import { routing } from '@/i18n/routing'

export function getSiteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
}

export function localizedUrl(locale: string, path = ''): string {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : ''
  return `${getSiteUrl()}/${locale}${normalizedPath}`
}

export function buildLanguageAlternates(path = ''): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
  )

  languages['x-default'] = localizedUrl(routing.defaultLocale, path)

  return languages
}

function openGraphLocale(locale: string): string {
  return locale === 'uk' ? 'uk_UA' : 'en_US'
}

export type PageMetadataInput = {
  locale: string
  title: string
  description: string
  path?: string
  siteName?: string
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = '',
  siteName,
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: openGraphLocale(locale),
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map(openGraphLocale),
      type: 'website',
      ...(siteName ? { siteName } : {}),
    },
  }
}

export function buildSiteName(settings: { name: string; position: string }): string {
  return `${settings.name} — ${settings.position}`
}
