import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import CodePreview from './components/CodePreview.vue';
import ColorTokens from './components/ColorTokens.vue';
import ButtonDemo from '../../../../packages/vue/src/atoms/Button/demo.vue';
import IconDemo from '../../../../packages/vue/src/atoms/Icon/demo.vue';
import InputDemo from '../../../../packages/vue/src/atoms/Input/demo.vue';
import ToggleDemo from '../../../../packages/vue/src/atoms/Toggle/demo.vue';
import BadgeDemo from '../../../../packages/vue/src/atoms/Badge/demo.vue';
import AlertDemo from '../../../../packages/vue/src/molecules/Alert/demo.vue';
import AnchorLinksDemo from '../../../../packages/vue/src/molecules/AnchorLinks/demo.vue';
import BreadcrumbDemo from '../../../../packages/vue/src/molecules/Breadcrumb/demo.vue';
import CardDemo from '../../../../packages/vue/src/molecules/Card/demo.vue';
import CookieMessageDemo from '../../../../packages/vue/src/molecules/CookieMessage/demo.vue';
import IconGallery from './components/IconGallery.vue';
import SnackEmbed from './components/SnackEmbed.vue';
import { GT_ICON_REGISTRY_KEY } from '../../../../packages/vue/src/atoms/Icon/types';
import { iconRegistry } from '@grundtone/icons';
import { setupColorPreview } from 'vitepress-plugin-color-preview/client';
import DiagramPreview from 'vitepress-plugin-mermaid-diagram/DiagramPreview.vue';
import 'vitepress-plugin-color-preview/style.css';
import 'vitepress-plugin-mermaid-diagram/diagram-dark.css';
import '@grundtone/design-system/dist/index.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
    app.component('CodePreview', CodePreview);
    app.component('ColorTokens', ColorTokens);
    app.component('ButtonDemo', ButtonDemo);
    app.component('IconDemo', IconDemo);
    app.component('InputDemo', InputDemo);
    app.component('ToggleDemo', ToggleDemo);
    app.component('BadgeDemo', BadgeDemo);
    app.component('AlertDemo', AlertDemo);
    app.component('AnchorLinksDemo', AnchorLinksDemo);
    app.component('BreadcrumbDemo', BreadcrumbDemo);
    app.component('CardDemo', CardDemo);
    app.component('CookieMessageDemo', CookieMessageDemo);
    app.component('IconGallery', IconGallery);
    app.component('SnackEmbed', SnackEmbed);
    app.component('DiagramPreview', DiagramPreview);
  },
  setup() {
    onMounted(() => setupColorPreview());
  },
} satisfies Theme;
