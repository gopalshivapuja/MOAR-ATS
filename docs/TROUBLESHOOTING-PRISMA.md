# Troubleshooting Prisma Studio - Database URL Issue

## Problem

When running `npx prisma studio`, you get:
```
Error: No database URL found. Provide it via the `--url <url>` argument or define it in your Prisma config file as `datasource.url`.
```

## Solution

Prisma needs to read `DATABASE_URL` from your `.env.local` file. Here are three ways to fix it:

### Option 1: Use the Helper Script (Recommended)

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"
npm run db:studio
```

This script automatically loads `.env.local` before running Prisma Studio.

### Option 2: Load Environment Variables Manually

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Then run Prisma Studio
npx prisma studio
```

### Option 3: Pass DATABASE_URL Directly

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Get DATABASE_URL from .env.local
DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d '=' -f2 | tr -d '"')

# Run Prisma Studio with explicit URL
npx prisma studio --url "$DATABASE_URL"
```

## Why This Happens

- Prisma looks for `.env` files by default
- Next.js uses `.env.local` for local development
- Prisma doesn't automatically read `.env.local` without configuration

## Quick Fix for Testing

For now, use the helper script:

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"
npm run db:studio
```

This will open Prisma Studio at http://localhost:5555

