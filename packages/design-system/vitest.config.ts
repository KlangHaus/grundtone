import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/behaviors/__tests__/**/*.test.ts'],
    passWithNoTests: true,
  },
});
