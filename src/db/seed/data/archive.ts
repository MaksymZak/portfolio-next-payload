import { cv } from '../cv'
import type { ArchiveSeed } from '../types'
import { normalizeArchiveUrl } from '../utils'

const explicitArchiveSeed: ArchiveSeed[] = [
  {
    title: 'A/B Testing Campaign Landing',
    role: {
      en: 'Frontend Engineering & Test Implementation',
      uk: 'Розробка Frontend та імплементація тестів',
    },
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    year: '2025',
    category: 'campaign',
    metric: {
      en: '+22% conversion lift in variant B',
      uk: '+22% збільшення конверсії у варіанті B',
    },
    order: 1,
  },
  {
    title: 'Next.js Corporate Portal',
    role: {
      en: 'Middle Frontend — Next.js Landing System',
      uk: 'Middle Frontend — Next.js лендинг система',
    },
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    year: '2025',
    category: 'platform',
    metric: {
      en: '100 lighthouse performance score',
      uk: '100 балів продуктивності lighthouse',
    },
    order: 2,
  },
  {
    title: 'Animated Crypto Event',
    role: {
      en: 'High-Performance Animated Landing',
      uk: 'Високопродуктивний анімований лендинг',
    },
    stack: ['Astro', 'GSAP', 'Tailwind CSS'],
    year: '2025',
    category: 'landing',
    order: 3,
  },
  {
    title: 'Data Analytics Tool Showcase',
    role: { en: 'Product Landing Page', uk: 'Продуктовий лендинг' },
    stack: ['Astro', 'Tailwind CSS', 'React Components'],
    year: '2024',
    category: 'landing',
    order: 4,
  },
  {
    title: 'School Webinar Registration',
    role: {
      en: 'High-Volume Lead Capture Landing System',
      uk: 'Лендинг захоплення лідів з високим навантаженням',
    },
    stack: ['Astro', 'Tailwind CSS', 'Google Tag Manager'],
    year: '2024',
    category: 'landing',
    url: 'https://school-lp.goiteens.com/webinar-ai/',
    order: 5,
  },
  {
    title: 'Interior Design Hub',
    role: {
      en: 'CMS Showcase & High-Definition Portfolio',
      uk: 'CMS рендеринг виставкового HD-портфоліо інтер`єрів',
    },
    stack: ['Astro', 'Payload CMS', 'Tailwind CSS', 'Motion'],
    year: '2024',
    category: 'landing',
    url: 'https://interior-design.goiteens.com/',
    order: 6,
  },
  {
    title: 'Fast Reading Masterclass',
    role: {
      en: 'Frontend Refactoring & Speed Optimization',
      uk: 'Frontend рефакторинг та оптимізація швидкодії',
    },
    stack: ['React', 'Tailwind CSS', 'Vite'],
    year: '2024',
    category: 'landing',
    url: 'https://fast-reading.goiteens.com/',
    order: 7,
  },
  {
    title: 'NMT 2026 Test Preparation',
    role: {
      en: 'Interactive Testing Landing System',
      uk: 'Інтерактивна система тестування для лендингу',
    },
    stack: ['Astro', 'Tailwind CSS', 'Alpine.js'],
    year: '2024',
    category: 'landing',
    url: 'https://nmt.goiteens.com/nmt-2026/',
    order: 8,
  },
  {
    title: 'Painting: Three Courses',
    role: {
      en: 'Corporate Arts CMS Integration',
      uk: 'Інтеграція CMS для курсів корпоративного живопису',
    },
    stack: ['Astro', 'Tailwind CSS'],
    year: '2023',
    category: 'landing',
    url: 'https://painting.goiteens.com/three-courses/',
    order: 9,
  },
]

const seenUrls = new Set(
  explicitArchiveSeed
    .map((item) => normalizeArchiveUrl(item.url))
    .filter((url): url is string => url !== null),
)

const cvArchiveSeed: ArchiveSeed[] = cv.portfolio.projects
  .filter((project) => {
    const normalized = normalizeArchiveUrl(project.url)
    if (!normalized || seenUrls.has(normalized)) return false
    seenUrls.add(normalized)
    return true
  })
  .map((project, index) => ({
    title: project.name,
    role: {
      en: 'Commercial Landing Page Delivery',
      uk: 'Комерційна розробка лендингу',
    },
    stack: ['Astro', 'Tailwind CSS', 'Gulp'],
    year: '2024',
    category: 'landing' as const,
    url: project.url,
    order: 10 + index,
  }))

export const archiveSeed: ArchiveSeed[] = [...explicitArchiveSeed, ...cvArchiveSeed]
