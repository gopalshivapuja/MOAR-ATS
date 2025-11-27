/**
 * @jest-environment node
 */
import {
  getTenantId,
  getUserId,
  getRole,
  isSystemAdmin,
  setTenantContext,
  requireTenantId,
  withTenantContext,
} from '@/lib/tenant/context';

/**
 * Unit tests for tenant context utilities
 * 
 * Tests:
 * - getTenantId() extracts tenant from context
 * - requireTenantId() throws if tenant missing
 * - isSystemAdmin() checks for SYSTEM_ADMIN role
 * - withTenantContext() runs function with tenant context
 */

describe('Tenant Context Utilities', () => {
  describe('getTenantId', () => {
    it('should return null when no tenant context is set', () => {
      const tenantId = getTenantId();
      expect(tenantId).toBeNull();
    });

    it('should return tenant ID when context is set', () => {
      setTenantContext('tenant-123', 'user-456', 'recruiter');
      const tenantId = getTenantId();
      expect(tenantId).toBe('tenant-123');
    });
  });

  describe('getUserId', () => {
    it('should return null when no user context is set', () => {
      setTenantContext('tenant-123');
      const userId = getUserId();
      expect(userId).toBeNull();
    });

    it('should return user ID when context is set', () => {
      setTenantContext('tenant-123', 'user-456', 'recruiter');
      const userId = getUserId();
      expect(userId).toBe('user-456');
    });
  });

  describe('getRole', () => {
    it('should return null when no role context is set', () => {
      setTenantContext('tenant-123', 'user-456');
      const role = getRole();
      expect(role).toBeNull();
    });

    it('should return role when context is set', () => {
      setTenantContext('tenant-123', 'user-456', 'recruiter');
      const role = getRole();
      expect(role).toBe('recruiter');
    });
  });

  describe('isSystemAdmin', () => {
    it('should return false when role is not SYSTEM_ADMIN', () => {
      setTenantContext('tenant-123', 'user-456', 'recruiter');
      expect(isSystemAdmin()).toBe(false);
    });

    it('should return true when role is SYSTEM_ADMIN', () => {
      setTenantContext('tenant-123', 'user-456', 'SYSTEM_ADMIN');
      expect(isSystemAdmin()).toBe(true);
    });

    it('should return false when role is not set', () => {
      setTenantContext('tenant-123', 'user-456');
      expect(isSystemAdmin()).toBe(false);
    });
  });

  describe('requireTenantId', () => {
    it('should throw error when tenant context is not set', () => {
      expect(() => requireTenantId()).toThrow('Tenant context is required');
    });

    it('should return tenant ID when context is set', () => {
      setTenantContext('tenant-123', 'user-456', 'recruiter');
      const tenantId = requireTenantId();
      expect(tenantId).toBe('tenant-123');
    });
  });

  describe('withTenantContext', () => {
    it('should run function with tenant context', async () => {
      const result = await withTenantContext(
        'tenant-123',
        'user-456',
        'recruiter',
        async () => {
          expect(getTenantId()).toBe('tenant-123');
          expect(getUserId()).toBe('user-456');
          expect(getRole()).toBe('recruiter');
          return 'success';
        }
      );

      expect(result).toBe('success');
    });

    it('should isolate tenant context within function', async () => {
      setTenantContext('tenant-outer', 'user-outer', 'recruiter');

      await withTenantContext('tenant-inner', 'user-inner', 'admin', async () => {
        expect(getTenantId()).toBe('tenant-inner');
        expect(getUserId()).toBe('user-inner');
        expect(getRole()).toBe('admin');
      });

      // Outer context should be preserved
      expect(getTenantId()).toBe('tenant-outer');
      expect(getUserId()).toBe('user-outer');
      expect(getRole()).toBe('recruiter');
    });

    it('should handle async operations correctly', async () => {
      const result = await withTenantContext(
        'tenant-123',
        undefined,
        undefined,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          return getTenantId();
        }
      );

      expect(result).toBe('tenant-123');
    });
  });
});

