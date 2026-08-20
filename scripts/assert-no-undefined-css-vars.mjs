#!/usr/bin/env node
/**
 * Gate: den byggede CSS må ikke bruge en custom property, der hverken er
 * defineret eller har en fallback.
 *
 * ── Hvorfor den findes ──────────────────────────────────────────────────────
 * Målt 2026-08-20: fem navne, 61 deklarationer, døde. Blandt dem
 * `var(--ease-ease)` 38 gange (transitions, bl.a. modalens fade og scale),
 * `var(--color-border)` 4 gange (usynlige kanter på .size-btn og .filter-chip)
 * og `var(--z-index-tooltip)` (tooltip-stabling). Den ældste dateres til marts
 * 2026 — over fem måneder, hvor CSS'en så rigtig ud i enhver diff.
 *
 * Fælles rod: kaldestedet brugte SCSS-siden navn frem for det EMITTEREDE.
 * `$z-index-tooltip` bliver til `--z-tooltip`; `ease('ease-out')` bliver til
 * `--ease-out`, men nogen skrev `--ease-ease-out`. De to navnerum ligner
 * hinanden nok til at forveksles, og forskellen er usynlig indtil runtime.
 *
 * ── Hvorfor ikke bare en @error i ease() ────────────────────────────────────
 * Den findes allerede (#147) og fangede intet af dette: disse kaldesteder går
 * uden om funktionen og skriver `var(...)` direkte. En guard på ÉN indgang
 * måler kun dem, der bruger den indgang. Denne gate måler resultatet i stedet
 * for vejen dertil, og fanger derfor også de navne, ingen funktion ejer.
 *
 * Usage: node scripts/assert-no-undefined-css-vars.mjs <fil.css> [flere...]
 */
import { existsSync, readFileSync } from 'node:fs';

import { undefinedCustomProperties } from './lib/css-custom-properties.mjs';

// Properties som en FORBRUGER sætter (inline style, egen regel). De er ikke
// tabt — de er en kontrakt. Tilføj kun her med den kontrakt skrevet ned.
const CONSUMER_PROVIDED = [
  // GTAppShell saetter selv denne inline paa rod-elementet
  // (`:style="{ [--${p}-app-shell-sidebar]: sidebarInlineSize }"`), saa CSS'en
  // kan ikke definere den. Kontrakten er: komponenten SKAL saette den, og gør
  // det ubetinget — sidebar-bredden er ikke valgfri.
  '--gt-app-shell-sidebar',
];

const files = process.argv.slice(2);
if (!files.length) {
  console.error('::error::ingen CSS-filer angivet — gaten ville intet måle.');
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  if (!existsSync(file)) {
    console.error(
      `::error::${file} findes ikke. Kør build før gaten — en manglende fil ` +
        `må ikke læse som "ingen problemer".`,
    );
    failed++;
    continue;
  }

  const found = undefinedCustomProperties(readFileSync(file, 'utf8'), {
    allow: CONSUMER_PROVIDED,
  });

  if (!found.length) {
    console.log(`✓ ${file}: ingen udefinerede custom properties`);
    continue;
  }

  for (const { name, occurrences } of found) {
    console.error(
      `::error::${file}: \`var(${name})\` er ikke defineret og har ingen fallback ` +
        `— ${occurrences} deklaration(er) bliver kasseret af browseren og gør intet. ` +
        `Tjek det EMITTEREDE navn: SCSS-variablen og custom property'en hedder ` +
        `ikke altid det samme.`,
    );
  }
  failed++;
}

if (failed) {
  console.error(`\n✗ ${failed} fil(er) har døde deklarationer.`);
  process.exit(1);
}
console.log('\n✓ alle brugte custom properties er definerede.');
