# Shadows (React Native)

Cross-platform shadow styles from structured shadow definitions in `@grundtone/core`.
The `shadowToRN()` helper converts structured layers to platform-native styles:

- **iOS:** `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
- **Android:** `elevation`

---

## Shadow Scale

| Token   | Blur | Opacity | Elevation (Android) |
| ------- | ---- | ------- | ------------------- |
| `xs`    | 2    | 0.05    | 1                   |
| `sm`    | 3    | 0.1     | 2                   |
| `md`    | 6    | 0.1     | 3                   |
| `lg`    | 15   | 0.1     | 8                   |
| `xl`    | 25   | 0.1     | 13                  |
| `2xl`   | 50   | 0.25    | 25                  |
| `inner` | 4    | 0.06    | 2                   |

---

## Usage

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';
import { shadowToRN } from '@grundtone/react-native';

function Card({ children }) {
  const { theme } = useGrundtoneTheme();
  const shadow = shadowToRN(theme.shadowDefinitions.md);

  return (
    <View
      style={{
        ...shadow,
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
```

---

## Return Type

`shadowToRN()` returns an `RNShadowStyle` object ready to spread into a style:

```ts
interface RNShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}
```

---

## Common Patterns

### Elevated card

```tsx
function ElevatedCard({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        ...shadowToRN(theme.shadowDefinitions.lg),
        backgroundColor: theme.colors.surfaceRaised,
        borderRadius: 12,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
```

### Conditional shadow (e.g. pressed state)

```tsx
function PressableCard({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <Pressable>
      {({ pressed }) => (
        <View
          style={{
            ...shadowToRN(
              theme.shadowDefinitions[pressed ? 'xs' : 'md'],
            ),
            backgroundColor: theme.colors.surface,
            borderRadius: 8,
            padding: 16,
          }}
        >
          {children}
        </View>
      )}
    </Pressable>
  );
}
```

---

## Notes

- React Native only supports a single shadow layer. `shadowToRN()` uses the first layer from the definition array.
- `shadowRadius` is `blur / 2` (CSS blur is roughly 2× the RN equivalent).
- `elevation` (Android) is approximated as `Math.ceil(blur / 2)`.
- `inset` shadows are not supported in React Native and are ignored.
