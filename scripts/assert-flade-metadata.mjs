#!/usr/bin/env node
// CLI-skal om `scripts/lib/flade-metadata.mjs`. Logikken bor i lib'et, saa
// den kan importeres og proeves regel for regel; denne fil laeser
// filsystemet og oversaetter resultatet til exit-koder.
//
// 🔴 Adskillelsen er ikke pynt, og en `invokedDirectly`-guard var ikke nok:
// under vitest importeres et modul i en worker, og guarden holdt ikke — hele
// kontrollen koerte og kaldte process.exit midt i testsuiten. To filer er
// utvetydige dér hvor en betingelse ikke var det. Huset bruger allerede
// moensteret (`scripts/lib/*.mjs` + `.test.mjs`).

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { checkFladeMetadata } from './lib/flade-metadata.mjs';

const root = process.argv[2] ?? 'apps/web/.output/public';

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

if (!existsSync(root)) {
  console.error(`✗ ${root} findes ikke — byg apps/web foer denne kontrol.`);
  process.exit(1);
}

const files = htmlFiles(root).map(f => ({
  rel: relative(root, f),
  html: readFileSync(f, 'utf8'),
}));

const { errors, routes, fallbacks } = checkFladeMetadata(files, path =>
  existsSync(join(root, path)),
);

if (errors.length) {
  console.error(`✗ flade-metadata: ${errors.length} problem(er)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ flade-metadata: ${routes} ruter kontrolleret (canonical, og:url, og/twitter-par), ` +
    `${fallbacks} fallback-sider uden canonical.`,
);
