# Epic Technical Specification: Foundation & Infrastructure

Date: 2025-11-25
Author: Gopal
Epic ID: 1
Status: Complete

---

## Overview

Epic 1: Foundation & Infrastructure establishes the core technical foundation for the MOAR ATS platform. This epic sets up the essential infrastructure components that all subsequent epics depend on, including the Next.js project structure, PostgreSQL database with Prisma ORM, authentication system with NextAuth.js, multi-tenant middleware with row-level security, UI component library, and development/deployment tooling. 

The goal is to create a solid, scalable foundation that enables rapid development of user-facing features while maintaining enterprise-grade security, multi-tenant isolation, and compliance readiness. This epic implements the foundational architecture decisions documented in the architecture document, ensuring all subsequent development follows established patterns and constraints.

## Objectives and Scope

### In-Scope

- **Project Initialization:** Next.js 16.0.4 project setup with TypeScript, Tailwind CSS, ESLint, and source directory organization
- **Database Foundation:** PostgreSQL 16.x with Prisma 7.x ORM (backward compatible with 5.x stories), multi-tenant schema with `tenant_id` on all tables, row-level security policies
- **Authentication System:** NextAuth.js v5 (Auth.js) with email/password authentication, session management, password hashing, and protected routes
- **Multi-Tenant Infrastructure:** Tenant-aware middleware, Prisma middleware for automatic tenant filtering, PostgreSQL RLS policies, tenant context hooks
- **UI Component Library:** shadcn/ui setup with Trust Navy theme, core components (Button, Input, Card, Modal, Toast, Form), accessibility compliance
- **Development Tooling:** Local development environment (PostgreSQL, Redis), testing framework (Jest, React Testing Library, Playwright), deployment pipeline (Vercel)

### Out-of-Scope

- **User Registration/Login UI:** Detailed registration and login forms (covered in Epic 2)
- **Role-Based Access Control Implementation:** RBAC logic and permissions (covered in Epic 2)
- **AI Features:** Resume parsing, scoring, or AI learning systems (covered in Epic 5)
- **Job Management:** Job posting creation or management (covered in Epic 3)
- **Candidate Management:** Candidate profiles or pipeline views (covered in Epic 4)
- **External Integrations:** Email service, calendar APIs, or storage services (covered in Epic 11)
- **Compliance Features:** Audit logging, consent tracking, or evidence exports (covered in Epic 9)

## System Architecture Alignment

This epic directly implements the core architecture decisions documented in `docs/architecture.md`:

**Framework & Stack:**
- Next.js 16.0.4 with App Router (Section 2: Project Initialization)
- TypeScript 5.9.3 with strict mode (Section 2: Decision Summary)
- Tailwind CSS 4.1.17 (CSS-first configuration via `src/app/globals.css`) for styling (Section 2: Decision Summary)
- PostgreSQL 16.x with Prisma 7.x ORM (Section 2: Decision Summary, Section 3: Data Architecture)

**Project Structure:**
- Follows the directory structure defined in Section 3: Project Structure
- `src/app/` for Next.js App Router routes
- `src/components/` for React components
- `src/lib/` for utilities (auth, db, etc.)
- `prisma/` for database schema and migrations

**Multi-Tenancy:**
- Implements row-level security (RLS) pattern from Section 3: Data Architecture
- Tenant-aware middleware from Section 4: Security Architecture
- Prisma middleware for automatic tenant filtering (Section 3: Data Architecture)

**Authentication:**
- NextAuth.js v5 (Auth.js) as specified in Section 2: Decision Summary
- Password hashing with bcrypt (Section 4: Security Architecture)
- Session management with JWT tokens (Section 4: Security Architecture)

**UI Foundation:**
- shadcn/ui component library base (Section 3: Technology Stack Details)
- Trust Navy color theme from UX design specification
- WCAG 2.1 Level AA accessibility compliance (Section 4: Non-Functional Requirements)

**Constraints:**
- All database tables must include `tenant_id` column (Section 3: Data Architecture)
- All API routes must validate tenant context (Section 4: Security Architecture)
- All components must follow naming conventions (Section 4: Implementation Patterns)

### Version Update – 2025-11-27
- **Prisma 7.0.1 Upgrade:** Stories 1.1–1.4 now run on Prisma 7.0.1 to leverage `@prisma/adapter-pg` improvements, interactive transactions, and security patches released after 5.x. The schema, migrations, and generators remain compatible with the 5.x API specified in the original story briefs, but all new development must target 7.x going forward.
- **Tailwind CSS v4 Workflow:** The design system relies on Tailwind CSS 4.1.17’s CSS-first configuration (`@theme inline` in `src/app/globals.css`). There is no `tailwind.config.js`, so any new components should continue extending the global CSS theme or use CSS Variables—do not reintroduce the legacy config file.
- **Documentation Impact:** Any reference to “Prisma 5.x” or “tailwind.config.js” in earlier stories should be treated as historical context. Reviewers should expect 7.x + Tailwind v4 semantics in code reviews, playbooks, and onboarding guides.

