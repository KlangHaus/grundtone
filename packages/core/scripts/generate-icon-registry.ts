// AUTO-GENERATED file generator — do not edit this script's output manually.
// Source of truth: packages/core/src/icons/svg/**/*.svg

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgDir = resolve(__dirname, '../src/icons/svg');
const outPath = resolve(__dirname, '../src/icons/registry.generated.ts');

interface ParsedIcon {
  name: string;
  category: string;
  viewBox: string;
  body: string;
}

function parseSvg(filepath: string, category: string): ParsedIcon {
  const name = basename(filepath, '.svg');
  const raw = readFileSync(filepath, 'utf-8').trim();

  // Extract viewBox
  const viewBoxMatch = raw.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract inner content (everything between <svg ...> and </svg>)
  const body = raw
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  return { name, category, viewBox, body };
}

/**
 * Recursively collect SVG files from svgDir.
 * Files in svgDir root → category 'general'.
 * Files in svgDir/{category}/ → that category name.
 */
function collectSvgs(dir: string): ParsedIcon[] {
  const icons: ParsedIcon[] = [];
  const entries = readdirSync(dir).sort();

  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Subdirectory = category
      const categoryName = entry;
      const subFiles = readdirSync(fullPath)
        .filter(f => f.endsWith('.svg'))
        .sort();
      for (const file of subFiles) {
        icons.push(parseSvg(resolve(fullPath, file), categoryName));
      }
    } else if (entry.endsWith('.svg')) {
      // Root-level SVG = 'general' category
      icons.push(parseSvg(fullPath, 'general'));
    }
  }

  return icons;
}

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
  '// AUTO-GENERATED — do not edit. Source: packages/core/src/icons/svg/**/*.svg',
  '// Run: pnpm generate:icons',
  '',
  'export interface IconDefinition {',
  '  /** SVG inner content (paths, circles, etc.) */',
  '  body: string;',
  '  /** SVG viewBox attribute */',
  '  viewBox: string;',
  '  /** Category derived from subdirectory name */',
  '  category: string;',
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
