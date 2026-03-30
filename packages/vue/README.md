# @grundtone/vue

Vue 3 component library for the [Grundtone](https://grundtone.com) design system.

## Installation

```bash
npm install @grundtone/vue @grundtone/design-system
```

## Usage

```vue
<script setup>
  import { Button, Icon, ThemeProvider } from '@grundtone/vue';
</script>

<template>
  <ThemeProvider>
    <Button variant="primary" size="md">
      <Icon name="check" />
      Confirm
    </Button>
  </ThemeProvider>
</template>
```

## Components

| Component                         | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `GTAccordion` / `GTAccordionItem` | Expandable sections with toggle-all               |
| `GTAlert`                         | Info, success, warning, error alerts              |
| `GTAnchorLinks`                   | In-page navigation                                |
| `GTAutocomplete`                  | Typeahead search input                            |
| `GTBadge`                         | Status labels with dot/icon                       |
| `GTBreadcrumb`                    | Navigation trail                                  |
| `GTButton`                        | Primary, secondary, outlined, negative            |
| `GTCard`                          | Content container with media, nav, horizontal     |
| `GTCookieMessage`                 | GDPR cookie consent                               |
| `GTDateInput`                     | Day/month/year date entry (3 separate fields)     |
| `GTDetails`                       | Collapsible content (native `<details>`)          |
| `GTIcon`                          | SVG icon renderer                                 |
| `GTInput`                         | Text input with label, help, error, prefix/suffix |
| `GTSelect`                        | Dropdown select with option groups                |
| `GTTabs` / `GTTabPanel`           | Tabbed content (underline, segment, pill)         |
| `GTToggle`                        | On/off switch                                     |

### Composables

| Composable            | Description                                        |
| --------------------- | -------------------------------------------------- |
| `useTheme`            | Access theme context (dark mode, toggle)           |
| `useField`            | Reactive field state with validation               |
| `useDateField`        | Date field state with validation (for GTDateInput) |
| `useFormValidation`   | Form-level validation aggregator                   |
| `useDawaAutocomplete` | Danish address autocomplete                        |

### Validators

All re-exported from `@grundtone/utils`:

`required`, `email`, `phone`, `cpr`, `cvr`, `date`, `datePast`, `dateFuture`, `minLength`,
`maxLength`, `pattern`, `url`, `composeValidators`

## Nuxt

For Nuxt 3 projects, use [`@grundtone/nuxt`](https://www.npmjs.com/package/@grundtone/nuxt) instead
for automatic component and composable auto-imports.

## Documentation

See [grundtone.com](https://grundtone.com) for full component API, examples, and design guidelines.

## License

MIT
