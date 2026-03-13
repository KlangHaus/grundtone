import { iconRegistry } from '@grundtone/icons';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
});
