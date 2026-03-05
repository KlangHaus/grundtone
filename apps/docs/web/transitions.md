# Transition Utilities

Performance-optimised transition classes that target specific CSS properties instead of `all`.
All transition classes respect `prefers-reduced-motion` automatically.

## Usage

```html
<button class="transition-colors">Hover me</button>
<div class="transition-opacity">Fade element</div>
```

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

// Or use the SCSS function for custom transitions:
.custom {
  transition: opacity gt.duration('base') gt.ease('ease-out');
}
```

---

## Available Classes

| Class                  | Transition properties                       |
| ---------------------- | ------------------------------------------- |
| `transition-colors`    | `background-color`, `border-color`, `color` |
| `transition-shadow`    | `box-shadow`                                |
| `transition-transform` | `transform`                                 |
| `transition-opacity`   | `opacity`                                   |
| `transition-all`       | `all` (use sparingly)                       |
| `transition-none`      | Disables transitions                        |

All classes use `--duration-fast` (150ms) and `--ease-out` by default.

::: tip Prefer specific transitions
`transition-all` animates every property change, which can cause layout jank and unexpected visual
artefacts. Use a specific class (`transition-colors`, `transition-opacity`, etc.) whenever possible.
:::

---

## Responsive Variants

All classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<!-- No transition on mobile, color transition from md up -->
<button class="transition-none md:transition-colors">Responsive</button>
```

---

## Accessibility

Transitions are automatically disabled for users who have enabled **Reduce Motion** in their OS
settings:

```css
@media (prefers-reduced-motion: reduce) {
  .transition-colors,
  .transition-shadow,
  .transition-transform,
  .transition-opacity,
  .transition-all {
    transition-duration: 0.01ms !important;
  }
}
```

This sets `transition-duration` to near-zero rather than removing the transition entirely, so
`transitionend` events still fire and JavaScript logic relying on them continues to work.

---

## Duration & Timing Tokens

Override the defaults with CSS custom properties or the SCSS functions:

| Token              | Value  |
| ------------------ | ------ |
| `--duration-fast`  | 150ms  |
| `--duration-base`  | 300ms  |
| `--duration-slow`  | 500ms  |

| Token            | Value                           |
| ---------------- | ------------------------------- |
| `--ease`         | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-in`      | `cubic-bezier(0.4, 0, 1, 1)`   |
| `--ease-out`     | `cubic-bezier(0, 0, 0.2, 1)`   |
| `--ease-in-out`  | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--linear`       | `linear`                        |

```html
<!-- Slower transition via inline override -->
<div class="transition-opacity" style="transition-duration: var(--duration-slow)">
  Slow fade
</div>
```
