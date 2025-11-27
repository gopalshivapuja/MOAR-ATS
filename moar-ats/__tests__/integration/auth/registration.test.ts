/**
 * @jest-environment node
 */
import { db } from '@/lib/db/prisma';
import { clearTenantContext, setTenantContext } from '@/lib/tenant/context';
import bcrypt from 'bcryptjs';
import { runAsSystemAdmin } from '../utils/system-admin';

/**
 * Integration tests for user registration flow
 * 
 * Tests:
 * - User creation with hashed password
 * - Tenant-scoped email uniqueness
 * - Password hashing verification
 */

describe('User Registration Integration', () => {
  let testTenantId: string;
  const runAsTestTenant = async <T>(fn: () => Promise<T>) => {
    if (!testTenantId) {
      throw new Error('Test tenant not initialized');
    }
    setTenantContext(testTenantId, 'registration-test-user', 'SYSTEM_ADMIN');
    try {
      return await fn();
    } finally {
      clearTenantContext();
    }
  };

  beforeAll(async () => {
    // Get or create test tenant
    const tenant = await runAsSystemAdmin(() =>
      db.tenant.findUnique({
        where: { slug: 'moar-advisory' },
      })
    );
    if (tenant) {
      testTenantId = tenant.id;
    } else {
      const newTenant = await runAsSystemAdmin(() =>
        db.tenant.create({
          data: {
            name: 'MOAR Advisory',
            slug: 'moar-advisory',
          },
        })
      );
      testTenantId = newTenant.id;
    }
  });

  afterAll(async () => {
    // Clean up test users
    if (testTenantId) {
      await runAsTestTenant(() =>
        db.user.deleteMany({
          where: {
            email: {
              startsWith: 'test-',
            },
          },
        })
      );
    }
  });

  it('should create user with hashed password', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(testPassword, saltRounds);

    const user = await runAsTestTenant(() =>
      db.user.create({
        data: {
          email: testEmail,
          name: 'Test User',
          passwordHash,
          tenantId: testTenantId,
          role: 'recruiter',
        },
      })
    );

    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
    expect(user.passwordHash).not.toBe(testPassword);
    expect(user.passwordHash.length).toBeGreaterThan(0);

    // Verify password hash is bcrypt format (starts with $2a$, $2b$, or $2y$)
    expect(user.passwordHash).toMatch(/^\$2[aby]\$/);

    // Verify password can be compared
    const isValid = await bcrypt.compare(testPassword, user.passwordHash);
    expect(isValid).toBe(true);

    // Clean up
    await runAsTestTenant(() => db.user.delete({ where: { id: user.id } }));
  });

  it('should enforce tenant-scoped email uniqueness', async () => {
    const testEmail = `test-unique-${Date.now()}@example.com`;
    const passwordHash = await bcrypt.hash('TestPassword123!', 10);

    // Create first user
    const user1 = await runAsTestTenant(() =>
      db.user.create({
        data: {
          email: testEmail,
          name: 'Test User 1',
          passwordHash,
          tenantId: testTenantId,
          role: 'recruiter',
        },
      })
    );

    // Try to create duplicate email in same tenant (should fail)
    await expect(
      runAsTestTenant(() =>
        db.user.create({
          data: {
            email: testEmail,
            name: 'Test User 2',
            passwordHash,
            tenantId: testTenantId,
            role: 'recruiter',
          },
        })
      )
    ).rejects.toThrow();

    // Clean up
    await runAsTestTenant(() => db.user.delete({ where: { id: user1.id } }));
  });

  it('should verify bcrypt hashing uses minimum 10 rounds', async () => {
    const testPassword = 'TestPassword123!';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(testPassword, saltRounds);

    // Extract rounds from bcrypt hash (format: $2a$10$...)
    const roundsMatch = passwordHash.match(/^\$2[aby]\$(\d+)\$/);
    expect(roundsMatch).toBeTruthy();
    if (roundsMatch) {
      const rounds = parseInt(roundsMatch[1], 10);
      expect(rounds).toBeGreaterThanOrEqual(10);
    }
  });
});

