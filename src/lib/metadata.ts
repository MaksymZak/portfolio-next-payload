import type { Metadata } from 'next'

import { env } from '@/config/env'
import { routing } from '@/i18n/routing'

const DEFAULT_OG_IMAGE_PATH = '/og-default.png'
const FAVICON_PATH = '/favicon.svg'
const APPLE_ICON_PATH = '/apple-touch-icon.svg'

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

function resolveAbsoluteAssetUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${getSiteUrl()}${normalized}`
}

export type OgImageInput =
  | string
  | {
      url: string
      width?: number
      height?: number
      alt?: string
    }

export type PageMetadataInput = {
  locale: string
  title: string
  description: string
  path?: string
  siteName?: string
  image?: OgImageInput
  robots?: Metadata['robots']
}

function buildOgImages(title: string, image?: OgImageInput) {
  if (!image) {
    return [
      {
        url: resolveAbsoluteAssetUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: title,
      },
    ]
  }

  if (typeof image === 'string') {
    return [
      {
        url: resolveAbsoluteAssetUrl(image),
        width: 1200,
        height: 630,
        alt: title,
      },
    ]
  }

  return [
    {
      url: resolveAbsoluteAssetUrl(image.url),
      width: image.width ?? 1200,
      height: image.height ?? 630,
      alt: image.alt ?? title,
    },
  ]
}

export function buildSiteIcons(): Metadata['icons'] {
  return {
    icon: [{ url: FAVICON_PATH, type: 'image/svg+xml' }],
    apple: [{ url: APPLE_ICON_PATH, type: 'image/svg+xml', sizes: '180x180' }],
  }
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = '',
  siteName,
  image,
  robots,
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path)
  const ogImages = buildOgImages(title, image)
  const twitterImage = ogImages[0]?.url

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    icons: buildSiteIcons(),
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      locale: openGraphLocale(locale),
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map(openGraphLocale),
      type: 'website',
      images: ogImages,
      ...(siteName ? { siteName } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  }
}

export function buildSiteName(settings: { name: string; position: string }): string {
  return `${settings.name} — ${settings.position}`
}

export function buildRoadmapCaseRobots(): Metadata['robots'] {
  return {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  }
}
