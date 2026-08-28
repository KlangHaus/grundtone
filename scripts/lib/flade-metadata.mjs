// Kontrol af flade-metadata paa grundtone.com. Ren logik — intet filsystem,
// ingen process.exit. CLI-skallen er `scripts/assert-flade-metadata.mjs`.
//
// 🔴 Hvorfor kontrollen maaler det BYGGEDE HTML og ikke kilden: da den blev
// skrevet, satte siderne kun `og:title`. I kilden saa det komplet ud. I
// outputtet beholdt `twitter:title` den site-brede ENGELSKE default, saa
// /studio serverede en dansk og:title og en engelsk twitter:title for samme
// side. Den uoverensstemmelse findes ikke i nogen enkelt fil — kun i
// resultatet af at flette nuxt.config og siden.

const SITE = 'https://grundtone.com';

// 🔴 Sammenlign ORIGIN, ikke praefiks. `startsWith(SITE)` accepterer
// `https://grundtone.com.andet-domaene.dk/` og `https://grundtone.comfoo/` —
// ANDRE domaener der bare deler de foerste tegn. Fundet af CodeQL
// (js/incomplete-url-substring-sanitization) i foerste version; det er en
// korrektheds-fejl, ikke kun en sikkerhedsnit.
const SITE_ORIGIN = new URL(SITE).origin;

function isOurOrigin(url) {
  try {
    return new URL(url).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

// 200.html/404.html er SPA-fallbacks. De SKAL ikke have canonical: en fejlside
// der haevder et kanonisk URL beder om at blive indekseret som det.
const FALLBACKS = new Set(['200.html', '404.html']);

/**
 * @param files  [{ rel, html }] — ruter OG fallback-sider
 * @param existsInOutput  (sti) => bool, saa og:image-tjekket kan proeves uden
 *                        et rigtigt filsystem
 */
const meta = (html, attr, key) =>
  new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(html)?.[1];

// Én funktion pr. regel. Sonar S3776 klagede over kognitiv kompleksitet 45
// mod 15 tilladt, men opdelingen er bedre af en anden grund end tallet:
// hver regel kan laeses og aendres for sig, og testfilen har allerede én
// test pr. regel — nu staar de to i samme forhold.

function checkCanonical(html, fail) {
  const canonicals = html.match(/<link rel="canonical" href="([^"]*)"/g) ?? [];
  if (canonicals.length !== 1) {
    fail(`${canonicals.length} canonical-tags — forventede praecis 1`);
  }
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  if (canonical && !isOurOrigin(canonical)) {
    fail(`canonical peger uden for ${SITE_ORIGIN}: ${canonical}`);
  }
  return canonical;
}

function checkOgUrl(html, canonical, fail) {
  const ogUrl = meta(html, 'property', 'og:url');
  if (!ogUrl) fail('mangler og:url');
  if (canonical && ogUrl && canonical !== ogUrl) {
    fail(`canonical (${canonical}) og og:url (${ogUrl}) er uenige`);
  }
}

function checkRequiredOg(html, fail) {
  for (const key of ['og:type', 'og:site_name', 'og:locale']) {
    if (!meta(html, 'property', key)) fail(`mangler ${key}`);
  }
}

// Parrene. Det er HER den maalte fejl laa: og:title sat uden twitter:title,
// saa de to kort viste hver sin titel for samme side.
function checkCardPairs(html, fail) {
  for (const [og, tw] of [
    ['og:title', 'twitter:title'],
    ['og:description', 'twitter:description'],
  ]) {
    const a = meta(html, 'property', og);
    const b = meta(html, 'name', tw);
    if (!a) fail(`mangler ${og}`);
    if (!b) fail(`mangler ${tw}`);
    if (a && b && a !== b)
      fail(`${og} og ${tw} er uenige: ${og}=${a} / ${tw}=${b}`);
  }
}

// og:image er bevidst udeladt indtil [designer] leverer filen. Er den
// tilfoejet, skal den ligge hos os OG findes: et kort med et doedt eller
// fremmed billede er vaerre end et kort uden.
function checkOgImage(html, existsInOutput, fail) {
  const ogImage = meta(html, 'property', 'og:image');
  if (!ogImage) return;
  const absolute = /^https?:\/\//.test(ogImage);
  if (absolute && !isOurOrigin(ogImage)) {
    fail(`og:image ligger uden for ${SITE_ORIGIN}: ${ogImage}`);
  }
  const path = absolute ? new URL(ogImage).pathname : ogImage;
  if (path.startsWith('/') && !existsInOutput(path)) {
    fail(`og:image peger paa en fil der ikke findes i outputtet: ${path}`);
  }
}

/**
 * @param files  [{ rel, html }] — ruter OG fallback-sider
 * @param existsInOutput  (sti) => bool, saa og:image-tjekket kan proeves uden
 *                        et rigtigt filsystem
 */
export function checkFladeMetadata(files, existsInOutput) {
  const routeFiles = files.filter(f => !FALLBACKS.has(f.rel));
  const fallbackFiles = files.filter(f => FALLBACKS.has(f.rel));
  const errors = [];
  const result = () => ({
    errors,
    routes: routeFiles.length,
    fallbacks: fallbackFiles.length,
  });

  // 🔴 Positiv kontrol: uden den ville en tom eller flyttet output-mappe give
  // nul filer og dermed nul fejl — gaten ville melde groent uden at maale noget.
  if (routeFiles.length < 2) {
    errors.push(
      `fandt kun ${routeFiles.length} rute-HTML — forventede mindst 2. Enten er outputtet tomt, eller stien peger forkert.`,
    );
    return result();
  }

  for (const { rel, html } of routeFiles) {
    const fail = msg => errors.push(`${rel}: ${msg}`);
    const canonical = checkCanonical(html, fail);
    checkOgUrl(html, canonical, fail);
    checkRequiredOg(html, fail);
    checkCardPairs(html, fail);
    checkOgImage(html, existsInOutput, fail);
  }

  for (const { rel, html } of fallbackFiles) {
    if (/<link rel="canonical"/.test(html)) {
      errors.push(`${rel}: fallback-siden har en canonical — den maa den ikke`);
    }
  }

  return result();
}
