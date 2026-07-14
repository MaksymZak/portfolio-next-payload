'use client'

import { useCallback, useEffect, useState } from 'react'

import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { ThemeSwitcher } from '@/components/layout/theme-switcher'
import { brutalistNavItemClasses } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
import { scrollToSectionTarget } from '@/lib/home-scroll'

export type CaseIndexItem = {
  id: string
  num: string
  title: string
}

type CaseIndexNavProps = {
  items: CaseIndexItem[]
  indexTitle: string
}

const SCROLL_OFFSET = 220

export function CaseIndexNav({ items, indexTitle }: CaseIndexNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  const resolveActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + SCROLL_OFFSET

    for (const item of items) {
      const element = document.getElementById(item.id)
      if (!element) continue

      const top = element.offsetTop
      const bottom = top + element.offsetHeight

      if (scrollPosition >= top && scrollPosition < bottom) {
        return item.id
      }
    }

    return items[0]?.id ?? ''
  }, [items])

  useEffect(() => {
    const handleScroll = () => {
      setActiveId(resolveActiveSection())
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [resolveActiveSection])

  const scrollToSection = (id: string) => {
    if (!scrollToSectionTarget(id, SCROLL_OFFSET)) return
    setActiveId(id)
  }

  if (items.length === 0) return null

  return (
    <nav
      className="hidden border-b border-border bg-surface p-6 xl:sticky xl:top-[43px] xl:block xl:h-[calc(100vh-43px)] xl:w-[32%] xl:space-y-6 xl:overflow-y-auto xl:border-r xl:border-b-0 xl:p-8"
      aria-label={indexTitle}
    >
      <div className="hidden space-y-4 border border-border bg-surface-muted p-3 xl:block">
        <LocaleSwitcher showSection />
        <ThemeSwitcher showSection />
      </div>

      <div className="space-y-2">
        <span className="block font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          {indexTitle}
        </span>
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${item.num} ${item.title}`}
                className={brutalistNavItemClasses(isActive)}
              >
                <span className="truncate">{item.title}</span>
                <span
                  className={cn(
                    'text-[10px] font-bold',
                    isActive ? 'text-background' : 'text-primary',
                  )}
                >
                  [{item.num}]
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
