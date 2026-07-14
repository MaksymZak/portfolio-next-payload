export type Locale = 'en' | 'uk'

export type ArchiveSeed = {
  title: string
  role: Record<Locale, string>
  stack: string[]
  year: string
  category: 'landing' | 'platform' | 'campaign' | 'prototype'
  metric?: Record<Locale, string>
  url?: string
  /** When true, shown in the home archive section. */
  featured?: boolean
  /** Position in the home archive section (lower first). */
  featuredOrder?: number
  /** Seed-only display order; mapped to Payload `_order` on create. */
  order: number
}

export type ProjectSeed = {
  slug: string
  title: string
  label: 'live' | 'roadmap'
  role: Record<Locale, string>
  period: Record<Locale, string>
  summary: Record<Locale, string>
  highlights: Record<Locale, { text: string }[]>
  stack: string[]
  metrics?: Record<Locale, string>
  technicalDepth: Record<Locale, string>
  repoUrl?: string
  demoUrl?: string
  order: number
}
