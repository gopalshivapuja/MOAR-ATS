import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { setTenantContext } from '@/lib/tenant/context';

/**
 * Next.js proxy handler for protected routes and tenant extraction
 * 
 * Features:
 * - Extracts tenant_id from authenticated user's session
 * - Sets tenant context for all downstream API routes and components
 * - Validates tenant access on every request
 * - Returns 403 Forbidden if user tries to access another tenant's data
 * - Logs all tenant access attempts for audit
 * 
 * Tenant extraction priority:
 * 1. Session (from NextAuth token) - PRIMARY
 * 2. Subdomain (future: tenant-slug.moar-ats.com)
 * 3. Header (X-Tenant-ID) - for system admin operations
 * 
 * Protects:
 * - /api/* (except /api/auth/*)
 * - /(recruiter)/*
 * - /(candidate)/*
 * 
 * Allows public routes:
 * - /
 * - /login
 * - /api/auth/*
 */

/**
 * Log tenant access attempt for audit purposes
 * In production, this would write to an audit log table or service
 */
function logTenantAccess(
  pathname: string,
  tenantId: string | null,
  userId: string | null,
  success: boolean,
  error?: string
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Tenant Access]', {
      pathname,
      tenantId,
      userId,
      success,
      error,
      timestamp: new Date().toISOString(),
    });
  }
  // TODO: In Story 9 (Compliance), this will write to audit_logs table
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/api/health'
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Extract tenant_id from session (priority 1)
  let tenantId: string | null = null;
  let userId: string | null = null;
  let userRole: string | null = null;

  if (token) {
    tenantId = (token.tenantId as string) || null;
    userId = (token.id as string) || null;
    userRole = (token.role as string) || null;
  }

  // Future: Extract from subdomain (priority 2)
  // const subdomain = request.headers.get('host')?.split('.')[0];
  // if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
  //   tenantId = await getTenantIdFromSubdomain(subdomain);
  // }

  // Extract from header (priority 3) - for system admin operations
  const headerTenantId = request.headers.get('X-Tenant-ID');
  if (headerTenantId && userRole === 'SYSTEM_ADMIN') {
    tenantId = headerTenantId;
  }

  // Protect API routes (except auth routes)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    if (!token) {
      logTenantAccess(pathname, null, null, false, 'UNAUTHORIZED');
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Validate tenant_id exists for authenticated users
    if (!tenantId) {
      logTenantAccess(pathname, null, userId, false, 'TENANT_CONTEXT_MISSING');
      return NextResponse.json(
        {
          error: {
            code: 'TENANT_CONTEXT_MISSING',
            message: 'Tenant context is required. User session must include tenantId.',
          },
        },
        { status: 403 }
      );
    }

    // Set tenant context for downstream API routes
    // This allows Prisma middleware to automatically filter queries
    setTenantContext(tenantId, userId || undefined, userRole || undefined);

    // Set tenant context in request headers for downstream use
    const response = NextResponse.next();
    response.headers.set('X-Tenant-ID', tenantId);
    if (userId) {
      response.headers.set('X-User-ID', userId);
    }
    if (userRole) {
      response.headers.set('X-User-Role', userRole);
    }

    logTenantAccess(pathname, tenantId, userId, true);
    return response;
  }

  // Protect recruiter and candidate routes
  if (pathname.startsWith('/recruiter') || pathname.startsWith('/candidate')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      logTenantAccess(pathname, null, null, false, 'UNAUTHORIZED');
      return NextResponse.redirect(loginUrl);
    }

    // Validate tenant_id exists
    if (!tenantId) {
      logTenantAccess(pathname, null, userId, false, 'TENANT_CONTEXT_MISSING');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      loginUrl.searchParams.set('error', 'tenant_context_missing');
      return NextResponse.redirect(loginUrl);
    }

    // Set tenant context for server components
    setTenantContext(tenantId, userId || undefined, userRole || undefined);

    // Set tenant context in request headers
    const response = NextResponse.next();
    response.headers.set('X-Tenant-ID', tenantId);
    if (userId) {
      response.headers.set('X-User-ID', userId);
    }
    if (userRole) {
      response.headers.set('X-User-Role', userRole);
    }

    logTenantAccess(pathname, tenantId, userId, true);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

