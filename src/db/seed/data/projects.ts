import type { ProjectSeed } from '../types'

/** Placeholder slugs removed from seed — deleted on re-seed. */
export const deprecatedProjectSlugs = [
  'edge-analytics-pipeline',
  'design-system-ops',
  'landing-version-system',
] as const

export const projectsSeed: ProjectSeed[] = [
  {
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    label: 'live',
    role: {
      en: 'Solo Developer — Frontend & CMS Architecture',
      uk: 'Соло-розробка — Frontend та архітектура CMS',
    },
    period: 'Q1–Q2 2026',
    summary: {
      en: 'This site itself: a bilingual portfolio platform on Next.js 16 App Router with embedded Payload CMS 3. Every piece of content is editable in the admin panel and goes live without a redeploy.',
      uk: 'Цей сайт: двомовна портфоліо-платформа на Next.js 16 App Router із вбудованим Payload CMS 3. Увесь контент редагується в адмін-панелі та оновлюється без редеплою.',
    },
    highlights: {
      en: [
        {
          text: 'Modeled the content schema in Payload CMS with field-level EN/UK localization — one document serves both locales.',
        },
        {
          text: 'Built a tagged cache layer: React.cache per request plus unstable_cache with revalidateTag fired from CMS hooks on publish.',
        },
        {
          text: 'Case pages are statically generated via generateStaticParams and revalidate on content edits — no rebuilds.',
        },
        {
          text: 'Wrote an idempotent bilingual seed script that provisions the entire database in one command.',
        },
      ],
      uk: [
        {
          text: 'Змодельовано контент-схему в Payload CMS з локалізацією на рівні полів EN/UK — один документ обслуговує обидві мови.',
        },
        {
          text: 'Побудовано теговий шар кешування: React.cache на запит та unstable_cache із revalidateTag, який спрацьовує з хуків CMS при публікації.',
        },
        {
          text: 'Сторінки кейсів генеруються статично через generateStaticParams і ревалідуються при редагуванні контенту — без ребілдів.',
        },
        {
          text: 'Написано ідемпотентний двомовний seed-скрипт, що розгортає всю базу однією командою.',
        },
      ],
    },
    stack: ['Next.js 16', 'Payload CMS 3', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL'],
    metrics: {
      en: 'Publish-to-live with zero redeploys',
      uk: 'Публікація без жодного редеплою',
    },
    technicalDepth: {
      en: 'Strict layering: RSC pages read only from cached repositories, all CMS access goes through a single Payload Local API entry point, and client components receive data as props. Four brutalist themes on Tailwind CSS 4 design tokens with full reduced-motion support.',
      uk: 'Строга шаруватість: RSC-сторінки читають лише з кешованих репозиторіїв, увесь доступ до CMS іде через єдину точку входу Payload Local API, а клієнтські компоненти отримують дані як пропси. Чотири бруталістські теми на дизайн-токенах Tailwind CSS 4 з повною підтримкою reduced motion.',
    },
    order: 1,
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    label: 'roadmap',
    role: {
      en: 'Full-Stack Developer — Pet Project',
      uk: 'Full-Stack розробник — власний проєкт',
    },
    period: '2025 — relaunch in progress',
    summary: {
      en: 'A course delivery platform with lesson progress tracking. The build is complete; third-party services and tokens are being restored before the public demo relaunch. A full case study will replace this entry once it is live.',
      uk: 'Платформа доставки навчальних курсів із відстеженням прогресу уроків. Розробку завершено; зараз відновлюються сторонні сервіси й токени перед публічним перезапуском демо. Після запуску цей запис замінить повний кейс.',
    },
    highlights: {
      en: [{ text: 'Course catalog, lesson pages, and per-user progress tracking.' }],
      uk: [{ text: 'Каталог курсів, сторінки уроків та відстеження прогресу користувача.' }],
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    metrics: {
      en: 'In relaunch — full case to follow',
      uk: 'На перезапуску — повний кейс згодом',
    },
    technicalDepth: {
      en: 'Details will be published with the relaunch; this entry is intentionally short until the demo is publicly verifiable.',
      uk: 'Деталі буде опубліковано разом із перезапуском; запис свідомо короткий, доки демо не можна перевірити публічно.',
    },
    order: 2,
  },
  {
    slug: 'ab-testing-lab',
    title: 'A/B Testing Lab',
    label: 'roadmap',
    role: {
      en: 'Frontend Developer — Sanitized Work Replica',
      uk: 'Frontend розробник — знеособлена копія робочої системи',
    },
    period: 'Planned 2026',
    summary: {
      en: 'A public, sanitized rebuild of the A/B landing workflow I run in production: variant builds, traffic routing, and conversion analytics — with all employer branding and data removed.',
      uk: 'Публічна знеособлена реконструкція робочого A/B-процесу для лендингів: збирання варіантів, маршрутизація трафіку та аналітика конверсій — без брендингу й даних роботодавця.',
    },
    highlights: {
      en: [
        {
          text: 'Demonstrates the real production workflow: how variants are built, split, and measured.',
        },
      ],
      uk: [
        {
          text: 'Демонструє реальний продакшн-процес: як варіанти збираються, розподіляються та вимірюються.',
        },
      ],
    },
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    metrics: {
      en: 'In development — sanitized demo',
      uk: 'У розробці — знеособлене демо',
    },
    technicalDepth: {
      en: 'Variant routing and measurement architecture will be documented once the demo is public — no numbers will be published that cannot be reproduced in the demo.',
      uk: 'Архітектуру маршрутизації варіантів і вимірювань буде задокументовано після публікації демо — жодних цифр, які не можна відтворити в демо.',
    },
    order: 3,
  },
]
