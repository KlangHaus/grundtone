import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { createHighlighter } from 'shiki';
import type { Plugin } from 'vite';
import {
  colorPreviewPlugin,
  colorPreviewTransformer,
} from 'vitepress-plugin-color-preview';
import { gridExamples } from './theme/grid-examples';
import { containerExamples } from './theme/container-examples';
import { columnExamples } from './theme/column-examples';
import { spacingExamples } from './theme/spacing-examples';
import { zIndexExamples } from './theme/z-index-examples';
import { borderExamples } from './theme/border-examples';
import { aspectRatioExamples } from './theme/aspect-ratio-examples';
import { transitionExamples } from './theme/transition-examples';
import { shadowExamples } from './theme/shadow-examples';

/** All code examples merged */
const allExamples: Record<string, string> = {
  ...gridExamples,
  ...containerExamples,
  ...columnExamples,
  ...spacingExamples,
  ...zIndexExamples,
  ...borderExamples,
  ...aspectRatioExamples,
  ...transitionExamples,
  ...shadowExamples,
};

/**
 * Vite plugin that provides a virtual module with pre-highlighted code examples.
 * Runs shiki at build time (Node), so the client receives ready-to-render HTML
 * with no runtime shiki dependency.
 */
function codePreviewHighlightPlugin(): Plugin {
  const virtualId = 'virtual:highlighted-examples';
  const resolvedId = '\0' + virtualId;

  return {
    name: 'vitepress-code-preview-highlight',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    async load(id) {
      if (id !== resolvedId) return;

      const highlighter = await createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['html'],
      });

      const highlighted: Record<string, { dark: string; light: string }> = {};
      for (const [name, code] of Object.entries(allExamples)) {
        highlighted[name] = {
          dark: highlighter.codeToHtml(code, {
            lang: 'html',
            theme: 'github-dark',
          }),
          light: highlighter.codeToHtml(code, {
            lang: 'html',
            theme: 'github-light',
          }),
        };
      }

      highlighter.dispose();
      return `export const highlightedExamples = ${JSON.stringify(highlighted)};`;
    },
  };
}

export default withMermaid(
  defineConfig({
    title: 'Grundtone',
    description:
      'Design system documentation for Grundtone - part of KlangHaus infrastructure',

    ignoreDeadLinks: true,

    markdown: {
      config(md) {
        md.use(colorPreviewPlugin);
      },
      codeTransformers: [colorPreviewTransformer()],
    },

    vite: {
      plugins: [codePreviewHighlightPlugin()],
      resolve: {
        dedupe: ['vue'],
      },
      ssr: {
        noExternal: ['@grundtone/design-tokens'],
      },
    },

    head: [
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
    ],

    themeConfig: {
      logo: '/logo.png',

      nav: [
        { text: 'Getting Started', link: '/guide/welcome' },
        { text: 'Web', link: '/web/colors' },
        { text: 'React Native', link: '/react-native/colors' },
        { text: 'Core Concepts', link: '/core/package-architecture' },
        { text: 'Changelog', link: '/changelog' },
      ],

      sidebar: {
        '/guide/': [
          {
            text: 'Getting Started',
            items: [
              { text: 'Welcome', link: '/guide/welcome' },
              { text: 'Installation', link: '/guide/installation' },
              {
                text: 'Theme Configuration',
                link: '/guide/theme-configuration',
              },
              {
                text: 'Branding Configuration',
                link: '/guide/branding-configuration',
              },
            ],
          },
        ],
        '/web/': [
          {
            text: 'Colors & Theming',
            items: [
              { text: 'Colors & Theming', link: '/web/colors' },
              { text: 'Branding', link: '/web/branding' },
            ],
          },
          {
            text: 'Layout',
            items: [
              { text: 'Breakpoints', link: '/web/breakpoints' },
              { text: 'Containers', link: '/web/containers' },
              { text: 'Grid', link: '/web/grid-utility' },
              { text: 'Columns & Layout', link: '/web/columns' },
            ],
          },
          {
            text: 'Utilities',
            items: [
              { text: 'Spacing & Visibility', link: '/web/spacing' },
              { text: 'Position', link: '/web/position' },
              { text: 'Z-Index', link: '/web/z-index' },
              { text: 'Text Alignment', link: '/web/text-align' },
              { text: 'Width', link: '/web/width' },
              { text: 'Border & Radius', link: '/web/border' },
              { text: 'Aspect Ratio', link: '/web/aspect-ratio' },
              { text: 'Shadow', link: '/web/shadow' },
              { text: 'Transitions', link: '/web/transitions' },
            ],
          },
          {
            text: 'SCSS & Reference',
            items: [
              { text: 'CSS Custom Properties', link: '/web/custom-properties' },
              { text: 'SCSS Functions', link: '/web/functions' },
              { text: 'SCSS Mixins', link: '/web/mixins' },
              { text: 'Accessibility', link: '/web/accessibility' },
            ],
          },
        ],
        '/react-native/': [
          {
            text: 'React Native',
            items: [
              { text: 'Colors', link: '/react-native/colors' },
              { text: 'Branding', link: '/react-native/branding' },
              { text: 'Typography', link: '/react-native/typography' },
              { text: 'Spacing', link: '/react-native/spacing' },
              { text: 'Border Radius', link: '/react-native/radius' },
              { text: 'Shadows', link: '/react-native/shadows' },
              { text: 'Z-Index', link: '/react-native/z-index' },
              { text: 'Transitions', link: '/react-native/transitions' },
              { text: 'Position', link: '/react-native/position' },
            ],
          },
        ],
        '/core/': [
          {
            text: 'Core Concepts',
            items: [
              {
                text: 'Package Architecture',
                link: '/core/package-architecture',
              },
              {
                text: 'Open Source & Self-Hosting',
                link: '/core/open-source',
              },
              {
                text: 'Third-Party Acknowledgements',
                link: '/core/third-party',
              },
              { text: 'Changelog', link: '/changelog' },
            ],
          },
        ],
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/allanasp/grundtone' },
      ],
    },
  }),
);
