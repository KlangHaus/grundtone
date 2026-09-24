#!/usr/bin/env node
/**
 * Gate: every published package ships the licence text it declares.
 *
 * ORCHESTRATION ONLY — the decision lives in scripts/lib/license-shipped.mjs,
 * per this repo's cut between decision and orchestration. This file resolves
 * the root, prints, and picks exit codes.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { licenceProblems } from './lib/license-shipped.mjs';

// Same shape as DTS_GUARD_ROOT: an override so cells can aim the real script at
// a throwaway workspace.
const ROOT =
  process.env.LICENSE_GUARD_ROOT ??
  resolve(fileURLToPath(new URL('..', import.meta.url)));

function main() {
  const { packages, problems, licence } = licenceProblems(ROOT);

  // The denominator, always: a green that does not say what it walked cannot be
  // told apart from a green that walked nothing.
  console.log(
    `license: ${packages.length} published package(s) checked against the root LICENSE ` +
      `(${licence.split('\n')[0]})`,
  );
  if (packages.length === 0) {
    console.error(
      '✗ no published packages found — the scan collapsed, so this green would mean nothing',
    );
    process.exit(2);
  }
  if (problems.length > 0) {
    for (const p of problems) console.error(`✗ ${p}`);
    process.exit(1);
  }
  console.log('✓ every published package ships the licence text it declares');
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main();
