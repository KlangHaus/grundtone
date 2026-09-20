// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  escapesPublishedFiles,
  escapingTypeImports,
  FORMS,
} from './dts-paths.mjs';
import { assertPlausible } from './workspace-packages.mjs';

// @grundtone/vue's real `files`. The whole point of KH-1113 is that this list,
// not the package root, is the boundary.
const VUE_FILES = ['dist', 'scss'];

describe('escapesPublishedFiles', () => {
  // The 13 real ones from @grundtone/vue@3.2.0, by shape.
  it('flags a path that leaves the package root', () => {
    expect(
      escapesPublishedFiles('dist/index.d.ts', '../../utils/src', VUE_FILES),
    ).toBe(true);
    expect(
      escapesPublishedFiles('dist/index.d.ts', '../../core/src', VUE_FILES),
    ).toBe(true);
    expect(
      escapesPublishedFiles(
        'dist/atoms/Icon/types.d.ts',
        '../../../../core/src',
        VUE_FILES,
      ),
    ).toBe(true);
    expect(
      escapesPublishedFiles(
        'dist/composables/useField.d.ts',
        '../../../utils/src',
        VUE_FILES,
      ),
    ).toBe(true);
  });

  // 🔴 THE NEGATIVE CONTROL. The rule is "does it land in a published dir",
  // and these six shapes do — a guard that failed on them would be switched off
  // within a week.
  it('leaves relative paths that stay inside a published dir alone', () => {
    expect(
      escapesPublishedFiles(
        'dist/molecules/AddressInput/types.d.ts',
        '../../composables/useDawaAutocomplete',
        VUE_FILES,
      ),
    ).toBe(false);
    expect(
      escapesPublishedFiles(
        'dist/composables/useToast.d.ts',
        '../molecules/Toast/types',
        VUE_FILES,
      ),
    ).toBe(false);
    expect(
      escapesPublishedFiles(
        'dist/templates/index.d.cts',
        '../template-CJ3ZdEAr.cjs',
        ['dist'],
      ),
    ).toBe(false);
  });

  it('ignores bare specifiers, which is what the cure produces', () => {
    expect(
      escapesPublishedFiles('dist/index.d.ts', '@grundtone/utils', VUE_FILES),
    ).toBe(false);
    expect(
      escapesPublishedFiles('dist/index.d.ts', './atoms/Button', VUE_FILES),
    ).toBe(false);
  });

  // 🔴 THE CELL THAT USED TO PIN THE WRONG ANSWER (riff KH-1113, found by
  // [sikkerhed]). It previously asserted `dist/a/b.d.ts` + `../../x` === false
  // — "two ups stay inside". Inside the PACKAGE, yes; inside the TARBALL, no:
  // it resolves to `x` at the package root, and `files: ["dist","scss"]` does
  // not ship that. The guard did not merely miss the case, it proved the wrong
  // behaviour. This assertion is now FLIPPED.
  it('flags a path that stays in the package but leaves the published dirs', () => {
    expect(escapesPublishedFiles('dist/a/b.d.ts', '../x', VUE_FILES)).toBe(
      false,
    ); // dist/x — shipped
    expect(escapesPublishedFiles('dist/a/b.d.ts', '../../x', VUE_FILES)).toBe(
      true,
    ); // x — NOT shipped
    expect(
      escapesPublishedFiles('dist/a/b.d.ts', '../../../x', VUE_FILES),
    ).toBe(true); // above root
  });

  // [sikkerhed]'s measured examples: all three passed unflagged under the old
  // rule, while the control `../../utils/src` was flagged.
  it('flags the three shapes that slipped through the package-root rule', () => {
    expect(
      escapesPublishedFiles('dist/index.d.ts', '../src/tokens', VUE_FILES),
    ).toBe(true);
    expect(
      escapesPublishedFiles(
        'dist/a/b/c.d.ts',
        '../../../src/tokens',
        VUE_FILES,
      ),
    ).toBe(true);
    expect(
      escapesPublishedFiles('dist/a/b/c.d.ts', '../../../src/core', VUE_FILES),
    ).toBe(true);
  });

  // 🔴 THE CELL THAT FAILS IF THE RULE FALLS BACK TO THE PACKAGE BOUNDARY.
  // Without it, someone could "simplify" this back to `ups > depth` and every
  // other cell here would still pass — that is precisely how the hole was born.
  // A package-boundary rule answers `false` for both of these; the tarball rule
  // answers `true`.
  it('cannot be satisfied by a package-boundary rule', () => {
    const packageBoundaryWouldSay = false;
    for (const [file, spec] of [
      ['dist/a/b.d.ts', '../../x'],
      ['dist/index.d.ts', '../src/tokens'],
      ['scss/a/b.d.ts', '../../README.md'],
    ]) {
      expect(
        escapesPublishedFiles(file, spec, VUE_FILES),
        `${file} + ${spec} must not inherit the package-boundary answer`,
      ).not.toBe(packageBoundaryWouldSay);
    }
  });

  it('honours every published dir, not just the first', () => {
    expect(escapesPublishedFiles('scss/lib.d.ts', './tokens', VUE_FILES)).toBe(
      false,
    );
    expect(escapesPublishedFiles('dist/a.d.ts', '../scss/lib', VUE_FILES)).toBe(
      false,
    );
  });

  it('accepts the glob and trailing-slash spellings of `files`', () => {
    for (const spelling of [['dist'], ['dist/**'], ['dist/']]) {
      expect(
        escapesPublishedFiles('dist/a.d.ts', './b', spelling),
        String(spelling),
      ).toBe(false);
      expect(
        escapesPublishedFiles('dist/a.d.ts', '../b', spelling),
        String(spelling),
      ).toBe(true);
    }
  });

  // 🔴 A missing `files` must be LOUD. Treating it as "publishes nothing" would
  // flag every path and look like a newly effective guard; treating it as
  // "publishes everything" would silently restore the old hole.
  it('throws when the caller gives it no published list', () => {
    expect(() => escapesPublishedFiles('dist/a.d.ts', '../b', [])).toThrow(
      /no .files. given/,
    );
    expect(() =>
      escapesPublishedFiles('dist/a.d.ts', '../b', undefined),
    ).toThrow();
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

  // 🔴 `files` is READ FROM THE PACKAGE, not restated here. A copy in the cell
  // would drift from the manifest, and the whole point of KH-1113 is that the
  // manifest — not the package root — decides the boundary.
  const publishedFiles = pkg =>
    JSON.parse(readFileSync(join(root, pkg, 'package.json'), 'utf8')).files;

  it('vue ships no type import that leaves the PUBLISHED dirs, in ANY form', () => {
    const files = assertPlausible(dtsFiles('vue'), 5, 'vue .d.ts files');
    const vueFiles = assertPlausible(
      publishedFiles('vue'),
      1,
      "vue's `files` field",
    );
    const { escaping, seen } = escapingTypeImports(files, vueFiles);
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
    const { escaping, seen } = escapingTypeImports([toggle], ['dist']);
    expect(escaping).toHaveLength(1);
    expect(escaping[0].form).toBe("import('…')");
    expect(seen["import('…')"]).toBe(1);
  });

  it('sees double-quoted forms too, which are 0 today', () => {
    const { escaping } = escapingTypeImports(
      [
        {
          path: 'dist/index.d.ts',
          source: 'export { X } from "../../utils/src";',
        },
        {
          path: 'dist/index.d.ts',
          source: 'type A = import("../../core/src").B;',
        },
      ],
      ['dist'],
    );
    expect(escaping.map(e => e.form).sort()).toEqual([
      'from "…"',
      'import("…")',
    ]);
  });

  // 🔴 The denominator itself, so a form that stops matching is a RED and not a
  // quiet improvement in the numbers.
  it('counts candidates per form, including forms with no escaping paths', () => {
    const { seen } = escapingTypeImports(
      [
        {
          path: 'dist/index.d.ts',
          source:
            "export { A } from './local';\n" +
            'export { B } from "./local";\n' +
            "type C = import('./local').T;\n" +
            'type D = import("./local").T;\n',
        },
      ],
      ['dist'],
    );
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
