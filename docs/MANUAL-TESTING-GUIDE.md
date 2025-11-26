# Manual Testing Guide - Stories 1.1, 1.2, 1.3

## Overview

This guide walks you through manually testing all three foundation stories before merging your PR.

**Stories to Test:**
- ✅ Story 1.1: Project setup and initial configuration
- ✅ Story 1.2: Database schema and Prisma setup
- ✅ Story 1.3: Authentication foundation with NextAuth.js

---

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18.x or higher installed
- ✅ Docker Desktop running (for PostgreSQL)
- ✅ Git repository cloned
- ✅ All dependencies installed

---

## Step 1: Environment Setup

### 1.1 Check Environment Variables

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Check if .env.local exists
ls -la .env.local

# If it doesn't exist, create it from .env.example
cp .env.example .env.local
```

### 1.2 Verify Environment Variables

Edit `.env.local` and ensure these are set:

```env
DATABASE_URL="postgresql://moar_ats:dev_password_change_in_production@localhost:5432/moar_ats?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Generate NEXTAUTH_SECRET if needed:**
```bash
openssl rand -base64 32
```

---

## Step 2: Start Database (Story 1.2)

### 2.1 Start Docker Compose

```bash
cd "/Users/gopal/Cursor/MOAR ATS"

# Start PostgreSQL and Redis
docker-compose up -d

# Verify containers are running
docker-compose ps
```

**Expected Output:**
```
NAME                STATUS
moar-ats-postgres   Up
moar-ats-redis      Up
```

### 2.2 Verify Database Connection

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Test database connection
npx prisma db pull
```

**Expected:** Should connect successfully without errors.

### 2.3 Run Database Migrations

```bash
# Apply all migrations
npx prisma migrate deploy

# Or if you need to create new migrations
npx prisma migrate dev
```

**Expected:** Migrations should apply successfully.

### 2.4 Seed the Database

```bash
# Seed initial data (MOAR Advisory tenant)
npx prisma db seed
```

**Expected:** Seed script runs successfully.

### 2.5 Verify Database Schema

```bash
# Open Prisma Studio to view database
npx prisma studio
```

**What to Check:**
- ✅ `tenants` table has "MOAR Advisory" tenant
- ✅ `users` table exists (empty initially)
- ✅ `accounts`, `sessions`, `verification_tokens` tables exist (NextAuth)

**Close Prisma Studio** when done (Ctrl+C in terminal).

---

## Step 3: Install Dependencies (Story 1.1)

### 3.1 Install Node Modules

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Install all dependencies
npm install
```

**Expected:** All packages install without errors.

### 3.2 Verify Key Packages

```bash
# Check Next.js version
npm list next

# Check NextAuth version
npm list next-auth

# Check Prisma version
npm list prisma
```

**Expected Versions:**
- Next.js: 16.0.4
- NextAuth: 5.0.0-beta.30
- Prisma: 7.0.1

---

## Step 4: Run Tests (Story 1.3)

### 4.1 Run Unit Tests

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Run password validation tests
npm test -- __tests__/unit/auth/password-validation.test.ts
```

**Expected:** 11 tests passing ✅

### 4.2 Run All Tests

```bash
# Run all tests
npm test
```

**Expected:** All tests pass.

---

## Step 5: Start Development Server (Story 1.1)

### 5.1 Start Next.js Dev Server

```bash
cd "/Users/gopal/Cursor/MOAR ATS/moar-ats"

# Start development server
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 16.0.4
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in X seconds
```

### 5.2 Verify Server is Running

Open browser: http://localhost:3000

**Expected:** Next.js welcome page or your app's home page loads.

---

## Step 6: Test Authentication (Story 1.3)

### 6.1 Test Registration API

**Using curl:**

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

**Expected Response:**
```json
{
  "data": {
    "user": {
      "id": "...",
      "email": "test@example.com",
      "name": "Test User",
      "tenantId": "...",
      "role": "recruiter"
    }
  }
}
```

**Test Invalid Password:**

```bash
# Try weak password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "password": "weak",
    "name": "Test User 2"
  }'
```

**Expected:** Error response with validation messages.

**Test Duplicate Email:**

```bash
# Try same email again
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

**Expected:** Error: "User with this email already exists"

### 6.2 Test Login Page

1. **Navigate to:** http://localhost:3000/login

