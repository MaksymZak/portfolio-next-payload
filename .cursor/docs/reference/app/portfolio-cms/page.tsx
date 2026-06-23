'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Terminal, 
  Globe, 
  Database, 
  Layers, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  GitBranch,
  ShieldAlert,
  Palette
} from 'lucide-react';

export default function PortfolioCmsCaseStudy() {
  const [locale, setLocale] = useState<'en' | 'uk'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('max-portfolio-locale') as 'en' | 'uk') || 'en';
    }
    return 'en';
  });
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('max-portfolio-theme') || 'light';
    }
    return 'light';
  });
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [activeSegment, setActiveSegment] = useState('01');
  
  // Sync layout settings with localStorage on initial mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('max-portfolio-theme', newTheme);
  };

  const handleLocaleChange = (newLocale: 'en' | 'uk') => {
    setLocale(newLocale);
    localStorage.setItem('max-portfolio-locale', newLocale);
  };

  // Kyiv Time ticker
  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Europe/Kyiv',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
        setCurrentTime(timeString);
      } catch (e) {
        const now = new Date();
        setCurrentTime(now.toTimeString().split(' ')[0]);
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll sequence to activate index numbers
  useEffect(() => {
    const handleScroll = () => {
      const segments = ['01', '02', '03', '04', '05', '06', '07'];
      const scrollPosition = window.scrollY + 220;

      for (const seg of segments) {
        const el = document.getElementById(`section-${seg}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSegment(seg);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (seg: string) => {
    const el = document.getElementById(`section-${seg}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSegment(seg);
    }
  };

  // Dictionary translations for technical review page
  const t = {
    en: {
      backBtn: "BACK TO INDEX",
      localeTitle: "LOCALE",
      themeTitle: "THEME",
      nodeStudy: "NODE_STUDY // ACTIVE",
      techSub: "Bilingual Next.js portfolio · public hiring surface",
      indexTitle: "INDEX SUMMARY",
      specLabel: "SPECID: MAX-CMS-2026",
      verified: "PUBLIC FILE / VERIFIED",
      indexItems: [
        { num: '01', title: 'OVERVIEW' },
        { num: '02', title: 'GOALS' },
        { num: '03', title: 'STACK' },
        { num: '04', title: 'DEMONSTRATIONS' },
        { num: '05', title: 'SCOPE & STEPS' },
        { num: '06', title: 'DECISIONS' },
        { num: '07', title: 'WORKFLOW' }
      ],
      themes: {
        light: "LIGHT",
        dark: "DARK",
        warm: "WARM",
        contrast: "CONTRAST"
      },
      sections: {
        s01: {
          title: "Executive Summary / Overview",
          p1: "This document reviews the comprehensive design and architectural scope behind Maksym's active developer portfolio, structured under a Decoupled Next.js 15 and Payload CMS framework.",
          p2: "The primary intent is providing clear, self-contained business logic for technical recruiters evaluating Next.js and frontend delivery competency. All site pages leverage complete multi-language parity so both Ukrainian and global hiring managers view identical layouts.",
          metaLabel: "STATUS FILE METADATA",
          row1: "Lighthouse Performance Score",
          row2: "SEO & Crawler Validation Rating"
        },
        s02: {
          title: "Aims & Technical Goals",
          p: "Our core goals focus on instant loading metrics and seamless bilingual maintenance, built to mimic an environment of actual product documentation:",
          g1: "Strict Bilingual Support",
          g1D: "No broken local translation paths or untranslated content segments to protect reading rhythm.",
          g2: "Minimal Layout Shifts",
          g2D: "Eliminate layout fumbles and unexpected element sliding during initial loading screen paints.",
          g3: "Immediate Editing Publish",
          g3D: "Ensuring Payload CMS publishers see layout previews on safe local environments instantly."
        },
        s03: {
          title: "Technology Assembly & Stack",
          p: "A tailored, responsive selection designed to reduce network footprint to the bare minimum:",
          techs: [
            { name: "Next.js App Router", desc: "For server-first layouts, routing nodes, and optimized image rendering." },
            { name: "React 19 & TypeScript", desc: "Providing clean UI state preservation, absolute typed safety, and strong interfaces." },
            { name: "Payload CMS v3", desc: "Serving localized database streams via lightning-fast PostgreSQL records." },
            { name: "Tailwind CSS v4 & Motion", desc: "Delivering micro-animations and zero-noise monochrome visual design." }
          ]
        },
        s04: {
          title: "Fidelity Demonstrations",
          p: "View the core architecture diagrams detailing the decouping flow:",
          caption1: "Server-first public UI; theme state is the main client concern.",
          colLeft: "Client Visual Stage",
          colRight: "Payload Core Engine",
          clItem1: "Local Layout Theme & Selected Locale Toggle",
          clItem2: "Bilingual static component dictionary nodes",
          clItem3: "Smooth scroll viewport intersection observer",
          peItem1: "Decoupled PostgreSQL content registry database",
          peItem2: "Instant Server Revalidation webhook receiver",
          peItem3: "Bilingual JSON translation parity evaluator"
        },
        s05: {
          title: "Project Scope & Deployment Steps",
          p: "The roadmap tracking implementation cycles with total transparency:",
          step1: "Setup Next.js environment & configure tailwind theme custom variables.",
          step2: "Establish unified client-side English & Ukrainian translation matrices.",
          step3: "Integrate Payload CMS with rigid schemas preventing layout breaks.",
          step4: "Deploy system to fast server networks with server revalidation triggers."
        },
        s06: {
          title: "Humble Architectural Decisions",
          p: "Refactoring and architectural design choices evaluated with production mindset:",
          dec1: "Decoupled Server Rendering over Client Extraction",
          dec1D: "Processing bilingual variations directly within server nodes reduces initial bundle weight, allowing immediate screen paint without loading loops.",
          dec2: "Explicit Theme Custom Properties over Inline JavaScript Transitions",
          dec2D: "Mapping visual themes through root level variables ensures dark-to-light theme-swaps compile in less than 5ms without visual flickering.",
          specTitle: "Spec-Driven Delivery",
          specDesc: "Constructed with strict structural boundaries, explicit styling contracts, and trust guardrails. No partial code elements are populated."
        },
        s07: {
          title: "Rigorous Workflow Standards",
          p: "Operations rules implemented in our daily coding loops to protect product safety:",
          rule1: "Production-ready testing",
          rule1D: "Every code shift or responsive layout refactor undergoes strict ESLint and compiler dry-runs to prevent unexpected system breaks.",
          rule2: "Responsive fluidity verification",
          rule2D: "All UI tables and metadata rows collapse seamlessly into lightweight mobile streams from 375px up to desktop viewports with no overflow."
        }
      }
    },
    uk: {
      backBtn: "НАЗАД ДО ПОКАЖЧИКА",
      localeTitle: "ЛОКАЛЬ",
      themeTitle: "ТЕМА",
      nodeStudy: "РОЗБІР_КЕЙСУ // АКТИВНО",
      techSub: "Двомовне Next.js портфоліо · публічний ресурс для найму",
      indexTitle: "ЗМІСТ ДОКУМЕНТА",
      specLabel: "СПЕЦ_ІД: MAX-CMS-2026",
      verified: "ПУБЛІЧНИЙ ФАЙЛ / ВЕРЕФІКОВАНО",
      indexItems: [
        { num: '01', title: 'ЗАГАЛЬНИЙ ОГЛЯД' },
        { num: '02', title: 'ЦІЛІ ТА МЕТРИКИ' },
        { num: '03', title: 'СТЕК ТЕХНОЛОГІЙ' },
        { num: '04', title: 'ІЛЮСТРАЦІЇ СХЕМ' },
        { num: '05', title: 'ОБСЯГ ТА ЕТАПИ' },
        { num: '06', title: 'ІНЖЕНЕРНІ РІШЕННЯ' },
        { num: '07', title: 'СТАНДАРТИ РОБОТИ' }
      ],
      themes: {
        light: "СВІТЛА",
        dark: "ТЕМНА",
        warm: "ТЕПЛА",
        contrast: "КОНТРАСТ"
      },
      sections: {
        s01: {
          title: "Виконавче резюме / Огляд",
          p1: "Цей документ містить вичерпний опис архітектурного обсягу активного портфоліо розробника Максима, розробленого на базі Next.js 15 та Payload CMS.",
          p2: "Основна мета — надати чітку бізнес-логіку технічним рекрутерам для оцінки навичок виконання на Next.js. Всі сторінки сайту підтримують повну двомовну відповідність, тому українські та іноземні менеджери бачать ідентичний інтерфейс.",
          metaLabel: "МЕТАДАНІ СТАТУСУ ФАЙЛУ",
          row1: "Показник продуктивності Lighthouse",
          row2: "Оцінка SEO та сумісності з ботами"
        },
        s02: {
          title: "Наміри та технічні цілі",
          p: "Наші основні цілі зосереджені на миттєвому завантаженні та безпроблемній двомовній підтримці, що імітує реальну документацію продукту:",
          g1: "Сувора двомовна сумісність",
          g1D: "Жодних зламаних шляхів перекладу чи неперекладених фрагментів контенту для збереження природного ритму читання.",
          g2: "Мінімальні зсуви макета (CLS)",
          g2D: "Усунення несподіваного переміщення чи зсуву елементів інтерфейсу під час початкового відтворення екрана.",
          g3: "Миттєва публікація змін",
          g3D: "Забезпечення того, щоб редактори CMS могли миттєво бачити оновлення в безпечному локальному середовищі."
        },
        s03: {
          title: "Збірка та стек технологій",
          p: "Виважений та адаптивний набір інструментів, обраний для зменшення мережевого сліду до абсолютного мінімуму:",
          techs: [
            { name: "Next.js App Router", desc: "Для першочергового завантаження на сервері, ізольованих роутів та оптимізації графіки." },
            { name: "React 19 & TypeScript", desc: "Забезпечення стабільного стану графічного інтерфейсу, повної типізації та чистих інтерфейсів." },
            { name: "Payload CMS v3", desc: "Доставка потоку локалізованого контенту через базу даних PostgreSQL із надшвидким завантаженням." },
            { name: "Tailwind CSS v4 & Motion", desc: "Мікро-інтеракції та строгий монохромний дизайн без зайвого візуального шуму." }
          ]
        },
        s04: {
          title: "Ілюстрація архітектурних схем",
          p: "Огляд спрощеної схеми взаємодії клієнта та контентного ядра:",
          caption1: "Клієнтський інтерфейс; тема та локаль є основними турботами клієнтської сторони.",
          colLeft: "Візуальна сцена клієнта",
          colRight: "Контентне ядро Payload",
          clItem1: "Обрана користувачем схема оформлення та перемикач локалі",
          clItem2: "Двомовні статичні словники в коді",
          clItem3: "Обсерватор перетину для плавного прокручування",
          peItem1: "База даних PostgreSQL з реєстром контенту",
          peItem2: "Приймач вебхуків миттєвої ревалідації сервера ISR",
          peItem3: "Оцінювач паритету двомовної відповідності JSON"
        },
        s05: {
          title: "Обсяг проєкту та етапи розгортання",
          p: "Прозора дорожня карта з фіксацією проміжних результатів:",
          step1: "Налаштування оточення Next.js та конфігурація змінних оформлення в Tailwind.",
          step2: "Створення єдиної матриці англійських та українських перекладів.",
          step3: "Інтеграція Payload CMS з жорсткими схемами проти зламу структури сайту.",
          step4: "Розгортання у високошвидкісних сховищах з автоматичними тригерами ревалідації."
        },
        s06: {
          title: "Технічні та архітектурні рішення",
          p: "Продуктовий вибір розробки, перевірений вимогами комерційної експлуатації:",
          dec1: "Серверний рендеринг замість динамічного клієнтського запиту",
          dec1D: "Обробка білінгвальних варіацій на сервері знижує початкову вагу JS-скриптів, дозволяючи миттєво відмалювати сторінку без циклів завантаження.",
          dec2: "Явні змінні CSS замість динамічних JavaScript транзицій",
          dec2D: "Зміна схем через root-змінні дозволяє перемикати кольорову палітру менш ніж за 5мс без мерехтіння на екрані.",
          specTitle: "Поставка за Специфікацією",
          specDesc: "Побудовано на чітких структурних межах, суворому контракті стилів та безпечних застереженнях. Жодних порожніх заготовок."
        },
        s07: {
          title: "Стандарти та регламенти роботи",
          p: "Правила розробки, що застосовуються в щоденному циклі написання коду для гарантії стабільності:",
          rule1: "Ретельне тестування перед випуском",
          rule1D: "Будь-яка зміна в коді чи дизайні проходить через ESLint-перевірку та збірку компілятора до деплою.",
          rule2: "Адаптивна гнучкість макетів",
          rule2D: "Всі таблиці та технічні рядки ідеально адаптуються під мобільні екрани від 375px без виходу за межі дозволеної ширини."
        }
      }
    }
  };

  const activeT = t[locale];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-250 flex flex-col relative font-sans">
      
      {/* Top micro status bar container */}
      <div className="w-full mx-auto max-w-full md:max-w-[768px] xl:max-w-[1280px] 2xl:max-w-[1536px] bg-[var(--surface)] sticky top-0 z-40">
        <header className="border-b border-x border-[var(--border)] py-3.5 px-6 lg:px-10 flex items-center justify-between font-mono text-[10px]">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all font-bold hover:-translate-x-1">
              <ArrowLeft size={12} /> {activeT.backBtn}
            </Link>
            <span className="text-[var(--border)]">|</span>
            <span className="text-[var(--muted-foreground)] uppercase hidden sm:inline font-semibold">{activeT.specLabel}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[var(--muted-foreground)] uppercase flex items-center gap-1 font-bold">
              <Clock size={11} className="text-[var(--muted-foreground)]" /> {currentTime} SUMY/KYIV
            </span>
            <span className="hidden md:inline px-2 py-0.5 bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted-foreground)] font-bold uppercase rounded-none text-[9px]">
              {activeT.verified}
            </span>
          </div>
        </header>
      </div>

      {/* MAIN CONTAINER STREAM WIRED WITH 4 EXPLICIT RESOLUTION CONTAINER BANDWIDTH CONSTRAINTS */}
      <div className="flex-1 flex flex-col xl:flex-row w-full mx-auto max-w-full md:max-w-[768px] xl:max-w-[1280px] 2xl:max-w-[1536px] border-x border-[var(--border)] bg-[var(--background)] transition-all duration-300">
        
        {/* Left Interactive Anchor Sidebar */}
        <nav className="xl:w-[32%] border-b xl:border-b-0 xl:border-r border-[var(--border)] p-6 xl:p-8 space-y-6 xl:sticky xl:top-[43px] xl:h-[calc(110vh-43px)] overflow-y-auto bg-[var(--surface)]">
          
          {/* Quick controls panel */}
          <div className="border border-[var(--border)] p-3 space-y-4 bg-[var(--surface-muted)]">
            
            {/* Locale Picker */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold block uppercase tracking-wider">{activeT.localeTitle}</span>
              <div className="grid grid-cols-2 gap-1 border-none bg-transparent p-0">
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`font-mono text-[9px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                    locale === 'en' 
                      ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black' 
                      : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                  }`}
                  id="cms-lang-en"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLocaleChange('uk')}
                  className={`font-mono text-[9px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                    locale === 'uk' 
                      ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black' 
                      : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                  }`}
                  id="cms-lang-uk"
                >
                  UK
                </button>
              </div>
            </div>

            {/* Theme switcher */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold block uppercase tracking-wider">{activeT.themeTitle}</span>
              <div className="grid grid-cols-2 gap-1 text-[8px] border-none bg-transparent p-0">
                {['light', 'dark', 'warm', 'contrast'].map((tName) => (
                  <button
                    key={tName}
                    onClick={() => handleThemeChange(tName)}
                    className={`font-mono text-[8px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                      theme === tName
                        ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black'
                        : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                    }`}
                    id={`cms-theme-btn-${tName}`}
                  >
                    {(activeT.themes as any)[tName]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--muted-foreground)] font-bold block">
              {activeT.indexTitle}
            </span>
            <div className="space-y-1">
              {activeT.indexItems.map((item) => {
                const isActive = activeSegment === item.num;
                return (
                  <button
                    key={item.num}
                    onClick={() => handleScrollToSection(item.num)}
                    className={`w-full text-left font-mono py-2 px-3 text-xs border border-transparent transition-all flex items-center justify-between rounded-none cursor-pointer ${
                      isActive 
                        ? 'bg-[var(--foreground)] text-[var(--background)] -translate-y-0.5 -translate-x-0.5 shadow-[2px_2px_0px_0px_var(--foreground)] border-[var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none font-bold' 
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:border-[var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none'
                    }`}
                    id={`index-anchor-${item.num}`}
                  >
                    <span className="truncate">{item.title}</span>
                    <span className={`text-[10px] font-bold ${isActive ? 'text-[var(--background)]' : 'text-[var(--accent)] group-hover:text-[var(--foreground)]'}`}>[{item.num}]</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Content stream */}
        <main className="xl:w-[68%] w-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" id="right-column">

          {/* Hero Header Block */}
          <section className="border-b border-[var(--border)] p-6 lg:p-12 min-h-[30vh] w-full flex flex-col justify-center bg-[var(--surface)] relative overflow-hidden">
            {/* Elegant Minimalist Technical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase font-bold bg-[var(--surface-muted)] border border-[var(--border)] px-2.5 py-0.5">
                {activeT.nodeStudy}
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-none xl:leading-[1.1]">
                Portfolio CMS
              </h1>
              <p className="text-sm font-mono text-[var(--muted-foreground)] font-semibold">
                {activeT.techSub}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Payload CMS 3', 'Postgres'].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] bg-[var(--surface-muted)] text-[var(--muted-foreground)] border border-[var(--border)] px-2.5 py-0.5 rounded-none font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="w-full flex flex-col pb-16">
          
          {/* SECTION 1: OVERVIEW */}
          <section id="section-01" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[01]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[0].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase">
              {activeT.sections.s01.title}
            </h2>
            <p className="text-sm text-[var(--foreground)] leading-relaxed font-sans">
              {activeT.sections.s01.p1}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s01.p2}
            </p>

            <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-2 rounded-none">
              <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold block uppercase tracking-wide">
                {activeT.sections.s01.metaLabel}
              </span>
              <div className="text-xs font-mono space-y-1">
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted-foreground)]">{activeT.sections.s01.row1}</span>
                  <span className="text-[var(--accent)] font-bold">100 // OPTIMIZED</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--muted-foreground)]">{activeT.sections.s01.row2}</span>
                  <span className="text-[var(--foreground)] font-bold">A+ CERTIFIED</span>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* SECTION 2: GOALS */}
          <section id="section-02" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[02]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[1].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s02.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s02.p}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-2 rounded-none hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default group">
                <span className="font-mono text-[10px] text-[var(--accent)] font-semibold block transition-colors group-hover:text-[var(--foreground)]">01 / LOCALIZATION</span>
                <h3 className="text-xs font-bold text-[var(--foreground)]">{activeT.sections.s02.g1}</h3>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed font-sans transition-colors group-hover:text-[var(--foreground)]">{activeT.sections.s02.g1D}</p>
              </div>
              <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-2 rounded-none hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default group">
                <span className="font-mono text-[10px] text-[var(--foreground)] font-semibold block transition-colors">02 / FLUID CLS</span>
                <h3 className="text-xs font-bold text-[var(--foreground)]">{activeT.sections.s02.g2}</h3>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed font-sans transition-colors group-hover:text-[var(--foreground)]">{activeT.sections.s02.g2D}</p>
              </div>
              <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-2 rounded-none hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default group">
                <span className="font-mono text-[10px] text-[var(--foreground)] font-semibold block transition-colors">03 / RAPID BUILD</span>
                <h3 className="text-xs font-bold text-[var(--foreground)]">{activeT.sections.s02.g3}</h3>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed font-sans transition-colors group-hover:text-[var(--foreground)]">{activeT.sections.s02.g3D}</p>
              </div>
            </div>
            </div>
          </section>

          {/* SECTION 3: STACK */}
          <section id="section-03" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[03]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[2].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s03.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s03.p}
            </p>

            <div className="border border-[var(--border)] rounded-none bg-[var(--surface)] divide-y divide-[var(--border)] font-mono text-xs">
              {activeT.sections.s03.techs.map((tItem, idx) => (
                <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-[var(--foreground)] font-bold">{tItem.name}</span>
                  <span className="text-[var(--muted-foreground)] text-right text-[11px] font-sans italic">{tItem.desc}</span>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* SECTION 4: DEMONSTRATIONS */}
          <section id="section-04" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[04]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[3].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s04.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s04.p}
            </p>

            {/* Architecture Sandbox Layout */}
            <div className="border border-[var(--border)] p-6 bg-[var(--surface-muted)] relative rounded-none space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Column left */}
                <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-3 rounded-none relative">
                  <span className="font-mono text-[9px] text-[var(--accent)] font-bold block uppercase bg-[var(--surface-muted)] p-1 border border-[var(--border)] w-fit">
                    {activeT.sections.s04.colLeft}
                  </span>
                  <ul className="text-xs font-mono space-y-2 text-[var(--muted-foreground)]">
                    <li className="flex items-center gap-2">
                      <ChevronRight size={12} className="text-[var(--accent)]" /> 
                      <span className="text-[var(--foreground)] font-medium">{activeT.sections.s04.clItem1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={12} className="text-[var(--accent)]" /> 
                      <span>{activeT.sections.s04.clItem2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={12} className="text-[var(--accent)]" /> 
                      <span>{activeT.sections.s04.clItem3}</span>
                    </li>
                  </ul>
                </div>

                {/* Column right */}
                <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-3 rounded-none relative">
                  <span className="font-mono text-[9px] text-[var(--foreground)] font-bold block uppercase bg-[var(--surface-muted)] p-1 border border-[var(--border)] w-fit">
                    {activeT.sections.s04.colRight}
                  </span>
                  <ul className="text-xs font-mono space-y-2 text-[var(--muted-foreground)]">
                    <li className="flex items-center gap-2">
                      <Database size={12} className="text-[var(--foreground)]" /> 
                      <span className="text-[var(--foreground)] font-medium">{activeT.sections.s04.peItem1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database size={12} /> 
                      <span>{activeT.sections.s04.peItem2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database size={12} /> 
                      <span>{activeT.sections.s04.peItem3}</span>
                    </li>
                  </ul>
                </div>

              </div>
              
              <p className="font-mono text-[10px] text-[var(--muted-foreground)] opacity-80 leading-normal text-center">
                Caption: &quot;{activeT.sections.s04.caption1}&quot;
              </p>
            </div>
            </div>
          </section>

          {/* SECTION 5: SCOPE & STEPS */}
          <section id="section-05" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[05]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[4].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s05.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s05.p}
            </p>

            <div className="space-y-4 font-mono text-xs">
              {[
                { step: 'STEP_01', desc: activeT.sections.s05.step1 },
                { step: 'STEP_02', desc: activeT.sections.s05.step2 },
                { step: 'STEP_03', desc: activeT.sections.s05.step3 },
                { step: 'STEP_04', desc: activeT.sections.s05.step4 }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 border border-[var(--border)] p-3 bg-[var(--surface)] hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default">
                  <span className="text-[var(--accent)] font-bold">{item.step}</span>
                  <p className="text-[11px] text-[var(--muted-foreground)] font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* SECTION 6: DECISIONS */}
          <section id="section-06" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[06]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[5].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s06.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s06.p}
            </p>

            <div className="space-y-4">
              <div className="border-l-2 border-[var(--accent)] pl-4 py-1 space-y-1">
                <span className="font-mono text-[10px] text-[var(--accent)] font-semibold uppercase">DECISION_01 // CORE_STATE</span>
                <h4 className="text-xs font-bold text-[var(--foreground)] uppercase font-sans">{activeT.sections.s06.dec1}</h4>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-sans">{activeT.sections.s06.dec1D}</p>
              </div>

              <div className="border-l-2 border-[var(--foreground)] pl-4 py-1 space-y-1">
                <span className="font-mono text-[10px] text-[var(--foreground)] font-semibold uppercase">DECISION_02 // SYSTEM_THEME</span>
                <h4 className="text-xs font-bold text-[var(--foreground)] uppercase font-sans">{activeT.sections.s06.dec2}</h4>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-sans">{activeT.sections.s06.dec2D}</p>
              </div>
            </div>

            {/* Spec audit block */}
            <div className="border border-[var(--border)] p-4 bg-[var(--surface-muted)] flex items-start gap-3 rounded-none mt-6">
              <GitBranch size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-[var(--accent)] block font-bold uppercase">{activeT.sections.s06.specTitle}</span>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-sans mt-1">
                  {activeT.sections.s06.specDesc}
                </p>
              </div>
            </div>
            </div>
          </section>

          {/* SECTION 7: WORKFLOW */}
          <section id="section-07" className="scroll-margin-top border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)] pb-16">
            <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-bold">
              <span>[07]</span>
              <span className="w-5 h-[1px] bg-[var(--border)]" />
              <span className="uppercase tracking-wider">{activeT.indexItems[6].title}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] uppercase font-sans">
              {activeT.sections.s07.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              {activeT.sections.s07.p}
            </p>

            <div className="space-y-4">
              <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-1.5 rounded-none hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--foreground)] uppercase font-bold">
                  <CheckCircle2 size={12} className="text-[var(--accent)]" /> 
                  <span>{activeT.sections.s07.rule1}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] font-sans leading-relaxed">
                  {activeT.sections.s07.rule1D}
                </p>
              </div>

              <div className="border border-[var(--border)] p-4 bg-[var(--surface)] space-y-1.5 rounded-none hover:bg-[var(--surface-muted)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-default">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--foreground)] uppercase font-bold">
                  <CheckCircle2 size={12} className="text-[var(--foreground)]" /> 
                  <span>{activeT.sections.s07.rule2}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] font-sans leading-relaxed">
                  {activeT.sections.s07.rule2D}
                </p>
              </div>
            </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  </div>
  );
}
