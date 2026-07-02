# Implementation Plan: Portfolio Content Truth Pass

Branch: feature/portfolio-content
Created: 2026-07-02

## Settings

- Testing: no. Verification is `bun run lint`, `bun run build`, `bun run seed`, and manual browser QA only.
- Logging: standard. Seed script keeps its existing progress/error logging style; no new verbose output.
- Docs: yes. Includes a documentation checkpoint (Task 12) because the seed loses its `cv.json` dependency.

## Roadmap Linkage

Milestone: "none"
Rationale: Content-truth iteration after `feature-portfolio-polish-mvp2`. Replaces AI-prototype seed copy with real, verifiable, bilingual content.

## Source Context

- Agent guide: `AGENTS.md` (naming, i18n rules, verification commands)
- Seed data: `src/db/seed/data/*.ts`, `src/db/seed/seed-skills.ts`, `src/db/seed/cv.ts`, `src/db/seed/utils.ts`, `src/db/seed/types.ts`
- Skills schema and rendering: `src/config/collections/Skills/Skills.ts`, `src/components/sections/stack-plack.tsx`, `src/components/resume/bento.tsx`, `src/lib/skill-icon.tsx`
- Old CV facts (historical reference only after this plan): `.cursor/docs/cv.json`

## Goals

1. Every text on the site is true and defensible in an interview: no invented metrics, no fake implementation details, correct terminology (ISR = Incremental Static Regeneration).
2. Consistent positioning everywhere: **Frontend Developer** (EN) / **Frontend Розробник** (UK). (Dropped the "Middle" self-label — let the work set the grade.)
3. Ukrainian copy reads as native language, not as a calque from English.
4. Skills render as a flat prioritized technology list — no proficiency scale.
5. Seed no longer depends on the outdated `.cursor/docs/cv.json`.

## Key Decisions (agreed with Maksym — FINAL)

- Positioning: **Frontend Developer** / **Frontend Розробник** (NO "Middle" self-label anywhere).
- Skills: flat prioritized list of **21** technologies, no proficiency scale on the site. Frontend cluster first, backend/DB/infra at the end. Top-6: Next.js, React, TypeScript, JavaScript, Payload CMS, Tailwind CSS.
- Proof metrics: `4+ Years / COMMERCIAL DELIVERY`, `300+ Landings / BUILT & SHIPPED`, `A/B Testing / IN PRODUCTION` (third stat = real differentiator, not a stack label).
- Tone: terminal-brutalist chrome stays, but every sentence carries a fact.
- Cases: `portfolio-cms` stays live and honest; `lms-platform` and `ab-testing-lab` stay as intentional placeholder roadmap stubs WITHOUT invented implementation details — real case data comes later via `.cursor/docs/case-intake-template.md`.
- Archive: curated explicit list of real live landings; **year column stays** (approximate years are acceptable), **no images** (clean text ledger); 13 rows are a starting base, Maksym extends later. Auto-generation from `cv.json` is removed.
- Real landing count: **300+** (used in proof, about, and portfolio note — replaces the earlier `500+`).
- English: honest framing — technical reading only, not yet conversational.
- Contacts: email `me@maksymzak.dev`; availability `Remote`.
- All copy in this plan is FINAL and must be pasted verbatim. The executor must NOT rewrite, "improve", or re-translate any text.

## Verification Checklist — ВСЕ ПУНКТЫ РЕШЕНЫ (готово к /aif-implement)

Все `[VERIFY]` пункты закрыты в брейншторме с Максимом. Ниже — итоговый статус каждого.

