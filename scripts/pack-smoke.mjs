#!/usr/bin/env node
/**
 * C8 — artifact proof for the npm packages this repo publishes.
 *
 * ── Why it exists ───────────────────────────────────────────────────────────
 * Building inside the monorepo only proves TypeScript can see the files. It
 * says nothing about whether a CONSUMER can install the package and resolve its
 * entry points: a wrong `exports`, a path missing from `files`, or a dist file
 * that never made it into the tarball are caught only here.
 *
 * ── Two things that make the test real, and are easy to get wrong ───────────
 *
 * 1. THE SMOKE PROJECT LIVES OUTSIDE THE WORKSPACE. Install inside the monorepo
 *    and pnpm resolves through workspace links, proving nothing — the same trap
 *    as building an image locally and calling it proof of a deploy.
 *
 * 2. 🔴 SIBLING DEPS MUST POINT AT THE LOCAL TARBALLS. `pnpm pack` rewrites
 *    `workspace:*` to a version number (measured: utils' dep became
 *    `"@grundtone/core": "2.23.0"`). Without overrides the install would fetch
 *    core from npm — and npm had 2.22.0, not 2.23.0. Either it fails for the
 *    wrong reason, or, the day the versions line up, **it passes against the
 *    PUBLISHED code instead of the code we just packed.** That would be a green
 *    test measuring the wrong artifact.
 *
 * Usage:  node scripts/pack-smoke.mjs
 *         KEEP=1 node scripts/pack-smoke.mjs   (keep the smoke project)
 */
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

