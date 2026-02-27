export default defineNuxtConfig({
  modules: ['../src/module'],
  grundtone: {
    components: true,
    composables: true,
    prefix: 'Grundtone',
  },
  devtools: { enabled: true },
});
