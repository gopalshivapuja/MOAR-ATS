# Local Development Setup Guide

**Author:** Gopal  
**Date:** 2025-11-26  
**Purpose:** Complete guide for setting up local development environment

---

## ✅ Story 1.6 Quick Checklist

Use this list before saying "dev env is ready":

1. `./scripts/dev-stack.sh up` succeeds (Postgres 16 + Redis 7 running).
2. `.env.local` created from `.env.example` with real secrets.
3. `npm install` (project root) followed by `npm run dev` → hot reload working.
4. `npm run type-check:watch` shows the new live TypeScript feedback loop.
5. `npm test` (Jest) + `npm run test:e2e` (Playwright) both pass.
6. `npx prisma migrate dev` succeeds on host **and** when pointed at the Compose database.
7. README + this guide updated if you discovered extra steps—so the next agent never guesses.

If any box is unchecked, capture the fix (docs + scripts) before moving to the next story.

## 🎯 Understanding Node.js Package Management

### Node.js vs Python Virtual Environments

**Key Difference:**
- **Python**: Uses virtual environments (`venv`, `conda`) to isolate packages globally
- **Node.js**: Uses **project-local `node_modules/`** - packages are installed per project, not globally

**How It Works:**
- When you run `npm install` in `moar-ats/`, packages go into `moar-ats/node_modules/`
- Each project has its own isolated dependencies
- **No global pollution** - different projects can use different versions of the same package
- `package.json` + `package-lock.json` lock exact versions for reproducibility

**Your Current Setup:**
```
moar-ats/
├── node_modules/          # All packages installed HERE (project-local)
├── package.json           # Dependency list
└── package-lock.json      # Exact version locks
```

✅ **You're already doing it right!** Packages from Story 1.1 and 1.2 are installed locally in `moar-ats/node_modules/`, not globally.

---

## 🛠️ Complete Local Development Setup

### Step 1: Node.js Version Management (Optional but Recommended)

**Use `nvm` (Node Version Manager) to manage Node.js versions:**

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 18.x (required for Next.js 16)
nvm install 18
nvm use 18

# Verify
node --version  # Should show v18.x.x
npm --version
```

**Why?** Different projects may need different Node.js versions. `nvm` lets you switch easily.

---

### Step 2: Install PostgreSQL Locally

**Option A: Docker Compose (Recommended - Easiest)**

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: moar-ats-postgres
    environment:
      POSTGRES_USER: moar_ats
      POSTGRES_PASSWORD: dev_password_change_in_production
      POSTGRES_DB: moar_ats
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U moar_ats"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: moar-ats-redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

**Start services:**
```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs postgres

# Stop services
docker-compose down

# Stop and remove data (fresh start)
docker-compose down -v
```

#### One-liner helper script

Once Docker Desktop is installed you can lean on the Story 1.6 helper script instead of memorizing every compose command:

```bash
# Start the stack (Postgres + Redis)
./scripts/dev-stack.sh up

# Follow logs until Ctrl+C
./scripts/dev-stack.sh logs

# Stop services (keeps volumes)
./scripts/dev-stack.sh down

# Nukes volumes for a clean slate
./scripts/dev-stack.sh clean
```

The script auto-detects whether your machine exposes `docker compose` or the legacy `docker-compose` binary, so it runs the right command on both macOS and Linux without tweaks.

**Option B: Homebrew (macOS)**

```bash
# Install PostgreSQL 16
brew install postgresql@16

# Start PostgreSQL
brew services start postgresql@16

# Create database
createdb moar_ats

# Connect to verify
psql -d moar_ats
```

**Option C: Direct Install (Linux)**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-16

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb moar_ats
```

---

### Step 3: Configure Environment Variables

**Create `.env.local` from template:**

```bash
cd moar-ats
cp .env.example .env.local
```

**Edit `.env.local` with your local database connection:**

```bash
# Database (Docker Compose)
DATABASE_URL="postgresql://moar_ats:dev_password_change_in_production@localhost:5432/moar_ats?schema=public"

# Or if using Homebrew/local PostgreSQL
DATABASE_URL="postgresql://your_username@localhost:5432/moar_ats?schema=public"

# NextAuth (generate a random secret)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here-generate-with-openssl-rand-base64-32"

# Redis (Docker Compose)
REDIS_URL="redis://localhost:6379"

# Optional for now (will be needed later)
# AWS_ACCESS_KEY_ID=""
# AWS_SECRET_ACCESS_KEY=""
# AWS_S3_BUCKET=""
# RESEND_API_KEY=""
# OPENAI_API_KEY=""
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### Step 4: Run Database Migration

```bash
cd moar-ats

