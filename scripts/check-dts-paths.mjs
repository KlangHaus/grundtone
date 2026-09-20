#!/usr/bin/env node
/**
 * The PRODUCTION run of the .d.ts boundary guard: it walks every publishable
 * package's published dirs and PRINTS what it looked at, per package.
 *
 * 🔴 WHY THIS EXISTS BESIDE THE VITEST CELLS (riff KH-1113, decided by
 * [projektleder] 2026-09-20). `scripts/lib/dts-paths.test.mjs` already runs the
 * same sweep — but its counts live inside `expect()`, so they are visible ONLY
 * on a red run. Measured on CI run 35499749741 (the judged SHA 3e7320a, green):
 * the entire log mentions the guard twice, a `✓` line and a coverage row, and
 * neither carries a number. A green from that shape cannot be told apart from a
 * guard that walked an EMPTY dist — both print one tick.
 *
 * My first attempt at a cure was a `console.log` inside the test. Measured, not
 * assumed: vitest's default reporter suppresses console output from PASSING
 * tests, on stdout and stderr alike, and `CI=true` does not change it. Running
 * the exact CI command locally (`pnpm test:coverage`, 108 files / 1317 tests)
 * produced 0 occurrences of the line. A cure that does not reach the surface CI
 * shows is not a cure, so the guard gets its own step instead, where the step
 * log IS the surface.
 *
 * The vitest cells stay: they are the unit proof (does the rule decide
 * correctly). This script is the production proof (what did it decide about the
 * artifact we are about to publish).
 *
 * WHAT MAKES IT RED — each one an alternative explanation for a zero:
 *   1. any escaping type import, in any package                (the defect)
 *   2. a directory named in `files` that does not exist         (absent dist)
 *   3. a package that declares types but emitted no .d.ts       (empty dist)
 *   4. vue under its known-true floor of module references      (the `import('…')`
 *      hole was exactly a sweep that saw fewer forms than exist)
 *   5. fewer publishable packages than the floor                (broken derivation)
 *
 * 🔴 AND WHAT IS DELIBERATELY *NOT* RED: a package with 0 module references.
 * MEASURED 2026-09-20 on all nine: icons, mcp and utils legitimately emit
 * declarations that import nothing at all. A blanket "0 refs is red" rule would
 * have failed three of nine on their correct output — which is why the floor is
 * carried only by vue, where a real floor is known.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { escapingTypeImports } from './lib/dts-paths.mjs';
import {
  assertPlausible,
  globParents,
  workspaceGlobs,
} from './lib/workspace-packages.mjs';

// 🔴 THE SEAM EXISTS SO THE GUARD CAN BE PROVOKED, not so it can be pointed
// somewhere harmless. A root without a workspace yields no packages, and
// `assertPlausible` then throws — so misusing the override fails LOUD rather
// than producing a cheap green. `scripts/check-dts-paths.test.mjs` uses it to
// build a five-package fixture and watch each red actually fire.
const repoRoot =
  process.env.DTS_GUARD_ROOT ?? fileURLToPath(new URL('..', import.meta.url));

// 🔴 5 and not 9. Nine is what the workspace holds today; five is the smallest
// count that is still certainly true, and a floor exists to catch a BROKEN
// derivation, not to freeze the package list. Pinning today's number would turn
// every legitimate removal into a guard failure and teach the next person to
// edit the floor rather than read it.
const PACKAGE_FLOOR = 5;

// 🔴 vue's floor, taken from the cell in dts-paths.test.mjs so the two
// instruments cannot disagree silently. Measured today: 1114 references.
const VUE_REFERENCE_FLOOR = 50;

/** Every workspace directory that holds a package.json. */
function workspacePackageDirs() {
  const globs = workspaceGlobs(
    readFileSync(join(repoRoot, 'pnpm-workspace.yaml'), 'utf8'),
  );
  const dirs = [];
  for (const parent of globParents(globs)) {
    const full = join(repoRoot, parent);
    if (!existsSync(full)) continue;
    for (const entry of readdirSync(full, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = join(parent, entry.name);
      if (existsSync(join(repoRoot, dir, 'package.json'))) dirs.push(dir);
    }
  }
  return dirs;
}

/**
 * 🔴 A `files` entry is not necessarily a directory. Measured: icons ships
 * `THIRD-PARTY-NOTICES.md` and mcp ships `catalog.json`. My first walker
 * crashed on exactly that, and a walker that instead skipped quietly would have
 * reported a smaller denominator with no sign that it had.
 */
function publishedDirs(pkgDir, files) {
  return files
    .map(f => f.replace(/\/\*\*$/, '').replace(/\/$/, ''))
    .filter(entry => {
      const full = join(repoRoot, pkgDir, entry);
      return existsSync(full) && statSync(full).isDirectory();
    });
}

function declarationFiles(pkgDir, dirs) {
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
        path: full.slice(join(repoRoot, pkgDir).length + 1),
        source: readFileSync(full, 'utf8'),
      });
    }
  };
  for (const dir of dirs) walk(join(repoRoot, pkgDir, dir));
  return out;
}

