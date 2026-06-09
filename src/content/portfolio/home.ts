import { siteContacts, type ContactChannel } from '@/config/site'
import type { Locale } from '@/i18n/routing'

export type ProofMetric = { value: string; label: string }

export type CommercialExample = {
  id: string
  title: string
  type: string
  role: string
  summary: string
  mode: 'visual' | 'text-led'
  outboundUrl: string
}

export type ProjectCard = {
  id: string
  title: string
  status: 'implemented' | 'coming-next'
  statusLabel: string
  summary: string
  proof: string
  href: string | null
}

export type HomeContent = {
  hero: {
    eyebrow: string
    title: string
    summary: string
    availability: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  metrics: ProofMetric[]
  skills: { eyebrow: string; title: string; intro: string; items: string[] }
  projects: { eyebrow: string; title: string; intro: string; cards: ProjectCard[] }
  commercial: { eyebrow: string; title: string; intro: string; examples: CommercialExample[] }
  contact: {
    eyebrow: string
    title: string
    intro: string
    location: string
    availability: string
    channels: ContactChannel[]
  }
}

const sharedSkills = [
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Payload CMS',
  'Responsive UI',
  'A/B testing',
  'Production support',
]

const commercialEn: CommercialExample[] = [
  {
    id: 'fast-reading',
    title: 'Fast Reading',
    type: 'Course landing page',
    role: 'Frontend implementation · responsive layout · production support',
    summary:
      'Built and maintained a conversion-focused landing flow with clear CTA hierarchy and fast reading paths.',
    mode: 'visual',
    outboundUrl: 'https://fast-reading.goiteens.com/',
  },
  {
    id: 'nmt-2026',
    title: 'NMT 2026',
    type: 'Webinar funnel',
    role: 'Frontend implementation · production updates · analytics-aware changes',
    summary: 'Supported a live education funnel with iteration-ready sections and content updates.',
    mode: 'visual',
    outboundUrl: 'https://nmt.goiteens.com/nmt-2026/',
  },
  {
    id: 'painting-three-courses',
    title: 'Painting: Three Courses',
    type: 'Course landing page',
    role: 'Responsive implementation · layout refinement · production support',
    summary:
      'Delivered a structured page focused on clear packages, proof blocks, and mobile readability.',
    mode: 'visual',
    outboundUrl: 'https://painting.goiteens.com/three-courses/',
  },
  {
    id: 'ai-creator',
    title: 'AI Creator',
    type: 'Education landing page',
    role: 'Frontend implementation · content updates · launch support',
    summary:
      'Shipped a modern course landing with implementation-focused collaboration around promotion flows.',
    mode: 'text-led',
    outboundUrl: 'https://ai-creator.goiteens.com/',
  },
  {
    id: 'school-webinar',
    title: 'School Webinar',
    type: 'Webinar signup page',
    role: 'Frontend implementation · responsive fixes · production maintenance',
    summary:
      'Supported a webinar page with conversion-oriented frontend updates and practical launch fixes.',
    mode: 'text-led',
    outboundUrl: 'https://school-lp.goiteens.com/webinar-ai/',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    type: 'Course landing page',
    role: 'Frontend implementation · responsive layout · production support',
    summary:
      'Implemented and maintained a polished landing page with dense content blocks and clean scanning rhythm.',
    mode: 'text-led',
    outboundUrl: 'https://interior-design.goiteens.com/',
  },
]

const commercialUk: CommercialExample[] = [
  {
    id: 'fast-reading',
    title: 'Fast Reading',
    type: 'Лендінг курсу',
    role: 'Frontend implementation · responsive layout · production support',
    summary: 'Лендінг із чіткою CTA-ієрархією та швидким сценарієм ознайомлення для користувача.',
    mode: 'visual',
    outboundUrl: 'https://fast-reading.goiteens.com/',
  },
  {
    id: 'nmt-2026',
    title: 'NMT 2026',
    type: 'Вебінарна воронка',
    role: 'Frontend implementation · production updates · analytics-aware changes',
    summary: 'Підтримка живої освітньої воронки з ітераційними оновленнями секцій і контенту.',
    mode: 'visual',
    outboundUrl: 'https://nmt.goiteens.com/nmt-2026/',
  },
  {
    id: 'painting-three-courses',
    title: 'Painting: Three Courses',
    type: 'Лендінг курсу',
    role: 'Responsive implementation · layout refinement · production support',
    summary:
      'Сторінка з чіткою структурою пакетів, proof-блоками та зручною мобільною читабельністю.',
    mode: 'visual',
    outboundUrl: 'https://painting.goiteens.com/three-courses/',
  },
  {
    id: 'ai-creator',
    title: 'AI Creator',
    type: 'Освітній лендінг',
    role: 'Frontend implementation · content updates · launch support',
    summary: 'Сучасний курс-лендінг із практичною реалізацією та підтримкою промо-оновлень.',
    mode: 'text-led',
    outboundUrl: 'https://ai-creator.goiteens.com/',
  },
  {
    id: 'school-webinar',
    title: 'School Webinar',
    type: 'Сторінка реєстрації на вебінар',
    role: 'Frontend implementation · responsive fixes · production maintenance',
    summary: 'Публічна сторінка з conversion-oriented оновленнями та практичними production fixes.',
    mode: 'text-led',
    outboundUrl: 'https://school-lp.goiteens.com/webinar-ai/',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    type: 'Лендінг курсу',
    role: 'Frontend implementation · responsive layout · production support',
    summary:
      'Щільний, але читабельний лендінг із чистим ритмом секцій і production-oriented реалізацією.',
    mode: 'text-led',
    outboundUrl: 'https://interior-design.goiteens.com/',
  },
]

function projectsEn(locale: Locale): ProjectCard[] {
  return [
    {
      id: 'portfolio-cms',
      title: 'Portfolio CMS',
      status: 'implemented',
      statusLabel: 'Implemented now',
      summary:
        'This portfolio as a bilingual Next.js 16 public surface with Payload kept out of the runtime content path.',
      proof: 'Demonstrates localization, clean content ownership, and structured public proof.',
      href: `/${locale}/projects/portfolio-cms`,
    },
    {
      id: 'lms',
      title: 'LMS',
      status: 'coming-next',
      statusLabel: 'Coming next',
      summary: 'Planned as a future cleaned-up product case once public-safe materials are ready.',
      proof: 'Reserved for deeper auth, data-flow, and product-system proof in a later slice.',
      href: null,
    },
    {
      id: 'landing-version-system',
      title: 'Landing Version System',
      status: 'coming-next',
      statusLabel: 'Coming next',
      summary:
        'Deferred until a sanitized public demo can explain versioned landing workflows honestly.',
      proof: 'Stays out of scope to avoid implying shipped proof before the public demo exists.',
      href: null,
    },
  ]
}

function projectsUk(locale: Locale): ProjectCard[] {
  return [
    {
      id: 'portfolio-cms',
      title: 'Portfolio CMS',
      status: 'implemented',
      statusLabel: 'Реалізовано зараз',
      summary:
        'Це портфоліо як двомовна публічна поверхня на Next.js 16, де Payload поки не є runtime-джерелом контенту.',
      proof:
        'Показує локалізацію, чітке розділення відповідальності за контент і структурований публічний proof.',
      href: `/${locale}/projects/portfolio-cms`,
    },
    {
      id: 'lms',
      title: 'LMS',
      status: 'coming-next',
      statusLabel: 'Наступним етапом',
      summary:
        'Запланований майбутній кейс після очищення матеріалів і підготовки публічного proof.',
      proof: 'Залишається відкладеним, щоб не видавати майбутній proof за вже завершений.',
      href: null,
    },
    {
      id: 'landing-version-system',
      title: 'Landing Version System',
      status: 'coming-next',
      statusLabel: 'Наступним етапом',
      summary:
        'Відкладено до появи санітизованого публічного демо для чесного пояснення versioned workflow.',
      proof: 'Не входить до обсягу, щоб не створювати враження, ніби демо вже готове.',
      href: null,
    },
  ]
}

const content: Record<Locale, (locale: Locale) => HomeContent> = {
  en: (locale) => ({
    hero: {
      eyebrow: 'Open to remote frontend roles',
      title: 'Middle Frontend Developer with React, Next.js, and CMS-driven websites.',
      summary:
        'I build and support production landing pages, bilingual content surfaces, and CMS-connected frontend experiences with a practical delivery mindset.',
      availability:
        'Open to remote product, marketing, and CMS-driven frontend roles from Sumy, Ukraine.',
      primaryCtaLabel: 'View resume',
      primaryCtaHref: `/${locale}/resume`,
      secondaryCtaLabel: 'Get in touch',
      secondaryCtaHref: '#contact',
    },
    metrics: [
      { value: '4+ years', label: 'Commercial frontend delivery' },
      { value: '300+ pages', label: 'Landing pages shipped or supported' },
      { value: 'Next.js / CMS', label: 'Production support and content-managed websites' },
    ],
    skills: {
      eyebrow: 'Core stack',
      title: 'The tools I reach for in production.',
      intro: 'A focused stack for content-driven, conversion-oriented frontend work.',
      items: sharedSkills,
    },
    projects: {
      eyebrow: 'Selected projects',
      title: 'What I am building, stated honestly.',
      intro: 'One implemented case and two openly marked as coming next — no overstated proof.',
      cards: projectsEn(locale),
    },
    commercial: {
      eyebrow: 'Commercial proof',
      title: 'Commercial landing pages.',
      intro:
        'A focused sample of public work that shows implementation, responsive delivery, support, and practical iteration at production speed.',
      examples: commercialEn,
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get in touch.',
      intro:
        'Open to remote Middle Frontend / Next.js roles in Ukrainian and European companies. Fastest path: email or GitHub.',
      location: 'Sumy, Ukraine',
      availability: 'Remote only',
      channels: siteContacts,
    },
  }),
  uk: (locale) => ({
    hero: {
      eyebrow: 'Відкритий до remote frontend ролей',
      title: 'Middle Frontend Developer з React, Next.js та CMS-driven websites.',
      summary:
        'Я створюю та підтримую production landing pages, двомовні content surfaces і frontend-досвід, повʼязаний із CMS, з практичним delivery mindset.',
      availability:
        'Відкритий до remote frontend ролей для продуктів, маркетингових сайтів і CMS-driven проєктів. Працюю з Сум, Україна.',
      primaryCtaLabel: 'Переглянути резюме',
      primaryCtaHref: `/${locale}/resume`,
      secondaryCtaLabel: 'Зв’язатися',
      secondaryCtaHref: '#contact',
    },
    metrics: [
      { value: '4+ роки', label: 'Комерційна frontend-розробка' },
      { value: '300+ сторінок', label: 'Лендінгів реалізовано або підтримано' },
      { value: 'Next.js / CMS', label: 'Production support і content-managed websites' },
    ],
    skills: {
      eyebrow: 'Основний стек',
      title: 'Інструменти, якими працюю в production.',
      intro: 'Сфокусований стек для content-driven і conversion-oriented frontend-роботи.',
      items: sharedSkills,
    },
    projects: {
      eyebrow: 'Вибрані проєкти',
      title: 'Що я будую — чесно.',
      intro:
        'Один реалізований кейс і два відкрито позначені як наступні — без перебільшеного proof.',
      cards: projectsUk(locale),
    },
    commercial: {
      eyebrow: 'Комерційний proof',
      title: 'Комерційні лендінги.',
      intro:
        'Сфокусована вибірка публічних робіт, яка показує implementation, responsive delivery, support і практичні ітерації в production.',
      examples: commercialUk,
    },
    contact: {
      eyebrow: 'Контакти',
      title: 'Звʼяжіться зі мною.',
      intro:
        'Відкритий до remote Middle Frontend / Next.js ролей в українських та європейських компаніях. Найшвидший контакт: email або GitHub.',
      location: 'Суми, Україна',
      availability: 'Лише remote',
      channels: siteContacts,
    },
  }),
}

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale](locale)
}
