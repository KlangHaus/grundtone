# Third-Party Acknowledgements

Grundtone is built on top of excellent open-source software. This page lists the third-party libraries each package depends on at runtime and the key tools used during development.

## Runtime Dependencies

### @grundtone/core

| Library | License | Purpose |
|---|---|---|
| [Vue](https://vuejs.org/) | MIT | Peer dependency — reactive theme types |

### @grundtone/design-system

No external runtime dependencies. Produces standalone CSS/SCSS output.

### @grundtone/vue

| Library | License | Purpose |
|---|---|---|
| [Vue](https://vuejs.org/) | MIT | Peer dependency — component framework |

### @grundtone/react-native

| Library | License | Purpose |
|---|---|---|
| [React](https://react.dev/) | MIT | Peer dependency — component model |
| [React Native](https://reactnative.dev/) | MIT | Peer dependency — native runtime |

### @grundtone/nuxt

| Library | License | Purpose |
|---|---|---|
| [@nuxt/kit](https://nuxt.com/) | MIT | Nuxt module API |

### @grundtone/composables

| Library | License | Purpose |
|---|---|---|
| [Vue](https://vuejs.org/) | MIT | Peer dependency — composition API |

### @grundtone/utils

| Library | License | Purpose |
|---|---|---|
| [Vue](https://vuejs.org/) | MIT | Peer dependency — reactivity system |

---

## Documentation Site

| Library | License | Purpose |
|---|---|---|
| [VitePress](https://vitepress.dev/) | MIT | Static site generator |
| [Mermaid](https://mermaid.js.org/) | MIT | Diagrams in markdown |
| [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) | MIT | Mermaid integration for VitePress |
| [vitepress-plugin-color-preview](https://github.com/allanasp/vitepress-plugin-color-preview) | MIT | Color swatch tables and inline previews |

---

## Build & Development Tooling

| Tool | License | Purpose |
|---|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Apache-2.0 | Type system |
| [Vite](https://vite.dev/) | MIT | Dev server and bundler |
| [tsup](https://tsup.egoist.dev/) | MIT | Library bundling (CJS + ESM + DTS) |
| [Sass](https://sass-lang.com/) | MIT | SCSS compilation |
| [PostCSS](https://postcss.org/) | MIT | CSS processing |
| [Turbo](https://turbo.build/) | MIT | Monorepo task runner |

### Quality & Linting

| Tool | License | Purpose |
|---|---|---|
| [ESLint](https://eslint.org/) | MIT | JavaScript/TypeScript linting |
| [Prettier](https://prettier.io/) | MIT | Code formatting |
| [Stylelint](https://stylelint.io/) | MIT | CSS/SCSS linting |
| [vue-tsc](https://github.com/vuejs/language-tools) | MIT | Vue type checking |

### Testing

| Tool | License | Purpose |
|---|---|---|
| [Vitest](https://vitest.dev/) | MIT | Unit testing |
| [Playwright](https://playwright.dev/) | Apache-2.0 | Browser testing |
| [jsdom](https://github.com/jsdom/jsdom) | MIT | DOM environment for tests |

### Git & Release

| Tool | License | Purpose |
|---|---|---|
| [Changesets](https://github.com/changesets/changesets) | MIT | Versioning and changelogs |
| [Husky](https://typicode.github.io/husky/) | MIT | Git hooks |
| [lint-staged](https://github.com/lint-staged/lint-staged) | MIT | Pre-commit linting |
| [commitlint](https://commitlint.js.org/) | MIT | Commit message enforcement |

### Utilities

| Tool | License | Purpose |
|---|---|---|
| [sharp](https://sharp.pixelplumbing.com/) | Apache-2.0 | Logo variant generation |
| [rimraf](https://github.com/isaacs/rimraf) | ISC | Cross-platform file removal |

---

## License Summary

All runtime dependencies use permissive open-source licenses:

| License | Count | Examples |
|---|---|---|
| MIT | 24 | Vue, React, Vite, ESLint |
| Apache-2.0 | 3 | TypeScript, Playwright, sharp |
| ISC | 1 | rimraf |
