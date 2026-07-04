import { hasLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { launchCvPdfBrowser } from '@/lib/cv-pdf/launch-browser'
import { getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

export const maxDuration = 60
export const runtime = 'nodejs'

const LOCALE_FILE_SUFFIX: Record<DataLocale, string> = {
  en: 'EN',
  uk: 'UA',
}

function buildFileName(name: string, locale: DataLocale): string {
  const base = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return `${base || 'CV'}_CV_${LOCALE_FILE_SUFFIX[locale]}.pdf`
}

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? routing.defaultLocale

  if (!hasLocale(routing.locales, locale)) {
    return Response.json({ ok: false, error: 'Invalid locale' }, { status: 400 })
  }

  try {
    const settings = await getSettings(locale)
    const browser = await launchCvPdfBrowser()

    try {
      const page = await browser.newPage()
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
      await page.goto(`${origin}/${locale}/resume`, {
        waitUntil: 'networkidle0',
        timeout: 45_000,
      })
      // Activate the shared `sheet:` document styles — the same attribute the
      // on-page "PDF PREVIEW" toggle sets, so preview and PDF stay identical.
      await page.evaluate(() => document.body.setAttribute('data-sheet', ''))

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      })

      return new Response(new Uint8Array(pdf), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${buildFileName(settings.name, locale)}"`,
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
        },
      })
    } finally {
      await browser.close()
    }
  } catch (error) {
    console.error('[api/cv] PDF generation failed:', error)
    return Response.json({ ok: false, error: 'PDF generation failed' }, { status: 500 })
  }
}
