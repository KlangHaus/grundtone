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
import { join, relative } from 'node:path';

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
const routes = all.filter(f => !FALLBACKS.has(relative(root, f)));
const fallbacks = all.filter(f => FALLBACKS.has(relative(root, f)));

// 🔴 Positiv kontrol: uden den ville en tom eller flyttet output-mappe give
// nul filer og dermed nul fejl — gaten ville melde groent uden at maale noget.
if (routes.length < 2) {
  console.error(
    `✗ fandt kun ${routes.length} rute-HTML i ${root} — forventede mindst 2.`,
  );
  console.error(
    '  Enten er outputtet tomt, eller stien peger forkert. Et nul her er ikke et pas.',
  );
  process.exit(1);
}

const errors = [];
const meta = (html, attr, key) =>
  new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(html)?.[1];

for (const file of routes) {
  const rel = relative(root, file);
  const html = readFileSync(file, 'utf8');
  const fail = msg => errors.push(`${rel}: ${msg}`);

  const canonicals = html.match(/<link rel="canonical" href="([^"]*)"/g) ?? [];
  if (canonicals.length !== 1) {
    fail(`${canonicals.length} canonical-tags — forventede praecis 1`);
  }
  // exec frem for match: uden /g goer de det samme, men `match` signalerer
  // "find alle" og returnerer noget andet hvis nogen senere tilfoejer flaget.
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

  // Parrene. Det er HER den maalte fejl laa.
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

  // og:image er bevidst udeladt indtil [designer] leverer filen. Er den
  // tilfoejet, skal filen findes: et kort med et doedt billede er vaerre end
  // et kort uden.
  const ogImage = meta(html, 'property', 'og:image');
  if (ogImage) {
    const absolute = /^https?:\/\//.test(ogImage);
    if (absolute && !isOurOrigin(ogImage)) {
      // Maalt aabent da origin-fixet blev lavet: et og:image paa et
      // look-alike-domaene slap igennem, fordi kun LOKALE stier blev
      // kontrolleret. Et delekort der henter sit billede fra en fremmed vaert
      // er ikke vores kort. Skal billedet en dag ligge paa en CDN, skal denne
      // gate aendres BEVIDST — ikke omgaas ved at pege udenfor.
      fail(`og:image ligger uden for ${SITE_ORIGIN}: ${ogImage}`);
    }
    const path = absolute ? new URL(ogImage).pathname : ogImage;
    if (path.startsWith('/') && !existsSync(join(root, path))) {
      fail(`og:image peger paa en fil der ikke findes i outputtet: ${path}`);
    }
  }
}

for (const file of fallbacks) {
  const html = readFileSync(file, 'utf8');
  if (/<link rel="canonical"/.test(html)) {
    errors.push(
      `${relative(root, file)}: fallback-siden har en canonical — den maa den ikke`,
    );
  }
}

if (errors.length) {
  console.error(`✗ flade-metadata: ${errors.length} problem(er)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ flade-metadata: ${routes.length} ruter kontrolleret (canonical, og:url, og/twitter-par), ` +
    `${fallbacks.length} fallback-sider uden canonical.`,
);
