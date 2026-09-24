#!/usr/bin/env node
/**
 * Copies the root LICENSE into every published package, so the tarball npm
 * builds carries the licence text and not just the metadata field.
 *
 * One source, N copies: the copies exist because npm does not reach up to a
 * monorepo root, and they are kept honest by scripts/assert-license-shipped.mjs,
 * which compares bytes and fails on drift. Edit LICENSE, run this, commit.
 */
import { copyFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishedPackages } from './assert-license-shipped.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = join(ROOT, 'LICENSE');

const packages = publishedPackages(ROOT);
for (const pkg of packages) {
  copyFileSync(source, join(pkg.dir, 'LICENSE'));
  console.log(`  ${pkg.name} → ${relative(ROOT, join(pkg.dir, 'LICENSE'))}`);
}
console.log(
  `license:sync: ${packages.length} published package(s) updated from ./LICENSE`,
);
