/**
 * Does the generated static site still carry its error page?
 *
 * 🔴 WHY THIS ASKS ABOUT THE BUNDLE AND NOT ABOUT 404.html (riff KH-916).
 * The obvious check — "404.html contains the error text" — is FALSE here, and
 * measured to be false before this file was written. `nuxi generate` writes
 * 404.html as an SPA FALLBACK: a 2.2 kB shell with an empty `<div id="__nuxt">`
 * and a module script. The error page is rendered by the CLIENT after hydration.
 *
 * Measured on the live site the same day:
 *
 *   curl https://grundtone.com/this-path-does-not-exist-kh916
 *   -> status=404, 2516 bytes, visible text = the document title only
 *
 * So a guard that grepped the HTML would have reported the error page missing
 * on a build where it works perfectly, and — worse — could be "fixed" by
 * someone prerendering something into 404.html that no visitor ever sees.
 * The honest question for a client-rendered page is whether the build SHIPS it:
 * the shell must load a module, and the emitted JavaScript must contain the
 * error page.
 *
 * DECLARED BLIND SPOT: this says the page is in the build, not that a browser
 * paints it. That was verified by hand against a static server for #KH-916
 * (404 path -> code 404, title "This page is off the staff", the site header
 * and footer present; `/` still renders the landing page). Automating it needs
 * a served build, which this job does not have.
 */

/**
 * @param {object} input
 * @param {string} input.fallbackHtml     the generated 404.html
 * @param {string[]} input.bundleSources  contents of the emitted .js files
 * @param {string[]} input.markers        strings the error page must contribute
 * @returns {{ok: boolean, problems: string[], checked: number}}
 */
export function errorPageInBuild({
  fallbackHtml,
  bundleSources,
  markers = [],
}) {
  const problems = [];

  if (!/<div id="__nuxt">/.test(fallbackHtml))
    problems.push(
      '404.html is not a Nuxt client shell — did the build change?',
    );

  if (!/<script[^>]+src="[^"]+\.js"/.test(fallbackHtml))
    problems.push(
      '404.html loads no module script, so a client-rendered error page could never appear',
    );

  // 🔴 The denominator. With no bundles read, every marker check below would
  // pass vacuously — the exact shape of a guard that is armed against nothing.
  if (bundleSources.length === 0)
    problems.push(
      'no emitted JavaScript was read; the marker check would be vacuous',
    );

  if (markers.length === 0)
    problems.push('no markers given; this guard would assert nothing');

  for (const marker of markers) {
    if (!bundleSources.some(source => source.includes(marker)))
      problems.push(`no emitted bundle contains ${JSON.stringify(marker)}`);
  }

  return { ok: problems.length === 0, problems, checked: bundleSources.length };
}
