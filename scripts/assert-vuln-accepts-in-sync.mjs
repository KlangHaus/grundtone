#!/usr/bin/env node
/**
 * Gate: de to accept-lister skal indeholde de samme GHSA-id'er.
 *
 * ── Hvorfor to lister ───────────────────────────────────────────────────────
 * `pnpm audit` læser `pnpm-workspace.yaml` (auditConfig.ignoreGhsas);
 * `osv-scanner` læser `osv-scanner.toml` (IgnoredVulns). To værktøjer, to
 * formater, **intet fælles felt at binde dem med.** Begge lister findes
 * faktisk — det er reel duplikering, ikke en opfundet drift.
 *
 * ── Hvorfor det skal måles ──────────────────────────────────────────────────
 * Driften ville være TAVS: én opdateres, den anden glemmes, og det ene værktøj
 * accepterer noget, det andet flager. Resultatet er en rød gate, ingen forstår,
 * eller — værre — en accept, der lever videre i det ene værktøj, efter nogen
 * troede, den var fjernet.
 *
 * Usage: node scripts/assert-vuln-accepts-in-sync.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  acceptDrift,
  declaredInPnpmWorkspace,
  declaredInToml,
} from './lib/vuln-accepts.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOML = join(root, 'osv-scanner.toml');
const YAML = join(root, 'pnpm-workspace.yaml');

for (const f of [TOML, YAML]) {
  if (!existsSync(f)) {
    console.error(
      `::error::${f} findes ikke. En manglende fil må ikke læse som "ingen ` +
        `accepter at sammenligne" — så ville gaten være grøn, netop når den ` +
        `ene liste forsvandt.`,
    );
    process.exit(1);
  }
}

const toml = declaredInToml(readFileSync(TOML, 'utf8'));
const yaml = declaredInPnpmWorkspace(readFileSync(YAML, 'utf8'));
const drift = acceptDrift(toml, yaml);

if (drift.length) {
  for (const { id, onlyIn } of drift) {
    console.error(
      `::error::${id} er kun erklæret i ${onlyIn}. De to lister dækker de ` +
        `samme sårbarheder for hvert sit værktøj — står en accept kun ét sted, ` +
        `flager det andet værktøj den, eller accepterer den i det skjulte.`,
    );
  }
  console.error(`\n✗ ${drift.length} accept(er) står kun ét sted.`);
  process.exit(1);
}

console.log(
  `✓ begge accept-lister erklærer de samme ${toml.size} sårbarhed(er): ` +
    `${[...toml].join(', ') || '(ingen)'}`,
);
