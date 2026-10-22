// Pure contrast arithmetic for the tinted badge variants (see
// badge-contrast.test.ts). Not part of the component and not exported from
// the package; kept apart from the test so it can be run on its own.

export type Mode = 'light' | 'dark';
export type Rgb = [number, number, number];

export function hex(h: string): Rgb {
  const v = h.replace('#', '');
  const full = v.length === 3 ? [...v].map(c => c + c).join('') : v;
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

/** `--color-x: var(--lightningcss-light,#aaa)var(--lightningcss-dark,#bbb)` -> both values. */
export function tokens(css: string): Map<string, Record<Mode, Rgb>> {
  const out = new Map<string, Record<Mode, Rgb>>();
  const re =
    /--color-([a-z-]+):var\(--lightningcss-light,(#[0-9a-fA-F]{3,6})\)var\(--lightningcss-dark,(#[0-9a-fA-F]{3,6})\)/g;
  for (const m of css.matchAll(re)) {
    if (!out.has(m[1]!))
      out.set(m[1]!, { light: hex(m[2]!), dark: hex(m[3]!) });
  }
  return out;
}

export interface TintedRule {
  selector: string;
  tint: string;
  percent: number;
  text: string;
}

/** Every badge rule that tints with one token and colours its text with a token. */
export function tintedRules(css: string): TintedRule[] {
  const re =
    /(?:^|[}\s,])\.((?:gt-)?badge--[a-z]+)\{background:color-mix\(in srgb,\s*var\(--color-([a-z-]+)\)\s*(\d+)%,\s*transparent\);color:var\(--color-([a-z-]+)\)\}/g;
  return [...css.matchAll(re)].map(m => ({
    selector: `.${m[1]}`,
    tint: m[2]!,
    percent: Number(m[3]),
    text: m[4]!,
  }));
}

export function luminance([r, g, b]: Rgb): number {
  const ch = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

/** color-mix(in srgb, tint P%, transparent) composited over the page background. */
export function chip(tint: Rgb, percent: number, page: Rgb): Rgb {
  const a = percent / 100;
  return tint.map((c, i) => c * a + page[i]! * (1 - a)) as Rgb;
}

export function measure(css: string) {
  const t = tokens(css);
  const page = t.get('background');
  if (!page) throw new Error('--color-background not found in the built CSS');
  return tintedRules(css).flatMap(rule =>
    (['light', 'dark'] as const).map(mode => {
      const tint = t.get(rule.tint)?.[mode];
      const text = t.get(rule.text)?.[mode];
      if (!tint || !text)
        throw new Error(
          `${rule.selector}: token not found (${rule.tint}/${rule.text})`,
        );
      return {
        selector: rule.selector,
        mode,
        ratio: contrast(text, chip(tint, rule.percent, page[mode])),
      };
    }),
  );
}
