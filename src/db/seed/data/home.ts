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
      badge: 'PROFILE / FRONTEND · FULLSTACK',
      headline:
        'I build landing systems and CMS-driven products that ship fast and load faster — from pixel to database.',
      copy: 'Production landing pages, A/B test variants, and bilingual content platforms — built and supported for marketing teams that ship weekly. Frontend-first, comfortable owning the backend: Stripe payments, auth, PostgreSQL/Prisma, and CMS backends shipped in production-grade projects. Focus stack: Next.js, Astro, Payload CMS, TypeScript, Node.js.',
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
      badge: 'ПРОФІЛЬ / FRONTEND · FULLSTACK',
      headline:
        'Я створюю лендинг-системи та CMS-продукти, що швидко деплояться і ще швидше вантажаться — від пікселя до бази даних.',
      copy: 'Продакшн-лендинги, A/B-варіанти та двомовні контент-платформи для маркетинг-команд, що релізять щотижня. Frontend-перш за все, але впевнено закриваю бекенд: Stripe-платежі, авторизація, PostgreSQL/Prisma та CMS-бекенди у production-проєктах. Стек: Next.js, Astro, Payload CMS, TypeScript, Node.js.',
    },
    proof: {
      years: '4+ роки',
      yearsDesc: 'КОМЕРЦІЙНА РОЗРОБКА',
      pages: '300+ лендингів',
      pagesDesc: 'СТВОРЕНО ТА ЗАПУЩЕНО',
      depth: 'A/B-тести',
      depthDesc: 'У ПРОДАКШЕНІ',
      intro:
        'Робочий інструментарій, а не список побажань: кожна технологія нижче використовувалась на продакшені — швидке завантаження, структурований контент, двомовні запуски.',
    },
  },
}
