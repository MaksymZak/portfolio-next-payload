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

export async function launchLocalBrowser(): Promise<Browser> {
  const executablePath = resolveLocalChromePath()

  if (!executablePath) {
    throw new Error(
      'No local Chrome found. Set CHROME_EXECUTABLE_PATH in .env to your Chrome executable.',
    )
  }

  return puppeteer.launch({ executablePath, headless: true })
}
