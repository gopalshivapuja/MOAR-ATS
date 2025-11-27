# MOAR ATS

Multi-tenant Applicant Tracking System built with Next.js, PostgreSQL, and NextAuth.js.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 16.x (local or Docker)
- npm or yarn

### Installation

1. **Clone the repository** (if not already cloned)
   ```bash
   git clone <repository-url>
   cd moar-ats
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and configure it:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and ensure the following variables are set:
   ```env
   # Database connection
   DATABASE_URL="postgresql://user:password@localhost:5432/moar_ats?schema=public"
   
   # NextAuth configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```
   
   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   
   Copy the output and paste it as the value for `NEXTAUTH_SECRET` in `.env.local`.

4. **Set up the database**
   
   If using Docker Compose (recommended for development):
   ```bash
   # From project root
   docker-compose up -d
   ```
   
   Or use a local PostgreSQL instance. Make sure the database exists and `DATABASE_URL` points to it.

   **Shortcut:** Story 1.6 ships a helper script so you don't have to memorize compose commands:

   ```bash
   # Start services
   ./scripts/dev-stack.sh up

   # Tail logs
   ./scripts/dev-stack.sh logs

   # Stop everything (keep data)
   ./scripts/dev-stack.sh down

   # Stop + wipe volumes
   ./scripts/dev-stack.sh clean
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```
   
   This will:
   - Create all database tables
   - Apply the NextAuth adapter tables (Account, Session, VerificationToken)
   - Generate the Prisma client

6. **Seed the database** (optional, for development)
   ```bash
   npx prisma db seed
   ```
   
   This creates the MOAR Advisory tenant for testing.

7. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Scripts & Tooling (Story 1.6 Enhancements)

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js hot reload |
| `npm run type-check:watch` | Continuous `tsc --noEmit` feedback loop |
| `npm test` | Jest unit + integration suites (80% coverage threshold) |
| `npm run test:e2e` | Playwright smoke (verifies landing page + `/api/health`) |
| `npm run test:e2e:ui` | Launches Playwright UI mode for debugging |
| `npm run type-check` | One-off CI style TS gate |
| `npx playwright install` | One-time browser install before e2e |

> The e2e spec lives at `__tests__/e2e/health-check.spec.ts` so future stories can clone the pattern.

## Authentication Setup

### First User Registration

1. Navigate to the registration endpoint (or create a registration page):
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "Admin123!",
       "name": "Admin User"
     }'
   ```

2. Or use the login page at `/login` (registration link will be available in Epic 2)

### Login

1. Navigate to `/login`
2. Enter your email and password
3. You'll be redirected to the home page upon successful login

### Logout

Use the `LogoutButton` component or call NextAuth's `signOut()` function:
```typescript
import { signOut } from 'next-auth/react';

await signOut({ redirect: true, callbackUrl: '/login' });
```

## Project Structure

```
moar-ats/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   └── login/         # Login page
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   └── auth/              # Auth components
│   ├── lib/                   # Utilities
│   │   ├── auth/             # Authentication utilities
│   │   │   ├── config.ts     # NextAuth configuration
│   │   │   └── password-validation.ts
│   │   └── db/               # Database utilities
│   │       └── prisma.ts     # Prisma client
│   ├── middleware.ts         # Next.js middleware (protected routes)
│   └── types/                # TypeScript types
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts               # Seed script
└── __tests__/                # Tests
    ├── unit/                 # Unit tests
    ├── integration/          # Integration tests
    └── e2e/                  # E2E tests