1. **Годы в архиве (Task 6): РЕШЕНО — год ВОЗВРАЩАЕТСЯ** (Максим просил вернуть). Колонка `year` остаётся; значения приблизительные (best-guess), Максим уточнит позже. Схема/тип/UITaбли не меняются относительно текущего кода.
2. **Стек записей архива (Task 6): РЕШЕНО — оставляем текущий стек как базу.** 13 записей идут как стартовый набор, Максим сам дополнит/поправит стек и добавит остальные лендинги позже.
3. **LMS (Task 5): РЕШЕНО — остаётся заглушкой ("рыба").** Период/стек/highlight — placeholder, будут заменены реальным контентом позже через `case-intake-template.md`.
4. **A/B Lab (Task 5): РЕШЕНО — остаётся заглушкой ("рыба").** Стек-placeholder, реальный контент позже через `case-intake-template.md`.
5. **Буллеты GoITeens (Task 7): РЕШЕНО — все 4 буллета подтверждены Максимом (включая Payload CMS для маркетологов и менторство). SoftRyzen тоже подтверждён.**
6. **Уровень английского (Task 8): РЕШЕНО — честная переформулировка.** EN `English — Pre-Intermediate (reads technical documentation; not yet conversational)` / UK `Англійська — Pre-Intermediate (читаю технічну документацію; розмовна ще слабка)`. Остальное резюме утверждено.
7. **Availability (Task 9): РЕШЕНО — `Remote` / `Віддалено` (допускает гибрид/офис).**
8. **Состав и порядок скиллов (Task 2): РЕШЕНО — 21 скилл, фронтенд-кластер впереди, бэкенд/DB/инфра в хвосте (Gulp поднят к фронтенд-инструментам). Топ-6: Next.js, React, TypeScript, JavaScript, Payload CMS, Tailwind CSS.**
9. **Email (Task 9): РЕШЕНО — `me@maksymzak.dev` (заменён с личного gmail).**

## Commit Plan

- Commit 1 (after tasks 1-3): "feat(skills): flat technology inventory without proficiency scale"
- Commit 2 (after tasks 4-9): "feat(content): real bilingual seed content"
- Commit 3 (after tasks 10-13): "chore(content): messages fixes, cv.json decoupling, docs"

## Tasks

### Phase 1: Skills Without Scale

- [x] Task 1: Make skill `level` optional in schema and stop rendering it.
  - Files: `src/config/collections/Skills/Skills.ts`, `src/components/sections/stack-plack.tsx`, `src/components/resume/bento.tsx`.
  - Deliverable: `level` field becomes `required: false` (keep `min: 1, max: 5`, update admin description to "Optional legacy proficiency level; not rendered on the site."). Remove the `L{level}` badge blocks entirely: `stack-plack.tsx` lines with `skill.level > 0 ? (...) : null` and the equivalent block in `bento.tsx` (~lines 75-82). Run `bun run generate:types` after the schema change.
  - Expected behavior: stack placks and resume badges show icon + title only; admin no longer requires a level when creating a skill.

- [x] Task 2: New skills seed data — flat prioritized list, decoupled from cv.json.
  - Files: new `src/db/seed/data/skills.ts`, rewrite `src/db/seed/seed-skills.ts`.
  - Deliverable: `data/skills.ts` exports `skillsSeed: { title: string }[]` in exactly this order (order = recruiter priority; APPROVED with Maksym — flat list, 21 items):
    1. `Next.js`
    2. `React`
    3. `TypeScript`
    4. `JavaScript`
    5. `Payload CMS`
    6. `Tailwind CSS`
    7. `Astro`
    8. `HTML & CSS`
    9. `GSAP`
    10. `Framer Motion`
    11. `TanStack Query`
    12. `Zustand`
    13. `Redux`
    14. `Gulp`
    15. `Node.js`
    16. `Express.js`
    17. `PostgreSQL`
    18. `MongoDB`
    19. `Prisma`
    20. `Docker`
    21. `Vercel`
    `seed-skills.ts` iterates `skillsSeed` with `order: index + 1`, no `level` in the payload, and no imports from `./cv` or `countSkillLevel`.
    Parked (worked with, intentionally NOT shown to keep focus): `TanStack Table`, `Lottie`, `WordPress`, `tRPC`, `REST API`, `ESLint`, `Prettier`.
  - Expected behavior: `bun run seed` upserts exactly these 21 skills. Note: seed matches by title, so renamed titles (e.g. old `JavaScript / TypeScript`) will leave stale rows — the executor must delete obsolete skill docs whose titles are not in `skillsSeed` (same pattern as `deprecatedProjectSlugs` cleanup in the projects seed).

- [x] Task 3: Extend the skill icon map for the new titles.
  - Files: `src/lib/skill-icon.tsx`.
  - Deliverable: `SKILL_ICON_MAP` gains lowercase keys for all 21 titles: `typescript` (Shield), `javascript` (Code2), `html & css` (Palette), `tailwind css` (Palette), `zustand` (Activity), `redux` (Activity), `postgresql` (Database), `mongodb` (Database), `prisma` (Layers), `gsap` (Sparkles), `framer motion` (Sparkles), `tanstack query` (Layers), `gulp` (Terminal), `vercel` (Terminal). Keep existing keys; do not remove them.
  - Expected behavior: no dev-console warnings about missing icon mappings after reseeding for any of the 21 skills.

