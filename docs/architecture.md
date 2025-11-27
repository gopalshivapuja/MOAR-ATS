# Architecture

## Executive Summary

MOAR ATS is architected as a modern, multi-tenant SaaS platform built on Next.js with PostgreSQL, designed for scalability from a single-tenant pilot to 100+ GCC tenants. The architecture emphasizes AI-native capabilities with an adaptive learning system, enterprise-grade multi-tenancy via row-level security, and compliance-by-default patterns for DPDP/GDPR. The stack leverages Next.js App Router for full-stack capabilities, Prisma for type-safe database access, and a GitOps-ready deployment path (Vercel for MVP, AWS for Phase 2).

## Project Initialization

First implementation story should execute:

```bash
npx create-next-app@16.0.4 moar-ats --typescript --tailwind --app --eslint --src-dir
```

This establishes the base architecture with these decisions:
- **Next.js framework**: 16.0.4 (App Router, modern, full-stack)
- **TypeScript**: 5.9.3 (Type safety throughout)
- **Tailwind CSS**: 4.1.17 (Utility-first styling)
- **ESLint**: Code quality enforcement
- **Source directory**: `src/` organization

**Version Verification Date:** 2025-11-25  
**Verification Method:** npm registry queries

## Decision Summary

| Category | Decision | Version | Affects FR Categories | Rationale |
| -------- | -------- | ------- | --------------------- | --------- |
| Framework | Next.js | 16.0.4 (App Router) | All | Full-stack framework, perfect for multi-tenant SaaS |
| Language | TypeScript | 5.9.3 | All | Type safety, better DX, enterprise standard |
| Styling | Tailwind CSS | 4.1.17 | All | Utility-first, fast development, consistent design |
| Database | PostgreSQL | 16.x (LTS) | All | Multi-tenant RLS, compliance-ready, scales to 100+ tenants |
| ORM | Prisma | 5.x | All | TypeScript-first, excellent Next.js integration, strong type safety |
| Authentication | NextAuth.js | v5.x (Auth.js) | User Account & Access | Next.js native, LinkedIn OAuth support, SSO-ready, open source |
| API Pattern | REST API | Next.js API Routes | All | Standard, simple, perfect for multi-tenant SaaS, easy integrations |
| File Storage | S3-compatible | AWS SDK v3 | Compliance, Integrations | Industry standard, tenant isolation, scalable, GitOps-ready |
| Email Service | Resend | 6.5.2 | AI Outreach, Integrations | Modern API, React Email support, excellent deliverability |
| Background Jobs | BullMQ + Redis | 5.x / 7.x | AI Resume Processing, Compliance | Reliable async processing, retry logic, job scheduling |
| Real-time | Socket.io | 4.x (optional MVP) | All | Live updates for candidate status, AI scores, notifications |
| Deployment | Vercel → AWS | Latest | All | Fast MVP iteration, enterprise scale Phase 2 with GitOps |
| Multi-tenancy | RLS + tenant_id | PostgreSQL RLS | All | Database-level security, prevents data leaks, compliance-ready |

## Project Structure

