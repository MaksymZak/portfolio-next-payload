# Session Summary for Next Conversation

Дата: 2026-05-31

> Точка входа на завтра: [README.md](./README.md).

## Кто пользователь

Пользователь живет в Украине, город Сумы. Из-за ситуации не может сейчас переехать и рассматривает только remote-работу. Российский рынок исключен категорически из-за войны.

Возраст: 37 лет. Есть семья. Свободного времени и энергии на долгие ежедневные обучения мало, но пользователь готов выделять 2-3 часа в день до/после основной работы.

Финансовая подушка:

- 3 месяца можно жить без боли;
- до 6 месяцев максимально, но после 3 месяцев придется тратить критические финансы.

Минимальный доход:

- 800 USD - нижняя граница, ниже которой почти нельзя соглашаться;
- 1000+ USD - нормальная временная цель.

## Текущий профессиональный контекст

Пользователь около 4 лет во frontend, считает себя middle. Сейчас работает в студии, где делает и поддерживает landing pages. На работе идут сокращения из-за недостатка финансов; пользователя и команду пока оставили и присоединили к другой команде, но есть ощущение временности до новой волны сокращений.

Пользователь давно не искал работу, больше года. CV, LinkedIn/GitHub/портфолио нужно приводить в порядок.

Основной опыт:

- React/Next.js страницы и компоненты;
- TypeScript в реальном проекте;
- API, auth, forms, validation;
- state management: Redux/Zustand/React Query/etc;
- SSR/SSG/App Router/Next.js routing;
- performance optimization;
- адаптивная верстка сложных макетов;
- code review / архитектурные решения;
- около 300+ коммерческих landing pages.

Слабые/неподтвержденные зоны:

- тесты;
- deploy/CI/CD/production ownership;
- сильный backend;
- английский.

Английский: A1-A2. Документацию читать сложно, говорить почти не может. Готов заниматься 30-40 минут каждый день, но раньше много раз начинал и бросал.

## Текущие интересы и направления

Пользователь начал изучать Next.js и интересуется Nest.js, чтобы понимать архитектуру backend-приложений. Не обязательно хочет писать backend профессионально, но хочет понимать, что делает LLM, уметь указывать на ошибки и управлять backend-разработкой.

Пользователь хочет развиваться в сторону современного AI-assisted development: проектировать, писать спецификации, управлять LLM, проверять сгенерированный код.

Пользователь считает, что нужно становиться fullstack-разработчиком, а не оставаться только frontend с одним фреймворком. Мотивация: Nest.js помогает понять архитектуру, улучшает frontend-структуру, дает независимость для небольших private/freelance заказов.

Пользователь интересуется Spec-Driven Development и хочет использовать GitHub Spec Kit:

https://github.github.com/spec-kit/

## Принятая карьерная стратегия

Основной путь: не уходить из IT и не менять профессию резко сейчас.

Позиционирование:

> Middle Frontend Developer with React, Next.js, TypeScript, CMS-driven websites, landing systems, performance optimization, and production support experience.

Fullstack/Nest.js - не основной pitch для поиска работы в ближайшие 1-2 месяца, а направление развития.

Работу искать как:

- Middle Frontend Developer;
- Frontend Developer with Next.js;
- Frontend developer with backend integration experience and growing fullstack skills.

Не позиционироваться как полноценный Fullstack Developer, потому что коммерческого backend-опыта мало.

Уточнение: это не отказ от fullstack. Рекомендация - развивать fullstack как второй слой, но не делать его главным pitch до появления 1-2 законченных backend/fullstack проектов, которые можно показать и объяснить.

## Портфолио

Пользователь хочет сделать новое портфолио через SDD, чтобы одновременно:

- подготовиться к поиску работы;
- показать Next.js/Payload/Postgres/i18n;
- потренировать Spec Driven Development;
- показать AI-assisted engineering workflow.

Также у пользователя уже есть существующее портфолио/CV на Next.js с кнопкой выгрузки в PDF. Пользователю проще править такой документ в коде, чем собирать CV в Canva.

План портфолио:

- публичный сайт;
- приватный репозиторий;
- Next.js + TypeScript + Tailwind + Payload + Postgres;
- Vercel + managed Postgres;
- собственный домен;
- языки: English и Ukrainian;
- Russian не делать в первой версии.

