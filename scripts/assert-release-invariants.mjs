#!/usr/bin/env node
/**
 * Gate: egenskaber en udgivelse ikke må være uden — målt på det BYGGEDE
 * artefakt, ikke på kilden.
 *
 * ── Hvorfor den findes ──────────────────────────────────────────────────────
 * 2026-08-23 blev release-PR'en merget før den nuxt-rettelse, den var betinget
 * af. Betingelsen stod i beskeder mellem mennesker og ingen andre steder.
 * Udgivelsen blev stoppet — men af nedgraderings-vagten, på en HELT anden
 * pakke, der tilfældigvis stod bagud. **Værnet virkede ved sammenfald, ikke
 * ved design:** havde react-native været på niveau, altså havde vi ryddet en
 * åben opgave op, var udgivelsen gået igennem uden rettelsen.
 *
 * Derfor encoder denne gate EGENSKABEN frem for rækkefølgen. "PR A før PR B"
 * er skrøbeligt og dækker kun ét tilfælde; "wiringen skal være i det, der
 * udgives" holder uanset merge-rækkefølge, uanset om nogen husker betingelsen,
 * og uanset om episoden er blevet til en anekdote.
 *
 * ── Hvorfor artefaktet og ikke kilden ───────────────────────────────────────
 * Kilden fortæller, hvad nogen skrev. Den byggede fil er, hvad forbrugeren får.
 * Modulet EKSEKVERES her mod et fake Nuxt-objekt — ikke tekstsøgt — så en
 * ændring der beholder ordene men taber virkningen også fanges.
 *
 * ── Hvorfor der kun staar fire, og kun om nuxt ──────────────────────────────
 * 🔴 Invarianter skrives, hvor en regression ER fundet eller er sandsynlig —
 * ikke forebyggende overalt. Det er en beslutning, ikke en forglemmelse.
 *
 * De oevrige fem pakker er ikke udeladt af mangel paa tid: artefakt-maalingen
 * 2026-08-23 (pakket tarball mod pakket tarball, i to lag) gav positivt bevis
 * for dem — indholds-aendringerne var under en kilobyte og forklarede sig selv
 * (`core index.d.ts −169 B` = den erklaerede CreateThemeOverrides). Nuxt blev
 * ikke fundet ved at lede; lag 2 flagede den. De oevrige passerede samme
 * instrument.
 *
 * En stor suite af assertioner, ingen kender grunden til, bliver slettet i den
 * foerste oprydning — og saa er ogsaa den ene, der betoed noget, vaek. Fire
 * invarianter med en dokumenteret episode bag er staerkere end tyve, hvor
 * nitten er formodninger.
 *
 * **Finder nogen en adfaerdsregression i en anden pakke, er dét oejeblikket,
 * hvor den fortjener sin egen invariant her.** Ikke foer.
 *
 * Usage: node scripts/assert-release-invariants.mjs   (efter build)
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function check(name, ok, detail) {
  if (ok) {
    console.log(`✓ ${name}`);
    return;
  }
  failures.push(name);
  console.error(`::error::${name} — ${detail}`);
}

// ── @grundtone/nuxt ─────────────────────────────────────────────────────────
const modulePath = join(root, 'packages/nuxt/dist/module.mjs');
if (!existsSync(modulePath)) {
  console.error(
    `::error::${modulePath} findes ikke. Kør build før denne gate — en ` +
      `manglende fil må ikke læse som "ingen problemer".`,
  );
  process.exit(1);
}

const nuxtModule = (await import(modulePath)).default;

// Auto-import-grenene kræver en ægte Nuxt-kontekst; alt det, der gik tabt,
// ligger uden for dem.
const nuxt = {
  _version: '4.5.1',
  options: {
    css: [],
    vite: {},
    runtimeConfig: { public: {} },
    devtools: false,
  },
  hook: () => {},
  callHook: async () => {},
  hooks: { hook: () => {}, callHook: async () => {} },
};
await nuxtModule({ components: false, composables: false }, nuxt);

const scss = nuxt.options.vite?.css?.preprocessorOptions?.scss;
const additionalData =
  typeof scss?.additionalData === 'string' ? scss.additionalData : '';

check(
  'nuxt: SCSS-token-namespacet er wired',
  additionalData.includes('as tokens'),
  'uden det fejler enhver forbrugers build med "There is no module with the ' +
    'namespace \\"tokens\\"". Målt 25 fejl i playgroundet, da wiringen manglede.',
);

check(
  'nuxt: token-stien er ABSOLUT',
  /@use\s+"\//.test(additionalData),
  'sass opløser kun bare specifiers gennem en importer, så ' +
    '"@grundtone/design-system/scss/lib" ville se rigtig ud og fejle ved build.',
);

check(
  'nuxt: includePaths peger på design-systems src',
  Array.isArray(scss?.includePaths) && scss.includePaths.length > 0,
  'uden den kan @use af relative token-filer ikke opløses.',
);

check(
  'nuxt: design-system-CSS injiceres',
  nuxt.options.css.some(p => String(p).endsWith('.css')),
  'uden den har komponenterne ingen custom properties at læse.',
);

if (failures.length) {
  console.error(
    `\n✗ ${failures.length} udgivelses-invariant(er) brudt. Udgivelsen ville ` +
      `sende en kendt regression ud.`,
  );
  process.exit(1);
}
console.log('\n✓ alle udgivelses-invarianter holder på det byggede artefakt.');
