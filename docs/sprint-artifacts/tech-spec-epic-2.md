# Epic Technical Specification: Epic 2: User Authentication & Access

Date: 2025-11-27
Author: Gopal
Epic ID: 2
Status: Draft

---

## Overview

Epic 2 delivers the user authentication and access capabilities promised in `docs/prd.md` for FR1–FR6. It builds on the NextAuth v5 foundation, tenant middleware, and Prisma schema completed in Epic 1 to provide secure registration, login, password reset, RBAC enforcement, and administrator-led user management. The work ensures every tenant in a multi-tenant deployment can onboard users, maintain sessions, and keep permissions tight without custom code.

This specification translates the narrative in `docs/epics.md` (Stories 2.1–2.5) into concrete implementation details: new UI surfaces, API routes, database tables, and background processes. It respects the architecture constraints in `docs/architecture.md` (Next.js 16, PostgreSQL 16 + RLS, Prisma 7 + `@prisma/adapter-pg`, Trust Navy UX patterns) and positions future epics (job management, AI, compliance) to rely on hardened auth services rather than reinventing them.

## Objectives and Scope

### In Scope
- Email/password registration with RFC 5322 validation, password complexity, tenant-aware onboarding, and automatic login on success (Story 2.1, FR1, FR6).
- Login/session experience backed by NextAuth credentials provider, “remember me” handling, toast-driven UX, and rate limiting with lockouts (Story 2.2, FR2, FR6).
- Password reset request + execution flow with secure tokens, Resend emails, and automatic session bootstrap (Story 2.3, FR3).
- Role-based access control stack: permission matrix, middleware/hook enforcement, UI gating, audit logging touchpoints (Story 2.4, FR4, FR5, FR6).
- User account admin UI + APIs for system admins to list, create, edit, deactivate, and reactivate users per tenant (Story 2.5, FR4–FR6).

### Out of Scope
- SSO (SAML/OAuth) and MFA providers (planned follow-up to FR1, FR2 after MVP).
- Invite-based onboarding or tenant self-service creation (handled in later multi-tenant administration epics).
- Comprehensive audit log persistence (Epic 9) beyond the hooks defined here.
- AI-driven anomaly detection for authentication events (future security work).

## System Architecture Alignment
- **NextAuth + Prisma Adapter:** Reuses `src/lib/auth/config.ts`, extending it with registration, password reset, and RBAC context injection exactly as described under “Authentication & Authorization” in `docs/architecture.md`.
- **Tenant Isolation:** Leverages `src/middleware.ts`, `src/lib/tenant/context.ts`, and Prisma tenant middleware so every auth/API call is filtered by `tenant_id`, satisfying FR6 and the RLS model in `prisma/schema.prisma`.
- **Security Stack:** Follows the security architecture (TLS 1.3, bcrypt hashing, structured audit logging) and enforces the RBAC + least-privilege requirements from the PRD.
- **UX Consistency:** Registration, login, and admin UI use shadcn/ui + Trust Navy palette defined in `src/app/globals.css`, keeping parity with the UX specification and Epic 1 component guidelines.

## Detailed Design

### Services and Modules

| Module/Service | Responsibility | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| **Auth Provider (`src/lib/auth/config.ts`)** | Extend Credentials provider to support registration + login with tenant context, remember-me, and enriched JWT payloads. | Email/password, tenant slug, remember-me flag. | Authenticated session, JWT with `tenantId`, `role`. | Dev Agent |
| **Registration API (`src/app/api/auth/register/route.ts`)** | Create users with validation, bcrypt hashing, default role, audit log emission, auto sign-in. | Registration payload (email, password, name, tenant hint). | 201 response + session cookie or validation errors. | Dev Agent |
| **Password Reset Service (`src/app/api/auth/password-reset/*`)** | Issue, store, verify, and consume reset tokens; send email via Resend template. | Email for request; token + password for reset. | Success/failure responses, audit entries, login session. | Dev Agent |
| **RBAC Library (`src/lib/auth/permissions.ts`, `src/hooks/usePermissions.ts`)** | Define permission matrix, helper guards, and UI hook to hide/disable components. | Role/permission constants, session context. | `hasPermission`, `requireRole` helpers, React hook data. | Dev Agent |
| **Admin User API (`src/app/api/users/*`)** | Tenant-scoped CRUD for users, enforcing RBAC + rate limiting, emitting audit events. | System-admin session, filters, payloads. | Paginated user lists, create/edit/deactivate responses. | Dev Agent |
| **Admin UI (`src/app/(admin)/users/page.tsx` + modals)** | Render searchable table, create/edit/deactivate flows with shadcn forms + toast feedback. | React Query data, form inputs. | User management UX adhering to Story 2.5 acceptance criteria. | Dev Agent |
| **Rate Limiting Utilities (`src/lib/rate-limit.ts`, Redis)** | Provide shared limiter for registration, login, reset flows (e.g., 5 attempts/hr). | IP/user identifiers. | Allow/deny decisions, retry-after metadata. | Dev Agent |
| **Email Templates (`src/lib/email/templates/*`)** | React Email templates for welcome + password reset with trust copy. | Template props (name, links). | HTML emails via Resend (FR3). | Dev Agent |