## Detailed Design

### Services and Modules

| Module/Service | Responsibility | Inputs | Outputs | Owner |
|----------------|---------------|--------|---------|-------|
| **Project Setup Module** | Initialize Next.js project with TypeScript, Tailwind, ESLint | Project name, configuration options | Project structure, package.json, config files | Dev Agent |
| **Database Module** (`src/lib/db/`) | Database connection, Prisma client, tenant middleware | Database URL, tenant context | Prisma client instance, database queries | Dev Agent |
| **Prisma Schema** (`prisma/schema.prisma`) | Define database schema, relationships, RLS policies | Schema definitions | Database tables, migrations | Dev Agent |
| **Authentication Module** (`src/lib/auth/`) | NextAuth.js configuration, session management, password hashing | User credentials, session tokens | Authenticated sessions, user objects | Dev Agent |
| **Multi-Tenant Middleware** (`src/middleware.ts`, `src/lib/db/rls.ts`) | Extract tenant context, enforce tenant isolation, filter queries | HTTP requests, user session | Tenant context, filtered queries | Dev Agent |
| **UI Component Library** (`src/components/ui/`) | Reusable UI components with Trust Navy theme | Component props, theme config | Rendered components | Dev Agent |
| **Development Tools** | Local dev environment, testing framework, deployment pipeline | Code changes, test files | Running dev server, test results, deployed app | Dev Agent |

### Data Models and Contracts

**Core Database Schema (Prisma):**

```prisma
// Tenant model - root of multi-tenancy
model Tenant {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  settings  Json?    // Tenant-specific settings (integrations, workflows, AI policies)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  users         User[]
  jobPostings   JobPosting[]
  candidates    Candidate[]
  applications  Application[]
  
  @@map("tenants")
}

// User model - all users belong to a tenant
model User {
  id           String   @id @default(uuid())
  tenantId     String   @map("tenant_id")
  email        String
  name         String
  role         String   // recruiter, hiring_manager, ta_leader, compliance_partner, system_admin
  passwordHash String   @map("password_hash")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")
  
  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  @@unique([tenantId, email])
  @@index([tenantId])
  @@map("users")
}

// Job Posting model - jobs belong to tenants
model JobPosting {
  id          String   @id @default(uuid())
  tenantId    String   @map("tenant_id")
  title       String
  description String
  requirements Json    // Array of requirement strings stored as JSON
  status      String   // draft, published, archived
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  tenant       Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  applications Application[]
  
  @@index([tenantId])
  @@index([tenantId, status])
  @@map("job_postings")
}

// Candidate model - candidates belong to tenants
model Candidate {
  id         String   @id @default(uuid())
  tenantId   String   @map("tenant_id")
  email      String
  name       String
  resumeUrl  String?  @map("resume_url")
  linkedinId String?  @map("linkedin_id")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")
  
  tenant       Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  applications Application[]
  
  @@index([tenantId])
  @@index([tenantId, email])
  @@map("candidates")
}

// Application model - links candidates to jobs
model Application {
  id          String   @id @default(uuid())
  tenantId    String   @map("tenant_id")
  candidateId String   @map("candidate_id")
  jobId       String   @map("job_id")
  status      String   // applied, screening, interview, offer, hired
  aiScore     Float?   @map("ai_score")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  tenant   Tenant      @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  candidate Candidate  @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  job      JobPosting  @relation(fields: [jobId], references: [id], onDelete: Cascade)
  
  @@unique([tenantId, candidateId, jobId])
  @@index([tenantId])
  @@index([tenantId, status])
  @@map("applications")
}
```

**TypeScript Types:**

```typescript
// src/types/tenant.ts
export type Tenant = {
  id: string;
  name: string;
  slug: string;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
};

// src/types/user.ts
export type User = {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: 'recruiter' | 'hiring_manager' | 'ta_leader' | 'compliance_partner' | 'system_admin';
  createdAt: Date;
  updatedAt: Date;
};

// src/types/database.ts - Generated from Prisma
export type { Tenant, User, JobPosting, Candidate, Application } from '@prisma/client';
```

**Row-Level Security (PostgreSQL RLS Policies):**

All tables will have RLS enabled with policies that:
- Check `tenant_id` matches the authenticated user's `tenant_id`
- Allow system admins to bypass RLS (for tenant management)
- Prevent cross-tenant data access at the database level

### APIs and Interfaces

**NextAuth.js API Routes:**

