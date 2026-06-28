import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Archive } from '@/components/sections/archive'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Stack } from '@/components/sections/stack'
import { ToastProvider } from '@/components/ui/toast'
import { routing } from '@/i18n/routing'
import { buildPageMetadata, buildSiteName } from '@/lib/metadata'
import {
  getArchive,
  getExperience,
  getHome,
  getProjects,
  getSettings,
  getSkills,
} from '@/server/repositories'
import type { DataLocale } from '@/server/types'

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const dataLocale = locale as DataLocale
  const [settings, home] = await Promise.all([getSettings(dataLocale), getHome(dataLocale)])

  return buildPageMetadata({
    locale,
    title: buildSiteName(settings),
    description: home.hero.copy,
    siteName: settings.name,
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const dataLocale = locale as DataLocale

  const [settings, home, projects, archive, experience, skills] = await Promise.all([
    getSettings(dataLocale),
    getHome(dataLocale),
    getProjects(dataLocale),
    getArchive(dataLocale),
    getExperience(dataLocale),
    getSkills(dataLocale),
  ])

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header settings={settings} />

        <div className="mx-auto flex w-full max-w-full flex-1 flex-col border-x border-border bg-background transition-all duration-300 md:max-w-[768px] xl:max-w-[1280px] xl:flex-row 2xl:max-w-[1536px]">
          <Sidebar settings={settings} />

          <main
            id="right-column-stream"
            className="flex w-full flex-col bg-background text-foreground xl:w-[68%]"
          >
            <Hero locale={dataLocale} />
            <Stack proof={home.proof} skills={skills} />
            <Projects projects={projects} />
            <Archive items={archive} />
            <Experience items={experience} />
            <Contact contacts={settings.contacts ?? []} />
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
