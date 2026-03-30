import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { applyThemeToDOM, getSystemThemeMode } from '@grundtone/vue';
import type { Theme } from '@grundtone/core';

export default defineNuxtPlugin(_nuxtApp => {
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
});