```

## Development

### Running Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests (requires server running)
npm run test:e2e
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration-name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Base URL of your application | Yes |
| `NEXTAUTH_SECRET` | Secret key for signing tokens | Yes |
| `REDIS_URL` | Redis connection string (for future use) | No |

## Authentication Features

- ✅ Email/password authentication
- ✅ Password complexity validation (8+ chars, uppercase, number, special char)
- ✅ Secure password hashing (bcrypt, 10 rounds)
- ✅ JWT session management (8-hour timeout)
- ✅ Protected routes middleware
- ✅ Multi-tenant support (tenantId in session)
- ✅ CSRF protection
- ✅ Secure cookie settings

## Multi-Tenant Architecture

MOAR ATS implements comprehensive tenant isolation at multiple layers:

### Tenant Isolation Layers

1. **Next.js Middleware** (`src/middleware.ts`)
   - Extracts `tenant_id` from authenticated user's session
   - Sets tenant context for all downstream API routes and components
   - Validates tenant access on every request
   - Returns 403 Forbidden if tenant context is missing
   - Logs all tenant access attempts for audit

2. **Prisma Middleware** (`src/lib/db/prisma.ts`)
   - Automatically filters all database queries by `tenant_id`
   - Applies to all operations: `findMany`, `findUnique`, `create`, `update`, `delete`
   - System admins can bypass tenant restrictions (for tenant management)
   - Validates tenant context before executing queries

3. **PostgreSQL Row-Level Security (RLS)**
   - Database-level policies prevent cross-tenant data access
   - All tenant-aware tables have RLS enabled
   - Policies check `tenant_id` matches authenticated user's tenant
   - System admins can bypass RLS (for tenant management)

### Using Tenant Context

#### In API Routes

Tenant context is automatically set by middleware. Use it in your API routes:

```typescript
import { requireTenantId } from '@/lib/tenant/context';
import { db } from '@/lib/db/prisma';

export async function GET(request: Request) {
  // Get tenant ID (throws if missing)
  const tenantId = requireTenantId();
  
  // All queries are automatically filtered by tenant_id
  const users = await db.user.findMany();
  // Only returns users from the current tenant
  
  return Response.json({ data: users });
}
```

#### In React Components

Use the `useTenant` hook to access tenant context:

```typescript
'use client';

import { useTenant } from '@/hooks/useTenant';

export function MyComponent() {
  const { tenantId, isLoading, error } = useTenant();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!tenantId) return <div>No tenant context</div>;
  
  return <div>Current Tenant: {tenantId}</div>;
}
```

#### Tenant-Scoped Queries

All Prisma queries are automatically filtered by tenant. Examples:

```typescript
// Find all users in current tenant
const users = await db.user.findMany();

// Find user by ID (only if in current tenant)
const user = await db.user.findUnique({
  where: { id: userId }
});

// Create user (tenant_id automatically set)
const newUser = await db.user.create({
  data: {
    email: 'user@example.com',
    name: 'User Name',
    // tenantId is automatically set by middleware
  }
});

// Update user (only if in current tenant)
await db.user.update({
  where: { id: userId },
  data: { name: 'Updated Name' }
});
```

#### System Admin Operations

System admins can access all tenants using `withTenant`:

```typescript
import { withTenant } from '@/lib/db/prisma';

