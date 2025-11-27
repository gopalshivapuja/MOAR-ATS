/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import { getToken } from 'next-auth/jwt';

// Mock next-auth/jwt
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

// Mock tenant context
jest.mock('@/lib/tenant/context', () => ({
  setTenantContext: jest.fn(),
  getTenantId: jest.fn(() => null),
  isSystemAdmin: jest.fn(() => false),
}));

/**
 * Unit tests for Next.js middleware tenant extraction
 * 
 * Tests:
 * - Middleware extracts tenant_id from session
 * - Middleware sets tenant context
 * - Middleware returns 403 on missing tenant
 * - Middleware allows public routes
 */

describe('Next.js Middleware - Tenant Extraction', () => {
  const mockGetToken = getToken as jest.MockedFunction<typeof getToken>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Public Routes', () => {
    it('should allow access to root path', async () => {
      const request = new NextRequest('http://localhost:3000/');
      const response = await middleware(request);
      expect(response.status).toBe(200);
      expect(mockGetToken).not.toHaveBeenCalled();
    });

    it('should allow access to login path', async () => {
      const request = new NextRequest('http://localhost:3000/login');
      const response = await middleware(request);
      expect(response.status).toBe(200);
    });

    it('should allow access to auth API routes', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login');
      const response = await middleware(request);
      expect(response.status).toBe(200);
    });
  });

  describe('Protected API Routes', () => {
    it('should return 401 for unauthenticated API requests', async () => {
      mockGetToken.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/jobs');
      const response = await middleware(request);

      expect(response.status).toBe(401);
      const json = await response.json();
      expect(json.error.code).toBe('UNAUTHORIZED');
    });

    it('should return 403 when tenant_id is missing from session', async () => {
      mockGetToken.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        // tenantId is missing
      } as any);

      const request = new NextRequest('http://localhost:3000/api/jobs');
      const response = await middleware(request);

      expect(response.status).toBe(403);
      const json = await response.json();
      expect(json.error.code).toBe('TENANT_CONTEXT_MISSING');
    });

    it('should set tenant context and headers when tenant_id is present', async () => {
      const { setTenantContext } = require('@/lib/tenant/context');

      mockGetToken.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        tenantId: 'tenant-456',
        role: 'recruiter',
      } as any);

      const request = new NextRequest('http://localhost:3000/api/jobs');
      const response = await middleware(request);

      expect(response.status).toBe(200);
      expect(setTenantContext).toHaveBeenCalledWith(
        'tenant-456',
        'user-123',
        'recruiter'
      );
      expect(response.headers.get('X-Tenant-ID')).toBe('tenant-456');
      expect(response.headers.get('X-User-ID')).toBe('user-123');
      expect(response.headers.get('X-User-Role')).toBe('recruiter');
    });
  });

  describe('Protected Page Routes', () => {
    it('should redirect to login for unauthenticated page requests', async () => {
      mockGetToken.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/recruiter/dashboard');
      const response = await middleware(request);

      expect(response.status).toBe(307); // Redirect
      expect(response.headers.get('location')).toContain('/login');
    });

    it('should set tenant context for authenticated page requests', async () => {
      const { setTenantContext } = require('@/lib/tenant/context');

      mockGetToken.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        tenantId: 'tenant-456',
        role: 'recruiter',
      } as any);

      const request = new NextRequest('http://localhost:3000/recruiter/dashboard');
      const response = await middleware(request);

      expect(response.status).toBe(200);
      expect(setTenantContext).toHaveBeenCalledWith(
        'tenant-456',
        'user-123',
        'recruiter'
      );
    });
  });
});

