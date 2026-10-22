// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  escapingTypeImports,
  FORMS,
  missingFromTarball,
  typeTargets,
} from './dts-paths.mjs';
import { assertPlausible } from './workspace-packages.mjs';

// A pack list shaped like @grundtone/vue's (`files: ["dist","scss"]`), plus the
// files npm adds whatever `files` says. The whole point of KH-1113 is that THIS
// list, not the package root and not a reading of `files`, is the boundary.
const VUE_PACK = new Set([
  'package.json',
  'README.md',
  'LICENSE',
  'dist/index.d.ts',
  'dist/x.d.ts',
  'dist/a/b.d.ts',
  'dist/composables/useDawaAutocomplete.d.ts',
  'dist/composables/useToast.d.ts',
  'dist/molecules/Toast/types.d.ts',
  'dist/molecules/AddressInput/types.d.ts',
  'dist/atoms/Button/index.d.ts',
  'dist/atoms/Toggle/Toggle.vue.d.ts',
  'dist/templates/index.d.cts',
  'dist/template-CJ3ZdEAr.d.cts',
  'dist/module.mjs',
  'scss/lib.d.ts',
  'scss/tokens.d.ts',
]);
const gone = path => {
  const pack = new Set(VUE_PACK);
  pack.delete(path);
  return pack;
};

describe('missingFromTarball', () => {
  // The 13 real ones from @grundtone/vue@3.2.0, by shape.
  it('flags a path that leaves the package root', () => {
    for (const [file, spec] of [
      ['dist/index.d.ts', '../../utils/src'],
      ['dist/index.d.ts', '../../core/src'],
      ['dist/atoms/Icon/types.d.ts', '../../../../core/src'],
      ['dist/composables/useField.d.ts', '../../../utils/src'],
    ])
      expect(missingFromTarball(file, spec, VUE_PACK), spec).toBe(true);
  });

  // 🔴 THE NEGATIVE CONTROL. The six benign intra-dist shapes resolve to a
  // packed file — a guard that failed on them would be switched off within a
  // week.
  it('leaves relative paths that resolve to a packed file alone', () => {
    for (const [file, spec] of [
      [
        'dist/molecules/AddressInput/types.d.ts',
        '../../composables/useDawaAutocomplete',
      ],
      ['dist/composables/useToast.d.ts', '../molecules/Toast/types'],
      ['dist/templates/index.d.cts', '../template-CJ3ZdEAr.cjs'],
      ['dist/index.d.ts', './atoms/Button'],
      ['dist/index.d.ts', './atoms/Toggle/Toggle.vue'],
      ['dist/a/b.d.ts', '../x'],
    ])
      expect(missingFromTarball(file, spec, VUE_PACK), spec).toBe(false);
  });

  it('ignores bare specifiers, which is what the cure produces', () => {
    expect(
      missingFromTarball('dist/index.d.ts', '@grundtone/utils', VUE_PACK),
    ).toBe(false);
  });

  // 🔴 THE CELL THAT USED TO PIN THE WRONG ANSWER (riff KH-1113, found by
  // [sikkerhed]). It once asserted `dist/a/b.d.ts` + `../../x` === false —
  // "two ups stay inside". Inside the PACKAGE, yes; inside the TARBALL, no.
  it('flags a path that stays in the package but is not in the tarball', () => {
    expect(missingFromTarball('dist/a/b.d.ts', '../x', VUE_PACK)).toBe(false); // dist/x — packed
    expect(missingFromTarball('dist/a/b.d.ts', '../../x', VUE_PACK)).toBe(true); // x — not packed
    expect(missingFromTarball('dist/a/b.d.ts', '../../../x', VUE_PACK)).toBe(
      true,
    ); // above root
  });

  // [sikkerhed]'s measured examples: all three passed the package-root rule.
  it('flags the three shapes that slipped through the package-root rule', () => {
    expect(
      missingFromTarball('dist/index.d.ts', '../src/tokens', VUE_PACK),
    ).toBe(true);
    expect(
      missingFromTarball('dist/a/b/c.d.ts', '../../../src/tokens', VUE_PACK),
    ).toBe(true);
    expect(
      missingFromTarball('dist/a/b/c.d.ts', '../../../src/core', VUE_PACK),
    ).toBe(true);
  });

  // 🔴 THE CELL THAT FAILS IF THE RULE FALLS BACK TO THE PACKAGE BOUNDARY.
  // A package-boundary rule answers `false` for all three; the tarball answers
  // `true`. Without it, someone could "simplify" this back to `ups > depth`.
  it('cannot be satisfied by a package-boundary rule', () => {
    for (const [file, spec] of [
      ['dist/a/b.d.ts', '../../x'],
      ['dist/index.d.ts', '../src/tokens'],
      ['scss/a/b.d.ts', '../../README'],
    ])
      expect(
        missingFromTarball(file, spec, VUE_PACK),
        `${file} + ${spec}`,
      ).toBe(true);
  });

  // 🔴 THE CELL THAT FAILS IF THE RULE FALLS BACK TO READING `files` (#220's
  // rule: "does it land under a published directory?"). That rule gets each of
  // these wrong, and each one was measured against it before this change.
  it('cannot be satisfied by a `files`-prefix rule', () => {
    // Inside dist, but the target was never emitted: TS2307 for the consumer.
    expect(missingFromTarball('dist/a.d.ts', './gone', VUE_PACK)).toBe(true);
    expect(
      missingFromTarball(
        'dist/index.d.ts',
        './atoms/Button',
        gone('dist/atoms/Button/index.d.ts'),
      ),
      'a published dir that lost its index',
    ).toBe(true);
    // Outside every `files` entry, and packed anyway: npm always adds it.
    expect(missingFromTarball('dist/a.d.ts', '../package.json', VUE_PACK)).toBe(
      false,
    );
  });

  // 🔴 THE PREFIX BOUNDARY, found by [sikkerhed] with a mutation that killed
  // nothing under the old rule. Membership is by whole path now, so a sibling
  // whose name merely starts with `dist` cannot count as inside it.
  it('does not accept a sibling directory whose name merely starts with a published one', () => {
    expect(
      missingFromTarball('dist/a/b.d.ts', '../../distractions/x', VUE_PACK),
    ).toBe(true);
    expect(missingFromTarball('dist/a/b.d.ts', '../x', VUE_PACK)).toBe(false);
  });

  // 🔴 A JS extension is not its own type source. nuxt emits
  // `from './module.mjs'`; the tarball must carry `module.d.mts` for it.
  it('wants the declaration behind a JS specifier, not the JS file', () => {
    expect(
      missingFromTarball('dist/types.d.mts', './module.mjs', VUE_PACK),
    ).toBe(true);
    const withDecl = new Set([...VUE_PACK, 'dist/module.d.mts']);
    expect(
      missingFromTarball('dist/types.d.mts', './module.mjs', withDecl),
    ).toBe(false);
    expect(
      missingFromTarball(
        'dist/templates/index.d.cts',
        '../template-CJ3ZdEAr.cjs',
        gone('dist/template-CJ3ZdEAr.d.cts'),
      ),
    ).toBe(true);
  });

  it('honours every packed dir, not just the first', () => {
    expect(missingFromTarball('scss/lib.d.ts', './tokens', VUE_PACK)).toBe(
      false,
    );
    expect(missingFromTarball('dist/a.d.ts', '../scss/lib', VUE_PACK)).toBe(
      false,
    );
  });

  it('names what TypeScript would try, so the list is auditable', () => {
    expect(typeTargets('dist/x.mjs')).toEqual(['dist/x.d.mts', 'dist/x.mts']);
    expect(typeTargets('dist/x')).toContain('dist/x/index.d.ts');
    expect(typeTargets('dist/x.js')).not.toContain('dist/x.js');
  });

  // 🔴 A missing pack list must be LOUD. Treating it as "publishes nothing"
  // would flag every path and look like a newly effective guard.
  it('throws when the caller gives it no pack list', () => {
    expect(() => missingFromTarball('dist/a.d.ts', '../b', new Set())).toThrow(
      /no pack list given/,
    );
    expect(() =>
      missingFromTarball('dist/a.d.ts', '../b', ['dist/b.d.ts']),
    ).toThrow();
    expect(() =>
      missingFromTarball('dist/a.d.ts', '../b', undefined),
    ).toThrow();
  });
});

