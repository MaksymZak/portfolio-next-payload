# Збірка та Дизайн Система: "Digital Workspace / Linear-esque"

Цей документ описує основні рішення, прийняті при створенні та стилізації інтерфейсу портфоліо. Головна мета — створити чистий, професійний вигляд, що нагадує високоякісні інструменти для розробників (productivity apps) або технічну документацію.

## Основні принципи

1. **Craftsmanship over Defaults (Якість замість шаблонів)**
   Ми відмовились від стандартних градієнтів, «заокруглених карток» або м'яких тіней, які асоціюються із шаблонними стартапами. Кожне візуальне рішення має бути передбачуваним, чітким і суворим.

2. **Architectural Honesty (Мінімалізм та структура)**
   Жодних сторонніх "прикрас" чи "штучного інтелекту" для виду (метадані заради метаданих). Усі елементи, кордони (borders) та лінії підкреслюють реальну структуру блоків. 

3. **High-Contrast Monochrome + Accent**
   Основа — чорно-біле полотно з тонкими сірими лініями (`1px borders`), де ключову інформацію або взаємодію підкреслено єдиним приглушеним, але виразним акцентним кольором (`indigo-600` / `var(--accent)`).

## Типографіка

* **Primary (Текст та Заголовки):** `Inter` (або системні без зарубок шрифт). Забезпечує чудову читабельність, сучасність та нейтральність. Заголовки мають бути впевненими, із щільним трекінгом (`tracking-tight`).
* **Моноширинний (Метадані):** `JetBrains Mono` / `Fira Code` (реалізований через Tailwind `font-mono`). Використовується для навігації, невеликих лейблів, дат, бейджиків тегів та кроків. Робить інтерфейс більш "технічним" та "інженерним".

## Кольори та Поверхні

Всі стилі побудовані навколо CSS змінних (з підтримкою темної теми, якщо це знадобиться в майбутньому):

* `--background`: Основне тло (чистий білий або ледь-ледь кремовий).
* `--foreground`: Основний текст (глибокий чорний або темно-сірий сланцевий).
* `--muted-foreground`: Допоміжний текст, що не відвертає увагу від основного (сірий).
* `--border`: Тонкий `1px` кордон, застосовується масово для відокремлення блоків.
* `--surface`: Легке виділення поверхонь (наприклад карток). 
* `--surface-muted`: Контрастніше виділення для чергування блоків (наприклад, "шаховий" порядок секцій `[05]` і `[06]`).
* `--accent`: Колір для акцентів і важливих кнопок в інтерфейсі (кнопка `SAVE PDF` у резюме, номери секцій `[01]`).

## Форми та Геометрія

* **Гострі кути (`rounded-none`).** Жодних згладжених радіусів для карток та кнопок. Все ґрунтується на строгих прямокутниках.
* Чіткий розподіл на колонки: бокова навігація залишається зафіксованою, а контент плавно прокручується; на мобільних пристроях це колапсується в єдиний монолітний потік з Drawer-меню.

## Анімації (Micro-interactions)

Анімації використовуються тільки для фідбеку під час взаємодії:
* Brutalist lift/shadow — pattern IDs **R01–R15** у `src/lib/brutalist-motion.ts` (детальна таблиця — [.cursor/docs/button.md](button.md)).
* Легкі slide та fade-in для індикації завантаження або відкриття Drawer-меню без зайвої химерності.

---

## Brutalist Motion Contract

Єдиний контракт руху живе в `src/lib/brutalist-motion.ts`. Компоненти не дублюють translate/shadow класи — імпортують `approvedMotionR**` або helpers (`brutalistNavItemClasses`, `brutalistSwitcherClasses`, `brutalistDrawerTriggerClasses`).

**Registry:** `APPROVED_MOTION_BY_PATTERN` (R01–R15), `APPROVED_MOTION_SOURCE` (R08, R10 = `draft`; решта = `reference`).

| ID | Context | Primary touchpoint |
| --- | --- | --- |
| R01 | Hero CTA | `Button` primary / secondary |
| R02 | Project card actions | `Button` card-action |
| R03 | Archive featured link | `Button` compact-link |
| R04 | View full archive | `Button` secondary (archive section) |
| R05 | Download CV | `sidebar.tsx`, `drawer-menu.tsx` |
| R06 | Sidebar nav | `brutalistNavItemClasses(_, 'sidebar')` |
| R07–R08 | Sidebar switchers | `LocaleSwitcher` / `ThemeSwitcher` `variant="sidebar"` |
| R09–R10 | Drawer switchers | same, `variant="drawer"` |
| R11 | Menu trigger | `brutalistDrawerTriggerClasses` |
| R12 | Stack plack | `stack-plack.tsx` |
| R13 | Project card shell | `Card` interactive |
| R14 | Archive preview card | `Card` interactive + `bg-surface-muted` |
| R15 | Resume stack badge | `resume/bento.tsx` (no active press) |

