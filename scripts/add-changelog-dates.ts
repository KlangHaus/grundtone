#!/usr/bin/env npx tsx
/**
 * Post-processes CHANGELOG.md files to add today's date to version headers
 * that are missing one.
 *
 * Run automatically via the `version-packages` script after `changeset version`.
 *
 * Format: `## 1.2.3` → `## 1.2.3 - 2026-03-04`
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const packagesDir = resolve(root, 'packages');
const today = new Date().toISOString().slice(0, 10);

let updated = 0;

for (const pkg of readdirSync(packagesDir)) {
  const changelog = resolve(packagesDir, pkg, 'CHANGELOG.md');
  if (!existsSync(changelog)) continue;

  const content = readFileSync(changelog, 'utf-8');

  // Match `## X.Y.Z` headers without a date suffix
  const patched = content.replace(
    /^(## \d+\.\d+\.\d+(?:-[^\s]+)?)(?!\s+-\s+\d{4}-\d{2}-\d{2})$/gm,
    `$1 - ${today}`,
  );

  if (patched !== content) {
    writeFileSync(changelog, patched);
    updated++;
    console.log(`  ✓ ${pkg}/CHANGELOG.md`);
  }
}

if (updated) {
  console.log(`\nAdded dates to ${updated} changelog(s).`);
} else {
  console.log('All changelogs already have dates.');
}
