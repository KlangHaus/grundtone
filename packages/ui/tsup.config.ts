import { defineConfig } from 'tsup';
import { vuePreset } from '@ipeeon/shared';

export default defineConfig(_options => {
  const preset = vuePreset({
    entry: ['src/index.ts'],
    clean: true,
    sourcemap: true,
    format: ['cjs', 'esm'],
    external: ['vue'],
  });

  return {
    ...preset,
    dts: true,
    splitting: false,
  };
});
