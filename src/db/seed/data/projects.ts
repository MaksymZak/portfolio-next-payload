import type { ProjectSeed } from '../types'

export const projectsSeed: ProjectSeed[] = [
  {
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/portfolio-next-payload',
    demoUrl: 'https://portfolio.maksymzak.dev/',
    role: {
      en: 'Solo Developer — Frontend, CMS & Backend Architecture',
      uk: 'Соло-розробник — Frontend, CMS та архітектура бекенду',
    },
    period: { en: 'Q1–Q2 2026', uk: 'Q1–Q2 2026' },
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
    technicalDepth: {
      en: 'Strict layering: RSC pages read only from cached repositories, all CMS access goes through a single Payload Local API entry point, and client components receive data as props. Four brutalist themes on Tailwind CSS 4 design tokens with full reduced-motion support.',
      uk: 'Строга шаруватість: RSC-сторінки читають лише з кешованих репозиторіїв, увесь доступ до CMS іде через єдину точку входу Payload Local API, а клієнтські компоненти отримують дані як пропси. Чотири бруталістські теми на дизайн-токенах Tailwind CSS 4 з повною підтримкою reduced motion.',
    },
    order: 2,
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/lms-next-13',
    demoUrl: 'https://lms-beta-rosy.vercel.app/',
    role: {
      en: 'Full-Stack Developer — Pet Project',
      uk: 'Full-Stack-розробник — пет-проєкт',
    },
    period: { en: '2025–2026', uk: '2025–2026' },
    summary: {
      en: 'End-to-end ownership: data model, auth, payments, video streaming, and UI — all designed and shipped solo. A full-stack Learning Management System on Next.js 14 App Router. Teachers build courses with rich-text descriptions, video chapters, and attachments; students browse the catalog, enroll for free or via Stripe Checkout, watch videos, and track chapter progress on a personal dashboard.',
      uk: 'Наскрізна відповідальність: модель даних, авторизація, платежі, відеострімінг та UI — усе спроєктовано і реалізовано самостійно. Full-stack платформа управління навчанням на Next.js 14 App Router. Викладачі створюють курси з rich-text описами, відеорозділами та вкладеннями; студенти переглядають каталог, записуються безкоштовно або через Stripe Checkout, дивляться відео та відстежують прогрес розділів на особистому дашборді.',
    },
    highlights: {
      en: [
        {
          text: 'Rebuilt a legacy tutorial codebase into a self-hosted stack: replaced Clerk, Mux, and PlanetScale with Better Auth, a custom video pipeline, and PostgreSQL + Prisma.',
        },
        {
          text: 'Designed a pluggable storage layer (lib/storage): local disk with HTTP Range streaming for video seeking, or Cloudflare R2 — switched by a single env variable.',
        },
        {
          text: 'Integrated Stripe Checkout with webhook-driven purchase fulfillment; free courses enroll instantly without payment.',
        },
        {
          text: 'Built a course builder with drag-and-drop chapter reordering, per-chapter free/paid access, publish validation, and revenue/sales analytics charts.',
        },
        {
          text: 'Udemy-style access model: any user can teach; every mutation enforces ownership at the query level.',
        },
      ],
      uk: [
        {
          text: 'Перебудовано застарілий туторіальний код у self-hosted стек: Clerk, Mux і PlanetScale замінено на Better Auth, власний відеопайплайн та PostgreSQL + Prisma.',
        },
        {
          text: 'Спроєктовано змінний шар сховища (lib/storage): локальний диск із HTTP Range-стрімінгом для перемотування відео або Cloudflare R2 — перемикається однією env-змінною.',
        },
        {
          text: 'Інтегровано Stripe Checkout із підтвердженням покупки через webhook; безкоштовні курси записують миттєво без оплати.',
        },
        {
          text: 'Створено конструктор курсів із drag-and-drop сортуванням розділів, безкоштовним/платним доступом на рівні розділу, валідацією публікації та графіками доходів і продажів.',
        },
        {
          text: 'Модель доступу в стилі Udemy: будь-який користувач може викладати; кожна мутація перевіряє володіння на рівні запиту.',
        },
      ],
    },
    stack: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Better Auth',
      'Stripe',
      'Tailwind CSS',
      'shadcn/ui',
    ],
    technicalDepth: {
      en: 'Mutations go through route handlers with client-side revalidation via router.refresh() — a deliberate choice over Server Actions. Optimistic cookie-based auth check in middleware keeps every route private except auth and webhook endpoints. An idempotent seed provisions demo teacher and student accounts with courses, purchases, and progress in one command.',
      uk: 'Мутації йдуть через route handlers із клієнтською ревалідацією через router.refresh() — свідомий вибір замість Server Actions. Оптимістична перевірка cookie в middleware тримає всі маршрути приватними, крім автентифікації та webhook. Ідемпотентний seed розгортає демо-акаунти викладача і студента з курсами, покупками та прогресом однією командою.',
    },
    order: 1,
  },
  {
    slug: 'ab-testing-lab',
    title: 'A/B Testing Lab',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/ab-landing-demo',
    demoUrl: 'https://ab-landing-demo.vercel.app',
    role: {
      en: 'Frontend Developer — Sanitized Work Replica',
      uk: 'Frontend-розробник — знеособлена копія робочої системи',
    },
    period: { en: '2026', uk: '2026' },
    summary: {
      en: 'A public, sanitized rebuild of the A/B landing platform I run in production (the original is under NDA): config-driven split tests, weighted traffic rollout, and sticky version assignment — with all employer branding, code, and data removed.',
      uk: 'Публічна знеособлена реконструкція продакшн-платформи A/B-лендингів (оригінал під NDA): спліт-тести на конфігах, зважений розподіл трафіку та закріплення версії за відвідувачем — без брендингу, коду й даних роботодавця.',
    },
    highlights: {
      en: [
        {
          text: 'Config-driven experiments: each landing owns a plain _config.ts declaring its versions, active flags, and relative rollout weights (e.g. 50/30/20).',
        },
        {
          text: 'Middleware resolves the version in one pass — ?v= preview param, then cookie, then weighted random — and persists it in a 365-day path-scoped cookie for sticky sessions.',
        },
        {
          text: 'Each version is a fully independent page via Next.js parallel routes (@v1/@v2/@v3) with its own sections, layout, and theme.',
        },
        {
          text: 'Deactivating a version excludes it from rollout and reassigns its audience on the next visit, while keeping it reachable via ?v= for QA and stakeholder preview.',
        },
      ],
      uk: [
        {
          text: 'Експерименти на конфігах: кожен лендинг має власний _config.ts із версіями, прапорцями активності та відносними вагами розподілу (напр. 50/30/20).',
        },
        {
          text: 'Middleware визначає версію за один прохід — параметр ?v=, потім cookie, потім зважений випадковий вибір — і зберігає її в cookie на 365 днів у межах шляху лендингу.',
        },
        {
          text: 'Кожна версія — повністю незалежна сторінка через паралельні маршрути Next.js (@v1/@v2/@v3) з власними секціями, лейаутом і темою.',
        },
        {
          text: 'Деактивація версії виключає її з розподілу та переназначає її аудиторію при наступному візиті, залишаючи доступ через ?v= для QA та превʼю стейкхолдерів.',
        },
      ],
    },
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'CSS design tokens'],
    technicalDepth: {
      en: 'The assignment logic lives in an Edge-safe pure module shared by middleware and server components; experiment configs sit next to their pages and are aggregated in a single registry, so changing a rollout is a one-object edit. The production original added CMS-managed experiment records, atomic impression counters for least-shown balancing, conversion analytics with first-touch attribution, and CRM integration — intentionally not reproduced here.',
      uk: 'Логіка призначення версій живе в Edge-безпечному чистому модулі, спільному для middleware та серверних компонентів; конфіги експериментів лежать поруч зі сторінками й агрегуються в єдиному реєстрі, тож зміна розподілу — це правка одного обʼєкта. Продакшн-оригінал додавав CMS-керовані записи експериментів, атомарні лічильники показів для балансування, аналітику конверсій з first-touch атрибуцією та інтеграцію з CRM — свідомо не відтворено тут.',
    },
    order: 3,
  },
]
