import { defineConfig } from 'vitepress';
import { createHighlighter } from 'shiki';
import type { Plugin } from 'vite';
import { gridExamples } from './theme/grid-examples';

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
      for (const [name, code] of Object.entries(gridExamples)) {
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

  vite: {
    plugins: [codePreviewHighlightPlugin()],
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
      { text: 'Breakpoints', link: '/guide/breakpoints' },
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
            { text: 'Breakpoints', link: '/guide/breakpoints' },
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
