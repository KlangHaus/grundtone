# Input (React Native)

Text input component with label, help text, error state, and theme-driven styling via `useGrundtoneTheme()`.

---

## Installation

```tsx
import { GTInput } from '@grundtone/react-native';
```

---

## Usage

### Basic

```tsx
<GTInput value={name} onChangeText={setName} placeholder="Enter your name" />
```

### With label and help text

```tsx
<GTInput
  value={email}
  onChangeText={setEmail}
  type="email"
  label="Email"
  placeholder="john@example.com"
  helpText="We'll never share your email."
  required
/>
```

### Error state

```tsx
<GTInput
  value={username}
  onChangeText={setUsername}
  label="Username"
  errorText="Username is already taken"
/>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Current input value |
| `onChangeText` | `(text: string) => void` | — | Called when text changes |
| `type` | `InputType` | `'text'` | Input type: text, email, password, number, tel, url, search |
| `size` | `InputSize` | `'md'` | Size preset: sm, md, lg |
| `rounded` | `InputRadius` | — | Border radius: none, sm, md, lg, full |
| `placeholder` | `string` | — | Placeholder text |
| `label` | `string` | — | Visible label above input |
| `helpText` | `string` | — | Help text below input |
| `errorText` | `string` | — | Error message (replaces helpText) |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field (visual indicator) |
| `block` | `boolean` | `false` | Full-width input |
| `maxLength` | `number` | — | Maximum character length |
| `accessibilityLabel` | `string` | — | Accessibility label (falls back to `label`) |
| `onFocus` | `() => void` | — | Called on focus |
| `onBlur` | `() => void` | — | Called on blur |

---

## Sizes

Sizes match `GTButton` for consistent form alignment:

| Size | Font | Padding (v / h) |
| --- | --- | --- |
| `sm` | `font-size-sm` | `space-xs` / `space-sm` |
| `md` | `font-size-base` | `space-sm` / `space-md` |
| `lg` | `font-size-lg` | `space-md` / `space-xl` |

---

## Type Mapping

The `type` prop maps to React Native's `keyboardType` and `secureTextEntry`:

| Type | keyboardType | secureTextEntry |
| --- | --- | --- |
| `text` | `default` | `false` |
| `email` | `email-address` | `false` |
| `password` | `default` | `true` |
| `number` | `numeric` | `false` |
| `tel` | `phone-pad` | `false` |
| `url` | `url` | `false` |
| `search` | `default` | `false` |

---

## Theming

All colors, spacing, typography, and radii come from `useGrundtoneTheme()`. The component responds to light/dark mode automatically.

Focus state shows a primary-colored border. Error state shows an error-colored border.