### Data Models and Contracts

1. **Existing Tables (Prisma 7.0.1):**
   - `User` already includes `id`, `tenantId`, `email`, `name`, `role`, `passwordHash`. Extend with:
     ```prisma
     enum UserStatus {
       ACTIVE
       INACTIVE
       LOCKED
     }

     model User {
       // existing fields...
       status        UserStatus @default(ACTIVE)
       lastLoginAt   DateTime?  @map("last_login_at")
       failedLogins  Int        @default(0) @map("failed_logins")
       lockedUntil   DateTime?  @map("locked_until")
       deactivatedAt DateTime?  @map("deactivated_at")
     }
     ```
     These fields support lockout policy, admin deactivation, and Story 2.5 reporting.

2. **Password Reset Tokens:**
   ```prisma
   model PasswordResetToken {
     id         String   @id @default(uuid())
     tenantId   String   @map("tenant_id")
     userId     String   @map("user_id")
     token      String   @unique
     expiresAt  DateTime @map("expires_at")
     usedAt     DateTime? @map("used_at")
     createdAt  DateTime @default(now()) @map("created_at")

     user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
     tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)

     @@index([tenantId, userId])
     @@map("password_reset_tokens")
   }
   ```
   Tokens inherit tenant context to preserve isolation and auditing.

3. **Permissions Reference:**
   ```prisma
   model Permission {
     id        String   @id @default(uuid())
     code      String   @unique
     label     String
     createdAt DateTime @default(now()) @map("created_at")
   }

   model RolePermission {
     role       String
     permission String

     @@id([role, permission])
     @@map("role_permissions")
   }
   ```
   While Story 2.4 can function with enum-based roles, keeping a `role_permissions` table allows dynamic policy updates without redeploying.

4. **Audit Log Touchpoints:** Authentication APIs must emit structured events (`auth.login.success`, `auth.login.failure`, `auth.registration`, `auth.password-reset`) to the existing `logTenantAccess` utility. Persistent storage lands in Epic 9 but the event payloads are defined now to avoid refactors.

### APIs and Interfaces

| Endpoint | Method | Purpose | Request Shape | Response Shape |
| --- | --- | --- | --- | --- |
| `/api/auth/register` | POST | Story 2.1 registration. Validates payload, hashes password, auto sign-in. | `{ email, password, confirmPassword, fullName, tenantSlug?, agreeToTerms }` | `201 { data: { user, sessionExpiresAt } }` or `{ error: { code, message } }` |
| `/api/auth/login` | POST (NextAuth) | Story 2.2 login with remember-me. Rate limited at 5 failures/hr/IP. | `{ email, password, rememberMe }` | NextAuth JSON + session cookie; lockout returns 423 error payload. |
| `/api/auth/forgot-password` | POST | Story 2.3 token issuance. | `{ email }` | `202 { message: generic }` even if user unknown. |
| `/api/auth/reset-password` | POST | Story 2.3 token consume. | `{ token, newPassword, confirmPassword }` | `200 { message, autoLogin: true }`. |
| `/api/users` | GET | Story 2.5 listing with pagination/filter. | `?page&limit&role&status&search`. | `{ data: User[], meta: { page, totalPages, total } }`. |
| `/api/users` | POST | Create user (admin). | `{ email, name, role, status?, sendWelcome }`. | `201 { data: User }`. |
| `/api/users/:id` | PUT | Edit user details/role. | `{ name?, role?, status? }`. | `200 { data: User }`. |
| `/api/users/:id/status` | PATCH | Activate/deactivate/lock override. | `{ status }`. | `200 { data: User }`. |

All endpoints must:
- Require tenant context via middleware (except `/api/auth/forgot-password` which only needs tenant slug/email and still rate-limits by IP).
- Use `zod` schemas for validation with friendly error payloads matching the PRD copywriting.
- Emit audit events referencing tenant, user, IP, action, outcome.

### Workflows and Sequencing

