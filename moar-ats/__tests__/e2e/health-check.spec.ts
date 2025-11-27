import { test, expect } from '@playwright/test';

test.describe('Story 1.6 infrastructure smoke tests', () => {
  test('home page renders and health endpoint responds', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /get started/i })).toBeVisible();

    const response = await request.get('/api/health', { failOnStatusCode: false });
    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload.status).toBe('ok');
    expect(payload.timestamp).toBeTruthy();
    expect(typeof payload.timestamp).toBe('string');
  });
});

