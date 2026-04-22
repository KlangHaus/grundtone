import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const sharedScss = {
  loadPaths: [
    resolve(__dirname, '../design-system/src'),
    resolve(__dirname, 'node_modules'),
  ],
  additionalData: `@use "${resolve(__dirname, '../design-system/src/lib.scss')}" as tokens;`,
  silenceDeprecations: ['if-function'] as string[],
};

const external = [
  'vue',
  '@grundtone/core',
  '@grundtone/utils',
  '@grundtone/icons',
];

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  css: { preprocessorOptions: { scss: sharedScss } },
  build: {
    // ESM build with preserveModules — each component gets its own JS + CSS.
    // Post-processed by scripts/inject-css-imports.mjs to restore CSS imports
    // that Vite strips in library mode.
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    cssCodeSplit: true,
    minify: false,
    rollupOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // Prevent short variable names (like `h`) that conflict with Vue's
        // `h` function when consumers bundle with Rollup/Vite.
        minifyInternalExports: false,
      },
    },
  },
});
