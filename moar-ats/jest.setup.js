// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Learn more: https://jestjs.io/docs/configuration#setupfilesafterenv-array

import fs from 'fs';
import path from 'path';
import { config as loadEnv } from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';

const envFiles = ['.env.test', '.env.local'];

for (const file of envFiles) {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    loadEnv({ path: fullPath, override: file.endsWith('.env.test') });
  }
}

import '@testing-library/jest-dom';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Ensure Prisma closes connections after the jest run
afterAll(async () => {
  const { shutdownDb } = await import('@/lib/db/prisma');
  await shutdownDb();
});

