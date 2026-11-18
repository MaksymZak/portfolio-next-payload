# Implementation Plan: Visitor Log

Branch: feature/visitor-log
Created: 2026-11-18

## Settings

- Testing: no. Verification is `bun run lint`, `bun run build`, and a short manual browser check. Do not add an automated test suite.
- Logging: minimal. Log only failures with `console.error('[visits] …')`. No per-visit INFO or DEBUG logs, no new logger, no `LOG_LEVEL` switch.
- Docs: yes. `/aif-implement` must include a mandatory documentation checkpoint. Update the architecture and description files named in Task 6.

## Decisions

- The public site stays static. Do not record visits inside a server component or middleware. A client beacon fires after load.
- The browser sends one `POST /api/visits`. The route writes through the Payload Local API (`getPayloadClient().create` / `update` / `delete`). It must not `fetch` the Payload REST API.
- `src/app/(payload)/api/[...slug]/route.ts` already owns `/api/*`, and specific routes such as `src/app/api/revalidate/route.ts` already sit beside it. Add `src/app/api/visits/route.ts` the same way. Next matches the static path before the catch-all.
- The `visits` collection is closed on REST: public `create`, `read`, and `update` are denied. The Local API call passes `overrideAccess: true` and writes only allowlisted fields. Never spread the request body into `create`.
- One document per visitor per 30-minute session (keyed by anonymous `vid` cookie + owner flag, window on `updatedAt`). Extra page views append to `paths` instead of inserting another row. Refresh of the same path does not duplicate the last entry. Cap `paths` at 30.
- Do not store raw IP. Country comes only from `x-vercel-ip-country` or `cf-ipcountry`.
- Ignore bots (user-agent) and prefetch (`next-router-prefetch`, `purpose: prefetch`, `sec-purpose: prefetch`) with `204` and no write.
- Owner recognition is a separate cookie, `mz_owner`, not the Payload session cookie (that session expires in about two hours). Value is HMAC-SHA256 of the literal `owner`, keyed by `PAYLOAD_SECRET`, compared with a timing-safe equal. Flags: `HttpOnly`, `SameSite=Lax`, `Path=/`, `Max-Age` 90 days. `Secure` only when `NODE_ENV === 'production'` so the cookie still sets on local `http://localhost`.
- Set `mz_owner` only after a successful admin session. A null-rendering admin client component, mounted from `admin.components.providers`, POSTs to a Payload endpoint when `useAuth()` has a user. Opening the login form must not set the cookie. Each authenticated admin load refreshes the 90 days. Do not use `afterLogin` alone.
- Owner sessions are stored with `owner: true` and hidden in the admin list via `admin.baseFilter`. Forged or missing cookies stay `owner: false`.
- A personal link is `?ref=` matching `^[A-Za-z0-9_-]{1,64}$`. First non-empty `ref` on the session is kept. This is the only way a visit is tied to a specific person.
- On a new session insert, delete `visits` whose `createdAt` is older than 90 days. A purge failure must not fail the beacon.
- Do not add a cache tag, revalidation hook, or repository for visits. Writes must not call `revalidateTag` or `revalidatePath`.
- First write-side module goes in `src/server/services/` (architecture evolution path). Repositories stay read-only.

## Commit Plan

- **Commit 1** (after tasks 1–3): `feat: add private visit log and owner cookie`
- **Commit 2** (after tasks 4–6): `feat: record public page visits from a client beacon`

## Tasks

### Phase 1: Schema and owner cookie

- [x] Task 1: Add the `visits` collection
  - Create `src/config/collections/Visits/Visits.ts` and register it in `src/config/collections/index.ts`.
  - Slug `visits`. No localization. No revalidation hooks.
  - Fields: `visitorId` (text, required), `owner` (checkbox, default false), `locale` (select `en` | `uk`), `country` (text), `referrer` (text), `ref` (text), `paths` (array of text).
  - Access: `create` false, `update` false, `read` and `delete` only when `req.user` is set.
  - Admin: `useAsTitle: 'visitorId'`, default columns `createdAt`, `country`, `locale`, `referrer`, `ref`, `owner`. `baseFilter` returns `{ owner: { not_equals: true } }`. Description states that owner sessions are stored and hidden from this list.
  - Run `bun run generate:types`. Do not hand-edit `src/payload-types.ts`.
  - Create the Postgres migration with `bun run payload migrate:create` and leave it registered in `src/migrations/index.ts`, same as `src/migrations/20260704_131235_archive_orderable.ts`. Dev schema push is not a substitute: this repo commits migrations. Do not hand-write the SQL unless the generator cannot run.
  - Logging: `console.error('[visits] …')` only if type or migration generation fails. No runtime logs in the collection config.
  - Depends on: none.

