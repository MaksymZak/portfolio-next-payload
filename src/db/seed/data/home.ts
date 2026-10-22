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
      badge: 'PROFILE / FULL-STACK · AI AGENTS',
      headline:
        'I build web products from pixel to database — and the AI agents that help me ship them.',
      copy: "4+ years in production: 300+ landing pages, an A/B testing platform, and bilingual CMS for marketing teams that release every week. Frontend on Next.js and Astro; backend on Node.js and PostgreSQL with auth, payments, CRM and MCP integrations. I build the team's agent workflow in Claude Code, Cursor, and Codex — architecture and code review stay with me.",
    },
    proof: {
      years: '4+ Years',
      yearsDesc: 'COMMERCIAL DELIVERY',
      pages: '300+ Landings',
      pagesDesc: 'BUILT & SHIPPED',
      depth: 'A/B Testing',
      depthDesc: 'IN PRODUCTION',
      intro:
        'A working toolkit, not a wishlist: I have shipped production code with every item below — at work or in the live projects on this site.',
    },
  },
  uk: {
    hero: {
      badge: 'ПРОФІЛЬ / FULL-STACK · AI-АГЕНТИ',
      headline:
        'Я створюю вебпродукти від пікселя до бази даних — і AI-агентів, які допомагають їх випускати.',
      copy: "4+ роки в продакшені: 300+ лендингів, платформа A/B-тестів і двомовні CMS для маркетинг-команд, які релізять щотижня. Фронтенд — Next.js і Astro; бекенд — Node.js і PostgreSQL з авторизацією, платежами, CRM- та MCP-інтеграціями. Будую агентний воркфлоу команди в Claude Code, Cursor і Codex — архітектура й код-рев'ю лишаються за мною.",
    },
    proof: {
      years: '4+ роки',
      yearsDesc: 'КОМЕРЦІЙНА РОЗРОБКА',
      pages: '300+ лендингів',
      pagesDesc: 'СТВОРЕНО ТА ЗАПУЩЕНО',
      depth: 'A/B-тести',
      depthDesc: 'У ПРОДАКШЕНІ',
      intro:
        'Робочий інструментарій, а не список побажань: з усім, що нижче, я випускав код у продакшн — на роботі або в живих проєктах на цьому сайті.',
    },
  },
}
