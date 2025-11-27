'use client';

import { useSession } from 'next-auth/react';

/**
 * React hook for accessing tenant context in client components
 * 
 * Reads tenant_id from NextAuth session and provides it to components.
 * 
 * @returns Object with tenantId, isLoading, and error states
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { tenantId, isLoading, error } = useTenant();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!tenantId) return <div>No tenant context</div>;
 *   
 *   return <div>Tenant: {tenantId}</div>;
 * }
 * ```
 */
export function useTenant(): {
  tenantId: string | null;
  isLoading: boolean;
  error: Error | null;
} {
  const { data: session, status } = useSession();

  // Loading state
  if (status === 'loading') {
    return {
      tenantId: null,
      isLoading: true,
      error: null,
    };
  }

  // Error state (unauthenticated or session error)
  if (status === 'unauthenticated' || !session) {
    return {
      tenantId: null,
      isLoading: false,
      error: new Error('User is not authenticated'),
    };
  }

  // Extract tenantId from session
  const tenantId = (session.user as any)?.tenantId || null;

  // Error if tenantId is missing from session
  if (!tenantId) {
    return {
      tenantId: null,
      isLoading: false,
      error: new Error('Tenant context is missing from session'),
    };
  }

  // Success state
  return {
    tenantId,
    isLoading: false,
    error: null,
  };
}

