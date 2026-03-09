# Aspect Ratio

Utility classes for controlling the aspect ratio of elements using the native CSS `aspect-ratio`
property.

---

## Available Ratios

| Class             | Ratio        | Use case          |
| ----------------- | ------------ | ----------------- |
| `aspect-square`   | `1 / 1`     | Avatars, icons    |
| `aspect-video`    | `16 / 9`    | Video embeds      |
| `aspect-cinema`   | `21 / 9`    | Cinematic banners |
| `aspect-photo`    | `4 / 3`     | Photo thumbnails  |
| `aspect-portrait` | `3 / 4`     | Portrait cards    |
| `aspect-golden`   | `1.618 / 1` | Golden ratio      |
| `aspect-wide`     | `2 / 1`     | Hero banners      |
| `aspect-ultra-wide` | `32 / 9`  | Ultra-wide panels |

<CodePreview name="ar-ratios" />

---

## Custom Aspect Ratio

Use the `aspect-custom` class with the `--aspect-ratio` CSS custom property for any ratio:

<CodePreview name="ar-custom" />

---

## Responsive Variants

All classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

<CodePreview name="ar-responsive" />

---

## SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.hero {
  aspect-ratio: 21 / 9;

  @include gt.media-breakpoint-down('md') {
    aspect-ratio: 16 / 9;
  }
}
```
