import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type Redis from 'ioredis';
import { getRedisClient } from '@/lib/redis';

type RequestLike = Pick<Request, 'headers'> & { ip?: string | null };

type RateLimitOptions = {
  keyPrefix: string;
  limit: number;
  windowSeconds: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
};

const inMemoryStore = new Map<
  string,
  { count: number; expiresAt: number }
>();

const DEFAULT_RETRY_AFTER = 60;

const RATE_LIMIT_ERRORS = {
  code: 'RATE_LIMITED',
  message:
    'Too many attempts. Please wait before trying again.',
};

/**
 * Helper used by tests to reset in-memory counters.
 */
export function resetRateLimitCounters(): void {
  inMemoryStore.clear();
}

/**
 * Returns a unique identifier for the client issuing the request.
 * Prefers request.ip, then X-Forwarded-For header, and finally a fallback.
 */
export function getClientIdentifier(request: RequestLike): string {
  if (request.ip) {
    return request.ip;
  }

  const forwardedFor =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return 'unknown';
}

/**
 * Applies rate limiting using Redis when available.
 * Falls back to in-memory counters in test/dev environments without Redis.
 */
export async function enforceRateLimit(
  identifier: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const key = `rate-limit:${options.keyPrefix}:${identifier}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      return await enforceRedisLimit(redis, key, options);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[rate-limit] Redis unavailable, falling back to in-memory store',
          error
        );
      }
    }
  }

  return enforceInMemoryLimit(key, options);
}

async function enforceRedisLimit(
  redis: Redis,
  key: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, options.windowSeconds);
  }

  if (count > options.limit) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      remaining: 0,
      retryAfter: ttl > 0 ? ttl : DEFAULT_RETRY_AFTER,
    };
  }

  return {
    allowed: true,
    remaining: Math.max(options.limit - count, 0),
  };
}

function enforceInMemoryLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const existing = inMemoryStore.get(key);

  if (!existing || existing.expiresAt < now) {
    inMemoryStore.set(key, {
      count: 1,
      expiresAt: now + options.windowSeconds * 1000,
    });
    return {
      allowed: true,
      remaining: options.limit - 1,
    };
  }

  existing.count += 1;
  if (existing.count > options.limit) {
    const retryAfter = Math.ceil(
      (existing.expiresAt - now) / 1000
    );
    return {
      allowed: false,
      remaining: 0,
      retryAfter: retryAfter > 0 ? retryAfter : DEFAULT_RETRY_AFTER,
    };
  }

  inMemoryStore.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(options.limit - existing.count, 0),
  };
}

/**
 * Utility to execute a rate limit guard for a Next.js request.
 */
export async function guardRequestRateLimit(
  request: RequestLike,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(request);
  return enforceRateLimit(identifier, options);
}

export function buildRateLimitResponse(
  result: RateLimitResult
): NextResponse {
  return NextResponse.json(
    { error: RATE_LIMIT_ERRORS },
    {
      status: 429,
      headers: {
        'Retry-After': String(
          result.retryAfter ?? DEFAULT_RETRY_AFTER
        ),
      },
    }
  );
}

