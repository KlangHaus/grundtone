# Back to Top

Sticky button in the bottom-right corner that scrolls the user to the top of the page. Appears after scrolling 2 viewport heights. Text + icon on desktop, icon only on mobile.

---

## When to use

Use on pages longer than 4 screen heights where the user may be far from navigation.

Do not use as a general navigation button. Only for scrolling to the top.

---

## Usage

```html
<button class="back-to-top" type="button" aria-label="Til toppen">
  <span class="back-to-top__icon" aria-hidden="true">↑</span>
  <span class="back-to-top__label">Til toppen</span>
</button>
```

The `back-to-top--visible` class is added/removed by JavaScript based on scroll position.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Place sticky in bottom-right corner</DoItem>
  <DoItem>Show only after 2+ screen heights of scrolling</DoItem>
  <DoItem>Use smooth scroll animation</DoItem>
  <DoItem>Use text + icon on desktop, icon only on mobile</DoItem>
  <DontItem>Show on short pages where it's unnecessary</DontItem>
  <DontItem>Use for anything other than scrolling to top</DontItem>
  <DontItem>Let the button move while visible — keep it stationary</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.back-to-top` | Fixed button, hidden by default |
| `.back-to-top--visible` | Visible state (fade + slide in) |
| `.back-to-top__icon` | Arrow icon |
| `.back-to-top__label` | Text (hidden on mobile via media query) |

---

## Accessibility

- `type="button"` with `aria-label`
- Icon is `aria-hidden="true"`
- Focus ring via `:focus-visible`
- Respects `prefers-reduced-motion`

---

## References

- [NNGroup: Back to Top](https://www.nngroup.com/articles/back-to-top/)
