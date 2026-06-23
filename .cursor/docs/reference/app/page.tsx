'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { translations, type Language } from './translations';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Terminal, 
  ArrowRight, 
  Mail, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Search, 
  BookOpen, 
  Info,
  Globe,
  Palette,
  Code2,
  Cpu,
  Database,
  Languages,
  Shield,
  Activity,
  Download,
  FileText
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  label: 'v1.0 Live' | 'Roadmap';
  role: { en: string; uk: string };
  period: string;
  summary: { en: string; uk: string };
  highlights: { en: string[]; uk: string[] };
  stack: string[];
  metrics: { en: string; uk: string };
  technicalDepth: { en: string; uk: string };
}

interface ArchiveProject {
  title: string;
  role: { en: string; uk: string };
  stack: string[];
  year: string;
  category: 'Landing Page' | 'Platform' | 'Campaign' | 'Prototype';
  links?: { label: string; url: string }[];
}

const techItems = [
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'js-ts', name: 'JavaScript / TypeScript' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'react', name: 'React' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'astro', name: 'Astro' },
  { id: 'payload', name: 'Payload CMS' },
  { id: 'redux-zustand', name: 'Redux & Zustand' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'express', name: 'Express.js' },
  { id: 'postgres-mongo', name: 'PostgreSQL & MongoDB' },
  { id: 'mongoose-prisma', name: 'Mongoose & Prisma ORM' },
  { id: 'docker', name: 'Docker' }
];

const getTechIcon = (id: string, size = 13, className = "text-[var(--accent)]") => {
  switch (id) {
    case 'html':
      return <Code2 size={size} className={className} />;
    case 'css':
      return <Palette size={size} className={className} />;
    case 'js-ts':
      return <Shield size={size} className={className} />;
    case 'tailwind':
      return <Palette size={size} className={className} />;
    case 'react':
      return <Cpu size={size} className={className} />;
    case 'nextjs':
      return <Code2 size={size} className={className} />;
    case 'astro':
      return <Sparkles size={size} className={className} />;
    case 'payload':
      return <Database size={size} className={className} />;
    case 'redux-zustand':
      return <Activity size={size} className={className} />;
    case 'nodejs':
      return <Terminal size={size} className={className} />;
    case 'express':
      return <Terminal size={size} className={className} />;
    case 'postgres-mongo':
      return <Database size={size} className={className} />;
    case 'mongoose-prisma':
      return <Layers size={size} className={className} />;
    case 'docker':
      return <Shield size={size} className={className} />;
    default:
      return <Code2 size={size} className={className} />;
  }
};

