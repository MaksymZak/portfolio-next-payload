import 'server-only'

import { existsSync } from 'node:fs'

import puppeteer, { type Browser } from 'puppeteer-core'

/** Keep in sync with @sparticuz/chromium-min in package.json. */
export const DEFAULT_CHROMIUM_PACK_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar'

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

function isValidPackUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function resolveChromiumPackUrl(): string {
  const fromEnv = process.env.CHROMIUM_PACK_URL?.trim()

  if (fromEnv) {
    if (isValidPackUrl(fromEnv)) return fromEnv

    console.warn(
      `[cv-pdf] Ignoring invalid CHROMIUM_PACK_URL (must be https://). Using default pack.`,
    )
  }

  return DEFAULT_CHROMIUM_PACK_URL
}

async function launchServerlessBrowser(): Promise<Browser> {
  const packUrl = resolveChromiumPackUrl()
  const { default: chromium } = await import('@sparticuz/chromium-min')

  chromium.setGraphicsMode = false

  let executablePath: string
  const downloadStartedAt = Date.now()
  try {
    executablePath = await chromium.executablePath(packUrl)
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(`Chromium pack download/extract failed (${packUrl}): ${detail}`)
  }
  console.log(`[cv-pdf] chromium binary ready in ${Date.now() - downloadStartedAt}ms`)

  return puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: 'shell',
  })
}

export async function launchCvPdfBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    return launchServerlessBrowser()
  }

  const executablePath = resolveLocalChromePath()
  if (!executablePath) {
    throw new Error(
      'No local Chrome found. Set CHROME_EXECUTABLE_PATH in .env to your Chrome executable.',
    )
  }

  return puppeteer.launch({ executablePath, headless: true })
}
