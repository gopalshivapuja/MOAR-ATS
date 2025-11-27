/**
 * @jest-environment node
 */

import { mkdtempSync, writeFileSync, readFileSync, chmodSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { spawnSync } from 'child_process';

describe('scripts/dev-stack.sh helper', () => {
  const scriptPath = path.resolve(__dirname, '../../../scripts/dev-stack.sh');

  it('invokes the compose binary with expected arguments', () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), 'dev-stack-test-'));
    const logPath = path.join(tempDir, 'compose.log');
    const mockBinary = path.join(tempDir, 'mock-compose.sh');

    const mockScript = `#!/usr/bin/env bash
set -euo pipefail
if [[ -n "\${DEV_STACK_MOCK_LOG:-}" ]]; then
  echo "\$@" >> "\${DEV_STACK_MOCK_LOG}"
fi
if [[ "\${1:-}" == "version" ]]; then
  exit 0
fi
exit 0
`;

    writeFileSync(mockBinary, mockScript);
    chmodSync(mockBinary, 0o755);

    const result = spawnSync(scriptPath, ['status'], {
      env: {
        ...process.env,
        DEV_STACK_MOCK: mockBinary,
        DEV_STACK_MOCK_LOG: logPath,
      },
      stdio: 'pipe',
    });

    if (result.error) {
      throw result.error;
    }

    expect(result.status).toBe(0);
    const logContents = readFileSync(logPath, 'utf8').trim();
    expect(logContents).toContain('-f');
    expect(logContents).toContain('docker-compose.yml');
    expect(logContents).toContain('ps');
  });
});

