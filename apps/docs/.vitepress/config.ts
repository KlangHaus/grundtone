import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Grundtone',
  description:
    'Design system documentation for Grundtone - part of KlangHaus infrastructure',

  ignoreDeadLinks: true,

  vite: {
    resolve: {
      dedupe: ['vue'],
    },
    ssr: {
      noExternal: ['@grundtone/design-tokens'],
    },
  },

  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/guide/welcome' },
      { text: 'Design Tokens', link: '/tokens/colors' },
      { text: 'HTML Utilities', link: '/utilities/containers' },
      {
        text: 'Packages',
        items: [
          { text: '@grundtone/design-tokens', link: '/packages/design-tokens' },
          { text: '@grundtone/core', link: '/packages/core' },
          { text: '@grundtone/shared', link: '/packages/shared' },
          { text: '@grundtone/composables', link: '/packages/composables' },
          { text: '@grundtone/ui', link: '/packages/ui' },
          { text: '@grundtone/nuxt', link: '/packages/nuxt' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Welcome', link: '/guide/welcome' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Usage', link: '/guide/usage' },
          ],
        },
        {
          text: 'Concepts',
          items: [
            {
              text: 'Design Tokens vs Utilities',
              link: '/guide/design-tokens-vs-utilities',
            },
          ],
        },
      ],
      '/tokens/': [
        {
          text: 'Foundation',
          items: [
            { text: 'Colors', link: '/tokens/colors' },
            { text: 'Typography', link: '/tokens/typography' },
            { text: 'Spacing', link: '/tokens/spacing' },
            { text: 'Shadows', link: '/tokens/shadows' },
            { text: 'Border Radius', link: '/tokens/border-radius' },
            { text: 'Breakpoints', link: '/tokens/breakpoints' },
            { text: 'Z-Index', link: '/tokens/z-index' },
          ],
        },
      ],
      '/utilities/': [
        {
          text: 'Layout',
          items: [
            { text: 'Containers', link: '/utilities/containers' },
            { text: 'Grid System', link: '/utilities/grid' },
            { text: 'Flexbox', link: '/utilities/flexbox' },
            { text: 'Display', link: '/utilities/display' },
            { text: 'Position', link: '/utilities/position' },
            { text: 'Width', link: '/utilities/width' },
            { text: 'Aspect Ratio', link: '/utilities/aspect-ratio' },
          ],
        },
        {
          text: 'Styling',
          items: [
            { text: 'Background', link: '/utilities/background' },
            { text: 'Spacing', link: '/utilities/spacing' },
            { text: 'Text Align', link: '/utilities/text-align' },
          ],
        },
        {
          text: 'Accessibility',
          items: [{ text: 'Accessibility', link: '/utilities/accessibility' }],
        },
      ],
      '/packages/': [
        {
          text: 'Packages',
          items: [
            {
              text: '@grundtone/design-tokens',
              link: '/packages/design-tokens',
            },
            { text: '@grundtone/core', link: '/packages/core' },
            { text: '@grundtone/shared', link: '/packages/shared' },
            { text: '@grundtone/composables', link: '/packages/composables' },
            { text: '@grundtone/ui', link: '/packages/ui' },
            { text: '@grundtone/nuxt', link: '/packages/nuxt' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/allanasp/grundtone' },
    ],
  },
});
