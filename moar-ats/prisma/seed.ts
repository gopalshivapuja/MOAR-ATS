import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Seed script for MOAR ATS database
 * 
 * This script creates initial development data:
 * - One tenant (MOAR Advisory)
 * 
 * Usage:
 *   npx prisma db seed
 * 
 * Note: This requires a database connection. Make sure DATABASE_URL is set in .env.local
 */
async function main() {
  console.log('🌱 Starting database seed...');

  // Create MOAR Advisory tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'moar-advisory' },
    update: {},
    create: {
      name: 'MOAR Advisory',
      slug: 'moar-advisory',
      settings: {
        // Tenant-specific settings can be added here
        // Example: integrations, workflows, AI policies
      },
    },
  });

  console.log('✅ Created tenant:', tenant.name);

  // Note: User creation will be handled in Story 1.3 (Authentication)
  // For now, we just create the tenant structure

  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
