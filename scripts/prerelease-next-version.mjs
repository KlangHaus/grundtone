#!/usr/bin/env node
/**
 * Stamp the @grundtone/vue consumer graph to a `<base>-next.<id>` prerelease
 * version for the `next` npm channel.
 *
 * Approach (b), ruled by [infra]/CTO: publish from develop under the `next`
 * dist-tag WITHOUT changesets — so it never touches the frozen `latest` and
 * never trips the "Guard frozen 2.x packages" CI guard (which only evaluates
 * changesets; this path has none). The main/develop reconciliation stays the
 * clean long-term fix; `next` is the interim channel.
 *
 * pnpm rewrites `workspace:*` deps to the stamped version at publish time, so
 * the published graph is self-consistent (@grundtone/vue@x-next.N depends on
 * @grundtone/core@2.1.0-next.N, etc.).
 *
 * Usage: node scripts/prerelease-next-version.mjs <id>   (id = CI run number or short sha)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { baseVersion } from './lib/semver-gt.mjs';

const id = process.argv[2] ?? process.env.PRERELEASE_ID;
if (!id || !/^[A-Za-z0-9.]+$/.test(id)) {
  console.error(
    'usage: prerelease-next-version <id>  (alphanumeric, e.g. a run number or short git sha)',
  );
  process.exit(1);
}

// The graph consumers (studio/etude/resonans/backstage) need for the new
// components. @grundtone/email + react-native keep their own release cadence
// and are intentionally excluded from the component `next` channel.
const PACKAGE_DIRS = [
  'core',
  'utils',
  'icons',
  'design-system',
  'vue',
  'nuxt',
  'mcp',
];

for (const dir of PACKAGE_DIRS) {
  const pkgPath = join('packages', dir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const base = baseVersion(pkg.version);
  pkg.version = `${base}-next.${id}`;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.error(`${pkg.name} → ${pkg.version}`);
}
