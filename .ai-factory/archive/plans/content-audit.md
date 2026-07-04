---
archived: 2026-07-04
completed: 2026-07-04
---

# Content Audit — EN/UK Copy Fixes

**Status:** Complete
**Scope:** Full proofread of all user-facing text (UI chrome + CMS seed content) in both locales, preserving the brutalist voice. Includes a localization bug fix: `Experience.company`, `Experience.period`, `Projects.period` were not localized in Payload, so the UK site showed English values while UK translations sat unused in seed data.

**Agreed rules (interview):**

- EN↔UK: semantic parity, not word-for-word mirroring.
- Keep the brutalist charm, but the English must be grammatical; button pairs (VIEW/HIDE) stay symmetric.
- Brand names official: GitHub, LinkedIn; in all-caps contexts — caps (NEXT.JS).
- Ukrainian casing follows Ukrainian rules (no Title Case calques).
- Footer stamp: "FOR RECRUITMENT PURPOSES ONLY" / «ЛИШЕ ДЛЯ ЦІЛЕЙ РЕКРУТИНГУ».
- CV English level — no negative phrasing.
- "W-SYSTEM" → "MZ-SYSTEM" (owner initials).
- Section 05: "EXPERIENCE LOG" / «ЖУРНАЛ ДОСВІДУ».
- Case overview heading UK: «Стислий огляд / Резюме кейсу».
- DB content equals seed — safe to reseed (`bun run seed`).

## Tasks

- [x] **1. `messages/en.json`**
  - `nav.experience`: `05 OPERATIONAL EXPERIENCE` → `05 EXPERIENCE LOG`
  - `actions.hideTelemetry`: `HIDE GRANULAR ARCHITECTURE` → `HIDE TECHNICAL TELEMETRY`
  - `actions.search`: `Search stack or scope...` → `Search stack or role...`
  - `footer.spec`: `NEXT.js` → `NEXT.JS`
  - `footer.intended`: `© 2026. INTENDED FOR SECURE RECRUITMENT ONLY.` → `© 2026. FOR RECRUITMENT PURPOSES ONLY.`
  - `header.systemActive`: `W-SYSTEM: ACTIVE` → `MZ-SYSTEM: ACTIVE`
  - `contact.types.map`: `GEO SPATIAL NODE` → `GEOSPATIAL NODE`
  - `case.metricsTitle`: `Verified Metric Proof` → `Verified Metrics`
  - `case.depthTitle`: `Depth Resolution` → `Technical Depth`

- [x] **2. `messages/uk.json`**
  - `nav.archive`: `04 АРХІВ СИСТЕМ` → `04 СИСТЕМА АРХІВУ`
  - `nav.experience`: `05 ІСТОРІЯ ДОСВІДУ` → `05 ЖУРНАЛ ДОСВІДУ`
  - `actions.viewProjects`: `Переглянути Проєкти` → `Переглянути проєкти`
  - `actions.readDoc`: `ЧИТАТИ ДЕТАЛЬНУ ДОКУМЕНТАЦІЮ КЕЙСУ` → `ЧИТАТИ ДЕТАЛЬНУ ІНЖЕНЕРНУ ДОКУМЕНТАЦІЮ`
  - `actions.hideTelemetry`: `ПРИХОВАТИ АРХІТЕКТУРУ` → `ПРИХОВАТИ ТЕХНІЧНУ ТЕЛЕМЕТРІЮ`
  - `themes.contrast`: `ВАРІАНТ КОНТРАСТУ` → `ВИСОКИЙ КОНТРАСТ`
  - `footer.spec`: `NEXT.js` → `NEXT.JS`
  - `footer.intended`: `© 2026. ТІЛЬКИ ДЛЯ БЕЗПЕЧНОГО НАЙМУ.` → `© 2026. ЛИШЕ ДЛЯ ЦІЛЕЙ РЕКРУТИНГУ.`
  - `header.systemActive`: `W-SYSTEM: АКТИВНИЙ` → `MZ-SYSTEM: АКТИВНИЙ`
  - `drawer.title`: `КОНФІГ & ПОКАЖЧИК` → `КОНФІГ ТА ПОКАЖЧИК`
  - `contact.types.github`: `ЗАХИЩЕНИЙ КОД ПЛАТФОРМИ` → `ЗАХИЩЕНА ПЛАТФОРМА КОДУ`
  - `contact.types.linkedin`: `ПІДТВЕРДЖЕННЯ ПРОФІЛЮ` → `ПІДТВЕРДЖЕНИЙ ПРОФІЛЬ`
  - `stack.metrics.years.label`: `ОБЕРТ ДОСВІДУ` → `ЦИКЛ ДОСВІДУ`
  - `stack.engineHead`: `Інженерний Арсенал` → `Інженерний арсенал`
  - `case.verified`: `ВЕРЕФІКОВАНО` → `ВЕРИФІКОВАНО` (typo)
  - `case.overviewTitle`: `Виконавче резюме / Огляд` → `Стислий огляд / Резюме кейсу`
  - `case.metricsTitle`: `Підтверджена метрика` → `Підтверджені метрики`

- [x] **3. Payload schema — localization bug**
  - `src/config/collections/Experience/Experience.ts`: `localized: true` on `company` and `period`
  - `src/config/collections/Projects/Projects.ts`: `localized: true` on `period`
  - `src/db/seed/seed-experience.ts`: uk update also writes `company` + `period`
  - `src/db/seed/types.ts`: `ProjectSeed.period` → `Record<Locale, string>`; adapt `seed-projects.ts`
  - `bun run generate:types`

- [x] **4. Seed data (`src/db/seed/data/`)**
  - `settings.ts`: `Github` → `GitHub`, `Linkedin` → `LinkedIn`; uk position → `Frontend-розробник`
  - `home.ts` (uk): `4+ роки`, `300+ лендингів`, badge `ПРОФІЛЬ / FRONTEND-РОЗРОБНИК`
  - `experience.ts` (uk): `Липень 2022 — квітень 2024`
  - `resume.ts`: EN level `Pre-Intermediate — reads technical documentation fluently`; UK `Pre-Intermediate — вільно читаю технічну документацію`; uk about `Frontend-розробник із...`
  - `projects.ts`: uk roles `Соло-розробник — ...`, `Frontend-розробник — ...`, `Full-Stack-розробник — ...`; `period` per-locale (lms uk `2025 — триває перезапуск`, ab-lab uk `Заплановано на 2026`)
  - `archive.ts`: School Webinar AI uk role → `Високонавантажений збір лідів із GTM-аналітикою`

- [x] **5. Components**
  - `src/components/sections/hero/index.tsx`: `[SYS_INIT_COORD // 48.2N 34.1E]` → `[SYS_INIT_COORD // 50.9N 34.8E]` (real Sumy coordinates)

- [x] **6. Reseed & verify**
  - `bun run lint`, `bun run build`, `bun run seed`
  - Manual check `/en`, `/uk` (UK experience periods/companies now Ukrainian), `/en|uk/resume`, `/en|uk/case/portfolio-cms`, `/admin`

## Out of scope

- No custom frontend 404 page (separate task if desired).
- Archive entry live URLs not re-verified.
