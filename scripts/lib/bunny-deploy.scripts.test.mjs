// @vitest-environment node
//
// node, not the root config's jsdom: this cell spawns real processes and finds
// the repo root via `import.meta.url`, which under jsdom is an http URL.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * 🔴 Runs the REAL publish scripts, not just the helper.
 *
 * What went wrong (riff ua771kpb) was not a wrong decision inside a pure
 * function — it was that a deploy step with empty secrets went **success**.
 * Measured in release run 35459568087: GitHub masks a set secret as `***`,
 * and the log showed nothing after `BUNNY_DOCS_STORAGE_ZONE:`. So this cell
 * asks the script exactly that: what is the exit code when the value is empty?
 *
 * Both scripts decide deploy/skip/fail BEFORE touching build output, so the
 * cell needs neither a built site nor a network.
 */

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

/**
 * 🔴 spawnSync and BOTH streams. The first version used execFileSync, which
 * only returns stdout — the skip message is written with console.warn to
 * stderr, so the cell saw an empty string and failed on a message the script
 * had in fact printed.
 *
 * @returns {{status: number, output: string}}
 */
function run(script, env) {
  const r = spawnSync('node', ['--import', 'tsx', script], {
    cwd: repoRoot,
    encoding: 'utf8',
    // Only the secrets this cell is about are set explicitly; the rest of the
    // environment (PATH etc.) is inherited, or node cannot start.
    env: { ...process.env, SENTRY_DSN: '', ...env },
  });
  if (r.error) throw r.error;
  return {
    status: r.status ?? 1,
    output: `${r.stdout ?? ''}${r.stderr ?? ''}`,
  };
}

const SCRIPTS = [
  {
    label: 'publish-bunny (docs)',
    path: 'apps/docs/scripts/publish-bunny.ts',
    zone: 'BUNNY_DOCS_STORAGE_ZONE',
    key: 'BUNNY_DOCS_STORAGE_API_KEY',
  },
  {
    label: 'publish-cdn (email)',
    path: 'packages/email/scripts/publish-cdn.ts',
    zone: 'BUNNY_STORAGE_ZONE',
    key: 'BUNNY_STORAGE_API_KEY',
  },
];

describe.each(SCRIPTS)('$label fails closed', ({ path, zone, key }) => {
  it('exits non-zero when both secrets are empty (what used to be green)', () => {
    const r = run(path, { [zone]: '', [key]: '' });
    expect(r.status).not.toBe(0);
    expect(r.output).toContain(zone);
    expect(r.output).toContain(key);
  });

  it('exits non-zero when only one is missing', () => {
    const r = run(path, { [zone]: 'en-zone', [key]: '' });
    expect(r.status).not.toBe(0);
    expect(r.output).toContain(key);
    // Names, not values — the zone is set, so it must not appear in the message.
    expect(r.output).not.toContain('en-zone');
  });

  // 🔴 THERE IS NO WAY TO EXIT 0 WITHOUT THE SECRETS ([sikkerhed], 19/9).
  // The old `BUNNY_DEPLOY_OPTIONAL` hatch was read by these scripts and mapped
  // by no workflow, so it could never open on a runner — a capability armed
  // against nothing. It is gone, and this cell pins that: even with the old
  // variable set, an empty secret still fails.
  it('cannot be talked into exit 0 by the removed opt-in', () => {
    const r = run(path, { [zone]: '', [key]: '', BUNNY_DEPLOY_OPTIONAL: '1' });
    expect(r.status).not.toBe(0);
    expect(r.output).toContain(zone);
  });
});
