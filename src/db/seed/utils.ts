export function splitPosition(position: string): { role: string; company: string } {
  const [role, company] = position.split(' — ')
  return { role: role?.trim() ?? position, company: company?.trim() ?? '' }
}

export function splitLanguage(entry: string): { name: string; level: string } {
  const [name, level] = entry.split(' - ')
  return { name: name?.trim() ?? entry, level: level?.trim() ?? '' }
}

export function countSkillLevel(levels: boolean[]) {
  return levels.filter(Boolean).length
}

export function mapContactType(icon: string) {
  const allowed = ['phone', 'mail', 'telegram', 'github', 'linkedin', 'map'] as const
  return allowed.includes(icon as (typeof allowed)[number])
    ? (icon as (typeof allowed)[number])
    : 'mail'
}

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
