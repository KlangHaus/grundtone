# Width

Width utilities. Included in `@grundtone/design-tokens` CSS — see
[Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Keyword widths

<CodePreview name="w-keywords" />

| Class        | CSS                      |
| ------------ | ------------------------ |
| `.w-auto`    | `width: auto`            |
| `.w-full`    | `width: 100%`            |
| `.w-screen`  | `width: 100vw`           |
| `.w-min`     | `width: min-content`     |
| `.w-max`     | `width: max-content`     |
| `.w-fit`     | `width: fit-content`     |

---

## Fractional widths

Common layout fractions — use these for typical column-style splits.

<CodePreview name="w-fractions" />

| Class    | CSS                    |
| -------- | ---------------------- |
| `.w-25`  | `width: 25%`           |
| `.w-33`  | `width: 33.333333%`    |
| `.w-50`  | `width: 50%`           |
| `.w-66`  | `width: 66.666667%`    |
| `.w-75`  | `width: 75%`           |

---

## Percentage widths (10% steps)

| Class    | CSS            |
| -------- | -------------- |
| `.w-10`  | `width: 10%`   |
| `.w-20`  | `width: 20%`   |
| `.w-30`  | `width: 30%`   |
| `.w-40`  | `width: 40%`   |
| `.w-50`  | `width: 50%`   |
| `.w-60`  | `width: 60%`   |
| `.w-70`  | `width: 70%`   |
| `.w-80`  | `width: 80%`   |
| `.w-90`  | `width: 90%`   |

---

## Responsive

Change width at different breakpoints using the `{breakpoint}:` prefix:

<CodePreview name="w-responsive" />

```html
<!-- Full width on mobile, half from md, quarter from xl -->
<div class="w-full md:w-50 xl:w-25">Responsive element</div>

<!-- Auto width on mobile, fixed 33% from lg -->
<aside class="w-auto lg:w-33">Sidebar</aside>
```

| Class            | Applies from |
| ---------------- | ------------ |
| `.w-50`          | All sizes    |
| `.sm:w-50`       | ≥ 640px      |
| `.md:w-50`       | ≥ 768px      |
| `.lg:w-50`       | ≥ 1024px     |
| `.xl:w-50`       | ≥ 1280px     |
| `.2xl:w-50`      | ≥ 1536px     |

See [Breakpoints](/web/breakpoints) for the full breakpoint scale and customisation.