```
POST /api/auth/[...nextauth]
  - Handles all authentication flows (login, logout, session)
  - Providers: email/password
  - Returns: Session object or redirect
```

**Health Check API:**

```
GET /api/health
  - Purpose: Deployment verification
  - Response: { status: "ok", timestamp: "2025-11-25T10:30:00Z" }
  - Status Codes: 200 (healthy), 503 (unhealthy)
```

**Prisma Client Interface:**

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';

// Prisma client with tenant middleware
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Tenant-aware query helper
export async function withTenant<T>(
  tenantId: string,
  query: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  // Automatically filters all queries by tenant_id
  // Implementation in Story 1.4
}
```

**Next.js Middleware Interface:**

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  // Extracts tenant_id from:
  // 1. Authenticated user's session
  // 2. Subdomain (future: tenant-slug.moar-ats.com)
  // 3. Request header (X-Tenant-ID)
  
  // Sets tenant context for all downstream requests
  // Validates tenant access
  // Returns 403 if unauthorized
}
```

**React Hooks Interface:**

```typescript
// src/hooks/useTenant.ts
export function useTenant(): {
  tenantId: string | null;
  isLoading: boolean;
  error: Error | null;
} {
  // Provides tenant context to React components
  // Reads from NextAuth session
  // Returns current tenant_id or null if unauthenticated
}
```

### Workflows and Sequencing

**Story Implementation Sequence:**

1. **Story 1.1: Project Setup** (Foundation)
   - Execute: `npx create-next-app@latest moar-ats --typescript --tailwind --app --eslint --src-dir`
   - Configure Tailwind with Trust Navy colors
   - Set up TypeScript strict mode
   - Create `.env.example` template
   - **Output:** Initialized Next.js project structure

2. **Story 1.2: Database Schema** (Data Foundation)
   - Install Prisma: `npm install prisma @prisma/client`
   - Initialize Prisma: `npx prisma init`
   - Define schema with multi-tenant models
   - Create initial migration: `npx prisma migrate dev --name init`
   - **Output:** Database schema, migrations, Prisma client

3. **Story 1.3: Authentication** (Security Foundation)
   - Install NextAuth: `npm install next-auth@beta @auth/prisma-adapter bcryptjs`
   - Configure NextAuth in `src/lib/auth/config.ts`
   - Create API route: `src/app/api/auth/[...nextauth]/route.ts`
   - Create login page: `src/app/(auth)/login/page.tsx`
   - **Output:** Working authentication system

4. **Story 1.4: Multi-Tenant Middleware** (Isolation Foundation)
   - Create `src/middleware.ts` for tenant extraction
   - Implement `src/lib/db/rls.ts` for Prisma RLS helpers
   - Configure Prisma client with tenant middleware
   - Set up PostgreSQL RLS policies via migrations
   - Create `src/hooks/useTenant.ts` React hook
   - **Output:** Tenant isolation enforced at all layers

5. **Story 1.5: UI Component Library** (UI Foundation)
   - Install shadcn/ui: `npx shadcn-ui@latest init`
   - Configure Trust Navy theme in `tailwind.config.js`
   - Install core components: `npx shadcn-ui@latest add button input card dialog toast form`
   - Configure typography (Roboto Slab, Roboto)
   - **Output:** Reusable UI component library

6. **Story 1.6: Development & Deployment** (Tooling Foundation)
   - Set up Docker Compose for local PostgreSQL/Redis
   - Configure testing frameworks (Jest, React Testing Library, Playwright)
   - Set up Vercel project and deployment pipeline
   - Create health check endpoint
   - **Output:** Complete development and deployment setup

**Data Flow for Multi-Tenant Request:**

```
1. User makes request → Next.js middleware extracts tenant_id from session
2. Middleware validates tenant access → Sets tenant context
3. API route receives request → Reads tenant context
4. Prisma query executed → Tenant middleware automatically filters by tenant_id
5. Database RLS policy validates → Ensures tenant_id matches at DB level
6. Response returned → Only tenant's data included
```

**Authentication Flow:**

```
1. User submits login form → POST /api/auth/signin
2. NextAuth validates credentials → Checks password hash
3. Session created → JWT token signed with NEXTAUTH_SECRET
4. Cookie set → httpOnly, secure in production
5. User redirected → To protected route or dashboard
6. Subsequent requests → Middleware validates session, extracts tenant_id
```

## Non-Functional Requirements

### Performance

**Target Metrics (from PRD Section 4.1):**
- Core workflows: <2 seconds for 95th percentile (project setup, database operations, authentication)
- API endpoints: <500ms for read operations, <1 second for write operations (95th percentile)
- Database queries: Optimized for multi-tenant isolation with `tenant_id` indexes
- Page load: <1 second first contentful paint for login/auth pages

