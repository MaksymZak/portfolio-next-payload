'use client'

import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'
import type { Archive } from '@/payload-types'

export const ALL_CATEGORY = 'all' as const

export type ArchiveCategoryFilter = typeof ALL_CATEGORY | Archive['category']

const CATEGORY_ORDER: Archive['category'][] = ['landing', 'platform', 'campaign', 'prototype']

type ArchiveToolbarProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  activeCategory: ArchiveCategoryFilter
  onCategoryChange: (category: ArchiveCategoryFilter) => void
  availableCategories: Archive['category'][]
}

export function ArchiveToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  availableCategories,
}: ArchiveToolbarProps) {
  const t = useTranslations('archive')

  const orderedCategories = CATEGORY_ORDER.filter((category) =>
    availableCategories.includes(category),
  )

  return (
    <div className="flex flex-col justify-between gap-4 border-t border-border pt-8 md:flex-row">
      <div className="relative w-full max-w-sm shrink-0">
        <Search
          size={14}
          className="pointer-events-none absolute top-2.5 left-3 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className="w-full rounded-none border border-border bg-surface-muted py-2 pr-4 pl-9 font-mono text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/70 motion-safe:transition-colors focus:border-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={t('filtersLabel')}>
        <CategoryButton
          active={activeCategory === ALL_CATEGORY}
          onClick={() => onCategoryChange(ALL_CATEGORY)}
        >
          {t('categoryAll')}
        </CategoryButton>
        {orderedCategories.map((category) => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {t(`categories.${category}`)}
          </CategoryButton>
        ))}
      </div>
    </div>
  )
}

type CategoryButtonProps = {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function CategoryButton({ active, onClick, children }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-none border px-3 py-1.5 font-mono text-[9px] font-bold uppercase select-none motion-safe:transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-surface-muted text-muted-foreground hover:bg-surface hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
