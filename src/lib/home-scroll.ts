/** Scroll offset used for home section detection and scroll-margin utilities. */
export const HOME_SCROLL_OFFSET = 80

/** Desktop xl has no sticky header on the main stream — use a smaller anchor offset. */
export const HOME_SCROLL_OFFSET_DESKTOP = 24

export const HOME_SCROLL_SETTLE_MS = 900

export const HOME_SCROLL_SETTLE_THRESHOLD = 6

/** Tailwind classes applied to home section anchors for native scroll alignment. */
export const HOME_SECTION_SCROLL_MT = 'scroll-mt-20 xl:scroll-mt-6'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Resolve header offset: sticky mobile header height + gap, or minimal desktop offset. */
export function getScrollHeaderOffset(): number {
  if (typeof window === 'undefined') return HOME_SCROLL_OFFSET

  const header = document.querySelector('header')
  if (header) {
    const style = window.getComputedStyle(header)
    if (style.display !== 'none' && style.position === 'sticky') {
      return header.getBoundingClientRect().height + 16
    }
  }

  return window.matchMedia('(min-width: 1280px)').matches
    ? HOME_SCROLL_OFFSET_DESKTOP
    : HOME_SCROLL_OFFSET
}

export function scrollToSectionTarget(sectionId: string, offsetOverride?: number): boolean {
  const element = document.getElementById(sectionId)
  if (!element) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Nav] missing scroll target: #${sectionId}`)
    }
    return false
  }

  const offset = offsetOverride ?? getScrollHeaderOffset()
  const targetTop = element.getBoundingClientRect().top + window.scrollY - offset
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const clampedTop = Math.max(0, Math.min(targetTop, maxScroll))

  window.scrollTo({
    top: clampedTop,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })

  return true
}

export function resolveSectionFromScroll(
  sectionIds: readonly string[],
  offset = getScrollHeaderOffset(),
): string | null {
  if (sectionIds.length === 0) return null

  const scrollPosition = window.scrollY + offset

  for (const id of sectionIds) {
    const element = document.getElementById(id)
    if (!element) continue

    const top = element.offsetTop
    const bottom = top + element.offsetHeight

    if (scrollPosition >= top && scrollPosition < bottom) {
      return id
    }
  }

  const atDocumentBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

  if (atDocumentBottom) {
    return sectionIds[sectionIds.length - 1] ?? null
  }

  return sectionIds[0] ?? null
}

export function hasScrollSettled(sectionId: string, threshold = HOME_SCROLL_SETTLE_THRESHOLD): boolean {
  const element = document.getElementById(sectionId)
  if (!element) return true

  const offset = getScrollHeaderOffset()
  const distanceFromTarget = Math.abs(element.getBoundingClientRect().top - offset)

  return distanceFromTarget <= threshold
}
