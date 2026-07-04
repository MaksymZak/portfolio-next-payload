'use client'

import { ArrowLeft, Scan } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { DownloadCvButton } from '@/components/resume/download-button'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { approvedMotionR17 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

/** A4 at 96dpi: 794×1123px; /api/cv prints with 8mm (≈30px) @page margins. */
const SHEET_WIDTH_PX = 794
const SHEET_HEIGHT_PX = 1123
const SHEET_MARGIN_PX = 30

export type ResumeShellProps = {
  children: ReactNode
}

export function ResumeShell({ children }: ResumeShellProps) {
  const tActions = useTranslations('actions')
  const tResume = useTranslations('resume')
  const [preview, setPreview] = useState(false)

  return (
    <div
      className={cn(
        'min-h-screen bg-background font-sans text-foreground print:min-h-0',
        preview && 'bg-surface-muted',
      )}
    >
      <div className="sticky top-0 z-50 w-full border-b border-border bg-surface print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5 font-mono text-[10px] font-bold md:px-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-1.5 font-bold text-muted-foreground hover:text-foreground',
                approvedMotionR17,
              )}
            >
              <ArrowLeft size={12} aria-hidden />
              {tActions('backToIndex')}
            </Link>
            <span className="hidden text-border sm:inline" aria-hidden>
              |
            </span>
            <span className="hidden text-muted-foreground sm:inline">
              {tResume('documentTitle')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={preview ? 'primary' : 'ghost'}
              aria-pressed={preview}
              className="hidden md:inline-flex"
              onClick={() => setPreview((value) => !value)}
            >
              <Scan size={11} aria-hidden />
              {tActions('previewPdf')}
            </Button>
            <DownloadCvButton />
          </div>
        </div>
      </div>

      <main
        id="main-content"
        className={cn(
          'sheet:mx-auto sheet:max-w-none sheet:p-0',
          preview ? 'overflow-x-auto py-10' : 'mx-auto max-w-5xl p-6 md:p-12',
        )}
      >
        {preview ? (
          <div className="relative mx-auto shadow-2xl" style={{ width: SHEET_WIDTH_PX }}>
            <div
              data-sheet
              className="bg-white text-black"
              style={{ minHeight: SHEET_HEIGHT_PX, padding: SHEET_MARGIN_PX }}
            >
              {children}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 border-b-2 border-dashed border-primary"
              style={{ top: SHEET_HEIGHT_PX - SHEET_MARGIN_PX }}
            >
              <span className="absolute right-0 -top-5 bg-primary px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-primary-foreground uppercase">
                {tResume('pageEnd')}
              </span>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  )
}
