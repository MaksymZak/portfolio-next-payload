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
      text: "Full-stack developer with a strong frontend core and 4+ years in production. I build and run marketing platforms on Next.js, Astro, and Payload CMS: 300+ landing pages, A/B testing with conversion analytics, and bilingual content that editors publish without a developer. On the backend: Node.js, PostgreSQL, auth, Stripe, CRM and MCP integrations. I set up the team's agent workflow in Claude Code, Cursor, and Codex; architecture, code review, and the final call on what ships stay with me.",
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
    softSkills: [],
    portfolioNote: {
      title: 'Portfolio',
      text: 'Full-stack cases: Vartovi (OAuth + MCP) and LMS (Stripe, video). 300+ live landings in the archive.',
    },
  },
  uk: {
    about: {
      text: "Full-stack розробник із сильним фронтендом і 4+ роками в продакшені. Будую та підтримую маркетингові платформи на Next.js, Astro і Payload CMS: 300+ лендингів, A/B-тести з аналітикою конверсій і двомовний контент, який редактори публікують без розробника. На бекенді — Node.js, PostgreSQL, авторизація, Stripe, CRM- та MCP-інтеграції. Налаштовую агентний воркфлоу команди в Claude Code, Cursor і Codex; архітектура, код-рев'ю й останнє слово щодо релізу — за мною.",
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
    softSkills: [],
    portfolioNote: {
      title: 'Портфоліо',
      text: 'Full-stack кейси: Vartovi (OAuth + MCP) і LMS (Stripe, відео). 300+ живих лендингів — в архіві.',
    },
  },
}
