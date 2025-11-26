/**
 * Verification script for authentication setup
 * 
 * This script verifies that:
 * - NextAuth configuration is valid
 * - Database connection works
 * - NextAuth tables exist
 * - Environment variables are set
 * 
 * Run with: npx ts-node scripts/verify-auth-setup.ts
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function verifySetup() {
  console.log('🔍 Verifying authentication setup...\n');

  // Check environment variables
  console.log('1. Checking environment variables...');
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  const nextAuthSecret = process.env.NEXTAUTH_SECRET;

  if (!nextAuthUrl) {
    console.error('❌ NEXTAUTH_URL is not set');
    process.exit(1);
  }
  console.log(`   ✅ NEXTAUTH_URL: ${nextAuthUrl}`);

  if (!nextAuthSecret) {
    console.error('❌ NEXTAUTH_SECRET is not set');
    process.exit(1);
  }
  console.log(`   ✅ NEXTAUTH_SECRET: ${nextAuthSecret.substring(0, 10)}...`);

  // Check database connection
  console.log('\n2. Checking database connection...');
  try {
    await db.$connect();
    console.log('   ✅ Database connection successful');
  } catch (error) {
    console.error('   ❌ Database connection failed:', error);
    process.exit(1);
  }

  // Check NextAuth tables exist
  console.log('\n3. Checking NextAuth tables...');
  try {
    const accountCount = await db.account.count();
    const sessionCount = await db.session.count();
    const verificationTokenCount = await db.verificationToken.count();
    
    console.log(`   ✅ Account table exists (${accountCount} records)`);
    console.log(`   ✅ Session table exists (${sessionCount} records)`);
    console.log(`   ✅ VerificationToken table exists (${verificationTokenCount} records)`);
  } catch (error) {
    console.error('   ❌ NextAuth tables check failed:', error);
    process.exit(1);
  }

  // Check User table
  console.log('\n4. Checking User table...');
  try {
    const userCount = await db.user.count();
    console.log(`   ✅ User table exists (${userCount} users)`);
  } catch (error) {
    console.error('   ❌ User table check failed:', error);
    process.exit(1);
  }

  // Check Tenant table
  console.log('\n5. Checking Tenant table...');
  try {
    const tenantCount = await db.tenant.count();
    console.log(`   ✅ Tenant table exists (${tenantCount} tenants)`);
    
    if (tenantCount === 0) {
      console.log('   ⚠️  No tenants found. Run: npx prisma db seed');
    }
  } catch (error) {
    console.error('   ❌ Tenant table check failed:', error);
    process.exit(1);
  }

  console.log('\n✨ All checks passed! Authentication setup is complete.');
  console.log('\nNext steps:');
  console.log('1. Start the dev server: npm run dev');
  console.log('2. Navigate to http://localhost:3000/login');
  console.log('3. Register a user via POST /api/auth/register');
  console.log('4. Login with your credentials');

  await db.$disconnect();
}

verifySetup().catch((error) => {
  console.error('Verification failed:', error);
  process.exit(1);
});