// Access tenant 2 data as system admin
const users = await withTenant('tenant-2-id', async (prisma) => {
  return prisma.user.findMany();
});
```

### RLS Policy Structure

Row-Level Security policies are defined in the database migration:
- All tenant-aware tables have RLS enabled
- Policies check `tenant_id` matches authenticated user's tenant
- System admins can bypass RLS (for tenant management)
- Policies prevent direct SQL access with wrong `tenant_id`

See `prisma/migrations/*_add_rls_policies/migration.sql` for policy definitions.

### Audit Logging

All tenant access attempts are logged:
- Tenant ID, User ID, Action, Resource Type, Timestamp
- Success/Failure status
- Structured JSON format
- Tenant-tagged for compliance reviews

Logs are currently written to console in development. In production (Story 9), logs will be written to the `audit_logs` table.

## UI Component Library

MOAR ATS uses [shadcn/ui](https://ui.shadcn.com/) as the base component library, customized with the Trust Navy theme.

### Component Showcase

Visit `/showcase` in development to see all components with their variants and examples.

### Available Components

- **Button** - Primary, Secondary, Tertiary (Outline), Ghost, Link, Destructive variants
- **Input** - Text inputs with focus states, error states, disabled states
- **FormField** - Form wrapper with labels above fields, required indicators, error messages
- **Card** - Container component with header, content, footer
- **Dialog** - Modal dialogs for important interactions
- **Skeleton** - Loading placeholders for content
- **Spinner** - Loading spinner component
- **Sonner** - Toast notifications (replaces deprecated Toast component)
- **Label** - Form labels with accessibility support

### Trust Navy Theme

**Color Palette:**
- **Primary:** `#1e3a5f` (Deep Navy) - Main actions, buttons
- **Secondary:** `#0d47a1` (Rich Blue) - Supporting actions
- **Accent:** `#42a5f5` (Bright Blue) - Highlights, focus states, CTAs
- **Success:** `#28a745` - Success states
- **Warning:** `#ffc107` - Warning states
- **Error:** `#dc3545` - Error states

**Typography:**
- **Headings:** Roboto Slab (serif) - Professional, authoritative
- **Body:** Roboto (sans-serif) - Clean, readable
- **Type Scale:** H1 (40px), H2 (32px), H3 (24px), H4 (20px), H5 (18px), H6 (16px), Body (16px), Small (14px)

**Spacing:**
- **Base Unit:** 4px system
- **Scale:** xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)

**Border Radius:**
- Small (4px), Medium (8px), Large (12px), Round (50%)

### Using Components

```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"

export function MyForm() {
  return (
    <form>
      <FormField label="Email" required>
        <Input type="email" id="email" placeholder="Enter email" />
      </FormField>
      <Button variant="default">Submit</Button>
    </form>
  )
}
```

### Accessibility

All components are WCAG 2.1 Level AA compliant:
- ✅ ARIA labels on interactive components
- ✅ Keyboard navigation support (Tab, Enter, Space, Escape)
- ✅ Visible focus indicators (accent color ring)
- ✅ Color contrast ratios meet standards (4.5:1 for text, 3:1 for interactive)
- ✅ Screen reader compatible with semantic HTML

### Responsive Design

Components are responsive with breakpoints:
- **Mobile:** max 767px
- **Tablet:** 768-1023px
- **Desktop:** min 1024px

### Testing Components

Component tests are located in `__tests__/unit/ui/`:
- `button.test.tsx` - Button variants and interactions
- `input.test.tsx` - Input states and validation
- `form-field.test.tsx` - Form field patterns
- `accessibility.test.tsx` - Keyboard navigation and ARIA

Run component tests:
```bash
npm test -- __tests__/unit/ui/
```

## Next Steps

- User registration UI (Epic 2)
- Password reset flow (Epic 2)
- Role-based access control (Epic 2)
- Multi-tenant middleware improvements (Story 1.4)
- ✅ UI component library (Story 1.5) - Complete

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
   ```bash
   docker-compose ps
   # or
   psql -U postgres -h localhost
   ```

2. Check `DATABASE_URL` in `.env.local` matches your database configuration

3. Ensure the database exists:
   ```sql
   CREATE DATABASE moar_ats;
   ```

### NextAuth Issues

1. Verify `NEXTAUTH_SECRET` is set in `.env.local`
2. Check `NEXTAUTH_URL` matches your application URL
3. Ensure NextAuth API route is accessible at `/api/auth/*`

### Migration Issues

1. If migration fails, check database connection
2. Verify Prisma schema syntax: `npx prisma format`
3. Reset and re-run migrations if needed: `npx prisma migrate reset`

## License

Private - MOAR Advisory

## Deployment & Rollback (Vercel pipeline readiness)

1. **Link project**
   ```bash
   cd moar-ats
   vercel login
   vercel link
   ```

2. **Configure env vars (Vercel dashboard → Settings → Environment Variables)**
   - `DATABASE_URL` (Vercel Postgres / Neon)
   - `NEXTAUTH_URL` (e.g., `https://moar-ats.vercel.app`)
   - `NEXTAUTH_SECRET`
   - Optional: `REDIS_URL`, S3, AI keys

3. **Automatic migrations:** Story 1.6 adds a `postbuild` script that runs `prisma migrate deploy`. As long as `DATABASE_URL` is set, every Vercel build executes migrations before the app starts.

4. **Health verification:** Hit `/api/health` (returns `{ status: "ok", timestamp }`). The Playwright smoke test uses the same endpoint, so CI fails before a bad deploy reaches users.

5. **Rollback:** `vercel rollback <deployment-id>` immediately points traffic back to a previous deployment. Keep the ID from `vercel ls` handy after each release.

Document every deploy/rollback in `docs/deployment/DEPLOYMENT-STRATEGY.md` so sprint history stays accurate.
