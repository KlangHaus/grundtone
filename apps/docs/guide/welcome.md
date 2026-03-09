# Welcome to Grundtone

Grundtone is a platform-agnostic design system. The same **semantic theme** (colors, spacing,
typography) powers your UI on **Vue**, **Nuxt**, and **React Native**.

- **Semantic colors** – Use tokens like `primary`, `background`, `text` instead of hex values.
  Configure once with `createTheme()` to match your brand.
- **Self-hosting** – Fork the repo, change the default colors in
  [`theme-preset.ts`](/guide/theme-configuration#changing-the-default-colors-self-hosting), rebuild,
  and every package ships with your brand out of the box.
- **Open source (MIT)** – Use it, fork it, self-host it, and customize the design. See
  [Open Source & Self-Hosting](/core/open-source).

## Choose Your Framework

| Framework        | Package                  | What you get                                   |
| ---------------- | ------------------------ | ---------------------------------------------- |
| **Vue 3**        | @grundtone/vue           | Components, ThemeProvider, design tokens, SCSS |
| **Nuxt 3**       | @grundtone/nuxt          | Auto-setup: components, composables, theme     |
| **React Native** | @grundtone/react-native  | ThemeProvider, useGrundtoneTheme, tokens       |
| **Plain Web**    | @grundtone/design-system | Design tokens only (CSS, SCSS), no components  |

## Next Steps

- [Install for your framework →](/guide/installation)
- [Theme configuration →](/guide/theme-configuration)
- [Grid utility →](/web/grid-utility)
- [Package architecture →](/core/package-architecture)
- [Open source & self-hosting →](/core/open-source)
