# Z-Index (React Native)

Z-index layer tokens are available via `theme.zIndex` from the `useGrundtoneTheme()` hook.

---

## Layer Scale

| Token           | Value |
| --------------- | ----- |
| `dropdown`      | 1000  |
| `sticky`        | 1020  |
| `fixed`         | 1030  |
| `modalBackdrop` | 1040  |
| `modal`         | 1050  |
| `popover`       | 1060  |
| `tooltip`       | 1070  |
| `toast`         | 1080  |

---

## Usage

Values are already numbers — use directly in styles:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function Toast({ message }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 32,
        left: 16,
        right: 16,
        zIndex: theme.zIndex.toast,
        backgroundColor: theme.colors.text,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: theme.colors.textInverse }}>{message}</Text>
    </View>
  );
}
```

---

## Common Patterns

### Modal with backdrop

```tsx
function Modal({ visible, onClose, children }) {
  const { theme } = useGrundtoneTheme();
  if (!visible) return null;

  return (
    <>
      <Pressable
        onPress={onClose}
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: theme.zIndex.modalBackdrop,
          backgroundColor: theme.colors.modalBackdrop,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: '20%',
          left: 24,
          right: 24,
          zIndex: theme.zIndex.modal,
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 24,
        }}
      >
        {children}
      </View>
    </>
  );
}
```

---

## Notes

- React Native `zIndex` only affects siblings within the same parent. Use a top-level portal or overlay container for modals and toasts.
- On Android, `elevation` also affects stacking order. If a component uses both `zIndex` and `elevation` (e.g. for shadows), ensure they are consistent.
