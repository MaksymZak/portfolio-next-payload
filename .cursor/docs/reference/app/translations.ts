export type Language = 'en' | 'uk';

export const translations: Record<Language, any> = {
  en: {
    leftColumn: {
      role: "Middle Frontend Developer",
      location: "Sumy, Ukraine",
      availability: "Remote only",
      systemState: "SYSTEM STATE",
      stateVal: "ONLINE",
      spec: "SPEC: TS, REACT 19, NEXT.js, TAILWIND V4.",
      intended: "© 2026. INTENDED FOR SECURE RECRUITMENT ONLY.",
      langTitle: "SYSTEM_LOCALE",
      themeTitle: "WORKSPACE_THEME",
      themes: {
        light: "EDITORIAL LIGHT",
        dark: "GRAPHITE DARK",
        warm: "WARM NEUTRAL",
        contrast: "HIGH CONTRAST"
      }
    },
    navigation: {
      index: "INDEX",
      hero: "01 INTRODUCTION",
      stack: "02 PROOF & STACK",
      projects: "03 CASE STUDIES",
      archive: "04 ARCHIVE SYSTEM",
      experience: "05 OPERATIONAL EXPERIENCE",
      contact: "06 CONTACTS"
    },
    intro: {
      badge: "CORE PRINCIPLE / ABSOLUTE DELIVERY",
      headline: "Building high-performance landing systems and localized web experiences with an absolute delivery mindset.",
      copy: "I build and support production landing pages, bilingual content surfaces, and CMS-connected frontend experiences for teams that need reliable delivery, clean implementation, and fast iteration.",
      ctaProjects: "View Projects",
      ctaContact: "Contact Me"
    },
    proof: {
      tag: "PROOF & TECHNICAL DEPLOYMENT",
      metricYears: "EXPERIENCE CYCLE",
      metricYearsVal: "4+ Years",
      metricYearsDesc: "COMMERCIAL DELIVERY",
      metricPages: "PRODUCTION METRIC",
      metricPagesVal: "300+ Pages",
      metricPagesDesc: "SHIPPED OR SUPPORTED",
      metricCms: "TECHNOLOGY DEPTH",
      metricCmsVal: "Next.js & Payload",
      metricCmsDesc: "CMS DEVISE SPECIALIST",
      engineHead: "Engineering Inventory",
      engineDesc: "A strict selection of tools leveraged on production surfaces to achieve reliable page weight, secure content structure, and rapid localization.",
      coreFrameworks: "Core Frameworks",
      cmsSystems: "CMS Systems",
      opsMetrics: "Ops & Metrics"
    },
    cases: {
      tag: "CASE STUDIES & SCHEMAS",
      nodes: "ACTIVE NODES",
      role: "ROLE",
      viewTelemetry: "VIEW TECHNICAL TELEMETRY",
      hideTelemetry: "HIDE GRANULAR ARCHITECTURE",
      implementedFlows: "IMPLEMENTED ARCHITECTURE FLOWS",
      verifiedProof: "VERIFIED METRIC PROOF",
      depthResolution: "DEPTH RESOLUTION",
      readDoc: "READ DETAILED ENGINEERING DOCUMENTATION"
    },
    experience: {
      tag: "OPERATIONAL HISTORY",
      downloadCv: "DOWNLOAD CV",
      timeline: [
        {
          role: "Frontend Developer",
          company: "Goiteens Company, Ukraine",
          period: "June 2024 - Present",
          bullets: [
            "Developed and optimized landing pages (Next.js, Payload CMS, Astro, Gulp).",
            "Implemented A/B testing logic and analytics for conversion optimization.",
            "Maintained scalable Next.js projects and mentored a junior developer."
          ]
        },
        {
          role: "Frontend Developer",
          company: "SoftRyzen Company, Ukraine",
          period: "July 2022 - April 2024",
          bullets: [
            "Delivered 150+ landing pages and CRM systems with Gulp and React.",
            "Collaborated with designers and backend developers to ensure UI/UX consistency.",
            "Improved project performance and maintainability."
          ]
        }
      ]
    },
    archive: {
      tag: "COMMERCIAL ARCHIVE LEDGER",
      placeholder: "Search stack or scope...",
      all: "ALL",
      identifier: "IDENTIFIER",
      surface: "PROJECT SURFACE",
      scope: "COMMERCIAL SCOPE / ROLE",
      assembly: "TECHNOLOGY ASSEMBLY",
      year: "YEAR",
      noEntries: "NO REGISTRY ENTRIES MATCH SEARCH QUERY",
      disclaimer: "To protect security contracts and corporate privacy protocols, exact codebase repos, client names, and credentials for private campaign dashboards or internal systems are withheld. Proofs of localized assemblies can be verified in 1-on-1 technical screens."
    },
    contact: {
      tag: "SECURE GATEWAY / CONNECTIONS",
      headline: "Ready to deploy clean code on your localized web architectures?",
      copy: "I am available for remote full-time assignments and selective advisory support on Next.js structures, fast landing workflows, and decoupled CMS setups. Open to professional inquiries.",
      mailLabel: "SECURED MAIL ENDPOINT",
      copyBtn: "COPY ADDRESS",
      copied: "EMAIL COPIED TO CLIPBOARD",
      instantLabel: "INSTANT TEXT SYSTEM",
      secureCodeLabel: "SECURE CODE PLATFORM",
      productionRepo: "PRODUCTION CODE REPOSITORIES",
      verifiedIdentity: "VERIFIED IDENTITY HUB",
      linkedinSub: "LINKEDIN NETWORK",
      portalVerify: "SECURE PORTAL VERIFIED // BYPASS SECRETS: FALSE",
      shippedOn: "SHIPPED ON: 2026-06-13."
    },
    portfolio: {
      archive: {
        tag: "COMMERCIAL ARCHIVE LEDGER",
        placeholder: "Search stack or scope...",
        all: "ALL",
        identifier: "IDENTIFIER",
        surface: "PROJECT SURFACE",
        scope: "COMMERCIAL SCOPE / ROLE",
        assembly: "TECHNOLOGY ASSEMBLY",
        year: "YEAR",
        noEntries: "NO REGISTRY ENTRIES MATCH SEARCH QUERY",
        disclaimer: "To protect security contracts and corporate privacy protocols, exact codebase repos, client names, and credentials for private campaign dashboards or internal systems are withheld. Proofs of localized assemblies can be verified in 1-on-1 technical screens."
      }
    }
  },
  uk: {
    leftColumn: {
      role: "Middle Frontend Розробник",
      location: "Суми, Україна",
      availability: "Тільки віддалено",
      systemState: "СТАН СИСТЕМИ",
      stateVal: "АКТИВНИЙ",
      spec: "СПЕЦ: TS, REACT 19, NEXT.js, TAILWIND V4.",
      intended: "© 2026. ТІЛЬКИ ДЛЯ БЕЗПЕЧНОГО НАЙМУ.",
      langTitle: "ЛОКАЛЬ_СИСТЕМИ",
      themeTitle: "ТЕМА_РОБОЧОГО_ПРОСТОРУ",
      themes: {
        light: "СВІТЛА РЕДАКЦІЙНА",
        dark: "ТЕМНИЙ ГРАФІТ",
        warm: "ТЕПЛА НЕЙТРАЛЬНА",
        contrast: "ВАРІАНТ КОНТРАСТУ"
      }
    },
    navigation: {
      index: "ПОКАЖЧИК",
      hero: "01 ВСТУПНІ ДАНІ",
      stack: "02 МЕТРИКИ ТА СТЕК",
      projects: "03 РОЗБІР КЕЙСІВ",
      archive: "04 АРХІВ СИСТЕМ",
      experience: "05 ІСТОРІЯ ДОСВІДУ",
      contact: "06 КОНТАКТИ"
    },
    intro: {
      badge: "ГОЛОВНИЙ ПРИНЦИП / АБСОЛЮТНА ПОРЯДНІСТЬ",
      headline: "Створення високопродуктивних лендингів та локалізованого веб-досвіду з фокусом на абсолютний результат.",
      copy: "Я розробляю та підтримую комерційні лендинги, двомовні контент-сайти та інтегровані з CMS інтерфейси для команд, яким потрібна надійна здача, чистий код і швидка ітерація.",
      ctaProjects: "Переглянути Проєкти",
      ctaContact: "Зв'язатися зі мною"
    },
    proof: {
      tag: "ДОГОВІРНІ МЕТРИКИ ТА РОЗГОРТАННЯ",
      metricYears: "ОБЕРТ ДОСВІДУ",
      metricYearsVal: "4+ Роки",
      metricYearsDesc: "КОМЕРЦІЙНА ЗДАЧА",
      metricPages: "ВИРОБНИЧИЙ ПОКАЗНИК",
      metricPagesVal: "300+ Стор.",
      metricPagesDesc: "ЗАПУЩЕНО ТА ПІДТРИМАНО",
      metricCms: "ГЛИБИНА ТЕХНОЛОГІЙ",
      metricCmsVal: "Next.js та Payload",
      metricCmsDesc: "ФОКУС НА HEADLESS CMS",
      engineHead: "Інженерний Арсенал",
      engineDesc: "Ретельний вибір інструментів, що використовуються в продакшені для забезпечення мінімальної ваги сторінок, безпеки контенту та адаптивної локалізації.",
      coreFrameworks: "Основні Фреймворки",
      cmsSystems: "Системи CMS",
      opsMetrics: "Метрики та Оптимізація"
    },
    cases: {
      tag: "РОЗБІР КЕЙСІВ І СХЕМ",
      nodes: "АКТИВНІ НОДИ",
      role: "РОЛЬ",
      viewTelemetry: "ПОКАЗАТИ ТЕХНІЧНУ ТЕЛЕМЕТРІЮ",
      hideTelemetry: "ПРИХОВАТИ АРХІТЕКТУРУ",
      implementedFlows: "ОПИСАНІ АРХІТЕКТУРНІ ПОТОКИ",
      verifiedProof: "ПІДТВЕРДЖЕНА МЕТРИКА",
      depthResolution: "ГЛИБИНА РІШЕННЯ",
      readDoc: "ЧИТАТИ ДЕТАЛЬНУ ДОКУМЕНТАЦІЮ КЕЙСУ"
    },
    experience: {
      tag: "ІСТОРІЯ ЗАЙНЯТОСТІ",
      downloadCv: "ЗАВАНТАЖИТИ CV",
      timeline: [
        {
          role: "Frontend Developer",
          company: "Goiteens Company, Ukraine",
          period: "Червень 2024 - Даний час",
          bullets: [
            "Розробка та оптимізація лендингів (Next.js, Payload CMS, Astro, Gulp).",
            "Реалізація логіки A/B тестування та аналітики для оптимізації конверсії.",
            "Підтримка масштабованих Next.js проєктів та менторство молодшого розробника."
          ]
        },
        {
          role: "Frontend Developer",
          company: "SoftRyzen Company, Ukraine",
          period: "Липень 2022 - Квітень 2024",
          bullets: [
            "Створення та здача понад 150 лендингів і CRM-систем (Gulp, React).",
            "Співпраця з дизайнерами та бекенд-розробниками для забезпечення UI/UX консистентності.",
            "Покращення продуктивності та підтримки проєктів."
          ]
        }
      ]
    },
    archive: {
      tag: "РЕЄСТР КОМЕРЦІЙНИХ ПРОЄКТІВ",
      placeholder: "Пошук стеку або ролі...",
      all: "ВСІ",
      identifier: "ІДЕНТИФІКАТОР",
      surface: "ПРОЄКТНА ПОВЕРХНЯ",
      scope: "КОМЕРЦІЙНА РОЛЬ // НАПРЯМОК",
      assembly: "ЗБІРКА ТЕХНОЛОГІЙ",
      year: "РІК",
      noEntries: "НЕМАЄ ЗАПИСІВ, ЩО ВІДПОВІДАЮТЬ ЗАПИТУ",
      disclaimer: "Для захисту угод конфіденційності та корпоративних даних точні кодові бази, назви клієнтів і доступи до приватних дашбордів кампаній або внутрішніх систем не розголошуються. Підтвердження збірок можуть бути продемонстровані на особистому технічному інтерв'ю."
    },
    contact: {
      tag: "БЕЗПЕЧНИЙ ШЛЮЗ ЗВ'ЯЗКУ",
      headline: "Готові впроваджувати чистий код у ваші локалізовані веб-архітектури?",
      copy: "Я відкритий для повноцінної віддаленої роботи, а також вибіркових консультацій щодо архітектури Next.js, розробки швидких лендингів та інтеграції headless CMS.",
      mailLabel: "ЗАХИЩЕНА ПОШТОВА ТОЧКА",
      copyBtn: "СКОПІЮВАТИ АДРЕСУ",
      copied: "АДРЕСУ СКОПІЙОВАНО В БУФЕР",
      instantLabel: "МИТТЄВИЙ ТЕКСТОВИЙ ЗВ'ЯЗОК",
      secureCodeLabel: "ЗАХИЩЕНИЙ КОД ПЛАТФОРМИ",
      productionRepo: "КОМЕРЦІЙНИЙ КОД РЕПОЗИТОРІЇВ",
      verifiedIdentity: "ПІДТВЕРДЖЕННЯ ПРОФІЛЮ",
      linkedinSub: "МЕРЕЖА LINKEDIN",
      portalVerify: "ПОРТАЛ ВЕРЕФІКОВАНО // ОБХІД СЕКРЕТІВ: НІ",
      shippedOn: "ВИПУЩЕНО: 2026-06-13."
    },
    portfolio: {
      archive: {
        tag: "РЕЄСТР КОМЕРЦІЙНИХ ПРОЄКТІВ",
        placeholder: "Пошук стеку або ролі...",
        all: "ВСІ",
        identifier: "ІДЕНТИФІКАТОР",
        surface: "ПРОЄКТНА ПОВЕРХНЯ",
        scope: "КОМЕРЦІЙНА РОЛЬ // НАПРЯМОК",
        assembly: "ЗБІРКА ТЕХНОЛОГІЙ",
        year: "РІК",
        noEntries: "НЕМАЄ ЗАПИСІВ, ЩО ВІДПОВІДАЮТЬ ЗАПИТУ",
        disclaimer: "Для захисту угод конфіденційності та корпоративних даних точні кодові бази, назви клієнтів і доступи до приватних дашбордів кампаній або внутрішніх систем не розголошуються. Підтвердження збірок можуть бути продемонстровані на особистому технічному інтерв'ю."
      }
    }
  }
};
