import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/config';
import {
  buildRateLimitResponse,
  guardRequestRateLimit,
} from '@/lib/rate-limit';

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
const nextAuthGet = handlers.GET;
const nextAuthPost = handlers.POST;

const LOGIN_RATE_LIMIT = {
  keyPrefix: 'login',
  limit: 5,
  windowSeconds: 60 * 60,
} as const;

export async function GET(request: NextRequest) {
  return nextAuthGet(request);
}

export async function POST(request: NextRequest) {
  if (shouldApplyLoginRateLimit(request)) {
    const rateLimit = await guardRequestRateLimit(
      request,
      LOGIN_RATE_LIMIT
    );
    if (!rateLimit.allowed) {
      return buildRateLimitResponse(rateLimit);
    }
  }

  return nextAuthPost(request);
}

function shouldApplyLoginRateLimit(request: NextRequest): boolean {
  if (request.method !== 'POST') {
    return false;
  }

  const pathname = request.nextUrl.pathname;
  return (
    pathname.endsWith('/callback/credentials') ||
    pathname.endsWith('/signin/credentials')
  );
}

