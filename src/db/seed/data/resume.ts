import { cv } from '../cv'
import type { Locale } from '../types'
import { splitLanguage } from '../utils'

export const resumeData: Record<
  Locale,
  {
    about: { text: string }
    education: { title: string; date: string; text: string }[]
    languages: { name: string; level: string }[]
    softSkills: { text: string }[]
    portfolioNote: { title: string; text: string }
  }
> = {
  en: {
    about: { text: cv.about.text },
    education: cv.education.list.map((item) => ({
      title: item.title,
      date: item.date,
      text: item.text,
    })),
    languages: cv.languages.list.map(splitLanguage),
    softSkills: cv.softSkills.list.map((text) => ({ text })),
    portfolioNote: {
      title: cv.portfolio.title,
      text: cv.portfolio.description,
    },
  },
  uk: {
    about: {
      text: 'Frontend-орієнтований Full Stack розробник із 4+ роками комерційного досвіду у створенні сучасних вебзастосунків на React, Next.js, Payload CMS, Node.js та базах даних (PostgreSQL, MongoDB). Досвід оптимізації лендингів, A/B тестування та менторства. Шукаю професійну команду для масштабованих високопродуктивних рішень.',
    },
    education: [
      {
        title: 'Full Stack Developer Bootcamp',
        date: 'Лютий 2021 – Листопад 2021',
        text: '10-місячна інтенсивна програма з JavaScript, React, Node.js та роботи з базами даних.',
      },
    ],
    languages: [
      { name: 'Українська', level: 'Рідна' },
      { name: 'Англійська', level: 'Pre-Intermediate' },
    ],
    softSkills: [
      { text: 'Вирішення проблем' },
      { text: 'Командна робота' },
      { text: 'Комунікація' },
      { text: 'Тайм-менеджмент' },
      { text: 'Адаптивність' },
    ],
    portfolioNote: {
      title: 'Портфоліо',
      text: 'Створено 300+ лендингів (мінімум)',
    },
  },
}
