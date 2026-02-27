# Theme Configuration

Grundtone requires you to **explicitly configure** your brand colors. No passive defaults – you
choose your palette on every platform.

## Quick Start by Platform

### Vue / Nuxt (web)

```typescript
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: { primary: '#0059b3' },
  dark: { primary: '#4dabf7' },
});
```

Pass to ThemeProvider (Vue) or Nuxt config (Nuxt).

### React Native

```typescript
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: { primary: '#007aff' },
  dark: { primary: '#0a84ff' },
});
```

Pass to `<GrundtoneThemeProvider light={light} dark={dark}>`.

## Semantic Color Tokens

Configure these to match your brand:

| Token                                            | Use case                    |
| ------------------------------------------------ | --------------------------- |
| `primary`, `primaryHover`, `primaryActive`       | Main actions, links         |
| `onPrimary`                                      | Text on primary buttons     |
| `secondary`, `secondaryHover`, `secondaryActive` | Secondary actions           |
| `success`, `successBg`                           | Positive states             |
| `warning`, `warningBg`                           | Caution states              |
| `error`, `errorBg`                               | Errors, destructive actions |
| `info`, `infoBg`                                 | Informational content       |
| `background`, `surface`, `surfaceHover`          | Layout surfaces             |
| `text`, `textSecondary`, `textTertiary`          | Text hierarchy              |
| `border`, `borderHover`                          | Borders                     |
| `focus`, `focusRing`                             | Accessibility focus styles  |

## Override Only What You Need

```typescript
createTheme({
  light: { primary: '#7c3aed' },
  dark: { primary: '#a78bfa' },
});
```

All other tokens use standard defaults. See [full installation guide](/guide/installation) for
platform-specific setup.
