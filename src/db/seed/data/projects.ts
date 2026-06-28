import type { ProjectSeed } from '../types'

/** Placeholder slugs removed from seed — deleted on re-seed. */
export const deprecatedProjectSlugs = ['edge-analytics-pipeline', 'design-system-ops'] as const

export const projectsSeed: ProjectSeed[] = [
  {
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    label: 'live',
    role: { en: 'Middle Frontend Developer', uk: 'Middle Frontend Розробник' },
    period: 'Q1-Q2 2026',
    summary: {
      en: 'A localized, content-driven developer platform integrated with Payload CMS for instant site-wide localization-friendly updates.',
      uk: 'Локалізована контентна платформа розробника, інтегрована з Payload CMS для миттєвого оновлення та зручної локалізації сайту.',
    },
    highlights: {
      en: [
        { text: 'Built TypeScript CMS schema using Payload CMS and Next.js App Router.' },
        { text: 'Engineered dynamic, locale-swapping API middleware logic protecting system speed.' },
        { text: 'Wired Instant Server Revalidation (ISR) to trigger on CMS publishers webhook save events, bringing load times under 200ms.' },
        { text: 'Created isolated component template nodes to safely restrict edits for content managers.' },
      ],
      uk: [
        { text: 'Створено TypeScript CMS-схему за допомогою Payload CMS та Next.js App Router.' },
        { text: 'Реалізовано динамічну логіку зміни локалі за допомогою API middleware без втрати швидкості завантаження.' },
        { text: 'Налаштовано миттєву ревалідацію сервера (ISR) на подіях збереження вебхуків CMS, що знизило час завантаження до <200мс.' },
        { text: 'Створено ізольовані шаблони компонентів для безпечного редагування контент-менеджерами.' },
      ],
    },
    stack: ['Next.js 16', 'Payload CMS', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    metrics: {
      en: '200ms Page Load / Instant Editors Publish',
      uk: 'Завантаження <200мс / Миттєва публікація',
    },
    technicalDepth: {
      en: 'Decoupled Server Components architecture ensuring maximum search crawl visibility and localization metadata SEO optimization.',
      uk: 'Архітектура Decoupled Server Components забезпечує максимальну індексацію в пошукових системах та оптимізацію метаданих локалізації SEO.',
    },
    order: 1,
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    label: 'roadmap',
    role: { en: 'Frontend Core Engineer', uk: 'Провідний Frontend Розробник' },
    period: 'Planned Q3 2026',
    summary: {
      en: 'A fast, high-performance course delivery platform and progress manager optimized for lightweight mobile networks.',
      uk: 'Швидка, високоефективна платформа доставки навчальних курсів та менеджер прогресу, оптимізований під слабкі мобільні мережі.',
    },
    highlights: {
      en: [
        { text: 'Interactive learning node pathways dynamically loaded via server-side cached requests.' },
        { text: 'Next.js streaming layouts with micro-loader animations reducing drop-off on slow mobile networks.' },
        { text: 'Progress metrics synced securely on client reconnects via Offline LocalStorage synchronization.' },
        { text: 'Accessible, keyboard-navigable component templates aligned with strict inclusive usability standards.' },
      ],
      uk: [
        { text: 'Інтерактивні ланцюжки навчальних матеріалів динамічно завантажуються через кешовані сервером запити.' },
        { text: 'Стрімінгові макети Next.js з мікро-анімаціями лоадерів для зменшення відмов у слабких мобільних мережах.' },
        { text: 'Безпечна синхронізація метрик прогресу при перепідключенні через автономний Offline LocalStorage.' },
        { text: 'Доступні шаблони компонентів з підтримкою навігації клавіатурою згідно зі стандартами інклюзивності.' },
      ],
    },
    stack: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    metrics: {
      en: 'Lightweight Payload / Offline-First Cache',
      uk: 'Легка вага сторінки / Автономний кеш спочатку',
    },
    technicalDepth: {
      en: 'Utilizes React Server Components (RSC) to defer non-critical visual dependencies, keeping initial JavaScript bundle weight minimum.',
      uk: 'Використовує React Server Components (RSC) для відкладеного завантаження некритичного коду, забезпечуючи мінімальну вагу JS-бандлу.',
    },
    order: 2,
  },
  {
    slug: 'landing-version-system',
    title: 'Landing Version System',
    label: 'roadmap',
    role: { en: 'Lead Performance Specialist', uk: 'Провідний Інженер Оптимізації' },
    period: 'Planned Q4 2026',
    summary: {
      en: 'A high-throughput dynamic routing system designed to serve and split A/B variations of landing assets via edge middleware.',
      uk: 'Високопродуктивна система динамічної маршрутизації для роздачі та спліт-тестування A/B варіантів лендингів через edge middleware.',
    },
    highlights: {
      en: [
        { text: 'Optimized static assets rendering structure ensuring consistent 98+ Google Lighthouse Performance.' },
        { text: 'Edge middleware routing to evaluate active URL search keywords and target corresponding version variants dynamically.' },
        { text: 'Telemetry-free analytical hooks feeding anonymous user conversion ratios directly to reporting servers.' },
        { text: 'Asset pre-fetch modules configured to load critical graphic templates instantaneously on hover.' },
      ],
      uk: [
        { text: 'Оптимізовано структуру рендерингу статичних ресурсів для досягнення стабільних показників Google Lighthouse 98+.' },
        { text: 'Маршрутизація на рівні Edge middleware для аналізу активних пошукових запитів в URL та динамічного вибору варіантів.' },
        { text: 'Аналітичні хуки без стеження за користувачами для передачі анонімних конверсій на сервери звітів.' },
        { text: 'Модулі попереднього завантаження активів, налаштовані на миттєвий рендеринг критичних графічних шаблонів при ховері.' },
      ],
    },
    stack: ['Next.js 16', 'Vercel Edge', 'Tailwind v4', 'TypeScript', 'HTML5 Performance'],
    metrics: {
      en: 'Split Render in <50ms at Edge level',
      uk: 'Розподілений рендеринг за <50мс на рівні Edge',
    },
    technicalDepth: {
      en: 'Eliminates typical client-side layout shifts (CLS) by processing high-speed path variations entirely server-side via Edge runtime.',
      uk: 'Запобігає типовому зсуву макету на стороні клієнта (CLS) шляхом обробки високошвидкісних варіантів шляху на рівні Edge runtime.',
    },
    order: 3,
  },
]