# Generate Prisma Client (if not done)
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

**Verify migration:**
```bash
# Check migration status
npx prisma migrate status

# Open Prisma Studio (visual database browser)
npx prisma studio
```

> ✅ Guardrail check: we validated `npx prisma migrate dev` in two environments during Story 1.6—
> 1. **macOS host** with Homebrew Postgres.
> 2. **Docker Compose** by running `docker compose exec postgres pg_isready` followed by `DATABASE_URL="postgresql://moar_ats:dev_password_change_in_production@postgres:5432/moar_ats" npx prisma migrate dev`.
> This ensures both onboarding paths behave consistently.

---

### Step 5: Start Development Server

```bash
# Start Next.js dev server
npm run dev

# Open http://localhost:3000
```

### Step 6: Hot Reload + Type Safety Watchers

Story 1.6 formalizes the rapid feedback loop:

```bash
# Run both Next.js hot reload + live type checks
npm run dev
npm run type-check:watch
```

- `npm run dev` gives you the usual App Router hot reload experience.
- `npm run type-check:watch` runs `tsc --noEmit --watch`, so TypeScript violations pop immediately even if ESLint is quiet.

When you need a one-off CI-style gate, run:

```bash
npm run type-check
npm run lint
```

### Step 7: Testing & Coverage

```bash
# Unit + integration suites (Jest)
npm test

# Coverage gate (80% global threshold enforced via jest.config.js)
npm run test:coverage

# End-to-end smoke (Playwright + health check)
npm run test:e2e
```

> **Heads-up:** The first time you run Playwright, install the browsers once:
> ```bash
> npx playwright install
> ```

Story 1.6 also adds a scripted e2e spec (`__tests__/e2e/health-check.spec.ts`) so you always have a runnable template to extend. It exercises the landing page and `/api/health` route, validating the deployment pipeline before real product flows exist.

- Jest now auto-loads `.env.local` during Story 1.6 runs, so the integration suites reuse the same Postgres connection string as `npm run dev`. Keep the Docker stack running before executing `npm test` or the pool will fail to connect.

---

## 📦 Package Management Best Practices

### ✅ DO:
- ✅ Always run `npm install` in project directory (installs to `node_modules/`)
- ✅ Commit `package.json` and `package-lock.json` to Git
- ✅ Use exact versions for critical packages (Next.js, Prisma)
- ✅ Use `npm ci` in CI/CD (clean install, faster, more reliable)

### ❌ DON'T:
- ❌ Install packages globally with `npm install -g` (except CLI tools like `npx`)
- ❌ Commit `node_modules/` to Git (already in `.gitignore`)
- ❌ Commit `.env.local` (already in `.gitignore`)
- ❌ Use `npm install` without `package-lock.json` (locks versions)

---

## 🚀 Migration to Production

### Phase 1: MVP Deployment (Vercel - Recommended)

**Why Vercel?**
- ✅ Zero-config Next.js deployment
- ✅ Automatic HTTPS, CDN, edge functions
- ✅ Free tier for MVP
- ✅ Git integration (auto-deploy on push)
- ✅ Built-in environment variable management

**Step-by-Step Migration:**

#### 1. Prepare for Deployment

```bash
# Ensure all environment variables are documented in .env.example
# Test production build locally
npm run build
npm start  # Test production server locally
```

#### 2. Set Up Vercel Project

```bash
# Install Vercel CLI (globally - this is OK for CLI tools)
npm install -g vercel

# Login to Vercel
vercel login

# Link project (from moar-ats directory)
cd moar-ats
vercel link

# Deploy
vercel
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import Git repository
3. Vercel auto-detects Next.js
4. Configure environment variables
5. Deploy!

#### 3. Set Up Database (Vercel Postgres or External)

**Option A: Vercel Postgres (Easiest)**
- Built into Vercel dashboard
- Automatic connection string
- Free tier: 256 MB storage, 60 hours compute/month

**Option B: External Managed PostgreSQL**
- **Neon** (Recommended): Serverless PostgreSQL, generous free tier
- **Supabase**: PostgreSQL + auth + storage, free tier
- **Railway**: Simple PostgreSQL hosting, $5/month
- **AWS RDS**: Enterprise-grade, pay-as-you-go

**Connection String Format:**
```
postgresql://user:password@host:5432/database?sslmode=require
```

#### 4. Configure Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.local`:
   - `DATABASE_URL` (from Vercel Postgres or external)
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET` (same as local, or generate new)
   - `REDIS_URL` (Upstash Redis - free tier available)
   - Other API keys as needed

#### 5. Run Migrations on Production

**Option A: Vercel Build Command (Automatic)**
Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "prisma migrate deploy"
  }
}
```

