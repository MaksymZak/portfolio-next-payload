# Career and Portfolio Plan

Дата: 2026-05-31

> Точка входа на завтра: [README.md](./README.md).

## 1. Главная стратегия

Основной план: не уходить из IT и не делать резкую смену профессии сейчас. С учетом 4 лет опыта во frontend и финансовой подушки около 3 месяцев комфортно, самый рациональный путь - быстро подготовиться к рынку как Middle Frontend / Next.js Developer.

Fullstack/Nest.js остается направлением развития, но не главным фокусом поиска работы в ближайшие 1-2 месяца.

## 2. Позиционирование

Основной профиль:

> Middle Frontend Developer with React, Next.js, TypeScript, CMS-driven websites, landing systems, performance optimization, and production support experience.

Дополнительная формулировка:

> Frontend developer with backend integration experience and growing fullstack skills.

Не позиционироваться как полноценный Fullstack Developer, пока нет коммерческого backend-опыта.

## 3. Финансовая рамка и срочность

- Комфортная подушка: около 3 месяцев.
- Максимальный запас с использованием критических финансов: до 6 месяцев.
- Минимальный доход: 800 USD.
- Нормальная временная цель: 1000+ USD.

Вывод: нельзя делать долгий учебный период без поиска. Первые отклики и собеседования должны начаться в течение 3-4 недель.

## 4. Целевой рынок

- Украина.
- Только remote.
- Украинские и европейские компании.
- Нероссийский рынок.
- Вакансии без жесткого требования сильного английского.

Английский сейчас A1-A2, поэтому англоязычный рынок не должен быть единственным каналом поиска. Английский нужно качать ежедневно как долгосрочный рычаг.

## 5. Портфолио

Цель портфолио: не "идеальный pet-продукт", а рабочий инструмент для найма.

Дополнительный существующий актив: уже есть портфолио/CV на Next.js с кнопкой выгрузки в PDF. Это лучше, чем Canva, потому что проще поддерживать текст и структуру прямо в коде, контролировать верстку, делать PDF-экспорт и связывать документ с живым сайтом.

Стек:

- Next.js.
- TypeScript.
- Tailwind CSS.
- Payload CMS.
- Postgres.
- Vercel.
- Managed Postgres.
- Собственный домен.

Репозитории:

- Portfolio site: публичный сайт, приватный репозиторий.
- LMS: публичный GitHub после чистки.
- Landing Version System demo: можно сделать публичным позже, если код будет аккуратным.
- Корпоративный NLS: только sanitized case study, без корпоративного кода.

Языки:

- English.
- Ukrainian.
- Russian не делать в первой версии.

## 6. CMS/i18n архитектура

Через CMS:

- projects;
- commercial landing cases;
- technologies/skills;
- experience items;
- SEO/meta;
- media/images;
- локализованные поля для English/Ukrainian.

В коде:

- layout;
- navigation;
- route labels;
- footer labels;
- базовые UI/fallback тексты.

Routes:

- `/en`
- `/uk`

## 6.1 PDF/CV на базе Next.js

Существующее Next.js PDF-портфолио стоит сохранить и превратить в отдельный короткий CV-артефакт.

Рекомендация:

- PDF должен оставаться на 1 странице.
- В PDF давать только краткую выжимку: позиционирование, ключевые навыки, 2-3 главных достижения, 3-4 selected projects/cases, контакты.
- Основная ссылка в PDF должна вести на живой portfolio website, где уже можно раскрыть детали.
- Не подтягивать PDF напрямую из полного Payload-контента без жестких лимитов, иначе текст разрастется и документ перестанет помещаться на одну страницу.
- Можно использовать Payload как источник данных для сайта, но для PDF лучше иметь отдельную curated CV-модель или статический curated слой.

Практичная модель:

- Live portfolio: подробный контент из Payload.
- PDF/CV: отдельный короткий curated content в коде или отдельный `CV` global/collection с жесткими лимитами.
- Для PDF-полей задать ограничения: короткий summary, максимум 4 skill groups, максимум 3-4 projects, ограничение символов для каждого bullet.

Место в структуре сайта:

