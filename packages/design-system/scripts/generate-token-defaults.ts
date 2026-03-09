// AUTO-GENERATED file generator — do not edit this script's output manually.
// Source of truth: @grundtone/core theme-preset.ts

import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultColorPreset,
  defaultColorPresetDark,
  defaultSpacing,
  defaultRadius,
  defaultShadows,
  defaultZIndex,
  defaultTransitions,
  defaultTypography,
} from '@grundtone/core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const coreDir = resolve(__dirname, '../src/core');

const HEADER = `// AUTO-GENERATED — do not edit. Source: @grundtone/core theme-preset.ts
// Run: pnpm generate:tokens
`;

/** Convert camelCase to kebab-case: surfaceOverlay → surface-overlay */
function toKebab(str: string): string {
  return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
}

/** Format a color value for SCSS (hex stays bare, rgba/etc stay bare) */
function formatValue(v: string): string {
  if (/^#[0-9a-fA-F]+$/.test(v)) return v;
  return v;
}

/** Build a SCSS map — no trailing comma (matches stylelint/prettier output) */
function buildMap(
  name: string,
  entries: Record<string, string | number>,
): string {
  const items = Object.entries(entries);
  const lines = items.map(([key, val], i) => {
    const comma = i < items.length - 1 ? ',' : '';
    return `  '${toKebab(key)}': ${val}${comma}`;
  });
  return `$${name}: (\n${lines.join('\n')}\n);`;
}

function buildColorMap(name: string, colors: Record<string, string>): string {
  const items = Object.entries(colors);
  const lines = items.map(([key, val], i) => {
    const comma = i < items.length - 1 ? ',' : '';
    return `  '${toKebab(key)}': ${formatValue(val)}${comma}`;
  });
  return `$${name}: (\n${lines.join('\n')}\n);`;
}

function writeFile(filename: string, content: string): void {
  const outPath = resolve(coreDir, filename);
  writeFileSync(outPath, content, 'utf-8');
  console.log(`✓ Generated ${filename}`);
}

// ─── Colors ───────────────────────────────────────────────────────────────────
writeFile(
  '_color-defaults.scss',
  [
    HEADER,
    buildColorMap('colors-light', defaultColorPreset),
    '',
    buildColorMap('colors-dark', defaultColorPresetDark),
    '',
  ].join('\n'),
);

// ─── Spacing ──────────────────────────────────────────────────────────────────
{
  const vars = Object.entries(defaultSpacing)
    .map(([key, val]) => `$spacing-${key}: ${val} !default;`)
    .join('\n');
  const map = buildMap('spacing', defaultSpacing);
  writeFile('_spacing-defaults.scss', [HEADER, vars, '', map, ''].join('\n'));
}

// ─── Radius ───────────────────────────────────────────────────────────────────
{
  const map = buildMap('radii', defaultRadius);
  writeFile('_radius-defaults.scss', [HEADER, map, ''].join('\n'));
}

// ─── Shadows ──────────────────────────────────────────────────────────────────
{
  const items = Object.entries(defaultShadows);
  const lines = items.map(([key, val], i) => {
    const scssVal = val === 'none' ? 'none' : `(${val})`;
    const comma = i < items.length - 1 ? ',' : '';
    return `  '${toKebab(key)}': ${scssVal}${comma}`;
  });
  const map = `$shadows: (\n${lines.join('\n')}\n);`;
  writeFile('_shadow-defaults.scss', [HEADER, map, ''].join('\n'));
}

// ─── Z-Index ──────────────────────────────────────────────────────────────────
{
  const vars = Object.entries(defaultZIndex)
    .map(([key, val]) => `$z-index-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const map = buildMap(
    'z-indices',
    Object.fromEntries(
      Object.entries(defaultZIndex).map(([k, v]) => [toKebab(k), v]),
    ),
  );
  writeFile('_z-index-defaults.scss', [HEADER, vars, '', map, ''].join('\n'));
}

// ─── Transitions ──────────────────────────────────────────────────────────────
{
  const durationVars = Object.entries(defaultTransitions.duration)
    .map(([key, val]) => `$duration-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const durationMap = buildMap(
    'durations',
    Object.fromEntries(
      Object.entries(defaultTransitions.duration).map(([k, v]) => [
        toKebab(k),
        v,
      ]),
    ),
  );

  const timingVars = Object.entries(defaultTransitions.timing)
    .map(([key, val]) => `$ease-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const timingMap = buildMap(
    'timings',
    Object.fromEntries(
      Object.entries(defaultTransitions.timing).map(([k, v]) => [
        toKebab(k),
        v,
      ]),
    ),
  );

  writeFile(
    '_transition-defaults.scss',
    [
      HEADER,
      durationVars,
      '',
      durationMap,
      '',
      timingVars,
      '',
      timingMap,
      '',
    ].join('\n'),
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────
{
  // Font families — quoted for SCSS
  const familyLines = Object.entries(defaultTypography.fontFamily)
    .map(([key, val]) => `$font-family-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const familyMap = buildMap(
    'font-families',
    Object.fromEntries(
      Object.entries(defaultTypography.fontFamily).map(([k, v]) => [
        toKebab(k),
        `(${v})`,
      ]),
    ),
  );

  // Font sizes
  const sizeVars = Object.entries(defaultTypography.fontSize)
    .map(([key, val]) => `$font-size-${key}: ${val} !default;`)
    .join('\n');
  const sizeMap = buildMap('font-sizes', defaultTypography.fontSize);

  // Font weights
  const weightVars = Object.entries(defaultTypography.fontWeight)
    .map(([key, val]) => `$font-weight-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const weightMap = buildMap('font-weights', defaultTypography.fontWeight);

  // Line heights
  const lhVars = Object.entries(defaultTypography.lineHeight)
    .map(([key, val]) => `$line-height-${toKebab(key)}: ${val} !default;`)
    .join('\n');
  const lhMap = buildMap('line-heights', defaultTypography.lineHeight);

  writeFile(
    '_typography-defaults.scss',
    [
      HEADER,
      '// Font families',
      familyLines,
      '',
      familyMap,
      '',
      '// Font sizes',
      sizeVars,
      '',
      sizeMap,
      '',
      '// Font weights',
      weightVars,
      '',
      weightMap,
      '',
      '// Line heights',
      lhVars,
      '',
      lhMap,
      '',
    ].join('\n'),
  );
}

// ─── Format generated files to match prettier/stylelint ──────────────────────
execSync(`prettier --write "${resolve(coreDir, '_*-defaults.scss')}"`, {
  stdio: 'inherit',
  cwd: resolve(__dirname, '..'),
});

console.log('\nAll token defaults generated.');
