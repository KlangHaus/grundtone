import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.{js,ts}',
        '**/*.config.{js,ts}',
      ],
    },
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './test-results.xml',
    },
  },
});
