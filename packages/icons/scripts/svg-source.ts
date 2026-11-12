// Reads the SVG sources the icon registry is generated from. Repo-side tooling,
// not shipped (files: dist/**): the generator (generate-icon-registry.ts)
// writes registry.generated.ts from it, and registry.test.ts compares the
// committed registry against it. One parser, so the two cannot disagree on
// what a source file means.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, resolve } from 'node:path';

// The order the registry has always had: code-unit order, the default of an
// argument-less sort. Not localeCompare, which could reorder names and change
// the generated file.
function byCodeUnit(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export interface ParsedIcon {
  name: string;
  category: string;
  viewBox: string;
  body: string;
}

export function parseSvg(
  raw: string,
  name: string,
  category: string,
): ParsedIcon {
  const svg = raw.trim();
  const viewBoxMatch = /viewBox="([^"]+)"/.exec(svg);
  const viewBox = viewBoxMatch ? viewBoxMatch[1]! : '0 0 24 24';

  // Inner content (everything between <svg ...> and </svg>), on one line with
  // runs of whitespace collapsed, as it is stored in the registry.
  const body = svg
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()
    .replace(/\s+/g, ' ');

  return { name, category, viewBox, body };
}

/**
 * Every SVG under `dir`, in registry order.
 * Files in `dir` itself → category 'general'; files in `dir/<category>/` → that category.
 */
export function collectSvgs(dir: string): ParsedIcon[] {
  const icons: ParsedIcon[] = [];

  for (const entry of readdirSync(dir).sort(byCodeUnit)) {
    const fullPath = resolve(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      const files = readdirSync(fullPath)
        .filter(f => f.endsWith('.svg'))
        .sort(byCodeUnit);
      for (const file of files) {
        const path = resolve(fullPath, file);
        icons.push(
          parseSvg(readFileSync(path, 'utf-8'), basename(file, '.svg'), entry),
        );
      }
    } else if (entry.endsWith('.svg')) {
      icons.push(
        parseSvg(
          readFileSync(fullPath, 'utf-8'),
          basename(entry, '.svg'),
          'general',
        ),
      );
    }
  }

  return icons;
}
