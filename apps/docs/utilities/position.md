# Position

Position utilities control element positioning. Combine with top/right/bottom/left utilities for
precise placement.

## Position Classes

| Class                | Value                |
| -------------------- | -------------------- |
| `.position-static`   | `position: static`   |
| `.position-relative` | `position: relative` |
| `.position-absolute` | `position: absolute` |
| `.position-fixed`    | `position: fixed`    |
| `.position-sticky`   | `position: sticky`   |

## Hvordan Bruger Man

### Fixed Header

```html
<header class="position-fixed" style="top: 0; left: 0; right: 0">
  <nav>Navigation</nav>
</header>
```

### Sticky Sidebar

```html
<aside class="position-sticky" style="top: 1rem">
  <nav>Sidebar navigation</nav>
</aside>
```

### Absolute Positioning

```html
<div class="position-relative">
  <img src="image.jpg" alt="Image" />
  <div class="position-absolute" style="top: 1rem; right: 1rem">
    <button>Action</button>
  </div>
</div>
```

### Floating Badge

```html
<div class="position-relative">
  <button>Notifications</button>
  <span class="position-absolute" style="top: -0.5rem; right: -0.5rem">3</span>
</div>
```

## Best Practices

::: tip Do

- Use position-relative on parent for absolute children
- Combine with z-index for layering
- Use position-sticky for navigation :::

::: warning Don't

- Overuse absolute positioning
- Forget to set top/right/bottom/left
- Use position for layout (use flexbox/grid instead) :::
