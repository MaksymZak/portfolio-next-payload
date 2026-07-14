'use client'

import { Download } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button, linkControlVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type CvLocale = 'en' | 'uk'

const CV_LABELS: Record<CvLocale, string> = {
  en: 'EN',
  uk: 'UA',
}

// Pre-generated PDFs hosted on R2 (see scripts/generate-cv.ts). When the URL
// for a locale is set, its control is a plain download link and the serverless
// generation route is never called — required on the Vercel Hobby plan, where
// headless Chromium exceeds the 1024 MB function memory limit.
const STATIC_CV_URLS: Record<CvLocale, string | undefined> = {
  en: process.env.NEXT_PUBLIC_CV_URL_EN,
  uk: process.env.NEXT_PUBLIC_CV_URL_UK,
}

export type DownloadCvButtonProps = {
  className?: string
}

export function DownloadCvButton({ className }: DownloadCvButtonProps) {
  const tActions = useTranslations('actions')
  const locale = useLocale()
  const [generating, setGenerating] = useState<CvLocale | null>(null)

  // Both CV languages are always offered; the site language only picks which
  // one comes first.
  const cvLocales: CvLocale[] = locale === 'uk' ? ['uk', 'en'] : ['en', 'uk']

  const handleDownload = async (target: CvLocale) => {
    if (generating) return
    setGenerating(target)

    try {
      const response = await fetch(`/api/cv?locale=${target}`)
      if (!response.ok) throw new Error(`PDF request failed: ${response.status}`)

      const disposition = response.headers.get('Content-Disposition')
      const fileName =
        disposition?.match(/filename="([^"]+)"/)?.[1] ?? `CV_${target.toUpperCase()}.pdf`

      const url = URL.createObjectURL(await response.blob())
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = fileName
      anchor.click()
      URL.revokeObjectURL(url)
    } catch {
      // Server-side generation unavailable — the browser print dialog can only
      // capture the page in its current language, so this fallback is limited
      // to the active locale.
      if (target === locale) {
        document.body.setAttribute('data-sheet', '')
        try {
          window.print()
        } finally {
          document.body.removeAttribute('data-sheet')
        }
      }
    } finally {
      setGenerating(null)
    }
  }

  return (
    <div className={cn('flex items-center gap-2 print:hidden', className)}>
      {/* Caption carries the verb; hidden on narrow screens (≤320px budget),
          where the download icon on each button communicates the action. */}
      <span
        aria-hidden
        className="hidden font-mono text-[10px] font-bold text-muted-foreground sm:inline"
      >
        {tActions('savePdf')}
      </span>
      {cvLocales.map((target) => {
        const staticUrl = STATIC_CV_URLS[target]?.trim()
        const label = CV_LABELS[target]
        const ariaLabel = `${tActions('savePdf')} ${label}`

        if (staticUrl) {
          return (
            <a
              key={target}
              href={staticUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className={linkControlVariants({ variant: 'secondary' })}
            >
              <Download size={11} aria-hidden />
              {label}
            </a>
          )
        }

        return (
          <Button
            key={target}
            type="button"
            variant="secondary"
            aria-label={ariaLabel}
            onClick={() => handleDownload(target)}
            disabled={generating !== null}
          >
            <Download size={11} aria-hidden />
            {generating === target ? tActions('generatingPdf') : label}
          </Button>
        )
      })}
    </div>
  )
}
