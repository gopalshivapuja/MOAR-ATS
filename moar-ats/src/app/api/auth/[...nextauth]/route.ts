import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/config';

/**
 * NextAuth.js API route handler
 * 
 * Catch-all route for NextAuth endpoints:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback
 * - /api/auth/session
 * - etc.
 */

const { handlers } = NextAuth(authConfig as any);

export const { GET, POST } = handlers;