export default function PortfolioPage() {
  const [locale, setLocale] = useState<Language>('en');
  const [theme, setTheme] = useState<string>('light');
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // States to allow visual comparison of the three layout options
  const [mockOpt1, setMockOpt1] = useState<'en' | 'uk'>('en');
  const [mockOpt2, setMockOpt2] = useState<'en' | 'uk'>('en');
  const [mockOpt3, setMockOpt3] = useState<'en' | 'uk'>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('max-portfolio-locale') as Language;
      const storedTheme = localStorage.getItem('max-portfolio-theme');
      requestAnimationFrame(() => {
        if (storedLocale === 'en' || storedLocale === 'uk') {
          setLocale(storedLocale);
        }
        if (storedTheme) {
          setTheme(storedTheme);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      const frameId = requestAnimationFrame(handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
      };
    }
  }, []);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<string | null>('portfolio-cms');

  const [activeStackTab, setActiveStackTab] = useState<'frameworks' | 'cms' | 'ops'>('frameworks');
  const [selectedTechItem, setSelectedTechItem] = useState<string>('nextjs');
  const [auditRunning, setAuditRunning] = useState<string | null>(null);
  const [auditResults, setAuditResults] = useState<Record<string, string>>({});
  const [viewVariant, setViewVariant] = useState<'text-only' | 'icons-only' | 'recommended'>('recommended');

  // Load theme and locale settings from localStorage on initial render safely
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Update localStorage and root data-theme attribute on change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('max-portfolio-theme', newTheme);
  };

  const handleLocaleChange = (newLocale: 'en' | 'uk') => {
    setLocale(newLocale);
    localStorage.setItem('max-portfolio-locale', newLocale);
  };

  // Time ticker for Sumy, UA (Kyiv Timezone)
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

  // Sync active nav item on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stack', 'projects', 'archive', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('zaksumy1989@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSmoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const runDiagnosticAudit = (itemId: string) => {
    setAuditRunning(itemId);
    setTimeout(() => {
      const logsMap: Record<string, string> = {
        react: locale === 'en' 
          ? "Initializing core Fiber reconciler...\nConcurrent rendering mode: ACTIVE.\nNo layout shift triggers detected.\nHydration payload integrity: OK (100% matched).\nServer Components parsed: 4 subtrees."
          : "Ініціалізація зв'язку ядер React...\nКонкурентний рендеринг: АКТИВНИЙ.\nНе виявлено зсувів макету.\nЦілісність гідратації: ОК (100% збіг).\nServer Components успішно згруповано: 4 піддерева.",
        nextjs: locale === 'en'
          ? "Target: Node.js Edge runtime.\nRevalidation tags database cached: STABLE.\nOn-demand router middleware: 0ms overhead.\nISR cache re-generation: STABLE (timeOut 60s).\nZero client JS overhead checked."
          : "Ціль: Edge середовище Node.js.\nКеш тегів ревалідації: СТАБІЛЬНО.\nОбробка Middleware на межі: затримка 0мс.\nISR регенерація: СТАБІЛЬНО (інтервал 60с).\nКлієнтський джаваскрипт оптимізовано.",
        tailwind: locale === 'en'
          ? "Parsing PostCSS engine...\nTailwind v4 theme variables compiled.\nFluid viewport layout: ACTIVE.\nProduction build size: 14.2kb dry style node.\nZero custom style anomalies detected."
          : "Аналіз рушія PostCSS...\nЗмінні теми Tailwind v4 скомпільовано.\nАдаптивний в'юпорт: АКТИВНО.\nРозмір стилів у продакшені: 14.2kb.\nАномалій у правилах CSS не знайдено.",
        typescript: locale === 'en'
          ? "Running strict mode compilation...\nInterfaces match strict validation requirements.\nPath resolution config checked.\nAll implicit any statements removed.\nCompiler error index: 0."
          : "Запуск строгої компіляції TS...\nІнтерфейси повністю відповідають типам.\nКонфігурація прозорих шляхів (paths) перевірена.\nНеявні оголошення типу 'any' очищені.\nІндекс помилок компілятора: 0.",
        payload: locale === 'en'
          ? "Querying Headless Payload v3 endpoints...\nDatabase connection pooled: ACTIVE.\nDraft preview security keys verified.\nGraphQL payload size: 2.1kb (optimized schema).\nCMS dynamic fields parity: SUCCESS."
          : "Запит до Headless Payload v3...\nПул з'єднань бази даних: АКТИВНИЙ.\nКлючі доступу до прев'ю чернеток перевірено.\nРозмір GraphQL об'єкту: 2.1kb (оптимально).\nПаритет динамічних полів CMS: УСПІШНО.",
        strapi: locale === 'en'
          ? "Inspecting Strapi REST endpoints...\nPopulation depth constraints configured.\nMedia assets URL rewrite verified.\nResponse status: 200 OK after 9ms.\nCaching policy: EDGE PERSISTED."
          : "Аналіз REST-ендпоінтів Strapi...\nОбмеження глибини вкладеності налаштовано.\nЗаміна URL медіафайлів працює коректно.\nСтатус відповіді: 200 OK за 9мс.\nПолітика кешування: ЗБЕРЕЖЕНО НА EDGE.",
        localization: locale === 'en'
          ? "Syncing localization dictionary...\nEnglish <-> Ukrainian key parity: 100% matching.\nDynamic translation interpolators compiled.\nMissing translation keys: 0.\nFallback default locale rule: APPROVED."
          : "Синхронізація мовних словників...\nПаритет ключів Англійська <-> Українська: 100%.\nДинамічні інтерполятори перекладу перевірені.\nВідсутні мовні ключі: 0.\nРезервне правило локалі: ЗАТВЕРДЖЕНО.",
        bilingual: locale === 'en'
          ? "Testing middleware geolocation routing...\nLocale cookies matching client agent.\nSubdomain fallback structure verified.\nEdge middleware redirection time: 0.1ms.\nSEO language hreflang tags: VERIFIED."
          : "Тест Edge Middleware для локалізацій...\nКуки відповідають мовним преференціям.\nСтруктура субдоменів верифікована.\nЧас перенаправлення на Edge: 0.1мс.\nLang теги та hreflang для пошуковців: ОК.",
        vitals: locale === 'en'
          ? "Running Lighthouse speed diagnostics...\nLCP (Largest Contentful Paint): 0.82s.\nCLS (Cumulative Layout Shift): 0.00.\nFID (First Input Delay): 4.1ms.\nDiagnostics score: 100/100 (EXCEPTION SAFE)."
          : "Діагностика швидкості завантаження...\nLCP (Найбільше візуальне завантаження): 0.82с.\nCLS (Сумарний зсув макету): 0.00.\nFID (Затримка першого введення): 4.1мс.\nЗагальна оцінка продуктивності: 100/100.",
        ga4: locale === 'en'
          ? "Checking Google Tag Manager scripts...\nGA4 conversion triggers resolved.\nPixel active: true.\nCustom ecommerce events listening: ACTIVE.\nData-layer push response: RESOLVED."
          : "Перевірка скриптів Google Tag GTM...\nТригери конверсії GA4 розпізнано.\nPixel активний: ТАК.\nПрослуховування цільових подій: АКТИВНО.\nГотовність сховища data-layer: ВЕРИФІКОВАНО.",
        edge: locale === 'en'
          ? "Validating security edge caching nodes...\nDDOS mitigation request limits established.\nIP header parser latency: 0.2ms.\nDynamic edge-cache override: APPROVED.\nTLS session handshake completed."
          : "Валідація Edge кешування та захисту...\nОбмеження проти флуду та DDOS активовано.\nЗатримка парсера IP заголовків: 0.2мс.\nДинамічний перезапис Edge-cache: КОРЕКТНО.\nБезпечне з'єднання TLS завершено.",
        isr: locale === 'en'
          ? "Triggering remote on-demand ISR revalidation...\nHandler response status: 200 SUCCESS.\nGlobal stale-while-revalidate limits matched.\nInvalidation tag group parsed.\nNodes regenerated: 1."
          : "Запуск примусовой ISR ревалідації...\nСтатус відповіді обробника: 200 УСПІШНО.\nПравила stale-while-revalidate дотримані.\nОновлено кешування для тегів сторінки.\nРегенеровано вузлів контенту: 1."
      };
      setAuditResults(prev => ({ ...prev, [itemId]: logsMap[itemId] || "Audit passed." }));
      setAuditRunning(null);
    }, 900);
  };

  const t = translations[locale];

  // Case Studies content dictionary structures
  const caseStudies: CaseStudy[] = [
    {
      id: 'portfolio-cms',
      title: 'Portfolio CMS',
      label: 'v1.0 Live',
      role: {
        en: 'Frontend & CMS Developer',
        uk: 'Frontend & CMS Developer'
      },
      period: 'Q1-Q2 2026',
      summary: {
        en: 'A localized, content-driven developer platform integrated with Payload CMS for instant site-wide localization-friendly updates.',
        uk: 'Локалізована контентна платформа розробника, інтегрована з Payload CMS для миттєвого оновлення та зручної локалізації сайту.'
      },
      highlights: {
        en: [
          'Built full-stack TypeScript schema using Payload CMS and Next.js App Router.',
          'Engineered dynamic, locale-swapping API middleware logic protecting system speed.',
          'Wired Instant Server Revalidation (ISR) to trigger on CMS publishers webhook save events, bringing load times under 200ms.',
          'Created isolated component template nodes to safely restrict edits for content managers.'
        ],
        uk: [
          'Створено повноцінну TypeScript-схему за допомогою Payload CMS та Next.js App Router.',
          'Реалізовано динамічну логіку зміни локалі за допомогою API middleware без втрати швидкості завантаження.',
          'Налаштовано миттєву ревалідацію сервера (ISR) на подіях збереження вебхуків CMS, що знизило час завантаження до <200мс.',
          'Створено ізольовані шаблони компонентів для безпечного редагування контент-менеджерами.'
        ]
      },
      stack: ['Next.js 15', 'Payload CMS', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      metrics: {
        en: '200ms Page Load / Instant Editors Publish',
        uk: 'Завантаження <200мс / Миттєва публікація'
      },
      technicalDepth: {
        en: 'Decoupled Server Components architecture ensuring maximum search crawl visibility and localization metadata SEO optimization.',
        uk: 'Архітектура Decoupled Server Components забезпечує максимальну індексацію в пошукових системах та оптимізацію метаданих локалізації SEO.'
      }
    },
    {
      id: 'lms-platform',
      title: 'LMS Platform',
      label: 'Roadmap',
      role: {
        en: 'Frontend Core Engineer',
        uk: 'Провідний Frontend Розробник'
      },
      period: 'Planned Q3 2026',
      summary: {
        en: 'A fast, high-performance course delivery platform and progress manager optimized for lightweight mobile networks.',
        uk: 'Швидка, високоефективна платформа доставки навчальних курсів та менеджер прогресу, оптимізований під слабкі мобільні мережі.'
      },
      highlights: {
        en: [
          'Interactive learning node pathways dynamically loaded via server-side cached requests.',
          'Next.js streaming layouts with micro-loader animations reducing drop-off on slow mobile networks.',
          'Progress metrics synced securely on client reconnects via Offline LocalStorage synchronization.',
          'Accessible, keyboard-navigable component templates aligned with strict inclusive usability standards.'
        ],
        uk: [
          'Інтерактивні ланцюжки навчальних матеріалів динамічно завантажуються через кешовані сервером запити.',
          'Стрімінгові макети Next.js з мікро-анімаціями лоадерів для зменшення відмов у слабких мобільних мережах.',
          'Безпечна синхронізація метрик прогресу при перепідключенні через автономний Offline LocalStorage.',
          'Доступні шаблони компонентів з підтримкою навігації клавіатурою згідно зі стандартами інклюзивності.'
        ]
      },
      stack: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
      metrics: {
        en: 'Lightweight Payload / Offline-First Cache',
        uk: 'Легка вага сторінки / Автономний кеш спочатку'
      },
      technicalDepth: {
        en: 'Utilizes React Server Components (RSC) to defer non-critical visual dependencies, keeping initial JavaScript bundle weight minimum.',
        uk: 'Використовує React Server Components (RSC) для відкладеного завантаження некритичного коду, забезпечуючи мінімальну вагу JS-бандлу.'
      }
    },
    {
      id: 'landing-version-system',
      title: 'Landing Version System',
      label: 'Roadmap',
      role: {
        en: 'Lead Performance Specialist',
        uk: 'Провідний Інженер Оптимізації'
      },
      period: 'Planned Q4 2026',
      summary: {
        en: 'A high-throughput dynamic routing system designed to serve and split A/B variations of landing assets via edge middleware.',
        uk: 'Високопродуктивна система динамічної маршрутизації для роздачі та спліт-тестування A/B варіантів лендингів через edge middleware.'
      },
      highlights: {
        en: [
          'Optimized static assets rendering structure ensuring consistent 98+ Google Lighthouse Performance.',
          'Edge middleware routing to evaluate active URL search keywords and target corresponding version variants dynamically.',
          'Telemetry-free analytical hooks feeding anonymous user conversion ratios directly to reporting servers.',
          'Asset pre-fetch modules configured to load critical graphic templates instantaneously on hover.'
        ],
        uk: [
          'Оптимізовано структуру рендерингу статичних ресурсів для досягнення стабільних показників Google Lighthouse 98+.',
          'Маршрутизація на рівні Edge middleware для аналізу активних пошукових запитів в URL та динамічного вибору варіантів.',
          'Аналітичні хуки без стеження за користувачами для передачі анонімних конверсій на сервери звітів.',
          'Модулі попереднього завантаження активів, налаштовані на миттєвий рендеринг критичних графічних шаблонів при ховері.'
        ]
      },
      stack: ['Next.js', 'Vercel Edge', 'Tailwind v4', 'TypeScript', 'HTML5 Performance'],
      metrics: {
        en: 'Split Render in <50ms at Edge level',
        uk: 'Розподілений рендеринг за <50мс на рівні Edge'
      },
      technicalDepth: {
        en: 'Eliminates typical client-side layout shifts (CLS) by processing high-speed path variations entirely server-side via Edge runtime.',
        uk: 'Запобігає типовому зсуву макету на стороні клієнта (CLS) шляхом обробки високошвидкісних варіантів шляху на рівні Edge runtime.'
      }
    }
  ];

  // Featured curated archive landing pages
  const featuredArchive = [
    {
      title: 'A/B Testing Campaign Landing',
      role: {
        en: 'Frontend Engineering & Test Implementation',
        uk: 'Розробка Frontend та імплементація тестів'
      },
      tag: 'Astro',
      links: [{ label: 'Live Client Beta', url: '#' }]
    },
    {
      title: 'Next.js Corporate Portal',
      role: {
        en: 'Fullstack Next.js Landing System',
        uk: 'Fullstack Next.js лендинг система'
      },
      tag: 'Next.js',
      links: [{ label: 'Production Showcase', url: '#' }]
    },
    {
      title: 'Animated Crypto Event',
      role: {
        en: 'High-Performance Animated Landing',
        uk: 'Високопродуктивний анімований лендинг'
      },
      tag: 'Astro GSAP',
      links: [{ label: 'Live Event Page', url: '#' }]
    },
    {
      title: 'Data Analytics Tool Showcase',
      role: {
        en: 'Product Landing Page',
        uk: 'Продуктовий лендинг'
      },
      tag: 'Astro React',
      links: [{ label: 'Case Study & Metrics', url: '#' }]
    }
  ];

  const activeT = t;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-250 flex flex-col relative font-sans">
      
      {/* Toast popup for Copy action */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--foreground)] text-[var(--background)] border border-[var(--border)] px-4 py-3 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] rounded-none font-mono text-xs"
            id="copy-toast"
          >
            <Check size={14} className="text-[var(--accent)]" />
            <span className="font-bold tracking-wider">{activeT.contact.copied}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHADCN-STYLE DRAWER PORTAL (Framer Motion + Accessible Backdrop) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
              onClick={() => setIsDrawerOpen(false)}
              id="drawer-backdrop"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[var(--surface)] border-l border-[var(--border)] z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl font-mono text-xs rounded-none"
              id="drawer-surface"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-extrabold block">MENU_SYSTEM // REGISTRAR</span>
                    <h3 className="text-sm font-bold tracking-tight text-[var(--foreground)]">CONFIG & INDEX</h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="font-mono text-[10px] px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-all cursor-pointer rounded-none active:translate-y-[1px] font-bold"
                    id="drawer-close-btn"
                  >
                    [ CLOSE ]
                  </button>
                </div>

                {/* Navigation inside Drawer */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold block mb-1">
                    01 // SYSTEM CHANNELS
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: 'hero', number: '01', key: 'hero' },
                      { id: 'stack', number: '02', key: 'stack' },
                      { id: 'projects', number: '03', key: 'projects' },
                      { id: 'archive', number: '04', key: 'archive' },
                      { id: 'contact', number: '05', key: 'contact' }
                    ].map((item) => {
                      const isActive = activeSection === item.id;
                      const menuLabel = (activeT.navigation as any)[item.key];
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setIsDrawerOpen(false);
                            setTimeout(() => handleSmoothScroll(item.id), 250);
                          }}
                          className={`w-full text-left py-2.5 px-3 border transition-all flex items-center justify-between rounded-none cursor-pointer ${
                            isActive 
                              ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-extrabold' 
                              : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]'
                          }`}
                          id={`drawer-nav-link-${item.id}`}
                        >
                          <span className="font-bold">{menuLabel.replace(/^\d+\s+/, '')}</span>
                          <span className="text-[10px] font-bold text-[var(--accent)]">
                            [{item.number}]
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DOWNLOAD CV IN DRAWER */}
                <div className="pt-2 border-t border-[var(--border)] mt-2">
                  <Link 
                    href="/cv" 
                    className="w-full flex items-center justify-center gap-2 font-mono text-[10px] uppercase font-bold py-3 border-2 border-[var(--foreground)] bg-[var(--surface)] text-[var(--foreground)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 ease-out select-none"
                  >
                    <Download size={13} /> {activeT.experience?.downloadCv || 'DOWNLOAD CV'}
                  </Link>
                </div>

                {/* Language Switcher inside Drawer */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold block">
                    02 // LANGUAGE (SYSTEM_LOCALE)
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleLocaleChange('en')}
                      className={`font-mono text-[9px] p-2.5 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                        locale === 'en' 
                          ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--foreground)] -translate-x-[1px] -translate-y-[1px]' 
                          : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                      }`}
                      id="drawer-lang-en-btn"
                    >
                      ENGLISH [EN]
                    </button>
                    <button
                      onClick={() => handleLocaleChange('uk')}
                      className={`font-mono text-[9px] p-2.5 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                        locale === 'uk' 
                          ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--foreground)] -translate-x-[1px] -translate-y-[1px]' 
                          : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                      }`}
                      id="drawer-lang-uk-btn"
                    >
                      УКРАЇНСЬКА [UK]
                    </button>
                  </div>
                </div>

                {/* Theme Selector inside Drawer */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold block">
                    03 // WORKSPACE_THEME
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'light', label: activeT.leftColumn.themes.light, bgSample: 'bg-[#f9f9f9] border-[#e2e8f0]' },
                      { id: 'dark', label: activeT.leftColumn.themes.dark, bgSample: 'bg-[#0a0a0a] border-[#262626]' },
                      { id: 'warm', label: activeT.leftColumn.themes.warm, bgSample: 'bg-[#f4f1ea] border-[#ded9d1]' },
                      { id: 'contrast', label: activeT.leftColumn.themes.contrast, bgSample: 'bg-[#ffffff] border-black border-2' },
                    ].map((tOpt) => {
                      const isSelected = theme === tOpt.id;
                      return (
                        <button
                          key={tOpt.id}
                          onClick={() => handleThemeChange(tOpt.id)}
                          className={`font-mono text-[9px] p-2.5 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight flex items-center justify-center gap-1.5 ${
                            isSelected 
                              ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] font-extrabold shadow-[2px_2px_0px_0px_var(--foreground)] -translate-x-[1px] -translate-y-[1px]' 
                              : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                          }`}
                          id={`drawer-theme-select-${tOpt.id}`}
                        >
                          <span className={`w-1.5 h-1.5 block rounded-none shrink-0 ${tOpt.bgSample} border`} />
                          <span className="truncate">{tOpt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location and Metadata inside Drawer */}
                <div className="border border-[var(--border)] p-4 space-y-3 font-mono text-[10px] bg-[var(--background)] rounded-none">
                  <div className="flex items-center justify-between text-[var(--muted-foreground)] font-bold">
                    <span>LOCATION</span>
                    <span className="text-[var(--foreground)] font-semibold">{locale === 'en' ? 'Sumy, Ukraine' : 'Суми, Україна'}</span>
                  </div>
                  <div className="h-[1px] bg-[var(--border)]" />
                  <div className="flex items-center justify-between text-[var(--muted-foreground)] font-bold">
                    <span>AVAILABILITY</span>
                    <span className="text-[var(--foreground)] font-semibold">{activeT.leftColumn.availability}</span>
                  </div>
                  <div className="h-[1px] bg-[var(--border)]" />
                  <div className="flex items-center justify-between text-[var(--muted-foreground)] font-bold">
                    <span>LOCAL TIME</span>
                    <span className="text-[var(--foreground)] font-semibold">{currentTime} (Kyiv)</span>
                  </div>
                </div>



              </div>

              {/* Drawer Footer info */}
              <div className="border-t border-[var(--border)] mt-6 pt-4 space-y-2 text-[10px] text-[var(--muted-foreground)] font-mono font-bold">
                <div className="flex items-center justify-between font-bold text-[9px]">
                  <span>RESOLUTION:</span>
                  <span className="text-[var(--foreground)] uppercase">{screenWidth < 768 ? 'MOBILE (<768px)' : 'TABLET/LAPTOP (768-1280px)'}</span>
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span>ACTIVE WIDTH:</span>
                  <span className="text-[var(--foreground)]">{screenWidth}px</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STICKY HEADER BELOW 1280px */}
      <header className="sticky top-0 z-30 w-full flex xl:hidden items-center justify-between px-6 py-4 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-none animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">W-SYSTEM: ACTIVE</span>
          </div>
          <span className="font-mono text-[12px] uppercase font-extrabold tracking-wider text-[var(--foreground)]">
            Maksym Zakaliuzhnyi
          </span>
        </div>


        <button
          onClick={() => setIsDrawerOpen(true)}
          className="font-mono text-[10px] px-3 py-1.5 border border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] transition-all uppercase font-bold cursor-pointer rounded-none active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          id="drawer-open-trigger"
        >
          [ MENU ]
        </button>
      </header>

      {/* MAIN CONTAINER STREAM WIRED WITH 4 EXPLICIT RESOLUTION CONTAINER BANDWIDTH CONSTRAINTS */}
      <div className="flex-1 flex flex-col xl:flex-row w-full mx-auto max-w-full md:max-w-[768px] xl:max-w-[1280px] 2xl:max-w-[1536px] border-x border-[var(--border)] bg-[var(--background)] transition-all duration-300">
        
        {/* LEFT COLUMN: Fixed Sidebar on Desktop (Fully Hidden under 1280px since settings & navigation live in Drawer) */}
        <aside className="hidden xl:flex xl:w-[32%] border-b xl:border-b-0 xl:border-r border-[var(--border)] p-6 xl:p-8 flex-col justify-between xl:sticky xl:top-0 xl:h-screen overflow-y-auto bg-[var(--surface)]" id="left-column">
          <div className="space-y-6">
            
            {/* Active connection flag */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-none animate-pulse shrink-0 relative -top-[0.5px]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">W-SYSTEM: ACTIVE</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight leading-none mb-1 text-[var(--foreground)]">
                Maksym Zakaliuzhnyi
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                {activeT.leftColumn.role}
              </p>
            </div>

            {/* INTEGRATED PERSISTENT CONTROL PANEL (NO DROPDOWNS AS REQUESTED) */}
            <div className="space-y-3.5 border-t border-b border-[var(--border)] py-4 my-2">
              
              {/* LANGUAGE SELECTOR */}
              <div className="space-y-2 flex flex-col items-center text-center w-full">
                <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                  <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <Globe size={10} /> {activeT.leftColumn.langTitle}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--foreground)] font-bold uppercase">[{locale.toUpperCase()}]</span>
                </div>
                <div className="grid grid-cols-2 gap-1 border-none bg-transparent p-0 w-full">
                  <button
                    onClick={() => handleLocaleChange('en')}
                    className={`font-mono text-[9px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                      locale === 'en' 
                        ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black' 
                        : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                    }`}
                    id="lang-en-btn"
                  >
                    ENGLISH [EN]
                  </button>
                  <button
                    onClick={() => handleLocaleChange('uk')}
                    className={`font-mono text-[9px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight ${
                      locale === 'uk' 
                        ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black' 
                        : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                    }`}
                    id="lang-uk-btn"
                  >
                    УКРАЇНСЬКА [UK]
                  </button>
                </div>
              </div>

              {/* DYNAMIC COMPONENT THEME CONTROL */}
              <div className="space-y-2 flex flex-col items-center text-center w-full">
                <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                  <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <Palette size={10} /> {activeT.leftColumn.themeTitle}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--foreground)] font-bold uppercase">[{theme.toUpperCase()}]</span>
                </div>
                <div className="grid grid-cols-2 gap-1 w-full">
                  {[
                    { id: 'light', label: activeT.leftColumn.themes.light, bgSample: 'bg-[#f9f9f9] border-[#e2e8f0]' },
                    { id: 'dark', label: activeT.leftColumn.themes.dark, bgSample: 'bg-[#0a0a0a] border-[#262626]' },
                    { id: 'warm', label: activeT.leftColumn.themes.warm, bgSample: 'bg-[#f4f1ea] border-[#ded9d1]' },
                    { id: 'contrast', label: activeT.leftColumn.themes.contrast, bgSample: 'bg-[#ffffff] border-black border-2' },
                  ].map((tOpt) => {
                    const isSelected = theme === tOpt.id;
                    return (
                      <button
                        key={tOpt.id}
                        onClick={() => handleThemeChange(tOpt.id)}
                        className={`font-mono text-[9px] p-2 text-center transition-all rounded-none cursor-pointer font-bold border leading-tight flex items-center justify-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_0px_var(--accent)] -translate-x-[1.5px] -translate-y-[1.5px] font-black' 
                            : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none'
                        }`}
                        id={`theme-select-${tOpt.id}`}
                      >
                        <span className={`w-1.5 h-1.5 block rounded-none shrink-0 ${tOpt.bgSample} border`} />
                        <span className="truncate">{tOpt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Core Metadata Container */}
            <div className="border border-[var(--border)] p-4 space-y-3 font-mono text-xs bg-[var(--surface-muted)] rounded-none">
              <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                <span className="uppercase font-bold">LOCATION</span>
                <span className="text-[var(--foreground)] flex items-center gap-1 font-semibold">
                  <MapPin size={11} className="text-[var(--muted-foreground)]" /> {locale === 'en' ? 'Sumy, Ukraine' : 'Суми, Україна'}
                </span>
              </div>
              <div className="h-[1px] bg-[var(--border)]" />
              <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                <span className="uppercase font-bold">AVAILABILITY</span>
                <span className="text-[var(--foreground)] flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-none inline-block animate-pulse" />
                  {activeT.leftColumn.availability}
                </span>
              </div>
              <div className="h-[1px] bg-[var(--border)]" />
              <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                <span className="uppercase font-bold">LOCAL TIME</span>
                <span className="text-[var(--foreground)] flex items-center gap-1 font-semibold">
                  <Clock size={11} className="text-[var(--muted-foreground)]" /> {currentTime} (Kyiv)
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2 block font-semibold">{activeT.navigation.index}</p>
              {[
                { id: 'hero', number: '01', key: 'hero' },
                { id: 'stack', number: '02', key: 'stack' },
                { id: 'projects', number: '03', key: 'projects' },
                { id: 'archive', number: '04', key: 'archive' },
                { id: 'experience', number: '05', key: 'experience' },
                { id: 'contact', number: '06', key: 'contact' }
              ].map((item) => {
                const isActive = activeSection === item.id;
                const menuLabel = (activeT.navigation as any)[item.key];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSmoothScroll(item.id)}
                    className={`w-full text-left font-mono py-2 px-3 text-xs border border-transparent transition-all flex items-center justify-between rounded-none cursor-pointer ${
                      isActive 
                        ? 'bg-[var(--foreground)] text-[var(--background)] -translate-y-0.5 -translate-x-0.5 shadow-[2px_2px_0px_0px_var(--foreground)] border-[var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none font-bold' 
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:border-[var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <span>{menuLabel.replace(/^\d+\s+/, '')}</span>
                    <span className={`text-[10px] font-bold ${isActive ? 'text-[var(--background)]' : 'text-[var(--accent)] group-hover:text-[var(--foreground)]'}`}>
                      [{item.number}]
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* DOWNLOAD CV ACTION LINK */}
            <div className="pt-2">
              <Link 
                href="/cv" 
                className="w-full flex items-center justify-center gap-2 font-mono text-[10px] uppercase font-bold py-3 border-2 border-[var(--foreground)] bg-[var(--surface)] text-[var(--foreground)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 ease-out select-none"
              >
                <Download size={13} /> {activeT.experience?.downloadCv || 'DOWNLOAD CV'}
              </Link>
            </div>
          </div>


          {/* Footer Metadata */}
          <div className="pt-6 lg:pt-0 mt-6 lg:mt-0 border-t border-[var(--border)] lg:border-t-0 space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--muted-foreground)]">
              <span>{activeT.leftColumn.systemState}</span>
              <span className="text-[var(--foreground)] font-bold flex items-center gap-1">
                {activeT.leftColumn.stateVal} <span className="inline-block w-1.5 h-1.5 bg-[var(--accent)] animate-pulse" />
              </span>
            </div>
            <p className="font-mono text-[9px] text-[var(--muted-foreground)] opacity-80 leading-tight">
              {activeT.leftColumn.spec}<br />
              {activeT.leftColumn.intended}
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Scrollable Content Stream */}
        <main className="xl:w-[68%] w-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" id="right-column-stream">
          
          {/* 1. INTRODUCTION SECTION */}
          <section id="hero" className="border-b border-[var(--border)] p-6 lg:p-12 min-h-[48vh] flex flex-col justify-center bg-[var(--surface)] relative overflow-hidden">
            {/* Elegant Minimalist Technical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.06] pointer-events-none z-0" />
            
            {/* Corner Tech Brackets */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[var(--border)] opacity-65 pointer-events-none z-0" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-[var(--border)] opacity-65 pointer-events-none z-0" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[var(--border)] opacity-65 pointer-events-none z-0" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[var(--border)] opacity-65 pointer-events-none z-0" />
            
            <div className="absolute top-5 left-8 font-mono text-[8px] text-[var(--muted-foreground)] opacity-40 select-none tracking-widest z-0 hidden sm:block">
              [SYS_INIT_COORD // 48.2N 34.1E]
            </div>
            <div className="absolute bottom-5 right-8 font-mono text-[8px] text-[var(--muted-foreground)] opacity-40 select-none tracking-widest z-0 hidden sm:block">
              [STAGE: PRODUCTION_VERIFIED]
            </div>

            <div className="max-w-xl space-y-6 relative z-10">
              {/* Blur backdrop for readability on complex backgrounds */}
              <div className="absolute -inset-8 bg-[var(--surface)]/60 backdrop-blur-md rounded-2xl -z-10 [mask-image:linear-gradient(to_right,white_40%,transparent_100%)] pointer-events-none" />
              
              <div className="inline-flex items-center gap-1.5 text-[var(--accent)] font-mono text-[10px] tracking-wider uppercase bg-[var(--surface-muted)] px-3 py-1 border border-[var(--border)] font-bold relative">
                <Sparkles size={10} className="text-[var(--accent)]" /> {activeT.intro.badge}
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight relative">
                {activeT.intro.headline}
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-lg relative font-medium">
                {activeT.intro.copy}
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4 font-mono text-sm relative">
                <button 
                  onClick={() => handleSmoothScroll('projects')} 
                  className="bg-[var(--accent)] text-[var(--accent-foreground)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 ease-out px-7 py-3 rounded-none font-bold cursor-pointer select-none"
                  id="action-view-projects"
                >
                  {activeT.intro.ctaProjects}
                </button>
                <button 
                  onClick={() => handleSmoothScroll('contact')} 
                  className="bg-[var(--surface)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 ease-out px-7 py-3 rounded-none font-bold cursor-pointer select-none"
                  id="action-get-touch"
                >
                  {activeT.intro.ctaContact}
                </button>
              </div>
            </div>
          </section>

          {/* 2. PROOF & STACK SECTION */}
          <section id="stack" className="border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="space-y-10">
              
              <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                <span className="text-[var(--accent)] font-bold">[02]</span>
                <span className="w-4 h-[1px] bg-[var(--border)] block" />
                <span>{activeT.proof.tag}</span>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--surface)] rounded-none">
                <div className="p-5 flex flex-col justify-between hover:bg-[var(--surface-muted)] transition-colors group relative" id="metric-years">
                  <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors font-bold block mb-3">{activeT.proof.metricYears}</span>
                  <div>
                    <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] leading-none">{activeT.proof.metricYearsVal}</span>
                    <span className="font-mono text-[10px] text-[var(--accent)] block mt-1 font-bold">{activeT.proof.metricYearsDesc}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between hover:bg-[var(--surface-muted)] transition-colors group relative" id="metric-pages">
                  <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors font-bold block mb-3">{activeT.proof.metricPages}</span>
                  <div>
                    <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] leading-none">{activeT.proof.metricPagesVal}</span>
                    <span className="font-mono text-[10px] text-[var(--accent)] block mt-1 font-bold">{activeT.proof.metricPagesDesc}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between hover:bg-[var(--surface-muted)] transition-colors group relative" id="metric-cms">
                  <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors font-bold block mb-3">{activeT.proof.metricCms}</span>
                  <div>
                    <span className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight block">{activeT.proof.metricCmsVal}</span>
                    <span className="font-mono text-[10px] text-[var(--accent)] block mt-1.5 font-bold">{activeT.proof.metricCmsDesc}</span>
                  </div>
                </div>
              </div>

              {/* Technical Stack Inventory - Simplified flat placks list */}
              <div className="space-y-4 pb-4">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[var(--foreground)] tracking-wider uppercase flex items-center gap-2">
                    <Layers size={14} className="text-[var(--accent)]" />
                    {activeT.proof.engineHead}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] max-w-lg font-sans leading-relaxed">
                    {activeT.proof.engineDesc}
                  </p>
                </div>

                {/* Compact, horizontal flex-wrap layout of skills with 1px fine borders */}
                <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                  {techItems.map((item) => (
                    <div 
                      key={item.id}
                      className="border border-[var(--border)] px-3 py-2 bg-[var(--surface)] hover:bg-[var(--surface-muted)] hover:border-[var(--foreground)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150 flex items-center gap-2 rounded-none font-mono text-xs select-none cursor-default"
                      id={`tech-badge-${item.id}`}
                    >
                      <div className="w-5 h-5 border border-[var(--border)] flex items-center justify-center bg-[var(--background)] rounded-none shrink-0">
                        {getTechIcon(item.id, 11, "text-[var(--foreground)]")}
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-tight text-[var(--foreground)]">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 3. CASE STUDIES SECTION */}
          <section id="projects" className="border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--surface)]">
            <div className="space-y-8">
              
              <div className="flex items-center justify-between animate-none">
                <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                  <span className="text-[var(--accent)] font-bold">[03]</span>
                  <span className="w-4 h-[1px] bg-[var(--border)] block" />
                  <span>{activeT.cases.tag}</span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-[var(--muted-foreground)] uppercase">
                  {activeT.cases.nodes}: {caseStudies.length}
                </span>
              </div>

              {/* VARIANTS CONTAINER */}
              <div className="grid grid-cols-1 gap-6">
                {caseStudies.map((caseStudy) => {
                  const isSelected = selectedCaseDetail === caseStudy.id;
                  const isLive = caseStudy.label === 'v1.0 Live';
                  const summaryText = locale === 'en' ? caseStudy.summary.en : caseStudy.summary.uk;
                  const roleText = locale === 'en' ? caseStudy.role.en : caseStudy.role.uk;
                  const highlightsList = locale === 'en' ? caseStudy.highlights.en : caseStudy.highlights.uk;

                  return (
                    <div 
                      key={`v1.1-${caseStudy.id}`}
                      className={`border transition-all duration-200 ease-out rounded-none bg-[var(--surface)] flex flex-col overflow-hidden relative ${
                        isSelected 
                          ? 'border-[var(--foreground)] shadow-[6px_6px_0px_var(--foreground)] -translate-x-1 -translate-y-1 z-10' 
                          : 'border-[var(--border)] hover:border-[var(--foreground)] hover:shadow-[6px_6px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1'
                      }`}
                    >
                      {/* Top row */}
                      <div className="border-b border-[var(--border)] px-4 py-2 flex items-center justify-between bg-[var(--surface-muted)] font-mono text-[10px]">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="text-[var(--accent)]">{"//"}</span>
                          <span className="text-[var(--foreground)] uppercase tracking-wider">NODE_{caseStudy.id.toUpperCase()}</span>
                        </div>
                        <span className={`px-2 py-0.5 border font-mono text-[9px] font-bold uppercase tracking-tight ${
                          isLive 
                            ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]' 
                            : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)]'
                        }`}>
                          {caseStudy.label}
                        </span>
                      </div>

                      {/* Inner Info and Control layout */}
                      <div className="p-5 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2.5 border-b border-[var(--border)] pb-3">
                          <div>
                            <h4 className="text-base font-extrabold text-[var(--foreground)] tracking-tight uppercase font-mono">
                              {caseStudy.title}
                            </h4>
                            <p className="font-mono text-[10px] text-[var(--muted-foreground)] uppercase mt-1">
                              ROLE: {roleText} <span className="text-[var(--border)] mx-1.5">|</span> DATE: {caseStudy.period}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans font-medium">
                          {summaryText}
                        </p>

                        {/* Multi-action controls */}
                        <div className="pt-3 flex flex-wrap gap-4 font-mono text-sm">
                          {caseStudy.id === 'portfolio-cms' && (
                            <Link 
                              href="/portfolio-cms"
                              className="bg-[var(--accent)] text-[var(--accent-foreground)] border-2 border-[var(--foreground)] shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 ease-out px-4 py-2.5 rounded-none font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 cursor-pointer select-none"
                            >
                              <BookOpen size={12} /> {activeT.cases.readDoc}
                            </Link>
                          )}
                          <button 
                            onClick={() => setSelectedCaseDetail(isSelected ? null : caseStudy.id)}
                            className="bg-[var(--surface)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 ease-out px-4 py-2.5 rounded-none font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 cursor-pointer select-none"
                          >
                            <Terminal size={12} className="text-[var(--muted-foreground)]" />
                            {isSelected ? activeT.cases.hideTelemetry : activeT.cases.viewTelemetry}
                          </button>
                        </div>

                        {/* Expanding Telemetry (Variant 1.1) */}
                        {isSelected && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-5 border-t border-[var(--border)] space-y-5 overflow-hidden mt-4"
                          >
                            <div className="space-y-3">
                              <span className="font-mono text-[9px] text-[var(--foreground)] font-bold block uppercase tracking-widest bg-[var(--surface-muted)] px-2 py-1 border-l-2 border-[var(--foreground)]">
                                {activeT.cases.implementedFlows}
                              </span>
                              <ul className="space-y-2 ml-1">
                                {highlightsList.map((highlight: string, idx: number) => (
                                  <li key={idx} className="text-xs text-[var(--muted-foreground)] flex items-start gap-2.5">
                                    <span className="font-mono text-[var(--accent)] font-bold text-[10px] mt-0.5">_0{idx + 1}</span>
                                    <span className="leading-relaxed font-sans font-medium text-[var(--foreground)]">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies Stack row */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {caseStudy.stack.map((tech) => (
                                <span key={tech} className="font-mono text-[9px] bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] px-2 py-0.5 font-bold uppercase tracking-tight">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* 4. COMMERCIAL ARCHIVE LEDGER */}
          <section id="archive" className="border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--background)]">
            <div className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                  <span className="text-[var(--accent)] font-bold">[04]</span>
                  <span className="w-4 h-[1px] bg-[var(--border)] block" />
                  <span>{activeT.archive.tag}</span>
                </div>
                <p className="font-sans text-xs text-[var(--muted-foreground)] font-medium max-w-lg leading-relaxed">
                  {locale === 'en' 
                    ? 'A selected preview of commercial landing pages and campaigns.' 
                    : 'Вибране прев`ю комерційних лендингів та кампаній.'}
                </p>
              </div>

              {/* Minimal Featured Curated List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--border)] pt-6">
                {featuredArchive.map((item, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className="border border-[var(--border)] bg-[var(--surface-muted)] p-5 flex flex-col justify-between gap-6 group relative transition-all duration-200 ease-out hover:border-[var(--foreground)] hover:shadow-[6px_6px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-[var(--foreground)] font-extrabold text-sm uppercase tracking-tight block leading-tight">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[10px] font-bold text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors">
                            _0{idx + 1}
                          </span>
                        </div>
                        <p className="text-[var(--muted-foreground)] text-xs font-sans">
                          {locale === 'en' ? item.role.en : item.role.uk}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <span className="font-mono text-[9px] font-bold text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] px-2 py-0.5 uppercase self-start">
                          {item.tag}
                        </span>
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-col gap-2 items-start sm:items-end w-full sm:w-auto">
                            {item.links.map((link, i) => (
                              <a 
                                key={i} 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[var(--surface)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 ease-out px-3 py-1.5 rounded-none font-bold uppercase tracking-widest text-[9px] flex items-center justify-between sm:justify-start gap-1 w-full"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight size={10} className="shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="pt-6 mt-6 flex">
                <Link 
                  href="/archive" 
                  className="w-full sm:w-auto text-center font-mono text-[10px] bg-[var(--surface)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 ease-out px-6 py-3 uppercase font-bold tracking-widest select-none"
                >
                  {locale === 'en' ? 'VIEW FULL ARCHIVE LEDGER [→]' : 'ПЕРЕГЛЯНУТИ ВЕСЬ РЕЄСТР АРХІВУ [→]'}
                </Link>
              </div>

            </div>
          </section>

          {/* 5. EXPERIENCE HISTORY SECTION */}
          <section id="experience" className="border-b border-[var(--border)] p-6 lg:p-12 bg-[var(--surface)]">
            <div className="space-y-6 max-w-4xl">
              
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                  <span className="text-[var(--accent)] font-bold">[05]</span>
                  <span className="w-4 h-[1px] bg-[var(--border)] block" />
                  <span>{activeT.experience?.tag || 'OPERATIONAL HISTORY'}</span>
                </div>
              </div>

              {/* Minimal Timeline */}
              <div className="space-y-8">
                {activeT.experience?.timeline?.map((job: any, idx: number) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-[var(--border)] space-y-3 pb-8 last:pb-0">
                    <div className="absolute w-2 h-2 rounded-none bg-[var(--background)] border-[1.5px] border-[var(--foreground)] -left-[5px] top-[4px]" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-[var(--foreground)] tracking-tight uppercase">
                          {job.role}
                        </h4>
                        <div className="text-[11px] font-mono text-[var(--foreground)] font-bold mt-1">
                          {job.company}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--muted-foreground)] font-bold shrink-0 uppercase tracking-widest">
                        {job.period}
                      </span>
                    </div>
                    
                    <ul className="space-y-2 mt-3">
                      {job.bullets.map((bullet: string, i: number) => (
                        <li key={i} className="flex gap-2 text-xs text-[var(--muted-foreground)] font-sans leading-relaxed">
                          <span className="text-[var(--accent)] select-none">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 6. SECURE GATEWAY / CONNECTION SECTION */}
          <section id="contact" className="p-6 lg:p-12 bg-[var(--background)] flex-1 flex flex-col justify-center border-t border-[var(--border)]">
            <div className="w-full space-y-10">
              
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-[10px] tracking-widest uppercase">
                  <span className="text-[var(--accent)] font-bold">[06]</span>
                  <span className="w-4 h-[1px] bg-[var(--border)] block" />
                  <span>{activeT.contact.tag}</span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                  {activeT.contact.headline}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-sans">
                  {activeT.contact.copy}
                </p>
              </div>

              {/* High precision bilingual contact cards */}
              <div className="flex flex-col gap-4">
                
                {/* Secured Email Clipboard module (Prominent) */}
                <div className="border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--foreground)] transition-colors rounded-none relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <Mail size={12} className="text-[var(--accent)]" />
                       <span className="font-mono text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest">{activeT.contact.mailLabel}</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[var(--foreground)] select-all tracking-tight block">zaksumy1989@gmail.com</span>
                  </div>
                  <button 
                    onClick={handleCopyEmail}
                    className="shrink-0 bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] font-mono text-[10px] uppercase font-bold px-6 py-3 transition-colors flex items-center justify-center gap-2 tracking-widest"
                    id="btn-copy-email"
                  >
                    {copiedEmail ? <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-none bg-[var(--background)] animate-pulse shrink-0 relative -top-[0.5px]" /> {activeT.contact.copied}</span> : <span className="flex items-center gap-2"><Copy size={12} /> {activeT.contact.copyBtn}</span>}
                  </button>
                </div>

                {/* Secondary Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Telegram Text system */}
                  <a 
                    href="https://t.me/zaksumy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] transition-all rounded-none group flex flex-col justify-between"
                    id="link-telegram"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">{activeT.contact.instantLabel}</span>
                      <ArrowUpRight size={12} className="text-[var(--muted-foreground)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)] truncate">@zaksumy</span>
                  </a>

                  {/* GitHub Production connection */}
                  <a 
                    href="https://github.com/malks-z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] transition-all rounded-none group flex flex-col justify-between"
                    id="link-github"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">{activeT.contact.secureCodeLabel}</span>
                      <ArrowUpRight size={12} className="text-[var(--muted-foreground)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)] truncate">github.com/malks-z</span>
                  </a>

                  {/* LinkedIn Professional */}
                  <a 
                    href="https://www.linkedin.com/in/maksym-zakaliuzhnyi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] transition-all rounded-none group flex flex-col justify-between"
                    id="link-linkedin"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">{activeT.contact.verifiedIdentity}</span>
                      <ArrowUpRight size={12} className="text-[var(--muted-foreground)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)] truncate">LinkedIn</span>
                  </a>
                </div>

              </div>

              {/* Secure verification footers */}
              <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] font-mono text-[var(--muted-foreground)] bg-transparent font-bold">
                <div>
                  {activeT.contact.portalVerify}
                </div>
                <div>
                  {activeT.contact.shippedOn}
                </div>
              </div>

            </div>
          </section>

        </main>

      </div>
    </div>
  );
}
