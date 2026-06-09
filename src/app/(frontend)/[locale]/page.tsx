import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Foundation shell
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Portfolio app shell is live.
      </h1>
      <p className="mt-6 max-w-2xl text-base text-muted-foreground">
        Routing, theming, navigation and the typed content foundation are in place. Page sections
        land in the next specs.
      </p>
    </div>
  )
}
