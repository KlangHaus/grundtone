# Welcome to Grundtone

Grundtone is a **platform-agnostic** design system. The same semantic tokens (colors, spacing,
typography) power your UI whether you build with **Vue**, **Nuxt**, or **React Native**.

## How It Works

### One Theme, Many Platforms

You configure your brand once with `createTheme()` from `@grundtone/core`:

```typescript
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: { primary: '#your-brand' },
  dark: { primary: '#your-brand-dark' },
});
```

Then you pass that theme to the right provider for your platform:

- **Web (Vue/Nuxt)**: ThemeProvider writes CSS variables to the DOM; components use
  `var(--grundtone-color-primary)`.
- **React Native**: GrundtoneThemeProvider exposes the theme object; you use `theme.colors.primary`
  in StyleSheet.

### Package Overview

| Package                  | Platform     | What it does                                  |
| ------------------------ | ------------ | --------------------------------------------- |
| @grundtone/core          | All          | Theme data, createTheme(), types              |
| @grundtone/design-tokens | Web only     | SCSS, CSS utilities, grid (not needed for RN) |
| @grundtone/vue           | Vue web      | Components (Button, Icon, ThemeProvider)      |
| @grundtone/nuxt          | Nuxt 3       | Auto-setup for Vue + theme                    |
| @grundtone/react-native  | React Native | ThemeProvider, useGrundtoneTheme hook         |

See [Package Architecture](/guide/package-architecture) for a full breakdown.

## Choose Your Platform

Install Grundtone for your stack:

### Vue 3 (standalone)

Use Vue components and design tokens on web.

→ [Install for Vue](/guide/installation#vue-3)

### Nuxt 3

Automatic setup: components, composables, and theme config.

→ [Install for Nuxt](/guide/installation#nuxt-3)

### React Native

Theme provider and hook. No SCSS or CSS.

→ [Install for React Native](/guide/installation#react-native)

### Plain Web (no framework)

Design tokens only: SCSS and CSS. No Vue components.

→ [Install for Plain Web](/guide/installation#plain-web)

## Next Steps

1. **[Install for your platform](/guide/installation)** – Follow the guide for Vue, Nuxt, React
   Native, or plain web.
2. **[Configure your theme](/guide/theme-configuration)** – Customize colors with createTheme().
3. **[Explore tokens](/tokens/colors)** – Colors, typography, spacing.
4. **[Browse packages](/packages/vue)** – Components and APIs.
5. **[Self-host & customize](/guide/self-hosting-customization)** – Fork, rebrand, or host on your
   own registry.

## Philosophy

- **Open source (MIT)**: Fork, self-host, and adapt to your brand and infrastructure.
- **Explicit theme config**: You choose colors. No passive defaults.
- **Semantic tokens**: Use `primary`, `text`, `surface` – not raw hex values.
- **Platform-agnostic core**: Same theme structure everywhere.
