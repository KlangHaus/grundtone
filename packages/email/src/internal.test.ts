import { describe, it, expect } from 'vitest';
import { compact, remToPx } from './internal';

// The previous implementations, kept here as the reference the new ones must
// agree with on every input below.
const previousRemToPx = (value: string, base = 16): string => {
  const v = value.trim();
  const rem = /^(-?\d*\.?\d+)rem$/.exec(v);
  if (rem) return `${Math.round(parseFloat(rem[1]!) * base)}px`;
  const em = /^(-?\d*\.?\d+)em$/.exec(v);
  if (em) return `${Math.round(parseFloat(em[1]!) * base)}px`;
  return v;
};
const previousCompact = (mjml: string): string =>
  mjml
    .split('\n')
    .map(l => l.replace(/\s+$/, ''))
    .filter(l => l.trim() !== '')
    .join('\n');

/** Every string up to `depth` characters long over `alphabet`. */
function strings(alphabet: string[], depth: number): string[] {
  const out = [''];
  for (let i = 0, start = 0; i < depth; i++) {
    const end = out.length;
    for (let j = start; j < end; j++)
      for (const c of alphabet) out.push(out[j] + c);
    start = end;
  }
  return out;
}

describe('remToPx', () => {
  it('converts rem and em, and passes other units through', () => {
    expect(remToPx('1rem')).toBe('16px');
    expect(remToPx('.5rem')).toBe('8px');
    expect(remToPx('-0.25em')).toBe('-4px');
    expect(remToPx('1.5rem', 10)).toBe('15px');
    expect(remToPx(' 12px ')).toBe('12px');
    expect(remToPx('1.rem')).toBe('1.rem');
  });

  it('gives the same result as before for every short input', () => {
    const inputs = strings(['-', '1', '.', 'x', ' '], 6).flatMap(s => [
      `${s}rem`,
      `${s}em`,
      s,
    ]);
    const converted = inputs.filter(s => previousRemToPx(s) !== s.trim());
    // Not a vacuous comparison: some inputs are converted at all.
    expect(converted.length).toBeGreaterThan(20);
    const differ = inputs.filter(s => remToPx(s) !== previousRemToPx(s));
    expect(differ).toEqual([]);
  });

  it('handles a very long value promptly', () => {
    const started = performance.now();
    expect(remToPx(`${'1'.repeat(200_000)}x`)).toBe(`${'1'.repeat(200_000)}x`);
    expect(performance.now() - started).toBeLessThan(1000);
  });
});

describe('compact', () => {
  it('drops blank lines and trailing whitespace, as before', () => {
    const src = 'a  \n\n  b\t\n  \n c  \n';
    expect(compact(src)).toBe(previousCompact(src));
    expect(compact(src)).toBe('a\n  b\n c');
  });

  it('handles a very long line promptly', () => {
    const line = `a${' '.repeat(200_000)}b`;
    const started = performance.now();
    expect(compact(line)).toBe(line);
    expect(performance.now() - started).toBeLessThan(1000);
  });
});
