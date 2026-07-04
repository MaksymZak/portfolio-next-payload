import { existsSync } from 'node:fs'

import chromium from '@sparticuz/chromium'
import { hasLocale } from 'next-intl'
import puppeteer from 'puppeteer-core'

import { routing } from '@/i18n/routing'
import { getSettings } from '@/server/repositories'
import type { DataLocale } from '@/server/types'

export const maxDuration = 60

const LOCALE_FILE_SUFFIX: Record<DataLocale, string> = {
  en: 'EN',
  uk: 'UA',
}

const LOCAL_CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
]

function resolveLocalChromePath(): string | undefined {
  const fromEnv = process.env.CHROME_EXECUTABLE_PATH
  if (fromEnv && existsSync(fromEnv)) return fromEnv
  return LOCAL_CHROME_PATHS.find((path) => existsSync(path))
}

async function launchBrowser() {
  if (process.env.VERCEL) {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    })
  }

  const executablePath = resolveLocalChromePath()
  if (!executablePath) {
    throw new Error(
      'No local Chrome found. Set CHROME_EXECUTABLE_PATH in .env to your Chrome executable.',
    )
  }

  return puppeteer.launch({ executablePath, headless: true })
}

function buildFileName(name: string, locale: DataLocale): string {
  const base = name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
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
    const browser = await launchBrowser()

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
