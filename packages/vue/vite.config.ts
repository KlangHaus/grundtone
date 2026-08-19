import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  // 🔴 dts er BÆRENDE, ikke pynt: package.json lover
  // `./dist/types/index.d.ts` i baade `types` og `exports["."].types`, og
  // `vite build` alene emitterer INGEN typer. Maalt 2026-08-19: efter et rent
  // build fandtes nul .d.ts-filer, mens den udgivne 2.23.3 har dem. Et publish
  // ville have kostet enhver TypeScript-forbruger alle typer — TAVST, fordi
  // JS stadig virker. Soeskendepakkerne bruger tsup, som emitterer typer af
  // sig selv; vue kan ikke, fordi tsup ikke laeser .vue-filer.
  plugins: [
    vue(),
    dts({
      // entryRoot er noedvendig: uden den bevarer plugin'et monorepo-stien og
      // emitterer til dist/vue/src/index.d.ts. MED den lander typerne i
      // dist/index.d.ts ved siden af dist/index.js — konventionelt, og det er
      // dét package.json peger paa. (En `outDir: dist/types` respekteres ikke
      // i lib-mode; maalt, saa vi flytter loeftet frem for at kaempe med den.)
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.typecheck.json',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Add include paths for SCSS imports
        includePaths: [
          resolve(__dirname, '../design-system/src'),
          resolve(__dirname, 'node_modules'),
        ],
        // Global SCSS variables/mixins available in all components
        additionalData: `@use "${resolve(__dirname, '../design-system/src/lib.scss')}" as tokens;`,
        // Silence Sass deprecation warnings
        silenceDeprecations: ['if-function'],
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GrundtoneUI',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@grundtone/core', '@grundtone/utils'],
      output: {
        globals: {
          vue: 'Vue',
          '@grundtone/core': 'GrundtoneCore',
          '@grundtone/utils': 'GrundtoneUtils',
        },
      },
    },
  },
});
