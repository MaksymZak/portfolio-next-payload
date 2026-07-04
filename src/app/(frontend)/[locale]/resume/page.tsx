import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { ResumeBento } from '@/components/resume/bento'
import { ResumeHeader } from '@/components/resume/header'
import { ResumeShell } from '@/components/resume/shell'
import { routing } from '@/i18n/routing'
import { buildPageMetadata } from '@/lib/metadata'
import {
  getExperience,
  getResume,
  getSettings,
  getSkills,
} from '@/server/repositories'
import type { DataLocale } from '@/server/types'

type ResumePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const dataLocale = locale as DataLocale
  const [settings, resume, tResume] = await Promise.all([
    getSettings(dataLocale),
    getResume(dataLocale),
    getTranslations('resume'),
  ])

  return buildPageMetadata({
    locale,
    title: `${settings.name} — ${tResume('documentTitle')}`,
    description: resume.about.text,
    path: '/resume',
    siteName: settings.name,
  })
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const dataLocale = locale as DataLocale

  const [settings, resume, skills, experience] = await Promise.all([
    getSettings(dataLocale),
    getResume(dataLocale),
    getSkills(dataLocale),
    getExperience(dataLocale),
  ])

  return (
    <ResumeShell>
      <ResumeHeader settings={settings} />
      <ResumeBento resume={resume} skills={skills} experience={experience} />
    </ResumeShell>
  )
}
