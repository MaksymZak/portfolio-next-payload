'use client'

import { FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export type PrintButtonProps = {
  className?: string
}

export function PrintButton({ className }: PrintButtonProps) {
  const tActions = useTranslations('actions')

  return (
    <Button
      type="button"
      variant="secondary"
      className={cn('print:hidden', className)}
      onClick={() => window.print()}
    >
      <FileText size={11} aria-hidden />
      {tActions('savePdf')}
    </Button>
  )
}
