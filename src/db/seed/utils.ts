/** Normalize archive URLs for deduplication (host lowercase, no trailing slash). */
export function normalizeArchiveUrl(url: string | undefined): string | null {
  if (!url?.trim()) return null

  try {
    const parsed = new URL(url.trim())
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      console.warn(`[seed] WARN Malformed archive URL (unsupported protocol): ${url}`)
      return null
    }
    const path = parsed.pathname.replace(/\/+$/, '') || ''
    return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${path}${parsed.search}`
  } catch {
    console.warn(`[seed] WARN Malformed archive URL: ${url}`)
    return null
  }
}
