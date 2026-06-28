import type { MetadataRoute } from 'next'

import { buildLanguageAlternates, localizedUrl } from '@/lib/metadata'
import { routing } from '@/i18n/routing'
import { getProjects } from '@/server/repositories'

const STATIC_PATHS = ['', '/resume', '/archive'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects('en')
  const casePaths = projects.map((project) => `/case/${project.slug}`)
  const paths = [...STATIC_PATHS, ...casePaths]

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    })),
  )
}
