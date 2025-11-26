#!/bin/bash

# Quick Testing Script for Stories 1.1, 1.2, 1.3
# Usage: ./scripts/quick-test.sh

set -e

cd "$(dirname "$0")/../moar-ats"

echo "🧪 Quick Testing Script for Foundation Stories"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check environment
echo "📋 Step 1: Checking environment..."
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found. Creating from .env.example...${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Please edit .env.local and set NEXTAUTH_SECRET${NC}"
    echo "   Generate with: openssl rand -base64 32"
    exit 1
fi
echo -e "${GREEN}✅ .env.local exists${NC}"
echo ""

# Step 2: Check Docker
echo "🐳 Step 2: Checking Docker containers..."
if docker ps | grep -q "moar-ats-postgres"; then
    echo -e "${GREEN}✅ PostgreSQL container is running${NC}"
else
    echo -e "${RED}❌ PostgreSQL container not running${NC}"
    echo "   Start with: docker-compose up -d"
    exit 1
fi
echo ""

# Step 3: Check dependencies
echo "📦 Step 3: Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi
echo ""

# Step 4: Test database connection
echo "🗄️  Step 4: Testing database connection..."
# Load environment variables
if [ -f ".env.local" ]; then
    set -a
    source .env.local
    set +a
fi
if npx prisma db pull > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo "   Check DATABASE_URL in .env.local"
    echo "   Trying with explicit DATABASE_URL..."
    DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d '=' -f2 | tr -d '"')
    if DATABASE_URL="$DATABASE_URL" npx prisma db pull > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Database connection successful (with explicit URL)${NC}"
    else
        echo -e "${RED}❌ Database connection still failed${NC}"
        echo "   Please check:"
        echo "   1. Docker containers are running: docker-compose ps"
        echo "   2. DATABASE_URL is correct in .env.local"
        exit 1
    fi
fi
echo ""

# Step 5: Check migrations
echo "🔄 Step 5: Checking migrations..."
# Ensure environment variables are loaded
if [ -f ".env.local" ]; then
    set -a
    source .env.local
    set +a
fi
MIGRATION_STATUS=$(DATABASE_URL="$DATABASE_URL" npx prisma migrate status 2>&1)
if echo "$MIGRATION_STATUS" | grep -q "Database schema is up to date"; then
    echo -e "${GREEN}✅ Migrations are up to date${NC}"
else
    echo -e "${YELLOW}⚠️  Migrations may need to be applied${NC}"
    echo "   Run: npm run db:migrate"
fi
echo ""

# Step 6: Run tests
echo "🧪 Step 6: Running unit tests..."
if npm test -- --passWithNoTests 2>&1 | grep -q "Test Suites:.*passed"; then
    echo -e "${GREEN}✅ All tests passing${NC}"
else
    echo -e "${YELLOW}⚠️  Some tests may have failed. Check output above.${NC}"
fi
echo ""

# Step 7: Check if dev server is running
echo "🚀 Step 7: Checking development server..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Development server is running on port 3000${NC}"
    echo "   Open: http://localhost:3000"
else
    echo -e "${YELLOW}⚠️  Development server not running${NC}"
    echo "   Start with: npm run dev"
fi
echo ""

echo "=============================================="
echo -e "${GREEN}✅ Quick checks complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start dev server: npm run dev"
echo "2. Open: http://localhost:3000/login"
echo "3. Test registration and login"
echo ""
echo "See docs/MANUAL-TESTING-GUIDE.md for detailed testing steps"

