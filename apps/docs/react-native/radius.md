# Border Radius (React Native)

Border radius tokens are available via `theme.radius` from the `useGrundtoneTheme()` hook.

---

## Radius Scale

| Token  | Value      | Pixels |
| ------ | ---------- | ------ |
| `none` | `0`        | 0      |
| `xs`   | `0.125rem` | 2px    |
| `sm`   | `0.25rem`  | 4px    |
| `md`   | `0.375rem` | 6px    |
| `lg`   | `0.5rem`   | 8px    |
| `xl`   | `0.75rem`  | 12px   |
| `2xl`  | `1rem`     | 16px   |
| `3xl`  | `1.5rem`   | 24px   |
| `full` | `9999px`   | 9999px |

---

## Usage

Radius values are rem strings. Convert to numbers for React Native:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

const REM_BASE = 16;
const rem = (value: string) => parseFloat(value) * REM_BASE;

function Card({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        borderRadius: rem(theme.radius.lg), // 8
        backgroundColor: theme.colors.surface,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
```

---

## Common Patterns

### Avatar (fully round)

```tsx
function Avatar({ uri, size = 48 }) {
  const { theme } = useGrundtoneTheme();

  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
}
```

For fully round elements, use `size / 2` instead of `theme.radius.full` — the `9999px` value works in CSS but RN clips at the actual dimension.

### Per-corner radius

```tsx
function TopSheet({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        borderTopLeftRadius: rem(theme.radius.xl),  // 12
        borderTopRightRadius: rem(theme.radius.xl), // 12
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: theme.colors.surface,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
```

### Chip / tag

```tsx
function Chip({ label }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        borderRadius: rem(theme.radius['2xl']), // 16
        backgroundColor: theme.colors.primaryLight,
        paddingVertical: 4,
        paddingHorizontal: 12,
      }}
    >
      <Text style={{ fontSize: 13, color: theme.colors.primary }}>
        {label}
      </Text>
    </View>
  );
}
```
