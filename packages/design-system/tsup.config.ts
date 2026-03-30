import { defineConfig } from 'tsup';

export default defineConfig([
  // Existing: token exports (UNCHANGED)
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
  },
  // Behaviors ESM + CJS
  {
    entry: { behaviors: 'src/behaviors/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
  },
  // Behaviors UMD for CDN
  {
    entry: { 'behaviors.umd': 'src/behaviors/index.ts' },
    format: ['iife'],
    globalName: 'Grundtone',
    dts: false,
    sourcemap: true,
    clean: false,
    minify: true,
  },
]);