**Implementation Requirements:**
- Database indexes on all `tenant_id` columns for fast filtering
- Prisma connection pooling for efficient database connections
- Next.js build optimizations (static generation where possible)
- Environment variable caching (avoid repeated reads)
- TypeScript compilation in watch mode for fast development feedback

**Performance Testing:**
- Measure database query performance with tenant filtering
- Test authentication flow latency (login, session validation)
- Verify middleware overhead is minimal (<50ms)
- Load test with multiple concurrent tenants

### Security

**Data Protection (from PRD Section 4.2, Architecture Section 4):**
- Password hashing: bcrypt with minimum 10 rounds (never store plain text)
- Encryption at rest: Database-level encryption (PostgreSQL native)
- Encryption in transit: TLS 1.3 for all connections
- Session security: JWT tokens signed with `NEXTAUTH_SECRET`, httpOnly cookies, secure flag in production
- CSRF protection: Enabled in NextAuth.js

**Authentication & Authorization (from Architecture Section 4):**
- Password policies: Minimum 8 characters, 1 uppercase, 1 number, 1 special character
- Session timeout: 8 hours inactivity (configurable)
- Rate limiting: 5 login attempts per hour per IP (prevents brute force)
- API authentication: Bearer tokens via NextAuth.js sessions

**Access Controls (from Architecture Section 4):**
- Row-level security: Enforced at database level (PostgreSQL RLS)
- Tenant isolation: Middleware validates tenant_id on every request
- Principle of least privilege: Users only access their tenant's data
- Audit logging: All tenant access attempts logged (foundation for Epic 9)

**Security Testing:**
- Test password hashing strength (bcrypt rounds)
- Verify RLS policies prevent cross-tenant access
- Test middleware blocks unauthorized tenant access
- Validate session timeout and cookie security settings
- Test rate limiting on login endpoints

### Reliability/Availability

**Availability Targets:**
- Development environment: Local PostgreSQL and Redis with Docker Compose
- MVP deployment: Vercel platform (99.9% uptime SLA)
- Database: Managed PostgreSQL with automated backups
- Health checks: `/api/health` endpoint for deployment verification

**Error Handling:**
- Database connection failures: Graceful degradation with retry logic
- Authentication failures: Clear error messages, no information leakage
- Tenant context missing: 403 Forbidden with clear error message
- Prisma query errors: Logged with tenant context, user-friendly error messages

**Recovery & Resilience:**
- Database migrations: Rollback support via Prisma migrations
- Environment variable validation: Fail fast on missing required variables
- Development environment: Docker Compose for consistent local setup
- Deployment pipeline: Automatic rollback on health check failure

**Degradation Behavior:**
- If database unavailable: Health check returns 503, app shows maintenance message
- If Redis unavailable (future): Background jobs queue in-memory (degraded mode)
- If authentication service down: All protected routes return 503

### Observability

**Logging (from Architecture Section 4):**
- Structured JSON logs with tenant tagging
- Log levels: ERROR, WARN, INFO, DEBUG
- Every log includes: `tenant_id`, `user_id`, `timestamp`, `action`
- Log destinations: Console (development), structured logs (production)

**Metrics:**
- Health check endpoint: `/api/health` for deployment verification
- Database connection metrics: Prisma query performance
- Authentication metrics: Login success/failure rates (foundation for Epic 12)

**Tracing:**
- OpenTelemetry setup (foundation for future distributed tracing)
- Request ID tracking for debugging multi-tenant issues
- Tenant context propagation through all layers

**Monitoring:**
- Vercel deployment monitoring (automatic)
- Database connection pool monitoring (Prisma)
- Error tracking: Structured error logs with tenant context

**Development Observability:**
- Prisma query logging in development mode
- Next.js build output with optimization hints
- TypeScript compilation errors with clear messages
- ESLint warnings/errors in development

## Dependencies and Integrations

### Core Dependencies

**Framework & Runtime:**
- `next@16.0.4` - Next.js framework with App Router
- `react@latest` - React library
- `react-dom@latest` - React DOM renderer
- `typescript@5.9.3` - TypeScript compiler with strict mode

**Styling:**
- `tailwindcss@4.1.17` - Utility-first CSS framework
- `@tailwindcss/typography` - Typography plugin (if needed)

**Database & ORM:**
- `prisma@5.x` - Prisma ORM and CLI
- `@prisma/client@5.x` - Prisma client for TypeScript

**Authentication:**
- `next-auth@beta` (v5/Auth.js) - Next.js authentication library
- `@auth/prisma-adapter` - Prisma adapter for NextAuth
- `bcryptjs@latest` - Password hashing library

