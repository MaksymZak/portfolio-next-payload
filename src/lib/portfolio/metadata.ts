import type { Metadata } from 'next'

import type { PortfolioLocale, RouteMetadataContent } from '@/content/portfolio/types'

export function buildPortfolioMetadata(
  locale: PortfolioLocale,
  routeMetadata: RouteMetadataContent,
): Metadata {
  return {
    title: routeMetadata.title,
    description: routeMetadata.description,
    alternates: {
      canonical: routeMetadata.canonicalPath,
      languages: routeMetadata.alternatePaths,
    },
    openGraph: {
      title: routeMetadata.ogTitle,
      description: routeMetadata.ogDescription,
      url: routeMetadata.canonicalPath,
      locale: locale === 'en' ? 'en_US' : 'uk_UA',
      alternateLocale: locale === 'en' ? ['uk_UA'] : ['en_US'],
      type: 'website',
    },
  }
}
