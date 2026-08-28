#!/usr/bin/env node
// Flade-metadata paa grundtone.com maales i det BYGGEDE HTML, ikke i kilden.
//
// 🔴 Hvorfor artefaktet: da denne blev skrevet, satte siderne kun `og:title`.
// I kilden saa det komplet ud. I outputtet beholdt `twitter:title` den
// site-brede ENGELSKE default, saa /studio serverede en dansk og:title og en
// engelsk twitter:title for samme side. Den uoverensstemmelse findes ikke i
// nogen enkelt fil — kun i resultatet af at flette nuxt.config og siden.
//
// Kontrollen daekker PARRENE (og:* og twitter:* skal vaere enige) og
// PR.-RUTE-felterne (canonical, og:url), fordi det er dem der kan drive fra
// hinanden uden at nogen enkelt fil ser forkert ud.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative, resolve } from 'node:path';

const root = process.argv[2] ?? 'apps/web/.output/public';
const SITE = 'https://grundtone.com';

// 200.html/404.html er SPA-fallbacks. De SKAL ikke have canonical: en
// fejlside der haevder et kanonisk URL beder om at blive indekseret som det.
const FALLBACKS = new Set(['200.html', '404.html']);

// 🔴 Sammenlign ORIGIN, ikke praefiks. `startsWith(SITE)` accepterer
// `https://grundtone.com.andet-domaene.dk/` og `https://grundtone.comfoo/` —
// ANDRE domaener, der bare deler de foerste tegn. Fundet af CodeQL
// (js/incomplete-url-substring-sanitization) i denne fils foerste version;
// den havde ret, og det er en korrektheds-fejl, ikke kun en sikkerhedsnit:
// en canonical mod et look-alike-domaen ville have bestaaet gaten.
const SITE_ORIGIN = new URL(SITE).origin;
function isOurOrigin(url) {
  try {
    return new URL(url).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

if (!existsSync(root)) {
  console.error(`✗ ${root} findes ikke — byg apps/web foer denne kontrol.`);
  process.exit(1);
}

const all = htmlFiles(root);
/**
 * Ren kontrol-logik, adskilt fra filsystem og process.exit.
 *
 * 🔴 Adskillelsen er ikke pynt: som CLI kunne gaten kun proeves ved at bygge
 * hele sitet og mutere det byggede HTML. Den maaling er stadig den vigtigste
 * (den fangede twitter:title-fejlen), men den kan ikke koeres pr. regel.
 * Her kan hver enkelt regel proeves mod en haandskrevet HTML-streng.
 *
 * @param files  [{ rel, html }] — ruter OG fallback-sider
 * @param existsInOutput  (sti) => bool, saa og:image-tjekket kan proeves uden
 *                        et rigtigt filsystem
 */
export function checkFladeMetadata(files, existsInOutput) {
  const routeFiles = files.filter(f => !FALLBACKS.has(f.rel));
  const fallbackFiles = files.filter(f => FALLBACKS.has(f.rel));
  const errors = [];
  const meta = (html, attr, key) =>
    new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(html)?.[1];

  // Positiv kontrol: et nul her er ikke et pas.
  if (routeFiles.length < 2) {
    errors.push(
      `fandt kun ${routeFiles.length} rute-HTML — forventede mindst 2. Enten er outputtet tomt, eller stien peger forkert.`,
    );
    return {
      errors,
      routes: routeFiles.length,
      fallbacks: fallbackFiles.length,
    };
  }

  for (const { rel, html } of routeFiles) {
    const fail = msg => errors.push(`${rel}: ${msg}`);

    const canonicals =
      html.match(/<link rel="canonical" href="([^"]*)"/g) ?? [];
    if (canonicals.length !== 1) {
      fail(`${canonicals.length} canonical-tags — forventede praecis 1`);
    }
    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
    if (canonical && !isOurOrigin(canonical)) {
      fail(`canonical peger uden for ${SITE_ORIGIN}: ${canonical}`);
    }

    const ogUrl = meta(html, 'property', 'og:url');
    if (!ogUrl) fail('mangler og:url');
    if (canonical && ogUrl && canonical !== ogUrl) {
      fail(`canonical (${canonical}) og og:url (${ogUrl}) er uenige`);
    }

    for (const key of ['og:type', 'og:site_name', 'og:locale']) {
      if (!meta(html, 'property', key)) fail(`mangler ${key}`);
    }

    for (const [og, tw] of [
      ['og:title', 'twitter:title'],
      ['og:description', 'twitter:description'],
    ]) {
      const a = meta(html, 'property', og);
      const b = meta(html, 'name', tw);
      if (!a) fail(`mangler ${og}`);
      if (!b) fail(`mangler ${tw}`);
      if (a && b && a !== b)
        fail(`${og} og ${tw} er uenige:\n      ${og}: ${a}\n      ${tw}: ${b}`);
    }

    const ogImage = meta(html, 'property', 'og:image');
    if (ogImage) {
      const absolute = /^https?:\/\//.test(ogImage);
      if (absolute && !isOurOrigin(ogImage)) {
        fail(`og:image ligger uden for ${SITE_ORIGIN}: ${ogImage}`);
      }
      const path = absolute ? new URL(ogImage).pathname : ogImage;
      if (path.startsWith('/') && !existsInOutput(path)) {
        fail(`og:image peger paa en fil der ikke findes i outputtet: ${path}`);
      }
    }
  }

  for (const { rel, html } of fallbackFiles) {
    if (/<link rel="canonical"/.test(html)) {
      errors.push(`${rel}: fallback-siden har en canonical — den maa den ikke`);
    }
  }

  return { errors, routes: routeFiles.length, fallbacks: fallbackFiles.length };
}

// ─── CLI ──────────────────────────────────────────────────────────────────
// Koerer KUN ved direkte kald. Uden guarden ville en test-import eksekvere
// hele kontrollen og kalde process.exit — modulet kunne ikke importeres.
const invokedDirectly =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  if (!existsSync(root)) {
    console.error(`✗ ${root} findes ikke — byg apps/web foer denne kontrol.`);
    process.exit(1);
  }

  const files = htmlFiles(root).map(f => ({
    rel: relative(root, f),
    html: readFileSync(f, 'utf8'),
  }));

  const { errors, routes, fallbacks } = checkFladeMetadata(files, path =>
    existsSync(join(root, path)),
  );

  if (errors.length) {
    console.error(`✗ flade-metadata: ${errors.length} problem(er)`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log(
    `✓ flade-metadata: ${routes} ruter kontrolleret (canonical, og:url, og/twitter-par), ` +
      `${fallbacks} fallback-sider uden canonical.`,
  );
}
