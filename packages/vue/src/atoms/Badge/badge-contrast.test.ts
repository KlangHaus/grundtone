// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { measure } from './badge-contrast';

// 🔴 Contrast of every TINTED badge variant, computed on the BUILT CSS that
// ships in the tarball (dist/index.css), in light AND dark mode.
//
// Why built CSS and not the SCSS: the published file is what consumers get,
// and the same construction lives under two prefixes there — `.gt-badge--*`
// (this component) and `.badge--*` (design-system's stylesheet, bundled in).
// The defect (KH-1121, ClickUp 869fbfz77) was eight rules using the status
// token as both the 14 % tint AND the text: 1.51-3.78:1 in light mode.
//
// The cell reports its own denominator: every rule shaped
// `background: color-mix(in srgb, var(--color-X) N%, transparent); color: var(--color-Y)`
// under a badge prefix. If that count drops, a variant stopped being measured.
// It needs `dist/` (turbo runs `build` before `test`).

const CSS_PATH = fileURLToPath(
  new URL('../../../dist/index.css', import.meta.url),
);
const AA_NORMAL_TEXT = 4.5;
const VARIANTS = ['info', 'success', 'warning', 'error'] as const;
const PREFIXES = ['gt-badge', 'badge'] as const;

describe('🔴 tinted badge variants meet WCAG AA in the published CSS', () => {
  const css = readFileSync(CSS_PATH, 'utf8');
  const rows = measure(css);

  it('measures every tinted variant under both prefixes (the denominator)', () => {
    const measured = new Set(rows.map(r => r.selector));
    for (const p of PREFIXES)
      for (const v of VARIANTS) expect(measured).toContain(`.${p}--${v}`);
    expect(measured.size).toBe(PREFIXES.length * VARIANTS.length);
    expect(rows).toHaveLength(PREFIXES.length * VARIANTS.length * 2);
  });

  it('every tinted variant is >= 4.5:1 in light and dark mode', () => {
    const failing = rows
      .filter(r => r.ratio < AA_NORMAL_TEXT)
      .map(r => `${r.selector} (${r.mode}) ${r.ratio.toFixed(2)}:1`);
    expect(failing, `below ${AA_NORMAL_TEXT}:1`).toEqual([]);
  });
});

describe('the instrument itself', () => {
  it('reproduces the published 3.2.1 defect: the status token as its own text fails', () => {
    // Positive control for the calculator, from [quality]'s measurement on
    // @grundtone/vue@3.2.1: warning 1.51:1, info 1.76:1 in light mode.
    const css =
      '--color-background:var(--lightningcss-light,#fff)var(--lightningcss-dark,#121212);' +
      '--color-warning:var(--lightningcss-light,#ffc107)var(--lightningcss-dark,#ffd43b);' +
      '--color-info:var(--lightningcss-light,#0dcaf0)var(--lightningcss-dark,#4dabf7);' +
      '}.gt-badge--warning{background:color-mix(in srgb, var(--color-warning) 14%, transparent);color:var(--color-warning)}' +
      '}.gt-badge--info{background:color-mix(in srgb, var(--color-info) 14%, transparent);color:var(--color-info)}';
    const light = measure(css).filter(r => r.mode === 'light');
    expect(
      light.find(r => r.selector === '.gt-badge--warning')!.ratio,
    ).toBeCloseTo(1.51, 1);
    expect(
      light.find(r => r.selector === '.gt-badge--info')!.ratio,
    ).toBeCloseTo(1.76, 1);
  });
});
