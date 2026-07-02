export const CACHE_TAGS = {
  site: 'site',
  settings: 'settings',
  home: 'home',
  resume: 'resume',
  projects: 'projects',
  archive: 'archive',
  experience: 'experience',
  skills: 'skills',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]