// 🔴 RUN AGAINST THE BUILT PACKAGES, because the defect only exists in emitted
// output — the source was always correct. If dist is missing the cell is RED,
// not skipped: a guard that quietly measures nothing is the failure this whole
// riff family is about.
describe('the packages we publish', () => {
  const root = fileURLToPath(new URL('../../packages/', import.meta.url));

  // 🔴 The tarball's own list, from the packer `changeset publish` uses —
  // neither the walk of dist nor `files` restated here. pnpm 10.14 has no
  // `pack --dry-run`, so the tarball is written to a throwaway dir and dropped.
  const tarballPaths = pkg => {
    const dest = mkdtempSync(join(tmpdir(), 'dts-paths-test-'));
    try {
      const out = execFileSync(
        'pnpm',
        ['pack', '--json', '--pack-destination', dest],
        {
          cwd: join(root, pkg),
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
        },
      );
      return JSON.parse(out.slice(out.indexOf('{'))).files.map(f => f.path);
    } finally {
      rmSync(dest, { recursive: true, force: true });
    }
  };

  it('vue ships no type import that resolves outside its TARBALL, in ANY form', () => {
    const packed = assertPlausible(tarballPaths('vue'), 5, 'vue packed files');
    const files = assertPlausible(
      packed
        .filter(p => /\.d\.[cm]?ts$/.test(p))
        .map(p => ({
          path: p,
          source: readFileSync(join(root, 'vue', p), 'utf8'),
        })),
      5,
      'vue .d.ts files',
    );
    const { escaping, seen } = escapingTypeImports(files, packed);
    expect(
      escaping.map(e => `${e.path} -> ${e.importPath} [${e.form}]`),
      'a consumer cannot resolve these, and with skipLibCheck they silently become any',
    ).toEqual([]);

    // 🔴 The green must say what it looked at, PER FORM. A sum over forms
    // cannot see one form go to zero — which is the shape the `import('…')`
    // hole had. Measured 2026-10-21: 314 `from '…'`, 807 `import('…')`.
    for (const form of ["from '…'", "import('…')"])
      expect(seen[form], `${form} in ${files.length} files`).toBeGreaterThan(
        50,
      );
  }, 30_000);

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
    const { escaping, seen } = escapingTypeImports([toggle], VUE_PACK);
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
      VUE_PACK,
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
      VUE_PACK,
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
