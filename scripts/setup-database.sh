#!/bin/bash

# Database Setup Script for Story 1.2
# This script sets up PostgreSQL and Redis using Docker Compose

set -e

echo "🚀 Setting up local development database..."

# Check if Docker is running
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Start services
echo "📦 Starting PostgreSQL and Redis containers..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
timeout=30
counter=0
until docker-compose exec -T postgres pg_isready -U moar_ats > /dev/null 2>&1; do
    sleep 1
    counter=$((counter + 1))
    if [ $counter -ge $timeout ]; then
        echo "❌ PostgreSQL failed to start within $timeout seconds"
        exit 1
    fi
done

echo "✅ PostgreSQL is ready!"

# Check Redis
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is ready!"
else
    echo "⚠️  Redis may not be ready yet, but continuing..."
fi

# Display connection info
echo ""
echo "📊 Database Connection Info:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: moar_ats"
echo "   User: moar_ats"
echo "   Password: dev_password_change_in_production"
echo ""
echo "🔗 Connection String:"
echo "   postgresql://moar_ats:dev_password_change_in_production@localhost:5432/moar_ats?schema=public"
echo ""

# Check if .env.local exists
if [ ! -f "moar-ats/.env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > moar-ats/.env.local << EOF
# Database (Docker Compose)
DATABASE_URL="postgresql://moar_ats:dev_password_change_in_production@localhost:5432/moar_ats?schema=public"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-me-generate-with-openssl-rand-base64-32"

# Redis (Docker Compose)
REDIS_URL="redis://localhost:6379"
EOF
    echo "✅ Created moar-ats/.env.local"
    echo "⚠️  Please update NEXTAUTH_SECRET in moar-ats/.env.local"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "✨ Setup complete! Next steps:"
echo "   1. Update NEXTAUTH_SECRET in moar-ats/.env.local (run: openssl rand -base64 32)"
echo "   2. cd moar-ats"
echo "   3. npx prisma migrate dev --name init"
echo "   4. npx prisma db seed (optional)"
echo ""

