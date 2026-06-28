'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import type { Archive } from '@/payload-types'

import { ALL_CATEGORY, ArchiveToolbar, type ArchiveCategoryFilter } from './toolbar'

type ArchiveTableProps = {
  items: Archive[]
}

export function ArchiveTable({ items }: ArchiveTableProps) {
  const t = useTranslations('archive')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ArchiveCategoryFilter>(ALL_CATEGORY)

  const { availableCategories, filteredItems } = useMemo(() => {
    const categories = new Set<Archive['category']>()
    const query = searchQuery.trim().toLowerCase()
    const filtered: Archive[] = []

    for (const item of items) {
      categories.add(item.category)

      if (activeCategory !== ALL_CATEGORY && item.category !== activeCategory) {
        continue
      }

      if (query) {
        const stackText = (item.stack ?? [])
          .map((entry) => entry.name)
          .join(' ')
          .toLowerCase()

        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          stackText.includes(query)

        if (!matchesSearch) {
          continue
        }
      }

      filtered.push(item)
    }

    return {
      availableCategories: Array.from(categories),
      filteredItems: filtered,
    }
  }, [items, searchQuery, activeCategory])

  return (
    <div className="space-y-10">
      <ArchiveToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        availableCategories={availableCategories}
      />

      <div className="w-full overflow-x-auto border border-border bg-surface">
        <table className="w-full border-collapse text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              <th className="border-r border-border p-4">{t('columns.identifier')}</th>
              <th className="border-r border-border p-4">{t('columns.surface')}</th>
              <th className="border-r border-border p-4">{t('columns.stack')}</th>
              <th className="p-4 text-right">{t('columns.year')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const stack = item.stack ?? []

                return (
                  <tr
                    key={item.id}
                    className="group motion-safe:transition-colors hover:bg-surface-muted"
                  >
                    <td className="border-r border-border p-4 align-top font-mono text-[10px] font-bold whitespace-nowrap text-muted-foreground">
                      {t('arcId', { id: String(index + 1).padStart(2, '0') })}
                    </td>
                    <td className="max-w-sm border-r border-border p-4 align-top">
                      <div className="mb-1.5 font-sans text-sm leading-snug font-extrabold text-foreground">
                        {item.title}
                      </div>
                      <div className="mb-3 font-sans text-xs leading-relaxed font-medium text-muted-foreground">
                        {item.role}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="surface" size="sm">
                          {t(`categories.${item.category}`)}
                        </Badge>
                        {item.metric ? (
                          <Badge variant="accent" size="sm" className="italic">
                            {item.metric}
                          </Badge>
                        ) : null}
                      </div>
                    </td>
                    <td className="border-r border-border p-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {stack.map((entry, stackIndex) => (
                          <Badge
                            key={entry.id ?? `${item.id}-stack-${stackIndex}`}
                            variant="surface"
                            size="sm"
                          >
                            {entry.name}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right align-top font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground motion-safe:transition-colors">
                      {item.year}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-12 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase"
                >
                  {t('noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
