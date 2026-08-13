import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    // 🔴 lcov er IKKE med i @vitest/coverage-v8's standard-reportere (text,
    // html, clover, json). Uden denne linje producerer `pnpm test:coverage`
    // ingen lcov.info i roden — og baade Sonar og codecov leder efter netop
    // den fil.
    //
    // Maalt 2026-08-11: af elleve pakker satte KUN packages/vue lcov, og
    // ci.yml's codecov-step peger paa './coverage/lcov.info,**/coverage/
    // lcov.info'. Rod-filen fandtes ikke, saa uploadet har hentet én pakkes
    // tal og kaldt det repoets. **En rapport der loeber uden data ligner en
    // rapport med daarlige data.**
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
