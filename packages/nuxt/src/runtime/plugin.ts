import { defineNuxtPlugin } from '#app';

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
  logger.info('Plugin injected by Grundtone UI module');
});
