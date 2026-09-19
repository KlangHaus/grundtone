#!/usr/bin/env node
/**
 * Runs UNCONDITIONALLY after the changesets step and fails the release when it
 * ended green without publishing and without a declared reason.
 *
 * 🔴 WHY IT IS NOT A CONDITIONAL STEP (riff f9xld6w1). The only existing trace
 * of "nothing published" was `Generate summary` showing as **skipped**, because
 * that step is `if: steps.changesets.outputs.published == 'true'`. A step gated
 * on the flag is silent on exactly the state we want to catch, and `skipped`
 * reads as "the condition was false" rather than as an alarm ([sikkerhed], run
 * 35463452057).
 *
 * Usage from release.yml, with the changesets step's outputs in the env:
 *   PUBLISHED, PUBLISHED_PACKAGES, PULL_REQUEST_NUMBER
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import readChangesets from '@changesets/read';
import {
  emptyChangesetNames,
  releaseOutcome,
} from './lib/release-decision.mjs';
import {
  describeUnpublished,
  unpublishedVersions,
} from './lib/registry-status.mjs';
import {
  assertPlausible,
  globParents,
  workspaceGlobs,
} from './lib/workspace-packages.mjs';

const root = process.cwd();

/**
 * The publishable packages, derived from the workspace globs.
 *
 * 🔴 DERIVED, NOT LISTED (riff KH-1101). This read `packages/` only, while the
 * workspace globs also cover `apps/*` and `apps/playground/*`. A publishable
 * package outside `packages/` would have been invisible to this assertion —
 * and invisible in the direction that matters, since an unpublished version it
 * cannot see reads as "everything is published".
 */
function publishablePackages() {
  const parents = assertPlausible(
    globParents(
      workspaceGlobs(readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8')),
    ),
    2,
    'workspace parents',
  );

  const out = [];
  for (const parent of parents) {
    let entries;
    try {
      entries = readdirSync(join(root, parent));
    } catch {
      continue;
    }
    for (const dir of entries) {
      let pkg;
      try {
        pkg = JSON.parse(
          readFileSync(join(root, parent, dir, 'package.json'), 'utf8'),
        );
      } catch {
        continue; // not a package directory
      }
      if (pkg.private || !pkg.name || !pkg.version) continue;
      out.push({ name: pkg.name, version: pkg.version });
    }
  }
  return assertPlausible(out, 1, 'publishable packages');
}

// Same parser the action uses, so "empty" means what it means in production.
const changesets = await readChangesets(root);
const empty = emptyChangesetNames(
  changesets,
  changesets.map(c => `${c.id}.md`),
);
// 🔴 The cause travels with each entry, so a red job says WHICH event it is:
// "never published" and "registry unreadable" both fail a release and need
// different responses ([sikkerhed], riff KH-1101).
const packages = publishablePackages();
const unpublishedEntries = await unpublishedVersions({ packages });
const unpublished = describeUnpublished(unpublishedEntries);

const outcome = releaseOutcome({
  published: process.env.PUBLISHED,
  publishedPackages: process.env.PUBLISHED_PACKAGES,
  pullRequestNumber: process.env.PULL_REQUEST_NUMBER,
  emptyNames: empty,
  unpublished,
});

// 🔴 THE DENOMINATOR BELONGS IN THE GREEN (riff KH-1101). This line used to
// print the numerator only — "unpublished versions: 0" — which reads the same
// whether the enumeration found nine packages or one. The floor below it is 1,
// so a walk that silently returned a single package would pass AND print an
// identical line. Say how many were checked.
console.log(
  `checked ${packages.length} publishable package(s) · ` +
    `changesets: ${changesets.length} (${empty.length} empty) · ` +
    `unpublished versions: ${unpublished.length}`,
);
console.log(`release outcome: ${outcome.code} — ${outcome.message}`);

if (!outcome.ok) {
  console.error(`::error::release ${outcome.code}: ${outcome.message}`);
  process.exit(1);
}
