export type Locale = 'en' | 'uk'

export type CvJson = {
  title: string
  contacts: { list: { icon: string; link: string; text: string }[] }
  hardSkills: { list: { title: string; levels: boolean[] }[] }
  softSkills: { list: string[] }
  languages: { list: string[] }
  about: { text: string }
  workExperience: {
    list: { position: string; date: string; list: string[] }[]
  }
  education: {
    list: { date: string; title: string; text: string }[]
  }
  portfolio: { title: string; description: string; projects: { name: string; url: string }[] }
}

export type ArchiveSeed = {
  title: string
  role: Record<Locale, string>
  stack: string[]
  year: string
  category: 'landing' | 'platform' | 'campaign' | 'prototype'
  metric?: Record<Locale, string>
  url?: string
  order: number
}

export type ProjectSeed = {
  slug: string
  title: string
  label: 'live' | 'roadmap'
  role: Record<Locale, string>
  period: string
  summary: Record<Locale, string>
  highlights: Record<Locale, { text: string }[]>
  stack: string[]
  metrics: Record<Locale, string>
  technicalDepth: Record<Locale, string>
  order: number
}
