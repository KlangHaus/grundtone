import { byName } from './order.mjs';

/**
 * Minimal SemVer "strictly greater than" — the comparison the version-drift
 * gate depends on. Its own module so the gate and its tests share ONE
 * definition instead of a copy that can drift.
 *
 * Deliberately not `semver` from npm: this runs in a CI step that does no
 * install, so it must have zero dependencies.
 */

/**
 * Parse a SemVer core (major.minor.patch) plus optional prerelease.
 *
 * Build metadata is stripped: SemVer §10 says it is ignored when determining
 * precedence, so `1.0.0+a` and `1.0.0+b` are the same version. Anything else
 * unparseable THROWS rather than returning a default — a gate that cannot read
 * a version must stop, not guess a comparison.
 */
export function parse(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-([^+]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(v);
  if (!m) throw new Error(`unparseable version: ${v}`);
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null };
}

/**
 * Compare two prerelease strings per SemVer §11: dot-separated identifiers,
 * compared left to right; all-numeric identifiers compare NUMERICALLY, numeric
 * ranks below alphanumeric, and a longer identifier list wins when all the
 * shared ones are equal.
 *
 * 🔴 This used to be a plain `a > b` string comparison, with a comment saying
 * lexical was "enough for our `next.<runid>` shape". Measured 2026-08-20 — it
 * is not: `next.10` sorts BELOW `next.9` as strings, so the comparison was
 * inverted for every run number that grew a digit. It happens not to be
 * reachable today, because nothing compares two prereleases to each other; the
 * bug was waiting for the first caller that did.
 */
const NUMERIC = /^\d+$/;

/** Ét prerelease-led, sammenlignet efter SemVer §11. */
function compareIdentifier(a, b) {
  const numA = NUMERIC.test(a);
  const numB = NUMERIC.test(b);
  if (numA && numB) return Number(a) - Number(b);
  if (numA) return -1;
  if (numB) return 1;
  return byName(a, b);
}

function comparePre(a, b) {
  const A = a.split('.');
  const B = b.split('.');
  for (let i = 0; i < Math.max(A.length, B.length); i += 1) {
    if (A[i] === undefined) return -1;
    if (B[i] === undefined) return 1;
    const order = compareIdentifier(A[i], B[i]);
    if (order !== 0) return order;
  }
  return 0;
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
  return comparePre(x.pre, y.pre) > 0;
}
