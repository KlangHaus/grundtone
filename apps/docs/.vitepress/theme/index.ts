import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import CodePreview from './components/CodePreview.vue';
import ColorTokens from './components/ColorTokens.vue';
import ButtonDemo from '../../../../packages/vue/src/atoms/Button/demo.vue';
import IconDemo from '../../../../packages/vue/src/atoms/Icon/demo.vue';
import { setupColorPreview } from 'vitepress-plugin-color-preview/client';
import 'vitepress-plugin-color-preview/style.css';
import '@grundtone/design-system/dist/index.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
    app.component('ColorTokens', ColorTokens);
    app.component('ButtonDemo', ButtonDemo);
    app.component('IconDemo', IconDemo);
  },
  setup() {
    onMounted(() => setupColorPreview());
  },
} satisfies Theme;
