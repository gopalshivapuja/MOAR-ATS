/**
 * Tenant Context Management
 * 
 * Provides utilities for managing tenant context in a multi-tenant application.
 * Uses AsyncLocalStorage to maintain tenant context per request/operation.
 * 
 * This is the foundation for tenant isolation - all database queries will
 * automatically filter by the tenant_id stored in this context.
 */

import { AsyncLocalStorage } from 'async_hooks';

// Tenant context storage - maintains tenant_id per async operation
const tenantContext = new AsyncLocalStorage<{ tenantId: string; userId?: string; role?: string }>();

/**
 * Get the current tenant ID from context
 * @returns tenantId if set, null otherwise
 */
export function getTenantId(): string | null {
  const context = tenantContext.getStore();
  return context?.tenantId || null;
}

/**
 * Get the current user ID from context
 * @returns userId if set, null otherwise
 */
export function getUserId(): string | null {
  const context = tenantContext.getStore();
  return context?.userId || null;
}

/**
 * Get the current user role from context
 * @returns role if set, null otherwise
 */
export function getRole(): string | null {
  const context = tenantContext.getStore();
  return context?.role || null;
}

/**
 * Check if current user is a system admin (can bypass tenant restrictions)
 * @returns true if user is SYSTEM_ADMIN, false otherwise
 */
export function isSystemAdmin(): boolean {
  const role = getRole();
  return role === 'SYSTEM_ADMIN';
}

/**
 * Set tenant context for the current async operation
 * This should be called at the start of each request/operation
 * 
 * @param tenantId - The tenant ID to set
 * @param userId - Optional user ID
 * @param role - Optional user role
 */
export function setTenantContext(
  tenantId: string,
  userId?: string,
  role?: string
): void {
  tenantContext.enterWith({ tenantId, userId, role });
}

/**
 * Clear tenant context for the current async execution.
 * Useful in tests when simulating unauthenticated flows.
 */
export function clearTenantContext(): void {
  tenantContext.enterWith({ tenantId: '' });
}

/**
 * Run a function with a specific tenant context
 * This is useful for operations that need to run in a different tenant context
 * 
 * @param tenantId - The tenant ID to use
 * @param userId - Optional user ID
 * @param role - Optional user role
 * @param fn - Function to run with the tenant context
 * @returns Result of the function
 */
export async function withTenantContext<T>(
  tenantId: string,
  userId: string | undefined,
  role: string | undefined,
  fn: () => Promise<T>
): Promise<T> {
  return tenantContext.run({ tenantId, userId, role }, fn);
}

/**
 * Require tenant context - throws if tenant_id is not set
 * Use this in API routes to ensure tenant context is available
 * 
 * @throws Error if tenant_id is not set
 * @returns tenantId (never null)
 */
export function requireTenantId(): string {
  const tenantId = getTenantId();
  if (!tenantId) {
    throw new Error('Tenant context is required but not set. Ensure middleware has set tenant context.');
  }
  return tenantId;
}

