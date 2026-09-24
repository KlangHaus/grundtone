#!/usr/bin/env node
/**
 * Gate: every published package must SHIP the licence text, not merely declare
 * it — measured on the package directory npm packs from, not on the repo root.
 *
 * ── Why it exists ───────────────────────────────────────────────────────────
 * Measured 2026-09-24, before this gate: all nine public packages declared
 * `license: MIT` in package.json, npm showed MIT to everyone installing them
 * (@grundtone/vue alone in 37 versions since 2026-03-17), the README carried a
 * licence badge — and there was NO LICENSE FILE ANYWHERE in the repository.
 * The badge linked to `./LICENSE`, which answered 404.
 *
 * So the claim existed in three places and the thing it pointed at did not.
 * That is the defect this gate is written against, and it is worth stating
 * precisely because the cure looks trivial once named: a licence is not a
 * metadata field, it is a text the recipient must be able to read.
 *
 * ── Why the package directory and not the root ──────────────────────────────
 * npm includes LICENSE from the PACKAGE directory automatically, regardless of
 * the `files` array. It does not reach up to a monorepo root. A LICENSE at the
 * repo root therefore satisfies a human browsing GitHub and NOBODY who installs
 * the package. The consumer's artefact is the tarball, so that is the object
 * this gate measures.
 *
 * ── Why identity and not existence ──────────────────────────────────────────
 * Nine copies of a legal text drift. The gate compares bytes with the root
 * LICENSE, so a copy that is edited in one place fails here instead of shipping
 * two different grants under one name. `pnpm license:sync` rewrites them all
 * from the single source.
 *
 * ── What it does NOT check, so the green says what it is worth ──────────────
 * It does not check that MIT is the RIGHT licence, that the copyright holder is
 * the right legal entity, or that third-party material bundled in a package is
 * compatible with it. Those are [jura]'s. It checks that what we claim in
 * metadata is also present as text in the thing we hand people.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

/** Published packages: every package directory whose package.json is not private. */
export function publishedPackages(root = ROOT) {
  const dir = join(root, 'packages');
  return readdirSync(dir)
    .filter(name => statSync(join(dir, name)).isDirectory())
    .flatMap(name => {
      const manifest = join(dir, name, 'package.json');
      let pkg;
      try {
        pkg = JSON.parse(readFileSync(manifest, 'utf8'));
      } catch {
        return [];
      }
      return pkg.private === true
        ? []
        : [{ dir: join(dir, name), name: pkg.name, license: pkg.license }];
    });
}

function main() {
  const rootLicence = readFileSync(join(ROOT, 'LICENSE'), 'utf8');
  const packages = publishedPackages();
  const problems = [];

  for (const pkg of packages) {
    if (!pkg.license) {
      problems.push(`${pkg.name}: no \`license\` field in package.json`);
    }
    let text;
    try {
      text = readFileSync(join(pkg.dir, 'LICENSE'), 'utf8');
    } catch {
      problems.push(
        `${pkg.name}: no LICENSE file — npm would ship a tarball claiming ${pkg.license} with no licence text in it`,
      );
      continue;
    }
    if (text !== rootLicence) {
      problems.push(
        `${pkg.name}: LICENSE differs from the root LICENSE — one grant, one text (run \`pnpm license:sync\`)`,
      );
    }
  }

  // The denominator, always: a green that does not say what it walked cannot be
  // told apart from a green that walked nothing.
  console.log(
    `license: ${packages.length} published package(s) checked against the root LICENSE ` +
      `(${rootLicence.split('\n')[0]})`,
  );
  if (packages.length === 0) {
    console.error(
      '✗ no published packages found — the scan collapsed, so this green would mean nothing',
    );
    process.exit(2);
  }
  if (problems.length > 0) {
    for (const p of problems) console.error(`✗ ${p}`);
    process.exit(1);
  }
  console.log('✓ every published package ships the licence text it declares');
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main();
