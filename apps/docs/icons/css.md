# CSS Icon Utilities

Utility classes for sizing inline SVG icons. All sizes reference `icon-size()` tokens from the design system. Icons use `currentColor` to inherit the parent's text color.

Classes use the configurable `$prefix` (default `gt`). See [Component Prefix](/guide/prefix) for customization.

## Available Classes

| Class | Dimension |
| --- | --- |
| `.{prefix}-icon` | Base styles (inline-block, vertical-align, flex-shrink, currentColor) |
| `.{prefix}-icon--xs` | 12px (0.75rem) |
| `.{prefix}-icon--sm` | 16px (1rem) |
| `.{prefix}-icon--md` | 20px (1.25rem) |
| `.{prefix}-icon--lg` | 24px (1.5rem) — default |
| `.{prefix}-icon--xl` | 32px (2rem) |
| `.{prefix}-icon--2xl` | 40px (2.5rem) |

## Usage

Apply the base class plus a size modifier to any inline `<svg>`:

```html
<svg class="gt-icon gt-icon--lg" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 6L9 17l-5-5"/>
</svg>
```

### All Sizes

```html
<svg class="gt-icon gt-icon--xs" viewBox="0 0 24 24" ...>...</svg>
<svg class="gt-icon gt-icon--sm" viewBox="0 0 24 24" ...>...</svg>
<svg class="gt-icon gt-icon--md" viewBox="0 0 24 24" ...>...</svg>
<svg class="gt-icon gt-icon--lg" viewBox="0 0 24 24" ...>...</svg>
<svg class="gt-icon gt-icon--xl" viewBox="0 0 24 24" ...>...</svg>
<svg class="gt-icon gt-icon--2xl" viewBox="0 0 24 24" ...>...</svg>
```

## Color Inheritance

```html
<span style="color: var(--color-primary)">
  <svg class="gt-icon gt-icon--lg" ...>...</svg>
</span>
<span style="color: var(--color-error)">
  <svg class="gt-icon gt-icon--lg" ...>...</svg>
</span>
```

## With Buttons

```html
<button class="btn-primary">
  <svg class="gt-icon gt-icon--sm" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
  Confirm
</button>
```

## SCSS

```scss
@use '@grundtone/vue/scss/lib' as gt;

.custom-icon {
  width: gt.icon-size('lg');
  height: gt.icon-size('lg');
}
```
