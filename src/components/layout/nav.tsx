'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

import { brutalistNavItemClasses, type BrutalistNavVariant } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
import {
  HOME_SCROLL_SETTLE_MS,
  hasScrollSettled,
  resolveSectionFromScroll,
  scrollToSectionTarget,
} from '@/lib/home-scroll'

export const NAV_SECTIONS = [
  { id: 'hero', number: '01', messageKey: 'hero' },
  { id: 'stack', number: '02', messageKey: 'stack' },
  { id: 'projects', number: '03', messageKey: 'projects' },
  { id: 'archive', number: '04', messageKey: 'archive' },
  { id: 'experience', number: '05', messageKey: 'experience' },
  { id: 'contact', number: '06', messageKey: 'contact' },
] as const

export type NavSectionId = (typeof NAV_SECTIONS)[number]['id']

const SECTION_IDS = NAV_SECTIONS.map((item) => item.id)

type NavProps = {
  className?: string
  variant?: BrutalistNavVariant
  onNavigate?: (sectionId: NavSectionId, navigate: () => void) => void
}

function stripNavNumber(label: string): string {
  return label.replace(/^\d+\s+/, '')
}

export function Nav({ className, variant = 'sidebar', onNavigate }: NavProps) {
  const t = useTranslations('nav')
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero')
  const targetLockRef = useRef<{ sectionId: NavSectionId; until: number } | null>(null)

  const performNavigate = useCallback((sectionId: NavSectionId) => {
    if (!scrollToSectionTarget(sectionId)) return

    targetLockRef.current = {
      sectionId,
      until: Date.now() + HOME_SCROLL_SETTLE_MS,
    }
    setActiveSection(sectionId)
  }, [])

  const handleNavigate = useCallback(
    (sectionId: NavSectionId) => {
      if (onNavigate) {
        onNavigate(sectionId, () => performNavigate(sectionId))
        return
      }

      performNavigate(sectionId)
    },
    [onNavigate, performNavigate],
  )

  useEffect(() => {
    const handleScroll = () => {
      const lock = targetLockRef.current

      if (lock) {
        if (Date.now() < lock.until) {
          if (hasScrollSettled(lock.sectionId)) {
            targetLockRef.current = null
          } else {
            setActiveSection(lock.sectionId)
            return
          }
        } else {
          targetLockRef.current = null
        }
      }

      const resolved = resolveSectionFromScroll(SECTION_IDS)
      if (resolved) {
        setActiveSection(resolved as NavSectionId)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            className={brutalistNavItemClasses(isActive, variant)}
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
