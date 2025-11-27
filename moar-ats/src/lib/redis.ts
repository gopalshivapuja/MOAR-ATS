import Redis from 'ioredis';

let redisClient: Redis | null = null;

const shouldMockRedis =
  process.env.NODE_ENV === 'test' || process.env.MOCK_REDIS === 'true';

/**
 * Get the shared Redis client instance.
 * Falls back to null (and in-memory rate limiting) when Redis is disabled
 * or unavailable (e.g., during tests).
 */
export function getRedisClient(): Redis | null {
  if (shouldMockRedis) {
    return null;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[rate-limit] REDIS_URL is not configured. Falling back to in-memory counters.'
      );
    }
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      enableOfflineQueue: false,
    });

    redisClient.on('error', (error) => {
      if (process.env.NODE_ENV !== 'test') {
        console.error('[rate-limit] Redis error', error);
      }
    });
  }

  return redisClient;
}

/**
 * Used only in tests to ensure clean shutdowns.
 */
export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}

