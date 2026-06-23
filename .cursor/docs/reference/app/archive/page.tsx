'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { translations, type Language } from '../translations';
import { Code2, ArrowLeft, Terminal, Server, Globe, Lightbulb, Search } from 'lucide-react';
import { motion } from 'motion/react';

type ArchiveProject = {
  title: string;
  role: { en: string; uk: string };
  stack: string[];
  year: string;
  category: string;
  metrics?: { en: string; uk: string };
  links?: { label: string; url: string }[];
};

export default function ArchivePage() {
  const [locale, setLocale] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const t = translations[locale];
  const activeT = t.portfolio;

  const archiveProjects: ArchiveProject[] = [
    {
      title: 'A/B Testing Campaign Landing',
      role: {
        en: 'Frontend Engineering & Test Implementation',
        uk: 'Розробка Frontend та імплементація тестів'
      },
      stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
      year: '2025',
      category: 'A/B Testing',
      metrics: {
        en: '+22% conversion lift in variant B',
        uk: '+22% збільшення конверсії у варіанті B'
      }
    },
    {
      title: 'Next.js Corporate Portal',
      role: {
        en: 'Fullstack Next.js Landing System',
        uk: 'Fullstack Next.js лендинг система'
      },
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      year: '2025',
      category: 'Next.js Platform',
      metrics: {
        en: '100 lighthouse performance score',
        uk: '100 балів продуктивності lighthouse'
      }
    },
    {
      title: 'Animated Crypto Event',
      role: {
        en: 'High-Performance Animated Landing',
        uk: 'Високопродуктивний анімований лендинг'
      },
      stack: ['Astro', 'GSAP', 'Tailwind CSS'],
      year: '2025',
      category: 'Animated Landing'
    },
    {
      title: 'Data Analytics Tool Showcase',
      role: {
        en: 'Product Landing Page',
        uk: 'Продуктовий лендинг'
      },
      stack: ['Astro', 'Tailwind CSS', 'React Components'],
      year: '2024',
      category: 'Landing Page'
    },
    {
      title: 'School Webinar Registration',
      role: {
        en: 'High-Volume Lead Capture Landing System',
        uk: 'Лендинг захоплення лідів з високим навантаженням'
      },
      stack: ['Astro', 'Tailwind CSS', 'Google Tag Manager'],
      year: '2024',
      category: 'Landing Page'
    },
    {
      title: 'Interior Design Hub',
      role: {
        en: 'CMS Showcase & High-Definition Portfolio',
        uk: 'CMS рендеринг виставкового HD-портфоліо інтер`єрів'
      },
      stack: ['Astro', 'Payload CMS', 'Tailwind CSS', 'Motion'],
      year: '2024',
      category: 'Landing Page'
    },
    {
      title: 'Fast Reading Masterclass',
      role: {
        en: 'Frontend Refactoring & Speed Optimization',
        uk: 'Frontend рефакторинг та оптимізація швидкодії'
      },
      stack: ['React', 'Tailwind CSS', 'Vite'],
      year: '2024',
      category: 'Landing Page'
    },
    {
      title: 'NMT 2026 Test Preparation',
      role: {
        en: 'Interactive Testing Landing System',
        uk: 'Інтерактивна система тестування для лендингу'
      },
      stack: ['Astro', 'Tailwind CSS', 'Alpine.js'],
      year: '2024',
      category: 'Landing Page'
    },
    {
      title: 'Painting: Three Courses',
      role: {
        en: 'Corporate Arts CMS Integration',
        uk: 'Інтеграція CMS для курсів корпоративного живопису'
      },
      stack: ['Astro', 'Tailwind CSS'],
      year: '2023',
      category: 'Landing Page'
    }
  ];

  const categories = ['All', ...Array.from(new Set(archiveProjects.map(p => p.category)))];

  const filteredArchive = archiveProjects.filter(project => {
    const roleString = locale === 'en' ? project.role.en : project.role.uk;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          roleString.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeCategoryFilter === 'All' || project.category === activeCategoryFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] flex justify-center py-6 sm:py-12 px-4 sm:px-6">
      <div className="w-full max-w-5xl border border-[var(--border)] bg-[var(--background)] relative flex flex-col shadow-2xl overflow-hidden rounded-none">
        
        {/* Navigation & Toolbar */}
        <header className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-[10px] font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1 font-bold uppercase tracking-widest border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5"
            >
              <ArrowLeft size={10} /> BACK TO CORE
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 border border-[var(--border)] p-1 bg-[var(--surface)]">
              {(['en', 'uk'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className={`px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors ${
                    locale === lang 
                      ? 'bg-[var(--foreground)] text-[var(--background)]' 
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-12 space-y-10">
            
            {/* Header section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                <span className="text-[var(--accent)] font-bold">[04.1]</span>
                <span className="w-4 h-[1px] bg-[var(--border)] block" />
                <span>FULL LEDGER</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                COMMERCIAL ARCHIVE LEDGER
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] font-medium max-w-2xl leading-relaxed">
                {locale === 'en' 
                  ? 'A comprehensive registry of commercial landing pages, single-page applications, and interactive campaigns. Predominantly built using Astro for high performance, alongside Next.js and React components.' 
                  : 'Повний реєстр комерційних лендингів, односторінкових застосунків та інтерактивних кампаній. Переважно створені з використанням Astro для високої продуктивності, разом з Next.js та React компонентами.'}
              </p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between border-t border-[var(--border)] pt-8">
              <div className="relative max-w-sm w-full shrink-0">
                <span className="absolute left-3 top-2.5 text-[var(--muted-foreground)]">
                  <Search size={14} />
                </span>
                <input 
                  type="text" 
                  placeholder={locale === 'en' ? 'Search records...' : 'Пошук записів...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[var(--border)] focus:border-[var(--muted-foreground)] bg-[var(--surface-muted)] text-[var(--foreground)] outline-none text-sm font-mono rounded-none placeholder-neutral-400 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`font-mono text-[9px] px-3 py-1.5 border transition-all rounded-none cursor-pointer font-bold select-none ${
                        isActive 
                          ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)]' 
                          : 'bg-[var(--surface-muted)] hover:bg-[var(--surface)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Data Table */}
            <div className="border border-[var(--border)] overflow-x-auto bg-[var(--surface)] w-full">
              <table className="w-full text-left border-collapse font-mono text-sm">
                <thead>
                  <tr className="bg-[var(--surface-muted)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase text-[10px] font-bold tracking-wider">
                    <th className="p-4 border-r border-[var(--border)]">IDENTIFIER</th>
                    <th className="p-4 border-r border-[var(--border)]">SURFACE & ROLE</th>
                    <th className="p-4 border-r border-[var(--border)]">STACK ARCHITECTURE</th>
                    <th className="p-4 text-right">YEAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredArchive.length > 0 ? (
                    filteredArchive.map((proj, idx) => {
                      const projectRole = locale === 'en' ? proj.role.en : proj.role.uk;
                      const metrics = locale === 'en' ? proj.metrics?.en : proj.metrics?.uk;
                      return (
                        <tr key={idx} className="hover:bg-[var(--surface-muted)] transition-colors group">
                          {/* ARC ID */}
                          <td className="p-4 border-r border-[var(--border)] text-[var(--muted-foreground)] font-bold text-[10px] align-top whitespace-nowrap">
                            ARC-0{idx + 1}
                          </td>
                          {/* Project Name and Category banner */}
                          <td className="p-4 border-r border-[var(--border)] max-w-sm align-top">
                            <div className="font-sans font-extrabold text-[var(--foreground)] text-sm mb-1.5 leading-snug">
                              {proj.title}
                            </div>
                            <div className="text-xs font-sans text-[var(--muted-foreground)] font-medium leading-relaxed mb-3">
                              {projectRole}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-[9px] uppercase tracking-wider text-[var(--foreground)] bg-[var(--background)] px-2 py-0.5 border border-[var(--border)] font-bold">
                                {proj.category}
                              </span>
                              {metrics && (
                                <span className="text-[9px] uppercase tracking-wider text-[var(--accent)] bg-[var(--background)] px-2 py-0.5 border border-[var(--border)] font-bold italic">
                                  {metrics}
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Stack */}
                          <td className="p-4 border-r border-[var(--border)] align-top">
                            <div className="flex flex-wrap gap-1.5">
                              {proj.stack.map((tech) => (
                                <span key={tech} className="text-[9px] bg-[var(--background)] text-[var(--foreground)] font-bold uppercase px-2 py-0.5 border border-[var(--border)]">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          {/* Delivery Year */}
                          <td className="p-4 font-semibold text-[var(--muted-foreground)] font-mono text-[10px] align-top text-right group-hover:text-[var(--foreground)] transition-colors">
                            {proj.year}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-[var(--muted-foreground)] font-mono text-xs uppercase tracking-widest">
                        NO ENTRIES MATCHING CRITERIA //
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
