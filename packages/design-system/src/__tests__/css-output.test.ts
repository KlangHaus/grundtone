// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { compile } from 'sass';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Compiles the real entry the build compiles (src/index.scss → dist/index.css)
// and checks what consumers get, not the partials.
const pkg = resolve(__dirname, '../..');
const css = compile(join(pkg, 'src/index.scss'), {
  silenceDeprecations: ['if-function'],
}).css;
const distDir = join(pkg, 'dist');

describe('IBM Plex @font-face (self-hosted)', () => {
  const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(m => m[1]!);
  const urls = faces.flatMap(f =>
    [...f.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]!),
  );

  it('declares the families the typography tokens name first, with swap', () => {
    expect(faces).toHaveLength(7);
    expect(faces.filter(f => f.includes('"IBM Plex Sans"'))).toHaveLength(4);
    expect(faces.filter(f => f.includes('"IBM Plex Mono"'))).toHaveLength(3);
    for (const f of faces) expect(f).toContain('font-display: swap');
  });

  it('points every url at a vendored file, relative to dist/index.css', () => {
    expect(urls).toHaveLength(7);
    for (const u of urls) {
      expect(u).not.toMatch(/^(https?:)?\/\//); // never a CDN
      expect(existsSync(resolve(distDir, u)), u).toBe(true);
    }
  });
});

describe('hover utilities', () => {
  const base = (prefix: string) =>
    new Set(
      [...css.matchAll(new RegExp(`^\\.(${prefix}-[a-z0-9-]+) \\{`, 'gm'))].map(
        m => m[1]!,
      ),
    );
  const hover = (prefix: string) =>
    new Set(
      [
        ...css.matchAll(
          new RegExp(`^\\.hover\\\\:(${prefix}-[a-z0-9-]+):hover \\{`, 'gm'),
        ),
      ].map(m => m[1]!),
    );

  it.each(['bg', 'text'])(
    'every base %s-* colour utility has a hover:* twin',
    prefix => {
      const b = base(prefix);
      expect(b.size).toBeGreaterThan(5);
      const h = hover(prefix);
      // text-* also covers non-colour utilities (sizes, alignment) without hover;
      // every hover rule must mirror an existing base rule, and the colour set
      // (bg-surface-alt, text-primary, …) must be present.
      for (const name of h) expect(b.has(name), name).toBe(true);
      expect(h.size).toBeGreaterThan(5);
    },
  );

  it('emits the classes studio relies on', () => {
    expect(css).toMatch(
      /^\.hover\\:bg-surface-alt:hover \{\s*background-color: var\(--color-surface-alt\);/m,
    );
    expect(css).toMatch(
      /^\.hover\\:text-primary:hover \{\s*color: var\(--color-primary\);/m,
    );
  });
});
