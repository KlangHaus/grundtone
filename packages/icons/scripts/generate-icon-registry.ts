// AUTO-GENERATED file generator — do not edit this script's output manually.
// Source of truth: packages/icons/src/icons/svg/**/*.svg

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { collectSvgs } from './svg-source';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgDir = resolve(__dirname, '../src/icons/svg');
const outPath = resolve(__dirname, '../src/icons/registry.generated.ts');

const icons = collectSvgs(svgDir);

if (icons.length === 0) {
  console.warn('⚠ No SVG files found in', svgDir);
  process.exit(1);
}

// Check for duplicate names across categories
const seen = new Map<string, string>();
for (const icon of icons) {
  const existing = seen.get(icon.name);
  if (existing) {
    console.error(
      `✗ Duplicate icon name "${icon.name}" in categories "${existing}" and "${icon.category}"`,
    );
    process.exit(1);
  }
  seen.set(icon.name, icon.category);
}

// Collect unique categories in order
const categories = [...new Set(icons.map(i => i.category))];

// Generate TypeScript
const lines: string[] = [
  '// AUTO-GENERATED — do not edit. Source: packages/icons/src/icons/svg/**/*.svg',
  '// Run: pnpm generate:icons',
  '',
  'export interface IconDefinition {',
  '  body: string;',
  '  viewBox: string;',
  '  category?: string;',
  '}',
  '',
  'export const iconRegistry = {',
];

for (const icon of icons) {
  const escapedBody = icon.body.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  lines.push(`  '${icon.name}': {`);
  lines.push(`    body: '${escapedBody}',`);
  lines.push(`    viewBox: '${icon.viewBox}',`);
  lines.push(`    category: '${icon.category}',`);
  lines.push('  },');
}

lines.push('} as const;');
lines.push('');
lines.push('export type IconName = keyof typeof iconRegistry;');
lines.push('');
lines.push(
  `export const iconCategories = ${JSON.stringify(categories)} as const;`,
);
lines.push('');
lines.push('export type IconCategory = (typeof iconCategories)[number];');
lines.push('');

writeFileSync(outPath, lines.join('\n'), 'utf-8');

// Format with prettier
execSync(`prettier --write "${outPath}"`, {
  stdio: 'inherit',
  cwd: resolve(__dirname, '..'),
});

console.log(
  `✓ Generated icon registry with ${icons.length} icons in ${categories.length} categories`,
);
