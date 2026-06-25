import { cv } from '../cv'
import type { Locale } from '../types'
import { splitPosition } from '../utils'

export const experienceData: Record<
  Locale,
  { role: string; company: string; period: string; bullets: { text: string }[]; order: number }[]
> = {
  en: cv.workExperience.list.map((item, index) => {
    const { role, company } = splitPosition(item.position)
    return {
      role,
      company,
      period: item.date,
      bullets: item.list.map((text) => ({ text })),
      order: index + 1,
    }
  }),
  uk: [
    {
      role: 'Frontend Developer',
      company: 'Goiteens Company, Ukraine',
      period: 'Червень 2024 - Даний час',
      bullets: [
        { text: 'Розробка та оптимізація лендингів (Next.js, Payload CMS, Astro, Gulp).' },
        { text: 'Реалізація логіки A/B тестування та аналітики для оптимізації конверсії.' },
        { text: 'Підтримка масштабованих Next.js проєктів та менторство молодшого розробника.' },
      ],
      order: 1,
    },
    {
      role: 'Frontend Developer',
      company: 'SoftRyzen Company, Ukraine',
      period: 'Липень 2022 - Квітень 2024',
      bullets: [
        { text: 'Створення та здача понад 150 лендингів і CRM-систем (Gulp, React).' },
        { text: 'Співпраця з дизайнерами та бекенд-розробниками для забезпечення UI/UX консистентності.' },
        { text: 'Покращення продуктивності та підтримки проєктів.' },
      ],
      order: 2,
    },
  ],
}
