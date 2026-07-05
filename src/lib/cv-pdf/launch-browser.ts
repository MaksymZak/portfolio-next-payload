import 'server-only'

import { existsSync } from 'node:fs'

import puppeteer, { type Browser } from 'puppeteer-core'

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

/**
 * Cloudflare Browser Rendering — only in deployed/preview Workers.
 * During `next dev`, initOpenNextCloudflareForDev stubs bindings; they cannot launch PDFs.
 */
async function isCloudflareWorkersRuntime(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    return false
  }

  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = getCloudflareContext()
    return 'BROWSER' in env && Boolean(env.BROWSER)
  } catch {
    return false
  }
}

async function launchCloudflareBrowser(): Promise<Browser> {
  const { getCloudflareContext } = await import('@opennextjs/cloudflare')
  const { env } = getCloudflareContext()
  const browserBinding = env.BROWSER

  if (!browserBinding) {
    throw new Error(
      'BROWSER binding is missing. Enable Browser Rendering and add a browser binding to wrangler.jsonc.',
    )
  }

  const cloudflarePuppeteer = await import('@cloudflare/puppeteer')
  return cloudflarePuppeteer.default.launch(browserBinding) as unknown as Browser
}

async function launchLocalBrowser(): Promise<Browser> {
  const executablePath = resolveLocalChromePath()

  if (!executablePath) {
    throw new Error(
      'No local Chrome found. Set CHROME_EXECUTABLE_PATH in .env to your Chrome executable.',
    )
  }

  return puppeteer.launch({ executablePath, headless: true })
}

export async function launchCvPdfBrowser(): Promise<Browser> {
  if (await isCloudflareWorkersRuntime()) {
    return launchCloudflareBrowser()
  }

  return launchLocalBrowser()
}