### Phase 2: Seed Copy (paste verbatim — do not rewrite or re-translate)

- [x] Task 4: Home hero + proof.
  - Files: `src/db/seed/data/home.ts`.
  - Deliverable: keep the existing export shape, replace all values:

    EN hero:
    - badge: `PROFILE / FRONTEND DEVELOPER`
    - headline: `I build high-performance landing systems and CMS-driven frontends that survive real marketing traffic.`
    - copy: `Production landing pages, A/B test variants, and bilingual content platforms — built and supported for marketing teams that ship weekly. Focus stack: Next.js, Astro, Payload CMS, TypeScript.`

    EN proof:
    - years: `4+ Years` / yearsDesc: `COMMERCIAL DELIVERY`
    - pages: `300+ Landings` / pagesDesc: `BUILT & SHIPPED`
    - depth: `A/B Testing` / depthDesc: `IN PRODUCTION`
    - intro: `A working toolkit, not a wishlist: every technology below has shipped production pages — fast loads, structured content, quick bilingual rollouts.`

    UK hero:
    - badge: `ПРОФІЛЬ / FRONTEND РОЗРОБНИК`
    - headline: `Створюю швидкі лендинг-системи та CMS-фронтенди, що витримують реальний маркетинговий трафік.`
    - copy: `Продакшн-лендинги, A/B-варіанти та двомовні контентні платформи — розробка й підтримка для маркетинг-команд, які релізять щотижня. Основний стек: Next.js, Astro, Payload CMS, TypeScript.`

    UK proof:
    - years: `4+ Роки` / yearsDesc: `КОМЕРЦІЙНА РОЗРОБКА`
    - pages: `300+ Лендингів` / pagesDesc: `СТВОРЕНО ТА ЗАПУЩЕНО`
    - depth: `A/B-тести` / depthDesc: `У ПРОДАКШЕНІ`
    - intro: `Робочий інструментарій, а не список побажань: кожна технологія нижче використовувалась на продакшені — швидке завантаження, структурований контент, двомовні запуски.`
  - Expected behavior: no occurrences of "ABSOLUTE DELIVERY", "АБСОЛЮТНА ПОРЯДНІСТЬ", or "DEVISE" remain anywhere in `src/db/seed/`.

