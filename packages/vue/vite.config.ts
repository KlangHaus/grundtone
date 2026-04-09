import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      rollupTypes: true,
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
      external: [
        'vue',
        '@grundtone/core',
        '@grundtone/utils',
        '@grundtone/icons',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@grundtone/core': 'GrundtoneCore',
          '@grundtone/utils': 'GrundtoneUtils',
          '@grundtone/icons': 'GrundtoneIcons',
        },
      },
    },
  },
});
