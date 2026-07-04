import type { Locale } from '../types'

export const experienceData: Record<
  Locale,
  { role: string; company: string; period: string; bullets: { text: string }[]; order: number }[]
> = {
  en: [
    {
      role: 'Frontend Developer',
      company: 'GoITeens, Ukraine',
      period: 'June 2024 — Present',
      bullets: [
        {
          text: 'Build and maintain marketing landing pages at production scale on Next.js, Astro, Payload CMS, and Gulp.',
        },
        {
          text: 'Implement A/B testing end-to-end: variant builds, traffic splits, and conversion analytics for paid campaigns.',
        },
        {
          text: 'Integrate Payload CMS so marketing editors publish content without developer involvement.',
        },
        {
          text: 'Mentor a junior developer: code review, task decomposition, onboarding.',
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
          text: 'Worked with designers and backend developers to keep UI pixel-accurate and consistent.',
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
      role: 'Frontend Developer',
      company: 'GoITeens, Україна',
      period: 'Червень 2024 — дотепер',
      bullets: [
        {
          text: 'Розробка та підтримка маркетингових лендингів у продакшн-масштабі на Next.js, Astro, Payload CMS та Gulp.',
        },
        {
          text: 'Наскрізна реалізація A/B-тестування: збирання варіантів, розподіл трафіку та аналітика конверсій для платних кампаній.',
        },
        {
          text: 'Інтеграція Payload CMS, щоб маркетологи публікували контент без залучення розробника.',
        },
        {
          text: "Менторство junior-розробника: код-рев'ю, декомпозиція задач, онбординг.",
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
          text: 'Створено та здано 150+ лендингів і CRM-фронтендів на React та Gulp.',
        },
        {
          text: 'Співпраця з дизайнерами та бекенд-розробниками для піксель-точного й консистентного UI.',
        },
        {
          text: 'Покращення продуктивності та підтримуваності довгострокових проєктів.',
        },
      ],
      order: 2,
    },
  ],
}
