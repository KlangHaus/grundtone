// Post-processes Vite's ESM library output to restore CSS import statements.
//
// Vite library mode extracts CSS from .vue <style> blocks into separate .css
// files but replaces the imports with `/* empty css ... */` comments in the
// JS output. This script:
//
// 1. Walks every .js file in dist/
// 2. If a sibling .css file exists (same basename), prepends `import './Name.css';`
// 3. Strips leftover `/* empty css ... */` comments from index.js
//
// Result: each component's compiled JS auto-imports its CSS as a side effect.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.js')) results.push(full);
  }
  return results;
}

let injected = 0;

for (const jsPath of walk(distDir)) {
  const dir = dirname(jsPath);
  const name = basename(jsPath, '.js').replace('.vue', '');
  const cssPath = resolve(dir, name + '.css');

  if (existsSync(cssPath)) {
    const cssRelative = './' + name + '.css';
    let content = readFileSync(jsPath, 'utf8');

    if (content.includes(cssRelative)) continue;

    content = `import '${cssRelative}';\n${content}`;
    writeFileSync(jsPath, content);
    injected++;
  }
}

// Strip `/* empty css ... */` placeholders from all JS files
for (const jsPath of walk(distDir)) {
  let content = readFileSync(jsPath, 'utf8');
  const cleaned = content.replace(/\/\* empty css\s+\*\/\n?/g, '');
  if (cleaned !== content) {
    writeFileSync(jsPath, cleaned);
  }
}

// Inject base.css into index.js — Vite extracts it as a separate file
// (not matching the index.js name), so the sibling-match loop above misses it.
const indexPath = resolve(distDir, 'index.js');
const baseCssPath = resolve(distDir, 'base.css');
if (existsSync(indexPath) && existsSync(baseCssPath)) {
  let content = readFileSync(indexPath, 'utf8');
  if (!content.includes("'./base.css'")) {
    content = `import './base.css';\n${content}`;
    writeFileSync(indexPath, content);
    injected++;
  }
}

console.log(`✓ Injected CSS imports into ${injected} JS files`);
