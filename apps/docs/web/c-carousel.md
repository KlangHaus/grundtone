# Carousel

Cycling slideshow with controls, indicators, and optional autoplay. Supports slide and fade transitions, touch/swipe, and keyboard navigation.

## When to use

- Product image galleries
- Hero banners with multiple messages
- Testimonials or featured content rotation

## When not to use

- Critical content that must be seen — carousels bury content behind interaction
- Mobile-first designs with limited space — consider a scrollable list instead
- Content that updates frequently — users may miss changes

---

## Default

<CodePreview id="c-carousel-default" />

## Fade

<CodePreview id="c-carousel-fade" />

## With captions

<CodePreview id="c-carousel-caption" />

## Autoplay

<CodePreview id="c-carousel-autoplay" />

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.carousel` | Container — overflow hidden, rounded |
| `.carousel--fade` | Fade transition instead of slide |
| `.carousel__track` | Flex track with transform animation |
| `.carousel__slide` | Individual slide — `flex: 0 0 100%` |
| `.carousel__slide--active` | Active slide (used in fade mode) |
| `.carousel__caption` | Overlay caption with gradient |
| `.carousel__prev` / `.carousel__next` | Navigation buttons — blur backdrop, visible on hover |
| `.carousel__indicators` | Dot container |
| `.carousel__indicator` | Individual dot — pill shape |
| `.carousel__indicator--active` | Active dot — wider, filled |

## Data attributes (vanilla JS)

| Attribute | Description |
|-----------|-------------|
| `data-autoplay` | Enable auto-advance |
| `data-interval` | Autoplay interval in ms (default: 5000) |
| `data-loop` | Wrap around (`"true"` / `"false"`, default: true) |

---

## Accessibility

- Container has `aria-roledescription="carousel"` and `aria-label`
- Slides have `role="tabpanel"` and `aria-hidden` toggled
- Indicators use `role="tab"` with `aria-selected`
- Controls are `<button>` elements with descriptive `aria-label`
- Keyboard: ArrowLeft/Right to navigate
- `prefers-reduced-motion: reduce` disables all animations and shows controls permanently
- Autoplay pauses on hover, focus, and tab visibility change

---

## References

- [W3C Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- [shadcn/ui Carousel](https://ui.shadcn.com/docs/components/base/carousel)
- [Bootstrap Carousel](https://getbootstrap.com/docs/5.3/components/carousel/)