**UI Components:**
- `shadcn/ui` - Component library (installed via CLI)
- `@radix-ui/*` - Headless UI primitives (installed with shadcn/ui)
- `class-variance-authority` - Component variant utilities
- `clsx` - Conditional class name utility
- `tailwind-merge` - Tailwind class merging utility

**Development Dependencies:**
- `@types/node` - Node.js TypeScript types
- `@types/react` - React TypeScript types
- `@types/react-dom` - React DOM TypeScript types
- `@types/bcryptjs` - bcryptjs TypeScript types
- `eslint@latest` - ESLint for code quality
- `eslint-config-next` - Next.js ESLint configuration
- `typescript@5.9.3` - TypeScript compiler

**Testing (Story 1.6):**
- `jest@latest` - JavaScript testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - DOM matchers for Jest
- `@playwright/test` - End-to-end testing framework
- `@types/jest` - Jest TypeScript types

### Infrastructure Dependencies

**Database:**
- PostgreSQL 16.x (LTS) - Multi-tenant database with RLS support
- Managed via: Vercel Postgres (MVP) or external PostgreSQL instance

**Development Environment:**
- Docker & Docker Compose (optional) - Local PostgreSQL and Redis containers
- Node.js 18.x or higher - Runtime environment

**Deployment:**
- Vercel - Next.js-optimized hosting platform
- Git - Version control (GitHub/GitLab integration with Vercel)

### Integration Points

**Future Integrations (Out of Scope for Epic 1):**
- Redis 7.x - Background job queue (Epic 11)
- S3-compatible storage - File storage (Epic 11)
- Email service (Resend) - Email delivery (Epic 11)
- Calendar APIs - Interview scheduling (Epic 7, Epic 11)

**External Services:**
- None required for Epic 1 (all foundation work)

### Version Constraints

- Next.js: 16.0.4 (exact version for consistency)
- TypeScript: 5.9.3 (exact version for consistency)
- Prisma: 5.x (latest 5.x version)
- NextAuth: beta (v5/Auth.js - use latest beta)
- PostgreSQL: 16.x (LTS version)

### Dependency Management

- Package manager: npm (default with Node.js)
- Lock file: `package-lock.json` (committed to repository)
- Version strategy: Exact versions for core dependencies, latest for utilities

## Acceptance Criteria (Authoritative)

### Story 1.1: Project Setup and Initial Configuration

**AC1.1.1:** Project structure is created with Next.js 14+ App Router configured, TypeScript with strict mode, Tailwind CSS, ESLint, source directory (`src/`), environment variable template (`.env.example`), and Git repository initialized.

**AC1.1.2:** Project structure follows architecture document: `src/app/` for routes, `src/components/` for components, `src/lib/` for utilities, `src/types/` for types, `prisma/` for schema, `__tests__/` for tests.

**AC1.1.3:** `package.json` includes core dependencies: `next@latest`, `react@latest`, `react-dom@latest`, `typescript@latest`, `tailwindcss@latest`, `prisma@5.x`, `@prisma/client@5.x`.

**AC1.1.4:** Tailwind is configured with Trust Navy color palette (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`).

### Story 1.2: Database Schema and Prisma Setup

**AC1.2.1:** Prisma is configured with PostgreSQL 16.x connection, multi-tenant schema with `tenant_id` on all tables, core tables defined (`tenants`, `users`, `job_postings`, `candidates`, `applications`), RLS policies for tenant isolation, timestamps on all tables, and proper relationships.

**AC1.2.2:** Schema includes all required tables with correct fields: `tenants` (id, name, slug, settings JSON), `users` (id, tenant_id, email, name, role, password_hash), `job_postings` (id, tenant_id, title, description, requirements JSON, status), `candidates` (id, tenant_id, email, name, resume_url, linkedin_id), `applications` (id, tenant_id, candidate_id, job_id, status, ai_score).

**AC1.2.3:** Prisma migrations are set up: initial migration created, migration commands work (`prisma migrate dev`), seed script template created.

### Story 1.3: Authentication Foundation with NextAuth.js

**AC1.3.1:** NextAuth.js v5 (Auth.js) is installed and configured with email/password provider, session management with JWT tokens, password hashing using bcrypt (minimum 10 rounds), secure session timeout (default 8 hours), and protected API routes middleware.

**AC1.3.2:** Authentication flow works: users can register with email and password, users can log in with email and password, sessions persist across page refreshes, logout clears session and redirects to login, protected routes redirect unauthenticated users to login.

**AC1.3.3:** Security requirements are met: passwords minimum 8 characters with complexity (1 uppercase, 1 number, 1 special character), passwords hashed before storage, session tokens signed with `NEXTAUTH_SECRET`, CSRF protection enabled, secure cookie settings (httpOnly, secure in production).

### Story 1.4: Multi-Tenant Middleware and Row-Level Security

**AC1.4.1:** Tenant isolation is enforced with Next.js middleware that extracts tenant_id from request, Prisma middleware that automatically filters queries by tenant_id, database RLS policies that prevent cross-tenant data access, and tenant context available in all API routes and components.

**AC1.4.2:** Middleware handles: extracting tenant_id from authenticated user's session, setting tenant context for all database queries, validating tenant_id on all API requests, returning 403 Forbidden if user tries to access another tenant's data, logging all tenant access attempts for audit.

**AC1.4.3:** RLS policies are configured: all tables have RLS enabled, policies check `tenant_id` matches authenticated user's tenant, system admins can bypass RLS (for tenant management), policies are tested to prevent data leaks.

### Story 1.5: Core UI Component Library Setup

**AC1.5.1:** shadcn/ui is installed and configured with Trust Navy color theme applied (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`), core components available (Button, Input, Card, Modal, Toast, Form), typography system configured (Roboto Slab for headings, Roboto for body), spacing system using 4px base unit, accessibility features enabled (ARIA labels, keyboard navigation).

