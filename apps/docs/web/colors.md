# Colors

Grundtone uses **37 semantic color tokens** defined in `@grundtone/core`. Every token maps to a CSS
custom property (`--color-{kebab-case}`). Core is the single source of truth — design-tokens and
Vue/Nuxt derive their values from it.

## Naming Convention

Tokens use **shade-based** naming (`primaryLight`, `primaryDark`) instead of state-based
(`primaryHover`, `primaryActive`). Components decide which shade to use for hover, active, tint,
etc. This is more flexible and consistent across the system.

---

## Brand

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #0059b3 | primary | --color-primary | Primary brand color |
| #3381cc | primaryLight | --color-primary-light | Lighter shade (hover, tints) |
| #003a7a | primaryDark | --color-primary-dark | Darker shade (active, pressed) |
| #ffffff | onPrimary | --color-on-primary | Text on primary background |
| #6c757d | secondary | --color-secondary | Secondary brand color |
| #868e96 | secondaryLight | --color-secondary-light | Lighter secondary shade |
| #494f54 | secondaryDark | --color-secondary-dark | Darker secondary shade |
:::

---

## Status

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #198754 | success | --color-success | Success state |
| #d1e7dd | successLight | --color-success-light | Success background tint |
| #146c43 | successDark | --color-success-dark | Darker success shade |
| #ffc107 | warning | --color-warning | Warning state |
| #fff3cd | warningLight | --color-warning-light | Warning background tint |
| #cc9a06 | warningDark | --color-warning-dark | Darker warning shade |
| #dc3545 | error | --color-error | Error state |
| #f8d7da | errorLight | --color-error-light | Error background tint |
| #b02a37 | errorDark | --color-error-dark | Darker error shade |
| #0dcaf0 | info | --color-info | Info state |
| #cff4fc | infoLight | --color-info-light | Info background tint |
| #0aa2c0 | infoDark | --color-info-dark | Darker info shade |
:::

---

## Surface

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #ffffff | background | --color-background | Page background |
| #fafafa | backgroundAlt | --color-background-alt | Alternate sections, zebra rows |
| #f8f9fa | surface | --color-surface | Cards, panels |
| #f0f1f2 | surfaceAlt | --color-surface-alt | Hover state, zebra |
| #ffffff | surfaceRaised | --color-surface-raised | Modals, FABs |
:::

`surfaceOverlay` uses `rgba(255,255,255,0.95)` (semi-transparent).

---

## Text

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #212529 | text | --color-text | Primary text |
| #6c757d | textSecondary | --color-text-secondary | Secondary text |
| #adb5bd | textTertiary | --color-text-tertiary | Tertiary / hint text |
| #ffffff | textInverse | --color-text-inverse | Text on dark backgrounds |
| #a3a3a3 | textPlaceholder | --color-text-placeholder | Input placeholders |
| #d4d4d4 | textDisabled | --color-text-disabled | Disabled elements |
:::

---

## Border

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #dee2e6 | borderLight | --color-border-light | Subtle dividers |
| #ced4da | borderMedium | --color-border-medium | Default inputs |
| #adb5bd | borderStrong | --color-border-strong | Focus, emphasized |
:::

`borderInverse` uses `rgba(255,255,255,0.2)` (on dark backgrounds).

---

## Focus & Neutral

:::colors
| Color | Token | CSS Variable | Purpose |
|---|---|---|---|
| #0059b3 | focus | --color-focus | Focus indicator |
| #6c757d | neutral | --color-neutral | Neutral UI elements |
:::

`focusRing` uses `rgba(0,89,179,0.25)` (focus ring shadow).

---

## Dark Mode Palette

When dark mode is active, tokens resolve to these values:

### Brand (dark)

:::colors
| Color | Token | CSS Variable |
|---|---|---|
| #4dabf7 | primary | --color-primary |
| #74c0fc | primaryLight | --color-primary-light |
| #339af0 | primaryDark | --color-primary-dark |
| #121212 | onPrimary | --color-on-primary |
| #adb5bd | secondary | --color-secondary |
| #ced4da | secondaryLight | --color-secondary-light |
| #868e96 | secondaryDark | --color-secondary-dark |
:::

### Status (dark)

:::colors
| Color | Token | CSS Variable |
|---|---|---|
| #51cf66 | success | --color-success |
| #1a3d20 | successLight | --color-success-light |
| #40c057 | successDark | --color-success-dark |
| #ffd43b | warning | --color-warning |
| #3d3a1a | warningLight | --color-warning-light |
| #fab005 | warningDark | --color-warning-dark |
| #ff6b6b | error | --color-error |
| #3d1a1c | errorLight | --color-error-light |
| #fa5252 | errorDark | --color-error-dark |
| #4dabf7 | info | --color-info |
| #1a2e3d | infoLight | --color-info-light |
| #339af0 | infoDark | --color-info-dark |
:::

### Surface (dark)

:::colors
| Color | Token | CSS Variable |
|---|---|---|
| #121212 | background | --color-background |
| #1a1a1a | backgroundAlt | --color-background-alt |
| #1e1e1e | surface | --color-surface |
| #252525 | surfaceAlt | --color-surface-alt |
| #2a2a2a | surfaceRaised | --color-surface-raised |
:::

### Text (dark)

:::colors
| Color | Token | CSS Variable |
|---|---|---|
| #ffffff | text | --color-text |
| #b0b0b0 | textSecondary | --color-text-secondary |
| #808080 | textTertiary | --color-text-tertiary |
| #121212 | textInverse | --color-text-inverse |
| #666666 | textPlaceholder | --color-text-placeholder |
| #4a4a4a | textDisabled | --color-text-disabled |
:::

### Border (dark)

:::colors
| Color | Token | CSS Variable |
|---|---|---|
| #404040 | borderLight | --color-border-light |
| #505050 | borderMedium | --color-border-medium |
| #606060 | borderStrong | --color-border-strong |
:::

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
@use '@grundtone/design-tokens/scss' with (
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
@use '@grundtone/design-tokens/scss/colors' with (
  $overrides-light: (
    'primary': #e91e63,
  ),
  $overrides-dark: (
    'primary': #f48fb1,
  )
);
```

### SCSS — Raw Palette

```scss
// Raw palette access (for SCSS-only use cases)
@use '@grundtone/design-tokens/scss/color-palette' as palette;

.custom {
  // Use CSS vars for semantic tokens
  color: var(--color-text);
  // Use palette functions for raw shade access
  border-color: palette.color('blue', 300);
}
```

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
/* etc. — 37 tokens total */
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

**How:** `@grundtone/design-tokens` ships static `:root` variables. Override them in your stylesheet
after importing the design-tokens CSS.

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-tokens/dist/index.css" />
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
@import '@grundtone/design-tokens/dist/index.css';

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
@use '@grundtone/design-tokens/scss' with (
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
@use '@grundtone/design-tokens/scss/colors' with (
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

See [Breakpoints](/web/breakpoints) for media query mixins and utility class prefixes.
