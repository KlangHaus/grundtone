// AUTO-GENERATED file generator — do not edit this script's output manually.
// Source of truth: @grundtone/core theme-preset.ts

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultColorPreset, defaultColorPresetDark } from '@grundtone/core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../src/core/_color-defaults.scss');

/** Convert camelCase to kebab-case: surfaceOverlay → surface-overlay */
function toKebab(str: string): string {
  return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
}

/** Format a color value for SCSS (hex stays bare, rgba/etc get quoted) */
function formatValue(v: string): string {
  // Hex values: no quotes needed
  if (/^#[0-9a-fA-F]+$/.test(v)) return v;
  // rgba/other functional values: wrap in unquote() so SCSS treats them as color values
  return v;
}

function buildMap(name: string, colors: Record<string, string>): string {
  const entries = Object.entries(colors).map(([key, val]) => {
    return `  '${toKebab(key)}': ${formatValue(val)}`;
  });
  return `$${name}: (\n${entries.join(',\n')}\n);`;
}

const header = `// AUTO-GENERATED — do not edit. Source: @grundtone/core theme-preset.ts
// Run: pnpm generate:colors
`;

const content = [
  header,
  buildMap('colors-light', defaultColorPreset),
  '',
  buildMap('colors-dark', defaultColorPresetDark),
  '',
].join('\n');

writeFileSync(outPath, content, 'utf-8');
console.log(`✓ Generated ${outPath}`);
