#!/usr/bin/env node
// Guard: exactly one VERSION of vue is installed (KH-1221).
//
// A plain script, not only a vitest cell, so CI can run it right after install
// without a build — the same shape as assert-changeset-decision.mjs. The
// decision and its cells live in scripts/lib/single-copy.mjs.
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { installedCopies, checkSingleVersion } from './lib/single-copy.mjs';

// 🔴 The packages this guard watches, and why each one is here. A framework
// with module-level state breaks when loaded twice; a leaf utility does not.
// Adding a name here is a claim that two instances of it would be a defect.
const WATCHED = ['vue'];

function main() {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
  let failed = false;

  for (const name of WATCHED) {
    const copies = installedCopies(root, name);
    const result = checkSingleVersion(copies, name);

    // The denominator in every outcome, green or red: a guard that does not say
    // what it scanned cannot be told apart from one that scanned nothing.
    console.log(
      `single-copy: ${name} — ${copies.length} copy/copies found under node_modules, ` +
        `${result.versions.length} distinct version(s)`,
    );

    if (!result.ok) {
      console.error(`✗ ${result.reason}`);
      for (const c of copies) console.error(`    ${c.version}  ${c.path}`);
      failed = true;
    } else {
      console.log(`✓ ${result.reason}`);
    }
  }

  if (failed) process.exit(1);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main();