**Scale presets** (building blocks inside exports):

| Scale | Shadow (rest/hover) | Duration | Patterns |
| --- | --- | --- | --- |
| `cta` | 4px → 5px | 100ms | R01, R04 |
| `compact` | 2px → 3px | 100ms | R02, R03 |
| `plack` | none → 3px | default | R11 |
| `card` | none → 6px | 200ms | R13, R14 |
| `tile` | none → 3px | 150ms | R12 |

R05–R10, R15 мають окремі exports (CV link без rest shadow; sidebar vs drawer switchers; badge без active).

**Правила:**
- Елемент рухається (`translate`), тінь залишається візуально «прив’язаною» до нижнього правого кута (коли rest shadow є).
- Active/selected — press into shadow (`active:translate-*`, `active:shadow-none`) або стабільний selected lift без hover-only motion.
- Drawer nav (R16) — без brutalist lift; micro-motion R17–R22 — лише translate-X/Y або `transition-colors`.
- Усі transition/hover обгорнуті в `motion-safe:`; `@media (prefers-reduced-motion: reduce)` вимикає анімації.

**Focus:** `brutalistFocusRing` + глобальний `:focus-visible` outline (3px `var(--ring)`). Не використовуйте `focus-visible:outline-none` на інтерактивних контролах.

## Home Navigation & Scroll-Spy

Логіка в `src/lib/home-scroll.ts` + `src/components/layout/nav.tsx`.

1. Клік по nav → `scrollToSectionTarget()` з offset (`HOME_SECTION_SCROLL_MT`, header-aware).
2. Встановлюється **target lock** на `HOME_SCROLL_SETTLE_MS`; observer не перемикає active section, поки scroll не ос settle або lock не сплине.
3. Hover lift на nav — тільки для **неактивних** рядків (sidebar variant).
4. Drawer: закривається перед scroll, затримка 200ms (0ms при reduced motion), focus повертається через Radix Dialog.

## Stack Section Pattern

`src/components/sections/stack.tsx` + `stack-plack.tsx`:
- Metrics grid: uppercase label → large value → accent description; group-hover label `muted → foreground`.
- Skills: bordered placks з icon box, mono title, optional level bars, **R12** tile motion (`approvedMotionR12`).
- Intro: icon + heading + Payload `proof.intro`; UI chrome — `messages/{en,uk}.json`.

## Accessibility (MVP2)

- Skip link → `#main-content` (`SkipLink` у locale layout).
- External links: `a11y.externalLink` з hint «opens in new tab».
- Archive table: `<caption class="sr-only">`, `scope="col"` на `<th>`.
- Project telemetry: `aria-expanded`, `aria-controls`, region `aria-labelledby` toggle button; `inert` when collapsed.
- Clipboard failure → toast `actions.copyFailed`.

## SEO & Social (MVP2)

- Icons: `public/favicon.svg`, `public/apple-touch-icon.svg`.
- Default OG: `public/og-default.svg` через `buildPageMetadata()`.
- Case pages: screenshot as OG when available (`resolveMediaUrl`).
- Roadmap cases (`label: 'roadmap'`): `robots: noindex, nofollow`; **виключені з sitemap** (лише `live` cases).

## Manual QA Checklist

Після змін у motion/nav/content перевірити:

- [ ] Buttons: primary, secondary, archive CTA, print, resume/download, drawer trigger, telemetry, locale/theme switchers — однакова hover/active геометрія.
- [ ] Cards: project, archive, resume bento, case links, stack placks — тінь не clipped, shadow anchored.
- [ ] Nav: клік hero → contact стабільний; mouse під час scroll не flicker.
- [ ] Drawer: calm close, scroll to target, reduced motion, focus return.
- [ ] Stack: metrics + placks відповідають reference prototype.
- [ ] Content: без placeholder copy, duplicate archive URLs, застарілого Next.js, змішаних EN/UK labels.
- [ ] Themes: light, dark, warm, contrast — контраст тіней і focus rings.
- [ ] Reduced motion: core usability без smooth scroll / hover dependence.
- [ ] Commands: `bun run lint`, `bun run build`.
- [ ] Routes: `/en`, `/uk`, `/en/resume`, `/uk/resume`, `/en/archive`, `/uk/archive`, `/en/case/portfolio-cms`, `/admin`.

## Макет CV (Резюме)

Сторінка `/cv` стилізована з двома цілями:
1. Виглядати ексклюзивно, як Dashboard/Print Out.
2. Бути готовою до **Друку в PDF** (завдяки класам `print:hidden`, `print:border-black` тощо). Під час друку всі UI-елементи меню зникають, кольори нормалізуються у чорно-білий спектр для економії фарби і чіткості читання. Ширина `header` адаптована для вирівнювання у контейнері разом із іншими блоками.
