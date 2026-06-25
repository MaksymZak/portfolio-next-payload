'use client'

import { FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'

export type PrintButtonProps = {
  className?: string
}

export function PrintButton({ className }: PrintButtonProps) {
  const tActions = useTranslations('actions')

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-none border-2 border-foreground bg-surface px-3 py-2 font-mono text-[10px] font-bold text-foreground uppercase select-none motion-safe:transition-[transform,box-shadow] motion-safe:duration-150 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-px active:translate-y-px active:shadow-none print:hidden',
        className,
      )}
    >
      <FileText size={11} aria-hidden />
      {tActions('savePdf')}
    </button>
  )
}
