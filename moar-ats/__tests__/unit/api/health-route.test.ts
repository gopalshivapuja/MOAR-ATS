/**
 * @jest-environment node
 */

import { GET } from '@/app/api/health/route';

describe('GET /api/health', () => {
  it('returns ok status with ISO timestamp', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.status).toBe('ok');
    expect(typeof payload.timestamp).toBe('string');
    expect(() => new Date(payload.timestamp).toISOString()).not.toThrow();
  });
});

