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
      badge: 'FULL-STACK ENGINEER · NEXT.JS · NODE.JS · AI WORKFLOWS',
      headline:
        'I build full-stack web products and marketing platforms — from pixel-exact UI to PostgreSQL and AI workflows.',
      copy: '4+ years in production with a strong frontend core (React, Next.js, Astro, TypeScript) and end-to-end backend ownership (Node.js, PostgreSQL, Payload CMS, OAuth 2.1, Stripe, CRM & MCP integrations). I architect self-serve bilingual CMS platforms, A/B experimentation engines, and deterministic AI agent pipelines that power 300+ shipped releases.',
    },
    proof: {
      years: '4+ Years',
      yearsDesc: 'PRODUCTION DELIVERY',
      pages: '300+ Releases',
      pagesDesc: 'PLATFORMS & FUNNELS',
      depth: 'Full-Stack & MCP',
      depthDesc: 'UI · API · DB · AI',
      intro:
        'Production-tested toolkit: every technology below runs in live commercial systems I maintain at work or in the full-stack architectures showcased on this site.',
    },
  },
  uk: {
    hero: {
      badge: 'FULL-STACK ІНЖЕНЕР · NEXT.JS · NODE.JS · AI-ВОРКФЛОУ',
      headline:
        'Створюю full-stack вебпродукти та маркетингові платформи — від піксель-точного UI до PostgreSQL та AI-воркфлоу.',
      copy: '4+ роки в продакшені із сильним фронтенд-ядром (React, Next.js, Astro, TypeScript) та наскрізною відповідальністю за бекенд (Node.js, PostgreSQL, Payload CMS, OAuth 2.1, Stripe, CRM- та MCP-інтеграції). Проєктую автономні двомовні CMS-платформи, системи A/B-експериментів і детерміновані AI-пайплайни, на яких працюють 300+ запущених релізів.',
    },
    proof: {
      years: '4+ роки',
      yearsDesc: 'ДОСВІД У ПРОДАКШЕНІ',
      pages: '300+ релізів',
      pagesDesc: 'ПЛАТФОРМИ ТА ВОРОНКИ',
      depth: 'Full-Stack і MCP',
      depthDesc: 'UI · API · БД · AI',
      intro:
        'Перевірений у продакшені інструментарій: кожна технологія нижче працює в живих комерційних системах на роботі або у full-stack проєктах, представлених на цьому сайті.',
    },
  },
}