2. **Verify Page Loads:**
   - ✅ Login form displays
   - ✅ Email and password fields visible
   - ✅ "Sign In" button present
   - ✅ "Register" link present
   - ✅ Trust Navy theme colors applied (#1e3a5f)

3. **Test Form Validation:**
   - Try submitting empty form → Should show validation errors
   - Try invalid email format → Should show error
   - Try valid email but wrong password → Should show "Invalid email or password"

4. **Test Successful Login:**
   - Enter: `test@example.com` / `Test123!`
   - Click "Sign In"
   - **Expected:** Redirects to home page (`/`)

### 6.3 Test Session Persistence

1. **After logging in:**
   - Refresh the page (F5)
   - **Expected:** Still logged in (session persists)

2. **Check Browser Cookies:**
   - Open DevTools → Application → Cookies
   - Look for `next-auth.session-token`
   - **Expected:** Cookie exists and is httpOnly

### 6.4 Test Logout

**Option A: Using Browser (if LogoutButton is on page)**

1. Find logout button (if added to a page)
2. Click "Sign Out"
3. **Expected:** Redirects to `/login`

**Option B: Using API**

```bash
# Sign out (requires session cookie)
curl -X POST http://localhost:3000/api/auth/signout \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Option C: Manual Cookie Deletion**

1. Open DevTools → Application → Cookies
2. Delete `next-auth.session-token`
3. Refresh page
4. **Expected:** Redirected to login

### 6.5 Test Protected Routes

1. **While Logged Out:**
   - Try to access: http://localhost:3000/recruiter
   - **Expected:** Redirects to `/login?callbackUrl=/recruiter`

2. **While Logged In:**
   - Access: http://localhost:3000/recruiter
   - **Expected:** Page loads (or shows content if route exists)

3. **Test Protected API Route:**
   ```bash
   # Without authentication
   curl http://localhost:3000/api/some-protected-route
   ```
   **Expected:** `{"error":{"code":"UNAUTHORIZED","message":"Authentication required"}}`

---

## Step 7: Verify Database State

### 7.1 Check User Created

```bash
# Open Prisma Studio
npx prisma studio
```

**Navigate to `users` table:**
- ✅ Should see your test user
- ✅ `passwordHash` should be hashed (not plain text)
- ✅ `tenantId` should match MOAR Advisory tenant
- ✅ `email` should be `test@example.com`

**Navigate to `sessions` table:**
- ✅ Should see active session (if logged in)
- ✅ `sessionToken` should exist
- ✅ `expires` should be ~8 hours from now

### 7.2 Verify Password Security

```bash
# Check password hash format
npx prisma studio
# Look at users table → passwordHash column
```

**Expected:** Password hash starts with `$2a$` or `$2b$` (bcrypt format)

---

## Step 8: Test Password Validation (Story 1.3)

### 8.1 Test Various Password Combinations

Try registering with these passwords and verify validation:

```bash
# Too short
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test3@example.com","password":"Short1!","name":"Test"}'

# No uppercase
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test4@example.com","password":"lowercase123!","name":"Test"}'

# No number
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test5@example.com","password":"NoNumber!","name":"Test"}'

# No special character
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test6@example.com","password":"NoSpecial123","name":"Test"}'

# Valid password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test7@example.com","password":"ValidPass123!","name":"Test"}'
```

**Expected:** Only the last one succeeds.

---

## Step 9: Test NextAuth API Endpoints

### 9.1 Check Available Endpoints

```bash
# Get NextAuth endpoints
curl http://localhost:3000/api/auth/providers
```

**Expected:** Returns available providers (credentials)

### 9.2 Test Session Endpoint

```bash
# Get current session (requires authentication)
curl http://localhost:3000/api/auth/session \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Expected:** Returns session data with user info, tenantId, role

---

## Step 10: Clean Up Test Data (Optional)

After testing, you may want to clean up:

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Re-seed if needed
npx prisma db seed
```

---

## Testing Checklist

### Story 1.1: Project Setup
- [ ] Node.js and npm working
- [ ] Dependencies install correctly
- [ ] Next.js dev server starts
- [ ] Application loads at http://localhost:3000
- [ ] TypeScript compilation works
- [ ] Build succeeds: `npm run build`

### Story 1.2: Database Setup
- [ ] Docker Compose starts PostgreSQL
- [ ] Database connection works
- [ ] Migrations apply successfully
- [ ] Seed script runs
- [ ] Prisma Studio opens
- [ ] Tables created correctly
- [ ] Tenant data seeded

### Story 1.3: Authentication
- [ ] Registration API works
- [ ] Password validation works (all rules)
- [ ] Duplicate email prevented
- [ ] Login page loads
- [ ] Login form validation works
- [ ] Successful login redirects
- [ ] Session persists on refresh
- [ ] Logout clears session
- [ ] Protected routes redirect when not logged in
- [ ] Protected routes accessible when logged in
- [ ] Password hashed in database
- [ ] NextAuth endpoints accessible
- [ ] Unit tests pass (11 tests)

---

## Troubleshooting

### Issue: Database connection fails

**Solution:**
```bash
# Check Docker is running
docker ps

# Restart containers
docker-compose restart

# Check DATABASE_URL in .env.local
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process or change port in package.json
```

### Issue: Migration fails

**Solution:**
```bash
# Reset database
npx prisma migrate reset

# Re-run migrations
npx prisma migrate deploy
```

### Issue: Tests fail

**Solution:**
```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests with verbose output
npm test -- --verbose
```

---

## Success Criteria

✅ **All tests pass**  
✅ **Database connects and migrations work**  
✅ **Registration creates user with hashed password**  
✅ **Login works and creates session**  
✅ **Session persists across page refreshes**  
✅ **Logout clears session**  
✅ **Protected routes redirect when not authenticated**  
✅ **Password validation enforces all rules**  

If all these pass, you're ready to merge! 🎉

