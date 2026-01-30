import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Haspen UI',
  description: 'Design system documentation for Haspen UI',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/welcome' },
      { text: 'Design Tokens', link: '/tokens/colors' },
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
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/allanasp/haspen-ui' },
    ],
  },
});
