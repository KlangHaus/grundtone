# @grundtone/composables

Vue 3 composables for the [Grundtone](https://grundtone.com) design system.

## Installation

```bash
npm install @grundtone/composables
```

## Usage

```vue
<script setup lang="ts">
  import { useToggle } from '@grundtone/composables';

  const { isOpen, toggle, open, close } = useToggle();
</script>

<template>
  <button @click="toggle">{{ isOpen ? 'Close' : 'Open' }}</button>
  <div v-if="isOpen">Content</div>
</template>
```

## Composables

### useTheme

Access the current Grundtone theme.

```typescript
const { theme, mode, setMode, isDark } = useTheme();
```

### useToggle

Manage boolean state.

```typescript
const { isOpen, toggle, open, close } = useToggle({ initialValue: false });
```

### useClickOutside

Detect clicks outside an element.

```typescript
const target = ref<HTMLElement>();
useClickOutside(target, () => {
  // clicked outside
});
```

### useContainerQuery

Responsive container queries.

```typescript
const { width, matches } = useContainerQuery(containerRef);
```

### useResponsiveCard

Responsive card layout detection.

```typescript
const { size } = useResponsiveCard(cardRef);
```

## Documentation

See [grundtone.com](https://grundtone.com) for full API reference and examples.

## License

MIT
