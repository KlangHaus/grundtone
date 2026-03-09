# Sizing

Height, min-width, and max-width utilities.

---

## Height

| Class       | CSS                    |
| ----------- | ---------------------- |
| `h-0`       | `height: 0`            |
| `h-4`       | `height: 1rem`         |
| `h-6`       | `height: 1.5rem`       |
| `h-8`       | `height: 2rem`         |
| `h-10`      | `height: 2.5rem`       |
| `h-12`      | `height: 3rem`         |
| `h-14`      | `height: 3.5rem`       |
| `h-16`      | `height: 4rem`         |
| `h-20`      | `height: 5rem`         |
| `h-24`      | `height: 6rem`         |
| `h-32`      | `height: 8rem`         |
| `h-40`      | `height: 10rem`        |
| `h-48`      | `height: 12rem`        |
| `h-56`      | `height: 14rem`        |
| `h-64`      | `height: 16rem`        |
| `h-72`      | `height: 18rem`        |
| `h-80`      | `height: 20rem`        |
| `h-96`      | `height: 24rem`        |
| `h-auto`    | `height: auto`         |
| `h-full`    | `height: 100%`         |
| `h-screen`  | `height: 100vh`        |
| `h-min`     | `height: min-content`  |
| `h-max`     | `height: max-content`  |
| `h-fit`     | `height: fit-content`  |

<CodePreview name="sz-height" />

---

## Max Width

| Class          | CSS                  |
| -------------- | -------------------- |
| `max-w-none`   | `max-width: none`    |
| `max-w-xs`     | `max-width: 20rem`   |
| `max-w-sm`     | `max-width: 24rem`   |
| `max-w-md`     | `max-width: 28rem`   |
| `max-w-lg`     | `max-width: 32rem`   |
| `max-w-xl`     | `max-width: 36rem`   |
| `max-w-2xl`    | `max-width: 42rem`   |
| `max-w-3xl`    | `max-width: 48rem`   |
| `max-w-4xl`    | `max-width: 56rem`   |
| `max-w-full`   | `max-width: 100%`    |
| `max-w-prose`  | `max-width: 65ch`    |

<CodePreview name="sz-max-width" />

---

## Min Width

| Class          | CSS                      |
| -------------- | ------------------------ |
| `min-w-0`      | `min-width: 0`           |
| `min-w-full`   | `min-width: 100%`        |
| `min-w-min`    | `min-width: min-content` |
| `min-w-max`    | `min-width: max-content` |
| `min-w-fit`    | `min-width: fit-content` |

---

## Responsive Variants

All sizing classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<div class="h-16 md:h-32 max-w-sm lg:max-w-lg">
  Responsive sizing
</div>
```
