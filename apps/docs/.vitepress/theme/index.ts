import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CodePreview from './components/CodePreview.vue';
import '@grundtone/design-tokens/dist/index.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
  },
} satisfies Theme;
