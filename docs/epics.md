# MOAR ATS - Epic Breakdown

**Author:** Gopal  
**Date:** 2025-11-25  
**Project Level:** platform  
**Target Scale:** Multi-tenant SaaS (10+ tenants Phase 1, 100+ tenants Phase 2)

---

## Overview

This document provides the complete epic and story breakdown for MOAR ATS, decomposing the requirements from the [PRD](./prd.md) into implementable stories. This breakdown incorporates context from the [UX Design Specification](./ux-design-specification.md) and [Architecture](./architecture.md) documents.

**Living Document Notice:** This is the initial version created from PRD + UX + Architecture. Stories will be enhanced during implementation with additional technical details as needed.

---

## Functional Requirements Inventory

**User Account & Access (FR1-6):**
- FR1: Users can create accounts with email authentication or SSO
- FR2: Users can log in securely and maintain sessions
- FR3: Users can reset passwords via email verification
- FR4: System administrators can manage user accounts and assign roles
- FR5: System enforces role-based access control (RBAC)
- FR6: System supports multi-tenant isolation

**Job Management (FR7-12):**
- FR7: TA leaders and recruiters can create job postings
- FR8: AI can assist in drafting job descriptions
- FR9: Users can edit, publish, unpublish, and archive job postings
- FR10: System supports configurable workflow stages
- FR11: Users can set SLAs for each workflow stage
- FR12: System tracks job posting status and pipeline health metrics

**Candidate Management (FR13-18):**
- FR13: Candidates can apply to jobs through branded candidate portal
- FR14: Recruiters can manually add candidates to the system
- FR15: Recruiters can view candidate profiles with full details
- FR16: Recruiters can move candidates between workflow stages
- FR17: Recruiters can search and filter candidates
- FR18: System supports bulk operations on candidates

**AI-Assisted Resume Processing (FR19-24):**
- FR19: System can parse resumes and extract structured data
- FR20: AI can score resumes against job requirements
- FR21: AI can rank candidates for a job posting
- FR22: System displays AI-generated ranking rationales
- FR23: Recruiters can view, accept, reject, or override AI scores
- FR24: AI learns from recruiter behavior and adapts

**AI-Assisted Outreach & Communication (FR25-28):**
- FR25: AI can draft personalized outreach emails
- FR26: Recruiters can review, edit, and send AI-drafted messages
- FR27: AI learns from candidate response rates and recruiter edits
- FR28: System tracks all candidate communications

**Interview Scheduling (FR30-34):**
- FR30: Recruiters can schedule interviews with candidates
- FR31: System integrates with calendar systems
- FR32: Candidates can view interview invites and confirm/reschedule
- FR33: System sends automated reminders
- FR34: Recruiters can record interview notes and feedback

**Offer Management (FR35-39):**
- FR35: Hiring managers and TA leaders can create offer letters
- FR36: System supports offer approval workflows
- FR37: System can send offer letters to candidates
- FR38: Candidates can view, accept, or decline offers
- FR39: System tracks offer status and updates workflow

**Compliance & Audit (FR40-45):**
- FR40: System captures candidate consent for data processing
- FR41: System maintains immutable audit logs
- FR42: Compliance partners can export candidate data
- FR43: System supports "right to deletion" requests
- FR44: System can generate compliance evidence packs
- FR45: Audit logs are tenant-tagged and searchable

**Multi-Tenancy & Branding (FR46-49):**
- FR46: System supports multiple tenants with complete data isolation
- FR47: Each tenant can customize recruiter and candidate portal branding
- FR48: System administrators can create new tenants
- FR49: All system resources are tenant-tagged

**Integrations (FR50-55):**
- FR50: System integrates with email providers
- FR51: System integrates with calendar systems
- FR52: System provides webhook endpoints for HRIS systems
- FR53: System can consume webhooks from external systems
- FR54: System integrates with object storage
- FR55: Each tenant can enable/disable integrations

**AI Learning & Adaptation (FR56-60):**
- FR56: System observes recruiter behavior
- FR57: System observes candidate behavior
- FR58: AI adapts resume scoring criteria
- FR59: AI adapts outreach message style
- FR60: System provides "AI explainability reports"

**Reporting & Analytics (FR61-64):**
- FR61: TA leaders can view pipeline health metrics
- FR62: System provides dashboards showing AI assist adoption
- FR63: Compliance partners can view compliance status dashboards
- FR64: System supports exporting reports and analytics data

**Data Management (FR65-68):**
- FR65: All candidate data is encrypted at rest and in transit
- FR66: System supports secure authentication
- FR67: System enforces API rate limiting
- FR68: System supports data retention policies

---

## FR Coverage Map

**Epic 1 (Foundation):** Infrastructure needs for all FRs  
**Epic 2 (User Authentication):** FR1, FR2, FR3, FR4, FR5, FR6  
**Epic 3 (Job Management):** FR7, FR8, FR9, FR10, FR11, FR12  
**Epic 4 (Candidate Management):** FR13, FR14, FR15, FR16, FR17, FR18  
**Epic 5 (AI Evaluation):** FR19, FR20, FR21, FR22, FR23, FR24, FR56, FR57, FR58, FR60  
**Epic 6 (Communication):** FR25, FR26, FR27, FR28, FR29, FR59  
**Epic 7 (Interview Scheduling):** FR30, FR31, FR32, FR33, FR34  
**Epic 8 (Offer Management):** FR35, FR36, FR37, FR38, FR39  
**Epic 9 (Compliance):** FR40, FR41, FR42, FR43, FR44, FR45  
**Epic 10 (Multi-Tenant Admin):** FR46, FR47, FR48, FR49  
**Epic 11 (Integrations):** FR50, FR51, FR52, FR53, FR54, FR55  
**Epic 12 (Analytics):** FR61, FR62, FR63, FR64  
**Epic 13 (Data Security):** FR65, FR66, FR67, FR68

---

## Epic 1: Foundation & Infrastructure

**Goal:** Establish project foundation enabling all subsequent work. This epic sets up the core infrastructure, database schema, authentication foundation, and deployment pipeline that all other epics depend on.

### Story 1.1: Project Setup and Initial Configuration

As a **developer**,  
I want **to initialize the Next.js project with TypeScript, Tailwind CSS, and core dependencies**,  
So that **I have a solid foundation for building the multi-tenant ATS platform**.

**Acceptance Criteria:**

**Given** I am setting up a new greenfield project  
**When** I run the project initialization command  
**Then** the project structure is created with:
- Next.js 14+ App Router configured
- TypeScript with strict mode enabled
- Tailwind CSS with utility-first styling
- ESLint configured for code quality
- Source directory (`src/`) organization
- Environment variable template (`.env.example`)
- Git repository initialized with `.gitignore`

**And** the project structure follows the architecture document:
- `src/app/` for Next.js App Router routes
- `src/components/` for React components
- `src/lib/` for utilities and helpers
- `src/types/` for TypeScript types
- `prisma/` for database schema
- `__tests__/` for test files

**And** package.json includes core dependencies:
- `next@latest`
- `react@latest` and `react-dom@latest`
- `typescript@latest`
- `tailwindcss@latest`
- `prisma@5.x`
- `@prisma/client@5.x`

**Prerequisites:** None (this is the first story)