- `/en/resume` и `/uk/resume` - HTML preview.
- Кнопка `Download PDF`.
- В header/footer сайта ссылка на PDF.
- В PDF ссылка на live portfolio и selected GitHub/demo links.

## 7. Проекты в портфолио

### 7.1 Commercial Landing Pages

Главный коммерческий кейс.

Содержание:

- 300+ production landing pages;
- responsive layouts;
- production support;
- content/CMS updates;
- performance improvements;
- cross-browser fixes;
- forms/marketing pages;
- 6-10 лучших публичных ссылок вместо списка из 100+.

Важно: честно описывать роль, не присваивая себе дизайн, бренд или всю командную работу.

### 7.2 Portfolio CMS

Само портфолио как showcase.

Показывает:

- Next.js;
- Payload;
- Postgres;
- i18n;
- CMS modeling;
- admin flow;
- deployment;
- SDD workflow.

### 7.3 LMS Platform

Pet-проект с кодом.

Минимальные действия:

- проверить локальный запуск;
- заменить сломанные image-service ключи на простое решение;
- почистить секреты и тестовые данные;
- добавить `.env.example`;
- обновить README;
- добавить screenshots;
- описать архитектуру;
- добавить блок "What I would improve now".

### 7.4 Landing Version System

Безопасная мини-демо/санитизированный кейс по мотивам корпоративного NLS.

Не использовать корпоративный код, данные, имена, API, внутреннюю архитектуру.

MVP идеи:

- Landing;
- LandingVersion;
- Sections;
- draft/published/archived;
- preview page;
- publish flow;
- Payload admin.

Делать после MVP портфолио.

## 8. NLS и корпоративный опыт

Корпоративный код не показывать.

Формат: case study.

Структура:

- problem;
- role;
- stack;
- responsibilities;
- decisions;
- challenges;
- result;
- NDA-safe screenshots или схемы, если можно.

## 9. Визуальное направление

Цель первого впечатления:

> надежный middle frontend для production-задач.

Стиль:

> Clean technical portfolio with premium editorial feel.

Дизайн должен быть аккуратным, быстрым и профессиональным, но не "creative show-off".

Допустимы:

- хорошая типографика;
- спокойная сетка;
- subtle animations;
- hover states;
- project filters;
- плавные раскрытия case details.

Не делать:

- тяжелые эффекты ради эффекта;
- перегруженную анимацию;
- визуальное шоу, которое мешает читать опыт.

Google Stitch можно использовать для visual direction, design system, layout ideas и DESIGN.md, но финальный код писать нормально в Next.js/Tailwind/Payload.

## 10. SDD

Использовать GitHub Spec Kit.

Процесс:

1. constitution;
2. specify;
3. clarify;
4. checklist;
5. plan;
6. tasks;
7. analyze;
8. implement.

Правило: одна основная спецификация для `portfolio-mvp`. Отдельные specs только для крупных следующих фич.

В портфолио можно описать:

> Used GitHub Spec Kit to drive development through specification, clarification, planning, task breakdown, and AI-assisted implementation review.

## 11. Roadmap на 30/60/90 дней

### Первые 7 дней

- Купить домен.
- Создать private repo для portfolio.
- Инициализировать проект через Spec Kit.
- Написать constitution/spec для portfolio MVP.
- Составить структуру портфолио и тексты черновика.
- Проанализировать существующее Next.js PDF-портфолио и решить: переносим как отдельный `/resume` модуль или временно оставляем отдельным проектом.
- Собрать 20-30 ссылок на коммерческие лендинги, выбрать 6-10 лучших.
- Начать CV draft.
- Начать ежедневный английский 30-40 минут.

### Дни 8-14

- Поднять Next.js + Payload + Postgres.
- Сделать базовую i18n структуру `/en` и `/uk`.
- Создать Payload collections.
- Сделать layout и первые страницы.
- Сформировать кейс Commercial Landing Pages.
- Обновить LinkedIn/Djinni/DOU черновики.

### Дни 15-21

- Завершить MVP портфолио.
- Задеплоить на Vercel.
- Подключить домен.
- Подключить one-page PDF/CV flow или дать временную ссылку на существующий PDF.
- Начать LMS cleanup.
- Сделать screenshots и README для LMS.
- Отправить первые отклики, не дожидаясь идеального портфолио.

