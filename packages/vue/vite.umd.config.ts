import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          resolve(__dirname, '../design-system/src'),
          resolve(__dirname, 'node_modules'),
        ],
        additionalData: `@use "${resolve(__dirname, '../design-system/src/lib.scss')}" as tokens;`,
        silenceDeprecations: ['if-function'],
      },
    },
  },
  build: {
    // UMD build — single bundled file for CDN / legacy consumers.
    // Imports @grundtone/design-system/dist/index.css so the full CSS bundle
    // is emitted as dist/index.css (335 KB, same as before).
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index-umd.ts'),
      name: 'GrundtoneUI',
      fileName: () => 'index.umd.js',
      formats: ['umd'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
});
