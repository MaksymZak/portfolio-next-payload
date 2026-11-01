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
          text: 'Architected the Next.js, Astro, and Payload CMS marketing platform, enabling editors to launch bilingual campaigns without developer involvement.',
        },
        {
          text: 'Engineered an end-to-end A/B testing engine with edge assignment, atomic impression counters, first-touch attribution, and CRM lead sync.',
        },
        {
          text: 'Built a deterministic two-agent AI delivery pipeline (Figma breakdown, review gate, Astro/Next.js build, and semantic/a11y verification).',
        },
        {
          text: 'Lead code reviews, task decomposition, architectural standards, and technical onboarding/mentoring within the frontend team.',
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
          text: 'Developed 150+ high-conversion marketing funnels and internal CRM web interfaces using React, TypeScript/JavaScript, Tailwind CSS, and Gulp.',
        },
        {
          text: 'Built reusable UI component libraries, multi-step validated forms, and REST API integrations in close collaboration with product and backend teams.',
        },
        {
          text: 'Optimized Core Web Vitals (LCP, CLS, bundle size) and refactored legacy frontend codebases for long-term maintainability.',
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
          text: 'Спроєктував маркетингову платформу на Next.js, Astro і Payload CMS, що дало змогу редакторам запускати двомовні кампанії без участі розробника.',
        },
        {
          text: 'Побудував наскрізну A/B-платформу: Edge-розподіл трафіку, атомарні лічильники показів, first-touch аналітика конверсій та інтеграція з CRM.',
        },
        {
          text: "Впровадив детермінований двоагентний AI-пайплайн доставки (декомпозиція макета Figma, рев'ю-гейт, верстка та перевірка семантики/a11y).",
        },
        {
          text: "Проводжу код-рев'ю, декомпозицію задач, підтримую архітектурні стандарти та менторю молодших розробників у команді.",
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
          text: 'Розробив і запустив 150+ висококонверсійних маркетингових воронок та інтерфейсів внутрішніх CRM-систем на React, JS/TS, Tailwind CSS і Gulp.',
        },
        {
          text: "Створював перевикористовувані UI-компоненти, багатокрокові форми з валідацією та інтеграції з REST API у зв'язці з продуктовою і бекенд-командами.",
        },
        {
          text: 'Оптимізував Core Web Vitals (LCP, CLS, розмір бандлів) і проводив рефакторинг довгострокових проєктів для спрощення їх підтримки.',
        },
      ],
      order: 2,
    },
  ],
}
