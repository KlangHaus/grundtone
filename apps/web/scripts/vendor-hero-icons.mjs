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

export const SIZE = 720;
export const QUALITY = 90;
export const REPO = 'KlangHaus/public';
export const SRC_DIR = 'Grundtone logo/Iconic Mark/1x PNG';

// De SYV ikke-inverterede varianter. De inverterede er samme farvepar med
// figur/grund byttet — de ville fordoble loopet uden at tilføje information
// ([designer]s forlæg hero-icon-cycle.html).
export const VARIANTS = [
  'BlueGold',
  'BluePink',
  'BlueWhite',
  'BlackWhite',
  'GoldWhite',
  'PinkGold',
  'PinkWhite',
];

export const sha = buf =>
  createHash('sha256').update(buf).digest('hex').slice(0, 16);

/** Filnavn for en variant — ét sted, så script og manifest ikke kan drive fra hinanden. */
export const fileFor = name => `icon-${name.toLowerCase()}.webp`;

/**
 * Afgør pr. variant om den vendorede fil svarer til kilden. Ren funktion med
 * injicerede afhængigheder, så drift-beslutningen kan testes uden netværk og
 * uden filsystem — samme mønster som scripts/lib/npm-dist-tag.mjs.
 *
 * `encoded(name)` → den buffer kilden ville producere efter resize/WebP.
 * `existing(file)` → den vendorede fils indhold, eller null hvis den mangler.
 */
export function planFor(names, { encoded, existing }) {
  return names.map(name => {
    const file = fileFor(name);
    const want = sha(encoded(name));
    const have = existing(file);
    const status = have === null ? 'missing' : have === want ? 'ok' : 'drift';
    return { name, file, status, want, have };
  });
}

/** Manifestets tekst — ren funktion, så formatet kan asserteres. */
export function renderManifest(rows, opts = {}) {
  const {
    repo = REPO,
    srcDir = SRC_DIR,
    size = SIZE,
    quality = QUALITY,
  } = opts;
  return [
    '# Vendorede hero-ikoner — kilde og sha',
    '',
    `Kilde: \`${repo}\` → \`${srcDir}/Icon-<variant>.png\` (1281x1281).`,
    `Nedskaleret til ${size}x${size} WebP q${quality} (2x for tile'ns 360 CSS-px)`,
    'af `apps/web/scripts/vendor-hero-icons.mjs` — se scriptets header for',
    'målingen der valgte formatet (en naiv PNG-nedskalering blev STØRRE end',
    'kilden).',
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
}

export async function fetchSource(name, fetchImpl = fetch) {
  const path = encodeURI(`${SRC_DIR}/Icon-${name}.png`);
  const api = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const res = await fetchImpl(api, {
    headers: {
      Accept: 'application/vnd.github.raw',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(
      `${name}: ${res.status} ${res.statusText} — er repoet privat? sæt GITHUB_TOKEN`,
    );
  }
  return Buffer.from(await res.arrayBuffer());
}

// ── main ────────────────────────────────────────────────────────────────────
// Kun når scriptet KØRES; importeres det af en test, sker der ingenting.
if (process.argv[1] && process.argv[1].endsWith('vendor-hero-icons.mjs')) {
  const { default: sharp } = await import('sharp');
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = resolve(here, '../public/hero');
  const write = process.argv.includes('--write');
  if (write && !existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const encodedByName = new Map();
  const rows = [];
  for (const name of VARIANTS) {
    const src = await fetchSource(name);
    const out = await sharp(src)
      .resize(SIZE, SIZE, { fit: 'cover' })
      .webp({ quality: QUALITY })
      .toBuffer();
    encodedByName.set(name, out);
    rows.push({
      name,
      srcSha: sha(src),
      outSha: sha(out),
      kb: Math.round(out.length / 1024),
    });
  }

  const plan = planFor(VARIANTS, {
    encoded: n => encodedByName.get(n),
    existing: file => {
      const p = resolve(outDir, file);
      return existsSync(p) ? sha(readFileSync(p)) : null;
    },
  });

  if (write) {
    for (const { name, file } of plan) {
      writeFileSync(resolve(outDir, file), encodedByName.get(name));
    }
    writeFileSync(resolve(outDir, 'VENDORED.md'), renderManifest(rows));
    const kb = rows.reduce((n, r) => n + r.kb, 0);
    console.log(`✓ skrev ${rows.length} ikoner + manifest (${kb} KB)`);
  } else {
    const bad = plan.filter(p => p.status !== 'ok');
    for (const p of bad) console.error(`✗ ${p.status}: ${p.file}`);
    if (bad.length) {
      console.error(
        `\n✗ ${bad.length} fil(er) afviger fra kilden — kør med --write`,
      );
      process.exit(1);
    }
    console.log(`✓ alle ${plan.length} vendorede ikoner svarer til kilden`);
  }
}
