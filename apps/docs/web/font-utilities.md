# Font Utilities

Utility classes for font size, weight, line height, family, and letter spacing. All utilities support responsive breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Font Size

9-step font size scale. All classes reference CSS custom properties from the theme.

### Classes

| Class      | CSS variable            | Default  |
| ---------- | ----------------------- | -------- |
| `text-xs`  | `var(--font-size-xs)`   | 0.75rem  |
| `text-sm`  | `var(--font-size-sm)`   | 0.875rem |
| `text-base`| `var(--font-size-base)` | 1rem     |
| `text-lg`  | `var(--font-size-lg)`   | 1.125rem |
| `text-xl`  | `var(--font-size-xl)`   | 1.25rem  |
| `text-2xl` | `var(--font-size-2xl)`  | 1.5rem   |
| `text-3xl` | `var(--font-size-3xl)`  | 1.875rem |
| `text-4xl` | `var(--font-size-4xl)`  | 2.25rem  |
| `text-5xl` | `var(--font-size-5xl)`  | 3rem     |

<CodePreview name="ty-sizes" />

### Responsive

```html
<h1 class="text-2xl md:text-4xl">Responsive heading</h1>
```

---

## Font Weight

7-step font weight scale from thin (100) to extrabold (800).

### Classes

| Class           | CSS variable                  | Value |
| --------------- | ----------------------------- | ----- |
| `font-thin`     | `var(--font-weight-thin)`     | 100   |
| `font-light`    | `var(--font-weight-light)`    | 300   |
| `font-normal`   | `var(--font-weight-normal)`   | 400   |
| `font-medium`   | `var(--font-weight-medium)`   | 500   |
| `font-semibold` | `var(--font-weight-semibold)` | 600   |
| `font-bold`     | `var(--font-weight-bold)`     | 700   |
| `font-extrabold`| `var(--font-weight-extrabold)`| 800   |

<CodePreview name="ty-weights" />

### Responsive

```html
<p class="font-normal md:font-bold">Bold from md and up</p>
```

---

## Line Height

6-step line height scale.

### Classes

| Class            | CSS variable                | Value |
| ---------------- | --------------------------- | ----- |
| `leading-none`   | `var(--line-height-none)`   | 1     |
| `leading-tight`  | `var(--line-height-tight)`  | 1.25  |
| `leading-snug`   | `var(--line-height-snug)`   | 1.375 |
| `leading-normal` | `var(--line-height-normal)` | 1.5   |
| `leading-relaxed`| `var(--line-height-relaxed)`| 1.625 |
| `leading-loose`  | `var(--line-height-loose)`  | 2     |

### Responsive

```html
<p class="leading-normal md:leading-relaxed">
  Relaxed line height from md and up
</p>
```

---

## Font Family

Utility classes for switching between the three font family tokens.

### Classes

| Class         | CSS variable                |
| ------------- | --------------------------- |
| `font-base`   | `var(--font-family-base)`   |
| `font-heading`| `var(--font-family-heading)`|
| `font-mono`   | `var(--font-family-mono)`   |

### Responsive

```html
<code class="font-mono">monospace text</code>
```

---

## Letter Spacing

6-step letter spacing scale from tighter (−0.05em) to widest (0.1em).

### Classes

| Class              | Value    |
| ------------------ | -------- |
| `tracking-tighter` | −0.05em  |
| `tracking-tight`   | −0.025em |
| `tracking-normal`  | 0        |
| `tracking-wide`    | 0.025em  |
| `tracking-wider`   | 0.05em   |
| `tracking-widest`  | 0.1em    |

<CodePreview name="ty-tracking" />

### Responsive

```html
<h1 class="tracking-tight md:tracking-normal">
  Tighter tracking on mobile
</h1>
```
