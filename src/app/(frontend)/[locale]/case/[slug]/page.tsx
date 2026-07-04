import type { Metadata } from 'next'
import { ArrowLeft, Clock } from 'lucide-react'
import Image from 'next/image'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { buildCaseSections } from '@/components/case/build-sections'
import { CaseIndexNav } from '@/components/case/index-nav'
import { CaseSection } from '@/components/case/section'
import { Badge } from '@/components/ui/badge'
import { MonoLabel } from '@/components/ui/mono-label'
import { Clock as KyivClock } from '@/components/layout/clock'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { resolveMediaUrl } from '@/lib/media-url'
import { buildPageMetadata, buildRoadmapCaseRobots } from '@/lib/metadata'
import { getProject, getProjects, getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

type CasePageProps = {
  params: Promise<{ locale: string; slug: string }>
}

function formatNodeId(slug: string) {
  return `NODE_${slug.toUpperCase().replace(/-/g, '_')}`
}

export async function generateStaticParams() {
  const projects = await getProjects('en')

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const dataLocale = locale as DataLocale
  const [settings, project] = await Promise.all([
    getSettings(dataLocale),
    getProject(slug, dataLocale),
  ])

  if (!project) {
    return {}
  }

  const screenshot = resolveMediaUrl(project.screenshot)
  const isRoadmap = project.label === 'roadmap'

  return buildPageMetadata({
    locale,
    title: `${project.title} — ${settings.name}`,
    description: project.summary,
    path: `/case/${slug}`,
    siteName: settings.name,
    ...(screenshot
      ? {
          image: {
            url: screenshot.src,
            width: screenshot.width,
            height: screenshot.height,
            alt: screenshot.alt,
          },
        }
      : {}),
    ...(isRoadmap ? { robots: buildRoadmapCaseRobots() } : {}),
  })
}

export default async function CasePage({ params }: CasePageProps) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const dataLocale = locale as DataLocale

  const project = await getProject(slug, dataLocale)

  if (!project) {
    notFound()
  }

  const tActions = await getTranslations('actions')
  const tCase = await getTranslations('case')
  const tLabels = await getTranslations('labels')

  const sections = buildCaseSections(project, {
    overview: tCase('sections.overview'),
    goals: tCase('sections.goals'),
    stack: tCase('sections.stack'),
    metrics: tCase('sections.metrics'),
    depth: tCase('sections.depth'),
  })

  const indexItems = sections.map(({ id, num, title }) => ({ id, num, title }))
  const highlights = project.highlights ?? []
  const stack = project.stack ?? []
  const isLive = project.label === 'live'
  const depthParagraphs = project.technicalDepth
    ? project.technicalDepth.split(/\n{2,}/).filter(Boolean)
    : []
  const screenshot = resolveMediaUrl(project.screenshot)

  return (    <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground">
      <div className="sticky top-0 z-40 mx-auto w-full max-w-full border-x border-border bg-surface md:max-w-[768px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <header className="flex items-center justify-between border-b border-border px-6 py-3.5 font-mono text-[10px] lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-bold text-muted-foreground motion-safe:transition-all motion-safe:hover:-translate-x-1 hover:text-foreground"
            >
              <ArrowLeft size={12} aria-hidden />
              {tActions('backToIndex')}
            </Link>
            <span className="hidden text-border sm:inline" aria-hidden>
              |
            </span>
            <span className="hidden font-semibold text-muted-foreground uppercase sm:inline">
              {tCase('specLabel', { slug: project.slug.toUpperCase() })}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-bold text-muted-foreground uppercase">
              <Clock size={11} className="text-muted-foreground" aria-hidden />
              <KyivClock suffix={tLabels('timeZoneRegion')} />
            </span>
            <span className="hidden rounded-none border border-border bg-surface-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground uppercase md:inline">
              {tCase('verified')}
            </span>
          </div>
        </header>
      </div>

      <div className="mx-auto flex w-full max-w-full flex-1 flex-col border-x border-border bg-background md:max-w-[768px] xl:max-w-[1280px] xl:flex-row 2xl:max-w-[1536px]">
        <CaseIndexNav items={indexItems} indexTitle={tCase('indexTitle')} />

        <main id="main-content" className="flex w-full flex-col bg-background xl:w-[68%]">
          <section className="relative flex min-h-[30vh] w-full flex-col justify-center overflow-hidden border-b border-border bg-surface p-6 lg:p-12">
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"
              aria-hidden
            />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1 border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-primary uppercase">
                {tCase('nodeStudy')}
              </div>
              <h1 className="text-3xl leading-none font-extrabold tracking-tight text-foreground lg:text-5xl xl:leading-[1.1]">
                {project.title}
              </h1>
              <p className="font-mono text-sm font-semibold text-muted-foreground">{project.summary}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge
                  size="sm"
                  className={cn(
                    isLive
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-surface text-muted-foreground',
                  )}
                >
                  {tCase(`status.${project.label ?? 'roadmap'}`)}
                </Badge>
                <MonoLabel variant="accent" size="sm" className="tracking-widest">
                  {formatNodeId(project.slug)}
                </MonoLabel>
                {stack.map((item, index) => (
                  <Badge
                    key={item.id ?? `${project.slug}-hero-stack-${index}`}
                    variant="surface"
                    size="sm"
                  >
                    {item.name}
                  </Badge>
                ))}
              </div>
            </div>

            {screenshot ? (
              <div className="relative z-10 mt-8 max-w-3xl overflow-hidden border border-border bg-surface">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width ?? 1280}
                  height={screenshot.height ?? 720}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 68vw, 870px"
                  priority
                />
              </div>
            ) : null}
          </section>
          <div className="flex w-full flex-col pb-16">
            {sections.map((section) => {
              const sectionIndex = Number.parseInt(section.num, 10)

              if (section.key === 'overview') {
                return (
                  <CaseSection
                    key={section.id}
                    id={section.id}
                    index={sectionIndex}
                    title={tCase('overviewTitle')}
                  >
                    <p className="text-sm leading-relaxed font-medium text-foreground">
                      {project.summary}
                    </p>
                    <div className="space-y-2 rounded-none border border-border bg-surface p-4">
                      <MonoLabel variant="muted" size="sm" className="tracking-wide uppercase">
                        {tCase('metadataLabel')}
                      </MonoLabel>
                      <div className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between border-b border-border py-1">
                          <span className="text-muted-foreground">{tCase('role')}</span>
                          <span className="font-bold text-foreground">{project.role}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">{tCase('period')}</span>
                          <span className="font-bold text-foreground">{project.period}</span>
                        </div>
                      </div>
                    </div>
                  </CaseSection>
                )
              }

              if (section.key === 'goals') {
                return (
                  <CaseSection
                    key={section.id}
                    id={section.id}
                    index={sectionIndex}
                    title={tCase('goalsTitle')}
                  >
                    <ul className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <li
                          key={highlight.id ?? `${project.slug}-goal-${index}`}
                          className="border border-border bg-surface p-4"
                        >
                          <MonoLabel variant="accent" size="sm" className="mb-2 block">
                            {tCase('goalIndex', {
                              index: String(index + 1).padStart(2, '0'),
                            })}
                          </MonoLabel>
                          <p className="text-sm leading-relaxed text-foreground">{highlight.text}</p>
                        </li>
                      ))}
                    </ul>
                  </CaseSection>
                )
              }

              if (section.key === 'stack') {
                return (
                  <CaseSection
                    key={section.id}
                    id={section.id}
                    index={sectionIndex}
                    title={tCase('stackTitle')}
                  >
                    <div className="divide-y divide-border rounded-none border border-border bg-surface font-mono text-xs">
                      {stack.map((item, index) => (
                        <div
                          key={item.id ?? `${project.slug}-stack-${index}`}
                          className="flex flex-col justify-between gap-2 p-4 md:flex-row md:items-center"
                        >
                          <span className="font-bold text-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CaseSection>
                )
              }

              if (section.key === 'metrics') {
                return (
                  <CaseSection
                    key={section.id}
                    id={section.id}
                    index={sectionIndex}
                    title={tCase('metricsTitle')}
                  >
                    <div className="border-l-2 border-foreground bg-surface-muted px-4 py-3">
                      <MonoLabel variant="foreground" size="sm" className="tracking-widest">
                        {project.metrics}
                      </MonoLabel>
                    </div>
                  </CaseSection>
                )
              }

              return (
                <CaseSection
                  key={section.id}
                  id={section.id}
                  index={sectionIndex}
                  title={tCase('depthTitle')}
                  className="pb-16"
                >
                  <div className="space-y-4">
                    {depthParagraphs.map((paragraph, index) => (
                      <p
                        key={`${project.slug}-depth-${index}`}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CaseSection>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
