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
        size="hero"
        id="action-view-projects"
        onClick={() => handleScroll('projects')}
      >
        {t('viewProjects')}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="hero"
        id="action-get-touch"
        onClick={() => handleScroll('contact')}
      >
        {t('contactMe')}
      </Button>
    </div>
  )
}