1. **Registration Flow (Story 2.1):**
   1. User submits registration form in `app/(auth)/register/page.tsx`.
   2. Frontend validates email/password rules (RFC 5322, 8+ chars, 1 uppercase/number/special).
   3. API verifies tenant slug, ensures email uniqueness per tenant, hashes password (bcrypt 12 rounds), inserts user with default role (`RECRUITER`) and `status=ACTIVE`.
   4. Issue welcome toast + server-triggered `signIn` call to NextAuth; redirect to dashboard; log `auth.registration`.

2. **Login & Session Management (Story 2.2):**
   1. Login form (existing `app/(auth)/login/page.tsx`) upgraded with remember-me checkbox, forgot password link, lockout messaging, toasts.
   2. Credentials provider enforces rate limiting (`lib/rate-limit.ts` + Redis). On success, resets `failedLogins`, updates `lastLoginAt`.
   3. Session cookie lifetime: 8h default, 30 days when remember-me true (set `session.maxAge` override + `sessionToken` expiration).
   4. Middleware ensures tenant context on every protected request; `useTenant` hook exposes tenant info to UI.

3. **Password Reset (Story 2.3):**
   1. Forgot Password page collects email, sends `/api/auth/forgot-password`.
   2. API looks up user by email/tenant, generates 32-byte token, stores row in `password_reset_tokens` with expiry = now+1h, rate limit 3/hr/email/IP, triggers Resend template.
   3. Reset page verifies token, enforces password policy, updates `User.passwordHash`, marks token used, resets `failedLogins`, signs user in automatically.

4. **RBAC Enforcement (Story 2.4):**
   1. Define `PermissionCode` enum + `ROLE_PERMISSIONS` map (e.g., recruiter: `['jobs:create', 'candidates:view:self', ...]`).
   2. `requirePermission` wrapper for API routes ensures unauthorized calls return 403 with friendly message and audit log.
   3. `usePermissions` hook filters navigation + components; unauthorized UI is hidden rather than disabled.
   4. Middleware attaches `role` to tenant context; Prisma middleware can enforce row-level checks in addition to RLS.

5. **User Account Management (Story 2.5):**
   1. `/admin/users` route gated by `SYSTEM_ADMIN` permission.
   2. Page fetches paginated data via React Query; table shows Name, Email, Role, Status, Last Login, Actions.
   3. “Create User” modal posts to `/api/users`, optionally sends welcome email with temporary password link.
   4. Edit/deactivate actions open confirm modals, trigger API calls, display toasts, log actions.

## Non-Functional Requirements

### Performance
- Auth APIs must return within 500 ms (95th percentile) as per PRD; rate limiter + Redis must add <10 ms overhead.
- Registration/login UIs use optimistic loading states and skeletons; initial load ≤1s FCP on broadband (aligns with UX performance goals).

### Security
- Bcrypt hashing with 12 rounds minimum; enforce password policies client + server side.
- Rate limiting: register (5/hr/IP), login (5 failures/hr/IP → lockout 15 min), forgot password (3/hr/email). Use `ioredis` to persist counters.
- All auth-related audit logs use structured JSON, tagging tenant/user/IP/time.
- Tokens (reset, email verification) are 32-byte random hex, stored hashed (optional) and expire in 1 hour.
- Cookies flagged `httpOnly`, `sameSite='lax'`, `secure` in production, aligning with architecture doc.

### Reliability/Availability
- Login + password reset endpoints include retries for DB writes (Prisma interactive transactions) and Resend API (3 retries with exponential backoff).
- Reset tokens and rate-limit counters are idempotent to survive retries.
- Admin actions use optimistic UI but confirm persistence before closing modals.

### Observability
- Emit structured logs for auth flows with `tenant_id`, `user_id`, `action`, `result`, `latency`.
- Add metrics hooks (future OpenTelemetry) but at minimum expose counters through `lib/metrics` stub for login success/failure, reset attempts, admin actions.
- Include breadcrumb events in frontend (e.g., Sentry) for login/reg failures.

## Dependencies and Integrations
- **Runtime Packages (`moar-ats/package.json`):** `next@16.0.4`, `react@19.2.0`, `next-auth@5.0.0-beta.30`, `@auth/prisma-adapter`, `@prisma/client@7.0.1`, `pg@8.16.3`, `bcryptjs@3.0.3`, `ioredis@5.4.1`, `zod@4.1.13`, `react-hook-form@7.66.1`, `sonner@2.0.7`.
- **Dev/Test:** `jest@30.2.0`, `@testing-library/react@16.3.0`, `@playwright/test@1.57.0`, `ts-jest@29.4.5` for unit/integration/e2e coverage.
- **External Services:** Resend (reset + welcome emails), Redis (Upstash/local) for rate limiting + login attempt tracking, PostgreSQL 16.x with RLS (existing), future SSO providers (placeholders only).
- **Scripts:** `scripts/verify-auth-setup.ts` extended to check new environment variables: `RESEND_API_KEY`, `RESET_TOKEN_SECRET`.