**Option B: Manual Migration**
```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-connection-string"

# Run migrations
npx prisma migrate deploy
```

#### 6. Deploy and Verify

```bash
# Push to main branch (triggers auto-deploy)
git push origin main

# Or deploy manually
vercel --prod

# Check deployment
vercel ls
```

---

### Phase 2: Enterprise Deployment (AWS/Oracle Cloud)

**When to Migrate:**
- Need more control over infrastructure
- Require enterprise compliance (SOC-2, etc.)
- Need to scale beyond Vercel limits
- Want GitOps workflow (Terraform + ArgoCD)

**Migration Strategy:**

#### Option A: AWS (Recommended for Enterprise)

**Architecture:**
- **Compute**: ECS/EKS with Podman containers
- **Database**: RDS PostgreSQL 16.x
- **Storage**: S3 + CloudFront CDN
- **Cache**: ElastiCache Redis
- **CI/CD**: GitHub Actions → Terraform → ArgoCD

**Steps:**
1. Containerize application (Dockerfile)
2. Set up Terraform modules for infrastructure
3. Configure ArgoCD for GitOps deployments
4. Migrate database (pg_dump/pg_restore)
5. Update DNS and cutover

**Estimated Timeline:** 2-4 weeks for full migration

#### Option B: Oracle Cloud Infrastructure (OCI)

**Architecture:**
- **Compute**: OKE (Oracle Kubernetes Engine) or Compute Instances
- **Database**: OCI Autonomous Database (PostgreSQL)
- **Storage**: Object Storage
- **Cache**: Redis on Compute or managed service

**Steps:**
1. Set up OCI account and configure networking
2. Provision Autonomous Database (PostgreSQL)
3. Deploy application to OKE or Compute
4. Configure load balancer and DNS
5. Migrate data from Vercel

**Estimated Timeline:** 1-2 weeks

#### Option C: Railway (Simpler Alternative)

**Why Railway?**
- ✅ Simpler than AWS/OCI
- ✅ Good for small-to-medium scale
- ✅ PostgreSQL + Redis included
- ✅ Git-based deployments
- ✅ $5/month starter plan

**Steps:**
1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Add PostgreSQL and Redis services
4. Configure environment variables
5. Deploy!

**Estimated Timeline:** 1-2 hours

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables documented in `.env.example`
- [ ] Production build tested locally (`npm run build`)
- [ ] Database migrations tested
- [ ] All secrets stored securely (not in code)
- [ ] `.gitignore` excludes sensitive files

### Vercel Deployment
- [ ] Vercel project created and linked
- [ ] Environment variables configured
- [ ] Database provisioned (Vercel Postgres or external)
- [ ] Migrations run on production database
- [ ] Domain configured (optional)
- [ ] Health check endpoint working

### Post-Deployment
- [ ] Application accessible at production URL
- [ ] Database connection verified
- [ ] Authentication flow tested
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Backup strategy configured

---

## 🔄 Development Workflow

### Daily Development

```bash
# Start local services (PostgreSQL, Redis)
docker-compose up -d

# Start Next.js dev server
npm run dev

# Make changes, test locally
# ...

# Run migrations if schema changed
npx prisma migrate dev --name your-migration-name

# Commit and push
git add .
git commit -m "feat: your feature"
git push
```

### Before Deploying

```bash
# Test production build
npm run build
npm start

# Run tests (when Story 1.6 is done)
npm test

# Check for linting errors
npm run lint

# Verify migrations
npx prisma migrate status
```

---

## 🎓 Learning Resources

**Node.js Package Management:**
- [npm documentation](https://docs.npmjs.com/)
- [Understanding package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

**Docker & Docker Compose:**
- [Docker getting started](https://docs.docker.com/get-started/)
- [Docker Compose tutorial](https://docs.docker.com/compose/gettingstarted/)

**Vercel Deployment:**
- [Vercel documentation](https://vercel.com/docs)
- [Next.js deployment guide](https://nextjs.org/docs/deployment)

**Database Migration:**
- [Prisma migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL backup/restore](https://www.postgresql.org/docs/current/backup.html)

---

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database connection errors
```bash
# Check if PostgreSQL is running
docker-compose ps  # or
brew services list

# Verify connection string in .env.local
# Test connection
psql $DATABASE_URL
```

### Migration errors
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or check migration status
npx prisma migrate status
```

---

_This guide will be updated as we progress through Epic 1 stories._

