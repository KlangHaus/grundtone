# Alert (React Native)

Static status messages for important information, success confirmations, warnings, and errors. Theme-driven styling via `useGrundtoneTheme()`.

---

## Installation

```tsx
import { GTAlert } from '@grundtone/react-native';
```

---

## Usage

### Basic

```tsx
<GTAlert variant="info">
  <Text>This is an informational message.</Text>
</GTAlert>
```

### With icon

```tsx
<GTAlert variant="success" icon="check-circle">
  <Text>Your changes have been saved.</Text>
</GTAlert>
```

### With heading

```tsx
<GTAlert variant="error" icon="alert-circle" heading="Form errors">
  <Text>Please fix the following errors before submitting.</Text>
</GTAlert>
```

### Dismissible

```tsx
const [show, setShow] = useState(true);

{show ? (
  <GTAlert
    variant="info"
    icon="info-circle"
    dismissible
    onDismiss={() => setShow(false)}
  >
    <Text>This alert can be dismissed.</Text>
  </GTAlert>
) : null}
```

### With footer

```tsx
<GTAlert variant="error" icon="alert-circle" heading="2 errors" footer={
  <Text>Fix the errors and try again.</Text>
}>
  <Text>Name is required. Email is not valid.</Text>
</GTAlert>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | **required** | Visual and semantic variant |
| `heading` | `string` | — | Optional heading above the body |
| `icon` | `string` | — | Icon name from the registry (renders `GTIcon`) |
| `dismissible` | `boolean` | `false` | Show close/dismiss button |
| `onDismiss` | `() => void` | — | Called when close button is pressed |
| `accessibilityLabel` | `string` | — | Accessible label for the alert |
| `children` | `ReactNode` | **required** | Alert body content |
| `footer` | `ReactNode` | — | Footer content, separated by a line |

---

## Accessibility

- `accessibilityRole="alert"` for screen reader announcements
- Close button has `accessibilityLabel="Close"` and `accessibilityRole="button"`
- Icons are decorative (no accessibility label)

---

## Theming

All colors, spacing, typography, and radii come from `useGrundtoneTheme()`. The component responds to light/dark mode automatically.

Backgrounds use 12% opacity of the variant color for a transparent effect in both light and dark mode.

| Variant | Border | Background |
| --- | --- | --- |
| `info` | `theme.colors.info` | `info` at 12% opacity |
| `success` | `theme.colors.success` | `success` at 12% opacity |
| `warning` | `theme.colors.warning` | `warning` at 12% opacity |
| `error` | `theme.colors.error` | `error` at 12% opacity |
