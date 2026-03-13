import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-13',
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: {
        primary: '#0059b3',
        primaryLight: '#3381cc',
        primaryDark: '#003a7a',
      },
      dark: {
        primary: '#4dabf7',
        primaryLight: '#74c0fc',
        primaryDark: '#339af0',
      },
    }),
    components: true,
    composables: true,
    prefix: 'GT',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@grundtone/vue/scss/lib" as tokens;`,
        },
      },
    },
  },
  devtools: { enabled: true },
});
