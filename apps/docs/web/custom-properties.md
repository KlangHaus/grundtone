# CSS Custom Properties Reference

Complete reference of all CSS custom properties emitted on `:root` by `@grundtone/design-tokens`.
All values derive from `@grundtone/core` (single source of truth) and can be overridden at runtime.

```css
.card {
  background: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

For SCSS accessor functions that wrap these vars, see [SCSS Functions](/web/functions).

---

## Colors

38 semantic color tokens with automatic `light-dark()` switching. See [Colors & Theming](/web/colors)
for the full list, swatches, and override instructions.

```css
var(--color-primary)
var(--color-text)
var(--color-background)
/* etc. — 38 tokens */
```

---

## Typography

### Font Families

| Custom property          | Default value                                        |
| ------------------------ | ---------------------------------------------------- |
| `--font-family-base`    | `'IBM Plex Sans', -apple-system, …, sans-serif`      |
| `--font-family-heading` | `'IBM Plex Sans', -apple-system, …, sans-serif`      |
| `--font-family-mono`    | `'IBM Plex Mono', ui-monospace, …, monospace`        |

### Font Sizes

| Custom property     | Value    |
| ------------------- | -------- |
| `--font-size-xs`   | 0.75rem  |
| `--font-size-sm`   | 0.875rem |
| `--font-size-base` | 1rem     |
| `--font-size-lg`   | 1.125rem |
| `--font-size-xl`   | 1.25rem  |
| `--font-size-2xl`  | 1.5rem   |
| `--font-size-3xl`  | 1.875rem |
| `--font-size-4xl`  | 2.25rem  |
| `--font-size-5xl`  | 3rem     |

### Font Weights

| Custom property          | Value |
| ------------------------ | ----- |
| `--font-weight-thin`     | 100   |
| `--font-weight-light`    | 300   |
| `--font-weight-normal`   | 400   |
| `--font-weight-medium`   | 500   |
| `--font-weight-semibold` | 600   |
| `--font-weight-bold`     | 700   |
| `--font-weight-extrabold`| 800   |

### Line Heights

| Custom property         | Value |
| ----------------------- | ----- |
| `--line-height-none`    | 1     |
| `--line-height-tight`   | 1.25  |
| `--line-height-snug`    | 1.375 |
| `--line-height-normal`  | 1.5   |
| `--line-height-relaxed` | 1.625 |
| `--line-height-loose`   | 2     |

---

## Spacing

| Custom property | Value   |
| --------------- | ------- |
| `--space-xs`   | 0.25rem |
| `--space-sm`   | 0.5rem  |
| `--space-md`   | 1rem    |
| `--space-lg`   | 1.5rem  |
| `--space-xl`   | 2rem    |
| `--space-2xl`  | 3rem    |
| `--space-3xl`  | 4rem    |
| `--space-4xl`  | 6rem    |

---

## Border Radius

| Custom property  | Value    |
| ---------------- | -------- |
| `--radius-none` | 0        |
| `--radius-xs`   | 0.125rem |
| `--radius-sm`   | 0.25rem  |
| `--radius-md`   | 0.375rem |
| `--radius-lg`   | 0.5rem   |
| `--radius-xl`   | 0.75rem  |
| `--radius-2xl`  | 1rem     |
| `--radius-3xl`  | 1.5rem   |
| `--radius-full` | 9999px   |

---

## Shadows

| Custom property  | Description        |
| ---------------- | ------------------ |
| `--shadow-xs`    | Subtle lift        |
| `--shadow-sm`    | Light shadow       |
| `--shadow-md`    | Medium elevation   |
| `--shadow-lg`    | Card/modal level   |
| `--shadow-xl`    | High elevation     |
| `--shadow-2xl`   | Maximum elevation  |
| `--shadow-inner` | Inset shadow       |
| `--shadow-none`  | No shadow          |

```css
.card { box-shadow: var(--shadow-sm); }
.modal { box-shadow: var(--shadow-lg); }
```

---

## Z-Index

| Custom property     | Value |
| ------------------- | ----- |
| `--z-dropdown`      | 1000  |
| `--z-sticky`        | 1020  |
| `--z-fixed`         | 1030  |
| `--z-modal-backdrop`| 1040  |
| `--z-modal`         | 1050  |
| `--z-popover`       | 1060  |
| `--z-tooltip`       | 1070  |
| `--z-toast`         | 1080  |

---

## Transitions

### Durations

| Custom property    | Value |
| ------------------ | ----- |
| `--duration-fast` | 150ms |
| `--duration-base` | 300ms |
| `--duration-slow` | 500ms |

### Timing Functions

| Custom property | Value                           |
| --------------- | ------------------------------- |
| `--ease`        | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`   |
| `--ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`   |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--linear`      | `linear`                        |

---

## Grid

| Custom property       | Default |
| --------------------- | ------- |
| `--grid-auto-fit-min` | 250px   |

---

## Overriding at Runtime

All properties can be overridden on any element:

```css
/* Override globally */
:root {
  --space-md: 1.25rem;
  --radius-md: 0.5rem;
}

/* Override per component */
.compact-card {
  --space-md: 0.75rem;
}
```

For build-time SCSS overrides, see [Colors](/web/colors#custom-colors-scss) and
[Breakpoints](/web/colors#custom-breakpoints).
