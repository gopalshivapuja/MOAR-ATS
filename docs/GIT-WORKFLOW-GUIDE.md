# GitHub Workflow & Repository Management Guide

## Overview

This guide explains how to manage the MOAR ATS project on GitHub, including:
- Branching strategy for safe development
- Managing BMAD method files (development tools, not for deployment)
- Creating a clean deployment repository
- Best practices for merging tested changes

## Repository Structure Strategy

### Current Situation

Your main repository (`MOAR-ATS`) contains:
- ✅ **Application Code**: `moar-ats/` folder (ready for deployment)
- ✅ **Project Documentation**: `docs/` folder (architecture, stories, etc.)
- ✅ **BMAD Method Files**: `.bmad/`, `.cursor/` folders (development tools)
- ✅ **Configuration**: `docker-compose.yml`, `scripts/`, etc.

### Recommended Structure

We'll use a **dual-repository strategy**:

1. **Main Repository** (`MOAR-ATS`): Full project with BMAD files
   - Used for: Development, planning, documentation
   - Contains: Everything including BMAD method files
   - Branch: `main` (protected, only tested code)

2. **Deployment Repository** (`moar-ats-app`): Clean app-only repo
   - Used for: Vercel deployment, sharing with team
   - Contains: Only `moar-ats/` folder + essential configs
   - Branch: `main` (auto-synced from main repo)

## Branching Strategy

### Branch Types

```
main (protected)
  ├── develop (integration branch)
  │   ├── feature/story-1-1
  │   ├── feature/story-1-2
  │   └── feature/story-1-3
  └── release/v1.0.0 (pre-production)
```

### Branch Naming Convention

- `main`: Production-ready code (protected)
- `develop`: Integration branch for completed stories
- `feature/story-X-Y`: Individual story development
- `release/vX.Y.Z`: Pre-production releases
- `hotfix/issue-description`: Critical bug fixes

### Workflow Process

```
1. Create feature branch: feature/story-1-4
2. Develop and test locally
3. Commit changes to feature branch
4. Create Pull Request to develop
5. Code review (automated + manual)
6. Merge to develop
7. Integration testing on develop
8. Create Pull Request: develop → main
9. Final review and merge to main
10. Auto-sync to deployment repo
```

## Best Practices

### 1. Commit Strategy

**Good Commit Messages:**
```
feat(story-1-3): Add NextAuth.js authentication
- Implement email/password login
- Add password validation
- Configure JWT sessions
- Add protected route middleware

test(story-1-3): Add password validation unit tests
- 11 test cases covering all validation rules
- All tests passing

docs(story-1-3): Update README with auth setup
- Add environment variable documentation
- Include troubleshooting guide
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code refactoring
- `chore`: Maintenance tasks

### 2. Pull Request Process

**PR Checklist:**
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Environment variables documented
- [ ] Story marked as done in sprint-status.yaml

**PR Template:**
```markdown
## Story
- Story ID: 1.3
- Story Title: Authentication Foundation with NextAuth.js

## Changes
- [List of changes]

## Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No breaking changes
```

### 3. Protecting Main Branch

**Branch Protection Rules:**
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- No force pushes
- No deletion

### 4. Managing BMAD Files

**Strategy:**
- Keep BMAD files in main repo (`.bmad/`, `.cursor/`)
- Exclude from deployment repo
- Use `.gitignore` to control what gets synced

## Implementation Steps

### Step 1: Set Up Main Repository

1. **Create develop branch:**
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

2. **Set up branch protection:**
   - Go to GitHub → Settings → Branches
   - Add rule for `main` branch
   - Require PR reviews
   - Require status checks

### Step 2: Commit Today's Work

1. **Create feature branch for today's work:**
   ```bash
   git checkout -b feature/stories-1-1-to-1-3
   ```

2. **Stage and commit changes:**
   ```bash
   git add .
   git commit -m "feat(stories-1-1-to-1-3): Complete foundation stories

   - Story 1.1: Project setup and initial configuration
   - Story 1.2: Database schema and Prisma setup
   - Story 1.3: Authentication foundation with NextAuth.js

   Includes:
   - Next.js 16.0.4 setup with TypeScript
   - PostgreSQL database with Prisma ORM
   - NextAuth.js v5 authentication
   - Password validation and security
   - Comprehensive test suite
   - Documentation and README"
   ```

3. **Push to feature branch:**
   ```bash
   git push -u origin feature/stories-1-1-to-1-3
   ```

### Step 3: Create Deployment Repository

**Option A: Separate Repository (Recommended)**

1. **Create new GitHub repository:** `moar-ats-app`
2. **Set up sync script** (see below)

**Option B: Subdirectory in Same Repo**

1. **Use GitHub Actions** to auto-sync `moar-ats/` folder
2. **Deploy from subdirectory** in Vercel

### Step 4: Set Up Deployment Sync

**GitHub Actions Workflow** (`.github/workflows/sync-deployment.yml`):

```yaml
name: Sync to Deployment Repo

on:
  push:
    branches:
      - main
    paths:
      - 'moar-ats/**'
      - '.github/workflows/sync-deployment.yml'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Sync to deployment repo
        uses: peaceiris/actions-gh-pages@v3
        with:
          personal_token: ${{ secrets.DEPLOYMENT_REPO_TOKEN }}
          external_repository: your-username/moar-ats-app
          publish_dir: ./moar-ats
          keep_files: false
```

## Deployment Repository Setup

### What to Include

**Include:**
- `moar-ats/` folder (entire Next.js app)
- `.env.example` (template, no secrets)
- `README.md` (deployment instructions)
- `.gitignore` (app-specific)

**Exclude:**
- `docs/` folder (project documentation)
- `.bmad/` folder (BMAD method files)
- `.cursor/` folder (Cursor rules)
- `docker-compose.yml` (local dev only)
- `scripts/` folder (project scripts)

### Vercel Deployment

1. **Connect deployment repo to Vercel**
2. **Set root directory:** `moar-ats/`
3. **Configure environment variables:**
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. **Deploy automatically on push to main**

## Daily Workflow

### Starting a New Story

```bash
# 1. Update from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/story-1-4

# 3. Develop and commit
git add .
git commit -m "feat(story-1-4): [description]"

# 4. Push and create PR
git push -u origin feature/story-1-4
```

### Completing a Story

```bash
# 1. Ensure all tests pass
npm test

# 2. Update story status
# (Mark story as done in sprint-status.yaml)

# 3. Commit final changes
git add .
git commit -m "chore(story-1-4): Mark story as done"

# 4. Push and create PR to develop
git push
# Create PR: feature/story-1-4 → develop
```

### Merging to Main

```bash
# 1. After stories tested on develop
# 2. Create PR: develop → main
# 3. Review and merge
# 4. Auto-syncs to deployment repo
```

## Troubleshooting

### Issue: BMAD files in deployment repo

**Solution:** Update `.gitignore` in deployment repo to exclude:
```
.bmad/
.cursor/
docs/
```

### Issue: Need to update deployment repo manually

**Solution:** Use GitHub Actions workflow (see Step 4 above)

### Issue: Merge conflicts

**Solution:**
```bash
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop
# Resolve conflicts
git commit -m "fix: Resolve merge conflicts"
```

## Summary

✅ **Main Repo**: Full project with BMAD files  
✅ **Deployment Repo**: Clean app-only for Vercel  
✅ **Branch Strategy**: `main` ← `develop` ← `feature/*`  
✅ **Protection**: Main branch protected, requires PRs  
✅ **Auto-Sync**: GitHub Actions syncs to deployment repo  

This strategy keeps your development tools (BMAD) separate from your deployment code while maintaining a clean workflow.

