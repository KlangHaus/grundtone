# Color System & Theme Configuration

How the color system works and how to change the theme in each package. See
[Installation](/guide/installation) for setup steps.

---

## How the Color System Works

Grundtone uses **semantic color tokens** – names like `primary`, `background`, `text` – instead of
raw hex values. Your app uses these names; the actual colors come from the theme you configure.

### Semantic Color Keys

| Token                                                                                | Purpose                         |
| ------------------------------------------------------------------------------------ | ------------------------------- |
| `primary`, `primaryHover`, `primaryActive`, `onPrimary`                              | Primary actions, links, buttons |
| `secondary`, `secondaryHover`, `secondaryActive`                                     | Secondary actions               |
| `success`, `successBg`, `error`, `errorBg`, `warning`, `warningBg`, `info`, `infoBg` | Status and feedback             |
| `background`, `surface`, `surfaceHover`                                              | Backgrounds                     |
| `text`, `textSecondary`, `textTertiary`                                              | Text colors                     |
| `border`, `borderHover`                                                              | Borders                         |
| `focus`, `focusRing`                                                                 | Focus states                    |
| `neutral`                                                                            | Neutral UI elements             |

### createTheme()

All packages use `createTheme()` from `@grundtone/core` to build themes. Override only what you
need; the rest uses defaults.

```ts
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    primary: '#0059b3',
    primaryHover: '#004a96',
    primaryActive: '#003a7a',
    onPrimary: '#ffffff',
    // Override any semantic color
  },
  dark: {
    primary: '#4dabf7',
    primaryHover: '#74c0fc',
    primaryActive: '#339af0',
    onPrimary: '#121212',
  },
});
```

### Web vs. React Native

| Platform                       | How colors work                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Web** (Vue, Nuxt, Plain Web) | Theme is applied as CSS custom properties on `:root`. Use `var(--color-*)` or rely on components that read them.  |
| **React Native**               | No CSS. Colors come from the theme object via `useGrundtoneTheme()`. Use `theme.colors.primary` in `style` props. |

### CSS Variables (Web)

On web, the theme is applied as CSS custom properties on `:root`:

```css
--color-primary
--color-primary-hover
--color-background
--color-text
/* etc. */
```

Use them in your styles:

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
```

---

## Changing the Theme by Package

### Vue 3

**Where:** `ThemeProvider` in `App.vue`

**How:** Pass a `theme` prop. Use separate `light` and `dark` overrides for proper dark mode
support, or a single partial theme if both modes should share the same overrides.

**Recommended: separate light and dark themes** (same pattern as Nuxt/React Native):

```vue
<template>
  <ThemeProvider :theme="myTheme" mode="auto">
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';
  import { createTheme } from '@grundtone/core';

  const { light, dark } = createTheme({
    light: {
      primary: '#0059b3',
      primaryHover: '#004a96',
      primaryActive: '#003a7a',
      onPrimary: '#ffffff',
    },
    dark: {
      primary: '#4dabf7',
      primaryHover: '#74c0fc',
      primaryActive: '#339af0',
      onPrimary: '#121212',
    },
  });

  const myTheme = {
    light: { colors: light.colors },
    dark: { colors: dark.colors },
  };
</script>
```

**Alternative: single theme** (same overrides for both modes):

```vue
<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';

  const myTheme = {
    colors: {
      primary: '#your-brand',
      primaryHover: '#your-brand-hover',
    },
    typography: {
      fontFamily: {
        base: 'Your Font, sans-serif',
      },
    },
  };
</script>

<template>
  <ThemeProvider :theme="myTheme" mode="auto">
    <App />
  </ThemeProvider>
</template>
```

Use `ThemeToggle` from `@grundtone/vue` or `useTheme().toggleMode()` to let users switch themes.

---

### Nuxt 3

**Where:** `nuxt.config.ts`

**How:** Add `theme` to the `grundtone` module config. Use `createTheme()` for separate light and
dark themes.

```ts
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: {
        primary: '#0059b3',
        primaryHover: '#004a96',
        primaryActive: '#003a7a',
        onPrimary: '#ffffff',
      },
      dark: {
        primary: '#4dabf7',
        primaryHover: '#74c0fc',
        primaryActive: '#339af0',
        onPrimary: '#121212',
      },
    }),
  },
});
```

The Nuxt plugin applies the correct theme based on system preference (`prefers-color-scheme`) and
reacts to changes.

---

### React Native

**Where:** `GrundtoneThemeProvider` in your app root

**How:** Pass `light` and `dark` from `createTheme()` as props.

```tsx
// App.tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    primary: '#007aff',
    background: '#ffffff',
    text: '#1c1c1e',
  },
  dark: {
    primary: '#0a84ff',
    background: '#000000',
    text: '#ffffff',
  },
});

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

Use the theme in components:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function Button() {
  const { theme } = useGrundtoneTheme();
  return (
    <Pressable style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>Submit</Text>
    </Pressable>
  );
}
```

---

### Plain Web (no framework)

**Where:** Your own CSS or build step

**How:** `@grundtone/design-tokens` ships static `:root` variables. Override them in your stylesheet
after importing the design-tokens CSS.

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-tokens/dist/index.css" />
<style>
  :root {
    /* Override semantic colors */
    --color-primary: #your-brand;
    --color-primary-hover: #your-brand-hover;
    --color-primary-active: #your-brand-active;
    --color-on-primary: #ffffff;
    --color-background: #ffffff;
    --color-text: #212529;
    /* Override more as needed */
  }
</style>
```

With a bundler (Vite, webpack), import and override in your main CSS/SCSS:

```css
@import '@grundtone/design-tokens/dist/index.css';

:root {
  --color-primary: #e91e63;
  --color-primary-hover: #c2185b;
}
```

There is no ThemeProvider for Plain Web, so no automatic light/dark switching. For dark mode, use
media queries or a class:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #4dabf7;
    --color-background: #121212;
  }
}

/* Or with a class */
[data-theme='dark'] {
  --color-primary: #4dabf7;
  --color-background: #121212;
}
```

---

## Custom Breakpoints

Breakpoints are compiled into `@media` queries at build time via SCSS. The default values live in a
**single source of truth** (`_breakpoints-defaults.scss`). Every file — grid utilities, container
max-widths, CSS custom properties, and `@property` declarations — derives its values from this one
map.

Override `$grid-breakpoints` **before** importing design-tokens:

```scss
@use '@grundtone/design-tokens/scss' with (
  $grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    2xl: 1400px,
  )
);
```

Or when importing just breakpoints:

```scss
@use '@grundtone/design-tokens/scss/breakpoints' as bp with (
  $grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    2xl: 1400px,
  )
);
```

**Defaults:** sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

> The CSS custom properties `--breakpoint-sm` etc. are exported to `:root` for informational use
> (e.g. in JavaScript) but do not affect the compiled media queries. When you override
> `$grid-breakpoints`, the `:root` CSS vars update automatically.

See [Breakpoints](/guide/breakpoints) for media query mixins and utility class prefixes.

---

## Summary

| Package          | Where to configure                   | API                                                       |
| ---------------- | ------------------------------------ | --------------------------------------------------------- |
| **Vue**          | `ThemeProvider` in App.vue           | `theme` prop: `{ light?, dark? }` or Partial&lt;Theme&gt; |
| **Nuxt**         | `nuxt.config.ts` → `grundtone.theme` | `createTheme({ light, dark })`                            |
| **React Native** | `GrundtoneThemeProvider` in App      | `light` and `dark` props from `createTheme()`             |
| **Plain Web**    | Your own CSS                         | Override `:root` after importing design-tokens            |
