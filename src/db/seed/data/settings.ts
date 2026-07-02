import type { Locale } from '../types'

const contacts = [
  {
    type: 'phone' as const,
    label: '+38 (099) 432-20-85',
    url: 'tel:+380994322085',
  },
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
    label: 'Github',
    url: 'https://github.com/MaksymZak',
  },
  {
    type: 'linkedin' as const,
    label: 'Linkedin',
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
    position: 'Frontend Розробник',
    location: 'Суми, Україна',
    availability: 'Віддалено',
    contacts,
  },
}
