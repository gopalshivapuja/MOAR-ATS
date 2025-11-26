#!/bin/bash

# Sync script to push moar-ats/ folder to deployment repository
# Usage: ./scripts/sync-to-deployment.sh

set -e  # Exit on error

# Configuration - UPDATE THESE VALUES
DEPLOYMENT_REPO="git@github.com:gopalshivapuja/moar-ats-app.git"
TEMP_DIR="/tmp/moar-ats-deployment"
MAIN_REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🔄 Starting sync to deployment repository..."

# Clean up previous temp directory
if [ -d "$TEMP_DIR" ]; then
  echo "🧹 Cleaning up previous temp directory..."
  rm -rf "$TEMP_DIR"
fi

# Check if deployment repo exists, clone or update
if [ -d "$TEMP_DIR/.git" ]; then
  echo "📥 Updating deployment repo..."
  cd "$TEMP_DIR"
  git pull origin main || true
else
  echo "📥 Cloning deployment repo..."
  git clone "$DEPLOYMENT_REPO" "$TEMP_DIR" || {
    echo "❌ Error: Could not clone deployment repo."
    echo "   Make sure:"
    echo "   1. Repository exists: $DEPLOYMENT_REPO"
    echo "   2. You have access to the repository"
    echo "   3. SSH keys are set up correctly"
    exit 1
  }
fi

# Copy moar-ats folder contents
echo "📋 Copying application files..."
cd "$MAIN_REPO_ROOT"
cp -r moar-ats/* "$TEMP_DIR/"

# Copy essential root files if they exist
if [ -f "moar-ats/.env.example" ]; then
  cp "moar-ats/.env.example" "$TEMP_DIR/"
fi

if [ -f "moar-ats/.gitignore" ]; then
  cp "moar-ats/.gitignore" "$TEMP_DIR/"
fi

# Create deployment-specific README if it doesn't exist
if [ ! -f "$TEMP_DIR/README.md" ]; then
  cat > "$TEMP_DIR/README.md" << 'EOF'
# MOAR ATS - Application

Multi-tenant Applicant Tracking System built with Next.js, PostgreSQL, and NextAuth.js.

## Quick Start

See main repository for full documentation and development guides.

## Deployment

This repository is configured for automatic deployment on Vercel.

## License

Private - MOAR Advisory
EOF
fi

# Commit and push
cd "$TEMP_DIR"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "✅ No changes to sync - deployment repo is up to date"
else
  echo "💾 Committing changes..."
  git commit -m "chore: Sync from main repo - $(date +%Y-%m-%d\ %H:%M:%S)" || {
    echo "⚠️  No changes to commit (this is okay if repo is already synced)"
  }
  
  echo "🚀 Pushing to deployment repository..."
  git push origin main || {
    echo "❌ Error: Could not push to deployment repo"
    exit 1
  }
  
  echo "✅ Successfully synced to deployment repository!"
fi

# Clean up
cd "$MAIN_REPO_ROOT"
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"

echo "✨ Sync complete!"

