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
 * 🔴 IT READS THE TARBALL, NOT `files` (KH-1113, step two). Each package is
 * packed with `pnpm pack` — the same packer `changeset publish` uses — and both
 * the .d.ts files swept and the boundary they are judged against come from that
 * pack list. A `files` entry that matches nothing, a glob, an exclusion, or a
 * file npm always adds can therefore no longer make this guard disagree with
 * what a consumer installs.
 *
 * WHAT MAKES IT RED — each one an alternative explanation for a zero:
 *   1. any type import that resolves to no file in the tarball  (the defect)
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

import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
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
 * Every path `pnpm pack` puts in the tarball, package-relative.
 *
 * 🔴 A REAL PACK, NOT A DRY RUN: pnpm 10.14 has no `pack --dry-run`, and npm's
 * dry run is a different packer from the one that publishes. The tarball goes to
 * a throwaway directory and is deleted; only the list is kept.
 */
function tarballPaths(pkgDir) {
  const dest = mkdtempSync(join(tmpdir(), 'dts-guard-pack-'));
  try {
    const out = execFileSync(
      'pnpm',
      ['pack', '--json', '--pack-destination', dest],
      {
        cwd: join(repoRoot, pkgDir),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
    return JSON.parse(out.slice(out.indexOf('{'))).files.map(f => f.path);
  } finally {
    rmSync(dest, { recursive: true, force: true });
  }
}

function declarationFiles(pkgDir, packed) {
  return packed
    .filter(path => /\.d\.[cm]?ts$/.test(path))
    .map(path => ({
      path,
      source: readFileSync(join(repoRoot, pkgDir, path), 'utf8'),
    }));
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

  // RED 2: a DIRECTORY that `files` promises to ship, and that is not there.
  // A zero over an absent dist must be red, not green.
  //
  // 🔴 DIRECTORIES ONLY, and the narrowing was forced by a measurement rather
  // than guessed: the first version required every `files` entry to exist and
  // went red in CI on `@grundtone/mcp: catalog.json`. That file is GENERATED
  // and gitignored (packages/mcp/.gitignore), so it exists on my machine, where
  // I had built, and legitimately does not exist in the Test job, which only
  // downloads the `dist` artifacts. Requiring it here would make this guard red
  // forever for a reason that has nothing to do with type boundaries — and the
  // local green would have hidden it, which is the lesson, not the fix.
  //
  // A missing shipped FILE is still a real packaging question; it belongs to
  // the release gate, not to a .d.ts boundary check. `dist`, `scss`, `assets`
  // and `src` carry no extension, so everything this guard actually walks stays
  // covered.
  const missing = files
    .map(f => f.replace(/\/\*\*$/, '').replace(/\/$/, ''))
    .filter(entry => !/\.[a-z0-9]+$/i.test(entry.split('/').pop()))
    .filter(entry => !existsSync(join(repoRoot, dir, entry)));
  if (missing.length > 0) {
    failures.push(
      `${manifest.name}: \`files\` names ${missing.join(', ')}, which do not exist — the package is not built`,
    );
  }

  const packed = tarballPaths(dir);
  const dts = declarationFiles(dir, packed);
  const { escaping, seen } = escapingTypeImports(dts, packed);
  const total = Object.values(seen).reduce((a, b) => a + b, 0);

  console.log(
    `[dts-guard] ${manifest.name}: ${packed.length} packed files, ${dts.length} .d.ts, ` +
      `${total} module references ${JSON.stringify(seen)}, escaping=${escaping.length}`,
  );

  for (const e of escaping) {
    failures.push(
      `${manifest.name}: ${e.path} -> ${e.importPath} [${e.form}] resolves to no file in the tarball`,
    );
  }

  // RED 3: declarations promised, none packed.
  if (dts.length === 0 && declaresTypes(manifest)) {
    failures.push(
      `${manifest.name}: declares types but its tarball holds 0 .d.ts`,
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
