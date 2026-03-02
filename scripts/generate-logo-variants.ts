/**
 * Generate logo variants from the source logo.
 *
 * Input:  assets/logo/logo.png (1080×1080)
 * Output: packages/core/assets/logo*.png (6 variants)
 *
 * Usage: npx tsx scripts/generate-logo-variants.ts
 */

import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SOURCE = resolve(root, 'assets/logo/logo.png');
const OUT_DIR = resolve(root, 'packages/core/assets');

const VARIANTS = [
  { name: 'logo-512x512.png', size: 512 },
  { name: 'logo-192x192.png', size: 192 },
  { name: 'logo-180x180.png', size: 180 },
  { name: 'logo-32x32.png', size: 32 },
  { name: 'logo-16x16.png', size: 16 },
] as const;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // Copy source as primary logo
  await copyFile(SOURCE, resolve(OUT_DIR, 'logo.png'));
  console.log('  logo.png (1080×1080 — source copy)');

  // Generate resized variants
  for (const { name, size } of VARIANTS) {
    await sharp(SOURCE).resize(size, size).png().toFile(resolve(OUT_DIR, name));
    console.log(`  ${name} (${size}×${size})`);
  }

  console.log(`\nDone — 6 files written to packages/core/assets/`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
