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
    value: 'Available on request',
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
    value: 'Available on request',
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
    statusLabel: 'Implemented now',
    summary: 'This portfolio as a bilingual Next.js 16 public surface with Payload kept out of the MVP1 runtime path.',
    proof: 'Demonstrates localization, clean content ownership, and structured public proof.',
    href: getPortfolioCasePath('en'),
    isNavigable: true,
  },
  {
    id: 'lms-coming-next',
    title: 'LMS',
    status: 'coming-next',
    statusLabel: 'Coming next',
    summary: 'Planned as a future cleaned-up product case once public-safe materials are ready.',
    proof: 'Reserved for deeper auth, data-flow, and product-system proof in a later slice.',
    href: null,
    isNavigable: false,
  },
  {
    id: 'landing-version-system-coming-next',
    title: 'Landing Version System',
    status: 'coming-next',
    statusLabel: 'Coming next',
    summary: 'Deferred until a sanitized public demo can explain versioned landing workflows honestly.',
    proof: 'Will stay out of MVP1 to avoid implying shipped proof before the public demo exists.',
    href: null,
    isNavigable: false,
  },
]

const commercialProofExamples: CommercialProofExample[] = [
  {
    id: 'fast-reading',
    title: 'Fast Reading',
    type: 'Course landing page',
    roleLabel: 'Frontend implementation, responsive layout, production support',
    summary: 'Built and maintained a conversion-focused landing flow with clear CTA hierarchy and fast reading paths.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://fast-reading.goiteens.com/',
    status: 'available',
  },
  {
    id: 'nmt-2026',
    title: 'NMT 2026',
    type: 'Webinar funnel',
    roleLabel: 'Frontend implementation, production updates, analytics-aware changes',
    summary: 'Supported a live education funnel with iteration-ready sections and content updates.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://nmt.goiteens.com/nmt-2026/',
    status: 'available',
  },
  {
    id: 'painting-three-courses',
    title: 'Painting: Three Courses',
    type: 'Course landing page',
    roleLabel: 'Responsive implementation, layout refinement, production support',
    summary: 'Delivered a structured page focused on clear packages, proof blocks, and mobile readability.',
    mode: 'visual',
    previewImage: null,
    outboundUrl: 'https://painting.goiteens.com/three-courses/',
    status: 'available',
  },
  {
    id: 'ai-creator',
    title: 'AI Creator',
    type: 'Education landing page',
    roleLabel: 'Frontend implementation, content updates, launch support',
    summary: 'Shipped a modern course landing with implementation-focused collaboration around promotion flows.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://ai-creator.goiteens.com/',
    status: 'available',
  },
  {
    id: 'school-webinar',
    title: 'School Webinar',
    type: 'Webinar signup page',
    roleLabel: 'Frontend implementation, responsive fixes, production maintenance',
    summary: 'Supported a webinar page with conversion-oriented frontend updates and practical launch fixes.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://school-lp.goiteens.com/webinar-ai/',
    status: 'available',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    type: 'Course landing page',
    roleLabel: 'Frontend implementation, responsive layout, production support',
    summary: 'Implemented and maintained a polished landing page with dense content blocks and clean scanning rhythm.',
    mode: 'text-led',
    previewImage: null,
    outboundUrl: 'https://interior-design.goiteens.com/',
    status: 'available',
  },
]