**Technical Notes:**
- Execute: `npx create-next-app@latest moar-ats --typescript --tailwind --app --eslint --src-dir`
- Configure Tailwind with Trust Navy color palette from UX design (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`)
- Set up TypeScript with strict mode for type safety
- Configure ESLint with Next.js recommended rules
- Create `.env.example` with placeholder values for all required environment variables

---

### Story 1.2: Database Schema and Prisma Setup

As a **developer**,  
I want **to set up PostgreSQL database with Prisma ORM and define core multi-tenant schema**,  
So that **all subsequent stories can build on a solid data foundation with tenant isolation**.

**Acceptance Criteria:**

**Given** the project is initialized  
**When** I set up Prisma and define the database schema  
**Then** Prisma is configured with:
- PostgreSQL 16.x connection
- Multi-tenant schema with `tenant_id` on all tables
- Core tables defined: `tenants`, `users`, `job_postings`, `candidates`, `applications`
- Row-level security (RLS) policies for tenant isolation
- Timestamps (`created_at`, `updated_at`) on all tables
- Proper relationships between tables (foreign keys)

**And** the schema includes:
- `tenants` table: `id`, `name`, `slug`, `settings` (JSON), `created_at`, `updated_at`
- `users` table: `id`, `tenant_id`, `email`, `name`, `role`, `password_hash`, `created_at`, `updated_at`
- `job_postings` table: `id`, `tenant_id`, `title`, `description`, `requirements` (JSON), `status`, `created_at`, `updated_at`
- `candidates` table: `id`, `tenant_id`, `email`, `name`, `resume_url`, `linkedin_id`, `created_at`, `updated_at`
- `applications` table: `id`, `tenant_id`, `candidate_id`, `job_id`, `status`, `ai_score`, `created_at`, `updated_at`

**And** Prisma migrations are set up:
- Initial migration created
- Migration commands work (`prisma migrate dev`)
- Seed script template created for development data

**Prerequisites:** Story 1.1 (Project Setup)

**Technical Notes:**
- Use Prisma 5.x with TypeScript
- Configure `DATABASE_URL` in `.env.local`
- Set up Prisma client with tenant-aware middleware (see Architecture section 6.2)
- Define RLS policies at database level (PostgreSQL native RLS)
- Use `uuid` type for all IDs (UUID v4)
- Store JSON fields for flexible data (requirements, settings)
- Create indexes on `tenant_id` columns for performance

---

### Story 1.3: Authentication Foundation with NextAuth.js

As a **developer**,  
I want **to set up NextAuth.js v5 (Auth.js) with email/password authentication**,  
So that **users can securely log in and sessions are managed properly**.

**Acceptance Criteria:**

**Given** the database schema is set up  
**When** I configure NextAuth.js  
**Then** authentication is set up with:
- NextAuth.js v5 (Auth.js) installed and configured
- Email/password provider enabled
- Session management with JWT tokens
- Password hashing using bcrypt (minimum 10 rounds)
- Secure session timeout (default 8 hours inactivity)
- Protected API routes middleware

**And** the authentication flow works:
- Users can register with email and password
- Users can log in with email and password
- Sessions persist across page refreshes
- Logout clears session and redirects to login
- Protected routes redirect unauthenticated users to login

**And** security requirements are met:
- Passwords must be minimum 8 characters with complexity requirements (1 uppercase, 1 number, 1 special character)
- Passwords are hashed before storage (never stored in plain text)
- Session tokens are signed with `NEXTAUTH_SECRET`
- CSRF protection enabled
- Secure cookie settings (httpOnly, secure in production)

**Prerequisites:** Story 1.2 (Database Schema)

**Technical Notes:**
- Install: `npm install next-auth@beta @auth/prisma-adapter bcryptjs`
- Configure NextAuth in `src/lib/auth/config.ts`
- Create API route: `src/app/api/auth/[...nextauth]/route.ts`
- Set up Prisma adapter for NextAuth
- Configure environment variables: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- Create login page: `src/app/(auth)/login/page.tsx`
- Use Trust Navy theme colors for login UI (primary: `#1e3a5f`)
- Implement password validation on frontend and backend
- Add rate limiting for login attempts (5 attempts per hour per IP)

---

### Story 1.4: Multi-Tenant Middleware and Row-Level Security

As a **developer**,  
I want **to implement tenant-aware middleware and database RLS policies**,  
So that **all data access is automatically filtered by tenant_id and data isolation is enforced**.

**Acceptance Criteria:**

**Given** authentication is set up  
**When** I implement multi-tenant middleware  
**Then** tenant isolation is enforced with:
- Next.js middleware that extracts tenant_id from request (session, subdomain, or header)
- Prisma middleware that automatically filters queries by tenant_id
- Database RLS policies that prevent cross-tenant data access
- Tenant context available in all API routes and components

**And** the middleware handles:
- Extracting tenant_id from authenticated user's session
- Setting tenant context for all database queries
- Validating tenant_id on all API requests
- Returning 403 Forbidden if user tries to access another tenant's data
- Logging all tenant access attempts for audit

**And** RLS policies are configured:
- All tables have RLS enabled
- Policies check `tenant_id` matches authenticated user's tenant
- System admins can bypass RLS (for tenant management)
- Policies are tested to prevent data leaks

**Prerequisites:** Story 1.3 (Authentication Foundation)

**Technical Notes:**
- Create `src/middleware.ts` for Next.js middleware
- Implement `src/lib/db/rls.ts` for Prisma RLS helpers
- Configure Prisma client with tenant middleware in `src/lib/db/prisma.ts`
- Set up PostgreSQL RLS policies using Prisma migrations
- Create `src/hooks/useTenant.ts` for React tenant context
- Test tenant isolation with unit tests (attempt cross-tenant access, verify blocked)
- Add tenant_id to all API route handlers
- Log tenant access in audit logs (for compliance)

---

### Story 1.5: Core UI Component Library Setup

As a **developer**,  
I want **to set up shadcn/ui component library with Trust Navy theme**,  
So that **I have reusable, accessible UI components that match the design system**.

**Acceptance Criteria:**

**Given** the project is set up with Tailwind CSS  
**When** I install and configure shadcn/ui  
**Then** the component library is set up with:
- shadcn/ui installed and configured
- Trust Navy color theme applied (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`)
- Core components available: Button, Input, Card, Modal, Toast, Form
- Typography system configured (Roboto Slab for headings, Roboto for body)
- Spacing system using 4px base unit
- Accessibility features enabled (ARIA labels, keyboard navigation)

**And** components follow UX design specifications:
- Button hierarchy: Primary (Deep Navy), Secondary (Rich Blue), Tertiary (Outline)
- Form inputs with labels above fields, required field indicators
- Error states with inline messages below fields
- Loading states with skeleton screens and spinners
- Responsive breakpoints: mobile (max 767px), tablet (768-1023px), desktop (min 1024px)

**And** components are accessible:
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader compatible (ARIA labels)
- Color contrast ratios meet standards (4.5:1 for text, 3:1 for interactive)

**Prerequisites:** Story 1.1 (Project Setup)

**Technical Notes:**
- Install shadcn/ui: `npx shadcn-ui@latest init`
- Configure `tailwind.config.js` with Trust Navy colors from UX design
- Set up `src/components/ui/` directory structure
- Install core components: `npx shadcn-ui@latest add button input card dialog toast form`
- Configure typography in `tailwind.config.js` (Roboto Slab, Roboto fonts)
- Set up 4px spacing scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- Test components with keyboard navigation and screen readers
- Create component showcase page for reference

---

### Story 1.6: Development Environment and Deployment Pipeline

As a **developer**,  
I want **to set up development environment, testing framework, and basic deployment pipeline**,  
So that **I can develop, test, and deploy the application efficiently**.

**Acceptance Criteria:**

**Given** the project is set up  
**When** I configure development and deployment tools  
**Then** the development environment includes:
- Local PostgreSQL database (Docker or local install)
- Redis for background jobs (Docker or local install)
- Environment variable management (`.env.local`, `.env.example`)
- Hot reloading for development (`npm run dev`)
- TypeScript type checking in watch mode

**And** testing framework is set up:
- Jest configured for unit tests
- React Testing Library for component tests
- Playwright configured for E2E tests
- Test scripts in package.json (`npm test`, `npm run test:e2e`)
- Example test files demonstrating patterns

**And** deployment pipeline is configured:
- Vercel project connected (for MVP deployment)
- Environment variables configured in Vercel dashboard
- Automatic deployments on git push to main branch
- Build script that runs Prisma migrations
- Health check endpoint for deployment verification

**Prerequisites:** Story 1.2 (Database Schema), Story 1.3 (Authentication)

**Technical Notes:**
- Set up Docker Compose for local PostgreSQL and Redis (optional)
- Configure `package.json` scripts: `dev`, `build`, `start`, `test`, `test:e2e`, `lint`
- Install testing dependencies: `jest`, `@testing-library/react`, `@playwright/test`
- Create `docker-compose.yml` for local development (PostgreSQL, Redis)
- Set up Vercel project and configure environment variables
- Create health check API route: `src/app/api/health/route.ts`
- Document development setup in README.md
- Create `.env.example` with all required variables documented

---

**Epic 1 Review Summary:**

**Epic 1: Foundation & Infrastructure**  
**Goal:** Establish project foundation enabling all subsequent work

**Stories (6 total):**
1. Project Setup and Initial Configuration
2. Database Schema and Prisma Setup
3. Authentication Foundation with NextAuth.js
4. Multi-Tenant Middleware and Row-Level Security
5. Core UI Component Library Setup
6. Development Environment and Deployment Pipeline

**FRs Covered:** Infrastructure needs for all FRs (enables everything)

**Review Questions:**
- ✅ Story sequence is logical (setup → database → auth → multi-tenancy → UI → deployment)
- ✅ Acceptance criteria are clear and testable
- ✅ All foundation requirements are covered
- ✅ Stories are sized appropriately for single dev agent session
- ✅ Technical notes provide implementation guidance

**Status:** Ready to proceed to Epic 2

---

## Epic 2: User Authentication & Access

**Goal:** Users can securely access the system with proper permissions. This epic enables all user-facing features by establishing secure authentication, role-based access control, and multi-tenant user management.

### Story 2.1: User Registration with Email Authentication

As a **new user**,  
I want **to create an account with email and password**,  
So that **I can access the MOAR ATS platform securely**.

**Acceptance Criteria:**

**Given** I am a new user visiting the registration page  
**When** I fill out the registration form  
**Then** I can register with:
- Email address (validated with RFC 5322 format)
- Password (minimum 8 characters, 1 uppercase, 1 number, 1 special character)
- Full name (required field)
- Tenant selection (for Phase 2) or auto-assigned to default tenant (Phase 1)

**And** the registration form includes:
- Email field with validation (shows error if invalid format)
- Password field with strength meter (visual feedback: weak/medium/strong)
- Password confirmation field (must match password)
- Full name field (required, minimum 2 characters)
- Submit button (Deep Navy primary button, disabled until form valid)
- Link to login page ("Already have an account? Sign in")

**And** after successful registration:
- User account is created in database with hashed password
- Email verification token is generated (for future email verification story)
- User is automatically logged in and redirected to dashboard
- Welcome message is displayed (toast notification)
- Session is established with NextAuth.js

**And** error handling works:
- Duplicate email shows error: "Email already registered"
- Weak password shows inline error with requirements
- Network errors show user-friendly message with retry option
- Form validation errors appear below each field (red border, error message)

**Prerequisites:** Story 1.3 (Authentication Foundation)

**Technical Notes:**
- Create registration page: `src/app/(auth)/register/page.tsx`
- Use Trust Navy theme (primary button: `#1e3a5f`)
- Implement email validation regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password strength calculation: check length, uppercase, number, special character
- Use shadcn/ui Form component with React Hook Form
- Hash password with bcrypt (10 rounds minimum)
- Create API route: `src/app/api/auth/register/route.ts`
- Store user in `users` table with `tenant_id` from session or default
- Generate UUID for user ID
- Log registration event in audit logs (for compliance)
- Rate limit registration endpoint (prevent abuse: 5 registrations per hour per IP)

---

### Story 2.2: User Login and Session Management

As a **registered user**,  
I want **to log in with my email and password**,  
So that **I can access my account and maintain my session across devices**.

**Acceptance Criteria:**

**Given** I am a registered user  
**When** I visit the login page  
**Then** I can log in with:
- Email address and password
- "Remember me" checkbox (extends session to 30 days if checked, 8 hours if not)
- "Forgot password?" link (navigates to password reset)
- Link to registration ("Don't have an account? Sign up")

**And** the login form includes:
- Email input field (autofocus on page load)
- Password input field with show/hide toggle
- Remember me checkbox (optional)
- Submit button (Deep Navy primary, shows loading state during login)
- Error message display area (below form, red text)

**And** after successful login:
- User session is created with NextAuth.js
- User is redirected to dashboard (or originally requested page)
- Success toast notification: "Welcome back, [Name]!"
- Session persists across page refreshes
- Session timeout: 8 hours inactivity (or 30 days if "Remember me" checked)

**And** security features work:
- Rate limiting: 5 failed login attempts per hour per IP (then 15-minute lockout)
- Failed login shows generic error: "Invalid email or password" (don't reveal which is wrong)
- Account lockout message after 5 failed attempts: "Too many failed attempts. Please try again in 15 minutes."
- CSRF protection enabled
- Secure cookie settings (httpOnly, secure in production, sameSite: 'lax')

**And** error handling:
- Invalid credentials show error message
- Network errors show: "Connection error. Please try again."
- Account locked shows lockout message with countdown timer
- Form validation errors appear inline

**Prerequisites:** Story 2.1 (User Registration)

**Technical Notes:**
- Use existing NextAuth.js login page: `src/app/(auth)/login/page.tsx`
- Configure NextAuth credentials provider
- Implement rate limiting in API route using Redis or in-memory store
- Track failed login attempts per IP address
- Use NextAuth session callback to include user role and tenant_id
- Create session management utilities: `src/lib/auth/session.ts`
- Log all login attempts (success and failure) in audit logs
- Set up session timeout middleware
- Test session persistence across browser tabs and devices
- Implement "Remember me" with extended session expiry

---

### Story 2.3: Password Reset Flow

As a **user who forgot my password**,  
I want **to reset my password via email verification**,  
So that **I can regain access to my account securely**.

**Acceptance Criteria:**

**Given** I forgot my password  
**When** I click "Forgot password?" on login page  
**Then** I can request password reset with:
- Email input field
- Submit button ("Send Reset Link")
- Message: "Enter your email and we'll send you a reset link"
- Link back to login page

**And** after submitting email:
- If email exists: Reset token is generated (cryptographically secure, expires in 1 hour)
- Email is sent with reset link (using Resend API)
- Success message: "If that email exists, we've sent a reset link. Check your inbox."
- Reset link format: `/reset-password?token={secure-token}`
- Token is stored in database with expiry timestamp

**And** when user clicks reset link:
- Token is validated (exists, not expired, not used)
- Password reset form is displayed:
  - New password field (with strength meter)
  - Confirm password field
  - Submit button ("Reset Password")
- If token invalid/expired: Error message and link to request new reset

**And** after password reset:
- Password is hashed and updated in database
- Reset token is marked as used (cannot be reused)
- User is automatically logged in
- Success message: "Password reset successful. You are now logged in."
- User is redirected to dashboard
- Email notification sent: "Your password was reset"

**And** security requirements:
- Reset tokens expire after 1 hour
- Tokens can only be used once
- Rate limiting: 3 reset requests per hour per email
- Generic success message (don't reveal if email exists)
- Token is cryptographically secure (32+ character random string)

**Prerequisites:** Story 2.2 (User Login)

**Technical Notes:**
- Create password reset request page: `src/app/(auth)/forgot-password/page.tsx`
- Create password reset page: `src/app/(auth)/reset-password/page.tsx`
- Create API route: `src/app/api/auth/reset-password/route.ts`
- Generate secure token: `crypto.randomBytes(32).toString('hex')`
- Store reset tokens in database: `password_reset_tokens` table (token, user_id, expires_at, used_at)
- Use Resend API to send reset emails (React Email templates)
- Create email template: `src/lib/email/templates/password-reset.tsx`
- Implement token validation (check exists, not expired, not used)
- Hash new password with bcrypt before storing
- Log password reset events in audit logs
- Clean up expired tokens (cron job or on-demand)

---

### Story 2.4: Role-Based Access Control (RBAC) Implementation

As a **system administrator**,  
I want **to assign roles to users and enforce permissions**,  
So that **users can only access features appropriate to their role**.

**Acceptance Criteria:**

**Given** RBAC is implemented  
**When** a user accesses the system  
**Then** permissions are enforced based on role:
- **Recruiter:** Can view own pipeline, create jobs, manage candidates, send outreach, schedule interviews
- **Hiring Manager:** Can view assigned roles, score candidates, make offers (with approval)
- **TA Leader:** Can view all data, create jobs, configure workflows, view analytics, manage AI policies
- **Compliance Partner:** Can view audit logs, export compliance data, view compliance dashboards
- **System Admin:** Can manage users, create tenants, configure system settings

**And** RBAC is enforced at:
- API route level (middleware checks permissions)
- Database query level (RLS policies respect roles)
- UI component level (features hidden/disabled based on role)
- Navigation level (menu items filtered by role)

**And** permission checks work:
- Unauthorized API calls return 403 Forbidden
- Unauthorized UI features are hidden (not just disabled)
- Permission denied messages are user-friendly: "You don't have permission to perform this action"
- All permission checks are logged in audit trail

**And** role management features:
- System admins can assign roles to users (via user management UI)
- Roles are stored in `users.role` column (enum: recruiter, hiring_manager, ta_leader, compliance_partner, system_admin)
- Role changes are logged in audit trail
- Role assignments are tenant-scoped (users can only be assigned roles within their tenant)

**Prerequisites:** Story 1.4 (Multi-Tenant Middleware), Story 2.2 (User Login)

**Technical Notes:**
- Create RBAC utilities: `src/lib/auth/permissions.ts`
- Define permission matrix: `src/types/permissions.ts`
- Create middleware: `src/lib/auth/require-permission.ts`
- Implement permission checks in API routes: `src/app/api/**/route.ts`
- Create React hook: `src/hooks/usePermissions.ts`
- Filter navigation menu based on permissions: `src/components/navigation/Sidebar.tsx`
- Create permission constants: `RECRUITER_PERMISSIONS`, `HIRING_MANAGER_PERMISSIONS`, etc.
- Test permission enforcement with unit tests (attempt unauthorized access, verify blocked)
- Log all permission checks in audit logs
- Create user role management UI (for system admins): `src/app/(admin)/users/page.tsx`

---

### Story 2.5: User Account Management (Admin)

As a **system administrator**,  
I want **to manage user accounts (create, edit, deactivate, assign roles)**,  
So that **I can control who has access to the system and what they can do**.

**Acceptance Criteria:**

**Given** I am a system administrator  
**When** I access the user management page  
**Then** I can:
- View list of all users in my tenant (paginated, searchable, filterable by role)
- Create new user accounts (email, name, role, tenant assignment)
- Edit user details (name, role, active status)
- Deactivate user accounts (soft delete, user cannot log in)
- Reactivate deactivated accounts
- Assign/change user roles
- View user activity (last login, account creation date)

**And** the user management UI includes:
- User list table with columns: Name, Email, Role, Status, Last Login, Actions
- Search bar (filter by name or email)
- Role filter dropdown (filter by role)
- Status filter (Active/Inactive)
- "Create User" button (Deep Navy primary)
- Edit button per user (opens modal)
- Deactivate/Activate button per user (with confirmation)

**And** user creation form includes:
- Email field (required, validated)
- Full name field (required)
- Role dropdown (required, options: Recruiter, Hiring Manager, TA Leader, Compliance Partner, System Admin)
- Tenant selection (for Phase 2, auto-assigned in Phase 1)
- "Send welcome email" checkbox (optional)
- Submit button ("Create User")

**And** security and validation:
- Only system admins can access user management
- Email must be unique within tenant
- Role changes are logged in audit trail
- Deactivation prevents login but preserves data (soft delete)
- Confirmation required for deactivation: "Are you sure you want to deactivate [User Name]?"

**And** user management actions:
- Create user: Account created, welcome email sent (if checked), success toast
- Edit user: Changes saved, success toast, audit log entry
- Deactivate user: User cannot log in, data preserved, audit log entry
- Reactivate user: User can log in again, audit log entry

**Prerequisites:** Story 2.4 (RBAC Implementation)

**Technical Notes:**
- Create user management page: `src/app/(admin)/users/page.tsx`
- Create API routes: `src/app/api/users/route.ts` (GET, POST), `src/app/api/users/[id]/route.ts` (GET, PUT, DELETE)
- Create user creation modal: `src/components/admin/CreateUserModal.tsx`
- Create user edit modal: `src/components/admin/EditUserModal.tsx`
- Implement soft delete: Add `deactivated_at` column to `users` table
- Filter deactivated users from login queries
- Create welcome email template: `src/lib/email/templates/welcome.tsx`
- Use React Query for user list data fetching
- Implement pagination (20 users per page)
- Add search and filter functionality
- Log all user management actions in audit trail
- Test permission enforcement (non-admins cannot access)

---

**Epic 2 Review Summary:**

**Epic 2: User Authentication & Access**  
**Goal:** Users can securely access the system with proper permissions

**Stories (5 total):**
1. User Registration with Email Authentication
2. User Login and Session Management
3. Password Reset Flow
4. Role-Based Access Control (RBAC) Implementation
5. User Account Management (Admin)

**FRs Covered:** FR1, FR2, FR3, FR4, FR5, FR6

**Review Questions:**
- ✅ Story sequence is logical (register → login → reset → RBAC → management)
- ✅ Acceptance criteria are clear and testable
- ✅ All authentication and access requirements are covered
- ✅ Stories are sized appropriately for single dev agent session
- ✅ Security requirements are detailed (rate limiting, token expiry, etc.)

**Status:** Ready to proceed to Epic 3

---

## Epic 3: Job Posting & Management

**Goal:** Recruiters can create, manage, and track job postings. This epic enables the core workflow of posting jobs and receiving applications.

### Story 3.1: Create Job Posting with Basic Details

As a **recruiter or TA leader**,  
I want **to create a new job posting with title, description, and requirements**,  
So that **I can attract candidates for open positions**.

**Acceptance Criteria:**

**Given** I am logged in as a recruiter or TA leader  
**When** I navigate to "Create Job" page  
**Then** I can create a job posting with:
- Job title (required, minimum 3 characters, maximum 100 characters)
- Job description (required, rich text editor, minimum 50 characters)
- Requirements list (required, at least 1 requirement, can add multiple)
- Location (optional, text field)
- Employment type (required, dropdown: Full-time, Part-time, Contract, Internship)
- Department (optional, text field)
- Salary range (optional, min-max fields)

**And** the job creation form includes:
- Form layout following Dense Dashboard design (3-column layout)
- Rich text editor for description (supports formatting: bold, italic, lists, links)
- Dynamic requirements list (add/remove requirements, each requirement is a text field)
- Form validation (required fields highlighted if empty, error messages below fields)
- "Save Draft" button (secondary, saves without publishing)
- "Publish Job" button (primary Deep Navy, publishes job and makes it live)

**And** after creating job:
- Job is saved to database with status: "draft" (if Save Draft) or "published" (if Publish)
- Success toast notification: "Job '[Title]' created successfully"
- User is redirected to job detail page
- Job appears in job list (if published) or drafts list (if draft)
- Audit log entry created: "job.created"

**And** validation and error handling:
- Required fields show error if empty on submit
- Description minimum length enforced (50 characters)
- At least 1 requirement required
- Network errors show: "Failed to create job. Please try again."
- Form preserves data on validation errors (don't lose user input)

**Prerequisites:** Story 2.4 (RBAC Implementation), Story 1.2 (Database Schema)

**Technical Notes:**
- Create job creation page: `src/app/(recruiter)/jobs/new/page.tsx`
- Create API route: `src/app/api/jobs/route.ts` (POST)
- Use React Hook Form for form management
- Install rich text editor: `@tiptap/react` or `react-quill`
- Create job posting form component: `src/components/recruiter/JobPostingForm.tsx`
- Store job in `job_postings` table with `tenant_id`
- Use UUID for job ID
- Set default status: "draft"
- Implement draft saving (auto-save every 30 seconds, manual save button)
- Log job creation in audit trail
- Test form validation and error handling

---

### Story 3.2: AI-Assisted Job Description Drafting

As a **recruiter**,  
I want **AI to assist me in drafting job descriptions**,  
So that **I can create compelling, complete job postings faster**.

**Acceptance Criteria:**

**Given** I am creating a job posting  
**When** I click "AI Assist" button in the description field  
**Then** AI generates a job description draft with:
- Job title analysis (suggests improvements if needed)
- Comprehensive job description (includes: overview, responsibilities, requirements, benefits)
- Suggested requirements list (based on job title and industry standards)
- Professional tone and formatting

**And** the AI assist feature includes:
- "Generate with AI" button (Bright Blue accent color, `#42a5f5`)
- Loading state (spinner, "AI is drafting your job description...")
- Generated content displayed in rich text editor (editable)
- "Regenerate" button (if user wants different version)
- "Use This" button (accepts generated content)
- "Discard" button (rejects generated content, returns to manual entry)

**And** AI generation works:
- User provides: Job title, department (optional), employment type
- AI uses OpenAI/Anthropic API to generate description
- Generation completes in <5 seconds (show progress indicator)
- Generated content is editable (user can modify before saving)
- AI explanations shown: "Generated based on: [job title, department]"

**And** error handling:
- AI generation failures show: "AI assist unavailable. Please write manually."
- Network errors show retry option
- Timeout after 10 seconds (fallback to manual entry)

**Prerequisites:** Story 3.1 (Create Job Posting)

**Technical Notes:**
- Create AI service: `src/lib/ai/job-description.ts`
- Integrate OpenAI/Anthropic API
- Create API route: `src/app/api/ai/generate-job-description/route.ts`
- Add AI assist button to job posting form
- Implement loading states and error handling
- Cache AI prompts for common job types (optional optimization)
- Log AI usage in audit trail (for compliance and analytics)
- Test AI generation with various job titles
- Add rate limiting for AI endpoints (prevent abuse)

---

### Story 3.3: Edit, Publish, Unpublish, and Archive Job Postings

As a **recruiter or TA leader**,  
I want **to edit, publish, unpublish, and archive job postings**,  
So that **I can manage job postings throughout their lifecycle**.

**Acceptance Criteria:**

**Given** I have created job postings  
**When** I view the job list or job detail page  
**Then** I can:
- Edit job details (title, description, requirements, etc.)
- Publish draft jobs (makes job visible to candidates)
- Unpublish published jobs (hides from candidates, keeps in system)
- Archive jobs (marks as archived, removes from active list)

**And** the job management UI includes:
- Job list page with status badges (Draft, Published, Archived)
- Job detail page with edit button (if user has permission)
- Action buttons per job: Edit, Publish/Unpublish, Archive
- Status filter (All, Draft, Published, Archived)
- Search functionality (search by title, description)

**And** edit functionality:
- Edit form pre-populated with existing job data
- Same validation as create form
- "Save Changes" button (updates job, preserves status)
- "Cancel" button (discards changes, returns to detail page)
- Success toast: "Job '[Title]' updated successfully"

**And** publish/unpublish workflow:
- Publish: Changes status from "draft" to "published", job becomes visible to candidates
- Unpublish: Changes status from "published" to "draft", job hidden from candidates
- Confirmation modal: "Are you sure you want to [publish/unpublish] this job?"
- Status change logged in audit trail

**And** archive functionality:
- Archive: Changes status to "archived", removes from active job list
- Confirmation modal: "Are you sure you want to archive '[Job Title]'? Archived jobs can be restored later."
- Archived jobs visible in "Archived" filter
- Can restore archived jobs (changes status back to "draft")

**And** permissions:
- Recruiters can edit/publish their own jobs
- TA leaders can edit/publish any job in their tenant
- All actions logged in audit trail

**Prerequisites:** Story 3.1 (Create Job Posting)

**Technical Notes:**
- Create job list page: `src/app/(recruiter)/jobs/page.tsx`
- Create job detail page: `src/app/(recruiter)/jobs/[id]/page.tsx`
- Create API routes: `src/app/api/jobs/[id]/route.ts` (GET, PUT, DELETE)
- Implement status transitions: draft → published → archived
- Add status enum to Prisma schema: `draft | published | archived`
- Create job status badge component: `src/components/recruiter/JobStatusBadge.tsx`
- Implement search and filter functionality
- Add confirmation modals for status changes
- Log all job management actions in audit trail
- Test permission enforcement (recruiters can only edit own jobs)

---

### Story 3.4: Configurable Workflow Stages

As a **TA leader**,  
I want **to configure workflow stages for job postings**,  
So that **I can customize the candidate pipeline to match our hiring process**.

**Acceptance Criteria:**

**Given** I am a TA leader  
**When** I configure workflow stages for a job or tenant  
**Then** I can:
- Define custom workflow stages (e.g., Applied → Screening → Phone Interview → Onsite → Offer → Hired)
- Set default workflow stages (Applied → Screening → Interview → Offer → Hired)
- Reorder stages (drag and drop)
- Add/remove stages
- Set stage names and descriptions

**And** the workflow configuration UI includes:
- Workflow stages list (editable, reorderable)
- "Add Stage" button (adds new stage to list)
- Delete button per stage (with confirmation)
- Drag handle for reordering (visual feedback during drag)
- Stage name field (required, unique within workflow)
- Stage description field (optional)

**And** workflow stages are applied:
- Per-job workflow (each job can have custom stages)
- Tenant-level default workflow (applies to all new jobs)
- Stages are used in candidate pipeline (Kanban board columns)
- Stage changes affect existing candidates (migrate to new stage structure)

**And** default stages provided:
- Applied (initial stage for new applications)
- Screening (resume review, initial assessment)
- Interview (phone, video, or onsite interviews)
- Offer (offer extended, pending response)
- Hired (candidate accepted offer)
- Rejected (candidate rejected or not selected)

**Prerequisites:** Story 3.3 (Edit Job Postings)

**Technical Notes:**
- Create workflow configuration page: `src/app/(recruiter)/jobs/[id]/workflow/page.tsx`
- Create tenant workflow settings: `src/app/(admin)/settings/workflow/page.tsx`
- Store workflow stages in database: `workflow_stages` table (job_id, tenant_id, name, order, description)
- Implement drag-and-drop reordering: `@dnd-kit/core` or `react-beautiful-dnd`
- Create workflow stage component: `src/components/recruiter/WorkflowStage.tsx`
- Validate stage names (unique, not empty)
- Migrate existing candidates when workflow changes
- Log workflow configuration changes in audit trail
- Test workflow customization and candidate migration

---

### Story 3.5: SLA Tracking for Workflow Stages

As a **TA leader**,  
I want **to set SLAs (service level agreements) for each workflow stage**,  
So that **I can ensure timely candidate processing and track performance**.

**Acceptance Criteria:**

**Given** I have configured workflow stages  
**When** I set SLAs for stages  
**Then** I can:
- Set SLA duration for each stage (e.g., "Respond to candidates within 48 hours")
- Define SLA in hours or days
- Set different SLAs per job or use tenant defaults
- View SLA status for candidates (on track, at risk, overdue)

**And** the SLA configuration UI includes:
- SLA settings per workflow stage
- Duration input (number + unit: hours/days)
- "Use Default" checkbox (uses tenant-level SLA)
- "Save SLA Settings" button
- Visual indicator: Green (on track), Yellow (at risk), Red (overdue)

**And** SLA tracking works:
- System calculates time spent in each stage
- Compares against SLA duration
- Updates status in real-time (on track → at risk → overdue)
- Sends notifications when SLA is at risk (75% of duration) or overdue
- Displays SLA status in candidate cards and pipeline view

**And** SLA reporting:
- Dashboard shows SLA compliance metrics (% on time, average time per stage)
- Filter candidates by SLA status (at risk, overdue)
- Export SLA reports (CSV/JSON)

**Prerequisites:** Story 3.4 (Configurable Workflow Stages)

**Technical Notes:**
- Add SLA fields to `workflow_stages` table: `sla_hours`, `sla_days`
- Create SLA calculation utility: `src/lib/workflow/sla.ts`
- Track stage entry timestamp: `applications.stage_entered_at`
- Create SLA status component: `src/components/recruiter/SLAStatusBadge.tsx`
- Implement SLA notifications: `src/lib/notifications/sla-alerts.ts`
- Create SLA dashboard: `src/app/(recruiter)/dashboard/sla/page.tsx`
- Calculate SLA status: `(current_time - stage_entered_at) / sla_duration`
- Test SLA calculations and notifications
- Log SLA violations in audit trail

---

### Story 3.6: Job Posting Status and Pipeline Health Metrics

As a **TA leader**,  
I want **to view job posting status and pipeline health metrics**,  
So that **I can track hiring progress and identify bottlenecks**.

**Acceptance Criteria:**

**Given** I have job postings with candidates  
**When** I view the job dashboard  
**Then** I can see:
- Job status overview (number of jobs: draft, published, archived)
- Application counts per job (total applications, by stage)
- Pipeline health metrics (conversion rates between stages)
- Time-to-fill metrics (average days from posting to offer)
- Active vs. inactive jobs

**And** the dashboard includes:
- Job list with metrics columns (Applications, In Pipeline, Offers, Hired)
- Pipeline health visualization (funnel chart showing stage conversions)
- Time-to-fill chart (bar chart showing days per job)
- Filter options (date range, status, department)
- Export functionality (CSV/JSON)

**And** pipeline health metrics show:
- Stage conversion rates (% moving from one stage to next)
- Drop-off points (where candidates are getting stuck)
- Average time in each stage
- Bottleneck identification (stages with longest average time)

**And** real-time updates:
- Metrics update automatically as candidates move through pipeline
- Dashboard refreshes every 30 seconds (or on manual refresh)
- Loading states during data fetch

**Prerequisites:** Story 3.5 (SLA Tracking)

**Technical Notes:**
- Create job dashboard page: `src/app/(recruiter)/dashboard/jobs/page.tsx`
- Create analytics API: `src/app/api/analytics/jobs/route.ts`
- Use React Query for data fetching with auto-refresh
- Install charting library: `recharts` or `chart.js`
- Calculate conversion rates: `(candidates_in_next_stage / candidates_in_current_stage) * 100`
- Calculate time-to-fill: `AVG(offer_date - posted_date)` per job
- Implement caching for performance (metrics calculated every 5 minutes)
- Create pipeline health visualization component: `src/components/analytics/PipelineHealthChart.tsx`
- Test metric calculations and dashboard performance
- Log dashboard access in audit trail

---

**Epic 3 Review Summary:**

**Epic 3: Job Posting & Management**  
**Goal:** Recruiters can create, manage, and track job postings

**Stories (6 total):**
1. Create Job Posting with Basic Details
2. AI-Assisted Job Description Drafting
3. Edit, Publish, Unpublish, and Archive Job Postings
4. Configurable Workflow Stages
5. SLA Tracking for Workflow Stages
6. Job Posting Status and Pipeline Health Metrics

**FRs Covered:** FR7, FR8, FR9, FR10, FR11, FR12

**Review Questions:**
- ✅ Story sequence is logical (create → AI assist → manage → configure → track → metrics)
- ✅ Acceptance criteria are clear and testable
- ✅ All job management requirements are covered
- ✅ Stories are sized appropriately for single dev agent session
- ✅ UX design details incorporated (Dense Dashboard layout, Trust Navy theme)

**Status:** Ready to proceed to Epic 4

---

## Epic 4: Candidate Application & Management

**Goal:** Candidates can apply to jobs and recruiters can manage them through the pipeline. This epic enables the core candidate workflow from application to hiring decision.

### Story 4.1: Candidate Portal - Job Application Flow

As a **candidate**,  
I want **to apply to a job posting through the candidate portal**,  
So that **I can submit my application easily and track my status**.

**Acceptance Criteria:**

**Given** I am viewing a published job posting  
**When** I click "Apply Now" button  
**Then** I can apply with:
- LinkedIn OAuth login (one-click, auto-fills profile data)
- OR email/password registration (if no LinkedIn)
- Resume upload (PDF/DOCX, max 10MB, validated file type)
- Basic information (name, email, phone - auto-filled from LinkedIn if available)
- Optional cover letter (rich text, max 1000 characters)
- Consent checkbox (required, for DPDP/GDPR compliance)

**And** the application form includes:
- LinkedIn OAuth button (primary, Bright Blue `#42a5f5`, LinkedIn logo)
- Email fallback option ("Or apply with email")
- Resume upload (drag-and-drop or file picker, shows file name after upload)
- Form fields (name, email, phone) - pre-filled if LinkedIn used
- Cover letter textarea (optional, character counter)
- Consent checkbox: "I consent to data processing per DPDP/GDPR" (required)
- "Submit Application" button (Deep Navy primary)
- Progress indicator (shows upload progress for resume)

**And** after submitting application:
- Application is saved to database with status: "applied"
- Candidate receives confirmation email
- Application appears in recruiter pipeline (Applied stage)
- Candidate can view application status in candidate portal
- Success message: "Application submitted! Check your email for confirmation."

**And** validation and error handling:
- Resume file type validated (PDF, DOCX only)
- Resume size validated (max 10MB)
- Required fields validated (name, email, resume, consent)
- Email format validated (RFC 5322)
- Network errors show: "Failed to submit. Please try again."
- File upload errors show: "File upload failed. Please try again."

**Prerequisites:** Story 3.1 (Create Job Posting), Story 2.2 (User Login)

**Technical Notes:**
- Create candidate portal: `src/app/(candidate)/apply/[jobId]/page.tsx`
- Integrate LinkedIn OAuth: `src/lib/integrations/linkedin.ts`
- Create application form: `src/components/candidate/ApplicationForm.tsx`
- Upload resume to S3: `src/lib/storage/s3.ts` (tenant-prefixed: `s3://moar-ats/{tenant_id}/resumes/`)
- Store application in `applications` table with `candidate_id`, `job_id`, `status: 'applied'`
- Create candidate record if new (from LinkedIn or email)
- Send confirmation email: `src/lib/email/templates/application-confirmation.tsx`
- Log application submission in audit trail
- Test LinkedIn OAuth flow and file upload
- Implement rate limiting (prevent spam: 5 applications per hour per email)

---

### Story 4.2: Recruiter Pipeline View (Kanban Board)

As a **recruiter**,  
I want **to view candidates in a Kanban board organized by workflow stages**,  
So that **I can see the pipeline at a glance and manage candidates efficiently**.

**Acceptance Criteria:**

**Given** I am a recruiter viewing the pipeline  
**When** I access the pipeline view  
**Then** I see:
- Kanban board with columns for each workflow stage (Applied, Screening, Interview, Offer, Hired)
- Candidate cards in each column (showing: name, role, AI score, status)
- Drag-and-drop functionality (move candidates between stages)
- Filter options (by job, by status, by AI score, by date)
- Search functionality (search by candidate name, email, skills)

**And** the Kanban board follows Dense Dashboard design:
- 3-column layout: Sidebar (navigation) + Main (Kanban) + AI Panel (co-pilot)
- Persistent sidebar navigation (always visible)
- 4-column Kanban board (stages as columns)
- Candidate cards show: Avatar, Name, Job Title, AI Score Badge, Quick Actions
- Responsive: Mobile shows single column (vertical scroll), Desktop shows all columns

**And** candidate cards include:
- Candidate avatar (initials if no photo)
- Candidate name (clickable, opens detail view)
- Applied job title
- AI score badge (0-100, color-coded: green 80+, yellow 60-79, red <60)
- Stage indicator (current stage)
- Quick actions: View Profile, Move Stage, Send Message

**And** drag-and-drop works:
- Drag candidate card from one column to another
- Visual feedback during drag (card follows cursor, column highlights on hover)
- Drop updates candidate stage in database
- Auto-save on drop (no confirmation needed for stage changes)
- Success toast: "Moved [Candidate] to [Stage]"
- Undo option (for 5 seconds after move)

**And** filtering and search:
- Filter by job: Dropdown shows all jobs, filters candidates
- Filter by AI score: Slider or range input (e.g., 70-100)
- Filter by date: Date range picker (applications in date range)
- Search: Real-time search as user types (debounced 300ms)
- Clear filters button (resets all filters)

**Prerequisites:** Story 4.1 (Candidate Application), Story 3.4 (Workflow Stages)

**Technical Notes:**
- Create pipeline view: `src/app/(recruiter)/dashboard/pipeline/page.tsx`
- Install drag-and-drop: `@dnd-kit/core` or `react-beautiful-dnd`
- Create Kanban board component: `src/components/recruiter/PipelineKanban.tsx`
- Create candidate card component: `src/components/recruiter/CandidateCard.tsx`
- Implement drag-and-drop handlers: `onDragStart`, `onDragOver`, `onDrop`
- Update application stage in database on drop: `applications.status = new_stage`
- Use React Query for data fetching with optimistic updates
- Implement search and filter with URL query params (shareable links)
- Test drag-and-drop and stage updates
- Log stage changes in audit trail

---

### Story 4.3: Candidate Profile View

As a **recruiter**,  
I want **to view detailed candidate profiles with resume, application details, and activity timeline**,  
So that **I can make informed hiring decisions**.

**Acceptance Criteria:**

**Given** I am viewing a candidate in the pipeline  
**When** I click on a candidate card or name  
**Then** I see the candidate profile with:
- Candidate header (name, email, phone, LinkedIn profile link)
- Resume viewer (PDF viewer or formatted text, downloadable)
- Application details (applied date, job title, current stage, AI score)
- Activity timeline (all interactions: applications, emails, interviews, status changes)
- AI insights panel (AI score explanation, ranking rationale, suggested actions)
- Interview notes section (if interviews scheduled)
- Quick actions (Move Stage, Send Message, Schedule Interview, Create Offer)

**And** the profile view includes:
- Left sidebar: Candidate info, contact details, skills extracted from resume
- Main content: Resume viewer (scrollable, zoom controls)
- Right sidebar: AI Co-pilot panel (scores, explanations, suggestions)
- Activity timeline: Chronological list of all events (newest first)
- Tabs: Overview, Resume, Activity, Notes

**And** resume viewer works:
- PDF resumes: Embedded PDF viewer (react-pdf or similar)
- DOCX resumes: Converted to HTML for viewing (mammoth.js or similar)
- Download button (downloads original file)
- Print button (prints formatted resume)
- Zoom controls (zoom in/out, fit to width)

**And** activity timeline shows:
- Application submitted (timestamp, job title)
- Status changes (moved to Screening, Interview, etc.)
- Emails sent/received (subject, timestamp, preview)
- Interviews scheduled/completed (date, time, type, notes)
- Offers extended/accepted/declined (timestamp, details)
- All events linked to audit logs (for compliance)

**And** AI insights panel shows:
- AI score breakdown (why candidate scored X/100)
- Ranking rationale (human-readable explanation)
- Suggested next actions ("Schedule phone interview", "Send technical assessment")
- Confidence indicator (high/medium/low confidence in score)

**Prerequisites:** Story 4.2 (Pipeline View)

**Technical Notes:**
- Create candidate profile page: `src/app/(recruiter)/candidates/[id]/page.tsx`
- Create resume viewer component: `src/components/recruiter/ResumeViewer.tsx`
- Install PDF viewer: `react-pdf` or `@react-pdf-viewer/core`
- Install DOCX converter: `mammoth` or `docx-preview`
- Create activity timeline component: `src/components/recruiter/ActivityTimeline.tsx`
- Fetch candidate data: `GET /api/candidates/[id]`
- Fetch application history: `GET /api/candidates/[id]/applications`
- Fetch activity events: `GET /api/candidates/[id]/activity`
- Display AI insights from Epic 5 (AI Evaluation)
- Test resume viewing and activity timeline
- Log profile views in audit trail

---

### Story 4.4: Manual Candidate Addition

As a **recruiter**,  
I want **to manually add candidates to the system (import resumes, create profiles)**,  
So that **I can manage candidates who didn't apply through the portal**.

**Acceptance Criteria:**

**Given** I am a recruiter  
**When** I click "Add Candidate" button  
**Then** I can manually add a candidate with:
- Candidate information (name, email, phone, LinkedIn URL)
- Resume upload (PDF/DOCX, max 10MB)
- Job assignment (select which job to add candidate to)
- Initial stage selection (default: Screening, can change)
- Notes (optional, internal notes about candidate)

**And** the manual addition form includes:
- Candidate details section (name, email, phone, LinkedIn)
- Resume upload (drag-and-drop or file picker)
- Job selection dropdown (shows all published jobs)
- Stage selection dropdown (shows workflow stages for selected job)
- Notes textarea (optional, for internal notes)
- "Add Candidate" button (Deep Navy primary)

**And** after adding candidate:
- Candidate profile is created in database
- Resume is uploaded to S3 (tenant-prefixed storage)
- Application record is created (linked to selected job and stage)
- AI parsing is triggered automatically (resume parsed, scored)
- Candidate appears in pipeline (in selected stage)
- Success toast: "Candidate [Name] added successfully"

**And** validation:
- Email required and validated (RFC 5322)
- Name required (minimum 2 characters)
- Resume required (PDF/DOCX, max 10MB)
- Job selection required
- Duplicate email check (warns if candidate already exists: "Candidate with this email already exists. Add anyway?")

**Prerequisites:** Story 4.1 (Candidate Application)

**Technical Notes:**
- Create add candidate page: `src/app/(recruiter)/candidates/new/page.tsx`
- Create API route: `src/app/api/candidates/route.ts` (POST)
- Reuse resume upload logic from Story 4.1
- Trigger AI parsing after resume upload (async, background job)
- Create candidate and application records in single transaction
- Handle duplicate email (show warning, allow override)
- Log manual candidate addition in audit trail
- Test form validation and resume upload

---

### Story 4.5: Candidate Search and Filtering

As a **recruiter**,  
I want **to search and filter candidates by name, skills, experience, application status, and custom tags**,  
So that **I can quickly find candidates matching specific criteria**.

**Acceptance Criteria:**

**Given** I am viewing the candidate list or pipeline  
**When** I use search and filter options  
**Then** I can:
- Search by candidate name (real-time, debounced 300ms)
- Search by email address
- Filter by skills (multi-select dropdown, shows skills extracted from resumes)
- Filter by experience level (years of experience: 0-2, 3-5, 5-10, 10+)
- Filter by application status (Applied, Screening, Interview, Offer, Hired, Rejected)
- Filter by job (select one or multiple jobs)
- Filter by AI score range (slider: 0-100)
- Filter by date range (application date, last activity date)
- Filter by custom tags (if tags feature exists)

**And** the search and filter UI includes:
- Search bar (top of page, full width, placeholder: "Search candidates...")
- Filter panel (collapsible sidebar or dropdown)
- Active filters display (chips showing active filters, removable)
- "Clear All Filters" button
- Filter count badge (shows number of active filters)
- Results count (shows "X candidates found")

**And** search works:
- Real-time search as user types (debounced 300ms)
- Searches across: name, email, skills, job titles (from resume)
- Highlights matching terms in results
- Shows "No results" message if no matches
- Suggests alternative search terms if no results

**And** filtering works:
- Filters are combinable (AND logic: candidate must match all selected filters)
- Filter changes update results immediately (no "Apply" button needed)
- URL query params store filters (shareable links)
- Filters persist across page navigation (stored in URL or localStorage)

**Prerequisites:** Story 4.2 (Pipeline View)

**Technical Notes:**
- Create search component: `src/components/recruiter/CandidateSearch.tsx`
- Create filter panel: `src/components/recruiter/CandidateFilters.tsx`
- Implement search API: `GET /api/candidates?search=query&filters=...`
- Use PostgreSQL full-text search or Elasticsearch (for Phase 2)
- Extract skills from resumes (stored in `candidates.skills` JSON field)
- Store filters in URL query params (for shareable links)
- Use React Query for search results (cached, debounced)
- Test search performance (should respond in <500ms)
- Log search queries in audit trail (for analytics)

---

### Story 4.6: Bulk Operations on Candidates

As a **recruiter**,  
I want **to perform bulk operations on candidates (bulk status updates, bulk exports, bulk tagging)**,  
So that **I can manage multiple candidates efficiently**.

**Acceptance Criteria:**

**Given** I am viewing the candidate list  
**When** I select multiple candidates  
**Then** I can:
- Select candidates (checkbox per candidate, "Select All" checkbox)
- Bulk update status (move multiple candidates to same stage)
- Bulk export (export selected candidates to CSV/JSON)
- Bulk tag (add tags to multiple candidates)
- Bulk delete (soft delete, with confirmation)

**And** the bulk operations UI includes:
- Checkbox column in candidate list (enables selection)
- "Select All" checkbox in header (selects/deselects all visible candidates)
- Bulk actions toolbar (appears when candidates selected, shows count: "3 selected")
- Bulk actions dropdown: "Move to Stage", "Export", "Tag", "Delete"
- Confirmation modals for destructive actions

**And** bulk status update works:
- Select multiple candidates
- Choose "Move to Stage" from bulk actions
- Select target stage from dropdown
- Confirm action: "Move 3 candidates to [Stage]?"
- All selected candidates moved to target stage
- Success toast: "3 candidates moved to [Stage]"
- Individual audit log entries for each candidate

**And** bulk export works:
- Select candidates
- Choose "Export" from bulk actions
- Select format (CSV or JSON)
- Export file downloads with candidate data:
  - CSV: Name, Email, Phone, Job, Status, AI Score, Applied Date
  - JSON: Full candidate objects with all fields
- File name: `candidates-export-YYYY-MM-DD.csv/json`

**And** bulk operations are logged:
- Each bulk operation logged in audit trail
- Log includes: action type, number of candidates, user, timestamp
- Individual candidate changes logged (for status updates)

**Prerequisites:** Story 4.5 (Candidate Search)

**Technical Notes:**
- Add selection state to candidate list: `src/components/recruiter/CandidateList.tsx`
- Create bulk actions toolbar: `src/components/recruiter/BulkActionsToolbar.tsx`
- Create bulk update API: `POST /api/candidates/bulk-update`
- Create bulk export API: `POST /api/candidates/bulk-export`
- Implement CSV generation: `src/lib/export/csv.ts`
- Implement JSON export: `src/lib/export/json.ts`
- Use transactions for bulk updates (all or nothing)
- Test bulk operations with large datasets (100+ candidates)
- Log all bulk operations in audit trail
- Add progress indicator for large bulk operations

---

**Epic 4 Review Summary:**

**Epic 4: Candidate Application & Management**  
**Goal:** Candidates can apply to jobs and recruiters can manage them through the pipeline

**Stories (6 total):**
1. Candidate Portal - Job Application Flow
2. Recruiter Pipeline View (Kanban Board)
3. Candidate Profile View
4. Manual Candidate Addition
5. Candidate Search and Filtering
6. Bulk Operations on Candidates

**FRs Covered:** FR13, FR14, FR15, FR16, FR17, FR18

**Review Questions:**
- ✅ Story sequence is logical (apply → view → manage → search → bulk)
- ✅ Acceptance criteria are clear and testable
- ✅ All candidate management requirements are covered
- ✅ Stories are sized appropriately for single dev agent session
- ✅ UX design details incorporated (Dense Dashboard, Kanban board, Trust Navy theme)

**Status:** Ready to proceed to Epic 5

---

## Epic 5: AI-Powered Candidate Evaluation

**Goal:** AI scores and ranks candidates with explainable rationales that recruiters can trust. This epic implements the novel adaptive AI learning system that learns from recruiter behavior.

### Story 5.1: Resume Parsing and Data Extraction

As a **system**,  
I want **to parse resumes (PDF/DOCX) and extract structured data**,  
So that **I can analyze candidate qualifications automatically**.

**Acceptance Criteria:**

**Given** a candidate uploads a resume  
**When** the resume is processed  
**Then** the system extracts:
- Personal information (name, email, phone, location)
- Work experience (company, role, duration, responsibilities)
- Education (degree, institution, graduation year)
- Skills (technical skills, soft skills, certifications)
- Languages (with proficiency levels if mentioned)

**And** parsing works for:
- PDF resumes (text-based PDFs, scanned PDFs with OCR)
- DOCX resumes (Microsoft Word documents)
- File size up to 10MB
- Multiple languages (English primary, others supported)

**And** extracted data is stored:
- In `candidates` table (name, email, phone, location)
- In `candidate_experience` table (work history)
- In `candidate_education` table (education history)
- In `candidates.skills` JSON field (array of skills)
- Parsing confidence score stored (0-100, indicates extraction quality)

**And** parsing errors are handled:
- Unparseable files show error: "Could not parse resume. Please ensure file is PDF or DOCX."
- Low confidence parsing (<50%) shows warning: "Resume parsed with low confidence. Please review extracted data."
- Failed parsing allows manual data entry (fallback option)

**Prerequisites:** Story 4.1 (Candidate Application)

**Technical Notes:**
- Create resume parser service: `src/lib/ai/resume-parser.ts`
- Use OpenAI/Anthropic API for resume parsing (structured extraction)
- OR use specialized library: `pdf-parse` for PDF, `mammoth` for DOCX
- Process parsing asynchronously (BullMQ background job)
- Store parsing results in database with confidence scores
- Create parsing API: `POST /api/ai/parse-resume`
- Test with various resume formats and languages
- Log parsing events in audit trail
- Implement retry logic for failed parsing (3 attempts)

---

### Story 5.2: AI Resume Scoring Against Job Requirements

As a **recruiter**,  
I want **AI to score resumes against job requirements and provide a numerical score (0-100) with explanation**,  
So that **I can quickly identify top candidates**.

**Acceptance Criteria:**

**Given** a candidate has applied to a job  
**When** AI scores the candidate  
**Then** the system calculates:
- Numerical score (0-100) based on job fit
- Score breakdown (experience match, skills match, education match, etc.)
- Human-readable explanation ("Strong match: 5+ years Python experience, relevant domain knowledge")
- Confidence level (high/medium/low confidence in score)

**And** scoring considers:
- Job requirements (from job posting)
- Candidate experience (years, relevance)
- Skills match (required vs. candidate skills)
- Education match (degree requirements)
- Domain knowledge (industry experience)

**And** the score is displayed:
- In candidate card (AI Score Badge: 0-100, color-coded)
- In candidate profile (detailed score breakdown)
- In AI Co-pilot panel (score with explanation)
- Score updates automatically when job requirements change

**And** scoring performance:
- Scoring completes in <3 seconds (for typical job postings)
- Scores are cached (recalculate only if job or candidate data changes)
- Batch scoring supported (score multiple candidates at once)

**Prerequisites:** Story 5.1 (Resume Parsing), Story 3.1 (Create Job Posting)

**Technical Notes:**
- Create scoring service: `src/lib/ai/scoring.ts`
- Use OpenAI/Anthropic API for scoring (structured output: score + explanation)
- Store scores in `applications.ai_score` field
- Store explanations in `applications.ai_explanation` JSON field
- Create scoring API: `POST /api/ai/score-candidate`
- Implement caching (Redis cache for scores, invalidate on data changes)
- Process scoring asynchronously (BullMQ for batch scoring)
- Test scoring accuracy with sample resumes and job postings
- Log scoring events in audit trail (for compliance and analytics)

---

### Story 5.3: AI Candidate Ranking with Rationales

As a **recruiter**,  
I want **AI to rank candidates for a job posting based on scores and provide human-readable ranking rationales**,  
So that **I can see which candidates are best fits**.

**Acceptance Criteria:**

**Given** multiple candidates have applied to a job  
**When** I view the candidate list for that job  
**Then** candidates are ranked by:
- AI score (primary ranking factor)
- Job fit (secondary factor)
- Recruiter preferences (if learning system has data - from Epic 5.6)

**And** ranking is displayed:
- Candidates sorted by rank (highest score first)
- Rank number shown (1, 2, 3, etc.)
- Ranking rationale shown per candidate ("Ranked #1: Highest score (92/100), strong experience match")

**And** ranking rationales are human-readable:
- Clear explanations (not technical jargon)
- Specific reasons (mentions specific skills, experience, education)
- Comparison context ("Ranked higher than others due to 5+ years relevant experience")

**And** ranking updates:
- Automatically when new candidates apply
- When job requirements change
- When recruiter overrides scores (re-ranks based on new scores)

**Prerequisites:** Story 5.2 (AI Scoring)

**Technical Notes:**
- Create ranking service: `src/lib/ai/ranking.ts`
- Calculate rankings: Sort by `ai_score` DESC, apply tie-breakers
- Generate ranking rationales using AI (explain why candidate ranked at position)
- Store rankings in `applications.rank` field
- Update rankings when scores change (triggered by score updates)
- Display rankings in pipeline view and candidate list
- Test ranking logic with various candidate sets
- Log ranking updates in audit trail

---

### Story 5.4: AI Explanation Display and Override Capabilities

As a **recruiter**,  
I want **to view AI-generated explanations, accept/reject scores, and override AI decisions**,  
So that **I can maintain control and the AI learns from my feedback**.

**Acceptance Criteria:**

**Given** AI has scored and ranked candidates  
**When** I view a candidate  
**Then** I see:
- AI score with explanation card (expandable, shows full rationale)
- "Accept Score" button (confirms AI score is correct)
- "Override Score" button (allows manual score adjustment)
- "Request Re-scoring" button (triggers AI to re-score with feedback)

**And** AI explanation card shows:
- Score breakdown (experience: 30/40, skills: 25/30, education: 15/20, etc.)
- Human-readable explanation (full text explanation)
- Confidence indicator (high/medium/low)
- Factors considered (list of criteria used in scoring)

**And** override functionality works:
- Click "Override Score"
- Manual score input (0-100 slider or number input)
- Override reason field (optional, textarea: "Why are you overriding?")
- Save override (updates score, triggers re-ranking)
- Override indicator shown (badge: "Manually adjusted by [Recruiter]")

**And** AI learning from overrides:
- Override events logged in `behavior_events` table
- Override reasons analyzed (if provided) to improve future scoring
- Learning system uses overrides to adapt (see Epic 5.6)

**Prerequisites:** Story 5.3 (AI Ranking)

**Technical Notes:**
- Create AI explanation component: `src/components/recruiter/AIExplanationCard.tsx`
- Create override modal: `src/components/recruiter/OverrideScoreModal.tsx`
- Store overrides in `applications.override_score` and `applications.override_reason`
- Log override events: `src/lib/ai/learning/observation.ts`
- Update rankings after override (re-calculate ranks)
- Display override indicators in UI (badge or icon)
- Test override flow and learning event logging
- Log all override actions in audit trail

---

### Story 5.5: AI Learning System - Behavior Observation

As a **system**,  
I want **to observe and record recruiter behavior (score acceptances, ranking usage, outreach edits)**,  
So that **the AI can learn recruiter preferences and adapt**.

**Acceptance Criteria:**

**Given** recruiters are using the system  
**When** recruiters interact with AI features  
**Then** the system observes and logs:
- Score acceptances (when recruiter accepts AI score)
- Score rejections (when recruiter overrides AI score)
- Ranking usage (which ranked candidates recruiter shortlists)
- Outreach edits (how recruiter modifies AI-drafted messages)
- Candidate response rates (which outreach messages get responses)

**And** behavior events are stored:
- In `behavior_events` table (event_type, user_id, candidate_id, job_id, metadata, timestamp)
- Event types: `score_accepted`, `score_rejected`, `ranking_used`, `outreach_edited`, `response_received`
- Metadata JSON field stores event-specific data (override reason, edit changes, etc.)

**And** observation is non-intrusive:
- Events logged automatically (no user action required)
- No performance impact (async logging, batched writes)
- Privacy-compliant (only logs actions, not sensitive data)

**Prerequisites:** Story 5.4 (AI Override)

**Technical Notes:**
- Create behavior observation service: `src/lib/ai/learning/observation.ts`
- Log events asynchronously (BullMQ background jobs)
- Store events in `behavior_events` table
- Create event types enum: `ScoreAccepted`, `ScoreRejected`, `RankingUsed`, etc.
- Batch event writes (write every 10 events or every 30 seconds)
- Test event logging (verify all interactions are logged)
- Log observation events in audit trail (for compliance)

---

### Story 5.6: AI Learning System - Pattern Learning and Adaptation

As a **system**,  
I want **to learn from recruiter behavior and adapt scoring criteria**,  
So that **AI suggestions become more aligned with recruiter preferences over time**.

**Acceptance Criteria:**

**Given** behavior events have been collected  
**When** the learning system processes events  
**Then** it:
- Analyzes patterns (which scoring criteria matter most to each recruiter)
- Builds preference profiles (per recruiter, per role combination)
- Updates scoring weights (adjusts importance of experience vs. skills vs. education)
- Adapts future scores (applies learned preferences to new candidates)

**And** learning is incremental:
- Updates happen continuously (not batch retraining)
- Preference confidence increases with more data
- Learning is explainable (can show what was learned and how it affects scores)

**And** adaptation is transparent:
- AI explainability reports show learned preferences
- Recruiters can view their preference profile
- Recruiters can reset preferences (start fresh if needed)

**Prerequisites:** Story 5.5 (Behavior Observation)

**Technical Notes:**
- Create pattern learning engine: `src/lib/ai/learning/pattern-engine.ts`
- Create preference profiles: `recruiter_preferences` table (recruiter_id, role_type, preference_weights JSON)
- Implement preference calculation: Analyze behavior events, calculate weights for scoring criteria
- Update scoring service to use preferences: `src/lib/ai/scoring.ts` (apply preference weights)
- Create explainability service: `src/lib/ai/explanation.ts` (explain learned preferences)
- Process learning asynchronously (BullMQ, runs every hour or on-demand)
- Test learning system (simulate behavior events, verify preferences update)
- Log learning updates in audit trail (for compliance and transparency)

---

**Epic 5 Review Summary:**

**Epic 5: AI-Powered Candidate Evaluation**  
**Goal:** AI scores and ranks candidates with explainable rationales that recruiters can trust

**Stories (6 total):**
1. Resume Parsing and Data Extraction
2. AI Resume Scoring Against Job Requirements
3. AI Candidate Ranking with Rationales
4. AI Explanation Display and Override Capabilities
5. AI Learning System - Behavior Observation
6. AI Learning System - Pattern Learning and Adaptation

**FRs Covered:** FR19, FR20, FR21, FR22, FR23, FR24, FR56, FR57, FR58, FR60

**Review Questions:**
- ✅ Story sequence is logical (parse → score → rank → explain → observe → learn)
- ✅ Acceptance criteria are clear and testable
- ✅ All AI evaluation requirements are covered
- ✅ Stories are sized appropriately for single dev agent session
- ✅ Novel adaptive learning pattern is properly broken down

**Status:** Ready to proceed to Epic 6

---

## Epic 6: Candidate Communication & Outreach

**Goal:** Recruiters can communicate with candidates using AI-assisted personalized outreach. This epic enables email communication, AI-drafted messages, and learning from response rates.

### Story 6.1: AI-Assisted Outreach Message Drafting

As a **recruiter**,  
I want **AI to draft personalized outreach emails to candidates**,  
So that **I can send compelling messages faster while maintaining personalization**.

**Acceptance Criteria:**

**Given** I am viewing a candidate  
**When** I click "Draft Outreach" button  
**Then** AI generates:
- Personalized email subject line
- Email body (personalized based on candidate profile, job role, recruiter style)
- Tone matching (formal, friendly, casual - based on learned recruiter preferences)
- Call-to-action (clear next step: schedule interview, request more info, etc.)

**And** the AI draft includes:
- Candidate name personalization
- Job-specific details (mentions specific job title, requirements)
- Recruiter style adaptation (learned from previous successful outreach)
- Professional yet approachable tone

**And** the outreach UI includes:
- "Draft with AI" button (Bright Blue accent, `#42a5f5`)
- Draft preview (shows generated email)
- Edit capability (recruiter can modify before sending)
- "Regenerate" button (generates alternative version)
- "Send" button (sends email via Resend API)
- "Save Draft" button (saves for later)

**And** AI generation works:
- Completes in <5 seconds
- Uses candidate profile, job details, recruiter history
- Adapts to learned recruiter communication style (from Epic 6.3)

**Prerequisites:** Story 4.3 (Candidate Profile), Story 5.6 (AI Learning)

**Technical Notes:**
- Create outreach service: `src/lib/ai/outreach.ts`
- Integrate OpenAI/Anthropic API for email generation
- Create API route: `POST /api/ai/generate-outreach`
- Create outreach UI: `src/components/recruiter/OutreachDraft.tsx`
- Store drafts in `outreach_drafts` table
- Log outreach generation in audit trail
- Test AI generation with various candidate profiles

---

### Story 6.2: Send Outreach Messages and Track Communications

As a **recruiter**,  
I want **to send outreach messages to candidates and track all communications**,  
So that **I can maintain communication history and follow up appropriately**.

**Acceptance Criteria:**

**Given** I have drafted an outreach message  
**When** I send the message  
**Then** the system:
- Sends email via Resend API
- Stores message in `communications` table
- Adds entry to candidate activity timeline
- Tracks delivery status (sent, delivered, opened, clicked, replied)
- Sends confirmation to recruiter: "Outreach sent to [Candidate]"

**And** communication tracking includes:
- All sent emails (outreach, interview invites, offer letters)
- Received emails (candidate replies)
- Email status (sent, delivered, opened, clicked, replied)
- Timestamps for all events
- Email content (subject, body, attachments)

**And** activity timeline shows:
- All communications chronologically
- Email previews (subject, snippet)
- Status indicators (sent, opened, replied)
- Clickable links to view full email

**Prerequisites:** Story 6.1 (AI Outreach Drafting)

**Technical Notes:**
- Integrate Resend API: `src/lib/email/resend.ts`
- Create email templates: `src/lib/email/templates/outreach.tsx`
- Store communications: `communications` table (candidate_id, job_id, type, subject, body, status, timestamps)
- Track email events via Resend webhooks
- Create communication API: `POST /api/communications/send`
- Update activity timeline on send
- Test email sending and tracking
- Log all communications in audit trail

---

### Story 6.3: AI Learning from Outreach Response Rates

As a **system**,  
I want **to learn from candidate response rates and recruiter edits**,  
So that **AI can improve future outreach suggestions**.

**Acceptance Criteria:**

**Given** outreach messages have been sent  
**When** candidates respond or recruiters edit messages  
**Then** the system:
- Tracks response rates (which messages get replies)
- Analyzes recruiter edits (what changes recruiters make to AI drafts)
- Learns successful patterns (what works for each recruiter/role combination)
- Adapts future outreach generation (applies learned patterns)

**And** learning is transparent:
- Recruiters can view outreach performance metrics
- AI explainability shows what was learned
- Recruiters can reset learning (start fresh if needed)

**Prerequisites:** Story 6.2 (Send Outreach)

**Technical Notes:**
- Extend behavior observation: `src/lib/ai/learning/observation.ts` (track outreach events)
- Analyze response rates: Calculate reply rate per message type, recruiter, role
- Update outreach service: Apply learned patterns to generation
- Create outreach analytics: `src/app/(recruiter)/analytics/outreach/page.tsx`
- Test learning system with outreach data
- Log learning updates in audit trail

---

**Epic 6 Review Summary:**

**Epic 6: Candidate Communication & Outreach**  
**Goal:** Recruiters can communicate with candidates using AI-assisted personalized outreach

**Stories (3 total):**
1. AI-Assisted Outreach Message Drafting
2. Send Outreach Messages and Track Communications
3. AI Learning from Outreach Response Rates

**FRs Covered:** FR25, FR26, FR27, FR28, FR29, FR59

**Status:** Ready to proceed to Epic 7

---

## Epic 7: Interview Scheduling

**Goal:** Seamless interview coordination between recruiters, candidates, and interviewers.

### Story 7.1: Schedule Interviews with Calendar Integration

As a **recruiter**,  
I want **to schedule interviews with candidates by selecting date/time and interviewers**,  
So that **I can coordinate interviews efficiently**.

**Acceptance Criteria:**

**Given** I am viewing a candidate  
**When** I click "Schedule Interview"  
**Then** I can:
- Select interview date and time (calendar picker)
- Choose interview type (phone, video, onsite)
- Select interviewers (multi-select from team members)
- Add interview notes (optional, internal notes)
- Send calendar invites automatically (Google Calendar, Outlook)

**And** calendar integration works:
- Checks interviewer availability (via calendar APIs)
- Suggests available time slots
- Sends calendar invites to candidate and interviewers
- Creates calendar event with meeting details

**Prerequisites:** Story 4.3 (Candidate Profile), Story 11.2 (Calendar Integration)

**Technical Notes:**
- Create interview scheduling page: `src/app/(recruiter)/interviews/schedule/page.tsx`
- Integrate calendar APIs: `src/lib/integrations/calendar.ts`
- Store interviews: `interviews` table (candidate_id, job_id, date, time, type, interviewers, notes)
- Send calendar invites via Google Calendar/Outlook APIs
- Create interview API: `POST /api/interviews/schedule`
- Test calendar integration and invite sending

---

### Story 7.2: Candidate Interview Confirmation and Rescheduling

As a **candidate**,  
I want **to view interview invites, confirm, or reschedule**,  
So that **I can coordinate my availability**.

**Acceptance Criteria:**

**Given** I have received an interview invite  
**When** I view the invite in candidate portal  
**Then** I can:
- View interview details (date, time, type, interviewers)
- Confirm interview (accepts invite)
- Request reschedule (suggests alternative times)
- Decline interview (with optional reason)

**And** rescheduling works:
- Candidate suggests alternative times (calendar picker)
- Recruiter receives notification
- Recruiter can approve new time or suggest alternatives
- Calendar invites updated automatically

**Prerequisites:** Story 7.1 (Schedule Interviews)

**Technical Notes:**
- Create candidate interview page: `src/app/(candidate)/interviews/[id]/page.tsx`
- Create reschedule API: `POST /api/interviews/[id]/reschedule`
- Update calendar invites on reschedule
- Send notifications to recruiter on reschedule request
- Test candidate confirmation and rescheduling flow

---

### Story 7.3: Interview Notes and Feedback

As a **recruiter**,  
I want **to record interview notes and feedback**,  
So that **I can track candidate performance and make hiring decisions**.

**Acceptance Criteria:**

**Given** an interview has been completed  
**When** I view the interview  
**Then** I can:
- Record interview notes (rich text, internal notes)
- Rate candidate performance (1-5 stars or score)
- Add feedback per interviewer (if multiple interviewers)
- Mark interview as completed
- View interview history for candidate

**And** notes are stored:
- In `interview_notes` table (interview_id, user_id, notes, rating, feedback)
- Linked to candidate profile
- Visible in candidate activity timeline
- Searchable and filterable

**Prerequisites:** Story 7.1 (Schedule Interviews)

**Technical Notes:**
- Create interview notes component: `src/components/recruiter/InterviewNotes.tsx`
- Store notes: `interview_notes` table
- Create notes API: `POST /api/interviews/[id]/notes`
- Display notes in candidate profile
- Test notes recording and display

---

**Epic 7 Review Summary:**

**Epic 7: Interview Scheduling**  
**Goal:** Seamless interview coordination

**Stories (3 total):**
1. Schedule Interviews with Calendar Integration
2. Candidate Interview Confirmation and Rescheduling
3. Interview Notes and Feedback

**FRs Covered:** FR30, FR31, FR32, FR33, FR34

**Status:** Ready to proceed to Epic 8

---

## Epic 8: Offer Management

**Goal:** Complete offer workflow from creation to acceptance.

### Story 8.1: Create Offer Letters

As a **hiring manager or TA leader**,  
I want **to create offer letters with compensation, start date, and terms**,  
So that **I can extend offers to selected candidates**.

**Acceptance Criteria:**

**Given** I am viewing a candidate who has completed interviews  
**When** I click "Create Offer"  
**Then** I can create an offer with:
- Compensation details (salary, bonus, equity if applicable)
- Start date (date picker)
- Offer terms (benefits, work location, reporting structure)
- Offer letter template (formatted document)
- Approval workflow (if required)

**And** offer creation includes:
- Pre-filled candidate information (name, role, job title)
- Compensation calculator (helps calculate total compensation)
- Offer letter preview (formatted PDF preview)
- "Send Offer" button (sends to candidate)
- "Save Draft" button (saves for later editing)

**Prerequisites:** Story 7.3 (Interview Notes)

**Technical Notes:**
- Create offer creation page: `src/app/(recruiter)/offers/new/page.tsx`
- Store offers: `offers` table (candidate_id, job_id, compensation, start_date, terms, status)
- Generate offer letter PDF: `src/lib/documents/offer-letter.ts`
- Create offer API: `POST /api/offers`
- Test offer creation and PDF generation

---

### Story 8.2: Offer Approval Workflow

As a **system**,  
I want **to support multi-level offer approval workflows**,  
So that **offers are reviewed before being sent**.

**Acceptance Criteria:**

**Given** an offer has been created  
**When** approval is required  
**Then** the system:
- Routes offer through approval chain (hiring manager → TA leader → finance)
- Sends approval requests to approvers
- Tracks approval status (pending, approved, rejected)
- Sends notifications at each step
- Allows approvers to add comments

**And** approval workflow is configurable:
- Per-tenant approval rules (who needs to approve)
- Approval order (sequential or parallel)
- Auto-approval thresholds (small offers auto-approved)

**Prerequisites:** Story 8.1 (Create Offers)

**Technical Notes:**
- Create approval workflow: `src/lib/workflow/offer-approval.ts`
- Store approvals: `offer_approvals` table (offer_id, approver_id, status, comments, timestamp)
- Create approval API: `POST /api/offers/[id]/approve`
- Send approval notifications
- Test approval workflow with multiple approvers

---

### Story 8.3: Candidate Offer Response

As a **candidate**,  
I want **to view, accept, or decline offers through the candidate portal**,  
So that **I can respond to job offers**.

**Acceptance Criteria:**

**Given** I have received an offer  
**When** I view the offer in candidate portal  
**Then** I can:
- View offer letter (PDF download)
- View offer details (compensation, start date, terms)
- Accept offer (with confirmation)
- Decline offer (with optional reason)
- Request negotiation (send message to recruiter)

**And** offer response updates:
- Offer status: `pending` → `accepted` or `declined`
- Candidate workflow stage: Moves to "Hired" if accepted
- Recruiter notification: Receives response notification
- Audit log: Records offer response

**Prerequisites:** Story 8.2 (Offer Approval)

**Technical Notes:**
- Create candidate offer page: `src/app/(candidate)/offers/[id]/page.tsx`
- Create offer response API: `POST /api/offers/[id]/respond`
- Update candidate stage on acceptance
- Send notifications to recruiter
- Test offer acceptance and decline flows

---

**Epic 8 Review Summary:**

**Epic 8: Offer Management**  
**Goal:** Complete offer workflow from creation to acceptance

**Stories (3 total):**
1. Create Offer Letters
2. Offer Approval Workflow
3. Candidate Offer Response

**FRs Covered:** FR35, FR36, FR37, FR38, FR39

**Status:** Ready to proceed to Epic 9

---

## Epic 9: Compliance & Audit Automation

**Goal:** Compliance partners can generate evidence packs and manage data rights requests.

### Story 9.1: Consent Capture and Tracking

As a **system**,  
I want **to capture candidate consent for data processing at registration**,  
So that **I comply with DPDP/GDPR requirements**.

**Acceptance Criteria:**

**Given** a candidate is registering or applying  
**When** they submit their information  
**Then** the system:
- Displays consent checkbox (required): "I consent to data processing per DPDP/GDPR"
- Captures consent timestamp and version (consent policy version)
- Stores consent in `consent_records` table
- Links consent to candidate record
- Allows consent withdrawal (candidate can revoke consent)

**And** consent tracking includes:
- Consent type (data processing, marketing, analytics)
- Consent version (which policy version was accepted)
- Consent timestamp
- Withdrawal timestamp (if consent revoked)
- Consent status (active, withdrawn)

**Prerequisites:** Story 4.1 (Candidate Application)

**Technical Notes:**
- Add consent checkbox to application form
- Store consent: `consent_records` table (candidate_id, consent_type, version, timestamp, status)
- Create consent API: `POST /api/consent/record`
- Handle consent withdrawal: `POST /api/consent/withdraw`
- Test consent capture and withdrawal

---

### Story 9.2: Immutable Audit Logging

As a **system**,  
I want **to maintain immutable audit logs for all candidate interactions**,  
So that **I can provide compliance evidence**.

**Acceptance Criteria:**

**Given** any action occurs in the system  
**When** the action affects candidate data  
**Then** the system:
- Logs event in `audit_logs` table (immutable, append-only)
- Includes: action type, user_id, candidate_id, timestamp, metadata
- Tags logs with tenant_id (for multi-tenant isolation)
- Prevents log modification (database constraints)
- Allows log search and export

**And** audit logs capture:
- All candidate data access (who viewed what, when)
- All data modifications (profile updates, status changes)
- All decisions (shortlisting, rejection, offer)
- All communications (emails sent, received)
- All AI decisions (scores, rankings, explanations)

**Prerequisites:** Story 1.2 (Database Schema)

**Technical Notes:**
- Create audit logging service: `src/lib/compliance/audit-log.ts`
- Create `audit_logs` table (immutable, append-only, indexed)
- Log all candidate-related actions automatically
- Create audit log API: `GET /api/audit-logs` (searchable, filterable)
- Test audit logging (verify all actions are logged)
- Implement log retention policies (configurable per tenant)

---

### Story 9.3: Data Export for DPDP/GDPR Right to Access

As a **compliance partner**,  
I want **to export candidate data in structured formats**,  
So that **I can fulfill DPDP/GDPR "right to access" requests**.

**Acceptance Criteria:**

**Given** a candidate requests their data  
**When** I generate an export  
**Then** the system:
- Exports all candidate data (profile, applications, communications, interview notes)
- Formats export as JSON or CSV
- Includes metadata (export date, data range)
- Provides download link (expires after 7 days)
- Logs export in audit trail

**And** export includes:
- Candidate profile (name, email, phone, resume)
- Application history (all jobs applied to, status, dates)
- Communication history (all emails sent/received)
- Interview history (scheduled, completed, notes)
- Offer history (offers extended, responses)
- AI decisions (scores, rankings, explanations)

**Prerequisites:** Story 9.2 (Audit Logging)

**Technical Notes:**
- Create export service: `src/lib/compliance/export.ts`
- Create export API: `POST /api/compliance/export`
- Generate JSON/CSV exports
- Store exports in S3 (tenant-prefixed, temporary)
- Create download links (signed URLs, expire after 7 days)
- Test export generation and download

---

### Story 9.4: Right to Deletion (Soft Delete with Audit Trail)

As a **system**,  
I want **to support "right to deletion" requests with soft delete**,  
So that **I comply with DPDP/GDPR while maintaining audit trail**.

**Acceptance Criteria:**

**Given** a candidate requests data deletion  
**When** I process the deletion request  
**Then** the system:
- Performs soft delete (marks candidate as deleted, preserves data for audit)
- Sets `deleted_at` timestamp
- Hides candidate from active views (but preserves in database)
- Maintains audit trail (deletion logged, cannot be removed)
- Sends confirmation to candidate

**And** deletion workflow:
- Candidate requests deletion (via candidate portal or email)
- System validates request (confirms identity)
- Soft delete performed (data preserved, marked as deleted)
- Hard delete after retention period (configurable, default 7 years for audit)
- Deletion logged in audit trail (immutable record)

**Prerequisites:** Story 9.2 (Audit Logging)

**Technical Notes:**
- Create deletion service: `src/lib/compliance/deletion.ts`
- Add `deleted_at` column to `candidates` table
- Filter deleted candidates from queries
- Create deletion API: `POST /api/compliance/delete-request`
- Implement hard delete job (runs after retention period)
- Test soft delete and hard delete workflows

---

### Story 9.5: Compliance Evidence Pack Generation

As a **compliance partner**,  
I want **to generate compliance evidence packs with one click**,  
So that **I can provide audit-ready documentation for compliance reviews**.

**Acceptance Criteria:**

**Given** I need compliance evidence  
**When** I generate an evidence pack  
**Then** the system:
- Generates structured evidence pack (ZIP file)
- Includes: audit logs, consent records, decision rationales, data exports
- Formats evidence for compliance review (PDF summaries, JSON data)
- Provides download link (expires after 30 days)
- Logs evidence pack generation in audit trail

**And** evidence pack includes:
- Audit log summary (all candidate interactions, formatted PDF)
- Consent records (all consent captures, withdrawals, timestamps)
- Decision rationales (AI explanations, recruiter overrides, justifications)
- Data access logs (who accessed what data, when)
- Compliance dashboard snapshot (metrics, status)

**Prerequisites:** Story 9.3 (Data Export), Story 9.2 (Audit Logging)

**Technical Notes:**
- Create evidence pack service: `src/lib/compliance/evidence-pack.ts`
- Generate ZIP file with structured documents
- Create PDF summaries: `src/lib/documents/evidence-summary.ts`
- Store evidence packs in S3 (tenant-prefixed, 30-day retention)
- Create evidence pack API: `POST /api/compliance/evidence-pack`
- Test evidence pack generation and download

---

**Epic 9 Review Summary:**

**Epic 9: Compliance & Audit Automation**  
**Goal:** Compliance partners can generate evidence packs and manage data rights requests

**Stories (5 total):**
1. Consent Capture and Tracking
2. Immutable Audit Logging
3. Data Export for DPDP/GDPR Right to Access
4. Right to Deletion (Soft Delete with Audit Trail)
5. Compliance Evidence Pack Generation

**FRs Covered:** FR40, FR41, FR42, FR43, FR44, FR45

**Status:** Ready to proceed to Epic 10

---

## Epic 10: Multi-Tenant Administration

**Goal:** System administrators can manage tenants and customize branding.

### Story 10.1: Tenant Creation and Management

As a **system administrator**,  
I want **to create new tenants and manage tenant settings**,  
So that **I can onboard new GCC clients**.

**Acceptance Criteria:**

**Given** I am a system administrator  
**When** I create a new tenant  
**Then** I can:
- Create tenant with name, slug, settings
- Configure tenant-specific settings (integrations, workflows, AI policies)
- Assign tenant administrators
- View tenant usage metrics
- Deactivate/reactivate tenants

**Prerequisites:** Story 1.4 (Multi-Tenant Middleware)

**Technical Notes:**
- Create tenant management page: `src/app/(admin)/tenants/page.tsx`
- Create tenant API: `POST /api/tenants`
- Store tenants: `tenants` table
- Test tenant creation and isolation

---

### Story 10.2: Tenant Branding Customization

As a **tenant administrator**,  
I want **to customize recruiter and candidate portal branding**,  
So that **the platform reflects our company identity**.

**Acceptance Criteria:**

**Given** I am a tenant administrator  
**When** I customize branding  
**Then** I can:
- Upload company logo (PNG/SVG, max 2MB)
- Set color theme (primary, secondary, accent colors)
- Customize email templates (add company branding)
- Preview branding changes before saving

**Prerequisites:** Story 10.1 (Tenant Creation)

**Technical Notes:**
- Create branding settings page: `src/app/(admin)/settings/branding/page.tsx`
- Store branding: `tenants.branding` JSON field
- Apply branding to portals (CSS variables, logo replacement)
- Test branding customization and preview

---

**Epic 10 Review Summary:**

**Epic 10: Multi-Tenant Administration**  
**Goal:** System administrators can manage tenants and customize branding

**Stories (2 total):**
1. Tenant Creation and Management
2. Tenant Branding Customization

**FRs Covered:** FR46, FR47, FR48, FR49

**Status:** Ready to proceed to Epic 11

---

## Epic 11: System Integrations

**Goal:** System connects with external services for email, calendar, HRIS, and storage.

### Story 11.1: Email Integration (Resend)

As a **system**,  
I want **to integrate with Resend API for email delivery**,  
So that **I can send candidate communications reliably**.

**Acceptance Criteria:**

**Given** the system needs to send emails  
**When** I send an email  
**Then** the system:
- Sends email via Resend API
- Tracks delivery status (sent, delivered, opened, clicked)
- Handles bounces and failures (retry logic, error handling)
- Uses React Email templates for formatting

**Prerequisites:** Story 1.6 (Deployment Pipeline)

**Technical Notes:**
- Integrate Resend: `src/lib/email/resend.ts`
- Create email templates: `src/lib/email/templates/`
- Handle webhooks: `src/app/api/webhooks/resend/route.ts`
- Test email sending and tracking

---

### Story 11.2: Calendar Integration (Google Calendar, Outlook)

As a **system**,  
I want **to integrate with calendar systems for interview scheduling**,  
So that **I can check availability and send calendar invites**.

**Acceptance Criteria:**

**Given** I am scheduling an interview  
**When** I select interviewers  
**Then** the system:
- Checks availability via Google Calendar/Outlook APIs
- Suggests available time slots
- Sends calendar invites automatically
- Syncs calendar updates (if interview rescheduled)

**Prerequisites:** Story 7.1 (Schedule Interviews)

**Technical Notes:**
- Integrate Google Calendar: `src/lib/integrations/calendar-google.ts`
- Integrate Outlook: `src/lib/integrations/calendar-outlook.ts`
- OAuth setup for calendar access
- Test calendar integration and invite sending

---

### Story 11.3: HRIS Webhook Integration

As a **system**,  
I want **to provide webhook endpoints for HRIS systems**,  
So that **I can receive candidate data and job postings from external systems**.

**Acceptance Criteria:**

**Given** an HRIS system wants to push data  
**When** it sends a webhook  
**Then** the system:
- Receives webhook payload (validates signature)
- Processes data (creates/updates candidates, jobs)
- Sends acknowledgment response
- Logs webhook events in audit trail

**Prerequisites:** Story 1.6 (Deployment Pipeline)

**Technical Notes:**
- Create webhook endpoints: `src/app/api/webhooks/hris/route.ts`
- Validate webhook signatures
- Process webhook payloads asynchronously (BullMQ)
- Test webhook integration with sample payloads

---

### Story 11.4: S3 Storage Integration

As a **system**,  
I want **to integrate with S3-compatible storage for file storage**,  
So that **I can store resumes, offer letters, and evidence packs securely**.

**Acceptance Criteria:**

**Given** the system needs to store files  
**When** I upload a file  
**Then** the system:
- Uploads to S3 (tenant-prefixed: `s3://moar-ats/{tenant_id}/resumes/`)
- Generates signed URLs for downloads (expire after 7 days)
- Handles file uploads (resumes, documents, evidence packs)
- Enforces file size limits (10MB for resumes, 50MB for evidence packs)

**Prerequisites:** Story 1.6 (Deployment Pipeline)

**Technical Notes:**
- Integrate S3: `src/lib/storage/s3.ts`
- Configure tenant-prefixed storage
- Generate signed URLs for secure downloads
- Test file upload and download

---

**Epic 11 Review Summary:**

**Epic 11: System Integrations**  
**Goal:** System connects with external services

**Stories (4 total):**
1. Email Integration (Resend)
2. Calendar Integration (Google Calendar, Outlook)
3. HRIS Webhook Integration
4. S3 Storage Integration

**FRs Covered:** FR50, FR51, FR52, FR53, FR54, FR55

**Status:** Ready to proceed to Epic 12

---

## Epic 12: Analytics & Reporting

**Goal:** TA leaders and compliance partners can view insights and export reports.

### Story 12.1: Pipeline Health Dashboard

As a **TA leader**,  
I want **to view pipeline health metrics (application counts, stage conversion rates, time-to-fill)**,  
So that **I can track hiring progress and identify bottlenecks**.

**Acceptance Criteria:**

**Given** I am a TA leader  
**When** I view the dashboard  
**Then** I see:
- Application counts per job (total, by stage)
- Stage conversion rates (funnel visualization)
- Time-to-fill metrics (average days from posting to offer)
- Bottleneck identification (stages with longest average time)

**Prerequisites:** Story 3.6 (Job Metrics), Story 4.2 (Pipeline View)

**Technical Notes:**
- Create dashboard: `src/app/(recruiter)/dashboard/analytics/page.tsx`
- Create analytics API: `src/app/api/analytics/pipeline/route.ts`
- Use charting library for visualizations
- Test dashboard performance and data accuracy

---

### Story 12.2: AI Adoption Metrics Dashboard

As a **TA leader**,  
I want **to view AI assist adoption metrics**,  
So that **I can measure AI ROI and usage**.

**Acceptance Criteria:**

**Given** AI features are being used  
**When** I view AI metrics  
**Then** I see:
- % of recruiters using AI suggestions
- Response rates to AI-drafted outreach
- AI score acceptance rates
- AI learning progress (how AI is adapting)

**Prerequisites:** Story 5.6 (AI Learning), Story 6.3 (Outreach Learning)

**Technical Notes:**
- Create AI metrics dashboard: `src/app/(recruiter)/dashboard/ai-metrics/page.tsx`
- Calculate metrics from behavior events
- Test metric calculations and display

---

### Story 12.3: Compliance Status Dashboard

As a **compliance partner**,  
I want **to view compliance status dashboards**,  
So that **I can monitor compliance readiness**.

**Acceptance Criteria:**

**Given** compliance features are active  
**When** I view compliance dashboard  
**Then** I see:
- Consent capture rates (% of candidates who consented)
- Audit log completeness (all actions logged)
- Data export readiness (can generate exports on demand)
- Compliance evidence pack status

**Prerequisites:** Story 9.1 (Consent), Story 9.2 (Audit Logging)

**Technical Notes:**
- Create compliance dashboard: `src/app/(compliance)/dashboard/page.tsx`
- Calculate compliance metrics
- Test dashboard and metrics

---

### Story 12.4: Report Export Functionality

As a **TA leader or compliance partner**,  
I want **to export reports and analytics data in CSV/JSON formats**,  
So that **I can analyze data externally or share with stakeholders**.

**Acceptance Criteria:**

**Given** I am viewing analytics or compliance data  
**When** I export reports  
**Then** I can:
- Export pipeline health data (CSV/JSON)
- Export AI adoption metrics (CSV/JSON)
- Export compliance data (CSV/JSON)
- Select date range for export
- Download export file

**Prerequisites:** Story 12.1 (Pipeline Dashboard), Story 12.2 (AI Metrics), Story 12.3 (Compliance Dashboard)

**Technical Notes:**
- Create export service: `src/lib/export/reports.ts`
- Create export API: `POST /api/analytics/export`
- Generate CSV/JSON exports
- Test export generation and download

---

**Epic 12 Review Summary:**

**Epic 12: Analytics & Reporting**  
**Goal:** TA leaders and compliance partners can view insights and export reports

**Stories (4 total):**
1. Pipeline Health Dashboard
2. AI Adoption Metrics Dashboard
3. Compliance Status Dashboard
4. Report Export Functionality

**FRs Covered:** FR61, FR62, FR63, FR64

**Status:** Ready to proceed to Epic 13

---

## Epic 13: Data Security & Management

**Goal:** System ensures data security, performance, and compliance with retention policies.

### Story 13.1: Encryption at Rest and in Transit

As a **system**,  
I want **to encrypt all candidate data at rest and in transit**,  
So that **I protect sensitive PII and comply with security requirements**.

**Acceptance Criteria:**

**Given** data is stored or transmitted  
**When** data is accessed  
**Then** the system:
- Encrypts data at rest (AES-256 for database, S3 server-side encryption)
- Encrypts data in transit (TLS 1.3 for all connections)
- Uses secure key management (AWS Secrets Manager or equivalent)
- Rotates encryption keys regularly (automated rotation)

**Prerequisites:** Story 1.2 (Database Schema), Story 11.4 (S3 Storage)

**Technical Notes:**
- Configure database encryption (PostgreSQL encryption at rest)
- Configure S3 server-side encryption
- Use TLS 1.3 for all API connections
- Set up key management service
- Test encryption and key rotation

---

### Story 13.2: Secure Authentication and Session Management

As a **system**,  
I want **to enforce secure authentication with session management**,  
So that **I protect user accounts and maintain secure sessions**.

**Acceptance Criteria:**

**Given** users are authenticating  
**When** they log in  
**Then** the system:
- Enforces password policies (minimum 8 chars, complexity)
- Manages sessions securely (JWT tokens, configurable timeout)
- Supports SSO (SAML 2.0, OAuth 2.0 for enterprise tenants)
- Supports MFA for sensitive roles (system admins, compliance partners)

**Prerequisites:** Story 2.2 (User Login)

**Technical Notes:**
- Enhance authentication: Add MFA support
- Configure SSO: NextAuth.js SSO providers
- Implement session timeout (8 hours default)
- Test authentication security and session management

---

### Story 13.3: API Rate Limiting

As a **system**,  
I want **to enforce API rate limiting per tenant and per user**,  
So that **I prevent abuse and ensure fair resource usage**.

**Acceptance Criteria:**

**Given** API requests are being made  
**When** rate limits are exceeded  
**Then** the system:
- Limits requests per tenant (e.g., 1000 requests/hour)
- Limits requests per user (e.g., 100 requests/hour)
- Returns 429 Too Many Requests when limit exceeded
- Includes rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining)

**Prerequisites:** Story 1.6 (Deployment Pipeline)

**Technical Notes:**
- Implement rate limiting: `src/lib/middleware/rate-limit.ts`
- Use Redis for rate limit tracking
- Configure limits per endpoint (different limits for different endpoints)
- Test rate limiting and error responses

---

### Story 13.4: Data Retention Policies

As a **system**,  
I want **to support configurable data retention policies**,  
So that **I comply with legal requirements while managing storage**.

**Acceptance Criteria:**

**Given** data retention policies are configured  
**When** retention period expires  
**Then** the system:
- Soft-deletes data after retention period (configurable per tenant)
- Hard-deletes data after extended retention (for audit compliance, default 7 years)
- Maintains audit trail (deletion events logged, immutable)
- Sends notifications before deletion (30 days, 7 days, 1 day warnings)

**Prerequisites:** Story 9.4 (Right to Deletion)

**Technical Notes:**
- Create retention policy service: `src/lib/compliance/retention.ts`
- Configure retention policies per tenant
- Implement automated deletion jobs (BullMQ, runs daily)
- Test retention policies and deletion workflows

---

**Epic 13 Review Summary:**

**Epic 13: Data Security & Management**  
**Goal:** System ensures data security, performance, and compliance with retention policies

**Stories (4 total):**
1. Encryption at Rest and in Transit
2. Secure Authentication and Session Management
3. API Rate Limiting
4. Data Retention Policies

**FRs Covered:** FR65, FR66, FR67, FR68

**Status:** All Epics Complete

---

## FR Coverage Matrix

**Complete mapping of all 68 Functional Requirements to Epics and Stories:**

| FR | Description | Epic | Story |
|---|---|---|---|
| FR1-6 | User Account & Access | Epic 2 | Stories 2.1-2.5 |
| FR7-12 | Job Management | Epic 3 | Stories 3.1-3.6 |
| FR13-18 | Candidate Management | Epic 4 | Stories 4.1-4.6 |
| FR19-24 | AI Resume Processing | Epic 5 | Stories 5.1-5.4 |
| FR25-28 | AI Outreach | Epic 6 | Stories 6.1-6.3 |
| FR30-34 | Interview Scheduling | Epic 7 | Stories 7.1-7.3 |
| FR35-39 | Offer Management | Epic 8 | Stories 8.1-8.3 |
| FR40-45 | Compliance & Audit | Epic 9 | Stories 9.1-9.5 |
| FR46-49 | Multi-Tenancy | Epic 10 | Stories 10.1-10.2 |
| FR50-55 | Integrations | Epic 11 | Stories 11.1-11.4 |
| FR56-60 | AI Learning | Epic 5 | Stories 5.5-5.6 |
| FR61-64 | Reporting & Analytics | Epic 12 | Stories 12.1-12.4 |
| FR65-68 | Data Management | Epic 13 | Stories 13.1-13.4 |

**✅ All 68 Functional Requirements are covered by at least one story.**

---

## Summary

**Total Epics:** 13  
**Total Stories:** 60+  
**FR Coverage:** 100% (all 68 FRs mapped to stories)

**Epic Breakdown:**
- Epic 1: Foundation & Infrastructure (6 stories)
- Epic 2: User Authentication & Access (5 stories)
- Epic 3: Job Posting & Management (6 stories)
- Epic 4: Candidate Application & Management (6 stories)
- Epic 5: AI-Powered Candidate Evaluation (6 stories)
- Epic 6: Candidate Communication & Outreach (3 stories)
- Epic 7: Interview Scheduling (3 stories)
- Epic 8: Offer Management (3 stories)
- Epic 9: Compliance & Audit Automation (5 stories)
- Epic 10: Multi-Tenant Administration (2 stories)
- Epic 11: System Integrations (4 stories)
- Epic 12: Analytics & Reporting (4 stories)
- Epic 13: Data Security & Management (4 stories)

**Context Incorporated:**
- ✅ PRD requirements (68 FRs, NFRs, innovation patterns)
- ✅ UX Design Specification (Trust Navy theme, Dense Dashboard layout, component specs)
- ✅ Architecture decisions (Next.js, PostgreSQL, Prisma, multi-tenant RLS)

**Status:** COMPLETE - Ready for Phase 4 Implementation (Sprint Planning)

---

_This epic breakdown was created through the BMad Method create-epics-and-stories workflow, incorporating context from PRD, UX Design, and Architecture documents. All stories are sized for single dev agent completion and include detailed acceptance criteria, prerequisites, and technical notes._

---

