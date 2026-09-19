#!/usr/bin/env node
/**
 * The changeset gate: every touched publishable package must either be named
 * by a changeset, or have no touched file that ships to consumers.
 *
 * 🔴 REPLACES a bare `changeset status --since=<base>` (riff f9xld6w1).
 * That command has one way to say "no release needed": an EMPTY changeset —
 * the exact file that makes changesets/action@a45c4d59 return before
 * publishing. The gate and the publish path read `.changeset/` with opposite
 * signs, so the cheapest way past the gate switched releases off. Three
 * instances in this repo (#21/#76, #208).
 *
 * Here the honest answer needs no placeholder: if nothing shipped changed,
 * that is printed as the decision and the gate passes.
 *
 * Usage: node scripts/assert-changeset-decision.mjs [baseRef]
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import readChangesets from '@changesets/read';
import { changesetRequirement } from './lib/changeset-requirement.mjs';

const root = process.cwd();
const base = process.argv[2] ?? 'origin/develop';

const changedFiles = execFileSync(
  'git',
  ['diff', '--name-only', `${base}...HEAD`],
  {
    cwd: root,
    encoding: 'utf8',
  },
)
  .split('\n')
  .filter(Boolean);

function workspacePackages() {
  const out = [];
  for (const parent of ['packages', 'apps']) {
    let entries;
    try {
      entries = readdirSync(join(root, parent));
    } catch {
      continue;
    }
    for (const dir of entries) {
      try {
        const pkg = JSON.parse(
          readFileSync(join(root, parent, dir, 'package.json'), 'utf8'),
        );
        out.push({
          name: pkg.name,
          dir: `${parent}/${dir}`,
          private: Boolean(pkg.private),
        });
      } catch {
        // not a package directory
      }
    }
  }
  return out;
}

const changesets = await readChangesets(root);
const releasedPackages = [
  ...new Set(changesets.flatMap(c => c.releases.map(r => r.name))),
];

// 🔴 An empty changeset is not an answer here either: it names no package, so
// it satisfies nothing below, and assert-release-published.mjs fails the
// release if one ever reaches the default branch.
const empty = changesets
  .filter(c => c.releases.length === 0)
  .map(c => `${c.id}.md`);
if (empty.length > 0) {
  console.error(
    `::error::${empty.join(', ')} declare no releases. An empty changeset switches publishing ` +
      'off on the default branch; delete it. If nothing ships, this gate says so on its own.',
  );
  process.exit(1);
}

const { ok, decisions } = changesetRequirement({
  changedFiles,
  packages: workspacePackages(),
  releasedPackages,
});

if (decisions.length === 0) {
  console.log(`changeset gate: no publishable package touched vs ${base}`);
  process.exit(0);
}

for (const d of decisions) {
  const mark = d.status === 'needs-changeset' ? '✗' : '✓';
  console.log(`${mark} ${d.name}: ${d.status} — ${d.reason}`);
}

if (!ok) {
  console.error(
    '::error::a touched package ships files to consumers without a changeset. Run `pnpm changeset` ' +
      'and describe the change; do not add an empty changeset.',
  );
  process.exit(1);
}
