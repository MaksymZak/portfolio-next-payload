import type { Locale } from '../types'

export const homeData: Record<
  Locale,
  {
    hero: { badge: string; headline: string; copy: string }
    proof: {
      years: string
      yearsDesc: string
      pages: string
      pagesDesc: string
      depth: string
      depthDesc: string
      intro: string
    }
  }
> = {
  en: {
    hero: {
      badge: 'PROFILE / FRONTEND DEVELOPER',
      headline:
        'I build high-performance landing systems and CMS-driven frontends that survive real marketing traffic.',
      copy: 'Production landing pages, A/B test variants, and bilingual content platforms — built and supported for marketing teams that ship weekly. Focus stack: Next.js, Astro, Payload CMS, TypeScript.',
    },
    proof: {
      years: '4+ Years',
      yearsDesc: 'COMMERCIAL DELIVERY',
      pages: '300+ Landings',
      pagesDesc: 'BUILT & SHIPPED',
      depth: 'A/B Testing',
      depthDesc: 'IN PRODUCTION',
      intro:
        'A working toolkit, not a wishlist: every technology below has shipped production pages — fast loads, structured content, quick bilingual rollouts.',
    },
  },
  uk: {
    hero: {
      badge: 'ПРОФІЛЬ / FRONTEND РОЗРОБНИК',
      headline:
        'Створюю швидкі лендинг-системи та CMS-фронтенди, що витримують реальний маркетинговий трафік.',
      copy: 'Продакшн-лендинги, A/B-варіанти та двомовні контентні платформи — розробка й підтримка для маркетинг-команд, які релізять щотижня. Основний стек: Next.js, Astro, Payload CMS, TypeScript.',
    },
    proof: {
      years: '4+ Роки',
      yearsDesc: 'КОМЕРЦІЙНА РОЗРОБКА',
      pages: '300+ Лендингів',
      pagesDesc: 'СТВОРЕНО ТА ЗАПУЩЕНО',
      depth: 'A/B-тести',
      depthDesc: 'У ПРОДАКШЕНІ',
      intro:
        'Робочий інструментарій, а не список побажань: кожна технологія нижче використовувалась на продакшені — швидке завантаження, структурований контент, двомовні запуски.',
    },
  },
}
