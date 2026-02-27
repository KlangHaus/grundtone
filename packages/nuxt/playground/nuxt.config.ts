import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['../src/module'],
  grundtone: {
    // Required: Configure your brand colors (override only what you need)
    theme: createTheme({
      light: {
        primary: '#0059b3',
        primaryHover: '#004a96',
        primaryActive: '#003a7a',
      },
      dark: {
        primary: '#4dabf7',
        primaryHover: '#74c0fc',
        primaryActive: '#339af0',
      },
    }),
    components: true,
    composables: true,
    prefix: 'Grundtone',
  },
  devtools: { enabled: true },
});
