import type { Media } from '@/payload-types'

export function resolveMediaUrl(
  media: number | Media | null | undefined,
): { src: string; alt: string; width?: number; height?: number } | null {
  if (!media || typeof media === 'number') return null

  const src = media.url?.trim()
  if (!src) return null

  return {
    src,
    alt: media.alt?.trim() || 'Case study screenshot',
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
