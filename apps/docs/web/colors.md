# Colors

Grundtone uses **38 semantic color tokens** defined in `@grundtone/core`. Every token maps to a CSS
custom property (`--color-{kebab-case}`). Core is the single source of truth — design-system and
Vue/Nuxt derive their values from it.

## Naming Convention

Tokens use **shade-based** naming (`primaryLight`, `primaryDark`) instead of state-based
(`primaryHover`, `primaryActive`). Components decide which shade to use for hover, active, tint,
etc. This is more flexible and consistent across the system.

---

## Brand

<ColorTokens category="brand" mode="light" showCssVar />

---

## Status

<ColorTokens category="status" mode="light" showCssVar />

---

## Surface

<ColorTokens category="surface" mode="light" showCssVar />

### Background Utilities

Shorthand classes for applying surface/background tokens:

| Class              | CSS Variable                    |
| ------------------ | ------------------------------- |
| `.bg-normal`       | `var(--color-background)`       |
| `.bg-alt`          | `var(--color-background-alt)`   |
| `.bg-surface`      | `var(--color-surface)`          |
| `.bg-surface-alt`  | `var(--color-surface-alt)`      |
| `.bg-surface-raised` | `var(--color-surface-raised)` |
| `.bg-overlay`      | `var(--color-surface-overlay)`  |
| `.bg-modal`        | `var(--color-modal-backdrop)`   |

```html
<!-- Modal backdrop -->
<div class="fixed inset-0 z-modal-backdrop bg-modal">
  <div class="z-modal">...</div>
</div>
```

---

## Text

<ColorTokens category="text" mode="light" showCssVar />

---

## Border

<ColorTokens category="border" mode="light" showCssVar />

---

## Focus & Neutral

<ColorTokens category="focus" mode="light" showCssVar />

---

## Light vs Dark Comparison

Side-by-side comparison of all tokens across modes.

### Brand

<ColorTokens category="brand" mode="compare" />

### Status

<ColorTokens category="status" mode="compare" />

### Surface

<ColorTokens category="surface" mode="compare" />

### Text

<ColorTokens category="text" mode="compare" />

### Border

<ColorTokens category="border" mode="compare" />

---

## Usage

### CSS

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  color: var(--color-text);
}

.card:hover {
  background: var(--color-surface-alt);
  border-color: var(--color-border-strong);
}
```

### SCSS — Override Colors

Override any semantic token at build time via `@use ... with ()`:

```scss
@use '@grundtone/design-system/scss' with (
  $color-overrides-light: (
    'primary': #e91e63,
    'primary-light': #f06292,
    'primary-dark': #c2185b,
  ),
  $color-overrides-dark: (
    'primary': #f48fb1,
  )
);
```

Or import colors standalone:

```scss
@use '@grundtone/design-system/scss/colors' with (
  $overrides-light: (
    'primary': #e91e63,
  ),
  $overrides-dark: (
    'primary': #f48fb1,
  )
);
```

### SCSS — Raw Palette

For compile-time access to raw palette colors (not CSS custom properties), import the palette
module. This is useful for generating static styles, calculating contrast, or building component
variants.

```scss
@use '@grundtone/design-system/scss/color-palette' as palette;
```

#### `palette.color($family, $shade)`

Get a specific shade from a color family.

```scss
border-color: palette.color('blue', 300);   // #93c5fd
background: palette.color('gray', 50);      // #fafafa
color: palette.color('red', 700);           // #b91c1c
```

Available families: `gray`, `blue`, `green`, `red`, `yellow`, `indigo`.
Available shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`.

#### `palette.lighter($family, $shade, $steps)`

Move up (lighter) in the shade scale by N steps. Clamps at `50`.

```scss
$base: palette.color('blue', 500);      // #3b82f6
$light: palette.lighter('blue', 500);   // #60a5fa (one step = 400)
$lighter: palette.lighter('blue', 500, 3); // #bfdbfe (three steps = 200)
```

#### `palette.darker($family, $shade, $steps)`

Move down (darker) in the shade scale by N steps. Clamps at `900`.

```scss
$base: palette.color('blue', 500);      // #3b82f6
$dark: palette.darker('blue', 500);     // #2563eb (one step = 600)
$darker: palette.darker('blue', 500, 3); // #1e40af (three steps = 800)
```

#### `palette.alpha($family, $shade, $alpha)`

Create a semi-transparent variant of a palette color.

```scss
background: palette.alpha('blue', 500, 0.1);  // rgba(59, 130, 246, 0.1)
box-shadow: 0 4px 12px palette.alpha('gray', 900, 0.15);
border-color: palette.alpha('red', 500, 0.3);
```

::: tip When to use palette vs CSS custom properties
Use **CSS custom properties** (`var(--color-primary)`) for all runtime styles — they respect
theming and dark mode. Use **palette functions** only when you need a static color value at compile
time, such as SCSS calculations, contrast checks, or generating component variants that don't
change with theme.
:::

