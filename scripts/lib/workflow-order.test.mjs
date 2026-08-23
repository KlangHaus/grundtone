import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { gateRunsBeforePublish } from './workflow-order.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const read = f => readFileSync(join(root, '.github/workflows', f), 'utf8');

const GATE = 'scripts/assert-no-downgrade-publish.mjs';

describe('nedgraderings-vagten dækker udgivelsesstierne', () => {
  // 🔴 Dette er beviset, frozen-2.x-guardens pensionering hviler på: den
  // stabile sti er den ENESTE, der ville udgive react-native, og den havde
  // ingen versionsvagt overhovedet før i dag.
  it('release.yml: gaten står før changesets publicerer', () => {
    expect(gateRunsBeforePublish(read('release.yml'), {
      gate: GATE, publish: 'changesets/action',
    })).toEqual({ ok: true, reason: 'gaten står før publish-trinnet' });
  });

  it('prerelease-next.yml: gaten står før @next publiceres', () => {
    expect(gateRunsBeforePublish(read('prerelease-next.yml'), {
      gate: GATE, publish: 'Publish @next',
    })).toEqual({ ok: true, reason: 'gaten står før publish-trinnet' });
  });
});

describe('gateRunsBeforePublish selv', () => {
  const wf = (...steps) => steps.join('\n');

  it('afviser en gate der står EFTER publish', () => {
    const r = gateRunsBeforePublish(wf('run: publish-it', 'run: my-gate'), {
      gate: 'my-gate', publish: 'publish-it',
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/EFTER/);
  });

  // Fravær må ikke opløse sig til OK — en manglende gate er værre end en
  // fejlplaceret, ikke mere neutral.
  it('afviser en MANGLENDE gate frem for at melde ok', () => {
    expect(gateRunsBeforePublish(wf('run: publish-it'), {
      gate: 'my-gate', publish: 'publish-it',
    }).ok).toBe(false);
  });

  it('afviser når hverken gate eller publish findes', () => {
    expect(gateRunsBeforePublish('', { gate: 'a', publish: 'b' }).ok).toBe(false);
  });
});
