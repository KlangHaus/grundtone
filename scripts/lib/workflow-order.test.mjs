import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { gateRunsBeforePublish } from './workflow-order.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const read = f => readFileSync(join(root, '.github/workflows', f), 'utf8');

const GATE = 'scripts/assert-no-downgrade-publish.mjs';
const VULN = 'osv-scanner --recursive';

// release.yml publishes through `pnpm release`, and the gates are chained into
// that command (riff fklbe0cwm8fth7c9jj1tx3ca). The order that matters is the
// order inside the expanded command, not the order of workflow steps.
const { scripts } = JSON.parse(
  readFileSync(join(root, 'package.json'), 'utf8'),
);
const releaseCommand = scripts.release.replace(
  'pnpm release:gates',
  scripts['release:gates'],
);

describe('nedgraderings-vagten dækker udgivelsesstierne', () => {
  // 🔴 Dette er beviset, frozen-2.x-guardens pensionering hviler på: den
  // stabile sti er den ENESTE, der ville udgive react-native, og den havde
  // ingen versionsvagt overhovedet før i dag.
  it('pnpm release: the downgrade gate runs before changeset publish', () => {
    expect(
      gateRunsBeforePublish(releaseCommand, {
        gate: GATE,
        publish: 'changeset publish',
      }),
    ).toEqual({ ok: true, reason: 'gaten står før publish-trinnet' });
  });

  it('prerelease-next.yml: gaten står før @next publiceres', () => {
    expect(
      gateRunsBeforePublish(read('prerelease-next.yml'), {
        gate: GATE,
        publish: 'Publish @next',
      }),
    ).toEqual({ ok: true, reason: 'gaten står før publish-trinnet' });
  });

  // 🔴 Samme krav for vuln-gaten. Maalt 2026-08-24: baade `pnpm audit` og osv
  // koerte KUN paa PR-stien, saa en saarbar transitiv dependency kunne shippe
  // til ni offentlige pakker uden at stoppe udgivelsen.
  it('pnpm release: the vuln scan runs before changeset publish', () => {
    expect(
      gateRunsBeforePublish(releaseCommand, {
        gate: VULN,
        publish: 'changeset publish',
      }).ok,
    ).toBe(true);
  });

  it('prerelease-next.yml: vuln-scannen står før @next publiceres', () => {
    expect(
      gateRunsBeforePublish(read('prerelease-next.yml'), {
        gate: VULN,
        publish: 'Publish @next',
      }).ok,
    ).toBe(true);
  });
});

describe('gateRunsBeforePublish selv', () => {
  const wf = (...steps) => steps.join('\n');

  it('afviser en gate der står EFTER publish', () => {
    const r = gateRunsBeforePublish(wf('run: publish-it', 'run: my-gate'), {
      gate: 'my-gate',
      publish: 'publish-it',
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/EFTER/);
  });

  // Fravær må ikke opløse sig til OK — en manglende gate er værre end en
  // fejlplaceret, ikke mere neutral.
  it('afviser en MANGLENDE gate frem for at melde ok', () => {
    expect(
      gateRunsBeforePublish(wf('run: publish-it'), {
        gate: 'my-gate',
        publish: 'publish-it',
      }).ok,
    ).toBe(false);
  });

  it('afviser når hverken gate eller publish findes', () => {
    expect(gateRunsBeforePublish('', { gate: 'a', publish: 'b' }).ok).toBe(
      false,
    );
  });
});
