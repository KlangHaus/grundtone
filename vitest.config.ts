import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    // 🔴 lcov is NOT among @vitest/coverage-v8's default reporters (text,
    // html, clover, json). Without this line `pnpm test:coverage` writes no
    // lcov.info at the root — and that is the file Sonar (sonar.yml) reads.
    // (ci.yml's Codecov upload was removed 2026-10-25: it was never received.)
    //
    // Measured 2026-08-11: of eleven packages ONLY packages/vue wrote lcov. The
    // root file did not exist, so a report took one package's numbers and
    // called them the repo's. **A report that runs without data looks like a
    // report with bad data.**
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        '**/dist/**',
        '**/node_modules/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/*.test.*',
      ],
    },
  },
});
