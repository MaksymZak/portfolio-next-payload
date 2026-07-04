import type { Locale } from '../types'

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
    about: {
      text: 'Frontend Developer with 4+ years of commercial experience: 300+ landing pages built and shipped, production A/B testing, and CMS-driven content platforms on React, Next.js, Astro, and Payload CMS. Comfortable across the stack when needed — Node.js, Express, PostgreSQL, MongoDB. Looking for a team where frontend quality and delivery speed matter.',
    },
    education: [
      {
        title: 'Full Stack Developer Bootcamp',
        date: 'February 2021 – November 2021',
        text: '10-month intensive program: JavaScript, React, Node.js, and database development.',
      },
    ],
    languages: [
      { name: 'Ukrainian', level: 'Native' },
      {
        name: 'English',
        level: 'Pre-Intermediate — reads technical documentation fluently',
      },
    ],
    softSkills: [
      { text: 'Problem-solving' },
      { text: 'Teamwork' },
      { text: 'Communication' },
      { text: 'Time management' },
      { text: 'Adaptability' },
    ],
    portfolioNote: {
      title: 'Portfolio',
      text: '300+ landing pages built and shipped. A curated selection with live links is in the archive ledger on this site.',
    },
  },
  uk: {
    about: {
      text: 'Frontend-розробник із 4+ роками комерційного досвіду: 300+ лендингів створено та запущено, A/B-тестування в продакшені, контентні платформи на React, Next.js, Astro та Payload CMS. За потреби впевнено працюю по всьому стеку — Node.js, Express, PostgreSQL, MongoDB. Шукаю команду, де важливі якість фронтенду та швидкість доставки.',
    },
    education: [
      {
        title: 'Full Stack Developer Bootcamp',
        date: 'Лютий 2021 – Листопад 2021',
        text: '10-місячна інтенсивна програма: JavaScript, React, Node.js та робота з базами даних.',
      },
    ],
    languages: [
      { name: 'Українська', level: 'Рідна' },
      {
        name: 'Англійська',
        level: 'Pre-Intermediate — вільно читаю технічну документацію',
      },
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
      text: '300+ лендингів створено та запущено. Кураторська добірка з живими посиланнями — в архіві на цьому сайті.',
    },
  },
}
