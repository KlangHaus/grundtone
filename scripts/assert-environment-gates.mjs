#!/usr/bin/env node
/**
 * Gate: et environment, en workflow refererer, skal faktisk beskytte noget.
 *
 * ── Hvorfor ─────────────────────────────────────────────────────────────────
 * Målt 2026-08-23 i grundtone-studio: `build.yml` erklærer `environment:` på to
 * jobs, og begge environments har `protection_rules: []`. Et environment uden
 * regler venter ikke på nogen — deployment kører igennem med det samme.
 *
 * **`environment:`-nøglen ser ud som en godkendelses-gate og er det ikke.** Den
 * blev derefter refereret som et værn i beslutninger og statusmeldinger, og
 * ingen opdagede forskellen, fordi den eneste forskel er en tom liste i et
 * API-svar, ingen kigger i. Samme klasse som et rødt check, der ikke er
 * required: noget der ligner en blokering uden at blokere.
 *
 * ── Hvorfor et NUL rapporteres ──────────────────────────────────────────────
 * Refererer ingen workflow et environment, består gaten — men den SIGER det.
 * En gate, der er grøn fordi den ikke måler noget, er den tilstand vi har brugt
 * to dage på at navngive.
 *
 * Usage: GH_TOKEN=… node scripts/assert-environment-gates.mjs
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  referencedEnvironments,
  unprotectedReferences,
} from './lib/environment-gates.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = process.env.GITHUB_REPOSITORY ?? 'KlangHaus/grundtone';

// 🔴 Et environment har TO legitime brug, og gaten maa ikke blande dem sammen:
// det kan beskytte (godkendelse, wait timer, gren-politik), og det kan holde
// scoped secrets. Kun det foerste er en gate.
//
// Et environment der KUN scoper secrets, er ikke en attrap — men forskellen
// skal vaere ERKLAERET, ikke antaget, praecis som en fjernet eksport skal
// erklaeres frem for bare at forsvinde. Staar den ikke her, er en tom
// protection_rules en fejl.
const SECRETS_ONLY = {
  'grundtone-com': `Scoper Bunny-secrets til deploy-web.yml (BUNNY_WEB_STORAGE_*).
    Den gater ikke og skal ikke gate: deploy af det statiske site er ikke en
    handling, der kraever godkendelse. Skal den nogensinde gate, fjernes den
    herfra — og saa er den tomme protection_rules igen en fejl.`,
};

const referenced = new Set();
const dir = join(root, '.github/workflows');
for (const f of readdirSync(dir).filter(n => /\.ya?ml$/.test(n))) {
  for (const name of referencedEnvironments(
    readFileSync(join(dir, f), 'utf8'),
  )) {
    referenced.add(name);
  }
}

if (referenced.size === 0) {
  console.log(
    `· ingen workflow refererer et environment. Gaten består — men den har ` +
      `ikke målt noget, og det er forskellen på "beskyttet" og "intet at beskytte".`,
  );
  process.exit(0);
}

let environments;
try {
  environments =
    JSON.parse(
      execFileSync('gh', ['api', `repos/${REPO}/environments`], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    ).environments ?? [];
} catch (err) {
  console.error(
    `::error::kunne ikke læse environments for ${REPO}. Et opslag der ikke ` +
      `lykkedes er IKKE det samme som "ingen beskyttelse mangler".\n` +
      `${String(err.stderr ?? err.message).trim()}`,
  );
  process.exit(1);
}

const protection = new Map(
  environments.map(e => [e.name, e.protection_rules ?? []]),
);
const declared = new Set(Object.keys(SECRETS_ONLY));
const unprotected = unprotectedReferences(referenced, protection).filter(
  u => !declared.has(u.name),
);

// Erklaerede rapporteres, de udelades ikke tavst: bliver de usynlige, ser et
// environment uden beskyttelse ud som et der har den.
for (const name of referenced) {
  if (!declared.has(name)) continue;
  console.log(
    `· ${name}: ingen beskyttelse — erklæret som secrets-only.\n    ${SECRETS_ONLY[name].trim().replace(/\n\s+/g, '\n    ')}`,
  );
}

for (const name of referenced) {
  const rules = protection.get(name);
  if (rules?.length) {
    console.log(`✓ ${name}: ${rules.map(r => r.type).join(', ')}`);
  }
}

if (unprotected.length) {
  for (const { name, reason } of unprotected) {
    console.error(
      `::error::environment "${name}" refereres af en workflow, men ${reason}. ` +
        `Nøglen i workflowen ser ud som en gate uden at være det — og bliver ` +
        `refereret som et værn.`,
    );
  }
  console.error(
    `\n✗ ${unprotected.length} environment-reference(r) beskytter intet.`,
  );
  process.exit(1);
}

// 🔴 Sammenfatningen skal taelle det, den MAALER. "alle N beskytter noget"
// var falsk, naar N indeholdt erklaerede secrets-only — gatens egen slutlinje
// paastod praecis den ting, gaten findes for at afsloere.
const guarding = [...referenced].filter(
  n => !declared.has(n) && protection.get(n)?.length,
).length;
console.log(
  `
✓ ${referenced.size} environment-reference(r): ${guarding} beskytter, ` +
    `${referenced.size - guarding} erklæret uden beskyttelse.`,
);
