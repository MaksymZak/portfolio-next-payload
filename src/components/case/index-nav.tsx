'use client'

import { useCallback, useEffect, useState } from 'react'

import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { ThemeSwitcher } from '@/components/layout/theme-switcher'
import { cn } from '@/lib/cn'

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
    const element = document.getElementById(id)
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    setActiveId(id)
  }

  if (items.length === 0) return null

  return (
    <nav
      className="space-y-6 border-b border-border bg-surface p-6 xl:sticky xl:top-[43px] xl:h-[calc(100vh-43px)] xl:w-[32%] xl:overflow-y-auto xl:border-r xl:border-b-0 xl:p-8"
      aria-label={indexTitle}
    >
      <div className="space-y-4 border border-border bg-surface-muted p-3">
        <LocaleSwitcher />
        <ThemeSwitcher />
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
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between rounded-none border border-transparent px-3 py-2 text-left font-mono text-xs motion-safe:transition-[transform,box-shadow,background-color,color,border-color]',
                  isActive
                    ? '-translate-x-0.5 -translate-y-0.5 border-foreground bg-foreground font-bold text-background shadow-[2px_2px_0px_0px_var(--foreground)] motion-safe:active:translate-x-0 motion-safe:active:translate-y-0 motion-safe:active:shadow-none'
                    : 'text-muted-foreground motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground motion-safe:hover:bg-surface-muted motion-safe:hover:text-foreground motion-safe:hover:shadow-[2px_2px_0px_0px_var(--foreground)] motion-safe:active:translate-x-0 motion-safe:active:translate-y-0 motion-safe:active:shadow-none',
                )}
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
