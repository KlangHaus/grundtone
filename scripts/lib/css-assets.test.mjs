import { describe, expect, it } from 'vitest';

import {
  dataUrls,
  INLINE_LIMIT,
  offendingInlineAssets,
} from './css-assets.mjs';

/** A data: url of a given MIME whose total length exceeds `bytes`. */
const blob = (mime, bytes) =>
  `data:${mime};base64,${'A'.repeat(Math.max(0, bytes - mime.length - 20))}`;

const css = url => `@font-face{font-family:x;src:url("${url}")}`;

describe('offendingInlineAssets', () => {
  // 🔴 THE CELL THE OLD GUARD DID NOT HAVE (riff KH-1055). The MIME-matching
  // regex caught data:font/... and data:application/x-font-... — an encoder
  // that writes application/octet-stream defeated it completely.
  it('catches a font inlined as application/octet-stream', () => {
    const found = offendingInlineAssets(
      css(blob('application/octet-stream', 30_000)),
    );
    expect(found).toHaveLength(1);
    expect(found[0].reason).toContain('limit is');
  });

  it('still catches the MIME types the old guard caught, at any size', () => {
    for (const mime of ['font/woff2', 'application/font-woff', 'font/ttf']) {
      const found = offendingInlineAssets(css(blob(mime, 200)));
      expect(found, mime).toHaveLength(1);
      expect(found[0].reason, mime).toContain('a font is inlined');
    }
  });

  it('catches a large blob whose type is not named at all', () => {
    expect(offendingInlineAssets(css(blob('', 30_000)))).toHaveLength(1);
  });

  // 🔴 THE NEGATIVE CONTROL. Without this the guard could pass every cell above
  // by failing on any data: url whatsoever, and a legitimate inline icon would
  // turn the gate into noise that someone eventually switches off.
  it('leaves a small inline SVG icon alone', () => {
    const icon =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E';
    expect(offendingInlineAssets(`.i{background:url("${icon}")}`)).toEqual([]);
  });

  it('says nothing about a CSS file that inlines nothing', () => {
    const plain = '@font-face{src:url("./fonts/ibm-plex/Regular.woff2")}';
    expect(offendingInlineAssets(plain)).toEqual([]);
    expect(dataUrls(plain)).toEqual([]);
  });

  // The boundary is asserted from both sides, so a change to INLINE_LIMIT that
  // silently disarms the rule cannot pass.
  it('fails just above the limit and passes just below it', () => {
    const under = `data:image/png;base64,${'A'.repeat(INLINE_LIMIT - 30)}`;
    const over = `data:image/png;base64,${'A'.repeat(INLINE_LIMIT + 30)}`;
    expect(offendingInlineAssets(css(under))).toEqual([]);
    expect(offendingInlineAssets(css(over))).toHaveLength(1);
  });
});

describe('dataUrls', () => {
  // 🔴 A regex that stops at the first ')' under-measures a percent-decoded
  // inline SVG — and under-measuring is the direction that lets a blob through.
  it('reads a quoted url past the parentheses inside it', () => {
    // Single quotes inside, double quotes as the CSS delimiter — how an inline
    // SVG is actually written, and the parentheses in the path data are real.
    const svg = `data:image/svg+xml,<svg><path d='M0,0 C(1)'/></svg>${'x'.repeat(INLINE_LIMIT)}`;
    const [found] = dataUrls(`.i{background:url("${svg}")}`);
    expect(found.bytes).toBe(svg.length);
    expect(offendingInlineAssets(`.i{background:url("${svg}")}`)).toHaveLength(
      1,
    );
  });

  it('reads unquoted and single-quoted urls too', () => {
    expect(
      dataUrls(`.a{background:url(data:image/png;base64,AAA)}`),
    ).toHaveLength(1);
    expect(
      dataUrls(`.a{background:url('data:image/png;base64,AAA')}`),
    ).toHaveLength(1);
  });

  it('counts every inline asset, so a caller can print its denominator', () => {
    const two = `.a{background:url("${blob('image/png', 100)}")}.b{background:url("${blob('image/gif', 100)}")}`;
    expect(dataUrls(two)).toHaveLength(2);
  });
});
