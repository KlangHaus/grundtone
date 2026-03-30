# Card

Cards are used as a visual boundary around content or interactive elements that belong to the same topic. They can also be used for navigation.

---

## When to use

Use cards to group content and functionality that is distinct from the rest of the page.

## When not to use

- Do not use cards for the primary content of a page. Cards are for content that can stand and be understood on its own while still being part of the overall solution.
- Do not use cards purely for visual appearance. Cards should be used when they communicate the content most effectively.
- Do not use cards to group form elements. Use headings or a step indicator instead.

---

## Guidelines

Keep card text short and precise — avoid long paragraphs.

Ensure cards appear calm in the page layout and do not break the user's natural reading flow. Use the design system's [grid](/web/grid-utility) to determine card widths. Cards placed side by side should have equal height.

Do not use horizontally placed cards for long lists of content where the user needs to search for something specific (Laubheimer, 2016). Use a vertical layout instead, e.g. with horizontal cards.

Avoid mixing navigation cards (where the entire card is clickable) with other cards in the same list. Users may become confused about what is interactive.

Cards must always have a **title** and **body text**. They can also contain:

- Subheading
- Links
- Buttons
- Illustration (infographic or image). Add a descriptive `alt` text for images that carry meaning. Purely decorative images must have an empty `alt=""` so screen readers skip them.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.card` | Base flex container with surface background and border-radius |
| `.card--bordered` | Bordered variant — border instead of raised surface |
| `.card--flat` | Flat variant — no background, no border |
| `.card--nav` | Navigation card — entire card is clickable with hover elevation |
| `.card--horizontal` | Horizontal layout — image left, content right |
| `.card__media` | Image wrapper with 16:9 aspect ratio |
| `.card__content` | Content container with padding and flex gap |
| `.card__subheading` | Small uppercase text above the title |
| `.card__title` | Card title (required) |
| `.card__body` | Body text content |
| `.card__footer` | Footer pushed to bottom via `margin-top: auto` |
| `.card__arrow` | Arrow icon for nav cards |

---

## Variants

### Standard (raised)

<CodePreview name="c-card-default" />

### Navigation card

Navigation cards take the user to another page. The entire card is clickable, indicated by an underlined title and an arrow icon in the bottom-right corner.

If the navigation card links to an external page that opens in a new tab, an external link icon replaces the arrow.

Navigation cards can be used with or without an image.

<CodePreview name="c-card-nav" />

### Bordered

<CodePreview name="c-card-bordered" />

### Flat

<CodePreview name="c-card-flat" />

### Card with buttons

Cards can contain buttons and links in the footer. Keep the number of interactive elements low — one or two is ideal (Coyle, 2020).

<CodePreview name="c-card-with-buttons" />

### Horizontal card

In horizontal cards, the image, text, and arrow icon are arranged in a horizontal layout. These cards are best suited for short text and/or cards that are wider than six grid columns (~500px) on desktop. On mobile, horizontal cards fall back to the standard vertical layout.

Both standard and navigation cards can be horizontal.

<CodePreview name="c-card-horizontal" />

---

## Usage

```html
<!-- Standard card -->
<article class="card">
  <div class="card__media">
    <img src="/image.jpg" alt="Description" />
  </div>
  <div class="card__content">
    <span class="card__subheading">Category</span>
    <h3 class="card__title">Card Title</h3>
    <div class="card__body">
      <p>Card body text goes here.</p>
    </div>
    <div class="card__footer">
      <a href="#">Read more</a>
    </div>
  </div>
</article>

<!-- Navigation card -->
<a href="/page" class="card card--nav">
  <div class="card__content">
    <h3 class="card__title">Clickable Card</h3>
    <div class="card__body">
      <p>Entire card is a link.</p>
    </div>
  </div>
</a>
```

### Sizing

A card has no intrinsic width — it fills whatever container it sits in. The width should always come from the layout context: a grid column, a flex parent, or a wrapper with a max-width utility.

```html
<!-- Grid controls the width — cards fill their column -->
<div class="grid grid-cols-3 gap-md">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</div>

<!-- Standalone — constrain with a utility on a wrapper -->
<div class="max-w-sm">
  <article class="card">...</article>
</div>
```

Use a responsive grid so that 2, 3, or 4 cards sit side by side on larger screens and stack vertically on smaller screens. The grid ensures a calm visual structure.

Never set a fixed width on the card itself. Cards in a grid automatically stretch to equal height. Use `.card__footer` with `margin-top: auto` to push footers to the bottom.

---

## Accessibility

- Standard cards use `<article>` for semantic grouping
- Navigation cards use `<a>` — the entire card is one interactive element
- Do not nest interactive elements (buttons, links) inside navigation cards
- Navigation cards include a `focus-visible` ring (3px solid, 2px offset)
- `prefers-reduced-motion` disables the hover translateY animation
- Always provide `alt` text for meaningful images; use `alt=""` for decorative images

---

## Best practices

**Do:**
- Each card should cover a single topic (Coyle, 2020)
- Keep body text to a couple of short sentences at most
- Limit interactive elements — only a few links or buttons per card (Coyle, 2020)
- Use navigation cards for items that link to detail pages
- Use grids for card collections (2–4 columns)
- Use horizontal layout for featured content wider than ~500px

**Don't:**
- Do not put long text or many interactive elements in a card (Coyle, 2020)
- Do not combine content about different topics in the same card (Coyle, 2020)
- Do not nest links or buttons inside navigation cards
- Do not mix navigation cards with non-navigation cards in the same list
- Do not use horizontally placed cards for long searchable lists (Laubheimer, 2016)

---

## References

- Coyle, A. (2020). [Design Better Cards](https://uxdesign.cc/design-better-cards-c0d12ab581c4)
- Laubheimer, P. (2016). [Cards: UI-Component Definition](https://www.nngroup.com/articles/cards-component/). Nielsen Norman Group.
- Nielsen Norman Group. [Cards](https://www.nngroup.com/search/?q=cards&searchSubmit=Search)
