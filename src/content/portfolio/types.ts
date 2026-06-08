export const portfolioLocales = ['en', 'uk'] as const

export type PortfolioLocale = (typeof portfolioLocales)[number]

export const portfolioThemeIds = ['light', 'dark', 'warm', 'contrast'] as const

export type PortfolioThemeId = (typeof portfolioThemeIds)[number]

export type ProofMetric = {
  label: string
  value: string
}

export type RouteMetadataContent = {
  title: string
  description: string
  canonicalPath: string
  alternatePaths: Record<PortfolioLocale | 'x-default', string>
  ogTitle: string
  ogDescription: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  summary: string
  availability: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export type CommercialProofExample = {
  id: string
  title: string
  type: string
  roleLabel: string
  summary: string
  mode: 'visual' | 'text-led'
  previewImage: string | null
  outboundUrl: string | null
  status: 'available' | 'link-disabled'
}

export type CommercialProofBlock = {
  title: string
  intro: string
  examples: CommercialProofExample[]
}

export type SelectedProjectCard = {
  id: 'portfolio-cms' | 'lms-coming-next' | 'landing-version-system-coming-next'
  title: string
  status: 'implemented' | 'coming-next'
  statusLabel: string
  summary: string
  proof: string
  href: string | null
  isNavigable: boolean
}

export type ContactMethod = {
  id: 'email' | 'linkedin' | 'github' | 'telegram'
  label: string
  value: string
  href: string | null
  priority: number
  showOnHome: boolean
  showOnResume: boolean
}

export type ContactSectionContent = {
  title: string
  intro: string
  location: string
  availability: string
  methods: ContactMethod[]
}

export type HomePageContent = {
  meta: RouteMetadataContent
  hero: HeroContent
  proofMetrics: ProofMetric[]
  coreSkills: string[]
  commercialProof: CommercialProofBlock
  selectedProjects: SelectedProjectCard[]
  contactSection: ContactSectionContent
}

export type ResumeHeaderContent = {
  name: string
  role: string
  summary: string
  location: string
}

export type ExperienceSummaryItem = {
  company: string
  role: string
  period: string
  bullets: string[]
}

export type ResumePageContent = {
  meta: RouteMetadataContent
  header: ResumeHeaderContent
  positioningSummary: string[]
  coreSkills: string[]
  experienceSummary: ExperienceSummaryItem[]
  selectedProjects: SelectedProjectCard[]
  contacts: ContactMethod[]
}

export type WorkflowReference = {
  title: string
  steps: string[]
  summary: string
}

export type PortfolioCaseContent = {
  meta: RouteMetadataContent
  slug: 'portfolio-cms'
  overview: string[]
  goals: string[]
  stack: string[]
  demonstrates: string[]
  currentScope: string[]
  architectureDecisions: string[]
  workflow: WorkflowReference
}

export type ThemeOption = {
  id: PortfolioThemeId
  label: string
  description: string
}

export type SharedContent = {
  themeOptions: ThemeOption[]
  labels: {
    contactAvailability: string
    selectedProjectsTitle: string
    commercialProofTitle: string
    resumeLabel: string
  }
}

export type LocalePortfolioContent = {
  locale: PortfolioLocale
  home: HomePageContent
  resume: ResumePageContent
  portfolioCmsCase: PortfolioCaseContent
  shared: SharedContent
}