```
moar-ats/
├── .env.local                 # Environment variables (gitignored)
├── .env.example               # Example env file
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── prisma/
│   ├── schema.prisma          # Database schema with multi-tenant models
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Seed data for development
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, signup)
│   │   │   ├── login/
│   │   │   └── callback/      # OAuth callbacks
│   │   ├── (recruiter)/       # Recruiter portal routes
│   │   │   ├── dashboard/     # Pipeline view
│   │   │   ├── jobs/          # Job management
│   │   │   ├── candidates/   # Candidate management
│   │   │   ├── interviews/    # Interview scheduling
│   │   │   ├── offers/        # Offer management
│   │   │   └── compliance/    # Compliance dashboard
│   │   ├── (candidate)/       # Candidate portal routes
│   │   │   ├── apply/         # Application flow
│   │   │   ├── status/        # Application status
│   │   │   └── profile/       # Candidate profile
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── jobs/          # Job CRUD
│   │   │   ├── candidates/   # Candidate CRUD
│   │   │   ├── ai/            # AI endpoints (scoring, ranking)
│   │   │   ├── interviews/    # Interview scheduling
│   │   │   ├── offers/        # Offer management
│   │   │   ├── compliance/    # Compliance exports
│   │   │   ├── integrations/  # External integrations
│   │   │   └── webhooks/      # Inbound webhooks
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── recruiter/         # Recruiter-specific components
│   │   │   ├── PipelineView.tsx
│   │   │   ├── CandidateCard.tsx
│   │   │   ├── AICoPilotPanel.tsx
│   │   │   └── JobPostingForm.tsx
│   │   ├── candidate/         # Candidate-specific components
│   │   │   ├── ApplicationForm.tsx
│   │   │   ├── StatusTimeline.tsx
│   │   │   └── LinkedInOAuthButton.tsx
│   │   └── shared/            # Shared components
│   │       ├── AIExplanationCard.tsx
│   │       ├── GamificationProgress.tsx
│   │       └── ComplianceExport.tsx
│   ├── lib/                   # Utilities and helpers
│   │   ├── db/                # Database utilities
│   │   │   ├── prisma.ts      # Prisma client with tenant middleware
│   │   │   └── rls.ts         # Row-level security helpers
│   │   ├── auth/              # Authentication utilities
│   │   │   └── config.ts     # NextAuth configuration
│   │   ├── ai/                # AI service integration
│   │   │   ├── resume-parser.ts
│   │   │   ├── scoring.ts
│   │   │   └── learning/     # AI learning system
│   │   │       ├── observation.ts
│   │   │       ├── pattern-engine.ts
│   │   │       └── explanation.ts
│   │   ├── storage/           # File storage utilities
│   │   │   └── s3.ts          # S3 client with tenant isolation
│   │   ├── email/             # Email utilities
│   │   │   └── resend.ts      # Resend client
│   │   ├── jobs/              # Background job utilities
│   │   │   └── bullmq.ts      # BullMQ setup
│   │   ├── integrations/     # External integrations
│   │   │   ├── calendar.ts    # Calendar sync (Google, Outlook)
│   │   │   ├── hris.ts        # HRIS webhook handlers
│   │   │   └── linkedin.ts   # LinkedIn OAuth
│   │   └── compliance/        # Compliance utilities
│   │       ├── audit-log.ts   # Audit logging
│   │       ├── consent.ts     # Consent tracking
│   │       └── export.ts      # Evidence pack generation
│   ├── types/                 # TypeScript types
│   │   ├── database.ts        # Prisma-generated types
│   │   ├── api.ts             # API request/response types
│   │   └── tenant.ts          # Multi-tenant types
│   ├── hooks/                 # React hooks
│   │   ├── useTenant.ts      # Tenant context hook
│   │   ├── useAI.ts           # AI interaction hooks
│   │   └── usePipeline.ts     # Pipeline management hooks
│   ├── proxy.ts               # Next.js proxy handler (tenant, auth)
│   └── styles/                # Global styles
│       └── globals.css        # Tailwind imports
├── __tests__/                 # Tests
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # E2E tests (Playwright)
├── docker/                    # Docker files (for Podman)
│   ├── Dockerfile
│   └── docker-compose.yml
├── terraform/                 # Infrastructure as Code (Phase 2)
│   ├── main.tf
│   └── modules/
└── docs/                      # Documentation
    ├── architecture.md        # This document
    ├── prd.md
    └── api/                    # API documentation
```

## FR Category to Architecture Mapping

| FR Category | Architecture Location | Implementation |
|-------------|----------------------|----------------|
| User Account & Access (FR1-6) | `app/(auth)/`, `lib/auth/`, `proxy.ts` | NextAuth.js, RBAC, tenant proxy |
| Job Management (FR7-12) | `app/(recruiter)/jobs/`, `app/api/jobs/` | REST API, Prisma models, workflow engine |
| Candidate Management (FR13-18) | `app/(recruiter)/candidates/`, `app/api/candidates/` | REST API, Prisma models, pipeline view |
| AI-Assisted Resume Processing (FR19-24) | `lib/ai/`, `app/api/ai/` | AI learning system, scoring, ranking |
| AI-Assisted Outreach (FR25-28) | `lib/email/`, `lib/ai/` | Adaptive outreach, Resend integration |
| Interview Scheduling (FR30-34) | `app/(recruiter)/interviews/`, `lib/integrations/calendar.ts` | Calendar APIs, scheduling logic |
| Offer Management (FR35-39) | `app/(recruiter)/offers/`, `app/api/offers/` | Approval workflows, offer generation |
| Compliance & Audit (FR40-45) | `lib/compliance/`, `app/(recruiter)/compliance/` | Audit logging, consent tracking, exports |
| Multi-Tenancy & Branding (FR46-49) | `proxy.ts`, `lib/db/rls.ts` | RLS, tenant_id, storage isolation |
| Integrations (FR50-55) | `lib/integrations/`, `app/api/integrations/` | Email, calendar, HRIS, webhooks |
| AI Learning & Adaptation (FR56-60) | `lib/ai/learning/` | Novel pattern - adaptive learning system |
| Reporting & Analytics (FR61-64) | `app/(recruiter)/dashboard/`, `app/api/analytics/` | Dashboard, analytics API |
| Data Management (FR65-68) | `lib/db/`, `proxy.ts` | Encryption, auth, rate limiting |

