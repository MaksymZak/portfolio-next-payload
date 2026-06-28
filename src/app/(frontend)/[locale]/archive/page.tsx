import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { ArchiveTable } from '@/components/archive/table'
import { SectionTag } from '@/components/ui/section-tag'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { buildPageMetadata } from '@/lib/metadata'
import { getArchive, getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

type ArchivePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const dataLocale = locale as DataLocale
  const [settings, tArchive] = await Promise.all([
    getSettings(dataLocale),
    getTranslations('archive'),
  ])

  return buildPageMetadata({
    locale,
    title: `${tArchive('title')} — ${settings.name}`,
    description: tArchive('description'),
    path: '/archive',
    siteName: settings.name,
  })
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const dataLocale = locale as DataLocale

  const [items, tActions, tArchive] = await Promise.all([
    getArchive(dataLocale),
    getTranslations('actions'),
    getTranslations('archive'),
  ])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="sticky top-0 z-50 w-full border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5 font-mono text-[10px] font-bold md:px-12">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-muted-foreground motion-safe:transition-all motion-safe:hover:-translate-x-1 hover:text-foreground"
          >
            <ArrowLeft size={12} aria-hidden />
            {tActions('backToIndex')}
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-5xl p-6 md:p-12">
        <div className="space-y-4">
          <SectionTag index={4}>{tArchive('sectionTag')}</SectionTag>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {tArchive('title')}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed font-medium text-muted-foreground">
            {tArchive('description')}
          </p>
        </div>

        <div className="mt-10">
          <ArchiveTable items={items} />
        </div>
      </main>
    </div>
  )
}
