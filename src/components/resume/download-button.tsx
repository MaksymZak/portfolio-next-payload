'use client'

import { FileText } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export type DownloadCvButtonProps = {
  className?: string
}

export function DownloadCvButton({ className }: DownloadCvButtonProps) {
  const tActions = useTranslations('actions')
  const locale = useLocale()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    if (isGenerating) return
    setIsGenerating(true)

    try {
      const response = await fetch(`/api/cv?locale=${locale}`)
      if (!response.ok) throw new Error(`PDF request failed: ${response.status}`)

      const disposition = response.headers.get('Content-Disposition')
      const fileName =
        disposition?.match(/filename="([^"]+)"/)?.[1] ?? `CV_${locale.toUpperCase()}.pdf`

      const url = URL.createObjectURL(await response.blob())
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = fileName
      anchor.click()
      URL.revokeObjectURL(url)
    } catch {
      // Server-side generation unavailable — fall back to the browser print
      // dialog with the same `sheet:` document styles the PDF route uses.
      document.body.setAttribute('data-sheet', '')
      try {
        window.print()
      } finally {
        document.body.removeAttribute('data-sheet')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className={cn('print:hidden', className)}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      <FileText size={11} aria-hidden />
      {tActions(isGenerating ? 'generatingPdf' : 'savePdf')}
    </Button>
  )
}
