/**
 * @jest-environment node
 */
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { resetRateLimitCounters } from '@/lib/rate-limit';

const buildRequest = (ip = '127.0.0.1') =>
  new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify({}), // Trigger validation error but exercise rate limiter
  });

describe('registration rate limiting', () => {
  beforeEach(() => {
    resetRateLimitCounters();
  });

  it('allows requests up to the configured limit', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await registerHandler(buildRequest());
      expect(response.status).toBe(400);
    }
  });

  it('returns 429 after the threshold is exceeded', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await registerHandler(buildRequest());
    }

    const blockedResponse = await registerHandler(buildRequest());
    expect(blockedResponse.status).toBe(429);
    expect(blockedResponse.headers.get('Retry-After')).toBeTruthy();
  });
});

