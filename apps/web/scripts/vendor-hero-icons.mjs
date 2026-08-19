#!/usr/bin/env node
/**
 * Vendorer hero-ikon-cyklussens billeder fra KlangHaus/public til
 * apps/web/public/hero/ — nedskaleret og med sha-manifest.
 *
 * Hvorfor et script og ikke en håndkopi: vendoring FRYSER filer (studio#225 —
 * en placeholder overlevede i måneder fordi ingen kunne se at kopien var
 * gammel). Scriptet gør "er de aktuelle?" til ét kald, og manifestet gør
 * kilden læsbar uden at åbne git-historikken.
 *
 * Hvorfor 720px WebP — MÅLT, ikke antaget (2026-08-19, Icon-BlueGold):
 *     png 1281 (kilden)   19 KB      webp 720 q80   6 KB
 *     png 720 (naiv)      31 KB      webp 720 q90   9 KB   ← valgt
 *     png 720 palette     14 KB      webp 720 tabsfri 17 KB
 * 🔴 En naiv nedskalering gjorde filen STØRRE end kilden (31 mod 19 KB):
 * sharp's resize interpolerer nye farver og bryder kildens palet-komprimering.
 * "Mindre billede = mindre fil" holdt altså ikke. WebP q90 koster 0,16 %
 * middel-pixelafvigelse (max 39/255) — umærkeligt på et fladfarvet mærke der
 * vises ved 360 CSS-px — og sparer ~70 %: 63 KB for alle syv mod 208 KB.
 * Det tæller, fordi lagene er stablede: ALLE SYV loader ved first paint.
 *
 * Ingen PNG-fallback: enhver browser der kan rendere tile'n (aspect-ratio,
 * 2021) understøtter WebP (Safari 14, 2020) — fallbacken ville være død kode.
 *
 *   node apps/web/scripts/vendor-hero-icons.mjs            # verificér
 *   node apps/web/scripts/vendor-hero-icons.mjs --write     # hent + skriv
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '../public/hero');
const SIZE = 720;
const QUALITY = 90;
const REPO = 'KlangHaus/public';
const SRC_DIR = 'Grundtone logo/Iconic Mark/1x PNG';

// De SYV ikke-inverterede varianter. De inverterede er samme farvepar med
// figur/grund byttet — de ville fordoble loopet uden at tilføje information
// ([designer]s forlæg hero-icon-cycle.html).
const VARIANTS = [
  'BlueGold',
  'BluePink',
  'BlueWhite',
  'BlackWhite',
  'GoldWhite',
  'PinkGold',
  'PinkWhite',
];

const sha = buf => createHash('sha256').update(buf).digest('hex').slice(0, 16);

async function fetchSource(name) {
  const path = encodeURI(`${SRC_DIR}/Icon-${name}.png`);
  const api = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const res = await fetch(api, {
    headers: {
      Accept: 'application/vnd.github.raw',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok)
    throw new Error(
      `${name}: ${res.status} ${res.statusText} — er repoet privat? sæt GITHUB_TOKEN`,
    );
  return Buffer.from(await res.arrayBuffer());
}

const write = process.argv.includes('--write');
if (write && !existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const rows = [];
let drift = 0;

for (const name of VARIANTS) {
  const target = resolve(outDir, `icon-${name.toLowerCase()}.webp`);
  const src = await fetchSource(name);
  const resized = await sharp(src)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .webp({ quality: QUALITY })
    .toBuffer();

  if (write) {
    writeFileSync(target, resized);
  } else if (!existsSync(target)) {
    console.error(`✗ mangler: ${target}`);
    drift++;
    continue;
  } else if (sha(readFileSync(target)) !== sha(resized)) {
    console.error(
      `✗ drift: icon-${name.toLowerCase()}.webp afviger fra kilden`,
    );
    drift++;
  }
  rows.push({
    name,
    srcSha: sha(src),
    outSha: sha(resized),
    kb: Math.round(resized.length / 1024),
  });
}

if (write) {
  const manifest = [
    '# Vendorede hero-ikoner — kilde og sha',
    '',
    `Kilde: \`${REPO}\` → \`${SRC_DIR}/Icon-<variant>.png\` (1281x1281).`,
    `Nedskaleret til ${SIZE}x${SIZE} WebP q${QUALITY} (2x for tile'ns 360 CSS-px) af`,
    '`apps/web/scripts/vendor-hero-icons.mjs` — se scriptets header for målingen',
    'der valgte formatet (en naiv PNG-nedskalering blev STØRRE end kilden).',
    '',
    '🔴 Vendoring fryser filer. Kør scriptet UDEN `--write` for at verificere at',
    'de stadig svarer til kilden; med `--write` for at opdatere dem og dette',
    'manifest. Ret aldrig filerne i hånden.',
    '',
    '| variant | kilde-sha | vendoret sha | KB |',
    '| --- | --- | --- | --- |',
    ...rows.map(r => `| ${r.name} | ${r.srcSha} | ${r.outSha} | ${r.kb} |`),
    '',
    `Samlet: ${rows.reduce((n, r) => n + r.kb, 0)} KB for ${rows.length} billeder.`,
    '',
  ].join('\n');
  writeFileSync(resolve(outDir, 'VENDORED.md'), manifest);
  console.log(
    `✓ skrev ${rows.length} ikoner + manifest (${rows.reduce((n, r) => n + r.kb, 0)} KB)`,
  );
} else if (drift) {
  console.error(`\n✗ ${drift} fil(er) afviger fra kilden — kør med --write`);
  process.exit(1);
} else {
  console.log(`✓ alle ${rows.length} vendorede ikoner svarer til kilden`);
}
