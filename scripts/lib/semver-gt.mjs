/**
 * Minimal SemVer "strictly greater than" — the comparison the version-drift
 * gate depends on. Its own module so the gate and its tests share ONE
 * definition instead of a copy that can drift.
 *
 * Deliberately not `semver` from npm: this runs in a CI step that does no
 * install, so it must have zero dependencies.
 */

/** Parse a SemVer core (major.minor.patch) plus optional prerelease. */
export function parse(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/.exec(v);
  if (!m) throw new Error(`unparseable version: ${v}`);
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null };
}

/**
 * True when a > b.
 *
 * Implements the part of SemVer §11 the gate actually relies on — including
 * the rule that makes equality a failure rather than a pass: with equal
 * cores, a version WITH a prerelease ranks LOWER than one without. That is
 * why `@grundtone/mcp` at 0.1.0 on develop and 0.1.0 on npm was a problem:
 * stamping it would have produced `0.1.0-next.N`, which sorts below the
 * already-published 0.1.0.
 */
export function gt(a, b) {
  const x = parse(a);
  const y = parse(b);
  for (const k of ['major', 'minor', 'patch']) {
    if (x[k] !== y[k]) return x[k] > y[k];
  }
  if (x.pre === null && y.pre !== null) return true;
  if (x.pre !== null && y.pre === null) return false;
  if (x.pre === null && y.pre === null) return false;
  return x.pre > y.pre; // lexical is enough for our `next.<runid>` shape
}
