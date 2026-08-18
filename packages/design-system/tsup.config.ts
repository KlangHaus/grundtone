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
  // 🔴 Branding — exports-mappet har lovet `./branding` siden entry'en kom
  // ind i package.json, men INGEN build producerede dist/branding.*. Enhver
  // forbruger af @grundtone/design-system/branding fik MODULE_NOT_FOUND —
  // ogsaa fra den udgivne npm-pakke. Fundet af pack-smoke-gaten (C8) i dens
  // allerfoerste koersel: `exports` er et loefte, og indtil nu var der intet
  // der maalte om builden holdt det.
  {
    entry: { branding: 'src/branding.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
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
