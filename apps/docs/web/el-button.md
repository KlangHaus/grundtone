# Button

Base element styles for `<button>`. Resets browser defaults to a clean, inheriting base.

---

## Base Reset

| Property | Value |
| --- | --- |
| `font-family` | `inherit` |
| `font-size` | `inherit` |
| `line-height` | `inherit` |
| `cursor` | `pointer` |
| `border` | `none` |
| `background` | `none` |
| `padding` | `0` |
| `color` | `inherit` |

### Preview

<CodePreview name="el-button" />

---

## Variants

### `.btn-primary`

Full-width primary action button with hover elevation.

| Class | Purpose |
| --- | --- |
| `.btn-primary` | Primary action with brand background, hover shadow, focus ring |

<CodePreview name="el-btn-primary" />

```html
<button class="btn-primary">Add to Cart</button>
```

---

### `.btn-secondary`

Secondary action button with muted background.

| Class | Purpose |
| --- | --- |
| `.btn-secondary` | Secondary action with muted background, hover shadow, focus ring |

<CodePreview name="el-btn-secondary" />

```html
<button class="btn-secondary">Save Draft</button>
```

---

### `.btn-outlined`

Border-only button that fills on hover.

| Class | Purpose |
| --- | --- |
| `.btn-outlined` | Outlined button with primary border, fills on hover |

<CodePreview name="el-btn-outlined" />

```html
<button class="btn-outlined">Learn More</button>
```

---

### `.btn-negative`

Destructive action button with error background.

| Class | Purpose |
| --- | --- |
| `.btn-negative` | Destructive action with error background, hover shadow, focus ring |

<CodePreview name="el-btn-negative" />

```html
<button class="btn-negative">Delete Account</button>
```

---

### `.btn-unstyled`

Full visual reset for custom button wrappers.

| Class | Purpose |
| --- | --- |
| `.btn-unstyled` | Strips all button styling, inherits font and color |

<CodePreview name="el-btn-unstyled" />

```html
<button class="btn-unstyled">Unstyled button</button>
```

---

### `.size-selector` / `.size-btn`

Inline size picker for product options.

| Class | Purpose |
| --- | --- |
| `.size-selector` | Flex container with wrapping |
| `.size-btn` | Individual size option with border |
| `.size-btn--active` | Selected state with primary background |
| `.size-btn:disabled` | Unavailable state (reduced opacity) |

<CodePreview name="el-size-selector" />

```html
<div class="size-selector">
  <button class="size-btn">S</button>
  <button class="size-btn size-btn--active">M</button>
  <button class="size-btn">L</button>
  <button class="size-btn" disabled>XXL</button>
</div>
```

---

### `.filter-bar` / `.filter-chip`

Horizontal filter toggle bar.

| Class | Purpose |
| --- | --- |
| `.filter-bar` | Flex container with wrapping |
| `.filter-chip` | Pill-shaped toggle button |
| `.filter-chip--active` | Selected state with primary background |

<CodePreview name="el-filter-chip" />

```html
<div class="filter-bar">
  <button class="filter-chip filter-chip--active">All</button>
  <button class="filter-chip">T-shirts</button>
  <button class="filter-chip">Posters</button>
</div>
```