## Technology Stack Details

### Core Technologies

**Frontend:**
- **Next.js 16.0.4** (App Router): Full-stack React framework
- **TypeScript 5.9.3**: Type safety throughout
- **Tailwind CSS 4.1.17**: Utility-first styling
- **React Query**: Server state management
- **shadcn/ui**: Component library base

**Backend:**
- **Next.js API Routes**: REST API endpoints
- **Prisma ORM**: Type-safe database access
- **PostgreSQL 16.x**: Multi-tenant database with RLS
- **NextAuth.js v5**: Authentication and session management

**Infrastructure:**
- **Redis 7.x**: Background job queue (BullMQ)
- **S3-compatible storage**: File storage with tenant isolation
- **Socket.io 4.x** (optional): Real-time updates

**External Services:**
- **Resend 6.5.2**: Email service (React Email templates)
- **OpenAI/Anthropic**: AI services (resume parsing, scoring)
- **Calendar APIs**: Google Calendar, Outlook (interview scheduling)

### Integration Points

**Frontend ↔ Backend:**
- REST API via Next.js API Routes
- Type-safe API calls with TypeScript
- React Query for data fetching and caching

**Backend ↔ Database:**
- Prisma ORM with tenant-aware middleware
- Row-level security (RLS) for multi-tenant isolation
- Connection pooling for performance

**Backend ↔ External Services:**
- Resend API for email delivery
- Calendar APIs (Google, Outlook) for scheduling
- HRIS webhooks for candidate data sync
- S3 API for file storage

**Background Jobs:**
- BullMQ processes async tasks (resume parsing, AI scoring, compliance exports)
- Redis as job queue backend
- Retry logic with exponential backoff

## Novel Pattern Designs

### Adaptive AI Learning System with Human-in-the-Loop

**Pattern Name:** Adaptive AI Learning System

**Purpose:** Enable AI to learn recruiter preferences and candidate response patterns, then adapt scoring, ranking, and outreach suggestions while maintaining explainability and human control.

**What Makes This Novel:**
- Most ATS tools are static; MOAR ATS evolves
- AI learns which scoring criteria matter to each recruiter/role combination
- Outreach suggestions improve based on actual response rates
- System orchestrates multi-step workflows while staying explainable

**Core Components:**

1. **Behavior Observation Layer** (`lib/ai/learning/observation.ts`)
   - Observes and records recruiter and candidate behavior patterns
   - Logs events: score acceptances/rejections, outreach edits, candidate responses

2. **Pattern Learning Engine** (`lib/ai/learning/pattern-engine.ts`)
   - Analyzes behavior events and extracts patterns
   - Builds preference profiles per recruiter/role combination
   - Updates learning models incrementally

3. **Adaptive Scoring System** (`lib/ai/scoring.ts`)
   - Applies learned preferences to resume scoring
   - Generates explanations for score adjustments
   - Allows human override with feedback loop

4. **Adaptive Outreach System** (`lib/ai/outreach.ts`)
   - Generates outreach messages that adapt to learned patterns
   - Adjusts tone and style based on recruiter's successful history
   - Tracks response rates and improves over time

5. **Explainability Layer** (`lib/ai/explanation.ts`)
   - Generates human-readable explanations for all AI decisions
   - Shows what was learned and how it influenced the decision
   - Enables corrections that feed back into learning

**Data Flow:**
- Candidate applies → Resume parsed → Base score calculated
- Learning engine checks → Recruiter preferences loaded
- Score adjusted → Explanation generated
- Recruiter reviews → Accepts/rejects → Behavior logged
- Pattern updated → Preference confidence increases

**State Management:**
- Per-tenant, per-recruiter preference profiles stored in PostgreSQL
- Behavior events streamed to event store
- Processed asynchronously via BullMQ
- Cached in Redis for performance

