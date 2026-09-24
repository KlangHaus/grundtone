import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The decision behind the licence gate: does every PUBLISHED package ship the
 * licence text it declares, byte for byte?
 *
 * ── Why it exists ───────────────────────────────────────────────────────────
 * Measured 2026-09-24: all nine public packages declared `license: MIT`, npm
 * served that to everyone installing them (@grundtone/vue alone in 37 versions
 * since 2026-03-17), and the README carried a licence badge — while there was
 * NO LICENSE FILE ANYWHERE in the repository. The badge linked to `./LICENSE`,
 * which answered 404. The claim existed in three places and the thing it
 * pointed at did not.
 *
 * ── Why the package directory and not the repo root ─────────────────────────
 * npm includes `LICENSE` from the PACKAGE directory automatically, whatever the
 * `files` array says — and it does not reach up to a monorepo root. A root file
 * satisfies a human browsing GitHub and NOBODY who installs the package. The
 * consumer's artefact is the tarball, so that is the object measured here.
 *
 * ── Why identity and not existence ──────────────────────────────────────────
 * Nine copies of a legal text drift. Comparing bytes means a copy edited in one
 * place fails here instead of shipping two different grants under one name.
 *
 * ── What this does NOT decide ───────────────────────────────────────────────
 * Whether MIT is the right licence, whether the copyright holder is the right
 * legal entity, or whether bundled third-party material is compatible with it.
 * Those are [jura]'s. This decides one thing: metadata and artefact agree.
 */

/** Files npm always packs from a package directory, regardless of `files`. */
export const LICENCE_FILENAME = 'LICENSE';

/**
 * Every package directory whose package.json is not `private`.
 * @returns {{dir: string, name: string, license: string | undefined}[]}
 */
export function publishedPackages(root) {
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

/**
 * @returns {{packages: object[], problems: string[], licence: string}}
 *   `problems` empty means metadata and artefact agree for every package.
 */
export function licenceProblems(root) {
  const licence = readFileSync(join(root, LICENCE_FILENAME), 'utf8');
  const packages = publishedPackages(root);
  const problems = [];

  for (const pkg of packages) {
    if (!pkg.license) {
      problems.push(`${pkg.name}: no \`license\` field in package.json`);
    }
    let text;
    try {
      text = readFileSync(join(pkg.dir, LICENCE_FILENAME), 'utf8');
    } catch {
      problems.push(
        `${pkg.name}: no LICENSE file — npm would ship a tarball claiming ${pkg.license} with no licence text in it`,
      );
      continue;
    }
    if (text !== licence) {
      problems.push(
        `${pkg.name}: LICENSE differs from the root LICENSE — one grant, one text (run \`pnpm license:sync\`)`,
      );
    }
  }

  return { packages, problems, licence };
}