**AC1.5.2:** Components follow UX design specifications: button hierarchy (Primary Deep Navy, Secondary Rich Blue, Tertiary Outline), form inputs with labels above fields and required field indicators, error states with inline messages below fields, loading states with skeleton screens and spinners, responsive breakpoints (mobile max 767px, tablet 768-1023px, desktop min 1024px).

**AC1.5.3:** Components are accessible: WCAG 2.1 Level AA compliant, keyboard navigation support, screen reader compatible (ARIA labels), color contrast ratios meet standards (4.5:1 for text, 3:1 for interactive).

### Story 1.6: Development Environment and Deployment Pipeline

**AC1.6.1:** Development environment includes: local PostgreSQL database (Docker or local install), Redis for background jobs (Docker or local install), environment variable management (`.env.local`, `.env.example`), hot reloading for development (`npm run dev`), TypeScript type checking in watch mode.

**AC1.6.2:** Testing framework is set up: Jest configured for unit tests, React Testing Library for component tests, Playwright configured for E2E tests, test scripts in package.json (`npm test`, `npm run test:e2e`), example test files demonstrating patterns.

**AC1.6.3:** Deployment pipeline is configured: Vercel project connected (for MVP deployment), environment variables configured in Vercel dashboard, automatic deployments on git push to main branch, build script that runs Prisma migrations, health check endpoint for deployment verification.

## Traceability Mapping

| AC ID | Acceptance Criteria | Spec Section | Component/API | Test Idea |
|-------|---------------------|--------------|---------------|-----------|
| **AC1.1.1** | Project structure created | Detailed Design: Services and Modules | Project Setup Module | Verify directory structure exists, check Next.js version, verify TypeScript config has strict mode |
| **AC1.1.2** | Project structure follows architecture | System Architecture Alignment | Project structure | Verify all required directories exist (`src/app/`, `src/components/`, `src/lib/`, `src/types/`, `prisma/`, `__tests__/`) |
| **AC1.1.3** | package.json includes core dependencies | Dependencies and Integrations | package.json | Check package.json for all required dependencies with correct versions |
| **AC1.1.4** | Tailwind configured with Trust Navy colors | Detailed Design: Services and Modules | tailwind.config.js | Verify color values in Tailwind config match UX design specification |
| **AC1.2.1** | Prisma configured with multi-tenant schema | Detailed Design: Data Models | prisma/schema.prisma | Verify Prisma schema has all tables with tenant_id, check RLS policies, verify relationships |
| **AC1.2.2** | Schema includes all required tables | Detailed Design: Data Models | prisma/schema.prisma | Verify each table has correct fields as specified in data models section |
| **AC1.2.3** | Prisma migrations set up | Detailed Design: Workflows | Prisma migrations | Run `prisma migrate dev`, verify migration files created, test seed script |
| **AC1.3.1** | NextAuth.js v5 configured | Detailed Design: APIs and Interfaces | src/lib/auth/config.ts, src/app/api/auth/[...nextauth]/route.ts | Verify NextAuth configuration, check bcrypt rounds (minimum 10), verify session timeout |
| **AC1.3.2** | Authentication flow works | Detailed Design: Workflows | Authentication API routes, login page | E2E test: Register user, login, verify session persists, logout, verify protected route redirect |
| **AC1.3.3** | Security requirements met | Non-Functional Requirements: Security | Password validation, session config | Test password complexity validation, verify password hashing (never plain text), test CSRF protection |
| **AC1.4.1** | Tenant isolation enforced | Detailed Design: Workflows | src/middleware.ts, src/lib/db/rls.ts, Prisma middleware | Unit test: Attempt cross-tenant query, verify 403 Forbidden, verify RLS blocks access |
| **AC1.4.2** | Middleware handles tenant context | Detailed Design: APIs and Interfaces | src/middleware.ts, src/lib/db/prisma.ts | Integration test: Extract tenant_id from session, verify queries filtered, test 403 on wrong tenant |
| **AC1.4.3** | RLS policies configured | Detailed Design: Data Models | PostgreSQL RLS policies | Database test: Attempt direct SQL query with wrong tenant_id, verify blocked by RLS |
| **AC1.5.1** | shadcn/ui installed with Trust Navy theme | Detailed Design: Services and Modules | src/components/ui/, tailwind.config.js | Verify shadcn/ui installed, check theme colors in Tailwind config, verify components available |
| **AC1.5.2** | Components follow UX specifications | Detailed Design: Services and Modules | src/components/ui/ | Visual test: Verify button hierarchy, form input labels, error states, loading states, responsive breakpoints |
| **AC1.5.3** | Components are accessible | Non-Functional Requirements: Observability | src/components/ui/ | Accessibility test: Run Lighthouse audit (target 95+), test keyboard navigation, screen reader compatibility |
| **AC1.6.1** | Development environment includes tools | Detailed Design: Workflows | Docker Compose, package.json scripts | Verify Docker Compose file exists, test `npm run dev` starts server, verify TypeScript watch mode |
| **AC1.6.2** | Testing framework set up | Dependencies and Integrations | Jest, React Testing Library, Playwright configs | Run `npm test`, verify test files exist, run `npm run test:e2e`, verify Playwright works |
| **AC1.6.3** | Deployment pipeline configured | Detailed Design: Workflows | Vercel project, health check endpoint | Verify Vercel project connected, test health check endpoint returns 200, verify auto-deploy on git push |

