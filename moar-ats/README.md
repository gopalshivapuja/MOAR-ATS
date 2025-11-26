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

## Next Steps

- User registration UI (Epic 2)
- Password reset flow (Epic 2)
- Role-based access control (Epic 2)
- Multi-tenant middleware improvements (Story 1.4)
- UI component library (Story 1.5)

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
