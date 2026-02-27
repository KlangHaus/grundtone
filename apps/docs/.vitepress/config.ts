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
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Theme Configuration', link: '/guide/theme-configuration' },
      { text: 'Package Architecture', link: '/guide/package-architecture' },
      { text: 'Grid Utility', link: '/guide/grid-utility' },
      { text: 'Open Source', link: '/guide/open-source' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Welcome', link: '/guide/welcome' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Theme Configuration', link: '/guide/theme-configuration' },
            {
              text: 'Package Architecture',
              link: '/guide/package-architecture',
            },
            { text: 'Grid Utility', link: '/guide/grid-utility' },
            { text: 'Open Source & Self-Hosting', link: '/guide/open-source' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/allanasp/grundtone' },
    ],
  },
});
