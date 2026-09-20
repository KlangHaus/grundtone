// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { escapesPackage, escapingTypeImports, FORMS } from './dts-paths.mjs';
import { assertPlausible } from './workspace-packages.mjs';

describe('escapesPackage', () => {
  // The 13 real ones from @grundtone/vue@3.2.0, by shape.
  it('flags a path that leaves the package root', () => {
    expect(escapesPackage('dist/index.d.ts', '../../utils/src')).toBe(true);
    expect(escapesPackage('dist/index.d.ts', '../../core/src')).toBe(true);
    expect(
      escapesPackage('dist/atoms/Icon/types.d.ts', '../../../../core/src'),
    ).toBe(true);
    expect(
      escapesPackage('dist/composables/useField.d.ts', '../../../utils/src'),
    ).toBe(true);
  });

  // 🔴 THE NEGATIVE CONTROL, and it is the whole reason the rule is "leaves the
  // package" rather than "starts with ..". These 6 shapes are legitimate and a
  // guard that failed on them would be switched off within a week.
  it('leaves relative paths that stay inside dist alone', () => {
    expect(
      escapesPackage(
        'dist/molecules/AddressInput/types.d.ts',
        '../../composables/useDawaAutocomplete',
      ),
    ).toBe(false);
    expect(
      escapesPackage(
        'dist/composables/useToast.d.ts',
        '../molecules/Toast/types',
      ),
    ).toBe(false);
    expect(
      escapesPackage('dist/templates/index.d.cts', '../template-CJ3ZdEAr.cjs'),
    ).toBe(false);
  });

  it('ignores bare specifiers, which is what the cure produces', () => {
    expect(escapesPackage('dist/index.d.ts', '@grundtone/utils')).toBe(false);
    expect(escapesPackage('dist/index.d.ts', './atoms/Button')).toBe(false);
  });

  it('is exact at the boundary, not approximate', () => {
    // dirname depth 2; two ups stay inside, three leave.
    expect(escapesPackage('dist/a/b.d.ts', '../x')).toBe(false);
    expect(escapesPackage('dist/a/b.d.ts', '../../x')).toBe(false);
    expect(escapesPackage('dist/a/b.d.ts', '../../../x')).toBe(true);
  });
});

// 🔴 RUN AGAINST THE BUILT PACKAGES, because the defect only exists in emitted
// output — the source was always correct. If dist is missing the cell is RED,
// not skipped: a guard that quietly measures nothing is the failure this whole
// riff family is about.
describe('the packages we publish', () => {
  const root = fileURLToPath(new URL('../../packages/', import.meta.url));

  // 🔴 withFileTypes, NOT statSync-then-read: CodeQL flagged the two-call form
  // as js/file-system-race (high) — the path is checked and then used, so the
  // entry can change in between. One readdir answers both questions, and
  // deploy-guard.mjs's walker already had it this way; this one drifted.
  const dtsFiles = pkg => {
    const out = [];
    const walk = dir => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }
        if (!/\.d\.[cm]?ts$/.test(entry.name)) continue;
        out.push({
          path: full.slice(join(root, pkg).length + 1),
          source: readFileSync(full, 'utf8'),
        });
      }
    };
    walk(join(root, pkg, 'dist'));
    return out;
  };

  it('vue ships no type import that leaves the package, in ANY form', () => {
    const files = assertPlausible(dtsFiles('vue'), 5, 'vue .d.ts files');
    const { escaping, seen } = escapingTypeImports(files);
    expect(
      escaping.map(e => `${e.path} -> ${e.importPath} [${e.form}]`),
      'a consumer cannot resolve these, and with skipLibCheck they silently become any',
    ).toEqual([]);

    // 🔴 The green must say what it looked at. A build that emitted no module
    // references at all would satisfy the assertion above while measuring
    // nothing — and that is the shape the `import('…')` hole had.
    const total = Object.values(seen).reduce((a, b) => a + b, 0);
    expect(
      total,
      `no module references found at all in ${files.length} files`,
    ).toBeGreaterThan(50);
  });

  // 🔴 THE CELL FOR THE HOLE [quality] FOUND ON #217, with the fixture taken
  // verbatim from the PUBLISHED 3.2.0 tarball. The guard matched only
  // `from '…'`, so this one line was invisible — and the number "13 real" I
  // published in the riff, the PR and the commit message was produced by that
  // same blind regex. The true count in the broken artifact is 14.
  it('sees the dynamic-import form, which the first version could not', () => {
    const toggle = {
      path: 'dist/atoms/Toggle/Toggle.vue.d.ts',
      source:
        "declare const _default: import('../../../../core/src').ToggleSize;\n",
    };
    const { escaping, seen } = escapingTypeImports([toggle]);
    expect(escaping).toHaveLength(1);
    expect(escaping[0].form).toBe("import('…')");
    expect(seen["import('…')"]).toBe(1);
  });

  it('sees double-quoted forms too, which are 0 today', () => {
    const { escaping } = escapingTypeImports([
      {
        path: 'dist/index.d.ts',
        source: 'export { X } from "../../utils/src";',
      },
      {
        path: 'dist/index.d.ts',
        source: 'type A = import("../../core/src").B;',
      },
    ]);
    expect(escaping.map(e => e.form).sort()).toEqual([
      'from "…"',
      'import("…")',
    ]);
  });

  // 🔴 The denominator itself, so a form that stops matching is a RED and not a
  // quiet improvement in the numbers.
  it('counts candidates per form, including forms with no escaping paths', () => {
    const { seen } = escapingTypeImports([
      {
        path: 'dist/index.d.ts',
        source:
          "export { A } from './local';\n" +
          'export { B } from "./local";\n' +
          "type C = import('./local').T;\n" +
          'type D = import("./local").T;\n',
      },
    ]);
    expect(seen).toEqual({
      "from '…'": 1,
      'from "…"': 1,
      "import('…')": 1,
      'import("…")': 1,
    });
  });

  it('declares every form it knows about, so the list is auditable', () => {
    expect(Object.keys(FORMS).sort()).toEqual([
      'from "…"',
      "from '…'",
      'import("…")',
      "import('…')",
    ]);
  });
});
