import type { Locale } from '../types'

export const experienceData: Record<
  Locale,
  { role: string; company: string; period: string; bullets: { text: string }[]; order: number }[]
> = {
  en: [
    {
      role: 'Frontend / Full-Stack Developer',
      company: 'GoITeens, Ukraine',
      period: 'June 2024 — Present',
      bullets: [
        {
          text: 'Build and run the campaign landing system on Next.js, Astro, and Payload CMS; editors publish bilingual pages without a developer.',
        },
        {
          text: 'Built the A/B testing platform end to end: experiments in Payload CMS, atomic impression counters, first-touch analytics, CRM integration.',
        },
        {
          text: "Set up the team's agent workflow: custom skills and subagents, plus a two-agent layout pipeline — mockup breakdown, review gate, build, semantics check.",
        },
        {
          text: 'Mentor a junior developer: code review, task breakdown, onboarding.',
        },
      ],
      order: 1,
    },
    {
      role: 'Frontend Developer',
      company: 'SoftRyzen, Ukraine',
      period: 'July 2022 — April 2024',
      bullets: [
        {
          text: 'Delivered 150+ landing pages and CRM frontends with React and Gulp.',
        },
        {
          text: 'Worked with designers and backend developers on pixel-accurate UI.',
        },
        {
          text: 'Improved performance and maintainability of long-running projects.',
        },
      ],
      order: 2,
    },
  ],
  uk: [
    {
      role: 'Frontend / Full-Stack Developer',
      company: 'GoITeens, Україна',
      period: 'Червень 2024 — дотепер',
      bullets: [
        {
          text: 'Веду систему лендингів для рекламних кампаній на Next.js, Astro і Payload CMS; редактори публікують двомовні сторінки без розробника.',
        },
        {
          text: 'Побудував A/B-платформу наскрізно: експерименти в Payload CMS, атомарні лічильники показів, first-touch аналітика, інтеграція з CRM.',
        },
        {
          text: "Налаштував агентний воркфлоу команди: власні skills і субагенти та пайплайн верстки з двох агентів — розбір макета, рев'ю, верстка, перевірка семантики.",
        },
        {
          text: "Менторю junior-розробника: код-рев'ю, декомпозиція задач, онбординг.",
        },
      ],
      order: 1,
    },
    {
      role: 'Frontend Developer',
      company: 'SoftRyzen, Україна',
      period: 'Липень 2022 — квітень 2024',
      bullets: [
        {
          text: 'Створив і здав 150+ лендингів та CRM-фронтендів на React і Gulp.',
        },
        {
          text: 'Працював із дизайнерами та бекенд-розробниками над піксель-точним UI.',
        },
        {
          text: 'Покращував продуктивність і підтримуваність довгострокових проєктів.',
        },
      ],
      order: 2,
    },
  ],
}
