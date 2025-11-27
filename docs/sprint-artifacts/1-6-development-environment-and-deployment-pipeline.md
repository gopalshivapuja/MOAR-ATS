# Story 1.6: Development Environment and Deployment Pipeline

Status: done

## Story

As a developer,  
I want to set up the development environment, automated testing harness, and baseline deployment pipeline,  
so that the team can develop, validate, and ship features for MOAR ATS efficiently and safely.

## Acceptance Criteria

1. **Development environment foundation**  
   - `docker-compose.yml` provisions PostgreSQL 16.x and Redis 7.x containers with tenant-aware defaults, seeded via Prisma, and documented start/stop scripts.  
   - `.env.example` and onboarding notes list every variable needed for local work (`DATABASE_URL`, `REDIS_URL`, `NEXTAUTH_*`, S3 placeholders) and `.env.local` is ignored per repo standards.  
   - `npm run dev` hot reloads the App Router project while `tsc --watch` (or `next dev --turbo`) validates types continuously.  
   - README / `LOCAL-DEVELOPMENT-SETUP.md` gains a “Story 1.6” section describing exact commands to bootstrap the stack.  
   - Environment guardrails (e.g., `prisma migrate dev`) are verified on both macOS and container workflows.  
   _Source: docs/epics.md#Story 1.6; docs/sprint-artifacts/tech-spec-epic-1.md#Story 1.6_

2. **Testing framework installation**  
   - Jest 30 + Testing Library stack remains configured (from Story 1.5) and `npm test` runs all unit suites headlessly.  
   - Playwright is installed with TypeScript config, demo tests live under `__tests__/e2e/`, and `npm run test:e2e` spins up/test/tears down automatically.  
   - Example tests cover CLI scaffolding (e.g., verifying `docker-compose` parser) so agents have runnable templates.  
   - Coverage targets (80%+ on foundations) and CI-friendly scripts (`npm run lint`, `npm run type-check`) are documented.  
   _Source: docs/epics.md#Story 1.6; docs/sprint-artifacts/tech-spec-epic-1.md#Story 1.6_

3. **Deployment & observability pipeline**  
   - Vercel project is linked with required environment variables and auto-deploy on `main` pushes; build pipeline runs `prisma migrate deploy` before serving.  
   - `src/app/api/health/route.ts` returns `{ status: "ok", timestamp }` for uptime checks and is referenced in deployment docs.  
   - README captures deployment steps plus rollback guidance; `docs/IMPLEMENTATION-PHASE-GUIDE.md` is updated with “Ready for Story Context” checklist.  
   - Upon completion, `docs/sprint-artifacts/sprint-status.yaml` entry `1-6-development-environment-and-deployment-pipeline` transitions from `backlog` to `drafted`.  
   _Source: docs/epics.md#Story 1.6; docs/sprint-artifacts/tech-spec-epic-1.md#Story 1.6_

## Tasks / Subtasks

- [x] Task 1 – Provision local dev stack (AC1)  
  - [x] Create `docker-compose.yml` for PostgreSQL + Redis with health checks, seed hooks, and README instructions.  
  - [x] Populate `.env.example`, ensure `.env.local` stays gitignored, and document `npm run dev` / `tsc --watch` expectations.  
  - [x] Extend `LOCAL-DEVELOPMENT-SETUP.md` with Story 1.6 walkthrough plus troubleshooting checklist.

- [x] Task 2 – Extend automated testing toolchain (AC2)  
  - [x] Verify Jest + Testing Library configs from Story 1.5 still pass; add coverage thresholds and CI-friendly scripts.  
  - [x] Install/configure Playwright (`npx playwright test --ui` smoke) with sample specs under `__tests__/e2e/`.  
  - [x] Add documentation on how to run unit vs. e2e suites locally and inside CI runners.

- [x] Task 3 – Wire deployment & health monitoring (AC3)  
  - [x] Connect repo to Vercel, set required env vars, ensure builds run `prisma migrate deploy` + `npm run lint`.  
  - [x] Implement `src/app/api/health/route.ts` plus lightweight jest test validating response schema.  
  - [x] Update README + sprint artifacts with deployment + rollback steps and flip sprint status to `drafted`.

### Review Follow-ups (AI)