**Integration Points:**
- Database: Prisma models for `behavior_events`, `recruiter_preferences`
- Background jobs: BullMQ processes behavior events asynchronously
- API: `app/api/ai/` endpoints expose learning capabilities
- Frontend: `components/recruiter/AICoPilotPanel.tsx` shows explanations
- Compliance: All learning events logged in audit trail

**Implementation Guide:**
1. Log every recruiter action (score acceptance, outreach edit, etc.)
2. Aggregate events by recruiter + role combination
3. Calculate preference weights (which criteria matter most)
4. Apply preferences when scoring, ranking, or generating outreach
5. Generate explanations for all AI decisions
6. Allow recruiter override and feedback
7. Update patterns incrementally (not batch retraining)

**Affects FR Categories:**
- FR19-24: AI-assisted resume processing (scoring, ranking with learning)
- FR25-28: AI-assisted outreach (adapts based on response rates)
- FR56-60: AI learning and adaptation (core novel pattern)

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Patterns

**API Routes:**
- Format: Plural nouns, kebab-case
- Examples: `/api/jobs`, `/api/candidates`, `/api/interviews`
- Route parameters: `:id` format (e.g., `/api/candidates/:id`)

**Database Tables:**
- Format: Plural, snake_case
- Examples: `candidates`, `job_postings`, `interview_schedules`
- Always include `tenant_id` column

**Database Columns:**
- Format: snake_case
- Examples: `tenant_id`, `created_at`, `updated_at`, `user_id`
- Foreign keys: `{table}_id` (e.g., `job_id`, `candidate_id`)

**React Components:**
- Format: PascalCase
- Examples: `CandidateCard.tsx`, `AICoPilotPanel.tsx`
- File names match component names

**Functions:**
- Format: camelCase
- Examples: `parseResume()`, `calculateScore()`, `sendOutreach()`

### Structure Patterns

**Test Organization:**
- Location: `__tests__/` directory
- Co-located: `__tests__/unit/`, `__tests__/integration/`, `__tests__/e2e/`
- Test files: `*.test.ts` or `*.spec.ts`

**Component Organization:**
- By feature: `components/recruiter/`, `components/candidate/`
- Shared: `components/shared/`
- UI primitives: `components/ui/` (shadcn/ui)

**API Route Organization:**
- By resource: `app/api/jobs/`, `app/api/candidates/`
- Nested: `app/api/jobs/[jobId]/candidates/`

### Format Patterns