## Risks, Assumptions, Open Questions

### Risks

**Risk 1: NextAuth.js v5 (Auth.js) Beta Stability**
- **Description:** NextAuth.js v5 is in beta, may have breaking changes or bugs
- **Impact:** High - Authentication is critical foundation
- **Mitigation:** Use latest stable beta, monitor NextAuth.js GitHub for issues, have rollback plan to v4 if needed
- **Status:** Accepted risk - v5 required for modern Next.js App Router support

**Risk 2: Prisma RLS Policy Complexity**
- **Description:** PostgreSQL RLS policies can be complex to implement correctly, risk of data leaks if misconfigured
- **Impact:** Critical - Multi-tenant data isolation is security-critical
- **Mitigation:** Thorough testing of RLS policies, unit tests for cross-tenant access prevention, code review of all RLS policies
- **Status:** Mitigated through comprehensive testing strategy

**Risk 3: Tenant Context Extraction Edge Cases**
- **Description:** Edge cases in tenant_id extraction (subdomain, header, session) may cause authentication issues
- **Impact:** Medium - Could block legitimate users or allow unauthorized access
- **Mitigation:** Comprehensive middleware testing, fallback strategies for tenant extraction, clear error messages
- **Status:** Mitigated through testing

### Assumptions

**Assumption 1: PostgreSQL 16.x Available**
- **Description:** Assumes PostgreSQL 16.x (LTS) is available in deployment environment
- **Rationale:** Architecture document specifies PostgreSQL 16.x for RLS support
- **Validation:** Verify PostgreSQL version in Vercel Postgres or external database
- **Status:** Validated - Vercel Postgres supports PostgreSQL 16.x

**Assumption 2: Single Tenant in Phase 1**
- **Description:** Assumes Phase 1 operates with single tenant (MOAR Advisory), multi-tenant architecture is foundation for Phase 2
- **Rationale:** PRD specifies Phase 1 is single-tenant pilot, Phase 2 is multi-tenant SaaS
- **Validation:** Architecture supports single tenant, middleware handles single tenant gracefully
- **Status:** Validated - Architecture designed for single tenant with multi-tenant foundation

**Assumption 3: Vercel Deployment for MVP**
- **Description:** Assumes Vercel is acceptable deployment platform for MVP
- **Rationale:** Architecture document specifies Vercel for MVP, AWS for Phase 2
- **Validation:** Vercel supports Next.js 16, PostgreSQL, environment variables
- **Status:** Validated - Vercel is Next.js-optimized platform

### Open Questions

**Question 1: Subdomain-Based Tenant Routing**
- **Description:** Should tenant_id be extracted from subdomain (tenant-slug.moar-ats.com) in Phase 1 or Phase 2?
- **Impact:** Low - Phase 1 is single tenant, subdomain routing not needed
- **Resolution:** Defer to Phase 2 - Phase 1 uses session-based tenant extraction
- **Status:** Resolved - Session-based for Phase 1, subdomain support in Phase 2

