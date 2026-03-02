import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import CodePreview from './components/CodePreview.vue';
import { setupColorPreview } from 'vitepress-plugin-color-preview/client';
import 'vitepress-plugin-color-preview/style.css';
import '@grundtone/design-tokens/dist/index.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
  },
  setup() {
    onMounted(() => setupColorPreview());
  },
} satisfies Theme;
