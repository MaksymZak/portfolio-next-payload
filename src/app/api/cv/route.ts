import { hasLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

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
  // PDF generation is local-only: production serves pre-generated files from R2
  // (NEXT_PUBLIC_CV_URL_EN / NEXT_PUBLIC_CV_URL_UK). Headless Chromium does not
  // fit the Vercel Hobby plan, so this route is a stub there.
  if (process.env.VERCEL) {
    return Response.json(
      { ok: false, error: 'On-demand PDF generation is disabled on Vercel' },
      { status: 404 },
    )
  }

  const { origin, searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? routing.defaultLocale

  if (!hasLocale(routing.locales, locale)) {
    return Response.json({ ok: false, error: 'Invalid locale' }, { status: 400 })
  }

  // `stage` pins down where generation died, which beats a bare
  // "PDF generation failed" in the logs.
  let stage = 'settings'
  const startedAt = Date.now()
  const elapsed = () => `${Date.now() - startedAt}ms`

  try {
    const settings = await getSettings(locale)

    stage = 'launch'
    // Dynamic import keeps puppeteer-core out of the traced Vercel bundle —
    // the guard above returns before this line ever runs there.
    const { launchCvPdfBrowser } = await import('@/lib/cv-pdf/launch-browser')
    const browser = await launchCvPdfBrowser()
    console.log(`[api/cv] browser ready (${elapsed()})`)

    try {
      const page = await browser.newPage()
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])

      stage = 'navigate'
      // `load` instead of `networkidle0`: prefetches keep sockets open and
      // networkidle0 may never fire.
      const response = await page.goto(`${origin}/${locale}/resume`, {
        waitUntil: 'load',
        timeout: 30_000,
      })
      if (!response || !response.ok()) {
        throw new Error(`Resume page responded ${response?.status() ?? 'without a response'}`)
      }

      stage = 'render'
      await page.waitForSelector('#main-content', { timeout: 10_000 })
      await page.evaluate(async () => {
        await document.fonts.ready
      })
      // Activate the shared `sheet:` document styles — the same attribute the
      // on-page "PDF PREVIEW" toggle sets, so preview and PDF stay identical.
      await page.evaluate(() => document.body.setAttribute('data-sheet', ''))
      console.log(`[api/cv] page rendered (${elapsed()})`)

      stage = 'pdf'
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      })
      console.log(`[api/cv] pdf generated (${elapsed()})`)

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
    console.error(`[api/cv] PDF generation failed at stage "${stage}" (${elapsed()}):`, error)
    return Response.json({ ok: false, error: 'PDF generation failed', stage }, { status: 500 })
  }
}
