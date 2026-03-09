# SCSS Functions

Convenience accessors for CSS custom properties. Each function returns a `var(--…)` reference,
keeping your SCSS decoupled from hardcoded values.

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.card {
  color: gt.color('text');
  padding: gt.space('lg');
  border-radius: gt.radius('md');
  box-shadow: gt.shadow('sm');
}
```

---

## `color($key)`

Returns `var(--color-{$key})`. Default: `'primary'`.

```scss
color: gt.color('text-secondary');
border-color: gt.color('border-light');
background: gt.color('surface');
```

See [Colors & Theming](/web/colors) for all available color tokens.

---

## `font-size($size)`

Returns `var(--font-size-{$size})`. Default: `'base'`.

| Key    | Value     |
| ------ | --------- |
| `xs`   | 0.75rem   |
| `sm`   | 0.875rem  |
| `base` | 1rem      |
| `lg`   | 1.125rem  |
| `xl`   | 1.25rem   |
| `2xl`  | 1.5rem    |
| `3xl`  | 1.875rem  |
| `4xl`  | 2.25rem   |
| `5xl`  | 3rem      |

```scss
.caption { font-size: gt.font-size('sm'); }
```

---

## `font-weight($weight)`

Returns `var(--font-weight-{$weight})`. Default: `'normal'`.

| Key         | Value |
| ----------- | ----- |
| `thin`      | 100   |
| `light`     | 300   |
| `normal`    | 400   |
| `medium`    | 500   |
| `semibold`  | 600   |
| `bold`      | 700   |
| `extrabold` | 800   |

---

## `font-family($family)`

Returns `var(--font-family-{$family})`. Default: `'base'`.

| Key       | Stack                    |
| --------- | ------------------------ |
| `base`    | IBM Plex Sans + fallback |
| `heading` | IBM Plex Sans + fallback |
| `mono`    | IBM Plex Mono + fallback |

---

## `line-height($height)`

Returns `var(--line-height-{$height})`. Default: `'normal'`.

| Key       | Value |
| --------- | ----- |
| `none`    | 1     |
| `tight`   | 1.25  |
| `snug`    | 1.375 |
| `normal`  | 1.5   |
| `relaxed` | 1.625 |
| `loose`   | 2     |

---

## `space($size)`

Returns `var(--space-{$size})`. Default: `'md'`.

| Key   | Value    |
| ----- | -------- |
| `xs`  | 0.25rem  |
| `sm`  | 0.5rem   |
| `md`  | 1rem     |
| `lg`  | 1.5rem   |
| `xl`  | 2rem     |
| `2xl` | 3rem     |
| `3xl` | 4rem     |
| `4xl` | 6rem     |

```scss
.stack > * + * { margin-top: gt.space('md'); }
```

---

## `radius($size)`

Returns `var(--radius-{$size})`. Default: `'md'`.

| Key    | Value    |
| ------ | -------- |
| `none` | 0        |
| `xs`   | 0.125rem |
| `sm`   | 0.25rem  |
| `md`   | 0.375rem |
| `lg`   | 0.5rem   |
| `xl`   | 0.75rem  |
| `2xl`  | 1rem     |
| `3xl`  | 1.5rem   |
| `full` | 9999px   |

```scss
.avatar { border-radius: gt.radius('full'); }
```

---

## `shadow($level)`

Returns `var(--shadow-{$level})`. Default: `'md'`.

| Key     | Description                  |
| ------- | ---------------------------- |
| `none`  | No shadow                    |
| `xs`    | Subtle lift                  |
| `sm`    | Light shadow                 |
| `md`    | Medium elevation             |
| `lg`    | Card/modal elevation         |
| `xl`    | High elevation               |
| `2xl`   | Maximum elevation            |
| `inner` | Inset shadow                 |

```scss
.card { box-shadow: gt.shadow('sm'); }
.modal { box-shadow: gt.shadow('lg'); }
```

---

## `z-index($layer)`

Returns `var(--z-{$layer})`. Default: `'modal'`.

| Key              | Value |
| ---------------- | ----- |
| `dropdown`       | 1000  |
| `sticky`         | 1020  |
| `fixed`          | 1030  |
| `modal-backdrop` | 1040  |
| `modal`          | 1050  |
| `popover`        | 1060  |
| `tooltip`        | 1070  |
| `toast`          | 1080  |

```scss
.tooltip { z-index: gt.z-index('tooltip'); }
```

---

## `duration($speed)`

Returns `var(--duration-{$speed})`. Default: `'base'`.

| Key    | Value |
| ------ | ----- |
| `fast` | 150ms |
| `base` | 300ms |
| `slow` | 500ms |

---

## `ease($type)`

Returns a timing function CSS var. Default: `'ease-out'`.

| Key          | Value                            |
| ------------ | -------------------------------- |
| `ease`       | `cubic-bezier(0.4, 0, 0.2, 1)`  |
| `ease-in`    | `cubic-bezier(0.4, 0, 1, 1)`    |
| `ease-out`   | `cubic-bezier(0, 0, 0.2, 1)`    |
| `ease-in-out`| `cubic-bezier(0.4, 0, 0.2, 1)`  |
| `linear`     | `linear`                         |

```scss
.fade {
  transition: opacity gt.duration('fast') gt.ease('ease-out');
}
```

---

## `breakpoint($name)`

Returns `var(--breakpoint-{$name})`.

| Key   | Value  |
| ----- | ------ |
| `sm`  | 640px  |
| `md`  | 768px  |
| `lg`  | 1024px |
| `xl`  | 1280px |
| `2xl` | 1536px |

For responsive styles, prefer the `media-breakpoint-up()` mixin from
[Breakpoints](/web/breakpoints) instead of using this function directly.
