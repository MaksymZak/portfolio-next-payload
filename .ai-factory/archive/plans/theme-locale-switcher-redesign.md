---
archived: 2026-07-04
---

# Implementation Plan: Theme/Locale Switcher Redesign + Locale-Switch Performance Fix

Branch: main (no dedicated branch — working directly on main per user choice)
Created: 2026-07-04

## Settings

- Testing: no. Verification is `bun run lint`, `bun run build`, and manual browser QA only (no automated test suite in this project — see AGENTS.md).
- Logging: verbose. DEBUG-level logs guarded by `process.env.NODE_ENV === 'development'` on every new behavior path, mirroring the existing dev-guard pattern in `src/lib/home-scroll.ts`.
- Docs: yes. Mandatory documentation checkpoint at completion, routed through `/aif-docs`.

## Context

Two independent problems, one plan:

1. **Theme switcher redesign.** Reference: `.cursor/docs/control-panel.tsx` (AI Studio mockup) — the user pasted this as the desired visual/interaction direction. The sidebar-variant theme switcher currently renders 4 themes in a `grid-cols-2` with truncated full labels (`EDITORIAL LIGHT`, `GRAPHITE DARK`, …). Redesign to a `grid-cols-4` layout with short 2-letter codes (`LT`/`DK`/`WM`/`CT`) and a shadcn `Tooltip` revealing the full theme name on hover, since short codes alone lose meaning. Drawer variant already shows full labels and stays unchanged. **Do not** copy the reference file's raw Tailwind class strings — this project centralizes all brutalist hover/active motion in `src/lib/brutalist-motion.ts` (`brutalistSwitcherClasses`); only the layout/label/tooltip structure is adopted from the reference.
2. **Locale switch performance fix.** `src/components/layout/locale-switcher.tsx` calls `router.replace(pathname, { locale })` from next-intl's `useRouter` (confirmed via Context7: it's a thin wrapper over Next.js's router sharing the same `NavigateOptions`). Next's default `scroll: true` snaps to the top of the page on every locale switch, and there's no pending-state feedback during the RSC round-trip, so switching feels laggy and resets scroll position — exactly the reported symptoms ("зависает", "начинается сначала после скролла").

The locale switcher itself does not need a visual redesign (already short labels, already uses `brutalistSwitcherClasses`) — only the behavioral fix below.

## Tasks

### Phase 1: Primitive

- [x] Task 1: Add shadcn Tooltip primitive.
  - Files: `src/components/ui/tooltip.tsx` (new).
  - Deliverable: run the shadcn CLI (`bunx shadcn@latest add tooltip` — confirm package manager from `package.json`, likely `bun`) to generate `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`. **Dependency convention:** this project already uses the unified `radix-ui` meta-package (`package.json` → `"radix-ui": "^1.5.0"`), not individual `@radix-ui/react-*` packages — confirmed by `src/components/ui/drawer.tsx` (`import { Dialog as DrawerPrimitive } from 'radix-ui'`). After generating the file, adapt the import to `import { Tooltip as TooltipPrimitive } from 'radix-ui'` (same pattern as `drawer.tsx`) and remove any `@radix-ui/react-tooltip` entry the CLI added to `package.json`/`bun.lock` — do not end up with two overlapping Radix packages. Match existing shadcn component conventions in this repo (`cn` from `@/lib/cn`, forwarded refs/props) as seen in `badge.tsx`.
  - Expected behavior: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'` resolves with no type errors; `package.json` gains no new `@radix-ui/react-*` entry.
  - Logging: none applicable (build-time install task); verify via `bun run lint`.

### Phase 2: Locale-switch performance (independent of Phase 1)

