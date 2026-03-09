import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { applyThemeToDOM } from '@grundtone/vue';
import { getSystemThemeMode } from '@grundtone/vue';
import type { Theme } from '@grundtone/core';

// Simple logger for Nuxt plugin
const logger = {
  info: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info(
        '[Grundtone UI Nuxt Plugin]',
        message,
        new Date().toISOString(),
      );
    }
  },
};

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

  logger.info('Plugin injected by Grundtone UI module');
});
