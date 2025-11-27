# GitHub Setup Instructions - Step by Step

## ✅ Step 1: Feature Branch Created and Pushed

**Completed!** Your changes are now on branch `feature/stories-1-1-to-1-3`

**Next:** Create a Pull Request to merge into `main`

---

## 📋 Step 2: Create Pull Request

### Option A: Via GitHub Web Interface (Recommended)

1. **Go to your repository:**
   ```
   https://github.com/gopalshivapuja/MOAR-ATS
   ```

2. **You should see a banner:** "feature/stories-1-1-to-1-3 had recent pushes"
   - Click **"Compare & pull request"**

3. **Fill in the PR details:**
   - **Title:** `feat: Complete foundation stories (1.1, 1.2, 1.3)`
   - **Description:**
     ```markdown
     ## Stories Completed
     - ✅ Story 1.1: Project setup and initial configuration
     - ✅ Story 1.2: Database schema and Prisma setup
     - ✅ Story 1.3: Authentication foundation with NextAuth.js

     ## What's Included
     - Next.js 16.0.4 setup with TypeScript
     - PostgreSQL database with Prisma ORM
     - NextAuth.js v5 authentication system
     - Password validation and security
     - Comprehensive test suite (11 unit tests)
     - Documentation and README
     - Docker Compose for local development
     - GitHub workflow for deployment sync

     ## Testing
     - ✅ All unit tests passing
     - ✅ Code reviewed
     - ✅ Documentation updated

     ## Checklist
     - [x] Code reviewed
     - [x] Tests passing
     - [x] Documentation updated
     - [x] No breaking changes
     ```

4. **Set base branch:** `main` ← compare: `feature/stories-1-1-to-1-3`

5. **Click "Create pull request"**

### Option B: Via Command Line

```bash
gh pr create --base main --head feature/stories-1-1-to-1-3 \
  --title "feat: Complete foundation stories (1.1, 1.2, 1.3)" \
  --body "See PR description above"
```

---

## 🔒 Step 3: Set Up Branch Protection

**This protects your main branch from direct commits.**

1. **Go to repository settings:**
   ```
   https://github.com/gopalshivapuja/MOAR-ATS/settings/branches
   ```

2. **Click "Add rule" or "Add branch protection rule"**

