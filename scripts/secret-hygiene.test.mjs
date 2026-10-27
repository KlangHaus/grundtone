// @vitest-environment node
import { execFile } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

/**
 * End-to-end cells: they run the REAL guard as a process against a local stand-in for the GitHub
 * API and read exit code and printed line. The decisions are tested in-process in
 * scripts/lib/secret-hygiene.test.mjs; these cover what a library test cannot see — that every
 * way the environments lookup can fail ends in exit 2 with a message, never in a pass
 * ([sikkerhed]'s request on #291).
 */

const GUARD = fileURLToPath(new URL('./secret-hygiene.mjs', import.meta.url));

// A clean corpus for surface A: one gated secret, and both allowlisted SONAR_* secrets consumed
// on a pull_request-only workflow, so the allowlist's staleness check stays quiet.
const WORKFLOWS = {
  'deploy.yml':
    'on:\n  push:\njobs:\n  deploy:\n    environment: prod\n    env:\n      K: ${{ secrets.DEPLOY_KEY }}\n',
  'sonar.yml':
    'on:\n  pull_request:\njobs:\n  scan:\n    env:\n      T: ${{ secrets.SONAR_TOKEN }}\n      H: ${{ secrets.SONAR_HOST_URL }}\n',
};
const GOOD = {
  total_count: 2,
  environments: [
    { name: 'copilot', deployment_branch_policy: null },
    {
      name: 'prod',
      deployment_branch_policy: { custom_branch_policies: true },
    },
  ],
};

let server;
let apiUrl;
let reply = { status: 200, body: GOOD };
let dir;

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'secret-hygiene-'));
  mkdirSync(join(dir, 'workflows'));
  for (const [name, text] of Object.entries(WORKFLOWS)) {
    writeFileSync(join(dir, 'workflows', name), text);
  }
  server = createServer((req, res) => {
    // `body` may be a function of the requested page, for the paging cell.
    const page = Number(
      new URL(req.url, 'http://localhost').searchParams.get('page'),
    );
    const body =
      typeof reply.body === 'function' ? reply.body(page) : reply.body;
    res.writeHead(reply.status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  await new Promise(resolve => server.listen(0, 'localhost', resolve));
  apiUrl = `http://localhost:${server.address().port}`;
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  rmSync(dir, { recursive: true, force: true });
});

function run(token) {
  return new Promise(resolve => {
    execFile(
      process.execPath,
      [GUARD],
      {
        env: {
          ...process.env,
          GITHUB_TOKEN: token,
          GITHUB_API_URL: apiUrl,
          GITHUB_REPOSITORY: 'o/r',
          KH_WORKFLOW_DIR: join(dir, 'workflows'),
        },
        encoding: 'utf8',
      },
      (error, stdout) => resolve({ code: error ? error.code : 0, stdout }),
    );
  });
}

describe('secret-hygiene.mjs exit codes', () => {
  // The control first: without it, four exit-2 cells could pass on a guard that always exits 2.
  it('exits 0 on a clean corpus and a complete environment list', async () => {
    reply = { status: 200, body: GOOD };
    const r = await run('t');
    expect(r.stdout).toContain('result: passed');
    expect(r.code).toBe(0);
  });

  it.each([
    [
      'an empty token',
      '',
      { status: 200, body: GOOD },
      /GITHUB_TOKEN is empty/,
    ],
    ['HTTP 403', 't', { status: 403, body: {} }, /answered HTTP 403/],
    [
      'a response with no array',
      't',
      { status: 200, body: { total_count: 1 } },
      /carries no array/,
    ],
    [
      '0 environments',
      't',
      { status: 200, body: { total_count: 0, environments: [] } },
      /0 environments returned/,
    ],
    [
      'total_count 31 with only 30 served',
      't',
      {
        status: 200,
        body: page => ({
          total_count: 31,
          environments:
            page === 1
              ? Array.from({ length: 30 }, (_, i) => ({
                  name: `e${i}`,
                  deployment_branch_policy: { custom_branch_policies: true },
                }))
              : [],
        }),
      },
      /read 30 but total_count says 31/,
    ],
  ])('exits 2 with a message on %s', async (_label, token, served, message) => {
    reply = served;
    const r = await run(token);
    expect(r.stdout).toMatch(message);
    expect(r.stdout).toContain('result: not measured');
    expect(r.code).toBe(2);
  });
});