- [x] Task 5: Projects — one honest live case, two honest roadmap stubs.
  - Files: `src/db/seed/data/projects.ts`.
  - APPROVED with Maksym: `portfolio-cms` copy is FINAL. `lms-platform` and `ab-testing-lab` stay as intentional placeholder ("рыба") stubs — the period/stack/highlight values below are placeholders and will be REPLACED later with real content produced from `.cursor/docs/case-intake-template.md` (VERIFY items 3–4 are resolved as "placeholder accepted", not blockers).
  - Deliverable: `deprecatedProjectSlugs` becomes `['edge-analytics-pipeline', 'design-system-ops', 'landing-version-system']`. `projectsSeed` contains exactly three entries:

    **1. `portfolio-cms`** — title `Portfolio CMS`, label `live`, period `Q1–Q2 2026`, order 1, stack `['Next.js 16', 'Payload CMS 3', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL']`.
    - role EN: `Solo Developer — Frontend & CMS Architecture` / UK: `Соло-розробка — Frontend та архітектура CMS`
    - summary EN: `This site itself: a bilingual portfolio platform on Next.js 16 App Router with embedded Payload CMS 3. Every piece of content is editable in the admin panel and goes live without a redeploy.`
    - summary UK: `Цей сайт: двомовна портфоліо-платформа на Next.js 16 App Router із вбудованим Payload CMS 3. Увесь контент редагується в адмін-панелі та оновлюється без редеплою.`
    - highlights EN:
      1. `Modeled the content schema in Payload CMS with field-level EN/UK localization — one document serves both locales.`
      2. `Built a tagged cache layer: React.cache per request plus unstable_cache with revalidateTag fired from CMS hooks on publish.`
      3. `Case pages are statically generated via generateStaticParams and revalidate on content edits — no rebuilds.`
      4. `Wrote an idempotent bilingual seed script that provisions the entire database in one command.`
    - highlights UK:
      1. `Змодельовано контент-схему в Payload CMS з локалізацією на рівні полів EN/UK — один документ обслуговує обидві мови.`
      2. `Побудовано теговий шар кешування: React.cache на запит та unstable_cache із revalidateTag, який спрацьовує з хуків CMS при публікації.`
      3. `Сторінки кейсів генеруються статично через generateStaticParams і ревалідуються при редагуванні контенту — без ребілдів.`
      4. `Написано ідемпотентний двомовний seed-скрипт, що розгортає всю базу однією командою.`
    - metrics EN: `Publish-to-live with zero redeploys` / UK: `Публікація без жодного редеплою`
    - technicalDepth EN: `Strict layering: RSC pages read only from cached repositories, all CMS access goes through a single Payload Local API entry point, and client components receive data as props. Four brutalist themes on Tailwind CSS 4 design tokens with full reduced-motion support.`
    - technicalDepth UK: `Строга шаруватість: RSC-сторінки читають лише з кешованих репозиторіїв, увесь доступ до CMS іде через єдину точку входу Payload Local API, а клієнтські компоненти отримують дані як пропси. Чотири бруталістські теми на дизайн-токенах Tailwind CSS 4 з повною підтримкою reduced motion.`

    **2. `lms-platform`** — title `LMS Platform`, label `roadmap`, period `2025 — relaunch in progress` (placeholder), order 2, stack `['Next.js', 'TypeScript', 'Tailwind CSS']` (placeholder).
    - role EN: `Full-Stack Developer — Pet Project` / UK: `Full-Stack розробник — власний проєкт`
    - summary EN: `A course delivery platform with lesson progress tracking. The build is complete; third-party services and tokens are being restored before the public demo relaunch. A full case study will replace this entry once it is live.`
    - summary UK: `Платформа доставки навчальних курсів із відстеженням прогресу уроків. Розробку завершено; зараз відновлюються сторонні сервіси й токени перед публічним перезапуском демо. Після запуску цей запис замінить повний кейс.`
    - highlights EN: 1. `Course catalog, lesson pages, and per-user progress tracking.` (placeholder)
    - highlights UK: 1. `Каталог курсів, сторінки уроків та відстеження прогресу користувача.`
    - metrics EN: `In relaunch — full case to follow` / UK: `На перезапуску — повний кейс згодом`
    - technicalDepth EN: `Details will be published with the relaunch; this entry is intentionally short until the demo is publicly verifiable.`
    - technicalDepth UK: `Деталі буде опубліковано разом із перезапуском; запис свідомо короткий, доки демо не можна перевірити публічно.`

    **3. `ab-testing-lab`** — title `A/B Testing Lab`, label `roadmap`, period `Planned 2026`, order 3, stack `['Next.js', 'TypeScript', 'Vercel']` (placeholder).
    - role EN: `Frontend Developer — Sanitized Work Replica` / UK: `Frontend розробник — знеособлена копія робочої системи`
    - summary EN: `A public, sanitized rebuild of the A/B landing workflow I run in production: variant builds, traffic routing, and conversion analytics — with all employer branding and data removed.`
    - summary UK: `Публічна знеособлена реконструкція робочого A/B-процесу для лендингів: збирання варіантів, маршрутизація трафіку та аналітика конверсій — без брендингу й даних роботодавця.`
    - highlights EN: 1. `Demonstrates the real production workflow: how variants are built, split, and measured.`
    - highlights UK: 1. `Демонструє реальний продакшн-процес: як варіанти збираються, розподіляються та вимірюються.`
    - metrics EN: `In development — sanitized demo` / UK: `У розробці — знеособлене демо`
    - technicalDepth EN: `Variant routing and measurement architecture will be documented once the demo is public — no numbers will be published that cannot be reproduced in the demo.`
    - technicalDepth UK: `Архітектуру маршрутизації варіантів і вимірювань буде задокументовано після публікації демо — жодних цифр, які не можна відтворити в демо.`
  - Expected behavior: `/en/case/portfolio-cms` renders the new copy; `landing-version-system` case is deleted on reseed; no seed text mentions "Instant Server Revalidation", "<50ms", "Offline LocalStorage", or "200ms".

