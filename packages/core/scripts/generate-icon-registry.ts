// AUTO-GENERATED file generator — do not edit this script's output manually.
// Source of truth: packages/core/src/icons/svg/*.svg

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgDir = resolve(__dirname, '../src/icons/svg');
const outPath = resolve(__dirname, '../src/icons/registry.generated.ts');

interface ParsedIcon {
  name: string;
  viewBox: string;
  body: string;
}

function parseSvg(filename: string): ParsedIcon {
  const name = basename(filename, '.svg');
  const raw = readFileSync(resolve(svgDir, filename), 'utf-8').trim();

  // Extract viewBox
  const viewBoxMatch = raw.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract inner content (everything between <svg ...> and </svg>)
  const body = raw
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  return { name, viewBox, body };
}

// Read all SVG files
const files = readdirSync(svgDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

if (files.length === 0) {
  console.warn('⚠ No SVG files found in', svgDir);
  process.exit(1);
}

const icons = files.map(parseSvg);

// Generate TypeScript
const lines: string[] = [
  '// AUTO-GENERATED — do not edit. Source: packages/core/src/icons/svg/*.svg',
  '// Run: pnpm generate:icons',
  '',
  'export interface IconDefinition {',
  '  /** SVG inner content (paths, circles, etc.) */',
  '  body: string;',
  '  /** SVG viewBox attribute */',
  '  viewBox: string;',
  '}',
  '',
  'export const iconRegistry = {',
];

for (const icon of icons) {
  const escapedBody = icon.body
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  lines.push(`  '${icon.name}': {`);
  lines.push(`    body: '${escapedBody}',`);
  lines.push(`    viewBox: '${icon.viewBox}',`);
  lines.push('  },');
}

lines.push('} as const;');
lines.push('');
lines.push('export type IconName = keyof typeof iconRegistry;');
lines.push('');

writeFileSync(outPath, lines.join('\n'), 'utf-8');

// Format with prettier
execSync(`prettier --write "${outPath}"`, {
  stdio: 'inherit',
  cwd: resolve(__dirname, '..'),
});

console.log(`✓ Generated icon registry with ${icons.length} icons`);