**API Response Format:**
```typescript
// Success
{
  data: T,
  meta?: { page?: number; limit?: number; total?: number; }
}

// Error
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

**Date Format:**
- ISO 8601 UTC: `"2025-11-25T10:30:00Z"`
- Always store in UTC, display in user timezone

**Pagination Format:**
```typescript
{
  data: T[],
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}
```

### Communication Patterns

**Event Naming:**
- Format: `{entity}.{action}` (e.g., `candidate.shortlisted`, `job.posted`)
- Past tense for completed actions

**State Updates:**
- Use React Query for server state
- Optimistic updates for UI responsiveness
- Rollback on error

### Lifecycle Patterns

**Loading States:**
- Skeleton screens for content loading
- Spinners for actions
- Progress bars for long operations

**Error Recovery:**
- Retry logic: 3 attempts with exponential backoff
- User-friendly error messages
- Log errors with full context

### Location Patterns

**API Route Structure:**
- RESTful: `/api/{resource}` for collection, `/api/{resource}/:id` for item
- Nested: `/api/jobs/:jobId/candidates`
- Actions: `/api/candidates/:id/shortlist` (POST)

**Static Assets:**
- Public: `public/` directory
- Tenant-specific: `public/tenants/{tenant_id}/logos/`

### Consistency Patterns

**UI Date Formats:**
- Relative for recent: "2 hours ago", "yesterday"
- Absolute for older: "Nov 25, 2025"
- Use `date-fns` for formatting

**Logging Format:**
- Structured JSON logs
- Include: `level`, `tenant_id`, `user_id`, `action`, `timestamp`

**User-Facing Errors:**
- Clear, actionable messages
- No technical jargon
- Include what user can do to fix it

## Consistency Rules

### Naming Conventions

- **API routes**: Plural, kebab-case (`/api/candidates`)
- **Database tables**: Plural, snake_case (`candidates`, `job_postings`)
- **Database columns**: snake_case (`tenant_id`, `created_at`)
- **React components**: PascalCase (`CandidateCard.tsx`)
- **Functions**: camelCase (`parseResume()`, `calculateScore()`)

### Code Organization

- **Tests**: Co-located in `__tests__/` directory
- **Components**: By feature (`components/recruiter/`, `components/candidate/`)
- **API routes**: By resource (`app/api/jobs/`, `app/api/candidates/`)
- **Utilities**: By domain (`lib/ai/`, `lib/storage/`, `lib/email/`)

### Error Handling

**Pattern:** Structured error responses with tenant-aware logging

**Implementation:**
- API errors return: `{ error: { code: string, message: string, details?: any } }`
- HTTP status codes: 400, 401, 403, 404, 500
- All errors logged with tenant_id for audit
- User-facing errors are sanitized (no stack traces)

**Example:**
```typescript
{
  error: {
    code: "CANDIDATE_NOT_FOUND",
    message: "Candidate not found in your tenant",
    details: { candidateId: "123" }
  }
}
```

### Logging Strategy

**Pattern:** Structured JSON logging with tenant tagging

**Implementation:**
- Format: JSON (structured logs)
- Levels: ERROR, WARN, INFO, DEBUG
- Every log includes: `tenant_id`, `user_id`, `timestamp`, `action`
- Logs stored in tenant-tagged storage for compliance
- OpenTelemetry for distributed tracing

**Example:**
```json
{
  "level": "INFO",
  "tenant_id": "moar-advisory",
  "user_id": "user-123",
  "action": "candidate.shortlisted",
  "candidate_id": "candidate-456",
  "timestamp": "2025-11-25T10:30:00Z"
}
```

## Data Architecture

### Database Schema (Prisma)

**Core Tables:**
- `tenants`: Tenant information
- `users`: User accounts (recruiters, hiring managers, etc.)
- `job_postings`: Job postings with tenant_id
- `candidates`: Candidate profiles with tenant_id
- `applications`: Candidate applications to jobs
- `interviews`: Interview schedules
- `offers`: Offer letters and responses
- `audit_logs`: Immutable audit trail
- `consent_records`: DPDP/GDPR consent tracking
- `behavior_events`: AI learning events
- `recruiter_preferences`: Learned recruiter preferences

**Multi-Tenancy:**
- Every table includes `tenant_id` column
- Row-level security (RLS) policies enforce isolation
- Prisma middleware automatically filters by tenant_id

**Relationships:**
- Users belong to Tenants (many-to-one)
- Jobs belong to Tenants (many-to-one)
- Candidates belong to Tenants (many-to-one)
- Applications link Candidates to Jobs (many-to-many)
- Interviews link Candidates to Jobs (many-to-many)
- Offers link Candidates to Jobs (one-to-one)

### Data Models

**Candidate Model:**
```typescript
{
  id: string;
  tenant_id: string;
  email: string;
  name: string;
  resume_url: string;
  linkedin_id?: string;
  created_at: Date;
  updated_at: Date;
}
```

**Job Posting Model:**
```typescript
{
  id: string;
  tenant_id: string;
  title: string;
  description: string;
  requirements: string[];
  status: 'draft' | 'published' | 'archived';
  created_at: Date;
  updated_at: Date;
}
```

**Application Model:**
```typescript
{
  id: string;
  tenant_id: string;
  candidate_id: string;
  job_id: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired';
  ai_score?: number;
  ai_explanation?: string;
  created_at: Date;
  updated_at: Date;
}
```

## API Contracts

### Authentication

**POST /api/auth/login**
- Request: `{ email: string, password: string }`
- Response: `{ data: { user: User, token: string } }`

**POST /api/auth/callback/linkedin**
- Request: OAuth callback
- Response: `{ data: { user: User, token: string } }`

### Jobs

**GET /api/jobs**
- Query params: `?page=1&limit=20&status=published`
- Response: `{ data: Job[], meta: { page, limit, total } }`

**POST /api/jobs**
- Request: `{ title: string, description: string, requirements: string[] }`
- Response: `{ data: Job }`

**GET /api/jobs/:id**
- Response: `{ data: Job }`

### Candidates

**GET /api/candidates**
- Query params: `?page=1&limit=20&jobId=123&status=screening`
- Response: `{ data: Candidate[], meta: { page, limit, total } }`

**POST /api/candidates**
- Request: `{ email: string, name: string, resume: File }`
- Response: `{ data: Candidate }`

**GET /api/candidates/:id**
- Response: `{ data: Candidate }`

### AI

**POST /api/ai/parse-resume**
- Request: `{ resume: File }`
- Response: `{ data: { parsed: ParsedResume, score: number, explanation: string } }`

**POST /api/ai/score-candidate**
- Request: `{ candidateId: string, jobId: string }`
- Response: `{ data: { score: number, explanation: string, confidence: number } }`

**POST /api/ai/generate-outreach**
- Request: `{ candidateId: string, jobId: string }`
- Response: `{ data: { message: string, style: string, confidence: number } }`

### Compliance

**GET /api/compliance/export**
- Query params: `?type=audit&dateFrom=2025-01-01&dateTo=2025-12-31`
- Response: `{ data: { downloadUrl: string } }`

**POST /api/compliance/delete-request**
- Request: `{ candidateId: string }`
- Response: `{ data: { requestId: string, status: 'pending' } }`

## Security Architecture

### Data Protection

- **Encryption at rest**: AES-256 for database, S3 server-side encryption
- **Encryption in transit**: TLS 1.3 for all connections
- **Key management**: Secure vault (AWS Secrets Manager or equivalent)
- **Database backups**: Encrypted with separate keys

### Authentication & Authorization

- **Password policies**: Minimum length, complexity requirements
- **Session management**: Configurable timeout (default 8 hours inactivity)
- **SSO support**: SAML 2.0, OAuth 2.0 for enterprise tenants
- **MFA support**: For sensitive roles (system admins, compliance partners)
- **API authentication**: Bearer tokens or API keys with tenant-scoped permissions

### Access Controls

- **Row-level security**: Enforced at database level (tenant_id-based isolation)
- **Role-based access control**: Enforced at application level (every API call checks permissions)
- **Audit logs**: Capture all permission checks and access attempts
- **Principle of least privilege**: Users only get permissions they need

### Multi-Tenant Isolation

MOAR ATS implements defense-in-depth tenant isolation across three layers:

#### 1. Next.js Proxy Layer (`src/proxy.ts`)

**Tenant Extraction Priority:**
1. Session (from NextAuth token) - PRIMARY source
2. Subdomain (future: `tenant-slug.moar-ats.com`)
3. Header (`X-Tenant-ID`) - for system admin operations only

**Responsibilities:**
- Extracts `tenant_id` from authenticated user's session
- Sets tenant context using `AsyncLocalStorage` for all downstream operations
- Validates tenant access on every request
- Returns 403 Forbidden if user tries to access another tenant's data
- Logs all tenant access attempts (tenant_id, user_id, action, timestamp)
- Sets tenant context in request headers for downstream API routes

**Implementation:**
- Uses `getToken()` from `next-auth/jwt` to extract session data
- Calls `setTenantContext()` to establish tenant context for the request
- Sets `X-Tenant-ID`, `X-User-ID`, and `X-User-Role` headers

#### 2. Prisma Middleware Layer (`src/lib/db/prisma.ts`)

**Automatic Query Filtering:**
- All database queries are automatically filtered by `tenant_id`
- Applies to all operations: `findMany`, `findUnique`, `findFirst`, `create`, `update`, `delete`, `upsert`
- Uses Prisma's `$extends` feature to inject tenant filters

**Operation-Specific Behavior:**
- `findMany`/`findFirst`: Adds `tenantId` to `where` clause
- `findUnique`: Ensures `tenantId` matches in `where` clause
- `create`: Automatically sets `tenantId` in `data`
- `update`/`updateMany`: Adds `tenantId` to `where` clause (prevents cross-tenant updates)
- `delete`/`deleteMany`: Adds `tenantId` to `where` clause (prevents cross-tenant deletes)
- `upsert`: Ensures `tenantId` in both `where` and `create`/`update`

**System Admin Bypass:**
- System admins (role = `SYSTEM_ADMIN`) can bypass tenant restrictions
- Useful for tenant management operations
- All admin operations are logged for audit

**Helper Functions:**
- `withTenant(tenantId, queryFn)`: Execute query in specific tenant context
- Useful for system admin operations or tenant management

#### 3. PostgreSQL Row-Level Security (RLS) Layer

**Database-Level Policies:**
- All tenant-aware tables have RLS enabled
- Policies check `tenant_id` matches authenticated user's tenant
- System admins can bypass RLS (via `app.bypass_rls` session variable)
- Policies prevent direct SQL access with wrong `tenant_id`

**Policy Structure:**
```sql
CREATE POLICY "users_tenant_isolation" ON "users"
  FOR ALL
  USING (
    current_setting('app.bypass_rls', true) = 'true'
    OR
    "tenant_id" = current_setting('app.tenant_id', true)::uuid
  );
