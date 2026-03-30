# React Native Icon Component

SVG icon component for React Native with size presets and accessibility support. Works with any icon library that follows the `IconDefinition` contract. Requires `react-native-svg` as a peer dependency.

## Setup

### 1. Provide the icon registry

Wrap your app with `IconRegistryProvider`:

```tsx
import { IconRegistryProvider } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

function App() {
  return (
    <IconRegistryProvider registry={iconRegistry}>
      <MyScreen />
    </IconRegistryProvider>
  );
}
```

### 2. Use the component

```tsx
import { GTIcon } from '@grundtone/react-native';

// By name (from provided registry)
<GTIcon name="check" />
<GTIcon name="search" size="xl" />
<GTIcon name="close" size="sm" label="Close dialog" />

// Direct icon definition (no registry needed)
<GTIcon icon={{ body: '<path d="M5 13l4 4L19 7"/>', viewBox: '0 0 24 24' }} />
```

## Size Tokens

| Size | Pixels |
| --- | --- |
| `xs` | 12px |
| `sm` | 16px |
| `md` | 20px |
| `lg` | 24px — default |
| `xl` | 32px |
| `2xl` | 40px |

## Color

Falls back to the global `iconColor` config, then `currentColor`:

```tsx
<GTIcon name="check" color="#10b981" />
<GTIcon name="close" color="#ef4444" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconDefinition` | — | Direct icon data (takes precedence over `name`) |
| `name` | `string` | — | Icon name from the provided registry |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Size preset |
| `label` | `string` | `undefined` | Accessible label |
| `color` | `string` | `undefined` | Override icon color |

## Accessibility

- No `label`: icon is hidden from screen readers
- With `label`: `accessibilityLabel` and `accessibilityRole="image"` are set
