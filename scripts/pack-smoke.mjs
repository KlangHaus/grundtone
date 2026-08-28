#!/usr/bin/env node
/**
 * C8 — artefakt-bevis for de npm-pakker repoet udgiver.
 *
 * ── Hvorfor den findes ──────────────────────────────────────────────────────
 * At bygge i monorepoet beviser kun, at TypeScript kan se filerne. Det siger
 * intet om, hvorvidt en FORBRUGER kan installere pakken og resolve dens
 * entry-points: forkert `exports`, en manglende sti i `files`, eller en
 * dist-fil der aldrig kom med i tarballen, fanges kun her.
 *
 * ── To ting der goer testen aegte, og som er lette at faa forkert ───────────
 *
 * 1. SMOKE-PROJEKTET LIGGER UDEN FOR WORKSPACET. Installerer man i monorepoet,
 *    resolver pnpm via workspace-links og beviser ingenting — samme faelde som
 *    at bygge et image lokalt og kalde det et deploy-bevis.
 *
 * 2. 🔴 SOESKENDE-DEPS SKAL PEGE PAA DE LOKALE TARBALLS. `pnpm pack` omskriver
 *    `workspace:*` til et versionsnummer (maalt: utils' dep blev
 *    `"@grundtone/core": "2.23.0"`). Uden overrides ville installen hente
 *    core fra NPM — og npm har 2.22.0, ikke 2.23.0. Enten fejler den paa den
 *    forkerte grund, eller, den dag versionerne flugter, **bestaar den mod
 *    den UDGIVNE kode i stedet for den vi lige pakkede.** Det ville vaere en
 *    groen test der maaler det forkerte artefakt.
 *
 * Brug:  node scripts/pack-smoke.mjs
 *        KEEP=1 node scripts/pack-smoke.mjs   (behold smoke-projektet)
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

/** Pakker der faktisk udgives — udledt, ikke haandholdt. */
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
console.log(`pakker der udgives: ${packages.length}\n`);

const work = mkdtempSync(join(tmpdir(), 'pack-smoke-'));
const tgzDir = join(work, 'tarballs');
const proj = join(work, 'consumer');
mkdirSync(tgzDir, { recursive: true });
mkdirSync(proj, { recursive: true });

// ── 1. pak ──────────────────────────────────────────────────────────────────
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
      `::error::kunne ikke finde tarball for ${p.name}@${p.version} i ${tgzDir}`,
    );
    process.exit(1);
  }
  tarballs[p.name] = join(tgzDir, file);
  console.log(`  pakket  ${p.name}@${p.version}`);
}

// ── 2. forbruger-projekt UDEN FOR workspacet ────────────────────────────────
// `overrides` tvinger ENHVER @grundtone-afhaengighed — ogsaa transitive — til
// den lokale tarball. Uden den ville installen hente soeskende fra npm.
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
  '\ninstallerer fra tarballs i et tomt projekt uden for workspacet…',
);
try {
  run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error'], proj);
} catch (err) {
  console.error(
    '::error::install fra tarballs fejlede — pakkerne kan ikke installeres af en forbruger',
  );
  console.error(String(err.stdout ?? '') + String(err.stderr ?? ''));
  process.exit(1);
}
console.log('install ok\n');

// ── 3. resolve HVER deklareret entry — OG bekraeft at filen findes ─────────
// Vi resolver frem for at importere: flere pakker har runtime `import
// './x.css'` (grundtone#43), som Node ikke kan loade, saa en import ville
// fejle paa en KENDT defekt frem for paa det denne gate maaler.
//
// 🔴 TO resolvere, og forskellen er baerende — maalt paa denne kodebase:
//   · `require.resolve` tjekker eksistens, men FEJLER paa ESM-only exports
//     (@grundtone/nuxt har `import` uden `require` — korrekt for et
//     Nuxt-modul, falsk positiv i gaten)
//   · `import.meta.resolve` forstaar ESM-only, men tjekker IKKE eksistens
//     (design-system/branding "resolvede" til en dist-fil der ikke findes)
// Hver af dem alene giver altsaa et forkert svar i hver sin retning. Vi
// bruger import.meta.resolve til at MAPPE spec -> sti, og statter derefter
// filen selv.
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
    else bad.push([spec, 'RESOLVER MEN FILEN FINDES IKKE: ' + path.split('node_modules/')[1]]);
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
  console.log(`  ✗ FEJLER    ${spec}  (${why})`);

if (!process.env.KEEP) rmSync(work, { recursive: true, force: true });
else console.log(`\nsmoke-projekt beholdt: ${proj}`);

console.log(
  `\n${result.ok.length} entry-points resolver · ${result.bad.length} fejler`,
);
if (result.bad.length) {
  console.error(
    '::error::mindst ét entry-point kan ikke resolves af en forbruger',
  );
  process.exit(1);
}
