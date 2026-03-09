# Package Architecture

Overview of Grundtone packages and when to use each.

## Platform-agnostic

### @grundtone/core

**Source of truth** for theme data: colors, spacing, typography, shadows, radius.

- `createTheme({ light: {...}, dark: {...} })` – build theme objects
- `defaultTheme`, `defaultColorPreset`, `defaultColorPresetDark`
- TypeScript types: `Theme`, `ThemeColors`, `SEMANTIC_COLOR_KEYS`

Use in: Vue, Nuxt, React Native, or any platform that needs design tokens.

## Web-only

### @grundtone/design-system

**Web styling layer**: SCSS utilities, CSS output, grid system, mixins.

- SCSS: `color()`, `space()`, typography mixins, breakpoints
- Compiled CSS: `dist/index.css` with `:root` variables
- Accessibility helpers (contrast, luminance)
- Used by `@grundtone/vue` via Vite `additionalData`

**You need this for:**

- Vue/Vite projects using SCSS with design tokens
- Projects that import `@use '@grundtone/design-system'` in styles
- Standalone CSS (e.g. non-Vue web apps)

**You do NOT need this for:**

- React Native – use `@grundtone/core` + `@grundtone/react-native` instead
- Projects that only use Vue components (Vue package already depends on it)

### @grundtone/vue

Vue 3 components: Button, Icon, ThemeToggle, ThemeProvider, etc.

- Depends on: core, design-system, shared, composables
- Applies theme to DOM via CSS custom properties

### @grundtone/nuxt

Nuxt 3 module: auto-imports Vue components, theme setup.

- Depends on: vue, composables

## React Native

### @grundtone/react-native

Theme provider and `useGrundtoneTheme()` hook.

- Depends on: core only
- No design-system (RN does not use CSS/SCSS)
- Use `theme.colors.primary`, `theme.spacing.md` etc. in `StyleSheet`

## Summary

| Package                  | Platform | Purpose                          |
| ------------------------ | -------- | -------------------------------- |
| @grundtone/core          | All      | Theme data, types, createTheme   |
| @grundtone/design-system | Web      | SCSS utilities, CSS, grid        |
| @grundtone/vue           | Web      | Vue components                   |
| @grundtone/nuxt          | Web      | Nuxt module                      |
| @grundtone/react-native  | RN       | ThemeProvider, useGrundtoneTheme |
