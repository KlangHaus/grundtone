/**
 * Every package in the workspace, derived from pnpm-workspace.yaml rather than
 * from a list someone has to remember to extend.
 *
 * 🔴 WHY (riff KH-1101, found by [projektleder]). Both guards added in #210
 * enumerated `['packages', 'apps']` by hand, while the workspace globs are
 * `packages/*`, `apps/*` AND `apps/playground/*`. A publishable package under
 * a parent nobody listed is covered by neither guard, and the failure is
 * SILENT: the guard stays green because its denominator never grew.
 *
 * MEASURED HONESTLY, 2026-09-19, so this is not sold as more than it is: the
 * hardcoded list misses exactly 4 directories today — the four playground apps
 * — and all four are `private`, so the changeset gate skipped them anyway.
 * **The gap changes no decision today.** It is cured because the failure mode
 * is silent, not because it is currently biting.
 *
 * 🔴 AND THE DERIVATION MUST BE LOUD WHEN IT COMES BACK SHORT. Deriving a list
 * is only better than hardcoding one if an empty or truncated derivation
 * fails; otherwise it is the same silence with more code. Hence
 * `assertPlausible` and its cells.
 */

/** `packages:` globs from pnpm-workspace.yaml, without a YAML dependency. */
export function workspaceGlobs(yaml) {
  const lines = yaml.split('\n');
  const start = lines.findIndex(l => /^packages:\s*$/.test(l));
  if (start === -1) return [];
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    const m = /^\s+-\s+['"]?([^'"#\s]+)['"]?\s*$/.exec(lines[i]);
    if (!m) break;
    out.push(m[1]);
  }
  return out;
}

/** The parent directories a glob like `apps/playground/*` searches. */
export function globParents(globs) {
  return [
    ...new Set(
      globs
        .filter(g => g.endsWith('/*'))
        .map(g => g.slice(0, -2))
        .filter(Boolean),
    ),
  ];
}

/**
 * 🔴 A derivation that returns nothing, or that returns fewer entries than a
 * floor the caller knows to be true, is a broken instrument — not an empty
 * workspace. It must say so rather than let every dependent guard pass on an
 * empty denominator.
 *
 * @param {unknown[]} found
 * @param {number} floor  the smallest count the caller knows is real
 * @param {string} what
 */
export function assertPlausible(found, floor, what) {
  if (found.length < floor)
    throw new Error(
      `${what}: derived ${found.length}, expected at least ${floor} — the derivation is broken, ` +
        'and a short list here would silently shrink every guard that uses it',
    );
  return found;
}
