import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const wf = readFileSync(
  join(root, '.github/workflows/prerelease-next.yml'),
  'utf8',
);
// Comments in the workflow explain why the token and registry-url are gone, so
// they name both. Checks about what RUNS read the code lines only.
const code = wf
  .split('\n')
  .filter(line => !line.trimStart().startsWith('#'))
  .join('\n');
const stamp = readFileSync(
  join(root, 'scripts/prerelease-next-version.mjs'),
  'utf8',
);

// The package set lives in three places: what gets stamped, what gets
// published, and what the read-back checks on npm. Each trusted publisher on
// npmjs is set per package, so a package missing from one list is either
// published unstamped, stamped but never published, or published unchecked.
// A missing anchor must fail with its name, not as a TypeError on `null[1]`.
const must = (match, what) => {
  if (!match) throw new Error(`prerelease-next: ${what} not found`);
  return match[1];
};
const stamped = [
  ...must(
    stamp.match(/const PACKAGE_DIRS = \[([\s\S]*?)\]/),
    'PACKAGE_DIRS in prerelease-next-version.mjs',
  ).matchAll(/'([^']+)'/g),
].map(m => m[1]);
const publishStep = wf.slice(wf.indexOf('- name: Publish @next'));
const published = [
  ...publishStep
    .slice(0, publishStep.indexOf('- name:', 1))
    .matchAll(/--filter=@grundtone\/([\w-]+)/g),
].map(m => m[1]);
const readBack = must(
  wf.match(/for dir in ([^;]+); do/),
  'the read-back loop (for dir in …) in prerelease-next.yml',
)
  .trim()
  .split(/\s+/);

describe('prerelease-next.yml: one package set', () => {
  it('stamps seven packages', () => {
    expect(stamped).toHaveLength(7);
  });

  it('publishes exactly the stamped set', () => {
    expect([...published].sort()).toEqual([...stamped].sort());
  });

  it('reads back exactly the stamped set', () => {
    expect([...readBack].sort()).toEqual([...stamped].sort());
  });
});

describe('prerelease-next.yml: OIDC, no token', () => {
  it('asks for an OIDC token and declares the gated environment', () => {
    expect(code).toMatch(/^\s+id-token: write\b/m);
    expect(code).toMatch(/^\s+environment: npmjs-prerelease$/m);
  });

  // Each of these would either keep the token alive or short-circuit npm to
  // ENEEDAUTH before the OIDC exchange.
  it.each([
    'secrets.NPM_PRERELEASE_TOKEN',
    'NODE_AUTH_TOKEN:',
    'registry-url:',
  ])('has no %s', needle => {
    expect(code).not.toContain(needle);
  });

  it('reads the registry back on every run, not only on success', () => {
    const step = wf.slice(
      wf.indexOf('- name: Every package is on npm under next'),
    );
    expect(step).toMatch(/^\s+if: always\(\)$/m);
  });
});
