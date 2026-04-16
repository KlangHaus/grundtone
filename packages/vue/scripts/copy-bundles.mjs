// Copies standalone CSS bundles from @grundtone/design-system into dist/.
// These are NOT auto-imported — they're opt-in imports for consumers:
//   import '@grundtone/vue/css/utilities'

import { cpSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copies = [
  {
    src: resolve(__dirname, '../../design-system/dist/utilities.css'),
    dest: resolve(__dirname, '../dist/utilities.css'),
  },
];

let total = 0;
for (const { src, dest } of copies) {
  if (existsSync(src)) {
    cpSync(src, dest);
    total += statSync(dest).size;
  } else {
    console.warn(`⚠ Missing: ${src}`);
  }
}

// Rename UMD CSS output (vue.css → index.css) so the ./css export works
const vueCss = resolve(__dirname, '../dist/vue.css');
const indexCss = resolve(__dirname, '../dist/index.css');
if (existsSync(vueCss)) {
  cpSync(vueCss, indexCss);
  const { unlinkSync } = await import('node:fs');
  unlinkSync(vueCss);
}

console.log(`✓ Copied bundles (${(total / 1024).toFixed(1)} KB)`);
