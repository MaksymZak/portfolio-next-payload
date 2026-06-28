import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { ResumeBento } from '@/components/resume/bento'
import { ResumeHeader } from '@/components/resume/header'
import { PrintButton } from '@/components/resume/print-button'
import { Link } from '@/i18n/navigation'
import { approvedMotionR17 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
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

  const tActions = await getTranslations('actions')
  const tResume = await getTranslations('resume')

  return (
    <div className="min-h-screen bg-background font-sans text-foreground print:min-h-0">
      <div className="sticky top-0 z-50 w-full border-b border-border bg-surface print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5 font-mono text-[10px] font-bold md:px-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-1.5 font-bold text-muted-foreground hover:text-foreground',
                approvedMotionR17,
              )}
            >
              <ArrowLeft size={12} aria-hidden />
              {tActions('backToIndex')}
            </Link>
            <span className="hidden text-border sm:inline" aria-hidden>
              |
            </span>
            <span className="hidden text-muted-foreground sm:inline">{tResume('documentTitle')}</span>
          </div>
          <PrintButton />
        </div>
      </div>

      <main id="main-content" className="mx-auto max-w-5xl p-6 md:p-12 print:mx-auto print:max-w-[900px] print:p-0">
        <ResumeHeader settings={settings} />
        <ResumeBento resume={resume} skills={skills} experience={experience} />
      </main>
    </div>
  )
}