- [x] Task 6: Archive — curated explicit ledger, no auto-generation.
  - Files: `src/db/seed/data/archive.ts`.
  - APPROVED with Maksym: (a) `year` column STAYS — schema (`Archive.ts`), type (`ArchiveSeed`), and `table.tsx` are UNCHANGED; years below are approximate best-guess and Maksym refines later; (b) archive stays a clean TEXT ledger — NO images/thumbnails/OGP; (c) the 13 rows below are a starting base (stack/url/category/role/year kept as-is), Maksym extends and refines later.
  - Deliverable: delete `cvArchiveSeed`, `seenUrls`, and the `cv`/`normalizeArchiveUrl` imports if unused; `archiveSeed` is exactly this explicit list (orders 1–13), WITH approximate `year` fields. No `metric` fields: invented metrics are removed; real ones can be added later in admin.

    | # | title | role EN | role UK | stack | year | category | url |
    |---|-------|---------|---------|-------|------|----------|-----|
    | 1 | `GoITeens Landing Registry` | `Live ledger of A/B-tested landing pages I build and support` | `Живий реєстр A/B-лендингів, які я створюю та підтримую` | `Next.js, Astro, Payload CMS` | `2024–2026` | platform | `https://lp.goiteens.com/landings-list` |
    | 2 | `Interior Design Hub` | `Payload CMS integration & frontend build` | `Інтеграція Payload CMS та розробка фронтенду` | `Astro, Payload CMS, Tailwind CSS` | `2025` | landing | `https://interior-design.goiteens.com/` |
    | 3 | `School Webinar AI` | `High-volume lead capture with GTM analytics` | `Лендинг збору лідів із GTM-аналітикою` | `Astro, Tailwind CSS, Google Tag Manager` | `2025` | campaign | `https://school-lp.goiteens.com/webinar-ai/` |
    | 4 | `NMT 2026 Test Preparation` | `Interactive test-prep landing` | `Інтерактивний лендинг підготовки до НМТ` | `Astro, Tailwind CSS` | `2025` | landing | `https://nmt.goiteens.com/nmt-2026/` |
    | 5 | `Fast Reading Masterclass` | `Performance refactor & speed optimization` | `Рефакторинг та оптимізація швидкодії` | `React, Vite, Tailwind CSS` | `2024` | landing | `https://fast-reading.goiteens.com/` |
    | 6 | `AI Creator` | `Course landing build & animations` | `Розробка лендингу курсу та анімації` | `Astro, Tailwind CSS` | `2025` | landing | `https://ai-creator.goiteens.com/` |
    | 7 | `Summer AI Courses` | `Seasonal campaign with A/B variants` | `Сезонна кампанія з A/B-варіантами` | `Astro, Tailwind CSS` | `2025` | campaign | `https://summer-ai-courses.goiteens.com/` |
    | 8 | `Courses Quiz` | `Quiz funnel with discount logic` | `Квіз-воронка з логікою знижок` | `Astro, Tailwind CSS` | `2024` | campaign | `https://courses-all.goiteens.com/quiz-bloggers/discount-30/` |
    | 9 | `Painting on Tablet` | `Variant build for A/B rotation` | `Варіант лендингу для A/B-ротації` | `Astro, Tailwind CSS` | `2024` | campaign | `https://painting-on-tablet.goiteens.com/v-1/` |
    | 10 | `Painting: Three Courses` | `Multi-course landing` | `Лендинг трьох курсів` | `Astro, Tailwind CSS` | `2024` | landing | `https://painting.goiteens.com/three-courses/` |
    | 11 | `Math 1–4` | `Landing build & support` | `Розробка та підтримка лендингу` | `Astro, Tailwind CSS` | `2024` | landing | `https://math.goiteens.com/1-4-classes/` |
    | 12 | `Python Course` | `Landing build & support` | `Розробка та підтримка лендингу` | `Astro, Tailwind CSS` | `2024` | landing | `https://python.goiteens.com/` |
    | 13 | `SoftRyzen Production Run` | `150+ landing pages and CRM frontends delivered` | `150+ лендингів та CRM-фронтендів` | `React, Gulp, SCSS` | `2022–2024` | platform | — |

    `[VERIFY (позже, не блокер): годы приблизительные — Максим уточнит]`
  - Expected behavior: `/en/archive` shows exactly 13 rows WITH the year column (4 columns: identifier, surface, stack, year); all URLs open live pages; the seed removes archive docs that are no longer in the list (follow the existing delete/upsert pattern in `seed-archive.ts`; if it has no delete pass, add one keyed by title).

