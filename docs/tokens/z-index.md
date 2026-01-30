# Z-Index

Z-index tokens provide a consistent layering system for stacking UI elements. The z-index system
prevents conflicts and ensures proper visual hierarchy across your application.

## Z-Index Scale

The z-index system uses predefined layers to organize elements by their stacking context.

### Layer Hierarchy

| Layer              | Value | Usage                               |
| ------------------ | ----- | ----------------------------------- |
| **negative**       | -1    | Behind content, decorative elements |
| **default**        | 0     | Normal document flow                |
| **above**          | 100   | Slightly elevated content           |
| **dropdown**       | 1000  | Dropdown menus                      |
| **header**         | 1010  | Sticky headers, navigation bars     |
| **sidebar**        | 1020  | Sidebar panels                      |
| **sticky**         | 1020  | Sticky elements                     |
| **fixed**          | 1030  | Fixed positioned elements           |
| **overlay**        | 1030  | Overlays, backdrops                 |
| **modal-backdrop** | 1040  | Modal backdrop/overlay              |
| **modal**          | 1050  | Modal dialogs                       |
| **popover**        | 1060  | Popovers, floating elements         |
| **tooltip**        | 1070  | Tooltips                            |
| **notification**   | 1080  | Toast notifications, alerts         |
| **top**            | 9999  | Highest priority elements           |

## Hvordan Bruger Man Z-Index

### Dropdown Menus

```scss
@use '@ipeeon/design-tokens' as tokens;

.dropdown {
  position: relative;

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: $z-index-dropdown; // 1000
    background: white;
    border-radius: tokens.radius('md');
    box-shadow: tokens.shadow('medium');
    margin-top: tokens.spacing(2);
  }
}
```

### Sticky Navigation

```scss
.navbar {
  position: sticky;
  top: 0;
  z-index: $z-index-header; // 1010
  background: white;
  box-shadow: tokens.shadow('subtle');
  padding: tokens.spacing(4) tokens.spacing(6);
}

// Mobile sidebar
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: $z-index-sidebar; // 1020
  background: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease;

  &.open {
    transform: translateX(0);
  }
}
```

### Modal Dialogs

```scss
// Modal backdrop
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: $z-index-modal-backdrop; // 1040
}

// Modal dialog
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index-modal; // 1050
  background: white;
  border-radius: tokens.radius('xl');
  padding: tokens.spacing(8);
  box-shadow: tokens.shadow('extra-large');
  max-width: 90vw;
  max-height: 90vh;
}
```

### Tooltips & Popovers

```scss
// Popover
.popover {
  position: absolute;
  z-index: $z-index-popover; // 1060
  background: white;
  border: 1px solid tokens.getColor('gray', 200);
  border-radius: tokens.radius('md');
  padding: tokens.spacing(4);
  box-shadow: tokens.shadow('medium');
}

// Tooltip
.tooltip {
  position: absolute;
  z-index: $z-index-tooltip; // 1070
  background: tokens.getColor('gray', 900);
  color: white;
  padding: tokens.spacing(2) tokens.spacing(3);
  border-radius: tokens.radius('sm');
  font-size: tokens.font-size('sm');
  white-space: nowrap;
}
```

### Toast Notifications

```scss
.toast-container {
  position: fixed;
  top: tokens.spacing(4);
  right: tokens.spacing(4);
  z-index: $z-index-notification; // 1080
  display: flex;
  flex-direction: column;
  gap: tokens.spacing(3);
}

.toast {
  min-width: 300px;
  padding: tokens.spacing(4);
  background: white;
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('large');
  border: 1px solid tokens.getColor('gray', 200);
}
```

### Decorative Elements

```scss
// Behind content decorative element
.decorative-shape {
  position: absolute;
  z-index: $z-index-negative; // -1
  opacity: 0.1;
  pointer-events: none;
}

// Floating above content
.floating-badge {
  position: absolute;
  top: tokens.spacing(-2);
  right: tokens.spacing(-2);
  z-index: $z-index-above; // 100
  background: tokens.getColor('red', 500);
  color: white;
  border-radius: tokens.radius('round');
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: tokens.font-size('xs');
}
```

### Complex Stacking Examples

```scss
// Image card with overlay and floating action
.image-card {
  position: relative;

  img {
    position: relative;
    z-index: $z-index-default; // 0
    width: 100%;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: $z-index-above; // 100
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: tokens.spacing(6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .floating-action {
    position: absolute;
    top: tokens.spacing(4);
    right: tokens.spacing(4);
    z-index: $z-index-above + 1; // 101
  }
}
```

### Loading Overlay

```scss
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-index-top; // 9999
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    // Loading spinner
  }
}
```

## Usage

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.modal {
  z-index: $z-index-modal;
}

.tooltip {
  z-index: $z-index-tooltip;
}

.header {
  z-index: $z-index-header;
}
```

### CSS Variables

```css
.modal {
  z-index: var(--z-index-modal);
}

.tooltip {
  z-index: var(--z-index-tooltip);
}

.header {
  z-index: var(--z-index-header);
}
```

## Best Practices

::: tip Do

- Use predefined z-index values from the scale
- Keep related elements in adjacent z-index layers
- Document why you need a custom z-index if you deviate from the scale
- Use stacking contexts intentionally (position + z-index together)
- Test z-index layering with multiple elements open simultaneously :::

::: warning Don't

- Use arbitrary z-index values like `z-index: 99999`
- Create z-index wars by incrementing values arbitrarily
- Forget that z-index only works on positioned elements
- Nest positioned elements without considering stacking contexts
- Use z-index to solve layout issues that could be fixed with proper HTML structure :::

## Stacking Context Rules

Understanding stacking contexts is crucial for proper z-index usage:

```scss
// Creates a new stacking context
.stacking-context {
  position: relative; // or absolute, fixed, sticky
  z-index: 1;

  // Children are layered within this context
  .child-1 {
    position: relative;
    z-index: 100; // Only compares to siblings within same stacking context
  }

  .child-2 {
    position: relative;
    z-index: 200; // Will be above child-1
  }
}

// This element with lower z-index but outside the stacking context
// can appear above high z-index children inside the context
.outside-element {
  position: relative;
  z-index: 2; // Higher than .stacking-context, so appears above ALL its children
}
```

## Common Patterns

### Portal Pattern (Modal, Tooltip)

```scss
// Render modals/tooltips at document root to avoid stacking context issues
.portal-root {
  position: fixed;
  inset: 0;
  pointer-events: none; // Allow clicks through

  & > * {
    pointer-events: auto; // Re-enable clicks on children
  }
}
```

### Layered Cards

```scss
.card-stack {
  .card {
    position: relative;
    z-index: $z-index-default;
    transition:
      z-index 0s,
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      z-index: $z-index-above;
      transform: translateY(-8px);
      box-shadow: tokens.shadow('large');
    }
  }
}
```
