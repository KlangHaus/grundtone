<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# @grundtone/nuxt

Nuxt 3 module for Grundtone design system.

## Installation

```bash
# Using pnpm
pnpm add -D @grundtone/nuxt

# Using npm
npm install -D @grundtone/nuxt

# Using yarn
yarn add -D @grundtone/nuxt
```

## Usage

Add `@grundtone/nuxt` to your Nuxt modules in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    // Module options
    components: true, // Auto-import components
    composables: true, // Auto-import composables
    prefix: 'Grundtone', // Component name prefix
  },
});
```

## Features

- 🎨 Automatic component registration
- 🔄 Composable auto-imports
- ⚙️ Configurable options
- 🎯 TypeScript support

## Configuration

| Option        | Type      | Default       | Description                                 |
| ------------- | --------- | ------------- | ------------------------------------------- |
| `components`  | `boolean` | `true`        | Whether to automatically import components  |
| `composables` | `boolean` | `true`        | Whether to automatically import composables |
| `prefix`      | `string`  | `'Grundtone'` | Prefix for component names                  |

## TypeScript-konfiguration

Denne pakke bruger en specifik `tsconfig.json`, som udvider rodens `tsconfig.build.json`.
Konfigurationen er tilpasset til Nuxt 3 moduler:

- outDir: `dist`
- rootDir: `src`
- Types genereres automatisk ved build
- module: `NodeNext`
- moduleResolution: `NodeNext`

Dette sikrer korrekt typesætning og kompatibilitet med Nuxt 3 modul-systemet.

Byg pakken med:

```sh
pnpm build
```

## License

MIT

# My Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href] [![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add my-module
```

That's it! You can now use My Module in your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]:
  https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module
[npm-downloads-src]:
  https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
