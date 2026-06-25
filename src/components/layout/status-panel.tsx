'use client'

import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'

import { Clock } from './clock'

type StatusPanelProps = {
  location: string
  availability: string
  className?: string
}

export function StatusPanel({ location, availability, className }: StatusPanelProps) {
  const t = useTranslations('labels')

  return (
    <div
      className={cn(
        'space-y-3 rounded-none border border-border bg-surface-muted p-4 font-mono text-xs',
        className,
      )}
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="font-bold uppercase">{t('location')}</span>
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <MapPin size={11} className="text-muted-foreground" aria-hidden />
          {location}
        </span>
      </div>

      <div className="h-px bg-border" role="separator" />

      <div className="flex items-center justify-between text-muted-foreground">
        <span className="font-bold uppercase">{t('availability')}</span>
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-none bg-primary motion-reduce:animate-none"
            aria-hidden
          />
          {availability}
        </span>
      </div>

      <div className="h-px bg-border" role="separator" />

      <div className="flex items-center justify-between text-muted-foreground">
        <span className="font-bold uppercase">{t('localTime')}</span>
        <Clock className="font-semibold text-foreground" />
      </div>
    </div>
  )
}
