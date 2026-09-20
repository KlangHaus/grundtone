// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

const GUARD = fileURLToPath(new URL('./check-dts-paths.mjs', import.meta.url));

/**
 * 🔴 THE CELLS RUN THE SCRIPT, not a copy of its rules. A cell that reimplements
 * the decision it is checking passes on a script that was deleted — and this
 * whole riff family (KH-1113) exists because a guard looked greener than it was.
 * So each case builds a throwaway workspace, runs the real file against it, and
 * reads the exit code and the printed line.
 *
 * The fixture has FIVE packages because `PACKAGE_FLOOR` is five. That is not an
 * accident of the fixture: it is the cell for the floor. Drop one and the guard
 * must fail on the derivation rather than on the content.
 */
const roots = [];
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true });
});

function fixture({ packages = 5, defect = null } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'dts-guard-'));
  roots.push(root);
  writeFileSync(
    join(root, 'pnpm-workspace.yaml'),
    'packages:\n  - "packages/*"\n',
  );
  for (let i = 0; i < packages; i++) {
    const name = `p${i}`;
    const dir = join(root, 'packages', name);
    mkdirSync(join(dir, 'dist'), { recursive: true });
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        name: `@fixture/${name}`,
        types: './dist/index.d.ts',
        files: ['dist'],
      }),
    );
    writeFileSync(
      join(dir, 'dist', 'index.d.ts'),
      "export type A = import('./other').B;\n",
    );
  }
  if (defect) defect(root);
  return root;
}

function run(root) {
  try {
    const stdout = execFileSync(process.execPath, [GUARD], {
      env: { ...process.env, DTS_GUARD_ROOT: root },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, out: stdout };
  } catch (e) {
    return { code: e.status, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

describe('check-dts-paths.mjs', () => {
  // 🔴 THE POSITIVE CONTROL. Without it, every red below could come from a
  // script that fails on anything at all.
  it('passes a workspace whose declarations stay inside the published dirs', () => {
    const { code, out } = run(fixture());
    expect(out, out).toContain('sweeping 5 publishable packages');
    expect(out, out).toContain('0 escaping type imports across 5 packages');
    expect(code).toBe(0);
  });

  it('prints the denominator per package, which is the whole point of the step', () => {
    const { out } = run(fixture());
    // The numbers, not just a tick: files seen, references seen, escapes.
    expect(out).toMatch(
      /@fixture\/p0: 1 \.d\.ts in \["dist"\], 1 module references .*escaping=0/,
    );
  });

  it('fails on a type import that leaves the published dirs', () => {
    const { code, out } = run(
      fixture({
        defect: root =>
          writeFileSync(
            join(root, 'packages', 'p2', 'dist', 'leak.d.ts'),
            "export type X = import('../../p1/src').Y;\n",
          ),
      }),
    );
    expect(out, out).toContain('leaves the published files');
    expect(out).toContain('dist/leak.d.ts');
    expect(code).toBe(1);
  });

  // 🔴 A ZERO OVER AN ABSENT dist MUST BE RED. This is the case the vitest
  // sweep could not distinguish from success, and the reason the step exists.
  it('fails when `files` promises a directory the build never produced', () => {
    const { code, out } = run(
      fixture({
        defect: root =>
          rmSync(join(root, 'packages', 'p3', 'dist'), {
            recursive: true,
            force: true,
          }),
      }),
    );
    expect(out, out).toContain('which do not exist — the package is not built');
    expect(out).toContain('declares types but emitted 0 .d.ts');
    expect(code).toBe(1);
  });

  it('fails when the package derivation comes back short', () => {
    const { code, out } = run(fixture({ packages: 4 }));
    expect(out, out).toContain('derived 4, expected at least 5');
    expect(code).toBe(1);
  });

  // 🔴 THE SEAM MUST NOT BE AN ESCAPE HATCH. Pointing the guard at a directory
  // with no workspace has to fail, or `DTS_GUARD_ROOT=/tmp` would be a green.
  it('fails when pointed at a root that holds no workspace at all', () => {
    const root = mkdtempSync(join(tmpdir(), 'dts-guard-empty-'));
    roots.push(root);
    const { code, out } = run(root);
    expect(code, out).toBe(1);
  });
});
