import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { diagramPlugin } from 'vitepress-plugin-mermaid-diagram';
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

export default defineConfig({
  title: 'Grundtone',
  description:
    'Design system documentation for Grundtone - part of KlangHaus infrastructure',

  ignoreDeadLinks: true,

  markdown: {
    config(md) {
      md.use(colorPreviewPlugin);
      md.use(diagramPlugin, {
        preview: true,
        theme: {
          // Match Grundtone light palette
          processFill: '#dbeafe',
          processStroke: '#0059b3',
          decisionFill: '#fef3c7',
          decisionStroke: '#b45309',
          terminalFill: '#dcfce7',
          terminalStroke: '#16a34a',
          dataFill: '#f3e8ff',
          dataStroke: '#7c3aed',
          nodeTextColor: '#212529',
          edgeColor: '#6b7280',
          edgeLabelColor: '#4b5563',
          edgeLabelBg: '#ffffff',
          arrowColor: '#6b7280',
          // Sequence
          participantFill: '#dbeafe',
          participantStroke: '#0059b3',
          participantTextColor: '#212529',
          // Class
          classHeaderFill: '#0059b3',
          classHeaderTextColor: '#ffffff',
          classBodyFill: '#f8f9fa',
          classStroke: '#0059b3',
          classTextColor: '#212529',
        },
      });
    },
    codeTransformers: [colorPreviewTransformer()],
  },

  vite: {
    plugins: [codePreviewHighlightPlugin()],
    resolve: {
      dedupe: ['vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${resolve(__dirname, '../../../packages/design-system/src/lib.scss')}" as tokens;`,
          silenceDeprecations: ['if-function'],
        },
      },
    },
    ssr: {
      noExternal: ['@grundtone/design-system'],
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
      {
        text: 'Frameworks',
        items: [
          { text: 'Vue / Nuxt', link: '/vue/installation' },
          { text: 'React Native', link: '/react-native/colors' },
        ],
      },
      { text: 'Icons', link: '/icons/' },
      { text: 'Design System', link: '/web/colors' },
      {
        text: 'Core Concepts',
        items: [
          {
            text: 'Package Architecture',
            link: '/core/package-architecture',
          },
          { text: 'Open Source & Self-Hosting', link: '/core/open-source' },
          { text: 'Third-Party Acknowledgements', link: '/core/third-party' },
          { text: 'Changelog', link: '/changelog' },
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
            {
              text: 'Theme Configuration',
              link: '/guide/theme-configuration',
            },
            {
              text: 'Branding Configuration',
              link: '/guide/branding-configuration',
            },
            {
              text: 'Component Prefix',
              link: '/guide/prefix',
            },
          ],
        },
      ],
      '/vue/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Vue 3', link: '/vue/installation' },
            { text: 'Nuxt 3', link: '/vue/nuxt' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Accordion', link: '/vue/accordion' },
            { text: 'Alert', link: '/vue/alert' },
            { text: 'Back Link', link: '/vue/back-link' },
            { text: 'Back to Top', link: '/vue/back-to-top' },
            { text: 'Anchor Links', link: '/vue/anchor-links' },
            { text: 'Badge', link: '/vue/badge' },
            { text: 'Breadcrumb', link: '/vue/breadcrumb' },
            { text: 'Button', link: '/vue/button' },
            { text: 'Card', link: '/vue/card' },
            { text: 'Carousel', link: '/vue/carousel' },
            { text: 'Chart', link: '/vue/chart' },
            { text: 'Cookie Message', link: '/vue/cookie-message' },
            { text: 'Details', link: '/vue/details' },
            { text: 'Error Page', link: '/vue/error-page' },
            { text: 'Modal', link: '/vue/modal' },
            { text: 'Overflow Menu', link: '/vue/overflow-menu' },
            { text: 'Skip Link', link: '/vue/skip-link' },
            { text: 'Spinner', link: '/vue/spinner' },
            { text: 'Stepper', link: '/vue/stepper' },
            { text: 'Summary List', link: '/vue/summary-list' },
            { text: 'Table', link: '/vue/table' },
            { text: 'Tabs', link: '/vue/tabs' },
            { text: 'Tag', link: '/vue/tag' },
            { text: 'Toast', link: '/vue/toast' },
            { text: 'Tooltip', link: '/vue/tooltip' },
          ],
        },
        {
          text: 'Forms',
          collapsed: true,
          items: [
            { text: 'Address Input', link: '/vue/address-input' },
            { text: 'Autocomplete', link: '/vue/autocomplete' },
            { text: 'Checkbox', link: '/vue/checkbox' },
            { text: 'Checkbox Group', link: '/vue/checkbox-group' },
            { text: 'Date Input', link: '/vue/date-input' },
            { text: 'Date Picker', link: '/vue/date-picker' },
            { text: 'File Upload', link: '/vue/file-upload' },
            { text: 'Input', link: '/vue/input' },
            { text: 'OTP Input', link: '/vue/otp-input' },
            { text: 'Password Input', link: '/vue/password-input' },
            { text: 'Radio Group', link: '/vue/radio-group' },
            { text: 'Search Field', link: '/vue/search-field' },
            { text: 'Select', link: '/vue/select' },
            { text: 'Textarea', link: '/vue/textarea' },
            { text: 'Toggle', link: '/vue/toggle' },
          ],
        },
        {
          text: 'Composables',
          items: [
            { text: 'Overview', link: '/vue/composables' },
            { text: 'useTheme', link: '/vue/use-theme' },
            { text: 'useField', link: '/vue/use-field' },
            { text: 'useDateField', link: '/vue/use-date-field' },
            { text: 'useFormValidation', link: '/vue/use-form-validation' },
          ],
        },
      ],
      '/icons/': [
        {
          text: 'Icons',
          items: [
            { text: 'Overview', link: '/icons/' },
            { text: 'Custom Icons', link: '/icons/custom-icons' },
          ],
        },
        {
          text: 'Framework Usage',
          items: [
            { text: 'Vue / Nuxt', link: '/icons/vue' },
            { text: 'React Native', link: '/icons/react-native' },
            { text: 'CSS Utilities', link: '/icons/css' },
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
            { text: 'Back to Top', link: '/web/c-back-to-top' },
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
            { text: 'Accordion', link: '/web/c-accordion' },
            { text: 'Alert', link: '/web/c-alert' },
            { text: 'Anchor Links', link: '/web/c-anchor-links' },
            { text: 'Badge', link: '/web/c-badge' },
            { text: 'Card', link: '/web/c-card' },
            { text: 'Carousel', link: '/web/c-carousel' },
            { text: 'Chart', link: '/web/c-chart' },
            { text: 'Cookie Message', link: '/web/c-cookie-message' },
            { text: 'Details', link: '/web/c-details' },
            { text: 'Error Page', link: '/web/c-error-page' },
            { text: 'Figure', link: '/web/c-figure' },
            { text: 'Footer', link: '/web/c-footer' },
            { text: 'Header', link: '/web/c-header' },
            { text: 'Image', link: '/web/c-image' },
            { text: 'Meta', link: '/web/c-meta' },
            { text: 'Modal', link: '/web/c-modal' },
            { text: 'Overflow Menu', link: '/web/c-overflow-menu' },
            { text: 'Prose', link: '/web/c-prose' },
            { text: 'Spinner', link: '/web/c-spinner' },
            { text: 'Stepper', link: '/web/c-stepper' },
            { text: 'Summary List', link: '/web/c-summary-list' },
            { text: 'Table', link: '/web/c-table' },
            { text: 'Tabs', link: '/web/c-tabs' },
            { text: 'Tag', link: '/web/c-tag' },
            { text: 'Toast', link: '/web/c-toast' },
            { text: 'Tooltip', link: '/web/c-tooltip' },
          ],
        },
        {
          text: 'Forms',
          collapsed: true,
          items: [
            { text: 'Autocomplete', link: '/web/c-autocomplete' },
            { text: 'Checkbox', link: '/web/c-checkbox' },
            { text: 'Date Input', link: '/web/c-date-input' },
            { text: 'Date Picker', link: '/web/c-date-picker' },
            { text: 'Fieldset', link: '/web/c-fieldset' },
            { text: 'File Upload', link: '/web/c-file-upload' },
            { text: 'Input', link: '/web/c-input' },
            { text: 'OTP Input', link: '/web/c-otp-input' },
            { text: 'Password Input', link: '/web/c-password-input' },
            { text: 'Radio', link: '/web/c-radio' },
            { text: 'Search Field', link: '/web/c-search-field' },
            { text: 'Select', link: '/web/c-select' },
            { text: 'Textarea', link: '/web/c-textarea' },
          ],
        },
        {
          text: 'JavaScript',
          items: [{ text: 'Behaviors (Vanilla JS)', link: '/web/behaviors' }],
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
          text: 'Components',
          items: [
            { text: 'Accordion', link: '/react-native/c-accordion' },
            { text: 'Address Input', link: '/react-native/c-autocomplete' },
            { text: 'Alert', link: '/react-native/c-alert' },
            { text: 'Badge', link: '/react-native/c-badge' },
            { text: 'Button', link: '/react-native/c-button' },
            { text: 'Details', link: '/react-native/c-details' },
            { text: 'Card', link: '/react-native/c-card' },
            { text: 'Input', link: '/react-native/c-input' },
            { text: 'Tabs', link: '/react-native/c-tabs' },
            { text: 'Toggle', link: '/react-native/c-toggle' },
          ],
        },
        {
          text: 'React Native',
          items: [
            { text: 'Alert (API)', link: '/react-native/alert' },
            { text: 'Colors', link: '/react-native/colors' },
            { text: 'Branding', link: '/react-native/branding' },
            { text: 'Typography', link: '/react-native/typography' },
            { text: 'Spacing', link: '/react-native/spacing' },
            { text: 'Border Radius', link: '/react-native/radius' },
            { text: 'Shadows', link: '/react-native/shadows' },
            { text: 'Z-Index', link: '/react-native/z-index' },
            { text: 'Transitions', link: '/react-native/transitions' },
            { text: 'Position', link: '/react-native/position' },
            { text: 'Input (API)', link: '/react-native/input' },
          ],
        },
        {
          text: 'Hooks',
          items: [
            { text: 'Overview', link: '/react-native/hooks' },
            {
              text: 'useGrundtoneTheme',
              link: '/react-native/use-grundtone-theme',
            },
            { text: 'useField', link: '/react-native/use-field' },
            {
              text: 'useFormValidation',
              link: '/react-native/use-form-validation',
            },
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
      { icon: 'github', link: 'https://github.com/grundtone/grundtone' },
    ],
  },
});
