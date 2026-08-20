#!/usr/bin/env node
/**
 * Nægter et publish der ville FJERNE offentlige eksporter uden at nogen har
 * erklæret det.
 *
 * 🔴 Hvorfor den ikke er dækket af version-drift-gaten ved siden af:
 * dén asserterer at develop er NYERE end npm's `latest`. Den er grøn så
 * længe 2.24.0 > 2.23.3 — uanset hvad de to versioner INDEHOLDER. Målt
 * 2026-08-19 på @grundtone/vue: den udgivne 2.23.3 (fra main-æraen)
 * eksporterer 20 navne som develops 2.24.0 ikke har — GTFooter, GTHeader,
 * GTMasonry, hele theme-typefladen og `createTheme`/`iconRegistry`. Et
 * publish fra develop ville altså slette 20 offentlige API-punkter og levere
 * det som en minor bump, MENS drift-gaten sagde ja.
 *
 * En gate der måler rækkefølge kan ikke se et tab. Denne måler mængden.
 *
 * Bevidste fjernelser er lovlige — de skal bare ERKLÆRES i
 * `.api-removals.json` ({"@grundtone/vue": ["GTFoo"]}). Forskellen på en
 * beslutning og et uheld er at nogen skrev den ned.
 *
 * 🔴 Begge sider måles på den BYGGEDE .d.ts, aldrig på src/index.ts.
 * Første udgave sammenlignede udgivet .d.ts mod kilde-index, og rapporterede
 * 47 tabte eksporter i core og 64 i utils — alle falske: pakkerne bruger
 * `export * from './x'`, som en kilde-parser ikke kan følge, mens builden
 * flader dem ud. En gate der larmer af den forkerte grund er lige så ubrugelig
 * som en der tier; det er den samme fejl som at måle to forskellige objekter
 * og kalde forskellen et fund. Kræver at pakkerne er bygget først.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { removedExports, removedEntryPoints } from './lib/public-api.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGES = [
  'vue',
  'core',
  'utils',
  'icons',
  'design-system',
  'nuxt',
  'mcp',
];

const declared = existsSync(join(root, '.api-removals.json'))
  ? JSON.parse(readFileSync(join(root, '.api-removals.json'), 'utf8'))
  : {};

let failed = 0;

for (const pkg of PACKAGES) {
  const name = `@grundtone/${pkg}`;
  // Lokalt BYGGET typedefinition, fundet via pakkens EGEN types-erklæring —
  // ikke via gættede stier. Lover pakken ingen typer, er der intet at
  // sammenligne (og intet at tabe).
  const localPkg = JSON.parse(
    readFileSync(join(root, 'packages', pkg, 'package.json'), 'utf8'),
  );
  const localTypes = (localPkg.types ?? localPkg.typings ?? '').replace(
    /^\.\//,
    '',
  );
  if (!localTypes) {
    console.log(`· ${name}: erklærer ingen typer — springes over`);
    continue;
  }
  const localDts = join(root, 'packages', pkg, localTypes);
  if (!existsSync(localDts)) {
    console.error(
      `::error::${name}: package.json lover "${localPkg.types}", men filen findes ikke efter build. ` +
        `Enhver TypeScript-forbruger ville miste typerne — tavst, fordi JS stadig virker.`,
    );
    failed++;
    continue;
  }

  let dir;
  try {
    dir = mkdtempSync(join(tmpdir(), 'apiloss-'));
    execFileSync('npm', ['pack', `${name}@latest`, '--silent'], {
      cwd: dir,
      stdio: 'pipe',
    });
    const tgz = readdirSync(dir).find(f => f.endsWith('.tgz'));
    execFileSync('tar', ['xzf', tgz], { cwd: dir });
  } catch {
    // Aldrig udgivet, eller registry utilgængeligt. Vi skelner IKKE her:
    // begge betyder "ingen udgivet flade at tabe noget fra", og et forsøg på
    // at gætte ville gøre gaten grøn på en fejl (jf. lib/npm-dist-tag.mjs).
    console.log(
      `· ${name}: ingen udgivet pakke at sammenligne med — springes over`,
    );
    continue;
  }

  const pkgJson = JSON.parse(
    readFileSync(join(dir, 'package', 'package.json'), 'utf8'),
  );
  // 🔴 Entry-point-tjekket ligger FOER de typeafhaengige `continue`s med vilje.
  // Foerste udgave laa efter dem, saa en pakke uden typedefinitioner (nuxt,
  // mcp) fik SPRUNGET ogsaa export-map-sammenligningen over — en check
  // deaktiveret af en grund der intet har med den at goere. Eksport-map og
  // typer er to uafhaengige former for offentligt API.
  const removedEntries = removedEntryPoints(
    pkgJson,
    localPkg,
    declared[name] ?? [],
  );
  if (removedEntries.length) {
    console.error(
      `::error::${name}: et publish ville FJERNE ${removedEntries.length} entry-point(s) fra ` +
        `exports-mappen, som ${pkgJson.version} har: ${removedEntries.join(', ')}. ` +
        `En forbruger der importerer dem knaekker. Genskab dem, eller erklaer ` +
        `fjernelsen i .api-removals.json (og udgiv som major).`,
    );
    failed++;
  }

  const typesPath = (pkgJson.types ?? pkgJson.typings ?? '').replace(
    /^\.\//,
    '',
  );
  const dts = typesPath && join(dir, 'package', typesPath);
  if (!dts || !existsSync(dts)) {
    console.log(
      `· ${name}: udgiver ingen typedefinitioner — kan ikke sammenlignes`,
    );
    continue;
  }

  const removed = removedExports(
    readFileSync(dts, 'utf8'),
    readFileSync(localDts, 'utf8'),
    declared[name] ?? [],
  );

  // Eksport-map-noeglerne er ogsaa offentligt API — og usynlige for
  // .d.ts-sammenligningen ovenfor ([backstage]s fund: ./css/utilities var
  // tabt uden at gaten saa det).
  if (removed.length) {
    console.error(
      `::error::${name}: et publish ville FJERNE ${removed.length} offentlige eksporter, ` +
        `som ${pkgJson.version} har: ${removed.join(', ')}. ` +
        `Port dem, eller erklær fjernelsen i .api-removals.json (og udgiv som major).`,
    );
    failed++;
  } else {
    console.log(
      `✓ ${name}: ingen offentlige eksporter går tabt (udgivet ${pkgJson.version})`,
    );
  }
}

if (failed) {
  console.error(`\n✗ ${failed} pakke(r) ville tabe offentligt API.`);
  process.exit(1);
}
console.log('\n✓ ingen pakke taber offentligt API ved publish.');
