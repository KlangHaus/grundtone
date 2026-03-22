# Tooltip

Dark, minimal tooltip bubble for brief explanatory text. Click variant uses a help icon (?), hover variant triggers on mouse/focus.

---

## When to use

Use for short clarifications of UI elements. Not for essential information — use help text or body text instead.

Do not place interactive content (links, buttons) inside tooltips.

---

## Variants

### Click tooltip

Triggered by clicking a (?) help icon. Closes on outside click or Escape.

### Hover tooltip

Triggered by hover (300ms delay) or focus. For icon descriptions and button labels.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Keep content short and concise</DoItem>
  <DoItem>Place help icon close to the element it describes</DoItem>
  <DoItem>Use hover tooltips for icon-only buttons</DoItem>
  <DontItem>Use for essential information — use help text instead</DontItem>
  <DontItem>Place links or buttons inside tooltips</DontItem>
  <DontItem>Repeat text already visible on the page</DontItem>
</DosDonts>

---

## Accessibility

- `role="tooltip"` on the bubble
- `aria-expanded` on click trigger
- Auto-flips position when near viewport edge
- Escape closes tooltip
- Hover tooltips also trigger on focus (keyboard accessible)
- 300ms hover delay prevents accidental activation

---

## References

- [NNGroup: Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/)
- [NNGroup: Timing Exposing Content](https://www.nngroup.com/articles/timing-exposing-content/)
