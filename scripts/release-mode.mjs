#!/usr/bin/env node
/**
 * Writes `gates=run|skip` to `$GITHUB_OUTPUT` for the Release workflow
 * (riff fklbe0cwm8fth7c9jj1tx3ca). The decision lives in
 * scripts/lib/release-mode.mjs; this file only reads the repository the same
 * way `changesets/action` does and reports.
 *
 * Every failure exits 1 before anything is written, so the workflow never sees
 * a missing value it could read as "skip".
 *
 * Usage (from the repository root): node scripts/release-mode.mjs
 */
import { appendFileSync } from 'node:fs';

import readModule from '@changesets/read';
import { readPreState } from '@changesets/pre';

import { releaseMode } from './lib/release-mode.mjs';

const root = process.cwd();

try {
  const output = process.env.GITHUB_OUTPUT;
  if (!output) {
    throw new Error(
      'GITHUB_OUTPUT is not set, so the decision cannot reach the workflow',
    );
  }
  const read = readModule.default ?? readModule;
  const mode = releaseMode({
    changesets: await read(root),
    preState: await readPreState(root),
  });

  if (mode.gates === 'skip') {
    console.log(
      `::notice title=Publish gates skipped::${mode.reason} (${mode.pending.join(', ')}). ` +
        'The downgrade, vuln and invariant gates run in the run that publishes.',
    );
  } else {
    console.log(
      `Publish gates run: ${mode.reason}. Every gate must pass before changesets publishes.`,
    );
  }
  appendFileSync(output, `gates=${mode.gates}\n`);
} catch (err) {
  console.error(
    `::error title=Release mode undetermined::${err.message}. ` +
      'Failing closed: this run opens no Version PR and publishes nothing.',
  );
  process.exit(1);
}
