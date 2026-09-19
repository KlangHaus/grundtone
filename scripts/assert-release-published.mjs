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

const root = process.cwd();

/**
 * Versions this repo would publish that the registry does not have.
 *
 * 🔴 Asked of the REGISTRY, not of `npm view`: measured 2026-09-19, the CLI
 * answered `2.22.0` and "not found" for minutes after
 * `@grundtone/react-native@3.0.0` was published, because it serves a local
 * cache. Reporting on that answer would have called a successful publish a
 * failure.
 */
async function unpublishedVersions() {
  const out = [];
  const packagesDir = join(root, 'packages');
  for (const dir of readdirSync(packagesDir)) {
    let pkg;
    try {
      pkg = JSON.parse(
        readFileSync(join(packagesDir, dir, 'package.json'), 'utf8'),
      );
    } catch {
      continue; // not a package directory
    }
    if (pkg.private || !pkg.name || !pkg.version) continue;

    const url = `https://registry.npmjs.org/${pkg.name.replace('/', '%2f')}`;
    try {
      const res = await fetch(url, { headers: { accept: 'application/json' } });
      if (res.status === 404) {
        out.push(`${pkg.name}@${pkg.version}`); // never published at all
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const doc = await res.json();
      if (!doc.versions?.[pkg.version]) out.push(`${pkg.name}@${pkg.version}`);
    } catch (err) {
      // 🔴 A registry we could not read is not "everything is published".
      // Fail loudly rather than let an outage look like a clean release.
      out.push(
        `${pkg.name}@${pkg.version} (registry unreadable: ${err.message})`,
      );
    }
  }
  return out.sort();
}

// Same parser the action uses, so "empty" means what it means in production.
const changesets = await readChangesets(root);
const empty = emptyChangesetNames(
  changesets,
  changesets.map(c => `${c.id}.md`),
);
const unpublished = await unpublishedVersions();

const outcome = releaseOutcome({
  published: process.env.PUBLISHED,
  publishedPackages: process.env.PUBLISHED_PACKAGES,
  pullRequestNumber: process.env.PULL_REQUEST_NUMBER,
  emptyNames: empty,
  unpublished,
});

console.log(
  `changesets: ${changesets.length} (${empty.length} empty) · ` +
    `unpublished versions: ${unpublished.length}`,
);
console.log(`release outcome: ${outcome.code} — ${outcome.message}`);

if (!outcome.ok) {
  console.error(`::error::release ${outcome.code}: ${outcome.message}`);
  process.exit(1);
}