Рекомендация по существующему PDF-портфолио:

- сохранить как отдельный one-page CV/resume артефакт;
- не генерировать PDF автоматически из всего Payload-контента без лимитов;
- live portfolio может быть подробным, а PDF должен быть коротким на 1 страницу;
- можно сделать `/en/resume` и `/uk/resume` с кнопкой `Download PDF`;
- PDF должен содержать краткое позиционирование, ключевые skills, 2-3 достижения, 3-4 selected cases/projects и ссылку на живой сайт.

CMS/i18n:

- CMS управляет projects, commercial cases, technologies, experience, SEO/media;
- layout/navigation/base UI texts остаются в коде;
- routes `/en` и `/uk`.

Дизайн:

> Clean technical portfolio with premium editorial feel.

Первое впечатление:

> надежный middle frontend для production-задач.

Пользователь хочет немного дизайна, интерактива и анимаций со вкусом, но согласился, что главный сигнал - надежность production frontend, а не creative show-off.

Можно использовать Google Stitch для visual direction/design system, но не завязывать на него весь проект.

## Проекты для портфолио

1. Commercial Landing Pages
   - главный коммерческий кейс;
   - пользователь делал/поддерживал 300+ landing pages;
   - есть доступ минимум к 100 публичным ссылкам;
   - показывать 6-10 лучших, а не 100;
   - описывать роль честно: frontend implementation, support, optimization, responsive, CMS/content updates, fixes.

2. Portfolio CMS
   - само портфолио как showcase;
   - Next.js, Payload, Postgres, i18n, admin, deployment, SDD.

3. LMS Platform
   - старый pet-проект пользователя;
   - код есть и можно показать;
   - в целом рабочий, но могли отвалиться ключи image service;
   - нужно минимально реанимировать, почистить, добавить README/screenshots/.env.example;
   - не переписывать полностью.

4. Landing Version System
   - безопасная mini-demo/case по мотивам корпоративного NLS;
   - корпоративный код не показывать;
   - если показывать код, писать новую demo-реализацию с нуля;
   - сущности: Landing, LandingVersion, Sections, draft/published/archived, preview, publish flow.

Корпоративный NLS:

- написан на Payload + Next.js;
- использовать только как sanitized case study;
- без корпоративного кода, приватных данных, внутренних API, названий и архитектуры.

## SDD / Spec Kit

Рекомендовано использовать GitHub Spec Kit.

Процесс:

- constitution;
- specify;
- clarify;
- checklist;
- plan;
- tasks;
- analyze;
- implement.

Для MVP достаточно одной основной спецификации `portfolio-mvp`. Не ставить много extensions и не превращать процесс в бюрократию.

Формулировка для портфолио:

> Used GitHub Spec Kit to drive development through specification, clarification, planning, task breakdown, and AI-assisted implementation review.

## Roadmap

Первые 30 дней:

- домен;
- private repo;
- Spec Kit init;
- portfolio MVP spec;
- тексты и структура;
- 6-10 selected landing links;
- CV draft;
- Next.js + Payload + Postgres setup;
- i18n `/en` и `/uk`;
- basic CMS collections;
- deploy on Vercel;
- первые отклики, не ждать идеального портфолио.

60 дней:

- активная воронка поиска;
- LMS cleanup/public repo;
- улучшение self-presentation;
- английский ежедневно;
- фидбек рынка.

90 дней:

- офферы или ясная картина рынка;
- усиленный Next.js/frontend профиль;
- backend/Nest.js развитие как следующий слой.

## Важные ограничения

Не делать сейчас:

- полный переход в другую профессию;
- Nest.js как главный фокус;
- VPS для первого релиза;
- публичный portfolio repo;
- Russian-версию;
- 100 ссылок в портфолио;
- весь сайт через CMS;
- one-page PDF из полного CMS-контента без жестких лимитов;
- ожидание 2 месяцев до первых откликов;
- позиционирование как полноценный fullstack без коммерческого backend-опыта.

## Что пользователь попросил дальше

Пользователь согласился с планом и попросил:

1. Сделать MD-файл с планом действий.
2. Сделать summary всей переписки, чтобы в другой сессии сразу было понятно зачем, как и почему.
3. Дать мнение о развитии разработки с LLM, причинах увольнений и будущем рынка.