function declaresTypes(manifest) {
  if (manifest.types || manifest.typings) return true;
  return JSON.stringify(manifest.exports ?? {}).includes('"types"');
}

const failures = [];
const packages = assertPlausible(
  workspacePackageDirs()
    .map(dir => ({
      dir,
      manifest: JSON.parse(
        readFileSync(join(repoRoot, dir, 'package.json'), 'utf8'),
      ),
    }))
    .filter(
      p => p.manifest.private !== true && Array.isArray(p.manifest.files),
    ),
  PACKAGE_FLOOR,
  'publishable packages with a `files` field',
);

console.log(
  `[dts-guard] sweeping ${packages.length} publishable packages, derived from pnpm-workspace.yaml`,
);

for (const { dir, manifest } of packages) {
  const files = manifest.files;

  // RED 2: a directory that `files` promises to ship, and that is not there.
  // A zero over an absent dist must be red, not green.
  const missing = files
    .map(f => f.replace(/\/\*\*$/, '').replace(/\/$/, ''))
    .filter(entry => !existsSync(join(repoRoot, dir, entry)));
  if (missing.length > 0) {
    failures.push(
      `${manifest.name}: \`files\` names ${missing.join(', ')}, which do not exist — the package is not built`,
    );
  }

  const dirs = publishedDirs(dir, files);
  const dts = declarationFiles(dir, dirs);
  const { escaping, seen } = escapingTypeImports(dts, files);
  const total = Object.values(seen).reduce((a, b) => a + b, 0);

  console.log(
    `[dts-guard] ${manifest.name}: ${dts.length} .d.ts in ${JSON.stringify(dirs)}, ` +
      `${total} module references ${JSON.stringify(seen)}, escaping=${escaping.length}`,
  );

  for (const e of escaping) {
    failures.push(
      `${manifest.name}: ${e.path} -> ${e.importPath} [${e.form}] leaves the published files`,
    );
  }

  // RED 3: declarations promised, none emitted.
  if (dts.length === 0 && declaresTypes(manifest)) {
    failures.push(
      `${manifest.name}: declares types but emitted 0 .d.ts under ${JSON.stringify(dirs)}`,
    );
  }

  // RED 4: see VUE_REFERENCE_FLOOR.
  if (manifest.name === '@grundtone/vue' && total < VUE_REFERENCE_FLOOR) {
    failures.push(
      `${manifest.name}: ${total} module references is below the floor of ${VUE_REFERENCE_FLOOR} — ` +
        'the sweep is looking at the wrong files, or at a build that emitted nothing',
    );
  }
}

if (failures.length > 0) {
  console.error(`\n[dts-guard] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  🔴 ${f}`);
  process.exit(1);
}

console.log(
  `[dts-guard] OK — 0 escaping type imports across ${packages.length} packages`,
);