## Acceptance Criteria (Authoritative)

1. Registration form enforces email/password/confirm validations client + server side and automatically logs user in on success with welcome toast referencing their tenant.
2. Login form supports remember-me, displays lockout message after 5 failed attempts per hour per IP, and resets counters after successful login.
3. Password reset request always responds with a generic success message, generates one-time tokens expiring in 1 hour, and sends Resend email containing secure link.
4. Password reset completion requires matching passwords, invalidates token on use, logs success, and signs user in.
5. RBAC middleware prevents unauthorized API calls with 403 JSON + friendly message, and UI hides features the user lacks permission for.
6. Permission matrix covers recruiter, hiring manager, TA leader, compliance partner, and system admin exactly as listed in Story 2.4.
7. Admin `/users` page lists users with search, role filter, status filter, pagination, and shows last login timestamp.
8. Admins can create, edit, deactivate, and reactivate users with confirmation prompts, audit logs, and toast notifications.
9. All auth flows (register/login/reset/admin actions) emit structured audit events tagged with tenant/user/action/outcome, ready for Epic 9 ingestion.
10. Rate limiting is enforced on registration, login, and password reset endpoints with user-facing error copy that matches PRD tone (“Too many attempts… try again in 15 minutes”).

## Traceability Mapping

| AC | Spec Sections | Components/APIs | Test Idea |
| --- | --- | --- | --- |
| 1 | Overview, Services (Registration API), Workflows #1 | `/api/auth/register`, `app/(auth)/register/page.tsx` | Unit: zod schema; Integration: submit valid/invalid payloads; E2E: Playwright registration happy path. |
| 2 | Services (Auth Provider), Workflows #2, NFR Security | NextAuth credentials provider, `login/page.tsx`, `lib/rate-limit.ts` | Integration test for lockout counters; Playwright login with remember-me toggles session expiry. |
| 3 | Services (Password Reset), Workflows #3 | `/api/auth/forgot-password`, Resend template | Unit test ensures tokens stored + emails triggered; Integration ensures rate limit enforced. |
| 4 | Data Models, Workflows #3 | `/api/auth/reset-password` | Integration test verifying token invalidation + auto login; Jest test for password policy errors. |
| 5 | RBAC Library, Middleware | `src/lib/auth/permissions.ts`, API handlers, middleware | Jest tests ensuring unauthorized calls return 403; UI snapshot ensuring components hidden. |
| 6 | Data Models (Permission tables), Workflows #4 | `ROLE_PERMISSIONS`, `usePermissions` | Unit tests for `hasPermission`; contract test verifying permission coverage vs spec. |
| 7 | Admin UI Services | `/admin/users`, React components | Playwright test for filters/pagination; component tests for table rendering. |
| 8 | Admin API/UI | `/api/users`, modals | Integration tests for create/edit/deactivate; ensures audit events. |
| 9 | Observability, Services | `logTenantAccess` extensions | Unit tests verifying audit payload structure; manual verification via dev console. |
| 10 | NFR Security, Rate Limiter | auth endpoints + Redis | Integration tests hitting threshold, expect 429/423; ensure message text matches spec. |

## Risks, Assumptions, Open Questions

- **Risk:** Resend outages would block password reset emails; mitigation: display success toast but log WARN + allow admin manual resets (fallback CLI).
- **Risk:** Single `role` column may be too rigid for complex permissions; mitigation: seed `role_permissions` table now even if RBAC logic still uses enums.
- **Assumption:** All tenants initially onboard through MOAR Advisory so default tenant slug `moar-advisory` remains valid until multi-tenant admin ship.
- **Assumption:** Redis instance is available locally (docker compose) and in deployed environments for rate limiting and lockout tracking.
- **Question:** Do we need admin-configurable password policies per tenant in Phase 1? (Current plan hard-codes PRD policy; confirm with PM before implementing tenant overrides.)

## Test Strategy Summary

- **Unit Tests:** Cover zod validators, RBAC helpers, rate limiter decisions, password policy utilities, Prisma service functions (Jest + ts-jest).
- **Integration Tests:** API route tests via Next.js test utilities ensuring database writes, tenant isolation, and audit logging happen as specified.
- **E2E Tests:** Playwright flows for registration, login lockout, password reset, and admin user management (including accessibility assertions from UX spec).
- **Security Testing:** Run `npm run test` plus targeted penetration scripts (brute-force attempts) to validate rate limiting and lockout messaging.
- **Manual Regression:** Follow `docs/testing/auth-regression.md` plus new steps for RBAC/UI gating before promoting stories to “review”.

