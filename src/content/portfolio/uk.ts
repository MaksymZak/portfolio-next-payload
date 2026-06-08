import {
  type LocalePortfolioContent,
  type ContactMethod,
  type SelectedProjectCard,
  type CommercialProofExample,
} from './types'

import {
  getAlternatePortfolioPaths,
  getPortfolioCasePath,
  getPortfolioHomePath,
  getPortfolioResumePath,
} from '@/lib/portfolio/routes'

const contacts: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'zaksumy1989@gmail.com',
    href: 'mailto:zaksumy1989@gmail.com',
    priority: 1,
    showOnHome: true,
    showOnResume: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'За запитом',
    href: null,
    priority: 2,
    showOnHome: true,
    showOnResume: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/MaksymZak',
    href: 'https://github.com/MaksymZak',
    priority: 3,
    showOnHome: true,
    showOnResume: true,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: 'За запитом',
    href: null,
    priority: 4,
    showOnHome: true,
    showOnResume: true,
  },
]

const selectedProjects: SelectedProjectCard[] = [
  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS',
    status: 'implemented',
    statusLabel: 'Реалізовано зараз',
    summary: 'Це портфоліо як двомовна публічна поверхня на Next.js 16, де Payload поки не є runtime-джерелом контенту.',
    proof: 'Показує локалізацію, чітке розділення відповідальності за контент і структурований публічний proof.',
    href: getPortfolioCasePath('uk'),
    isNavigable: true,
  },
  {
    id: 'lms-coming-next',
    title: 'LMS',
    status: 'coming-next',
    statusLabel: 'Наступним етапом',
    summary: 'Запланований майбутній кейс після очищення матеріалів і підготовки публічного proof.',
    proof: 'Залишається відкладеним, щоб не видавати майбутній proof за вже завершений.',
    href: null,
    isNavigable: false,
  },
  {
    id: 'landing-version-system-coming-next',
    title: 'Landing Version System',
    status: 'coming-next',
    statusLabel: 'Наступним етапом',
    summary: 'Відкладено до появи санітизованого публічного демо для чесного пояснення versioned workflow.',
    proof: 'Не входить до MVP1, щоб не створювати враження, ніби демо вже готове.',
    href: null,
    isNavigable: false,
  },
]

const commercialProofExamples: CommercialProofExample[] = [
  {
    id: 'fast-reading',
    title: 'Fast Reading',
    type: 'Лендінг курсу',
    roleLabel: 'Frontend implementation, responsive layout, production support',
    summary: 'Лендінг із чіткою CTA-ієрархією та швидким сценарієм ознайомлення для користувача.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://fast-reading.goiteens.com/',
    status: 'available',
  },
  {
    id: 'nmt-2026',
    title: 'NMT 2026',
    type: 'Вебінарна воронка',
    roleLabel: 'Frontend implementation, production updates, analytics-aware changes',
    summary: 'Підтримка живої освітньої воронки з ітераційними оновленнями секцій і контенту.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://nmt.goiteens.com/nmt-2026/',
    status: 'available',
  },
  {
    id: 'painting-three-courses',
    title: 'Painting: Three Courses',
    type: 'Лендінг курсу',
    roleLabel: 'Responsive implementation, layout refinement, production support',
    summary: 'Сторінка з чіткою структурою пакетів, proof-блоками та зручною мобільною читабельністю.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://painting.goiteens.com/three-courses/',
    status: 'available',
  },
  {
    id: 'ai-creator',
    title: 'AI Creator',
    type: 'Освітній лендінг',
    roleLabel: 'Frontend implementation, content updates, launch support',
    summary: 'Сучасний курс-лендінг із практичною реалізацією та підтримкою промо-оновлень.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://ai-creator.goiteens.com/',
    status: 'available',
  },
  {
    id: 'school-webinar',
    title: 'School Webinar',
    type: 'Сторінка реєстрації на вебінар',
    roleLabel: 'Frontend implementation, responsive fixes, production maintenance',
    summary: 'Публічна сторінка з conversion-oriented оновленнями та практичними production fixes.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://school-lp.goiteens.com/webinar-ai/',
    status: 'available',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    type: 'Лендінг курсу',
    roleLabel: 'Frontend implementation, responsive layout, production support',
    summary: 'Щільний, але читабельний лендінг із чистим ритмом секцій і production-oriented реалізацією.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://interior-design.goiteens.com/',
    status: 'available',
  },
]