3. **Configure the rule:**
   - **Branch name pattern:** `main`
   
   - **Protection settings:**
     - ✅ **Require a pull request before merging**
       - ✅ Require approvals: `1`
       - ✅ Dismiss stale pull request approvals when new commits are pushed
     
     - ✅ **Require status checks to pass before merging**
       - (Leave empty for now, we'll add checks later)
     
     - ✅ **Require branches to be up to date before merging**
     
     - ✅ **Require conversation resolution before merging**
     
     - ✅ **Do not allow bypassing the above settings**
     
     - ✅ **Restrict who can push to matching branches**
       - (Optional: Only allow specific people)

4. **Click "Create"**

**Result:** No one (including you) can push directly to `main`. All changes must go through PRs.

---

## 🚀 Step 4: Create Deployment Repository

**This will be your clean repo for Vercel deployment.**

### 4.1 Create Repository on GitHub

1. **Go to:** https://github.com/new

2. **Repository settings:**
   - **Repository name:** `moar-ats-app`
   - **Description:** `MOAR ATS - Application (Deployment Repository)`
   - **Visibility:** Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license

3. **Click "Create repository"**

### 4.2 Initial Sync (Manual)

After creating the repo, run this command to do the first sync:

```bash
cd "/Users/gopal/Cursor/MOAR ATS"
./scripts/sync-to-deployment.sh
```

**Note:** Update the script first with your deployment repo URL:
```bash
# Edit scripts/sync-to-deployment.sh
# Change line 8:
DEPLOYMENT_REPO="git@github.com:gopalshivapuja/moar-ats-app.git"
```

---

## 🔄 Step 5: Set Up Auto-Sync (GitHub Actions)

**This automatically syncs `moar-ats/` folder to deployment repo when you merge to `main`.**

### 5.1 Create Personal Access Token

1. **Go to:** https://github.com/settings/tokens/new

2. **Token settings:**
   - **Note:** `MOAR-ATS Deployment Sync`
   - **Expiration:** 90 days (or your preference)
   - **Scopes:**
     - ✅ `repo` (Full control of private repositories)

3. **Click "Generate token"**

4. **Copy the token** (you won't see it again!)

### 5.2 Add Token as Secret

1. **Go to:** https://github.com/gopalshivapuja/MOAR-ATS/settings/secrets/actions

2. **Click "New repository secret"**

3. **Configure:**
   - **Name:** `DEPLOYMENT_REPO_TOKEN`
   - **Secret:** (Paste your token from step 5.1)

4. **Click "Add secret"**

### 5.3 Update Workflow File

The workflow file is already created at `.github/workflows/sync-deployment.yml`

**Verify it has the correct repository name:**
- Line 30: `git clone https://${DEPLOYMENT_TOKEN}@github.com/gopalshivapuja/moar-ats-app.git deployment-repo`

If your deployment repo name is different, update it.

### 5.4 Test the Workflow

After merging your PR to `main`, the workflow will automatically:
1. Detect changes to `moar-ats/` folder
2. Clone deployment repo
3. Copy `moar-ats/` contents
4. Commit and push to deployment repo

**Check workflow status:**
```
https://github.com/gopalshivapuja/MOAR-ATS/actions
```

---

## ✅ Step 6: Merge Your PR

Once you've:
- ✅ Created the PR
- ✅ Set up branch protection
- ✅ Created deployment repo
- ✅ Set up GitHub Actions secret

**Merge your PR:**

1. **Go to your PR:** https://github.com/gopalshivapuja/MOAR-ATS/pulls

2. **Review the changes**

3. **Click "Merge pull request"**

4. **Confirm merge**

**Result:**
- ✅ Changes merged to `main`
- ✅ GitHub Actions will auto-sync to `moar-ats-app` repo
- ✅ Deployment repo is ready for Vercel

---

## 🎯 Step 7: Connect to Vercel (When Ready)

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Select `moar-ats-app` repository

3. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `/` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Environment Variables:**
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_URL` - Your Vercel URL (auto-set)
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

5. **Deploy!**

---

## 📝 Summary Checklist

- [ ] Create Pull Request: `feature/stories-1-1-to-1-3` → `main`
- [ ] Set up branch protection for `main`
- [ ] Create deployment repository: `moar-ats-app`
- [ ] Create Personal Access Token
- [ ] Add `DEPLOYMENT_REPO_TOKEN` secret to GitHub
- [ ] Update sync script with deployment repo URL
- [ ] Merge PR to `main`
- [ ] Verify auto-sync worked (check deployment repo)
- [ ] Connect deployment repo to Vercel (when ready)

---

## 🆘 Troubleshooting

### Issue: Can't push to main

**Solution:** This is expected! Branch protection is working. Use PRs.

### Issue: GitHub Actions workflow failed

**Check:**
1. Is `DEPLOYMENT_REPO_TOKEN` secret set correctly?
2. Does the token have `repo` permissions?
3. Does the deployment repo exist?
4. Check Actions tab for error details

### Issue: Deployment repo not syncing

**Solution:** 
1. Check workflow ran: https://github.com/gopalshivapuja/MOAR-ATS/actions
2. Verify `moar-ats/` folder had changes
3. Run manual sync: `./scripts/sync-to-deployment.sh`

---

## 📚 Additional Resources

- **Git Workflow Guide:** `docs/github/GIT-WORKFLOW-GUIDE.md`
- **Deployment Setup:** `docs/deployment/DEPLOYMENT-REPO-SETUP.md`
- **Quick Reference:** `docs/github/GITHUB-SETUP-SUMMARY.md`

