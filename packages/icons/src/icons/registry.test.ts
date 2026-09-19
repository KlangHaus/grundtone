import { describe, expect, it } from 'vitest';
import { readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { iconRegistry } from './registry.generated';

const svgRoot = join(__dirname, 'svg');

function svgFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(entry => {
    const full = join(dir, entry);
    return statSync(full).isDirectory()
      ? svgFiles(full)
      : entry.endsWith('.svg')
        ? [full]
        : [];
  });
}

// The registry keeps only viewBox and the inner body. The Icon components
// (vue atoms/Icon/Icon.vue, react-native components/Icon/Icon.tsx) apply the
// set's look on the root: stroke-width 1.5, round caps and joins, fill none.
// The attributes on each source file's own <svg> root are therefore NOT what
// renders (cookie.svg says stroke-width 2 and renders at 1.5). What would
// change the look is a BODY element carrying its own presentation attribute,
// e.g. a glyph pasted with stroke-width="2" on a path.
const PRESENTATION_ATTRS =
  /\s(stroke-width|stroke-linecap|stroke-linejoin|stroke|fill)=/;
describe('icon set', () => {
  const files = svgFiles(svgRoot);

  it('has a source file for every registry entry and vice versa', () => {
    expect(files.length).toBeGreaterThan(0);
    expect(files.map(f => basename(f, '.svg')).sort()).toEqual(
      Object.keys(iconRegistry).sort(),
    );
  });

  it('includes the studio nav icons (Feather, [designer] 2026-09-17)', () => {
    for (const name of [
      'home',
      'folder',
      'users',
      'list',
      'key',
      'credit-card',
      'settings',
    ]) {
      const icon = iconRegistry[name as keyof typeof iconRegistry];
      expect(icon, name).toBeDefined();
      expect(icon.body.length, name).toBeGreaterThan(0);
      expect(icon.body, name).not.toMatch(/<svg|<\/svg>/);
    }
  });

  it.each(Object.entries(iconRegistry))(
    '%s renders with the set look (24px grid, no overrides)',
    (_, icon) => {
      expect(icon.viewBox).toBe('0 0 24 24');
      expect(icon.body).not.toMatch(PRESENTATION_ATTRS);
    },
  );
});
