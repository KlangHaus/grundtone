import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/templates/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['@grundtone/core', 'mjml', 'handlebars', 'html-to-text'],
});