```

**Tables with RLS:**
- `users` - User accounts
- `job_postings` - Job postings
- `candidates` - Candidate profiles
- `applications` - Job applications

**Tables without RLS:**
- `tenants` - Tenant management (system admin only)
- `accounts`, `sessions`, `verification_tokens` - NextAuth tables (not tenant-aware)

**Note:** RLS policies are in place for defense-in-depth. Prisma middleware provides the primary tenant filtering. Full RLS activation requires connection-level session variable setting (can be enhanced in future).

#### Tenant Context Utilities (`src/lib/tenant/context.ts`)

**AsyncLocalStorage-Based Context:**
- Uses Node.js `AsyncLocalStorage` to maintain tenant context per async operation
- Context automatically propagates through async/await chains
- Isolated per request/operation

**Functions:**
- `getTenantId()`: Get current tenant ID from context
- `requireTenantId()`: Get tenant ID or throw error if missing
- `isSystemAdmin()`: Check if current user is system admin
- `withTenantContext()`: Run function with specific tenant context
- `setTenantContext()`: Set tenant context for current operation

#### React Hook (`src/hooks/useTenant.ts`)

**Client-Side Tenant Access:**
- `useTenant()` hook provides tenant context to React components
- Reads `tenantId` from NextAuth session
- Returns `{ tenantId, isLoading, error }`
- Handles loading and error states

**Usage:**
```typescript
const { tenantId, isLoading, error } = useTenant();
```

#### Audit Logging

**Log Format:**
```json
{
  "operation": "findMany",
  "model": "User",
  "tenantId": "uuid",
  "userId": "uuid",
  "success": true,
  "timestamp": "2025-11-27T12:00:00.000Z"
}
```

**Log Levels:**
- `INFO`: Successful tenant access
- `WARN`: Unauthorized access attempt
- `ERROR`: System error during tenant access

**Storage:**
- Development: Console logs
- Production (Story 9): `audit_logs` table with tenant tagging

#### Storage & Logs

- **Storage**: Tenant-prefixed buckets/keys (`s3://moar-ats/{tenant_id}/resumes/`)
- **Logs**: Tenant-tagged for compliance reviews
- **API**: Middleware validates tenant_id on every request

