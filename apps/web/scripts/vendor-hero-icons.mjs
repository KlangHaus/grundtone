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
 * Ingen PNG-fallback: enhver browser der kan rendere tile'n understøtter WebP.
 * WebP kom i Safari 14 (2020), `aspect-ratio` først i Safari 15 (2021) — så
 * kravet til layoutet er STRENGERE end kravet til formatet, og en fallback
 * ville være død kode. ([review] rettede mig: jeg havde byttet de to årstal.)
 *
 *   node apps/web/scripts/vendor-hero-icons.mjs            # verificér
 *   node apps/web/scripts/vendor-hero-icons.mjs --write     # hent + skriv
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  SIZE,
  QUALITY,
  VARIANTS,
  sha,
  planFor,
  renderManifest,
  fetchSource,
} from './lib/hero-icons.mjs';

// ── main ────────────────────────────────────────────────────────────────────
// Kun når scriptet KØRES; importeres det af en test, sker der ingenting.
if (process.argv[1]?.endsWith('vendor-hero-icons.mjs')) {
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
