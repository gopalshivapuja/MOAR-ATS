# Deployment Script Configuration Check

## What to Verify

Both scripts are already configured with the deployment repository name: `moar-ats-app`

### 1. Sync Script (`scripts/sync-to-deployment.sh`)

**Line 9:** 
```bash
DEPLOYMENT_REPO="git@github.com:gopalshivapuja/moar-ats-app.git"
```

**✅ If your deployment repo is named `moar-ats-app`:** No changes needed!

**❌ If your deployment repo has a different name:** Update line 9 with your actual repo name.

### 2. GitHub Actions Workflow (`.github/workflows/sync-deployment.yml`)

**Line 34:**
```yaml
git clone https://${DEPLOYMENT_TOKEN}@github.com/gopalshivapuja/moar-ats-app.git deployment-repo
```

**✅ If your deployment repo is named `moar-ats-app`:** No changes needed!

**❌ If your deployment repo has a different name:** Update line 34 with your actual repo name.

## Quick Check

1. **What did you name your deployment repository?**
   - If it's `moar-ats-app` → ✅ No changes needed!
   - If it's something else → Update both files

2. **Verify your GitHub username:**
   - Current: `gopalshivapuja`
   - If different → Update both files

## How to Update (If Needed)

### Update Sync Script

```bash
# Edit the file
nano scripts/sync-to-deployment.sh

# Or use your preferred editor
# Change line 9 to match your repo:
DEPLOYMENT_REPO="git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git"
```

### Update GitHub Actions Workflow

```bash
# Edit the file
nano .github/workflows/sync-deployment.yml

# Change line 34 to match your repo:
git clone https://${DEPLOYMENT_TOKEN}@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git deployment-repo
```

## Test the Script (Optional)

After verifying/updating, you can test the sync script manually:

```bash
cd "/Users/gopal/Cursor/MOAR ATS"
./scripts/sync-to-deployment.sh
```

**Note:** This will require:
- SSH keys set up for GitHub (for git@github.com URLs)
- OR change to HTTPS URL if using token authentication

## Current Configuration

✅ **Sync Script:** `git@github.com:gopalshivapuja/moar-ats-app.git`  
✅ **GitHub Actions:** `gopalshivapuja/moar-ats-app`  
✅ **Username:** `gopalshivapuja`  

**If these match your setup, you're all set!** 🎉