### Дни 22-30

- Полировать портфолио по обратной связи.
- Продолжить отклики.
- Готовиться к интервью по JS/TS/React/Next.
- Доделать публичный LMS repo.
- Начать sanitized outline для Landing Version System.

### 31-60 дней

- Активный поиск.
- 5-10 качественных откликов в неделю.
- Mock interviews.
- Улучшить английский до рабочего минимума для self-intro, project explanation, interview basics.
- Начать Landing Version System demo, если портфолио и CV уже готовы.

### 61-90 дней

- Продолжать поиск и корректировать стратегию по фидбеку.
- Развивать backend-базу: Nest.js, auth, DTO, validation, Postgres, testing.
- Рассмотреть VPS/Docker/deployment как отдельный учебный этап, если базовая воронка поиска уже работает.

## 12. Ежедневный режим

Доступно: 2-3 часа в день до/после работы.

Рекомендуемая структура:

- 30-40 минут английский каждый день.
- 60-90 минут portfolio/CV/job search.
- 30-60 минут техническая подготовка или cleanup проектов.

Важное правило: поиск работы идет параллельно с портфолио, а не после идеального завершения.

## 13. Что не делать сейчас

- Не уходить из IT как основной сценарий.
- Не делать Nest.js главным фокусом прямо сейчас.
- Не отказываться от fullstack-развития; просто не делать его главным pitch в первых откликах.
- Не арендовать VPS для первой версии портфолио.
- Не открывать portfolio repo публично.
- Не показывать корпоративный код.
- Не делать Russian-версию.
- Не показывать 100 ссылок на лендинги.
- Не делать весь сайт редактируемым через CMS.
- Не генерировать one-page PDF из полного длинного CMS-контента без жестких лимитов.
- Не ждать 2 месяца до первых откликов.
- Не называть себя fullstack без коммерческого backend-опыта.

## 15. Fullstack развитие

Стратегия не в том, чтобы "оставаться просто frontend". Стратегия в том, чтобы развивать fullstack-навыки, но не продавать себя как полноценного fullstack раньше, чем это подтверждено проектами и опытом.

Fullstack JS/TS развивать обязательно, но как второй слой:

- Next.js как основной frontend/fullstack framework;
- Payload как CMS/backend layer;
- Postgres как база;
- Nest.js для понимания backend architecture;
- auth, validation, DTO, modules, services, controllers, database access, testing;
- Docker/VPS/deployment позже, после запуска портфолио и начала поиска.

Почему Nest.js полезен даже frontend-разработчику:

- учит разделять слои приложения;
- помогает лучше проектировать frontend architecture;
- дает понимание API contracts;
- улучшает работу с LLM при backend-задачах;
- позволяет делать небольшие private/freelance проекты самостоятельно;
- снижает зависимость от backend-разработчика в малых проектах.

Как это использовать в позиционировании:

Сейчас:

> Middle Frontend / Next.js Developer with backend integration experience.

Через 3-6 месяцев:

> Frontend-focused Fullstack JS/TS Developer with Next.js, Payload, Postgres, and Nest.js fundamentals.

Критерий перехода к fullstack pitch:

- есть минимум 1-2 завершенных backend/fullstack demo проекта;
- есть auth/database/API/deploy;
- есть README и архитектурное описание;
- можешь объяснить решения без LLM;
- можешь пройти базовое backend interview по HTTP, auth, DB, validation, errors, security basics.

## 14. Критерии успеха

Через 30 дней:

- Есть публичное портфолио на домене.
- Есть CV.
- Есть обновленные профили Djinni/DOU/LinkedIn.
- Есть 1-2 оформленных кейса.
- Есть первые отклики.

Через 60 дней:

- Есть регулярная воронка поиска.
- Есть публичный LMS repo или сильный case study.
- Есть обратная связь с рынка.
- Есть улучшенный self-presentation на английском.

Через 90 дней:

- Есть офферы или понятная картина рынка.
- Есть усиленный Next.js/frontend профиль.
- Есть направление дальнейшего развития в Fullstack JS/TS без потери фокуса.
