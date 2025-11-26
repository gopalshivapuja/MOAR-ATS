/**
 * @jest-environment node
 */
import { db } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

/**
 * Integration tests for login flow
 * 
 * Tests:
 * - Valid credentials authentication
 * - Invalid password rejection
 * - Non-existent user handling
 */

describe('Login Flow Integration', () => {
  let testTenantId: string;
  let testUser: { id: string; email: string; passwordHash: string };

  beforeAll(async () => {
    // Get or create test tenant
    const tenant = await db.tenant.findUnique({
      where: { slug: 'moar-advisory' },
    });
    if (tenant) {
      testTenantId = tenant.id;
    } else {
      const newTenant = await db.tenant.create({
        data: {
          name: 'MOAR Advisory',
          slug: 'moar-advisory',
        },
      });
      testTenantId = newTenant.id;
    }

    // Create test user
    const testEmail = `test-login-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(testPassword, 10);

    testUser = await db.user.create({
      data: {
        email: testEmail,
        name: 'Test Login User',
        passwordHash,
        tenantId: testTenantId,
        role: 'recruiter',
      },
    });
  });

  afterAll(async () => {
    // Clean up test user
    if (testUser?.id) {
      await db.user.delete({ where: { id: testUser.id } });
    }
  });

  it('should verify valid password with bcrypt', async () => {
    const testPassword = 'TestPassword123!';
    const isValid = await bcrypt.compare(testPassword, testUser.passwordHash);
    expect(isValid).toBe(true);
  });

  it('should reject invalid password', async () => {
    const wrongPassword = 'WrongPassword123!';
    const isValid = await bcrypt.compare(wrongPassword, testUser.passwordHash);
    expect(isValid).toBe(false);
  });

  it('should find user by email', async () => {
    const user = await db.user.findFirst({
      where: {
        email: testUser.email,
      },
    });

    expect(user).toBeDefined();
    expect(user?.email).toBe(testUser.email);
  });

  it('should not find non-existent user', async () => {
    const user = await db.user.findFirst({
      where: {
        email: 'nonexistent@example.com',
      },
    });

    expect(user).toBeNull();
  });
});

