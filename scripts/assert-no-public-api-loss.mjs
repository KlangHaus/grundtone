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

import { auditPackage } from './lib/public-api.mjs';

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
  const localPkg = JSON.parse(
    readFileSync(join(root, 'packages', pkg, 'package.json'), 'utf8'),
  );

  // Hent den udgivne pakke FOERST. Baade exports-mappen og typerne
  // sammenlignes mod den, og uden den er der ingen udgivet flade at tabe
  // noget fra.
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
    // Aldrig udgivet, eller registry utilgaengeligt. Vi skelner IKKE her:
    // begge betyder "ingen udgivet flade at tabe noget fra", og et forsoeg paa
    // at gaette ville goere gaten groen paa en fejl (jf. lib/npm-dist-tag.mjs).
    console.log(
      `· ${name}: ingen udgivet pakke at sammenligne med — springes over`,
    );
    continue;
  }

  const publishedPkg = JSON.parse(
    readFileSync(join(dir, 'package', 'package.json'), 'utf8'),
  );

  // Lokalt BYGGET typedefinition, fundet via pakkens EGEN types-erklaering —
  // ikke via gaettede stier. Lover pakken typer den ikke byggede, ville enhver
  // TypeScript-forbruger miste dem tavst, fordi JS stadig virker.
  const localTypes = (localPkg.types ?? localPkg.typings ?? '').replace(
    /^\.\//,
    '',
  );
  const localDts = localTypes ? join(root, 'packages', pkg, localTypes) : null;
  if (localDts && !existsSync(localDts)) {
    console.error(
      `::error::${name}: package.json lover "${localPkg.types}", men filen findes ikke efter build. ` +
        `Enhver TypeScript-forbruger ville miste typerne — tavst, fordi JS stadig virker.`,
    );
    failed++;
    continue;
  }

  const publishedTypes = (
    publishedPkg.types ??
    publishedPkg.typings ??
    ''
  ).replace(/^\.\//, '');
  const publishedDts = publishedTypes
    ? join(dir, 'package', publishedTypes)
    : null;

  // 🔴 Scriptet TRAEFFER ingen beslutning her; det laeser filer og rapporterer.
  // Begge tab afgoeres af auditPackage(), hvor entry-points beregnes
  // ubetinget. Det er med vilje: to gange laa entry-point-tjekket bag en guard,
  // der kun handlede om TYPER, og begge gange saa gaten groen ud, fordi den
  // sprang maalingen over frem for at foretage den. Saa laenge raekkefolgen i
  // dette script kunne slaa et tjek fra, kunne ingen enhedstest af de enkelte
  // funktioner se fejlen.
  // `./css` peger paa den stylesheet forbrugere faktisk importerer. Findes den
  // ikke i en pakke, er der ingen keyframes at tabe.
  const cssOf = (pkg, base) => {
    const rel = pkg?.exports?.['./css'];
    if (typeof rel !== 'string') return null;
    const file = join(base, rel.replace(/^\.\//, ''));
    return existsSync(file) ? readFileSync(file, 'utf8') : null;
  };

  const audit = auditPackage({
    localPkg,
    publishedPkg,
    localCss: cssOf(localPkg, join(root, 'packages', pkg)),
    publishedCss: cssOf(publishedPkg, join(dir, 'package')),
    localDts: localDts ? readFileSync(localDts, 'utf8') : null,
    publishedDts:
      publishedDts && existsSync(publishedDts)
        ? readFileSync(publishedDts, 'utf8')
        : null,
    allowedRemovals: declared[name] ?? [],
  });

  if (audit.entryPointsRemoved.length) {
    console.error(
      `::error::${name}: et publish ville FJERNE ${audit.entryPointsRemoved.length} entry-point(s) fra ` +
        `exports-mappen, som ${publishedPkg.version} har: ${audit.entryPointsRemoved.join(', ')}. ` +
        `En forbruger der importerer dem knaekker. Genskab dem, eller erklaer ` +
        `fjernelsen i .api-removals.json (og udgiv som major).`,
    );
    failed++;
  }

  if (audit.keyframesRemoved.length) {
    console.error(
      `::error::${name}: et publish ville FJERNE ${audit.keyframesRemoved.length} ` +
        `gt-praefikset keyframe(s), som ${publishedPkg.version} har: ` +
        `${audit.keyframesRemoved.join(', ')}. Et keyframe-navn er GLOBALT og ` +
        `kan ikke scopes — en forbruger med \`animation: <navn>\` knaekker uden ` +
        `advarsel. Genskab navnet, eller erklaer fjernelsen i .api-removals.json.`,
    );
    failed++;
  } else if (audit.comparedKeyframes) {
    console.log(`✓ ${name}: ingen gt-keyframes går tabt`);
  }

  if (!audit.comparedTypes) {
    console.log(
      `· ${name}: ingen typer at sammenligne — kun exports-mappen maalt`,
    );
    continue;
  }

  if (audit.exportsRemoved.length) {
    console.error(
      `::error::${name}: et publish ville FJERNE ${audit.exportsRemoved.length} offentlige eksporter, ` +
        `som ${publishedPkg.version} har: ${audit.exportsRemoved.join(', ')}. ` +
        `Port dem, eller erklær fjernelsen i .api-removals.json (og udgiv som major).`,
    );
    failed++;
  } else {
    console.log(
      `✓ ${name}: ingen offentlige eksporter går tabt (udgivet ${publishedPkg.version})`,
    );
  }
}

if (failed) {
  console.error(`\n✗ ${failed} pakke(r) ville tabe offentligt API.`);
  process.exit(1);
}
console.log('\n✓ ingen pakke taber offentligt API ved publish.');
