'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

export function HeroCtas() {
  const t = useTranslations('actions')

  const handleScroll = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <div className="relative flex flex-wrap gap-4 pt-4 font-mono text-sm">
      <Button
        type="button"
        variant="primary"
        size="lg"
        id="action-view-projects"
        className="px-7 py-3"
        onClick={() => handleScroll('projects')}
      >
        {t('viewProjects')}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        id="action-get-touch"
        className="border-2 border-foreground px-7 py-3 shadow-[4px_4px_0px_0px_var(--foreground)] motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        onClick={() => handleScroll('contact')}
      >
        {t('contactMe')}
      </Button>
    </div>
  )
}