/** The packages actually published — derived, not hand-maintained. */
function publishablePackages() {
  return readdirSync(join(ROOT, 'packages'))
    .map(dir => {
      try {
        const pkg = JSON.parse(
          readFileSync(join(ROOT, 'packages', dir, 'package.json'), 'utf8'),
        );
        return pkg.private === true
          ? null
          : { dir, name: pkg.name, version: pkg.version, pkg };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const packages = publishablePackages();
console.log(`packages published: ${packages.length}\n`);

const work = mkdtempSync(join(tmpdir(), 'pack-smoke-'));
const tgzDir = join(work, 'tarballs');
const proj = join(work, 'consumer');
mkdirSync(tgzDir, { recursive: true });
mkdirSync(proj, { recursive: true });

// ── 1. pack ─────────────────────────────────────────────────────────────────
const tarballs = {};
for (const p of packages) {
  run(
    'pnpm',
    ['pack', '--pack-destination', tgzDir],
    join(ROOT, 'packages', p.dir),
  );
  const file = readdirSync(tgzDir).find(
    f => f === `${p.name.replace('@', '').replace('/', '-')}-${p.version}.tgz`,
  );
  if (!file) {
    console.error(
      `::error::could not find a tarball for ${p.name}@${p.version} in ${tgzDir}`,
    );
    process.exit(1);
  }
  tarballs[p.name] = join(tgzDir, file);
  console.log(`  packed  ${p.name}@${p.version}`);
}

// ── 2. consumer project OUTSIDE the workspace ───────────────────────────────
// `overrides` forces EVERY @grundtone dependency — transitive ones included —
// to the local tarball. Without it the install would fetch siblings from npm.
writeFileSync(
  join(proj, 'package.json'),
  JSON.stringify(
    {
      name: 'grundtone-pack-smoke',
      private: true,
      version: '0.0.0',
      type: 'module',
      dependencies: Object.fromEntries(
        packages.map(p => [p.name, `file:${tarballs[p.name]}`]),
      ),
      overrides: Object.fromEntries(
        packages.map(p => [p.name, `file:${tarballs[p.name]}`]),
      ),
    },
    null,
    2,
  ),
);

console.log(
  '\ninstalling from tarballs into an empty project outside the workspace…',
);
try {
  run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error'], proj);
} catch (err) {
  console.error(
    '::error::installing from the tarballs failed — a consumer cannot install these packages',
  );
  console.error(String(err.stdout ?? '') + String(err.stderr ?? ''));
  process.exit(1);
}
console.log('install ok\n');

// ── 3. resolve EVERY declared entry — AND confirm the file exists ───────────
// We resolve rather than import: several packages have a runtime `import
// './x.css'` (grundtone#43) that Node cannot load, so an import would fail on a
// KNOWN defect instead of on what this gate measures.
//
// 🔴 TWO resolvers, and the difference is load-bearing — measured on this
// codebase:
//   · `require.resolve` checks existence but FAILS on ESM-only exports
//     (@grundtone/nuxt has `import` without `require` — correct for a Nuxt
//     module, a false positive in the gate)
//   · `import.meta.resolve` understands ESM-only but does NOT check existence
//     (design-system/branding "resolved" to a dist file that does not exist)
// Each one alone gives a wrong answer, in opposite directions. So we use
// import.meta.resolve to MAP spec -> path, and then stat the file ourselves.
function entriesFor(pkg) {
  const out = new Set(['.']);
  if (pkg.exports && typeof pkg.exports === 'object') {
    for (const key of Object.keys(pkg.exports)) {
      if (key.startsWith('.') && !key.includes('*')) out.add(key);
    }
  }
  return [...out];
}

const specs = packages.flatMap(p =>
  entriesFor(p.pkg).map(e => (e === '.' ? p.name : `${p.name}/${e.slice(2)}`)),
);

writeFileSync(
  join(proj, 'probe.mjs'),
  `import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const ok = [], bad = [];
for (const spec of ${JSON.stringify(specs)}) {
  try {
    const url = import.meta.resolve(spec);
    const path = fileURLToPath(url);
    if (existsSync(path)) ok.push(spec);
    else bad.push([spec, 'RESOLVES BUT THE FILE IS MISSING: ' + path.split('node_modules/')[1]]);
  } catch (e) {
    bad.push([spec, e.code ?? e.message]);
  }
}
console.log(JSON.stringify({ ok, bad }));
`,
);

const result = JSON.parse(run('node', ['probe.mjs'], proj));
for (const spec of result.ok) console.log(`  ✔ resolver  ${spec}`);
for (const [spec, why] of result.bad)
  console.log(`  ✗ FAILS     ${spec}  (${why})`);

// ── 4. every url() in an exported CSS file must exist in the INSTALLED package
// A broken font or image url fails silently in a browser: the fallback font
// renders and nothing reports it. Checked on the tarball contents, so a file
// missing from `files` is caught here. design-system's fonts.css must contain
// its IBM Plex @font-face urls, so the check cannot pass on an empty count.
// No exported CSS may carry a large inline blob either: Vite library mode turns
// url() assets into base64, and fonts in design-system's index.css landed as
// ~140 kB inside @grundtone/vue's CSS (grundtone#205).
//
// 🔴 The rule lives in scripts/lib/css-assets.mjs and is EMBEDDED here rather
// than reimplemented: the probe runs inside the smoke project, which cannot
// import from this repo, and a second copy of the rule is a second thing to
// forget. Its cells own the mutants (riff KH-1055) — in particular a font
// inlined as `application/octet-stream`, which the MIME-matching predecessor
// of this rule let through.
const cssAssetsRule = readFileSync(
  new URL('./lib/css-assets.mjs', import.meta.url),
  'utf8',
);
writeFileSync(
  join(proj, 'css-urls.mjs'),
  `import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
${cssAssetsRule}
const out = { checked: {}, missing: [], inlined: {}, inlineSeen: 0 };
for (const spec of ${JSON.stringify(specs)}) {
  let path;
  try { path = fileURLToPath(import.meta.resolve(spec)); } catch { continue; }
  if (!path.endsWith('.css') || !existsSync(path)) continue;
  const css = readFileSync(path, 'utf8');
  out.inlineSeen += dataUrls(css).length;
  const offending = offendingInlineAssets(css);
  if (offending.length) out.inlined[spec] = offending;
  const urls = [...css.matchAll(/url\\(\\s*(['"]?)([^'")]+)\\1\\s*\\)/g)]
    .map(m => m[2])
    .filter(u => !/^(data:|https?:|#)/.test(u));
  out.checked[spec] = urls.length;
  for (const u of urls) {
    const target = resolve(dirname(path), u.split(/[?#]/)[0]);
    if (!existsSync(target)) out.missing.push([spec, u]);
  }
}
console.log(JSON.stringify(out));
`,
);
const cssUrls = JSON.parse(run('node', ['css-urls.mjs'], proj));
for (const [spec, n] of Object.entries(cssUrls.checked))
  console.log(`  ✔ css urls  ${spec}  (${n})`);
// A green here should say what it looked at, not just that it found nothing.
console.log(
  `  ✔ inline    ${cssUrls.inlineSeen} data: url(s) across ${Object.keys(cssUrls.checked).length} css file(s)`,
);
for (const [spec, u] of cssUrls.missing)
  console.log(`  ✗ MISSING   ${spec}  ${u}`);
for (const [spec, entries] of Object.entries(cssUrls.inlined))
  for (const entry of entries)
    console.log(`  ✗ INLINED   ${spec}  ${entry.reason}`);
const fontUrls = cssUrls.checked['@grundtone/design-system/fonts.css'] ?? 0;
if (fontUrls < 7) {
  console.error(
    `::error::@grundtone/design-system/fonts.css has ${fontUrls} file url(s), expected at least 7 (IBM Plex @font-face)`,
  );
  process.exit(1);
}
if (Object.keys(cssUrls.inlined).length) {
  console.error(
    '::error::a published CSS file carries an inline data: blob instead of a file',
  );
  process.exit(1);
}
if (cssUrls.missing.length) {
  console.error(
    '::error::at least one url() in a published CSS file points at a file the package does not contain',
  );
  process.exit(1);
}

if (!process.env.KEEP) rmSync(work, { recursive: true, force: true });
else console.log(`\nsmoke project kept: ${proj}`);

console.log(
  `\n${result.ok.length} entry points resolve · ${result.bad.length} fail`,
);
if (result.bad.length) {
  console.error(
    '::error::at least one entry point cannot be resolved by a consumer',
  );
  process.exit(1);
}