export const portfolioContentUk: LocalePortfolioContent = {
  locale: 'uk',
  home: {
    meta: {
      title: 'Максим Закалюжний | Middle Frontend Developer',
      description:
        'Портфоліо Максима Закалюжного для найму: Next.js, CMS-driven websites, production landing pages і чесний MVP proof.',
      canonicalPath: getPortfolioHomePath('uk'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioHomePath('en'),
        uk: getPortfolioHomePath('uk'),
      }),
      ogTitle: 'Максим Закалюжний | Frontend portfolio',
      ogDescription:
        'Middle Frontend Developer з React, Next.js, CMS-driven websites і комерційним досвідом на production landing pages.',
    },
    hero: {
      eyebrow: 'Remote frontend opportunities',
      title: 'Middle Frontend Developer з React, Next.js та CMS-driven websites.',
      summary:
        'Я створюю та підтримую production landing pages, двомовні content surfaces і frontend-досвід, повʼязаний із CMS, з практичним delivery mindset.',
      availability: 'Відкритий до remote frontend ролей для продуктів, маркетингових сайтів і CMS-driven проєктів. Працюю з Сум, Україна.',
      primaryCtaLabel: 'Переглянути резюме',
      primaryCtaHref: getPortfolioResumePath('uk'),
      secondaryCtaLabel: 'Зв’язатися',
      secondaryCtaHref: '#contact',
    },
    proofMetrics: [
      { value: '4+ роки', label: 'Комерційна frontend-розробка' },
      { value: '300+ сторінок', label: 'Лендінгів реалізовано або підтримано' },
      { value: 'Next.js / CMS', label: 'Production support і content-managed websites' },
    ],
    coreSkills: [
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Payload CMS',
      'Responsive UI',
      'A/B testing',
      'Production support',
    ],
    commercialProof: {
      title: 'Комерційні лендінги',
      intro:
        'Сфокусована вибірка публічних робіт, яка показує implementation, responsive delivery, support і практичні ітерації в production.',
      examples: commercialProofExamples,
    },
    selectedProjects,
    contactSection: {
      title: 'Контакти',
      intro:
        'Відкритий до remote Middle Frontend / Next.js ролей в українських та європейських компаніях. Найшвидший контакт: email або GitHub.',
      location: 'Суми, Україна',
      availability: 'Лише remote',
      methods: contacts,
    },
  },
  resume: {
    meta: {
      title: 'Резюме | Максим Закалюжний',
      description: 'Коротке українське резюме для remote Middle Frontend можливостей.',
      canonicalPath: getPortfolioResumePath('uk'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioResumePath('en'),
        uk: getPortfolioResumePath('uk'),
      }),
      ogTitle: 'Резюме | Максим Закалюжний',
      ogDescription: 'Коротке резюме з позиціонуванням, досвідом, проєктами та контактами.',
    },
    header: {
      name: 'Максим Закалюжний',
      role: 'Middle Frontend / Next.js Developer',
      summary:
        'Frontend-розробник із сильним proof у landing pages, CMS-driven websites і practical backend integration.',
      location: 'Суми, Україна · Лише remote',
    },
    positioningSummary: [
      '4+ роки комерційної frontend-роботи: landing systems, product-facing UI та content-managed websites.',
      'Найсильніший proof: React, Next.js, TypeScript, Tailwind CSS, Payload CMS, responsive implementation і production support.',
      'Орієнтуюся на remote Middle Frontend ролі з чесним scope, швидким recruiter scanning і public-safe proof.',
    ],
    coreSkills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Payload CMS',
      'REST APIs',
      'PostgreSQL',
    ],
    experienceSummary: [
      {
        company: 'GoITeens Company',
        role: 'Frontend Developer',
        period: 'Червень 2024 – дотепер',
        bullets: [
          'Розробляв і підтримував production landing pages на Next.js, Payload CMS, Astro та сучасному frontend tooling.',
          'Імплементував A/B testing logic, analytics-aware updates і conversion-oriented frontend improvements.',
          'Підтримував масштабовану delivery-модель і долучався через review та guidance.',
        ],
      },
      {
        company: 'SoftRyzen Company',
        role: 'Frontend Developer',
        period: 'Липень 2022 – Квітень 2024',
        bullets: [
          'Реалізовував великий обсяг commercial landing pages та frontend interfaces на Gulp, React, JavaScript і CSS.',
          'Працював із дизайнерами та backend developers для релізу responsive, production-ready UI.',
          'Покращував layout quality, maintainability і frontend performance у клієнтських проєктах.',
        ],
      },
    ],
    selectedProjects,
    contacts,
  },
  portfolioCmsCase: {
    meta: {
      title: 'Кейс Portfolio CMS | Максим Закалюжний',
      description: 'Публічно безпечний MVP1 кейс для двомовного портфоліо на Next.js.',
      canonicalPath: getPortfolioCasePath('uk'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioCasePath('en'),
        uk: getPortfolioCasePath('uk'),
      }),
      ogTitle: 'Кейс Portfolio CMS',
      ogDescription: 'Огляд, цілі, стек, proof, scope, архітектурні рішення та workflow для MVP портфоліо.',
    },
    slug: 'portfolio-cms',
    overview: [
      'Portfolio CMS — це публічна hiring-поверхня цього репозиторію: двомовне портфоліо на Next.js App Router із навмисно code-owned content layer для MVP1.',
      'Кейс показує, як швидко дати recruiter-ready proof, залишивши Payload у репозиторії для майбутньої міграції, але не як runtime public content source.',
    ],
    goals: [
      'Запустити швидкий для сканування публічний surface, чесний щодо поточного scope.',
      'Зберегти англійську та українську як рівноцінні маршрути MVP.',
      'Рухатися малими slice-ами, щоб портфоліо стало корисним до полірування більших product cases.',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Payload CMS 3', 'Postgres'],
    demonstrates: [
      'Практичну App Router-структуру для локалізованих публічних маршрутів.',
      'Чітке розділення між runtime public content і майбутнім CMS ownership.',
      'Spec-driven delivery з явними guardrails для scope, parity і trust.',
    ],
    currentScope: [
      'MVP1 включає homepage, resume pages і один public-safe case page.',
      'LMS та Landing Version System залишаються coming-next cards до появи сильнішого публічного proof.',
      'Payload лишається встановленим для admin і майбутньої міграції, але public runtime від нього не залежить.',
    ],
    architectureDecisions: [
      'Локалізований контент зберігається у typed TypeScript modules, щоб parity була явною і перевірюваною.',
      'Поводження кореневого маршруту просте: фіксований redirect на англійську замість автоматичного locale detection.',
      'Theme state розглядається як легка client preference, тоді як решта public UI лишається server-first.',
    ],
    workflow: {
      title: 'SDD / Spec Kit workflow',
      summary: 'Цей MVP формувався через documentation-first flow до початку реалізації.',
      steps: [
        'Зафіксувати product scope, design rules і release slices.',
        'Підготувати specification, plan, data model, contract і tasks для public MVP.',
        'Імплементувати малими валідуємими slice-ами та після кожного checkpoint оновлювати release plan.',
      ],
    },
  },
  shared: {
    themeOptions: [
      {
        id: 'light',
        label: 'Editorial Light',
        description: 'Базовий режим із максимальною читабельністю.',
      },
      {
        id: 'dark',
        label: 'Graphite Dark',
        description: 'Темний технічний режим із тією ж ієрархією.',
      },
      {
        id: 'warm',
        label: 'Warm Neutral',
        description: 'Мʼякша editorial-альтернатива без втрати щільності.',
      },
      {
        id: 'contrast',
        label: 'High Contrast',
        description: 'Accessibility-first high-contrast режим.',
      },
    ],
    labels: {
      contactAvailability: 'Лише remote',
      selectedProjectsTitle: 'Обрані проєкти',
      commercialProofTitle: 'Комерційні лендінги',
      resumeLabel: 'Резюме',
    },
  },
}
