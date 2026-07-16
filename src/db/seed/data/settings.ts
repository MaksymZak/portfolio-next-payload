import type { Locale } from '../types'

const contacts = [
  {
    type: 'mail' as const,
    label: 'me@maksymzak.dev',
    url: 'mailto:me@maksymzak.dev',
  },
  {
    type: 'telegram' as const,
    label: '@MaksymZak',
    url: 'https://t.me/MaksymZak',
  },
  {
    type: 'github' as const,
    label: 'GitHub',
    url: 'https://github.com/MaksymZak',
  },
  {
    type: 'linkedin' as const,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mzakaliuzhnyi/',
  },
  {
    type: 'map' as const,
    label: 'Sumy, Ukraine',
    url: 'https://maps.app.goo.gl/8MoxKkNXwVzS99Wi9',
  },
]

export const settingsData: Record<
  Locale,
  {
    name: string
    position: string
    location: string
    availability: string
    contacts: {
      type: 'phone' | 'mail' | 'telegram' | 'github' | 'linkedin' | 'map'
      label: string
      url: string
    }[]
  }
> = {
  en: {
    name: 'Maksym Zakaliuzhnyi',
    position: 'Frontend Developer',
    location: 'Sumy, Ukraine',
    availability: 'Remote',
    contacts,
  },
  uk: {
    name: 'Maksym Zakaliuzhnyi',
    position: 'Frontend-розробник',
    location: 'Суми, Україна',
    availability: 'Віддалено',
    contacts,
  },
}
