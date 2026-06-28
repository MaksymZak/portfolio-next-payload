type ResolveExternalUrlOptions = {
  context?: string
}

/**
 * Returns a safe http(s) URL or null. Logs WARN in development for malformed values.
 */
export function resolveExternalUrl(
  url: string | null | undefined,
  options?: ResolveExternalUrlOptions,
): string | null {
  const trimmed = url?.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      warnMalformedUrl(trimmed, options?.context)
      return null
    }
    return parsed.href
  } catch {
    warnMalformedUrl(trimmed, options?.context)
    return null
  }
}

export function resolveResumeHref(resumeUrl: string | null | undefined): {
  href: string
  external: boolean
} {
  const external = resolveExternalUrl(resumeUrl, { context: 'settings.resumeUrl' })
  if (external) {
    return { href: external, external: true }
  }
  return { href: '/resume', external: false }
}

function warnMalformedUrl(url: string, context?: string) {
  if (process.env.NODE_ENV !== 'development') return
  const label = context ? ` (${context})` : ''
  console.warn(`[external-url] Malformed or unsupported URL${label}: ${url}`)
}
