#!/usr/bin/env node
// CLI shell around scripts/lib/error-page.mjs. The rule lives in the lib so it
// can be exercised cell by cell; this file reads the filesystem and turns the
// result into an exit code. Same split as assert-flade-metadata.mjs, and for
// the same measured reason: under vitest a module is imported in a worker, so
// a file that both decides AND calls process.exit takes the suite down with it.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { errorPageInBuild } from './lib/error-page.mjs';

const root = process.argv[2] ?? 'apps/web/.output/public';
const fallback = join(root, '404.html');

if (!existsSync(fallback)) {
  console.error(`✗ ${fallback} does not exist — generate apps/web first.`);
  process.exit(1);
}

const bundleDir = join(root, '_nuxt');
const bundleSources = existsSync(bundleDir)
  ? readdirSync(bundleDir)
      .filter(name => name.endsWith('.js'))
      .map(name => readFileSync(join(bundleDir, name), 'utf8'))
  : [];

// 🔴 BOTH MARKERS WERE TESTED AGAINST THE MUTANT BUILD, and the first one I
// picked failed that test. With apps/web/error.vue removed and the site rebuilt:
//
//   error-page                 -> present in 1 bundle   (Nuxt's OWN error page
//                                 uses the same class: armed against nothing)
//   error-page__illustration   -> absent
//   This page is off the staff -> absent
//   Back to the front page     -> absent
//
// So `error-page` was dropped. What remains is one string the app supplies
// (proving error.vue is built) and one BEM element only GTErrorPage emits
// (proving the page still renders through the design system, without coupling
// the guard to more copy than necessary).
const { ok, problems, checked } = errorPageInBuild({
  fallbackHtml: readFileSync(fallback, 'utf8'),
  bundleSources,
  markers: ['This page is off the staff', 'error-page__illustration'],
});

console.log(
  `error page: read ${checked} emitted bundle(s) in ${bundleDir}; ` +
    '404.html is a client shell, so the page is checked in the JS, not in the HTML',
);
for (const problem of problems) console.error(`  ✗ ${problem}`);

if (!ok) {
  console.error(
    '::error::the generated site no longer ships its error page — an unknown path would render an empty shell',
  );
  process.exit(1);
}
console.log('✓ the generated site ships its error page');