- [x] Task 7: Experience — both locales hardcoded, updated GoITeens bullets.
  - Files: `src/db/seed/data/experience.ts`.
  - Deliverable: remove `cv`/`splitPosition` imports; hardcode both locales.

    **GoITeens** — role `Frontend Developer`, company `GoITeens, Ukraine` (UK: `GoITeens, Україна`), period EN `June 2024 — Present` / UK `Червень 2024 — дотепер`, order 1. Bullets (APPROVED):
    - EN: 1. `Build and maintain marketing landing pages at production scale on Next.js, Astro, Payload CMS, and Gulp.` 2. `Implement A/B testing end-to-end: variant builds, traffic splits, and conversion analytics for paid campaigns.` 3. `Integrate Payload CMS so marketing editors publish content without developer involvement.` 4. `Mentor a junior developer: code review, task decomposition, onboarding.`
    - UK: 1. `Розробка та підтримка маркетингових лендингів у продакшн-масштабі на Next.js, Astro, Payload CMS та Gulp.` 2. `Наскрізна реалізація A/B-тестування: збирання варіантів, розподіл трафіку та аналітика конверсій для платних кампаній.` 3. `Інтеграція Payload CMS, щоб маркетологи публікували контент без залучення розробника.` 4. `Менторство junior-розробника: код-рев'ю, декомпозиція задач, онбординг.`

    **SoftRyzen** — role `Frontend Developer`, company `SoftRyzen, Ukraine` (UK: `SoftRyzen, Україна`), period EN `July 2022 — April 2024` / UK `Липень 2022 — Квітень 2024`, order 2. Bullets:
    - EN: 1. `Delivered 150+ landing pages and CRM frontends with React and Gulp.` 2. `Worked with designers and backend developers to keep UI pixel-accurate and consistent.` 3. `Improved performance and maintainability of long-running projects.`
    - UK: 1. `Створено та здано 150+ лендингів і CRM-фронтендів на React та Gulp.` 2. `Співпраця з дизайнерами та бекенд-розробниками для піксель-точного й консистентного UI.` 3. `Покращення продуктивності та підтримуваності довгострокових проєктів.`
  - Expected behavior: "Даний час" no longer appears anywhere; EN and UK bullet counts match per company.

- [x] Task 8: Resume — about, education, languages, soft skills, portfolio note.
  - Files: `src/db/seed/data/resume.ts`.
  - Deliverable: remove `cv`/`splitLanguage` imports; hardcode both locales.
    - about EN: `Frontend Developer with 4+ years of commercial experience: 300+ landing pages built and shipped, production A/B testing, and CMS-driven content platforms on React, Next.js, Astro, and Payload CMS. Comfortable across the stack when needed — Node.js, Express, PostgreSQL, MongoDB. Looking for a team where frontend quality and delivery speed matter.`
    - about UK: `Frontend розробник із 4+ роками комерційного досвіду: 300+ лендингів створено та запущено, A/B-тестування в продакшені, контентні платформи на React, Next.js, Astro та Payload CMS. За потреби впевнено працюю по всьому стеку — Node.js, Express, PostgreSQL, MongoDB. Шукаю команду, де важливі якість фронтенду та швидкість доставки.`
    - education (one entry, both locales): title `Full Stack Developer Bootcamp`, date `February 2021 – November 2021` (UK date: `Лютий 2021 – Листопад 2021`), text EN `10-month intensive program: JavaScript, React, Node.js, and database development.` / UK `10-місячна інтенсивна програма: JavaScript, React, Node.js та робота з базами даних.`
    - languages EN: `Ukrainian — Native`, `English — Pre-Intermediate (reads technical documentation; not yet conversational)`; UK: `Українська — Рідна`, `Англійська — Pre-Intermediate (читаю технічну документацію; розмовна ще слабка)`.
    - softSkills EN: `Problem-solving`, `Teamwork`, `Communication`, `Time management`, `Adaptability`; UK: `Вирішення проблем`, `Командна робота`, `Комунікація`, `Тайм-менеджмент`, `Адаптивність`.
    - portfolioNote EN: title `Portfolio`, text `300+ landing pages built and shipped. A curated selection with live links is in the archive ledger on this site.` / UK: title `Портфоліо`, text `300+ лендингів створено та запущено. Кураторська добірка з живими посиланнями — в архіві на цьому сайті.`
  - Expected behavior: `/en/resume` and `/uk/resume` render the new copy; print view unaffected structurally.

