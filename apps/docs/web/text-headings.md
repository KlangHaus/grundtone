# Headings

Headings structure the page, provide an overview, and help the user and
screen readers navigate the page's logic and layout.

---

## How to use headings

Heading levels serve two purposes:

- They create a **visual hierarchy** on the page.
- They function as the page's **table of contents for screen readers**.

A good heading structure is essential for screen reader users to understand and navigate the page content. It is possible to follow a strict heading structure for screen readers while also adapting the headings' visual appearance for visually oriented users.

### When should you use headings?

Use headings to create structure on your page and group your content into logical and manageable sections — for both screen readers and visually oriented users.

### When should you consider other formatting?

Use formatting other than headings if you want to highlight or change the styling of text that does not affect the page structure. For example, use:

- [Callout](/web/c-callout) for information and messages
- Lists to highlight specific points with bullet points
- [Display Text](/web/text-highlight#display-text) to mark selected parts of the text

---

## Design values

All headings use `--font-family-heading` and have `margin: 0 0 var(--space-sm)`.

The design values below are listed in px for readability. In the design system's stylesheet, heading font sizes are defined in `rem`. It is recommended to use relative values for font size and a unitless number for line height.

| Element | Font Size | Font Weight | Line Height |
| --- | --- | --- | --- |
| `h1` | `--font-size-3xl` | `extrabold` | `--line-height-none` (1) |
| `h2` | `--font-size-2xl` | `bold` | `--line-height-tight` (1.25) |
| `h3` | `--font-size-xl` | `semibold` | `--line-height-tight` (1.25) |
| `h4` | `--font-size-lg` | `semibold` | `--line-height-snug` (1.375) |
| `h5` | `--font-size-base` | `medium` | `--line-height-normal` (1.5) |
| `h6` | `--font-size-sm` | `medium` | `--line-height-normal` (1.5) |

### Preview

<CodePreview name="el-headings" />

---

## Usage

```html
<h1>Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
```

Heading styles are applied at the element level. The `.prose` component overrides `h2` and `h3` with higher specificity for long-form content.

---

## Heading as link

### Use for

Heading links can be used on pages where the user can navigate to other pages in the same solution. Heading links are also used for headings on search result pages.

### Do not use for

Must not be used to emphasize links or as a replacement for standard links.

```html
<h2><a href="/results">Search results</a></h2>
```

---

## Solution title in header

### Use for

Used in the header as the title of the entire solution. The title should be the same on every page.

### Do not use for

Should not be used anywhere other than in the header.

```html
<header class="header">
  <a href="/">Solution title</a>
  <nav>...</nav>
</header>
```

---

## Subheading

Use `<hgroup>` to add secondary text to a heading. See [Hgroup](#hgroup) below.

### Use for

Adding secondary text to a heading.

### Do not use for

Must not be used as a standalone heading.

```html
<hgroup>
  <h2>Product Launch</h2>
  <p>Introducing our latest design tokens collection</p>
</hgroup>
```

---

## Hgroup

Element styles for `<hgroup>`. Groups a heading with secondary content like a subheading or tagline.

### Styling

| Selector | Properties |
| --- | --- |
| `hgroup` | `display: block` |
| `hgroup > h1–h6` | `margin-bottom: 0` |
| `hgroup > p` | `margin: 0`, secondary color, `font-size-sm` |

### Preview

<CodePreview name="el-hgroup" />

### Usage

```html
<hgroup>
  <h2>Product Launch</h2>
  <p>Introducing our latest design tokens collection</p>
</hgroup>
```

The heading's bottom margin is removed so the subtitle sits tight beneath it.

---

## Further reading

- [H42: Using h1-h6 to identify headings (W3C)](https://www.w3.org/WAI/WCAG21/Techniques/html/H42)
- [Page structure: Headings (W3C WAI)](https://www.w3.org/WAI/tutorials/page-structure/headings/)
