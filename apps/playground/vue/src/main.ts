import { createApp, h } from 'vue';
import '@grundtone/vue/css';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';
import { iconRegistry } from '@grundtone/icons';
import Root from './Root.vue';
import App from './App.vue';

const app = createApp({
  render: () => h(Root, null, { default: () => h(App) }),
});
app.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
app.mount('#app');
