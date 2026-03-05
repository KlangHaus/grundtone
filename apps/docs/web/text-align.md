# Text Alignment

Text alignment utilities. Included in `@grundtone/design-tokens` CSS — see
[Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Classes

<CodePreview name="ta-basic" />

| Class                | CSS                        |
| -------------------- | -------------------------- |
| `.align-text-left`   | `text-align: left`         |
| `.align-text-center` | `text-align: center`       |
| `.align-text-right`  | `text-align: right`        |

---

## Responsive

Change alignment at different breakpoints using the `{breakpoint}:` prefix:

<CodePreview name="ta-responsive" />

```html
<!-- Left on mobile, centered from md up -->
<h1 class="align-text-left md:align-text-center">Responsive heading</h1>

<!-- Centered on mobile, right-aligned from lg up -->
<p class="align-text-center lg:align-text-right">Responsive paragraph</p>
```

| Class                        | Applies from |
| ---------------------------- | ------------ |
| `.align-text-center`         | All sizes    |
| `.sm:align-text-center`      | ≥ 640px      |
| `.md:align-text-center`      | ≥ 768px      |
| `.lg:align-text-center`      | ≥ 1024px     |
| `.xl:align-text-center`      | ≥ 1280px     |
| `.2xl:align-text-center`     | ≥ 1536px     |

The same breakpoint prefixes work for `-left` and `-right`.

See [Breakpoints](/web/breakpoints) for the full breakpoint scale and customisation.
