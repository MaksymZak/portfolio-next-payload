'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

export const NAV_SECTIONS = [
  { id: 'hero', number: '01', messageKey: 'hero' },
  { id: 'stack', number: '02', messageKey: 'stack' },
  { id: 'projects', number: '03', messageKey: 'projects' },
  { id: 'archive', number: '04', messageKey: 'archive' },
  { id: 'experience', number: '05', messageKey: 'experience' },
  { id: 'contact', number: '06', messageKey: 'contact' },
] as const

type NavSectionId = (typeof NAV_SECTIONS)[number]['id']

type NavProps = {
  className?: string
  onNavigate?: (sectionId: NavSectionId) => void
}

const navItemClass = (isActive: boolean) =>
  cn(
    'flex w-full cursor-pointer items-center justify-between rounded-none border border-transparent px-3 py-2 text-left font-mono text-xs motion-safe:transition-[transform,box-shadow,background-color,color,border-color]',
    isActive
      ? '-translate-x-0.5 -translate-y-0.5 border-foreground bg-foreground font-bold text-background shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none'
      : 'text-muted-foreground motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground motion-safe:hover:bg-surface-muted motion-safe:hover:text-foreground motion-safe:hover:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none',
  )

function stripNavNumber(label: string): string {
  return label.replace(/^\d+\s+/, '')
}

export function Nav({ className, onNavigate }: NavProps) {
  const t = useTranslations('nav')
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero')

  useEffect(() => {
    const sectionElements = NAV_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    )

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const topEntry = visible[0]
        if (topEntry?.target.id) {
          setActiveSection(topEntry.target.id as NavSectionId)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const element of sectionElements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const handleNavigate = useCallback(
    (sectionId: NavSectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      setActiveSection(sectionId)
      onNavigate?.(sectionId)
    },
    [onNavigate],
  )

  return (
    <nav className={cn('space-y-2', className)} aria-label={t('index')}>
      <p className="mb-2 block font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        {t('index')}
      </p>
      {NAV_SECTIONS.map((item) => {
        const isActive = activeSection === item.id
        const label = stripNavNumber(t(item.messageKey))

        return (
          <button
            key={item.id}
            type="button"
            id={`nav-link-${item.id}`}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${item.number} ${label}`}
            onClick={() => handleNavigate(item.id)}
            className={navItemClass(isActive)}
          >
            <span>{label}</span>
            <span
              className={cn(
                'text-[10px] font-bold',
                isActive ? 'text-background' : 'text-primary',
              )}
            >
              [{item.number}]
            </span>
          </button>
        )
      })}
    </nav>
  )
}
