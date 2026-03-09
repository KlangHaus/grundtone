# Position (React Native)

React Native uses Flexbox for layout by default. Position-related patterns use the `position`,
`top`, `right`, `bottom`, `left`, and `zIndex` style properties.

---

## Position Modes

React Native supports two position modes:

| Mode                 | Behaviour                                                  |
| -------------------- | ---------------------------------------------------------- |
| `relative` (default) | Element is positioned relative to its normal flow position |
| `absolute`           | Element is positioned relative to its parent               |

---

## Common Patterns

### Floating action button

```tsx
function FAB({ onPress }) {
  const { theme } = useGrundtoneTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
      }}
    >
      <Text style={{ color: theme.colors.onPrimary, fontSize: 24 }}>+</Text>
    </Pressable>
  );
}
```

### Badge overlay

```tsx
function Avatar({ uri, badgeCount }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View style={{ position: 'relative' }}>
      <Image source={{ uri }} style={{ width: 48, height: 48, borderRadius: 24 }} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: theme.colors.error,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
```

### Sticky header

```tsx
function StickyHeader({ title }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderLight,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </View>
  );
}
```

---

## Z-Index

React Native `zIndex` works similarly to CSS but only affects siblings. Use theme-consistent values
for layering:

```tsx
const layers = {
  base: 0,
  raised: 1,
  overlay: 10,
  modal: 100,
};
```
