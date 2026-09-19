// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import {
  deployProtection,
  deployScripts,
  exitsZeroOnMissingSecret,
  failsClosedInScript,
  guardedByWorkflow,
  secretNames,
} from './deploy-guard.mjs';

const read = rel =>
  readFileSync(new URL(`../../${rel}`, import.meta.url), 'utf8');

const SCRIPT_PATHS = [
  'apps/docs/scripts/publish-bunny.ts',
  'apps/web/scripts/publish-bunny.ts',
  'packages/email/scripts/publish-cdn.ts',
];
const scripts = SCRIPT_PATHS.map(path => ({ path, source: read(path) }));
const workflows = ['deploy-web.yml', 'release.yml'].map(name => ({
  path: name,
  source: read(`.github/workflows/${name}`),
}));

describe('deployScripts', () => {
  it('finds all three real deploy scripts, not the two anyone remembered', () => {
    expect(deployScripts(scripts)).toEqual(SCRIPT_PATHS);
  });

  // 🔴 The negative control. Without it, a predicate that returned every file
  // would pass the cell above — the denominator would look right for the wrong
  // reason.
  it('does not claim a script that touches no Bunny secret', () => {
    expect(
      deployScripts([
        { path: 'scripts/thing.ts', source: 'const x = process.env.HOME;' },
      ]),
    ).toEqual([]);
  });

  it('catches a NEW deploy script that never uses our helper', () => {
    const rogue = {
      path: 'apps/new/scripts/ship.ts',
      source: 'const z = process.env.BUNNY_NEW_STORAGE_ZONE; upload(z);',
    };
    expect(deployScripts([rogue])).toEqual(['apps/new/scripts/ship.ts']);
  });
});

describe('deployProtection', () => {
  // The measured state of this repo, and the reason this guard exists: the two
  // script-layer ones were celled, the workflow-layer one was not.
  it('classifies each real script by the mechanism that protects it', () => {
    const byPath = Object.fromEntries(
      deployProtection(scripts, workflows).map(r => [r.path, r.protection]),
    );
    expect(byPath['apps/docs/scripts/publish-bunny.ts']).toBe('script');
    expect(byPath['packages/email/scripts/publish-cdn.ts']).toBe('script');
    expect(byPath['apps/web/scripts/publish-bunny.ts']).toBe('workflow');
  });

  // 🔴 THE CELL THE WHOLE FILE IS FOR: a deploy script protected by NEITHER
  // mechanism. Nothing in the repo is in this state today, so without a
  // fixture this guard would be armed against nothing.
  it('reports a script that is protected by neither mechanism', () => {
    const rogue = {
      path: 'apps/new/scripts/ship.ts',
      source:
        'const z = process.env.BUNNY_NEW_STORAGE_ZONE;\n' +
        'const k = process.env.BUNNY_NEW_STORAGE_API_KEY;\n' +
        'if (!z || !k) { console.warn("skipping"); process.exit(0); }\n',
    };
    const [result] = deployProtection([rogue], workflows);
    expect(result.protection).toBe('none');
    expect(result.names).toEqual([
      'BUNNY_NEW_STORAGE_API_KEY',
      'BUNNY_NEW_STORAGE_ZONE',
    ]);
  });

  it('does not accept a workflow that merely MENTIONS the secrets', () => {
    const rogue = {
      path: 'apps/new/scripts/ship.ts',
      source:
        'const z = process.env.BUNNY_NEW_STORAGE_ZONE;\n' +
        'if (!z) { process.exit(0); }\n',
    };
    const chatty = {
      path: 'w.yml',
      source: 'env:\n  BUNNY_NEW_STORAGE_ZONE: x\n  run: echo hello\n',
    };
    expect(deployProtection([rogue], [chatty])[0].protection).toBe('none');
  });
});

describe('the two predicates, separately', () => {
  it('failsClosedInScript sees the shared helper', () => {
    expect(failsClosedInScript('applyDeployMode(resolveDeployMode({}))')).toBe(
      true,
    );
  });

  it('failsClosedInScript is false for a script that exits 0 on missing secrets', () => {
    expect(
      failsClosedInScript('if (!zone) { console.warn("x"); process.exit(0); }'),
    ).toBe(false);
  });

  // 🔴 THE CELL FOR THE PREDICATE I GOT WRONG FIRST. My first version asked
  // whether the file contains a non-zero exit after any negated guard — which
  // is TRUE of apps/web's script, because it exits 1 when an upload fails. It
  // therefore called the one unprotected script protected: a right answer
  // about the wrong branch. This pins the correction.
  it('does not mistake an upload-failure exit(1) for a secret check', () => {
    const source =
      'const zone = process.env.BUNNY_X_ZONE;\n' +
      'if (!zone) { console.warn("skip"); process.exit(0); }\n' +
      'if (!response.ok) { console.error("upload failed"); process.exit(1); }\n';
    expect(exitsZeroOnMissingSecret(source)).toBe(true);
    expect(failsClosedInScript(source)).toBe(false);
  });

  it('a script with only a real failure path is fail-closed', () => {
    const source =
      'const zone = process.env.BUNNY_X_ZONE;\n' +
      'if (!response.ok) { process.exit(1); }\n';
    expect(exitsZeroOnMissingSecret(source)).toBe(false);
    expect(failsClosedInScript(source)).toBe(true);
  });

  it('guardedByWorkflow needs every name AND a way to fail', () => {
    const names = ['BUNNY_A_ZONE', 'BUNNY_A_API_KEY'];
    expect(
      guardedByWorkflow('BUNNY_A_ZONE BUNNY_A_API_KEY ... exit 1', names),
    ).toBe(true);
    // one name missing
    expect(guardedByWorkflow('BUNNY_A_ZONE ... exit 1', names)).toBe(false);
    // no way to fail
    expect(
      guardedByWorkflow('BUNNY_A_ZONE BUNNY_A_API_KEY ... echo ok', names),
    ).toBe(false);
  });

  it('secretNames reads the names a script actually uses', () => {
    expect(
      secretNames(
        'process.env.BUNNY_WEB_STORAGE_ZONE + BUNNY_WEB_STORAGE_API_KEY',
      ),
    ).toEqual(['BUNNY_WEB_STORAGE_API_KEY', 'BUNNY_WEB_STORAGE_ZONE']);
  });
});
