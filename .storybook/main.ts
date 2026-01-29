import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    '../packages/design-tokens/src/**/*.mdx',
    '../packages/design-tokens/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/composables/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async config => {
    // Add path resolution for @ipeeon packages
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@ipeeon/design-tokens': resolve(
        __dirname,
        '../packages/design-tokens/src',
      ),
      '@ipeeon/core': resolve(__dirname, '../packages/core/src'),
      '@ipeeon/shared': resolve(__dirname, '../packages/shared/src'),
      '@ipeeon/composables': resolve(__dirname, '../packages/composables/src'),
    };

    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
