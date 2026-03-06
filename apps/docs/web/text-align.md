# Text Alignment

Text alignment utilities. Included in `@grundtone/design-tokens` CSS — see
[Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Classes

<CodePreview name="ta-basic" />

| Class          | CSS                  |
| -------------- | -------------------- |
| `.text-left`   | `text-align: left`   |
| `.text-center` | `text-align: center` |
| `.text-right`  | `text-align: right`  |
| `.text-justify` | `text-align: justify` |

---

## Responsive

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
