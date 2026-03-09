import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import CodePreview from './components/CodePreview.vue';
import ColorTokens from './components/ColorTokens.vue';
import { setupColorPreview } from 'vitepress-plugin-color-preview/client';
import 'vitepress-plugin-color-preview/style.css';
import '@grundtone/design-system/dist/index.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
    app.component('ColorTokens', ColorTokens);
  },
  setup() {
    onMounted(() => setupColorPreview());
  },
} satisfies Theme;