- [x] Task 2: Fix locale-switch scroll jump and perceived lag.
  - Files: `src/components/layout/locale-switcher.tsx`.
  - Deliverable:
    1. Pass `{ locale: nextLocale, scroll: false }` to `router.replace` so scroll position is preserved across the locale switch.
    2. Wrap the navigation call in `startTransition` (React `useTransition`); expose `isPending` and use it to set `aria-busy` on the switcher group plus a disabled/dimmed state on the buttons while a switch is in flight (guard against duplicate clicks). Style the pending state with existing utilities only (e.g. `opacity-60 pointer-events-none` via `cn`) — do not introduce new motion primitives outside `@/lib/brutalist-motion`.
    3. Prefetch the inactive locale's route via `router.prefetch(pathname, { locale: otherLocale })` (next-intl's router shares the `push`/`replace` signature) — but trigger it **lazily**, on the first `onPointerEnter`/`onFocus` of the inactive locale button (guard with a ref/state flag so it only fires once), NOT unconditionally in a mount effect. An eager mount-time prefetch would add an always-on network/cache-warm request on every page view regardless of user intent, competing with critical initial-load resources and working against this task's own performance goal.
    4. Add DEBUG-level logs guarded by `process.env.NODE_ENV === 'development'` (mirror the dev-guard pattern in `src/lib/home-scroll.ts`'s `scrollToSectionTarget`): log on switch triggered (`from -> to`), on prefetch fired (hover/focus warm-up), and when the transition settles (`isPending` back to false). Use `console.debug('[LocaleSwitcher] ...')`.
  - Expected behavior: switching locale mid-scroll keeps the scroll position; the clicked button shows a brief pending/disabled state; hovering/focusing the inactive locale button warms its cache; dev console shows the new debug logs. Scoped to the client component only — no changes to `src/i18n/routing.ts` / `src/i18n/navigation.ts`.

### Phase 3: Theme switcher redesign

- [x] Task 3: Redesign sidebar theme switcher (compact grid + tooltip).
  - Files: `src/components/layout/theme-switcher.tsx`.
  - Deliverable:
    1. Add a `shortLabel` field to the `THEMES` array: `{ light: 'LT', dark: 'DK', warm: 'WM', contrast: 'CT' }`.
    2. When `variant === 'sidebar'`: change the grid from `grid-cols-2` to `grid-cols-4` and render `item.shortLabel` as the visible button text instead of the full translated name `t(item.id)`.
    3. Leave `variant === 'drawer'` behavior unchanged (2-col grid, full translated label, no tooltip — label is already self-explanatory there).
    4. For the `sidebar` variant only, wrap each button in the newly-added shadcn Tooltip (`Tooltip` > `TooltipTrigger asChild` > `TooltipContent side="top"`), with `TooltipContent` showing the full translated theme name `t(item.id)` (existing `themes.*` message keys in `messages/{en,uk}.json` — no new keys needed). Wrap the sidebar theme grid in a single `TooltipProvider` (delay ~200ms, matching the reference mockup).
    5. This component is also used un-varianted (defaults to `sidebar`) by `src/components/case/index-nav.tsx` — verify the 4-col compact layout reads correctly at that narrower (~32%) width too.
    6. Continue using `brutalistSwitcherClasses` for all button styling — no ad-hoc classes copied from `.cursor/docs/control-panel.tsx`.
  - Expected behavior: sidebar and case-index-nav theme switchers show 4 compact tiles with working hover tooltips; drawer variant is visually unchanged.
  - Logging: dev-guarded `console.debug('[ThemeSwitcher] theme changed', { from, to })`.
  - Depends on: Task 1 (Tooltip primitive).

### Phase 4: Verification

- [x] Task 4: Verify redesign and locale-switch fix end-to-end.
  - Files: none (execution only).
  - Deliverable: run `bun run lint` and `bun run build`, fixing any errors. Then in `bun run dev`, manually check:
    - Sidebar (desktop, xl breakpoint) on `/en` and `/uk`: theme switcher shows 4 compact tiles (LT/DK/WM/CT) with hover tooltips showing the full theme name in the active locale; locale switcher unaffected visually.
    - Drawer menu (mobile width): theme switcher unchanged (2-col, full labels, no tooltip).
    - `/en/case/[slug]` index nav: compact theme grid reads correctly at the narrower width.
    - Locale switch: scroll down, click the locale switcher — scroll position preserved (no jump to top), brief pending/disabled state on click, DEBUG logs present in dev console.
    - Keyboard nav: focus rings, `aria-pressed`, `aria-busy` still correct.
  - Expected behavior: no visual or behavioral regressions; both original complaints (theme label truncation, locale-switch scroll jump/lag) are resolved.
  - Depends on: Tasks 1, 2, 3.

## Commit Plan

Single commit at the end (4 tasks, under the 5-task threshold):

```
feat(layout): redesign theme switcher and fix locale-switch scroll/perf
```

## Documentation Checkpoint

Per `Docs: yes` — before considering this plan complete, run `/aif-docs` to confirm no docs reference the old 2-col full-label sidebar theme layout, and that the switcher components are still accurately described wherever they're documented (if at all).
