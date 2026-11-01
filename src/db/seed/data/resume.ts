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
      text: "Full-stack developer with a strong frontend core and 4+ years of commercial experience. I architect and run web applications and high-velocity marketing platforms on Next.js, React, Astro, TypeScript, and Payload CMS — powering 300+ production releases, end-to-end A/B testing with first-touch attribution, and self-serve bilingual publishing. On the backend, I build with Node.js, PostgreSQL, Drizzle/Prisma, OAuth 2.1, Stripe, and CRM/MCP integrations, while leading the team's AI-assisted engineering workflow and code review.",
    },
    education: [
      {
        title: 'Full Stack Developer Bootcamp',
        date: 'February 2021 – November 2021',
        text: '10-month intensive engineering program: JavaScript/TypeScript, React architecture, Node.js REST APIs, and relational/NoSQL databases.',
      },
    ],
    languages: [
      { name: 'Ukrainian', level: 'Native' },
      {
        name: 'English',
        level: 'Intermediate (B1) — Technical & Written Working Proficiency',
      },
    ],
    softSkills: [
      { text: 'End-to-End Feature Ownership' },
      { text: 'System & API Design' },
      { text: 'Product & Conversion Mindset' },
      { text: 'Mentoring & Code Review' },
      { text: 'Cross-Functional Collaboration' },
    ],
    portfolioNote: {
      title: 'Portfolio & Architecture Cases',
      text: '4 full-stack case studies: Vartovi (OAuth 2.1 + MCP), Self-Hosted LMS (Stripe, HTTP Range video), A/B Engine, and Payload CMS v3.',
    },
  },
  uk: {
    about: {
      text: "Full-stack розробник із сильним фронтенд-ядром та 4+ роками комерційного досвіду. Проєктую та розвиваю вебзастосунки й високонавантажені маркетингові платформи на Next.js, React, Astro, TypeScript і Payload CMS — це 300+ релізів у продакшені, наскрізне A/B-тестування з first-touch атрибуцією та двомовна публікація без участі розробника. На бекенді працюю з Node.js, PostgreSQL, Drizzle/Prisma, OAuth 2.1, Stripe, CRM- та MCP-інтеграціями, а також відповідаю за AI-воркфлоу команди й код-рев'ю.",
    },
    education: [
      {
        title: 'Full Stack Developer Bootcamp',
        date: 'Лютий 2021 – Листопад 2021',
        text: '10-місячна інтенсивна інженерна програма: JavaScript/TypeScript, архітектура React, REST API на Node.js та робота з базами даних.',
      },
    ],
    languages: [
      { name: 'Українська', level: 'Рідна' },
      {
        name: 'Англійська',
        level: 'Intermediate (B1) — робоча технічна та письмова',
      },
    ],
    softSkills: [
      { text: 'Наскрізна відповідальність за продукт' },
      { text: 'Проєктування систем та API' },
      { text: 'Продуктове та бізнес-мислення' },
      { text: 'Менторинг і код-рев’ю' },
      { text: 'Крос-функціональна взаємодія' },
    ],
    portfolioNote: {
      title: 'Портфоліо та інженерні кейси',
      text: '4 full-stack кейси: Vartovi (OAuth 2.1 + MCP), Self-Hosted LMS (Stripe, HTTP Range відео), A/B-рушій та Payload CMS v3.',
    },
  },
}
