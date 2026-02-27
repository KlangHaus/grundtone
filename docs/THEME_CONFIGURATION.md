# Theme Configuration

Grundtone **requires** you to configure your brand colors when installing. This ensures every
project consciously chooses its palette.

## Quick Start

### Nuxt

```ts
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: { primary: '#0059b3', primaryHover: '#004a96' },
      dark: { primary: '#4dabf7', primaryHover: '#74c0fc' },
    }),
  },
});
```

### Vue (standalone)

```vue
<template>
  <ThemeProvider :theme="myTheme">
    <App />
  </ThemeProvider>
</template>

<script setup>
  import { ThemeProvider } from '@grundtone/vue';
  import { createTheme } from '@grundtone/core';

  const { light } = createTheme({ light: { primary: '#your-brand' } });
  const myTheme = light;
</script>
```

## Semantic Color Tokens

Configure these to match your brand:

| Token                                            | Use case                    |
| ------------------------------------------------ | --------------------------- |
| `primary`, `primaryHover`, `primaryActive`       | Main actions, links         |
| `secondary`, `secondaryHover`, `secondaryActive` | Secondary actions           |
| `success`, `successBg`                           | Positive states             |
| `warning`, `warningBg`                           | Caution states              |
| `error`, `errorBg`                               | Errors, destructive actions |
| `info`, `infoBg`                                 | Informational content       |
| `background`, `surface`, `surfaceHover`          | Layout surfaces             |
| `text`, `textSecondary`, `textTertiary`          | Text hierarchy              |
| `border`, `borderHover`                          | Borders                     |
| `focus`, `focusRing`                             | Accessibility focus styles  |
| `neutral`                                        | Neutral/gray elements       |

## Default Reference

Use `createTheme({})` for standard Bootstrap-inspired colors, or override specific tokens:

```ts
createTheme({
  light: { primary: '#7c3aed' },
  dark: { primary: '#a78bfa' },
});
```

Only overridden tokens change; the rest use standard defaults.
