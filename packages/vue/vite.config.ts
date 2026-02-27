import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Add include paths for SCSS imports
        includePaths: [
          resolve(__dirname, '../design-tokens/src'),
          resolve(__dirname, 'node_modules'),
        ],
        // Global SCSS variables/mixins available in all components
        additionalData: `@use "${resolve(__dirname, '../design-tokens/src/index.scss')}" as tokens;`,
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
        '@grundtone/shared',
        '@grundtone/composables',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@grundtone/core': 'GrundtoneCore',
          '@grundtone/shared': 'GrundtoneShared',
          '@grundtone/composables': 'GrundtoneComposables',
        },
      },
    },
  },
});
