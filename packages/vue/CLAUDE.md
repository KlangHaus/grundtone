# @grundtone/vue

Vue 3 component library for the Grundtone design system. In Nuxt, all components and composables are
auto-imported via `@grundtone/nuxt`.

## Installation

```bash
npm install @grundtone/vue @grundtone/design-system
```

```vue
<script setup>
  import { GTButton, GTInput } from '@grundtone/vue';
</script>
```

## Components

### Atoms

| Component        | v-model                | Key Props                                                                                                                                      |
| ---------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `GTAutocomplete` | `string`               | `suggestions`, `size`, `label`, `helpText`, `errorText`, `loading`, `minChars`                                                                 |
| `GTBadge`        | —                      | `variant` (info/success/warning/error/neutral), `size` (sm/md), `dot`, `icon`                                                                  |
| `GTButton`       | —                      | `variant` (primary/secondary/outlined/negative/unstyled), `size` (sm/md/lg), `rounded`, `loading`, `block`, `as`                               |
| `GTDateInput`    | `{ day, month, year }` | `size`, `label`, `helpText`, `errorText`, `required`, `disabled`, `dayLabel`, `monthLabel`, `yearLabel`, `autocomplete`                        |
| `GTDetails`      | —                      | `summary` (required), `variant` (default/subtle/card), `open`                                                                                  |
| `GTIcon`         | —                      | `name`, `size` (xs/sm/md/lg/xl/2xl), `label`, `color`                                                                                          |
| `GTInput`        | `string`               | `type`, `size`, `label`, `helpText`, `errorText`, `required`, `disabled`, `readonly`, `prefix`, `suffix`, `width`, `charWidth`, `autocomplete` |
| `GTSelect`       | `string`               | `options` (required), `size`, `label`, `helpText`, `errorText`, `placeholder`                                                                  |
| `GTToggle`       | `boolean`              | `label`, `size`, `disabled`                                                                                                                    |

### Molecules

| Component                         | v-model  | Key Props                                                                                            |
| --------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `GTAccordion` + `GTAccordionItem` | —        | `variant` (default/bordered/card), `transition`, `showToggleAll`; item: `heading` (required), `open` |
| `GTAddressInput`                  | `string` | `type` (adresse/vejnavn/postnummer), `size`, `label`, `helpText`, `errorText`                        |
| `GTAlert`                         | —        | `variant` (info/success/warning/error, required), `heading`, `icon`, `dismissible`                   |
| `GTAnchorLinks`                   | —        | `items` (required), `heading`, `activeHighlight`                                                     |
| `GTBreadcrumb`                    | —        | `items` (required), `separator`                                                                      |
| `GTCard`                          | —        | `title` (required), `variant` (raised/bordered/flat), `nav`, `href`, `horizontal`, `image`           |
| `GTCookieMessage`                 | —        | `heading`, `acceptLabel`, `rejectLabel`, `settingsLabel`, `persistent`                               |
| `GTTabs` + `GTTabPanel`           | `string` | `tabs` (required), `variant` (underline/segment/pill); panel: `id` (required)                        |

## Composables

| Composable                      | Purpose                                                    | Key Return                                                    |
| ------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| `useTheme()`                    | Theme context (requires `GrundtoneThemeProvider` ancestor) | `isDark`, `mode`, `setMode`, `toggleMode`                     |
| `useField(options?)`            | Reactive field validation for GTInput                      | `value`, `errorText`, `handlers`, `validate()`, `reset()`     |
| `useDateField(options?)`        | Reactive date validation for GTDateInput                   | `dateValue`, `errorText`, `handlers`, `validate()`, `reset()` |
| `useFormValidation(fields)`     | Aggregate multiple useField/useDateField instances         | `isValid`, `validateAll()`, `resetAll()`                      |
| `useDawaAutocomplete(options?)` | Danish address autocomplete (DAWA API)                     | `query`, `results`, `loading`, `search()`                     |

### Validation pattern

```vue
<script setup>
  import { GTInput, useField, useFormValidation, required, email } from '@grundtone/vue';

  const nameField = useField({ validators: [required(), minLength(2)] });
  const emailField = useField({ validators: [required(), email()], validateOn: 'blur' });
  const form = useFormValidation({ name: nameField, email: emailField });
</script>

<template>
  <form @submit.prevent="form.validateAll() && submit()">
    <GTInput
      v-model="nameField.value.value"
      :error-text="nameField.errorText.value"
      v-on="nameField.handlers"
      label="Name"
      required
    />
    <GTInput
      v-model="emailField.value.value"
      :error-text="emailField.errorText.value"
      v-on="emailField.handlers"
      label="Email"
      type="email"
      required
    />
  </form>
</template>
```

### Date validation pattern

```vue
<script setup>
  import { GTDateInput, useDateField, required, date, datePast } from '@grundtone/vue';

  const birthDate = useDateField({
    validators: [required(), date(), datePast()],
    validateOn: 'blur',
  });
</script>

<template>
  <GTDateInput
    v-model="birthDate.dateValue.value"
    :error-text="birthDate.errorText.value"
    v-on="birthDate.handlers"
    label="Birth date"
    autocomplete="bday"
    required
  />
</template>
```

## Validators

All re-exported from `@grundtone/utils`. Return `{ isValid: boolean; message?: string }`.

| Validator                 | Args       | Validates                      |
| ------------------------- | ---------- | ------------------------------ |
| `required(msg?)`          | —          | Non-empty after trim           |
| `email(msg?)`             | —          | Valid email format             |
| `phone(msg?)`             | —          | Danish phone (8 digits)        |
| `cpr(msg?)`               | —          | Danish CPR number              |
| `cvr(msg?)`               | —          | Danish CVR number              |
| `date(msg?)`              | —          | Valid date (DD-MM-YYYY string) |
| `datePast(msg?)`          | —          | Date is before today           |
| `dateFuture(msg?)`        | —          | Date is after today            |
| `minLength(n, msg?)`      | min length | At least N characters          |
| `maxLength(n, msg?)`      | max length | At most N characters           |
| `pattern(regex, msg?)`    | RegExp     | Matches regex                  |
| `url(msg?)`               | —          | Valid HTTP(S) URL              |
| `composeValidators(...v)` | validators | Short-circuit composition      |

All (except `required`) pass on empty string — combine with `required()` to make mandatory.

## Key Patterns

- **Label + help text + error**: All form components support `label`, `helpText`, `errorText`. Error
  replaces help text. Placed between label and input (designsystem.dk guideline).
- **Sizes**: Most form components support `sm | md | lg`. Default is `md`.
- **CSS prefix**: All generated classes use `gt-` prefix (configurable via `defineGrundtoneConfig`).
- **Auto-generated IDs**: Components auto-generate `id` for label/input association. Override with
  `id` prop.
- **Icon registry**: Provide icon registry via `app.provide(GT_ICON_REGISTRY_KEY, iconRegistry)` at
  app root.
