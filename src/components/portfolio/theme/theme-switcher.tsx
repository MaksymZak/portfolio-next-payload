'use client'

import { useSyncExternalStore } from 'react'

import type { ThemeOption } from '@/content/portfolio/types'
import {
  applyPortfolioTheme,
  defaultPortfolioTheme,
  normalizePortfolioTheme,
  portfolioThemeChangeEvent,
} from '@/lib/portfolio/theme'

type ThemeSwitcherProps = {
  options: ThemeOption[]
  label: string
  value?: string
}

function getThemeSnapshot(fallbackTheme: string) {
  if (typeof document === 'undefined') {
    return normalizePortfolioTheme(fallbackTheme)
  }

  return normalizePortfolioTheme(document.documentElement.dataset.theme)
}

function subscribeToThemeChange(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleThemeChange = () => onStoreChange()

  window.addEventListener(portfolioThemeChangeEvent, handleThemeChange)
  window.addEventListener('storage', handleThemeChange)

  return () => {
    window.removeEventListener(portfolioThemeChangeEvent, handleThemeChange)
    window.removeEventListener('storage', handleThemeChange)
  }
}

export function ThemeSwitcher({ options, label, value }: ThemeSwitcherProps) {
  const fallbackTheme = normalizePortfolioTheme(value ?? defaultPortfolioTheme)
  const selectedTheme = useSyncExternalStore(
    subscribeToThemeChange,
    () => getThemeSnapshot(fallbackTheme),
    () => fallbackTheme,
  )

  function applyTheme(nextTheme: string) {
    applyPortfolioTheme(nextTheme)
  }

  return (
    <fieldset aria-label={label} className="theme-switcher print:hidden">
      <legend className="theme-switcher__legend">{label}</legend>
      {options.map((option) => (
        <button
          className={`theme-switcher__button${selectedTheme === option.id ? ' theme-switcher__button--active' : ''}`}
          key={option.id}
          onClick={() => applyTheme(option.id)}
          type="button"
        >
          <span>{option.label}</span>
          <span className="visually-hidden">{option.description}</span>
        </button>
      ))}
    </fieldset>
  )
}
