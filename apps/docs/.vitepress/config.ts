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
import { backgroundExamples } from './theme/background-examples';
import { textColorExamples } from './theme/text-color-examples';
import { typographyExamples } from './theme/typography-examples';
import { sizingExamples } from './theme/sizing-examples';
import { opacityExamples } from './theme/opacity-examples';
import { interactivityExamples } from './theme/interactivity-examples';
import { elementExamples } from './theme/element-examples';
import { componentExamples } from './theme/component-examples';

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
  ...backgroundExamples,
  ...textColorExamples,
  ...typographyExamples,
  ...sizingExamples,
  ...opacityExamples,
  ...interactivityExamples,
  ...elementExamples,
  ...componentExamples,
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
              { text: 'Typography', link: '/web/type-system' },
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
              { text: 'Background', link: '/web/background' },
              { text: 'Width', link: '/web/width' },
              { text: 'Sizing', link: '/web/sizing' },
              { text: 'Border & Radius', link: '/web/border' },
              { text: 'Aspect Ratio', link: '/web/aspect-ratio' },
              { text: 'Shadow', link: '/web/shadow' },
              { text: 'Opacity', link: '/web/opacity' },
              { text: 'Interactivity', link: '/web/interactivity' },
              { text: 'Transitions', link: '/web/transitions' },
            ],
          },
          {
            text: 'Text',
            collapsed: true,
            items: [
              { text: 'Headings', link: '/web/text-headings' },
              { text: 'Body Text', link: '/web/text-body' },
              { text: 'Form Text', link: '/web/text-form' },
              { text: 'Highlight Text', link: '/web/text-highlight' },
              { text: 'Text Utilities', link: '/web/text-utilities' },
              { text: 'Font Utilities', link: '/web/font-utilities' },
            ],
          },
          {
            text: 'Links',
            collapsed: true,
            items: [
              { text: 'Links', link: '/web/el-link' },
              { text: 'External Link', link: '/web/c-external-link' },
              { text: 'Function Link', link: '/web/c-function-link' },
              { text: 'Back Link', link: '/web/c-back-link' },
              { text: 'Breadcrumb', link: '/web/c-breadcrumb' },
              { text: 'Skip Link', link: '/web/c-skip-link' },
            ],
          },
          {
            text: 'Elements',
            collapsed: true,
            items: [
              { text: 'Address', link: '/web/el-address' },
              { text: 'Article', link: '/web/el-article' },
              { text: 'Aside', link: '/web/el-aside' },
              { text: 'Blockquote', link: '/web/el-blockquote' },
              { text: 'Body', link: '/web/el-body' },
              { text: 'Button', link: '/web/el-button' },
              { text: 'Description List', link: '/web/el-dl' },
              { text: 'Footer', link: '/web/el-footer' },
              { text: 'Header', link: '/web/el-header' },
              { text: 'Hr', link: '/web/el-hr' },
              { text: 'List', link: '/web/el-list' },
              { text: 'Main', link: '/web/el-main' },
              { text: 'Nav', link: '/web/el-nav' },
              { text: 'Search', link: '/web/el-search' },
              { text: 'Section', link: '/web/el-section' },
            ],
          },
          {
            text: 'Components',
            collapsed: true,
            items: [
              { text: 'Prose', link: '/web/c-prose' },
              { text: 'Callout', link: '/web/c-callout' },
              { text: 'Article Card', link: '/web/c-article-card' },
              { text: 'Article Meta', link: '/web/c-article-meta' },
              { text: 'Author Card', link: '/web/c-author-card' },
              { text: 'Footer', link: '/web/c-footer' },
              { text: 'Header', link: '/web/c-header' },
              { text: 'Product Card', link: '/web/c-product-card' },
              { text: 'Product Gallery', link: '/web/c-product-gallery' },
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