**Question 2: Redis for Background Jobs in Phase 1**
- **Description:** Is Redis required for Epic 1, or can it be deferred to Epic 11 (Integrations)?
- **Impact:** Low - Background jobs not needed for foundation epic
- **Resolution:** Defer to Epic 11 - Redis setup optional in Story 1.6, required in Epic 11
- **Status:** Resolved - Optional in Epic 1, required in Epic 11

## Test Strategy Summary

### Test Levels

**Unit Tests (Jest):**
- **Scope:** Individual functions, utilities, middleware logic
- **Coverage Target:** 80%+ for critical paths (authentication, tenant isolation, password hashing)
- **Examples:**
  - Password hashing with bcrypt (verify rounds, verify hash matches)
  - Tenant context extraction from session
  - Prisma middleware tenant filtering
  - RLS policy validation logic
- **Framework:** Jest with TypeScript support

**Component Tests (React Testing Library):**
- **Scope:** UI components from shadcn/ui, custom components
- **Coverage Target:** All interactive components, form validation, accessibility
- **Examples:**
  - Button component variants (primary, secondary, tertiary)
  - Form input validation (required fields, error states)
  - Modal/dialog interactions (open, close, focus management)
  - Accessibility (keyboard navigation, ARIA labels)
- **Framework:** React Testing Library with Jest

**Integration Tests:**
- **Scope:** API routes, database operations, authentication flows
- **Coverage Target:** All API endpoints, database queries with tenant filtering
- **Examples:**
  - Authentication flow (register → login → session → logout)
  - Tenant isolation (attempt cross-tenant access, verify blocked)
  - Database queries with tenant context
  - Middleware tenant extraction and validation
- **Framework:** Jest with test database, Next.js API route testing

**E2E Tests (Playwright):**
- **Scope:** Complete user workflows, cross-browser testing
- **Coverage Target:** Critical user paths (login, tenant context, protected routes)
- **Examples:**
  - Complete authentication flow (register, login, session persistence, logout)
  - Protected route access (verify redirect when unauthenticated)
  - Tenant isolation (login as user in tenant A, verify cannot access tenant B data)
  - Responsive design (mobile, tablet, desktop breakpoints)
- **Framework:** Playwright with TypeScript

### Test Coverage by Acceptance Criteria

**Story 1.1 (Project Setup):**
- Unit: Verify project structure, verify dependencies in package.json
- Integration: Verify Next.js dev server starts, verify TypeScript compilation

**Story 1.2 (Database Schema):**
- Unit: Verify Prisma schema syntax, verify relationships
- Integration: Run migrations, verify tables created, verify RLS policies enabled
- E2E: Test database connection, verify seed script works

**Story 1.3 (Authentication):**
- Unit: Password hashing, password validation, session token signing
- Component: Login form, registration form, error states
- Integration: Authentication API routes, session management
- E2E: Complete authentication flow (register → login → session → logout)

**Story 1.4 (Multi-Tenant Middleware):**
- Unit: Tenant context extraction, Prisma middleware filtering
- Integration: Middleware tenant validation, RLS policy enforcement
- E2E: Cross-tenant access prevention, tenant context propagation

**Story 1.5 (UI Components):**
- Component: All shadcn/ui components, accessibility, responsive design
- Integration: Component integration with forms, modals, toasts
- E2E: UI component interactions, keyboard navigation, screen reader compatibility

**Story 1.6 (Development & Deployment):**
- Integration: Health check endpoint, deployment pipeline
- E2E: Verify deployment works, verify health check returns 200

### Edge Cases and Error Scenarios

**Authentication Edge Cases:**
- Invalid email format
- Weak password (doesn't meet complexity)
- Login with non-existent user
- Login with wrong password (rate limiting)
- Session expiration
- Concurrent login attempts

**Multi-Tenant Edge Cases:**
- Missing tenant_id in session
- Invalid tenant_id format
- User tries to access another tenant's data
- Database query without tenant context
- RLS policy bypass attempt

**Database Edge Cases:**
- Database connection failure
- Migration rollback
- Concurrent migrations
- Invalid schema changes

### Test Data Strategy

- **Development:** Use seed script to populate test data
- **Testing:** Use test database (separate from development)
- **E2E:** Use isolated test tenant with test users
- **Cleanup:** Reset test database between test runs

### Continuous Testing

- **Pre-commit:** ESLint, TypeScript type checking
- **CI/CD:** Run all test suites on git push
- **Pre-deployment:** E2E tests must pass before deployment
- **Post-deployment:** Health check verification

## Post-Review Follow-ups

- ✅ **Story 1.6 (Development Environment & Deployment Pipeline):** CLI helper now covered via `__tests__/cli/dev-stack.test.ts`, which drives `scripts/dev-stack.sh` using the `DEV_STACK_MOCK` hook (resolved 2025-11-27).

