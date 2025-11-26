#!/bin/bash

# Script to open Prisma Studio with proper environment variables
# Usage: ./scripts/open-prisma-studio.sh

cd "$(dirname "$0")/.."

# Load environment variables from .env.local
if [ -f ".env.local" ]; then
    # Source the .env.local file to load variables
    set -a
    source .env.local
    set +a
    echo "✅ Loaded environment variables from .env.local"
else
    echo "❌ Error: .env.local not found"
    exit 1
fi

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL not found in .env.local"
    exit 1
fi

# Start Prisma Studio
echo "🚀 Starting Prisma Studio..."
echo "   Database: ${DATABASE_URL%%@*}"
npx prisma studio

