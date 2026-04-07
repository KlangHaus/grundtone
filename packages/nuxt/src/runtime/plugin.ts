import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import {
  applyThemeToDOM,
  getSystemThemeMode,
  GT_ICON_REGISTRY_KEY,
} from '@grundtone/vue';
import { iconRegistry } from '@grundtone/icons';
import type { Theme } from '@grundtone/core';

export default defineNuxtPlugin({
  name: 'grundtone',
  enforce: 'pre',
  setup(nuxtApp) {
    // Provide icon registry so GTIcon/GTCard nav/GTButton icons work
    nuxtApp.vueApp.provide(GT_ICON_REGISTRY_KEY, iconRegistry);

    const config = useRuntimeConfig().public.grundtone as {
      theme?: { light?: Theme; dark?: Theme };
    };

    if (config?.theme?.light && config?.theme?.dark) {
      const mode = getSystemThemeMode();
      const theme = mode === 'dark' ? config.theme.dark : config.theme.light;
      if (theme) {
        applyThemeToDOM(theme);
      }

      // Listen for system theme changes
      if (import.meta.client) {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', () => {
            const m = getSystemThemeMode();
            const t = m === 'dark' ? config.theme!.dark : config.theme!.light;
            if (t) applyThemeToDOM(t);
          });
      }
    }
  },
});
