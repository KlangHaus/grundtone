/**
 * What a published CSS file carries inline, as opposed to as a file.
 *
 * 🔴 WHY (riff KH-1055, from [sikkerhed]'s verdict on #205). The first guard
 * matched the MIME type:
 *
 *     /url\(\s*['"]?data:(font\/|application\/(x-)?font)/
 *
 * so it caught `data:font/woff2` and `data:application/x-font-ttf` — and a font
 * inlined as `data:application/octet-stream` walked straight past it. That is
 * the dangerous shape: the guard answers about the MIME STRING an encoder
 * happened to write, not about the thing we care about, which is a large blob
 * living in the CSS instead of in a file.
 *
 * So the rule is size-first and MIME-second:
 *   · any `url(data:…)` longer than LIMIT offends, whatever it claims to be;
 *   · a font MIME offends at any size, because a font never belongs inline.
 *
 * MEASURED 2026-09-19 on the published CSS: **15** `url(data:…)` — 5 in
 * @grundtone/design-system's index.css and 10 in @grundtone/vue's — every one
 * `image/svg+xml`, the largest **261 bytes**. (pack-smoke prints 30 because it
 * reaches the same two files through two specifiers each.) So legitimate inline
 * assets are not hypothetical, and a rule of "no data: url at all" would fail on
 * fifteen icons on day one. LIMIT sits ~15x above the largest real one and two
 * orders of magnitude below the #205 regression (~140 kB of base64 fonts inside
 * @grundtone/vue's CSS).
 *
 * 🔴 That count corrects an earlier sweep of mine that reported 0. Its
 * hand-rolled regex disagreed with this one, and the plausible-looking zero
 * survived until the guard printed its own denominator. A green that says what
 * it looked at is why the caller logs `inlineSeen` even when nothing offends.
 */

/** Bytes of CSS a single `url(data:…)` may occupy before it counts as a blob. */
export const INLINE_LIMIT = 4096;

/** A font never belongs inline, at any size. */
const FONT_MIME = /^(font\/|application\/(x-)?font)/i;

// Quoted forms are read to their closing quote rather than to the first ')':
// a percent-decoded inline SVG legitimately contains parentheses, and a regex
// that stops at ')' would UNDER-measure exactly the payloads that matter.
const URL_TOKEN =
  /url\(\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|([^)\s]*))\s*\)/g;

/**
 * @param {string} css
 * @returns {{url: string, mime: string, bytes: number}[]} every inline asset,
 *   offending or not — the denominator a caller should print.
 */
export function dataUrls(css) {
  const found = [];
  for (const m of css.matchAll(URL_TOKEN)) {
    const url = m[1] ?? m[2] ?? m[3] ?? '';
    if (!url.startsWith('data:')) continue;
    const mime = url.slice('data:'.length).split(/[;,]/)[0];
    found.push({ url, mime, bytes: url.length });
  }
  return found;
}

/**
 * @param {string} css
 * @param {number} [limit]
 * @returns {{mime: string, bytes: number, reason: string}[]} the ones that fail
 */
export function offendingInlineAssets(css, limit = INLINE_LIMIT) {
  return dataUrls(css)
    .map(({ mime, bytes }) => {
      if (FONT_MIME.test(mime))
        return { mime, bytes, reason: `a font is inlined as ${mime}` };
      if (bytes > limit)
        return {
          mime,
          bytes,
          reason: `${bytes} bytes inlined as ${mime || 'an unnamed type'}, limit is ${limit}`,
        };
      return null;
    })
    .filter(entry => entry !== null);
}
