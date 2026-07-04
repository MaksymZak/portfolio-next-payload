'use client'

import React from 'react'
import { Globe, Palette } from 'lucide-react'
import { translations, type Language } from '@/app/translations'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ControlPanelProps {
  locale: Language
  theme: string
  onLocaleChange: (newLocale: Language) => void
  onThemeChange: (newTheme: string) => void
  variant?: 'sidebar' | 'drawer' | 'cms'
}

export default function ControlPanel({
  locale,
  theme,
  onLocaleChange,
  onThemeChange,
  variant = 'sidebar',
}: ControlPanelProps) {
  const activeT = translations[locale]

  // Helper translations if certain keys are missing
  const langTitle =
    variant === 'cms'
      ? activeT.localeTitle || 'SYSTEM_LOCALE'
      : activeT.leftColumn?.langTitle || 'SYSTEM_LOCALE'

  const themeTitle =
    variant === 'cms'
      ? activeT.themeTitle || 'WORKSPACE_THEME'
      : activeT.leftColumn?.themeTitle || 'WORKSPACE_THEME'

  const themesObj = activeT.leftColumn?.themes ||
    activeT.themes || {
      light: 'EDITORIAL LIGHT',
      dark: 'GRAPHITE DARK',
      warm: 'WARM NEUTRAL',
      contrast: 'HIGH CONTRAST',
    }

  // Sizing definitions based on container variant to make sure they fit perfectly without bloating
  const config = {
    sidebar: {
      containerClass: 'space-y-4 border-t border-b border-[var(--border)] py-4 my-3',
      sectionClass: 'space-y-2 flex flex-col items-start w-full font-mono',
      labelClass:
        'flex items-center gap-1.5 text-[var(--muted-foreground)] font-bold uppercase tracking-wider text-[10px]',
      iconSize: 12,
      langGrid: 'grid grid-cols-2 gap-2 w-full',
      themeGrid: 'grid grid-cols-4 gap-2 w-full',
      btnClass: (isActive: boolean) => `
        flex items-center justify-center gap-1 px-1 py-1.5 text-[10px] font-bold border-2 border-[var(--foreground)] uppercase transition-all duration-150 ease-out select-none cursor-pointer rounded-none text-center w-full
        ${
          isActive
            ? 'bg-[var(--foreground)] text-[var(--background)] translate-x-[2px] translate-y-[2px] shadow-none'
            : 'bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:-translate-y-[1px] hover:-translate-x-[1px] shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
        }
      `,
      indicatorSize: 'w-2.5 h-2.5',
    },
    drawer: {
      containerClass: 'space-y-4 pt-1',
      sectionClass: 'space-y-2.5 flex flex-col items-start w-full font-mono',
      labelClass:
        'font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold block',
      iconSize: 13,
      langGrid: 'grid grid-cols-2 gap-2.5 w-full',
      themeGrid: 'grid grid-cols-2 gap-2.5 w-full',
      btnClass: (isActive: boolean) => `
        font-mono text-[11px] py-2.5 px-3 text-center transition-all duration-150 ease-out rounded-none select-none font-bold border-2 border-[var(--foreground)] leading-tight flex items-center justify-center gap-2 cursor-pointer w-full
        ${
          isActive
            ? 'bg-[var(--foreground)] text-[var(--background)] translate-x-[3px] translate-y-[3px] shadow-none'
            : 'bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:-translate-x-[1px] hover:-translate-y-[1px] shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
        }
      `,
      indicatorSize: 'w-3 h-3',
    },
    cms: {
      containerClass: 'border border-[var(--border)] p-3 space-y-4 bg-[var(--surface-muted)]',
      sectionClass: 'space-y-2 flex flex-col font-mono',
      labelClass:
        'flex items-center gap-1.5 text-[var(--muted-foreground)] font-bold uppercase tracking-wider text-[9px]',
      iconSize: 11,
      langGrid: 'grid grid-cols-2 gap-2 w-full',
      themeGrid: 'grid grid-cols-2 gap-2 w-full',
      btnClass: (isActive: boolean) => `
        flex items-center justify-center gap-1.5 px-2 py-1.5 text-[9px] md:text-[10px] font-bold border-2 border-[var(--foreground)] uppercase transition-all duration-150 ease-out select-none cursor-pointer rounded-none text-center w-full
        ${
          isActive
            ? 'bg-[var(--foreground)] text-[var(--background)] translate-x-[2px] translate-y-[2px] shadow-none'
            : 'bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:-translate-y-[1px] hover:-translate-x-[1px] shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
        }
      `,
      indicatorSize: 'w-2.5 h-2.5',
    },
  }[variant]

  return (
    <TooltipProvider delayDuration={200}>
      <div className={config.containerClass} id={`control-panel-${variant}`}>
        {/* LANGUAGE CONTAINER */}
        <div className={config.sectionClass}>
          <span className={config.labelClass}>
            {variant !== 'drawer' && <Globe size={config.iconSize} className="shrink-0" />}
            {variant === 'drawer' ? `02 // LANGUAGE (${langTitle})` : langTitle}
          </span>
          <div className={config.langGrid}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onLocaleChange('en')}
                  className={config.btnClass(locale === 'en')}
                  id={`${variant}-lang-en`}
                  title="English Locale"
                >
                  {variant === 'drawer' ? 'ENGLISH [EN]' : 'ENGLISH'}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {locale === 'en' ? 'Active language: English' : 'Switch system language to English'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onLocaleChange('uk')}
                  className={config.btnClass(locale === 'uk')}
                  id={`${variant}-lang-uk`}
                  title="Ukrainian Locale"
                >
                  {variant === 'drawer' ? 'УКРАЇНСЬКА [UK]' : 'УКРАЇНСЬКА'}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {locale === 'uk'
                  ? 'Активна мова: Українська'
                  : 'Переключити мову системи на українську'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* THEME CONTAINER */}
        <div className={config.sectionClass}>
          <span className={config.labelClass}>
            {variant !== 'drawer' && <Palette size={config.iconSize} className="shrink-0" />}
            {variant === 'drawer' ? `03 // WORKSPACE_THEME` : themeTitle}
          </span>
          <div className={config.themeGrid}>
            {[
              {
                id: 'light',
                label: 'LT',
                fullLabel: themesObj.light || 'LIGHT',
                color: 'bg-[#f9f9f9] border-[#e2e8f0]',
              },
              {
                id: 'dark',
                label: 'DK',
                fullLabel: themesObj.dark || 'DARK',
                color: 'bg-[#0a0a0a] border-[#262626]',
              },
              {
                id: 'warm',
                label: 'WM',
                fullLabel: themesObj.warm || 'WARM',
                color: 'bg-[#f4f1ea] border-[#ded9d1]',
              },
              {
                id: 'contrast',
                label: 'CT',
                fullLabel: themesObj.contrast || 'CONTRAST',
                color: 'bg-[#ffffff] border-black',
              },
            ].map((tOpt) => {
              const isActive = theme === tOpt.id
              const tooltipLabel =
                locale === 'uk'
                  ? `Увімкнути тему: ${tOpt.fullLabel}`
                  : `Activate theme: ${tOpt.fullLabel}`
              return (
                <Tooltip key={tOpt.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onThemeChange(tOpt.id)}
                      className={config.btnClass(isActive)}
                      id={`${variant}-theme-${tOpt.id}`}
                    >
                      <span
                        className={`block border rounded-none shrink-0 ${tOpt.color} ${config.indicatorSize} ${isActive ? 'border-[var(--background)] opacity-80' : 'border-[var(--border)]'}`}
                      />
                      <span className="truncate">
                        {variant === 'drawer' ? tOpt.fullLabel : tOpt.label}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{tooltipLabel}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
