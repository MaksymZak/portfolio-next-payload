import type { ProjectSeed } from '../types'

export const projectsSeed: ProjectSeed[] = [
  {
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/portfolio-next-payload',
    demoUrl: 'https://portfolio.maksymzak.dev/',
    role: {
      en: 'Solo Full-Stack Engineer — Next.js 16 & Payload CMS 3 Architecture',
      uk: 'Соло Full-Stack-інженер — архітектура Next.js 16 та Payload CMS 3',
    },
    period: { en: 'Q1–Q2 2026', uk: 'Q1–Q2 2026' },
    summary: {
      en: 'This platform: a bilingual engineering portfolio and embedded CMS monolith on Next.js 16 App Router and Payload CMS 3. Combines instant tag-based cache revalidation, a deterministic A4 PDF resume generator, and a custom 4-theme brutalist design system.',
      uk: 'Ця платформа: двомовний інженерний портфоліо-моноліт на Next.js 16 App Router із вбудованою Payload CMS 3. Поєднує миттєву тегову інвалідацію кешу без редеплою, детермінований генератор односторінкового PDF-резюме формату A4 та власну бруталістську дизайн-систему на 4 теми.',
    },
    metrics: {
      en: '2 LOCALES (EN/UK) // 4 DESIGN-TOKEN THEMES // 0-REBUILD CMS PUBLISH // PIXEL-EXACT A4 PDF ENGINE',
      uk: '2 ЛОКАЛІ (EN/UK) // 4 ТЕМИ НА ТОКЕНАХ // ОНОВЛЕННЯ БЕЗ РЕБІЛДУ // ПОПІКСЕЛЬНИЙ A4 PDF-РУШІЙ',
    },
    highlights: {
      en: [
        {
          text: 'Modeled localized collections and globals in Payload CMS 3 with field-level EN/UK localization — editors manage both languages in a single document.',
        },
        {
          text: 'Engineered a two-tier caching architecture: per-request deduplication via React.cache paired with cross-request unstable_cache and granular revalidateTag hooks triggered on CMS publish.',
        },
        {
          text: 'Built a single-source-of-truth A4 resume system: a custom Tailwind CSS 4 sheet: variant renders an on-screen A4 preview and drives headless Chromium PDF generation with an exact 1063px page budget.',
        },
        {
          text: 'Crafted a custom Neo-Brutalist Swiss Grids design system with 4 themes (Light, Dark, Warm, High Contrast), standardized motion physics, and full WAI-ARIA / reduced-motion accessibility.',
        },
      ],
      uk: [
        {
          text: 'Змодельовано колекції та глобальні сутності в Payload CMS 3 з локалізацією на рівні полів EN/UK — обидві мови редагуються в межах одного документа.',
        },
        {
          text: 'Побудовано дворівневу архітектуру кешування: дедуплікація запитів через React.cache плюс міжзапитовий unstable_cache із точковою інвалідацією через revalidateTag у хуках CMS.',
        },
        {
          text: "Створено єдину систему A4-резюме: кастомний варіант Tailwind CSS 4 (sheet:) одночасно керує інтерактивним прев'ю на сторінці та серверною генерацією PDF через Headless Chromium із точним бюджетом висоти 1063px.",
        },
        {
          text: 'Розроблено власну дизайн-систему в стилі Neo-Brutalist Swiss Grids на 4 теми (Light, Dark, Warm, High Contrast) зі стандартизованою фізикою мікроанімацій і повною підтримкою доступності (WAI-ARIA, reduced motion).',
        },
      ],
    },
    stack: ['Next.js 16', 'Payload CMS 3', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL'],
    technicalDepth: {
      en: 'Strict layered architecture: RSC pages and metadata builders read exclusively from typed server repositories, all database queries route through a single cached Payload Local API client, and client components receive minimal serialized props. Static case study routes are pre-rendered via generateStaticParams and updated on-demand via CMS hooks. An idempotent bilingual seed script provisions all collections, globals, and localized arrays in one command.',
      uk: 'Строга шарувата архітектура: RSC-сторінки та генератори метаданих звертаються виключно до типізованих серверних репозиторіїв, усі запити до БД проходять через єдиний кешований клієнт Payload Local API, а клієнтські компоненти отримують мінімальні серіалізовані пропси. Сторінки кейсів пререндеряться через generateStaticParams і оновлюються на льоту через хуки CMS. Ідемпотентний двомовний seed-скрипт розгортає всі колекції та глобальні налаштування однією командою.',
    },
    order: 3,
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/lms-next-13',
    demoUrl: 'https://lms-beta-rosy.vercel.app/',
    role: {
      en: 'Solo Full-Stack Developer — Self-Hosted Architecture',
      uk: 'Соло Full-Stack-розробник — Self-Hosted архітектура',
    },
    period: { en: '2025–2026', uk: '2025–2026' },
    summary: {
      en: 'A self-hosted full-stack Learning Management System with custom HTTP Range video streaming, Stripe Checkout fulfillment, and role-based course authoring. Engineered to run entirely on own infrastructure (PostgreSQL, Prisma, Better Auth, and pluggable local/R2 storage) with zero per-seat or per-minute SaaS vendor lock-in.',
      uk: "Self-hosted full-stack платформа управління навчанням (LMS) із власним відеострімінгом через HTTP Range, оплатою через Stripe Checkout і конструктором курсів. Спроєктована для роботи повністю на власній інфраструктурі (PostgreSQL, Prisma, Better Auth та змінне локальне/R2 сховище) без прив'язки до дорогих SaaS-сервісів.",
    },
    metrics: {
      en: '0 SAAS LOCK-IN (SELF-HOSTED AUTH & VIDEO) // HTTP 206 RANGE STREAMING // STRIPE WEBHOOK FULFILLMENT',
      uk: '0 SAAS-ЗАЛЕЖНОСТЕЙ (ВЛАСНІ AUTH І ВІДЕО) // HTTP 206 RANGE-СТРІМІНГ // STRIPE WEBHOOKS',
    },
    highlights: {
      en: [
        {
          text: 'Eliminated third-party SaaS dependencies (Clerk, Mux, PlanetScale) by engineering a self-hosted stack on Better Auth, a custom video delivery pipeline, and PostgreSQL + Prisma.',
        },
        {
          text: 'Designed a pluggable storage abstraction (lib/storage) supporting both local disk with HTTP 206 Range streaming for instant video seeking and Cloudflare R2 object storage, switched via a single environment variable.',
        },
        {
          text: 'Integrated Stripe Checkout with idempotent webhook-driven enrollment fulfillment, alongside instant zero-cost enrollment for free courses.',
        },
        {
          text: 'Built an interactive instructor studio featuring drag-and-drop chapter reordering, granular per-chapter free/paid access gates, readiness validation before publishing, and revenue analytics.',
        },
        {
          text: 'Enforced strict resource ownership at the Prisma query layer: any authenticated user can author courses, and every mutation verifies instructor ownership on the server.',
        },
      ],
      uk: [
        {
          text: 'Повністю замінено сторонні SaaS-сервіси (Clerk, Mux, PlanetScale) на власний self-hosted стек: Better Auth, кастомний пайплайн роздачі відео та PostgreSQL + Prisma.',
        },
        {
          text: 'Спроєктовано змінну абстракцію сховища (lib/storage): локальний диск із підтримкою HTTP 206 Range-стрімінгу для миттєвого перемотування відео або хмарне сховище Cloudflare R2 — перемикається однією env-змінною.',
        },
        {
          text: 'Інтегровано Stripe Checkout з обробкою покупок через захищені вебхуки, а також миттєвий запис на безкоштовні курси в один клік.',
        },
        {
          text: 'Створено кабінет викладача з drag-and-drop сортуванням розділів, налаштуванням платного/безкоштовного доступу до окремих уроків, валідацією перед публікацією та графіками продажів.',
        },
        {
          text: 'Реалізовано перевірку прав володіння на рівні запитів до БД: будь-який користувач може створювати власні курси, а кожна мутація перевіряє авторство на сервері.',
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
      en: 'All write operations flow through typed Next.js Route Handlers paired with deterministic client-side cache invalidation via router.refresh(). Middleware performs fast cookie-based session checks to protect private student and instructor routes while keeping auth and Stripe webhook endpoints accessible. Database provisioning includes an idempotent seed pipeline that sets up demo instructor and student workspaces, multi-chapter video courses, purchase records, and completion progress in a single command.',
      uk: 'Усі операції запису проходять через типізовані Route Handlers Next.js із детермінованою клієнтською інвалідацією кешу через router.refresh(). Middleware виконує швидку перевірку сесійних cookie, захищаючи приватні маршрути студентів і викладачів та залишаючи відкритими лише ендпоїнти авторизації й вебхуків Stripe. Для швидкого розгортання реалізовано ідемпотентний seed-пайплайн, який однією командою створює демо-акаунти викладача та студента, курси з відео, історію покупок і прогрес проходження.',
    },
    order: 2,
  },
  {
    slug: 'ab-testing-lab',
    title: 'A/B Testing Lab',
    label: 'live',
    repoUrl: 'https://github.com/MaksymZak/ab-landing-demo',
    demoUrl: 'https://ab-landing-demo.vercel.app',
    role: {
      en: 'Frontend / Growth Platform Engineer — Sanitized Production Architecture',
      uk: 'Frontend / Growth Platform інженер — знеособлена продакшн-архітектура',
    },
    period: { en: '2026', uk: '2026' },
    summary: {
      en: 'A public, NDA-safe reference implementation of the A/B experimentation engine I built and run in production. Demonstrates zero-flicker Edge middleware traffic splitting, weighted variant rollouts (e.g. 50/30/20), sticky visitor sessions, and fully isolated page variants via Next.js Parallel Routes.',
      uk: 'Публічна, очищена від NDA-даних еталонна реалізація платформи A/B-експериментів, яку я побудував і підтримую в продакшені. Демонструє розподіл трафіку в Edge Middleware без мерехтіння (zero-flicker), зважений ролаут версій (напр. 50/30/20), закріплення сесій і повну ізоляцію варіантів через паралельні маршрути Next.js.',
    },
    metrics: {
      en: '0 CLS / ZERO-FLICKER EDGE ROUTING // @V1/@V2/@V3 PARALLEL ROUTES // 365-DAY STICKY SESSIONS',
      uk: '0 CLS / EDGE-РОУТИНГ БЕЗ МЕРЕХТІННЯ // ПАРАЛЕЛЬНІ МАРШРУТИ @V1/@V2/@V3 // 365-ДЕННІ STICKY-СЕСІЇ',
    },
    highlights: {
      en: [
        {
          text: 'Declarative experiment configs: each funnel defines its variants, active flags, and relative traffic weights (e.g. 50/30/20) in a co-located _config.ts module.',
        },
        {
          text: 'Single-pass Edge Middleware resolution — ?v= QA override param, existing cookie, or weighted random draw — persisted in a 365-day path-scoped cookie for deterministic sticky sessions.',
        },
        {
          text: 'Complete variant isolation via Next.js Parallel Routes (@v1/@v2/@v3): each variant can ship its own layout, component tree, copy, and visual theme without bundle bloat.',
        },
        {
          text: 'Graceful variant retirement: deactivating a version automatically redistributes its traffic cohort on the next visit while keeping ?v= preview links alive for QA and stakeholders.',
        },
      ],
      uk: [
        {
          text: 'Декларативні конфіги експериментів: кожна воронка описує свої версії, прапорці активності та відносні ваги трафіку (напр. 50/30/20) у локальному модулі _config.ts.',
        },
        {
          text: 'Визначення версії в Edge Middleware за один прохід — параметр ?v= для QA, наявна cookie або зважений випадковий вибір — зі збереженням у path-scoped cookie на 365 днів.',
        },
        {
          text: 'Повна ізоляція варіантів через паралельні маршрути Next.js (@v1/@v2/@v3): кожна версія може мати власний лейаут, дерево компонентів і тему без роздування спільного бандла.',
        },
        {
          text: 'Безшовне виведення варіантів з ротації: деактивація версії автоматично перерозподіляє її аудиторію при наступному візиті, зберігаючи прямий доступ за ?v= для QA та стейкхолдерів.',
        },
      ],
    },
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'CSS design tokens'],
    technicalDepth: {
      en: 'The assignment logic lives in an Edge-safe pure module shared by middleware and server components; experiment configs sit next to their pages and are aggregated in a single registry, so changing a rollout is a one-object edit. The production original added CMS-managed experiment records, atomic impression counters for least-shown balancing, conversion analytics with first-touch attribution, and CRM integration — intentionally not reproduced here.',
      uk: 'Логіка призначення версій живе в Edge-безпечному чистому модулі, спільному для middleware та серверних компонентів; конфіги експериментів лежать поруч зі сторінками й агрегуються в єдиному реєстрі, тож зміна розподілу — це правка одного обʼєкта. Продакшн-оригінал додавав CMS-керовані записи експериментів, атомарні лічильники показів для балансування, аналітику конверсій з first-touch атрибуцією та інтеграцію з CRM — свідомо не відтворено тут.',
    },
    order: 4,
  },
  {
    slug: 'vartovi',
    title: 'Vartovi',
    label: 'live',
    demoUrl: 'https://vartovi.maksymzak.dev/',
    role: {
      en: 'Full-Stack Engineer — Silpo AI Factory Hackathon',
      uk: 'Full-Stack-інженер — хакатон Silpo AI Factory',
    },
    period: {
      en: 'Sep–Oct 2026',
      uk: 'вересень–жовтень 2026',
    },
    summary: {
      en: 'A dietary-safe grocery shopping web app integrated with the official Silpo MCP server. Households configure per-person food restrictions and allergies, assemble a verified "guard cart" of exact SKUs, and transfer only compliant items into their real Silpo cart via an idempotent two-phase confirmation flow.',
      uk: 'Вебзастосунок для безпечних продуктових покупок з інтеграцією офіційного MCP-сервера «Сільпо». Користувач налаштовує харчові обмеження та алергії для членів родини, формує перевірений «вартовий кошик» точних SKU і переносить лише безпечні позиції в реальний кошик «Сільпо» через ідемпотентний двофазний механізм підтвердження.',
    },
    metrics: {
      en: '3 DOMAIN MODULES // OAUTH 2.1 + PKCE + DCR // AES-256-GCM TOKEN ENVELOPE // 6-STATE IDEMPOTENT CART TRANSFER',
      uk: '3 ДОМЕННІ МОДУЛІ // OAUTH 2.1 + PKCE + DCR // ШИФРУВАННЯ AES-256-GCM // 6-СТАНОВИЙ ІДЕМПОТЕНТНИЙ ЗАПИС',
    },
    highlights: {
      en: [
        {
          text: 'Engineered a custom server-side OAuth 2.1 (Authorization Code + PKCE + Dynamic Client Registration) adapter: the browser holds only an opaque HttpOnly cookie, PostgreSQL stores SHA-256 session hashes, and Silpo MCP credentials are encrypted at rest with AES-256-GCM.',
        },
        {
          text: 'Structured the backend as a modular monolith with three isolated domains (identity, guard, cart-transfer): Route Handlers and Server Actions invoke domain services, while pure domain models remain zero-dependency (no Next.js, Drizzle, or MCP SDK imports).',
        },
        {
          text: 'Implemented a deterministic dietary-compliance policy over required shopping items: only available, verified SKUs (explicit label match or user confirmation) enter the transfer set, enforcing strict readiness thresholds (≥80% partial vs. 100% full readiness).',
        },
        {
          text: 'Designed the guard cart as an isolated aggregate with optimistic concurrency control: a partial unique index enforces one active cart per guest, and any draft edit increments draft_revision to invalidate stale pre-transfer snapshots.',
        },
        {
          text: 'Built a fault-tolerant cart transfer state machine (prepared → writing → reconciling → succeeded / partial / failed / uncertain) with one-time confirmation nonces, idempotency keys, and post-write MCP read-back reconciliation outside the DB transaction.',
        },
      ],
      uk: [
        {
          text: 'Розроблено власний серверний адаптер OAuth 2.1 (Authorization Code + PKCE + Dynamic Client Registration): браузер зберігає лише непрозору HttpOnly cookie, у PostgreSQL лежать SHA-256 хеші сесій, а токени Silpo MCP шифруються в AES-256-GCM.',
        },
        {
          text: 'Архітектура побудована як модульний моноліт із трьома ізольованими доменами (identity, guard, cart-transfer): Route Handlers і Server Actions викликають сервіси модулів, а чисті доменні моделі не залежать від Next.js, Drizzle чи MCP SDK.',
        },
        {
          text: 'Реалізовано детерміновану політику перевірки складу та правил харчування: у набір на перенесення потрапляють лише доступні та верифіковані SKU із жорстким контролем порогів готовності кошика (≥80% часткова та 100% повна готовність).',
        },
        {
          text: 'Спроєктовано «вартовий кошик» як окремий агрегат із оптимістичним контролем конкурентності: частковий унікальний індекс гарантує один активний кошик на гостя, а будь-яка правка чернетки інвалідує застарілі знімки перевірки через ревізії.',
        },
        {
          text: 'Побудовано відмовостійкий автомат станів запису в реальний кошик (prepared → writing → reconciling → succeeded / partial / failed / uncertain) з одноразовими nonce підтвердження, ключами ідемпотентності та повторним читанням (read-back) стану через MCP поза транзакцією БД.',
        },
      ],
    },
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Drizzle ORM',
      'PostgreSQL',
      'Zod 4',
      'MCP SDK',
    ],
    technicalDepth: {
      en: 'The application is architected as a strict Next.js 16 modular monolith. Incoming browser requests terminate at Server Components, Server Actions, and Route Handlers, which validate the session and dispatch typed commands to domain services. Identity manages guest profiles, hashed sessions, one-time OAuth 2.1 PKCE state, and AES-256-GCM encrypted MCP tokens. Guard owns household dietary profiles, ingredient rules, the active guard cart, and immutable verification snapshots. Cart-transfer manages external write attempts and a sanitized audit trace (tool name, operation kind, latency, and outcome). All communication with Silpo goes exclusively through the official MCP endpoint (https://mcp.silpo.ua/mcp) with strict Zod 4 boundary validation.\n\nPre-checkout verification is strictly read-only and produces an immutable snapshot bound to the current cart revision. Executing the transfer requires a separate user-confirmed command: PostgreSQL commits the write intent before and after the external MCP call without holding an open database transaction across network I/O. If a network drop or process crash leaves an attempt in an uncertain state, recovery reconciles against the live Silpo cart and retries only lines whose quantity has not moved from the baseline. Validated checkout URLs are accepted only from clean read-backs on https://silpo.ua subdomains.',
      uk: 'Застосунок побудовано як строгий модульний моноліт на Next.js 16. Браузерні запити обробляються на рівні Server Components, Server Actions і Route Handlers, які валідують сесію та передають типізовані команди в доменні сервіси. Модуль Identity відповідає за профілі гостей, хешовані сесії, одноразові OAuth 2.1 PKCE-транзакції та зашифровані AES-256-GCM токени MCP. Модуль Guard керує харчовими правилами учасників родини, активним вартовим кошиком і незмінними знімками перевірки. Модуль Cart-transfer веде спроби зовнішнього запису та очищений аудит-трейс (назва MCP-інструмента, тип операції, тривалість і статус). Взаємодія із «Сільпо» відбувається виключно через офіційний MCP-сервер (https://mcp.silpo.ua/mcp) із жорсткою Zod 4 валідацією на межі адаптера.\n\nПопередня перевірка працює лише на читання й формує незмінний знімок, прив’язаний до поточної ревізії чернетки. Перенесення товарів — окрема підтверджена команда: PostgreSQL фіксує намір до та після зовнішнього виклику MCP, не утримуючи транзакцію відкритою під час мережевого запиту. У разі збою мережі або падіння процесу стан uncertain узгоджується повторним читанням реального кошика «Сільпо», а повторний запис виконується лише для позицій, де кількість не змінилася відносно baseline. Посилання на checkout приймаються виключно після чистого read-back і лише для піддоменів https://silpo.ua.',
    },
    order: 1,
  },
]
