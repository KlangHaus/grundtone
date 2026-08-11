#!/usr/bin/env node
/**
 * Gate: every package in the `next` channel must be STRICTLY AHEAD of what is
 * already on npm's `latest` tag.
 *
 * ── Why this exists ─────────────────────────────────────────────────────────
 * The `next` channel stamps `<develop version>-next.<id>`. That silently
 * assumed develop was ahead of what we had released. It was not: releases are
 * cut from main/frozen-2.x and never flow back, so develop drifted BEHIND.
 * On 2026-08-05 all seven packages were behind or equal — e.g. vue was 2.15.0
 * on develop while `latest` was 2.23.3, so `next` would have published
 * 2.15.0-next.N: a channel claiming to be OLDER code than `latest`, while
 * actually containing the newer components. npm unpublish is 72h and
 * discouraged, so that mistake would have been permanent.
 *
 * Only an EOTP failure on the publish token stopped it from shipping. This
 * gate replaces that luck.
 *
 * ── Two subtleties worth keeping ────────────────────────────────────────────
 * 1. STRICTLY greater, not "not lower". @grundtone/mcp was 0.1.0 on develop
 *    AND 0.1.0 on npm. A "is develop behind?" check passes that — but
 *    `0.1.0-next.5` sorts BELOW its own released `0.1.0` (SemVer §11: a
 *    prerelease has lower precedence than the normal version), so `next`
 *    would again have been behind `latest`. Equality is a failure here.
 * 2. The version is read from git, not from the registry. The rejected
 *    alternative was stamping from npm `latest` — that works, but it
 *    COMPENSATES for the divergence instead of fixing it: develop's
 *    package.json would stay wrong and nobody would notice, because publish
 *    quietly corrected it at the last step. We would have swapped a visible
 *    fault for an invisible one.
 *
 * ── Where this runs ─────────────────────────────────────────────────────────
 * Both places, and both are needed:
 *   · on develop PRs      — so drift is caught when it appears
 *   · in prerelease-next, BEFORE publish — so a bypassed PR check cannot
 *                           reach the registry. That is the step that cannot
 *                           be undone.
 *
 * Usage: node scripts/assert-develop-ahead-of-latest.mjs
 *        NPM_DIST_TAG=next node scripts/... (compare against another tag)
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gt } from './lib/semver-gt.mjs';
import { lookupPublished } from './lib/npm-dist-tag.mjs';

// Keep in sync with PACKAGE_DIRS in prerelease-next-version.mjs — same channel.
const PACKAGE_DIRS = [
  'core',
  'utils',
  'icons',
  'design-system',
  'vue',
  'nuxt',
  'mcp',
];
const TAG = process.env.NPM_DIST_TAG ?? 'latest';

const failures = [];
const rows = [];

for (const dir of PACKAGE_DIRS) {
  const pkg = JSON.parse(
    readFileSync(join('packages', dir, 'package.json'), 'utf8'),
  );
  const local = pkg.version;
  // Kaster ved et opslag der ikke lykkedes — se lib/npm-dist-tag.mjs. Et
  // registry-udfald må ikke kunne gøre denne gate grøn.
  const result = lookupPublished(pkg.name, TAG);

  if (result.state === 'unpublished') {
    rows.push([pkg.name, local, '(unpublished)', 'ok']);
    continue;
  }
  const ok = gt(local, result.version);
  rows.push([pkg.name, local, result.version, ok ? 'ok' : 'BEHIND']);
  if (!ok) failures.push({ name: pkg.name, local, published: result.version });
}

const w = i => Math.max(...rows.map(r => r[i].length));
const [w0, w1, w2] = [w(0), w(1), w(2)];
console.log(
  `${'package'.padEnd(w0)}  ${'develop'.padEnd(w1)}  ${TAG.padEnd(w2)}  status`,
);
for (const r of rows) {
  console.log(
    `${r[0].padEnd(w0)}  ${r[1].padEnd(w1)}  ${r[2].padEnd(w2)}  ${r[3]}`,
  );
}

if (failures.length === 0) {
  console.log(`\nAll ${PACKAGE_DIRS.length} packages are ahead of \`${TAG}\`.`);
  process.exit(0);
}

console.error(
  `\n${failures.length} package(s) are not strictly ahead of \`${TAG}\`:\n` +
    failures
      .map(f => `  ${f.name}: develop ${f.local} <= ${TAG} ${f.published}`)
      .join('\n') +
    `\n
The \`next\` channel stamps <develop version>-next.<id>, so publishing now
would put \`next\` at or below \`latest\` — a prerelease that claims to be
older code than what is already released. npm unpublish is 72 hours and
discouraged, so this is not recoverable after the fact.

Fix: raise the version in each package.json above its published \`${TAG}\`
(next MINOR if develop carries new features). Do not "fix" this by stamping
from the registry instead — that hides the drift rather than resolving it.\n`,
);
process.exit(1);
