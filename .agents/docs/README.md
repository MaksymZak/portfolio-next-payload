# Portfolio Context / Start Here

Дата: 2026-06-02

## Что уже зафиксировано

- Выбранное визуальное направление: `Clean Editorial Technical`.
- Source of truth для визуала: `DESIGN.md`, `developer_handoff_technical_specs.md` и экспортированные изображения в `design-image/`.
- Основное позиционирование: `Middle Frontend / Next.js Developer`.
- Основной фокус: production landing systems и CMS-driven websites.
- Второй слой позиционирования: backend integration и growing fullstack skills.
- Целевая аудитория: recruiters, hiring managers, frontend/team leads.
- Рынок: remote only, Украина и Европа, без российского рынка.
- Языки MVP: `EN` и `UK`, без `RU`.
- Роуты MVP: `/en`, `/uk`, `/en/resume`, `/uk/resume`.
- Resume/PDF: короткий one-page CV, не автогенерация из всего CMS-контента.
- Theme selector: 4 curated schemes в хедере.

## Что не менять

- Не возвращаться к новому визуальному исследованию, пока не появится реальный пробел в требованиях.
- Не продавать себя как полноценный fullstack в первом питче.
- Не делать публичный portfolio repo.
- Не делать Russian-версию в MVP.
- Не растягивать PDF-resume до длинного документа.

## Порядок чтения

1. [developer_handoff_technical_specs.md](./developer_handoff_technical_specs.md) - точные токены, layout notes, component specs.
2. [DESIGN.md](../DESIGN.md) - визуальная система и style DNA.
3. [career-plan.md](./career-plan.md) - карьерная стратегия и roadmap.
4. [session-summary.md](./session-summary.md) - фоновый контекст о пользователе и ограничениях.
5. [stitch-portfolio-brief.md](./stitch-portfolio-brief.md) - исходный визуальный brief.
6. [stitch-prompt-workflow.md](./stitch-prompt-workflow.md) - промпты и последовательность работы со Stitch.
7. `design-image/` - экспортированные изображения из Stitch.

## Что делать завтра первым

1. Подключить Spec Kit к проекту.
2. Создать constitution.
3. Описать первую спецификацию `portfolio-mvp`.
4. Уточнить открытые вопросы по реализации.
5. Составить implementation plan.

## Контекст задачи

Портфолио должно работать как hiring tool для remote Middle Frontend / Next.js роли. Это не creative showpiece и не generic CV page. Главная цель - быстро показать:

- коммерческий frontend-опыт;
- production landing pages;
- CMS-driven websites;
- honest scope;
- fast recruiter scan;
- one-page resume flow;
- clean implementation in Next.js + Tailwind + Payload + Postgres.