## Performance Considerations

### User-Facing Performance

- **Core workflows**: <2 seconds for 95th percentile (job posting, candidate search, resume parsing)
- **Resume parsing**: <5 seconds for standard PDF/DOCX files (up to 10MB)
- **AI scoring**: <3 seconds for typical job postings (50-200 candidates)
- **Candidate portal**: <1 second first contentful paint
- **Recruiter dashboard**: <2 seconds load time

### System Performance

- **API endpoints**: <500ms for read operations, <1 second for write operations (95th percentile)
- **Bulk operations**: Progress indicators for long-running tasks
- **Database queries**: Optimized for multi-tenant isolation (tenant_id indexes, query performance monitoring)

### Scalability

- **Multi-tenant**: Supports 10+ tenants (Phase 1), 100+ tenants (Phase 2)
- **Concurrent users**: 100+ per tenant
- **Application volume**: 1000+ applications per job posting
- **Bulk operations**: 10,000+ candidates per tenant

### Caching Strategy

- **Redis**: Cache frequently accessed data (recruiter preferences, job postings)
- **Next.js**: Static generation for public pages, ISR for dynamic content
- **CDN**: Static assets (images, fonts) via Vercel CDN or CloudFront

## Deployment Architecture

### MVP Deployment (Vercel)

- **Platform**: Vercel (Next.js optimized)
- **Database**: Managed PostgreSQL (Vercel Postgres or external)
- **Storage**: S3-compatible (AWS S3 or MinIO)
- **Redis**: Managed Redis (Upstash or Redis Cloud)
- **CI/CD**: Vercel Git integration (automatic deployments)

### Phase 2 Deployment (AWS)

