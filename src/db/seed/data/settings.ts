import { cv } from '../cv'
import type { Locale } from '../types'
import { mapContactType } from '../utils'

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
    name: cv.title,
    position: 'Middle Frontend Developer',
    location: 'Sumy, Ukraine',
    availability: 'Remote only',
    contacts: cv.contacts.list.map((item) => ({
      type: mapContactType(item.icon),
      label: item.text,
      url: item.link,
    })),
  },
  uk: {
    name: cv.title,
    position: 'Middle Frontend Розробник',
    location: 'Суми, Україна',
    availability: 'Тільки віддалено',
    contacts: cv.contacts.list.map((item) => ({
      type: mapContactType(item.icon),
      label: item.text,
      url: item.link,
    })),
  },
}