### React Native

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function Card() {
  const { theme } = useGrundtoneTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.borderLight,
      }}
    >
      <Text style={{ color: theme.colors.text }}>Content</Text>
    </View>
  );
}
```

---

## Migration from Old Names

If you are upgrading from a previous version, rename these tokens:

| Old Name          | New Name         |
| ----------------- | ---------------- |
| `primaryHover`    | `primaryLight`   |
| `primaryActive`   | `primaryDark`    |
| `secondaryHover`  | `secondaryLight` |
| `secondaryActive` | `secondaryDark`  |
| `successBg`       | `successLight`   |
| `warningBg`       | `warningLight`   |
| `errorBg`         | `errorLight`     |
| `infoBg`          | `infoLight`      |
| `surfaceHover`    | `surfaceAlt`     |
| `border`          | `borderLight`    |
| `borderHover`     | `borderStrong`   |

CSS variable equivalents:

| Old CSS Variable           | New CSS Variable          |
| -------------------------- | ------------------------- |
| `--color-primary-hover`    | `--color-primary-light`   |
| `--color-primary-active`   | `--color-primary-dark`    |
| `--color-secondary-hover`  | `--color-secondary-light` |
| `--color-secondary-active` | `--color-secondary-dark`  |
| `--color-success-bg`       | `--color-success-light`   |
| `--color-warning-bg`       | `--color-warning-light`   |
| `--color-error-bg`         | `--color-error-light`     |
| `--color-info-bg`          | `--color-info-light`      |
| `--color-surface-hover`    | `--color-surface-alt`     |
| `--color-border`           | `--color-border-light`    |
| `--color-border-hover`     | `--color-border-strong`   |

---

## Theming

See [Theme Configuration](/guide/theme-configuration) for the concept overview and `createTheme()`
API. This section covers web-specific setup for each package.

### CSS Variables (Web)

On web, the theme is applied as CSS custom properties on `:root`:

```css
--color-primary
--color-primary-light
--color-primary-dark
--color-background
--color-text
/* etc. — 38 tokens total */
```

Use them in your styles:

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
```

---

### Vue 3

**Where:** `ThemeProvider` in `App.vue`

**How:** Pass `createTheme()` to the `theme` prop. Override only the colors you need — the rest uses
defaults.

```vue
<template>
  <ThemeProvider :theme="myTheme" mode="auto">
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';
  import { createTheme } from '@grundtone/core';

  const myTheme = createTheme({
    light: {
      primary: '#0059b3',
      primaryLight: '#3381cc',
      primaryDark: '#003a7a',
      onPrimary: '#ffffff',
    },
    dark: {
      primary: '#4dabf7',
      primaryLight: '#74c0fc',
      primaryDark: '#339af0',
      onPrimary: '#121212',
    },
  });
</script>
```

**Alternative: single partial theme** (same overrides for both modes):

```vue
<template>
  <ThemeProvider :theme="myTheme" mode="auto">
    <App />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';

  const myTheme = {
    colors: {
      primary: '#e91e63',
      primaryLight: '#f06292',
      primaryDark: '#c2185b',
    },
  };
</script>
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
        primaryLight: '#3381cc',
        primaryDark: '#003a7a',
        onPrimary: '#ffffff',
      },
      dark: {
        primary: '#4dabf7',
        primaryLight: '#74c0fc',
        primaryDark: '#339af0',
        onPrimary: '#121212',
      },
    }),
  },
});
```

The Nuxt plugin applies the correct theme based on system preference (`prefers-color-scheme`) and
reacts to changes.

---

### Plain Web (no framework)

**Where:** Your own CSS or build step

**How:** `@grundtone/design-system` ships static `:root` variables. Override them in your stylesheet
after importing the design-system CSS.

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-system/dist/index.css" />
<style>
  :root {
    --color-primary: #e91e63;
    --color-primary-light: #f06292;
    --color-primary-dark: #c2185b;
    --color-on-primary: #ffffff;
    /* Override more as needed */
  }
</style>
```

With a bundler (Vite, webpack), import and override in your main CSS/SCSS:

```css
@import '@grundtone/design-system/dist/index.css';

:root {
  --color-primary: #e91e63;
  --color-primary-light: #ec407a;
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

## Custom Colors (SCSS)

Colors use the same `@use ... with ()` override pattern as breakpoints. Default values live in
`_color-defaults.scss` (derived from `@grundtone/core`). Override only what you need — the rest
keeps its defaults via `map.merge`.

Override via the main entry point:

```scss
@use '@grundtone/design-system/scss' with (
  $color-overrides-light: (
    'primary': #e91e63,
    'primary-light': #f06292,
    'primary-dark': #c2185b,
  ),
  $color-overrides-dark: (
    'primary': #f48fb1,
    'primary-light': #f8bbd0,
    'primary-dark': #ec407a,
  )
);
```

Or import colors standalone (e.g. if you only need color tokens, not the full design system):

```scss
@use '@grundtone/design-system/scss/colors' with (
  $overrides-light: (
    'primary': #e91e63,
    'primary-light': #f06292,
    'primary-dark': #c2185b,
  ),
  $overrides-dark: (
    'primary': #f48fb1,
  )
);
```

Token keys use **kebab-case** matching the CSS variable names (e.g. `'primary-light'` for
`--color-primary-light`). See the [token tables above](#brand) for all available tokens.

> Colors and breakpoints can be overridden together in a single `@use` statement.

---

## Custom Breakpoints

Breakpoints are compiled into `@media` queries at build time via SCSS. The default values live in a
**single source of truth** (`_breakpoints-defaults.scss`). Every file — grid utilities, container
max-widths, CSS custom properties, and `@property` declarations — derives its values from this one
map.

Override `$grid-breakpoints` **before** importing design-system:

```scss
@use '@grundtone/design-system/scss' with (
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
@use '@grundtone/design-system/scss/breakpoints' as bp with (
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

See [Breakpoints](/web/breakpoints) for media query mixins and utility class prefixes.
