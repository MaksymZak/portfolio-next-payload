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
      badge: 'CORE PRINCIPLE / ABSOLUTE DELIVERY',
      headline:
        'Building high-performance landing systems and localized web experiences with an absolute delivery mindset.',
      copy: 'I build and support production landing pages, bilingual content surfaces, and CMS-connected frontend experiences for teams that need reliable delivery, clean implementation, and fast iteration.',
    },
    proof: {
      years: '4+ Years',
      yearsDesc: 'COMMERCIAL DELIVERY',
      pages: '300+ Pages',
      pagesDesc: 'SHIPPED OR SUPPORTED',
      depth: 'Next.js & Payload',
      depthDesc: 'CMS DEVISE SPECIALIST',
      intro:
        'A strict selection of tools leveraged on production surfaces to achieve reliable page weight, secure content structure, and rapid localization.',
    },
  },
  uk: {
    hero: {
      badge: 'ГОЛОВНИЙ ПРИНЦИП / АБСОЛЮТНА ПОРЯДНІСТЬ',
      headline:
        'Створення високопродуктивних лендингів та локалізованого веб-досвіду з фокусом на абсолютний результат.',
      copy: 'Я розробляю та підтримую комерційні лендинги, двомовні контент-сайти та інтегровані з CMS інтерфейси для команд, яким потрібна надійна здача, чистий код і швидка ітерація.',
    },
    proof: {
      years: '4+ Роки',
      yearsDesc: 'КОМЕРЦІЙНА ЗДАЧА',
      pages: '300+ Стор.',
      pagesDesc: 'ЗАПУЩЕНО ТА ПІДТРИМАНО',
      depth: 'Next.js та Payload',
      depthDesc: 'ФОКУС НА HEADLESS CMS',
      intro:
        'Ретельний вибір інструментів, що використовуються в продакшені для забезпечення мінімальної ваги сторінок, безпеки контенту та адаптивної локалізації.',
    },
  },
}