- [x] Task 9: Settings — identity and contacts hardcoded.
  - Files: `src/db/seed/data/settings.ts`.
  - Deliverable: remove `cv`/`mapContactType` imports; hardcode:
    - name (both locales): `Maksym Zakaliuzhnyi`
    - position EN `Frontend Developer` / UK `Frontend Розробник`
    - location EN `Sumy, Ukraine` / UK `Суми, Україна`
    - availability EN `Remote` / UK `Віддалено` (APPROVED)
    - contacts (identical for both locales): phone `+38 (099) 432-20-85` → `tel:+380994322085`; mail `me@maksymzak.dev` → `mailto:me@maksymzak.dev` (APPROVED — changed from personal gmail); telegram `@MaksymZak` → `https://t.me/MaksymZak`; github `Github` → `https://github.com/MaksymZak`; linkedin `Linkedin` → `https://www.linkedin.com/in/mzakaliuzhnyi/`; map `Sumy, Ukraine` → `https://maps.app.goo.gl/8MoxKkNXwVzS99Wi9`
  - Expected behavior: contact section and sidebar identity render unchanged structurally with the new values.

### Phase 3: Cleanup & Messages

- [x] Task 10: Remove the cv.json dependency from the seed.
  - Files: `src/db/seed/cv.ts` (delete), `src/db/seed/utils.ts`, `src/db/seed/types.ts`.
  - Deliverable: after Tasks 2 and 5–9 nothing imports `./cv`; delete `cv.ts`, remove `CvJson` from `types.ts`, and remove now-unused helpers (`splitPosition`, `splitLanguage`, `countSkillLevel`, `mapContactType`) from `utils.ts` — keep helpers still in use (e.g. `normalizeArchiveUrl` if referenced). `.cursor/docs/cv.json` stays in the repo as a historical document.
  - Expected behavior: `bun run seed` works without reading `.cursor/docs/cv.json`; `bun run lint` passes with no unused exports.

- [x] Task 11: Messages — factual fixes only.
  - Files: `messages/en.json`, `messages/uk.json`.
  - Deliverable: in `en.json`, set `archive.description` to `A registry of commercial landing pages, single-page applications, and interactive campaigns — built with Astro, Next.js, and React for production marketing traffic.` Mirror the meaning in `uk.json` (`archive.description`): `Реєстр комерційних лендингів, односторінкових застосунків та інтерактивних кампаній — створених на Astro, Next.js і React для реального маркетингового трафіку.` No other message keys change; structure untouched.
  - Expected behavior: `/en/archive` and `/uk/archive` headers read correctly; message key parity between locales preserved.

- [x] Task 12: Documentation checkpoint.
  - Files: `AGENTS.md`, `.ai-factory/DESCRIPTION.md`.
  - Deliverable: update the two references to the seed's data source: seed content is now self-contained in `src/db/seed/data/` (cv.json is historical reference only). In `AGENTS.md`, adjust the `cv.json` row in Reference Documentation ("CV facts for seed content" → "Old CV facts (historical reference; seed is self-contained)"). In `DESCRIPTION.md`, fix the "Content seed" NFR line accordingly. Also drop the "Middle" self-label in dev docs for consistency: `AGENTS.md` header line `(Maksym Zak, Middle Frontend)` → `(Maksym Zak, Frontend)`.
  - Expected behavior: docs match reality; no other doc content changes.

### Phase 4: Seed & QA

- [x] Task 13: Reseed and verify.
  - Files: none (execution only).
  - Deliverable: run `bun run generate:types` (if not yet done in Task 1), `bun run lint`, `bun run build`, `bun run seed`. Confirm seed log shows: 21 skills upserted + stale skills deleted, 3 projects upserted + `landing-version-system` deleted, 13 archive rows, 2 experience entries, globals updated.
  - Expected behavior: manual QA passes on `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/archive`, `/en/case/portfolio-cms`, `/admin`: new copy everywhere, no `L{n}` badges, no leftover prototype phrases ("ABSOLUTE DELIVERY", "Instant Server Revalidation", "CMS DEVISE"), all archive links open live pages.