- **Platform**: AWS (ECS/EKS with Podman containers)
- **Database**: RDS PostgreSQL with read replicas
- **Storage**: S3 with CloudFront CDN
- **Redis**: ElastiCache
- **CI/CD**: GitOps with Terraform + ArgoCD
- **Infrastructure**: Infrastructure as Code (Terraform modules)
- **Container**: Podman-compatible Docker images

### Deployment Pipeline

1. **Code**: Git push to main branch
2. **Build**: Next.js build (TypeScript, Tailwind, Prisma)
3. **Test**: Run test suite (unit, integration, E2E)
4. **Deploy**: Vercel (MVP) or ArgoCD (Phase 2)
5. **Database**: Prisma migrations run automatically
6. **Health check**: Verify deployment success

## Development Environment

### Prerequisites

- **Node.js**: 18.x or higher
- **PostgreSQL**: 16.x (local or Docker)
- **Redis**: 7.x (local or Docker)
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions

### Setup Commands

```bash
# Clone repository
git clone <repository-url>
cd moar-ats

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/moar_ats"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Redis
REDIS_URL="redis://localhost:6379"

# S3 Storage
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="moar-ats-storage"
AWS_REGION="us-east-1"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# AI Services
OPENAI_API_KEY="your-openai-key"
# or
ANTHROPIC_API_KEY="your-anthropic-key"
```

## Architecture Decision Records (ADRs)

### ADR-001: Next.js App Router

**Status:** Accepted  
**Context:** Need full-stack framework for multi-tenant SaaS with SSR/SSG capabilities  
**Decision:** Use Next.js 16.0.4 with App Router  
**Consequences:** Modern React patterns, excellent DX, built-in API routes, Vercel optimization

### ADR-002: PostgreSQL with Row-Level Security

**Status:** Accepted  
**Context:** Multi-tenant SaaS requires strong data isolation  
**Decision:** PostgreSQL 16.x with RLS for tenant isolation  
**Consequences:** Database-level security, prevents data leaks, compliance-ready, scales to 100+ tenants

### ADR-003: Prisma ORM

**Status:** Accepted (Updated 2025-11-27)  
**Context:** Need type-safe database access with excellent TypeScript support and native `pg` adapter optimisations  
**Decision:** Prisma 7.x with `@prisma/adapter-pg`  
**Consequences:** Type safety, better connection pooling and RLS session hooks, access to the latest security patches; legacy references to Prisma 5.x remain compatible but all new code targets 7.x

### ADR-004: Adaptive AI Learning System

**Status:** Accepted  
**Context:** Novel requirement for AI that learns and adapts to recruiter behavior  
**Decision:** Custom adaptive learning system with behavior observation, pattern extraction, and explainability  
**Consequences:** Unique differentiator, requires custom implementation, enables AI that gets better over time

### ADR-005: Vercel/Railway for MVP, AWS/OCI for Phase 2

**Status:** Accepted  
**Context:** Need fast MVP iteration, then enterprise-grade infrastructure  
**Decision:** Start with Vercel or Railway for MVP, migrate to AWS or OCI with GitOps (Terraform + ArgoCD) for Phase 2  
**Consequences:** Fast MVP development, minimal infrastructure complexity, easy migration path when enterprise features needed  
**Reference:** See `docs/deployment/DEPLOYMENT-STRATEGY.md` for detailed deployment plan and migration strategy

### ADR-006: Tailwind CSS v4 Inline Theme

**Status:** Accepted (2025-11-27)  
**Context:** Tailwind v4 replaces `tailwind.config.js` with CSS-first theming; shadcn/ui components must consume the Trust Navy palette defined in CSS variables.  
**Decision:** Adopt Tailwind CSS 4.1.17 with `@theme inline` inside `src/app/globals.css`. All future styling changes extend the global CSS theme rather than resurrecting the legacy config file.  
**Consequences:** Consistent theming, smaller config surface, clearer coupling with the UX spec. Tooling and documentation must reference the CSS-first workflow.

---

## Version Verification

**Verification Date:** 2025-11-25  
**Verification Method:** npm registry queries  
**Verified Versions:**
- Next.js: 16.0.4
- TypeScript: 5.9.3
- Tailwind CSS: 4.1.17
- Prisma: 7.0.1
- Resend: 6.5.2
- create-next-app: 16.0.4

---

_Generated by BMAD Decision Architecture Workflow v1.0_  
_Date: 2025-11-25_  
_For: Gopal_

