import { NextResponse } from 'next/server';
import { db } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { validatePassword } from '@/lib/auth/password-validation';
import {
  buildRateLimitResponse,
  guardRequestRateLimit,
} from '@/lib/rate-limit';

const REGISTRATION_RATE_LIMIT = {
  keyPrefix: 'register',
  limit: 5,
  windowSeconds: 60 * 60,
} as const;

/**
 * User registration API route
 * 
 * POST /api/auth/register
 * 
 * Request body:
 * {
 *   email: string,
 *   password: string,
 *   name: string
 * }
 * 
 * Response:
 * - 201: User created successfully
 * - 400: Validation error or user already exists
 * - 500: Server error
 */

export async function POST(request: Request) {
  try {
    const rateLimit = await guardRequestRateLimit(
      request,
      REGISTRATION_RATE_LIMIT
    );
    if (!rateLimit.allowed) {
      return buildRateLimitResponse(rateLimit);
    }

    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: { code: 'MISSING_FIELDS', message: 'Email, password, and name are required' } },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: { code: 'INVALID_EMAIL', message: 'Invalid email format' } },
        { status: 400 }
      );
    }

    // Validate password complexity
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_PASSWORD',
            message: passwordValidation.errors.join('. '),
          },
        },
        { status: 400 }
      );
    }

    // Get MOAR Advisory tenant (for MVP)
    const tenant = await db.tenant.findUnique({
      where: { slug: 'moar-advisory' },
    });

    if (!tenant) {
      return NextResponse.json(
        { error: { code: 'TENANT_NOT_FOUND', message: 'Default tenant not found' } },
        { status: 500 }
      );
    }

    // Check if user already exists (tenant-scoped)
    const existingUser = await db.user.findUnique({
      where: {
        tenantId_email: {
          tenantId: tenant.id,
          email: email.toLowerCase(),
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: { code: 'USER_EXISTS', message: 'User with this email already exists' } },
        { status: 400 }
      );
    }

    // Hash password with bcrypt (minimum 10 rounds)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash,
        tenantId: tenant.id,
        role: 'recruiter', // Default role for MVP
      },
      select: {
        id: true,
        email: true,
        name: true,
        tenantId: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { data: { user } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'An error occurred during registration' } },
      { status: 500 }
    );
  }
}

