#!/usr/bin/env node
/**
 * Gate: no package may be published at a version LOWER than its own `latest`
 * on npm.
 *
 * ── Why this exists ─────────────────────────────────────────────────────────
 * Measured 2026-08-20: @grundtone/react-native was 2.12.0 on develop while
 * npm's `latest` was 2.22.0 — ten minor versions behind. Publishing from that
 * state would have shipped a DOWNGRADE wrapped in a higher-sounding number,
 * and npm unpublish is 72h and discouraged, so it would have stuck.
 *
 * ── Why it is not a note saying "remember to leave react-native out" ────────
 * That is the shape we keep getting caught by: an exception justified by a
 * state nobody enforces, which becomes wrong the moment nobody remembers it.
 * It would have been forgotten during exactly the release it guards against —
 * a combined publish, long list, and react-native is the one nobody thinks of.
 *
 * So the rule is general, and the package list is DISCOVERED rather than
 * maintained. A package added tomorrow is covered without anyone editing this
 * file; a package that falls behind tomorrow is caught without anyone noticing
 * that it did.
 *
 * ── How this differs from assert-develop-ahead-of-latest.mjs ────────────────
 * That gate asks whether develop is STRICTLY AHEAD, and only for the seven
 * packages in the `next` channel — equality is a failure there, because
 * `0.1.0-next.5` sorts below its own released `0.1.0`.
 *
 * This one asks a weaker question of EVERY publishable package: would we go
 * BACKWARDS? Equal is fine (npm rejects a duplicate version on its own).
 *
 * The two overlap and neither replaces the other. react-native is deliberately
 * outside the `next` channel — but "outside that channel" was silently read as
 * "outside version checking altogether", which is how it drifted ten versions
 * behind unnoticed. An exception has to name the control it is an exception
 * FROM.
 *
 * Usage: node scripts/assert-no-downgrade-publish.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { gt } from './lib/semver-gt.mjs';
import { lookupPublished } from './lib/npm-dist-tag.mjs';
import { publishablePackages } from './lib/publishable-packages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TAG = process.env.NPM_DIST_TAG ?? 'latest';

const packages = publishablePackages(root, { readdirSync, readFileSync });
if (!packages.length) {
  console.error(
    '::error::fandt ingen udgivelige pakker under packages/ — gaten ville ' +
      'have været grøn uden at måle noget.',
  );
  process.exit(1);
}

const failures = [];
for (const { name, version } of packages) {
  const published = lookupPublished(name, TAG);

  if (published.state === 'unpublished') {
    console.log(`· ${name}: ikke udgivet på \`${TAG}\` — intet at gå tilbage fra`);
    continue;
  }

  if (gt(published.version, version)) {
    failures.push({ name, version, published: published.version });
    console.error(
      `::error::${name}: ${version} er LAVERE end \`${TAG}\` (${published.version}). ` +
        `Et publish herfra ville være en nedgradering pakket ind i et højere tal, ` +
        `og npm unpublish er 72 timer og frarådet. Bump pakken, eller hold den ` +
        `ude af udgivelsen.`,
    );
    continue;
  }

  console.log(`✓ ${name}: ${version} ≥ \`${TAG}\` ${published.version}`);
}

if (failures.length) {
  console.error(
    `\n✗ ${failures.length} pakke(r) ville blive udgivet som en nedgradering.`,
  );
  process.exit(1);
}
console.log(`\n✓ ingen pakke ville gå baglæns i forhold til \`${TAG}\`.`);