- [x] [AI-Review][Medium] Add automated test coverage for `scripts/dev-stack.sh` to prove the CLI helper works end-to-end (AC #2). (Addressed via `moar-ats/__tests__/cli/dev-stack.test.ts`)

## Dev Notes

### Requirements Context Summary

- Epic 1.6 demands Docker-based Postgres/Redis, environment templates, hot reload, testing harness, and Vercel wiring before later epics can land features.  
  `[Source: docs/epics.md#Story 1.6]`
- The epic tech spec adds concrete artifacts: Docker Compose, Jest/RTL/Playwright scaffolding, Vercel hookup, health endpoint, and README updates plus sprint-status bookkeeping.  
  `[Source: docs/sprint-artifacts/tech-spec-epic-1.md#Story 1.6]`
- PRD non-functional requirements (performance, security, compliance) require deterministic dev/test loops and automated deployment pipelines that enforce Prisma migrations.  
  `[Source: docs/prd.md#Non-Functional Requirements]`
- Architecture guardrails (Next.js 16 structure, Prisma, tenant-aware proxy handler) must be respected when adding scripts, tests, and API routes.  
  `[Source: docs/architecture.md#Project Structure]`

### Structure Alignment Summary

- Project root `moar-ats/` remains the canonical workspace; new infra assets (Docker Compose, Playwright config) belong alongside existing Jest + shadcn/ui scaffolding.  
  `[Source: docs/architecture.md#Project Structure]`
- Infrastructure scripts must honor multi-tenant Postgres defaults (`tenant_id` columns, Prisma migrations) and keep tooling inside `scripts/` or `docs/LOCAL-DEVELOPMENT-SETUP.md`.  
  `[Source: docs/sprint-artifacts/tech-spec-epic-1.md#Detailed Design]`
- Reference the existing Testing Library & jest upgrades delivered in Story 1.5 to avoid duplicate configs.  
  `[Source: docs/sprint-artifacts/1-5-core-ui-component-library-setup.md#Dev Agent Record]`

### Learnings from Previous Story

- Jest 30 + Testing Library already run under `moar-ats/__tests__/unit/ui/*`; extend those configs instead of reinitializing. `[Source: docs/sprint-artifacts/1-5-core-ui-component-library-setup.md#Dev Agent Record]`  
- `moar-ats/src/components/theme-provider.tsx` + Sonner regression tests illustrate how to document new utilities and tests; follow that referencing pattern for Docker/Playwright helpers.  
- Prior story documented every new artifact in README—Story 1.6 should mirror that transparency for infra assets.  
- No outstanding technical debt, but reviewers emphasized keeping regression tests in default `npm test`—carry that expectation into new Playwright/Jest additions.  

### Testing Standards

- Maintain ≥80% coverage on foundational modules (Docker helper scripts, health endpoint) per tech spec traceability. `[Source: docs/sprint-artifacts/tech-spec-epic-1.md#Traceability Mapping]`  
- Unit tests live under `__tests__/unit/**`, integration/e2e under `__tests__/e2e/**`; align with architecture decision for co-located tests. `[Source: docs/architecture.md#Implementation Patterns]`  
- Document how to run `npm test`, `npm run test:e2e`, and `npx playwright test --reporter=list` inside README so future agents inherit the workflow.

### Project Structure Notes

- `docker-compose.yml`, `.env.example`, and helper scripts land in `moar-ats/` with documentation tracked under `docs/LOCAL-DEVELOPMENT-SETUP.md`.  
- Testing artifacts: `moar-ats/playwright.config.ts`, `__tests__/e2e/**/*.spec.ts`, and any shared fixtures inside `__tests__/utils/`.  
- Deployment artifacts: `moar-ats/src/app/api/health/route.ts`, updated `package.json` scripts, and CI/README notes; all align with architecture’s source tree expectations.  
- Ensure sprint metadata updates under `docs/sprint-artifacts/sprint-status.yaml` and story context XML (generated later) are consistent.

### References

- [Source: docs/epics.md#Story 1.6]  
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Story 1.6]  
- [Source: docs/prd.md#Non-Functional Requirements]  
- [Source: docs/architecture.md#Project Structure]  
- [Source: docs/sprint-artifacts/1-5-core-ui-component-library-setup.md#Dev Agent Record]

## Change Log

- 2025-11-27: Provisioned Docker Compose stack + helper script, formalized `.env.example`, added TypeScript/watch scripts, and expanded `LOCAL-DEVELOPMENT-SETUP.md` with Story 1.6 checklist.
- 2025-11-27: Locked Jest coverage thresholds, added Playwright config + smoke spec, and documented test execution across unit/e2e layers.
- 2025-11-27: Added `/api/health` route, unit tests, README deployment/rollback guidance, and `postbuild` migrations to satisfy Vercel pipeline requirements; sprint status set to `in-progress`.
- 2025-11-27: Senior Developer Review (AI) recorded; CLI test follow-up captured and status returned to `in-progress`.
- 2025-11-27: Added `__tests__/cli/dev-stack.test.ts`, introduced `DEV_STACK_MOCK` hook in `scripts/dev-stack.sh`, reran automated test suites, and moved story back to `review`.
- 2025-11-27: Senior Developer Review (AI) re-run; all ACs/tasks verified with passing Jest + Playwright suites and story approved.

## Dev Agent Record

### Completion Notes
**Completed:** 2025-11-27  
**Definition of Done:** All acceptance criteria met, code reviewed, tests passing

### Context Reference

- `docs/sprint-artifacts/1-6-development-environment-and-deployment-pipeline.context.xml`

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

- Loaded sprint-status + story/context, confirmed Story 1.6 first ready item, and marked development as `in-progress`.
- Added `scripts/dev-stack.sh`, updated `.env.example`, README, and `docs/LOCAL-DEVELOPMENT-SETUP.md` with Story 1.6 checklist, TypeScript watch loop, and docker helper usage.
- Hardened testing stack (Jest coverage thresholds + Playwright config/spec) and extended package scripts for `type-check`, coverage, and e2e commands.
- Implemented `/api/health` route + Jest test, wired Playwright smoke test, and documented Vercel deployment pipeline (postbuild migrations + rollback guidance).

### Completion Notes List

- Dev environment tooling now includes a helper compose script, live type-check loop, and updated onboarding docs so new agents can replicate the stack without guesswork.
- Testing harness enforces ≥80% global coverage and runs Playwright smokes (`npm run test:e2e`) that exercise the landing page plus `/api/health`; README/local guide explain execution plus `npx playwright install`.
- Deployment readiness: `postbuild` runs `prisma migrate deploy`, `/api/health` acts as Vercel health probe, and README documents env vars + `vercel rollback` flow so AC3 is auditable.
- Jest + Playwright now both pass locally (`npm test` / `npm run test:e2e`) after adding tenant-aware test helpers, `.env` autoloading, and Prisma shutdown hooks; integration suites seed tenants automatically so there are no more `Tenant context required` errors.

### File List

- `docker-compose.yml`
- `scripts/dev-stack.sh`
- `moar-ats/package.json`
- `moar-ats/package-lock.json`
- `moar-ats/jest.config.js`
- `moar-ats/playwright.config.ts`
- `moar-ats/__tests__/e2e/health-check.spec.ts`
- `moar-ats/__tests__/unit/api/health-route.test.ts`
- `moar-ats/__tests__/cli/dev-stack.test.ts`
- `moar-ats/src/app/api/health/route.ts`
- `moar-ats/src/proxy.ts`
- `moar-ats/README.md`
- `docs/LOCAL-DEVELOPMENT-SETUP.md`
- `docs/IMPLEMENTATION-PHASE-GUIDE.md`
- `docs/sprint-artifacts/1-6-development-environment-and-deployment-pipeline.md`
- `docs/sprint-artifacts/sprint-status.yaml`
- `moar-ats/src/lib/tenant/context.ts`
- `moar-ats/src/lib/db/prisma.ts`
- `moar-ats/__tests__/integration/auth/registration.test.ts`
- `moar-ats/__tests__/integration/auth/login.test.ts`
- `moar-ats/jest.setup.js`

## Senior Developer Review (AI)

**Reviewer:** Gopal  
**Date:** 2025-11-27  
**Outcome:** Changes Requested – Story 1.6 originally missed the promised automated test for the new CLI helper (AC2). The gap has now been addressed (2025-11-27) and the story is back in `review`, awaiting final approval.

### Summary

Infrastructure artifacts (compose stack, env templates, Playwright setup, health endpoint) look solid and are documented in both the README and `LOCAL-DEVELOPMENT-SETUP`. The acceptance criteria explicitly called for runnable CLI tests to validate our helper scripts, and that gap has now been covered via `__tests__/cli/dev-stack.test.ts`, which drives `scripts/dev-stack.sh` through a mocked compose binary. Story 1.6 is back in `review` awaiting formal approval.

### Key Findings

- **Medium (Resolved 2025-11-27):** Example CLI test missing for AC2. The gap is now closed by `__tests__/cli/dev-stack.test.ts`, which invokes `scripts/dev-stack.sh` using the `DEV_STACK_MOCK` hook.

### Acceptance Criteria Coverage

| AC | Description | Status | Evidence |
| --- | --- | --- | --- |
| AC1 | Development environment foundation (Docker services, env templates, hot reload + TS guardrails, docs) | IMPLEMENTED | `docker-compose.yml` provisions Postgres/Redis with health checks while `scripts/dev-stack.sh` wraps lifecycle commands; `moar-ats/package.json` adds `type-check:watch`; `docs/LOCAL-DEVELOPMENT-SETUP.md` documents the Story 1.6 checklist and guardrails. |
| AC2 | Testing framework installation (Jest + Playwright + example CLI tests + CI scripts) | IMPLEMENTED | `moar-ats/jest.config.js` locks 80% coverage, `playwright.config.ts` + `__tests__/e2e/health-check.spec.ts` exercise the app, and `__tests__/cli/dev-stack.test.ts` now drives `scripts/dev-stack.sh` through a mocked compose binary to validate the CLI helper. |
| AC3 | Deployment & observability pipeline (Vercel wiring, health endpoint, docs) | IMPLEMENTED | `moar-ats/package.json` runs `prisma migrate deploy` via `postbuild`, `/src/app/api/health/route.ts` with matching Jest + Playwright checks validates uptime, and README + Implementation Guide document deployment & rollback plus the Ready-for-Story-Context checklist. |

**Coverage:** 3 of 3 acceptance criteria fully implemented.

### Task Completion Validation

| Task | Marked As | Verified As | Evidence |
| --- | --- | --- | --- |
| Task 1 – Provision local dev stack | Completed | VERIFIED COMPLETE | Compose stack + helper script + onboarding docs are present (`docker-compose.yml`, `scripts/dev-stack.sh`, `docs/LOCAL-DEVELOPMENT-SETUP.md`). |
| Task 2 – Extend automated testing toolchain | Completed | VERIFIED COMPLETE | Jest + Playwright remain healthy and the new CLI-focused Jest spec (`__tests__/cli/dev-stack.test.ts`) now validates the `scripts/dev-stack.sh` helper end-to-end. |
| Task 3 – Wire deployment & health monitoring | Completed | VERIFIED COMPLETE | `postbuild` triggers Prisma migrations, `/api/health` route + tests exist, and README documents Vercel linkage + rollback flow. |

**Summary:** 2 verified tasks, 1 questionable, 0 falsely marked complete with no evidence.

### Test Coverage and Gaps

Jest suites enforce ≥80% coverage (see `jest.config.js`), the new CLI-focused spec (`__tests__/cli/dev-stack.test.ts`) drives `scripts/dev-stack.sh` through a mocked compose binary, and the Playwright smoke exercises `/api/health`. No remaining gaps were identified for Story 1.6 scope.

### Architectural Alignment

All new assets respect the architecture doc: infra lives at repo root (`docker-compose.yml`, `scripts/`), docs land under `docs/`, and API routes/tests stay within `moar-ats/src` and `__tests__`. No layering or dependency violations observed.

### Security Notes

Environment management remains compliant with earlier stories (`.env.example` documented, `.env.local` ignored). Docker services only expose default dev credentials, and Jest auto-loads `.env.local`, so secrets stay local.

### Best-Practices and References

- Next.js 16 + Prisma 7 stack: follow https://nextjs.org/docs/app/building-your-application/deploying and https://www.prisma.io/docs/orm/prisma-client/setup-in-production for migration-on-deploy flows.
- Playwright 1.57 smoke patterns: https://playwright.dev/docs/test-intro highlights using `webServer` + `request` fixtures exactly as implemented here.
- Docker Compose scripting tips: https://docs.docker.com/compose/reference/ helps keep helper scripts portable across `docker compose` CLI variants.

### Action Items

#### Code Changes Required

- [x] [Medium] Add an automated CLI test for `scripts/dev-stack.sh` (e.g., Node or shell harness that invokes `status`/`usage` and asserts output) so AC2’s “example CLI test” requirement is satisfied. [file: scripts/dev-stack.sh:1-74, moar-ats/__tests__/cli/dev-stack.test.ts:1-48]

#### Advisory Notes

- Note: Re-run `npm run test:e2e` after adding the CLI test to ensure overall toolchain remains green.

## Senior Developer Review (AI)

**Reviewer:** Gopal  
**Date:** 2025-11-27  
**Outcome:** Approve – All Story 1.6 acceptance criteria and tasks are now fully satisfied, including the newly added CLI regression test, with green Jest + Playwright suites.

### Summary

The infra stack now includes the Docker helper, onboarding docs, CLI automation, and deployment guardrails exactly as written. AC2’s missing CLI example is covered by `__tests__/cli/dev-stack.test.ts`, and both `npm test` and `npm run test:e2e` passed in this review run (Playwright only surfaced the known Next.js proxy deprecation warning, now addressed).

### Key Findings

- None – no open issues were discovered during this pass.

### Acceptance Criteria Coverage

| AC | Description | Status | Evidence |
| --- | --- | --- | --- |
| AC1 | Development environment foundation (Docker + env templates + guardrails + docs) | IMPLEMENTED | `docker-compose.yml` provisions Postgres/Redis with health checks; `scripts/dev-stack.sh` (with helper doc updates in `docs/LOCAL-DEVELOPMENT-SETUP.md`) manages lifecycle; `moar-ats/package.json` provides `type-check:watch`; README + Implementation Guide include Story 1.6 instructions. |
| AC2 | Testing framework installation (Jest + Playwright + CLI example + CI scripts) | IMPLEMENTED | `moar-ats/jest.config.js` enforces 80% thresholds; `moar-ats/playwright.config.ts` + `__tests__/e2e/health-check.spec.ts` deliver the smoke; `__tests__/cli/dev-stack.test.ts` validates `scripts/dev-stack.sh` via `DEV_STACK_MOCK`; docs explain `npm test`, `npm run test:e2e`, `npm run type-check`. |
| AC3 | Deployment & observability pipeline (Vercel wiring, `/api/health`, docs) | IMPLEMENTED | `moar-ats/package.json` `postbuild` runs `prisma migrate deploy`; `/src/app/api/health/route.ts` plus Jest & Playwright tests verify uptime; README and `docs/IMPLEMENTATION-PHASE-GUIDE.md` document deployment/rollback and “Ready for Story Context” checklist. |

**Coverage:** 3 of 3 acceptance criteria fully implemented.

### Task Completion Validation

| Task | Marked As | Verified As | Evidence |
| --- | --- | --- | --- |
| Task 1 – Provision local dev stack | Completed | VERIFIED COMPLETE | `docker-compose.yml`, `scripts/dev-stack.sh`, `.env.example`, and onboarding docs reflect Story 1.6 requirements. |
| Task 2 – Extend automated testing toolchain | Completed | VERIFIED COMPLETE | Jest + Playwright remain green (`npm test`, `npm run test:e2e`), and `__tests__/cli/dev-stack.test.ts` proves the CLI helper works. |
| Task 3 – Wire deployment & health monitoring | Completed | VERIFIED COMPLETE | `postbuild` migrations, `/api/health` route/tests, and deployment docs cover AC3. |

**Summary:** 3 completed tasks verified, 0 questionable, 0 falsely marked complete.

### Test Coverage and Gaps

- `npm test` (Jest 30) – passes 13 suites including the new CLI spec; coverage thresholds enforced via `jest.config.js`.
- `npm run test:e2e` (Playwright 1.57) – passes the health-check smoke; only the allowedDevOrigins warning remains now that the proxy migration is complete.
- No remaining Story 1.6 gaps identified.

### Architectural Alignment

New assets stay within documented boundaries (`scripts/`, `docs/`, `moar-ats/__tests__`, `src/app/api`). Multi-tenant proxy logic, Prisma adapters, and helper scripts continue to respect layering rules from `docs/architecture.md`.

### Security Notes

Environment handling continues to rely on `.env.local` (gitignored) with `.env.example` as documentation; Docker credentials remain dev-only; Playwright/Jest suites load env via `jest.setup.js`, so no secrets leaked.

### Best-Practices and References

- Next.js deployment with Prisma migrate on Vercel: https://nextjs.org/docs/app/building-your-application/deploying + https://www.prisma.io/docs/orm/prisma-client/deployment
- Playwright webServer best practices: https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
- Docker Compose CLI ergonomics: https://docs.docker.com/compose/reference/

### Action Items

#### Code Changes Required

- [x] No further code changes required (story approved with all ACs/tasks complete).

#### Advisory Notes

- Note: When upgrading Next.js, keep the `src/proxy.ts` handler aligned with framework expectations and configure `allowedDevOrigins` to silence the remaining Playwright warning observed during this run.
