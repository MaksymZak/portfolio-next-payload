import 'server-only'

import type { Browser } from 'puppeteer-core'

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

export async function launchCvPdfBrowser(): Promise<Browser> {
  if (await isCloudflareWorkersRuntime()) {
    const { launchCloudflareBrowser } = await import('./launch-browser.cloudflare')
    return launchCloudflareBrowser()
  }

  const { launchLocalBrowser } = await import('./launch-browser.local')
  return launchLocalBrowser()
}