- [x] Task 2: Issue the owner cookie from an authenticated admin session
  - Add `src/server/services/owner-cookie.ts`: `signOwnerCookie()` and `ownerCookieMatches(value: string | undefined)`. HMAC-SHA256, key `PAYLOAD_SECRET`, message `owner`, timing-safe compare. Missing secret or a bad value returns false and does not throw.
  - Add Payload endpoint `src/config/endpoints/claim-owner.ts`, path `/claim-owner`, method `post`. Register it in `src/payload.config.ts` next to `revalidateSiteCacheEndpoint`. If `req.user` is missing, throw `APIError` 401. Otherwise return `200` with `Set-Cookie` for `mz_owner` (90 days, `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` only in production).
  - Add `src/components/admin/ClaimOwnerCookie.tsx` (`'use client'`). Use `useAuth` from `@payloadcms/ui`. When `user` is set, POST `/api/claim-owner` with `credentials: 'include'` once per mount. Render `null`. No toast. Ignore a failed response.
  - Register it on `admin.components.providers` in `src/payload.config.ts` using the existing `#Export` path style. Run `bun run generate:importmap` and keep the committed result at `src/app/(payload)/admin/importMap.js`.
  - Do not set the cookie from `beforeLogin` or from a public page.
  - Logging: `console.error('[visits] …')` in the endpoint only when signing throws. Do not log the cookie value or the user email. The client component stays silent.
  - Depends on: none (can run beside task 1).

### Phase 2: Ingest

- [x] Task 3: Session upsert service
  - Add `src/server/services/record-visit.ts` with `recordVisit` used by the route.
  - Input the route may pass: `path`, `locale`, `referrer`, `ref`, plus the request's `vid` cookie, owner cookie, user-agent, and country headers. Reject anything else.
  - Validate: `path` starts with `/`, max 200, no scheme; `locale` is `en` or `uk`; `referrer` max 500; `ref` matches the pattern above or is dropped; country is two letters or empty.
  - If the user-agent looks like a bot, or the call is a prefetch, return `{ ignored: true }` and do not touch the database.
  - Mint a `vid` (uuid) when the cookie is missing. Look up one `visits` row with the same `visitorId`, same `owner`, and `updatedAt` within 30 minutes (`overrideAccess: true`, `limit: 1`, sort `-updatedAt`). Update `paths` (append, dedupe last, cap 30) or create the row. First-touch wins for `referrer` and `ref`.
  - On insert, delete rows with `createdAt` older than 90 days. Swallow purge errors after `console.error`.
  - Use `getPayloadClient()` from `@/db/client`. Do not call `getPayload()` and do not import this service from `lib/` or from a client component.
  - Logging: `console.error('[visits] …')` with the failing operation name on Payload errors. No log on ignored bots, invalid optional `ref`, or success.
  - Depends on: task 1.

- [x] Task 4: Public `POST /api/visits` route
  - Create `src/app/api/visits/route.ts`. Node runtime (do not set `edge`).
  - Read the prefetch headers first and return `204` before parsing the body when the request is a prefetch.
  - Parse JSON. On a malformed body return `400`. Call `recordVisit`. Return `204` for a recorded or ignored visit.
  - When `vid` was minted, add `Set-Cookie` (`HttpOnly`, `SameSite=Lax`, `Path=/`, one year, `Secure` only in production).
  - Do not change `src/middleware.ts` or `src/app/robots.ts`. `/api` is already excluded from locale middleware and disallowed in robots.
  - Logging: `console.error('[visits] …')` when `recordVisit` throws; respond `500`. Do not log the body.
  - Depends on: tasks 1 and 3.

- [x] Task 5: Client beacon on public pages
  - Add `src/components/layout/visit-beacon.tsx` (`'use client'`). Mount it once in `src/app/(frontend)/[locale]/layout.tsx` and pass `locale`.
  - On mount, `fetch('/api/visits', { method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body })` with `path` (`location.pathname` + `location.search` stripped of unrelated noise, or pathname only plus `ref` sent separately), `locale`, `document.referrer`, and `ref` from the query string. Do not await in a way that blocks render. No retry loop.
  - Do not mount it on `/admin` or `/api`. The locale layout is the only host, so static generation stays intact.
  - Manual check after `bun run lint` and `bun run build`: open `/en`, confirm one `POST /api/visits` and a `204`; navigate to `/en/archive` inside 30 minutes and confirm the same document gained a path; forge `mz_owner` in devtools, reload, and confirm `owner` stays false; log into `/admin`, reload `/en`, and confirm the new session is stored with `owner: true` and is absent from the visits list.
  - Logging: none in the client. A failed fetch is ignored.
  - Depends on: task 4. Task 2 must be done before the owner half of the manual check.

### Phase 3: Documentation

- [x] Task 6: Document the write path
  - Update `.ai-factory/ARCHITECTURE.md`: route map entry for `POST /api/visits` and `POST /api/claim-owner`; note that `server/services/` now owns this write path and that `visits` is not a cached repository.
  - Update `.ai-factory/DESCRIPTION.md` core features with one short bullet: private visit log, owner cookie after admin login, no raw IP.
  - Do not add a new markdown guide.
  - Logging: none.
  - Depends on: tasks 1–5.

<!-- Commit checkpoint: tasks 1–3, then tasks 4–6 -->
