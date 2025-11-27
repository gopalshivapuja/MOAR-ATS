# Deployment Repository Setup Guide

## Overview

This guide explains how to set up a clean deployment repository (`moar-ats-app`) that contains only the application code, ready for Vercel deployment.

## Repository Structure

### Deployment Repository Contents

```
moar-ats-app/
├── .env.example          # Environment variable template
├── .gitignore            # Deployment-specific gitignore
├── README.md             # Deployment instructions
├── package.json          # Dependencies
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
└── src/                  # Application source code
    ├── app/
    ├── components/
    ├── lib/
    └── types/
```

### Excluded from Deployment Repo

- `docs/` - Project documentation
- `.bmad/` - BMAD method files
- `.cursor/` - Cursor rules
- `docker-compose.yml` - Local development only
- `scripts/` - Project scripts
- Sprint artifacts and story files

## Setup Instructions

### Step 1: Create Deployment Repository

1. Go to GitHub and create a new repository: `moar-ats-app`
2. Make it private (or public, your choice)
3. Don't initialize with README, .gitignore, or license

### Step 2: Set Up Sync Script

Create a script to sync `moar-ats/` folder to deployment repo:

**Option A: Manual Sync Script**

Create `scripts/sync-to-deployment.sh`:

```bash
#!/bin/bash

# Configuration
DEPLOYMENT_REPO="git@github.com:your-username/moar-ats-app.git"
TEMP_DIR="/tmp/moar-ats-deployment"

# Clean up previous temp directory
rm -rf $TEMP_DIR

# Clone deployment repo
git clone $DEPLOYMENT_REPO $TEMP_DIR

# Copy moar-ats folder contents
cp -r moar-ats/* $TEMP_DIR/

# Copy essential files
cp moar-ats/.env.example $TEMP_DIR/ 2>/dev/null || true
cp moar-ats/.gitignore $TEMP_DIR/ 2>/dev/null || true

# Commit and push
cd $TEMP_DIR
git add .
git commit -m "chore: Sync from main repo - $(date +%Y-%m-%d)"
git push origin main

# Clean up
cd -
rm -rf $TEMP_DIR

echo "✅ Synced to deployment repo"
```

**Option B: GitHub Actions (Automatic)**

See `.github/workflows/sync-deployment.yml` in main repo.

### Step 3: Configure Vercel

1. **Connect Repository:**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Select `moar-ats-app` repository

2. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `/` (root of repo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

3. **Environment Variables:**
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_URL` - Your Vercel deployment URL
   - `NEXTAUTH_SECRET` - Generated secret key

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to `main`

## Deployment Repository .gitignore

Create `.gitignore` in deployment repo:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Prisma
*.db
*.db-journal

# Logs
logs/
*.log

# Temporary files
tmp/
temp/
*.tmp
```

## Deployment Repository README

Create `README.md` in deployment repo:

```markdown
# MOAR ATS - Application

Multi-tenant Applicant Tracking System built with Next.js, PostgreSQL, and NextAuth.js.

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 16.x
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma db seed
```

### Development

```bash
npm run dev
```

### Deployment

This repository is configured for automatic deployment on Vercel.

See main repository for full documentation and development guides.

## License

Private - MOAR Advisory
```

## Sync Workflow

### Manual Sync

```bash
# From main repository root
./scripts/sync-to-deployment.sh
```

### Automatic Sync

GitHub Actions will automatically sync when:
- Code is merged to `main` branch
- Changes are made to `moar-ats/` folder

## Troubleshooting

### Issue: Deployment repo out of sync

**Solution:** Run sync script manually or trigger GitHub Action

### Issue: Missing files in deployment

**Solution:** Check that files are in `moar-ats/` folder, not root

### Issue: Vercel build fails

**Solution:** 
1. Check environment variables are set
2. Verify `package.json` has correct build scripts
3. Check Vercel logs for specific errors

## Security Notes

- Never commit `.env.local` or `.env` files
- Use Vercel environment variables for secrets
- Keep deployment repo private if it contains sensitive configs
- Rotate `NEXTAUTH_SECRET` regularly

