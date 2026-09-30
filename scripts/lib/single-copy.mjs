import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * How many PHYSICAL copies of a package are installed?
 *
 * 🔴 WHY THIS EXISTS (KH-1221, measured 2026-09-30). `@grundtone/web`'s
 * prerender died with [500] on / and /studio when the root manifest asked for
 * `vue: ^3.5.43`, and worked at `^3.5.42` — while BOTH trees contained vue
 * 3.5.43. The version was never the discriminator.
 *
 * The cause was two PHYSICAL copies. This repo uses `node-linker=hoisted` +
 * `shamefully-hoist=true`: pnpm hoisted 3.5.43 to the root while `nuxt`,
 * `@nuxt/vite-builder`, `@vitejs/plugin-vue` and `@vue/test-utils` each got a
 * nested 3.5.42. Two Vue instances in one process is the classic way SSR and
 * prerender break.
 *
 * 🔴 AND WHY IT COUNTS DIRECTORIES RATHER THAN READING THE LOCKFILE. I first
 * measured this in the lockfile and counted 38 occurrences of vue@3.5.43 in
 * BOTH trees — a right answer about the wrong object. The lockfile records
 * resolution; `node_modules` records what a process will actually load. Only
 * the second one can be loaded twice.
 */

/**
 * @param {string} root        repo root
 * @param {string} name        package name, e.g. 'vue'
 * @param {number} [maxDepth]  how deep to look for nested copies
 * @returns {{version: string, path: string}[]} every copy found, hoisted first
 */
export function installedCopies(root, name, maxDepth = 4) {
  const found = [];
  const seen = new Set();

  const read = dir => {
    const manifest = join(dir, 'package.json');
    try {
      const pkg = JSON.parse(readFileSync(manifest, 'utf8'));
      if (pkg.name === name && pkg.version) return pkg.version;
    } catch {
      /* not a package directory */
    }
    return null;
  };

  const walk = (dir, depth) => {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      let isDir = false;
      try {
        isDir = statSync(full).isDirectory();
      } catch {
        continue;
      }
      if (!isDir) continue;

      if (entry === name || (name.startsWith('@') && full.endsWith(name))) {
        const version = read(full);
        if (version && !seen.has(full)) {
          seen.add(full);
          found.push({ version, path: full });
        }
      }
      // Only descend through node_modules trees; the rest of the repo is not
      // where npm resolution looks.
      if (entry === 'node_modules' || full.includes('node_modules')) {
        walk(full, depth + 1);
      }
    }
  };

  walk(join(root, 'node_modules'), 0);
  return found;
}

/**
 * @returns {{ok: boolean, versions: string[], reason: string}}
 *   ok=false when a package is installed in more than one VERSION.
 *
 * Two copies of the SAME version are harmless duplication; two different
 * versions of a framework with module-level state are not. The distinction is
 * the point, so the rule is on versions rather than on paths.
 */
export function checkSingleVersion(copies, name) {
  const versions = [...new Set(copies.map(c => c.version))].sort();

  if (copies.length === 0) {
    return {
      ok: false,
      versions,
      reason:
        `${name}: not installed at all — this guard scanned node_modules and found zero copies, ` +
        'so a green here would mean the scan is broken, not that the tree is clean.',
    };
  }
  if (versions.length === 1) {
    return {
      ok: true,
      versions,
      reason: `${name}: one version installed (${versions[0]}), ${copies.length} copy/copies`,
    };
  }
  return {
    ok: false,
    versions,
    reason:
      `${name}: ${versions.length} DIFFERENT versions installed (${versions.join(', ')}). ` +
      'With node-linker=hoisted that means two instances in one process — the failure KH-1221 ' +
      'found, where the prerender died while every version check looked identical. Pin it with ' +
      'a pnpm override.',
  };
}
