# Text Utilities

Utility classes for text color, alignment, decoration, and transform. All utilities support responsive breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Text Color

Semantic text color utilities. Values reference theme color tokens
so they adapt to light/dark mode automatically.

### Classes

| Class            | CSS variable                   |
| ---------------- | ------------------------------ |
| `text-default`   | `var(--color-text)`            |
| `text-secondary` | `var(--color-text-secondary)`  |
| `text-tertiary`  | `var(--color-text-tertiary)`   |
| `text-inverse`   | `var(--color-text-inverse)`    |
| `text-placeholder`| `var(--color-text-placeholder)`|
| `text-disabled`  | `var(--color-text-disabled)`   |
| `text-primary`   | `var(--color-primary)`         |
| `text-on-primary`| `var(--color-on-primary)`      |
| `text-success`   | `var(--color-success)`         |
| `text-warning`   | `var(--color-warning)`         |
| `text-error`     | `var(--color-error)`           |
| `text-info`      | `var(--color-info)`            |
| `text-inherit`   | `inherit`                      |

<CodePreview name="tc-semantic" />

<CodePreview name="tc-status" />

### Responsive

```html
<p class="text-secondary md:text-default">
  Secondary on mobile, default from md up
</p>
```

### SCSS

```scss
@use '@grundtone/design-system/scss/lib' as gt;

.caption {
  color: gt.color('text-secondary');
}
```

---

## Text Alignment

### Classes

<CodePreview name="ta-basic" />

| Class          | CSS                  |
| -------------- | -------------------- |
| `.text-left`   | `text-align: left`   |
| `.text-center` | `text-align: center` |
| `.text-right`  | `text-align: right`  |
| `.text-justify` | `text-align: justify` |

### Responsive

Change alignment at different breakpoints using the `{breakpoint}:` prefix:

<CodePreview name="ta-responsive" />

```html
<!-- Left on mobile, centered from md up -->
<h1 class="text-left md:text-center">Responsive heading</h1>

<!-- Centered on mobile, right-aligned from lg up -->
<p class="text-center lg:text-right">Responsive paragraph</p>
```

| Class               | Applies from |
| ------------------- | ------------ |
| `.text-center`      | All sizes    |
| `.sm:text-center`   | ≥ 640px      |
| `.md:text-center`   | ≥ 768px      |
| `.lg:text-center`   | ≥ 1024px     |
| `.xl:text-center`   | ≥ 1280px     |
| `.2xl:text-center`  | ≥ 1536px     |

The same breakpoint prefixes work for `-left`, `-right`, and `-justify`.

See [Breakpoints](/web/breakpoints) for the full breakpoint scale and customisation.

---

## Text Decoration

Underline, line-through, and no-underline utility classes.

### Classes

| Class           | CSS                             |
| --------------- | ------------------------------- |
| `underline`     | `text-decoration: underline`    |
| `line-through`  | `text-decoration: line-through` |
| `no-underline`  | `text-decoration: none`         |

<CodePreview name="ty-decoration" />

### Usage

```html
<a href="#" class="no-underline">Link without underline</a>
<span class="line-through">Discounted price</span>
```

### Responsive

```html
<span class="no-underline md:underline">
  Underlined from md and up
</span>
```

---

## Text Transform

Uppercase, lowercase, capitalize, and normal-case utility classes.

### Classes

| Class         | CSS                          |
| ------------- | ---------------------------- |
| `uppercase`   | `text-transform: uppercase`  |
| `lowercase`   | `text-transform: lowercase`  |
| `capitalize`  | `text-transform: capitalize` |
| `normal-case` | `text-transform: none`       |

<CodePreview name="ty-transform" />

### Responsive

```html
<span class="uppercase md:normal-case">
  Uppercase on mobile only
</span>
```
