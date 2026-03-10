import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['../src/module'],
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
  devtools: { enabled: true },
});
