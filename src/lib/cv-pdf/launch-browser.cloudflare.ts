import 'server-only'

import type { Browser } from 'puppeteer-core'

export async function launchCloudflareBrowser(): Promise<Browser> {
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