export const portfolioContentEn: LocalePortfolioContent = {
  locale: 'en',
  home: {
    meta: {
      title: 'Maksym Zakaliuzhnyi | Middle Frontend Developer',
      description:
        'Hiring-focused portfolio for Maksym Zakaliuzhnyi: Next.js, CMS-driven websites, production landing pages, and honest MVP case-study proof.',
      canonicalPath: getPortfolioHomePath('en'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioHomePath('en'),
        uk: getPortfolioHomePath('uk'),
      }),
      ogTitle: 'Maksym Zakaliuzhnyi | Frontend portfolio',
      ogDescription:
        'Middle Frontend Developer with React, Next.js, CMS-driven websites, and production landing-page delivery.',
    },
    hero: {
      eyebrow: 'Remote frontend opportunities',
      title: 'Middle Frontend Developer with React, Next.js, and CMS-driven websites.',
      summary:
        'I build and support production landing pages, bilingual content surfaces, and CMS-connected frontend experiences with a practical delivery mindset.',
      availability: 'Open to remote product, marketing, and CMS-driven frontend roles from Sumy, Ukraine.',
      primaryCtaLabel: 'View resume',
      primaryCtaHref: getPortfolioResumePath('en'),
      secondaryCtaLabel: 'Get in touch',
      secondaryCtaHref: '#contact',
    },
    proofMetrics: [
      { value: '4+ years', label: 'Commercial frontend delivery' },
      { value: '300+ pages', label: 'Landing pages shipped or supported' },
      { value: 'Next.js / CMS', label: 'Production support and content-managed websites' },
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
      title: 'Commercial landing pages',
      intro:
        'A focused sample of public work that shows implementation, responsive delivery, support, and practical iteration at production speed.',
      examples: commercialProofExamples,
    },
    selectedProjects,
    contactSection: {
      title: 'Get in touch',
      intro:
        'Open to remote Middle Frontend / Next.js roles in Ukrainian and European companies. Fastest path: email or GitHub.',
      location: 'Sumy, Ukraine',
      availability: 'Remote only',
      methods: contacts,
    },
  },
  resume: {
    meta: {
      title: 'Resume | Maksym Zakaliuzhnyi',
      description: 'Compact English resume for remote Middle Frontend opportunities.',
      canonicalPath: getPortfolioResumePath('en'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioResumePath('en'),
        uk: getPortfolioResumePath('uk'),
      }),
      ogTitle: 'Resume | Maksym Zakaliuzhnyi',
      ogDescription: 'Short resume covering positioning, experience, projects, and contacts.',
    },
    header: {
      name: 'Maksym Zakaliuzhnyi',
      role: 'Middle Frontend / Next.js Developer',
      summary:
        'Production-focused frontend developer with strong landing-page delivery, CMS-driven website work, and practical backend-integration experience.',
      location: 'Sumy, Ukraine · Remote only',
    },
    positioningSummary: [
      '4+ years of commercial frontend work across landing systems, product-facing UI, and content-managed websites.',
      'Strongest proof: React, Next.js, TypeScript, Tailwind CSS, Payload CMS, responsive implementation, and production support.',
      'Targeting remote Middle Frontend roles with honest scope, fast recruiter scanning, and public-safe proof.',
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
        period: 'June 2024 – Present',
        bullets: [
          'Developed and supported production landing pages with Next.js, Payload CMS, Astro, and modern frontend tooling.',
          'Implemented A/B testing logic, analytics-aware updates, and conversion-oriented frontend improvements.',
          'Supported scalable frontend delivery and contributed through review and guidance.',
        ],
      },
      {
        company: 'SoftRyzen Company',
        role: 'Frontend Developer',
        period: 'July 2022 – April 2024',
        bullets: [
          'Delivered a high volume of commercial landing pages and frontend interfaces with Gulp, React, JavaScript, and CSS.',
          'Collaborated with designers and backend developers to ship responsive, production-ready UI.',
          'Improved layout quality, maintainability, and frontend performance across client work.',
        ],
      },
    ],
    selectedProjects,
    contacts,
  },
  portfolioCmsCase: {
    meta: {
      title: 'Portfolio CMS case | Maksym Zakaliuzhnyi',
      description: 'Public-safe MVP1 case page for the bilingual Next.js portfolio.',
      canonicalPath: getPortfolioCasePath('en'),
      alternatePaths: getAlternatePortfolioPaths({
        en: getPortfolioCasePath('en'),
        uk: getPortfolioCasePath('uk'),
      }),
      ogTitle: 'Portfolio CMS case study',
      ogDescription: 'Overview, goals, stack, proof, scope, architecture, and workflow for the public portfolio MVP.',
    },
    slug: 'portfolio-cms',
    overview: [
      'Portfolio CMS is the public hiring surface for this repository: a bilingual portfolio built with Next.js App Router and a deliberately code-owned content layer for MVP1.',
      'The case focuses on presenting recruiter-ready proof quickly while keeping Payload available in the repo for later migrations, not runtime public content.',
    ],
    goals: [
      'Ship a fast recruiter-scanning public surface that is honest about current scope.',
      'Keep English and Ukrainian as equal first-class routes.',
      'Use small slices so the portfolio can go live before larger product proof is polished.',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Payload CMS 3', 'Postgres'],
    demonstrates: [
      'A practical App Router structure for localized public routes.',
      'Clear separation between public runtime content and future CMS ownership.',
      'Spec-driven delivery with explicit scope, parity, and trust guardrails.',
    ],
    currentScope: [
      'MVP1 includes homepage, resume pages, and one public-safe case page.',
      'LMS and Landing Version System remain coming-next cards only until stronger public proof is ready.',
      'Payload stays installed for admin and future migration, but the public runtime does not depend on it yet.',
    ],
    architectureDecisions: [
      'Localized content is stored in typed TypeScript modules to keep parity reviewable and explicit.',
      'Root route behavior stays simple: fixed redirect to English instead of automatic locale detection.',
      'Theme state is treated as a lightweight client preference, while the rest of the public UI remains server-first.',
    ],
    workflow: {
      title: 'SDD / Spec Kit workflow',
      summary: 'This MVP was shaped through a documentation-first flow before implementation began.',
      steps: [
        'Lock product scope, design rules, and release slices.',
        'Define specification, plan, data model, contract, and tasks for the public MVP.',
        'Implement in small validated slices and keep the release plan in sync after each checkpoint.',
      ],
    },
  },
  shared: {
    themeOptions: [
      {
        id: 'light',
        label: 'Editorial Light',
        description: 'Default high-clarity reading mode.',
      },
      {
        id: 'dark',
        label: 'Graphite Dark',
        description: 'Technical darker reading mode with the same hierarchy.',
      },
      {
        id: 'warm',
        label: 'Warm Neutral',
        description: 'Softer editorial alternative without changing density.',
      },
      {
        id: 'contrast',
        label: 'High Contrast',
        description: 'Accessibility-first high-contrast mode.',
      },
    ],
    labels: {
      contactAvailability: 'Remote only',
      selectedProjectsTitle: 'Selected projects',
      commercialProofTitle: 'Commercial landing pages',
      resumeLabel: 'Resume',
    },
  },
}
