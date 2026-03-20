# Modal

Overlay dialog that forces user focus on specific content while the rest of the page is deactivated. Use for confirmations, destructive actions, or critical decisions.

---

## When to use

Use a modal when the user **must** see and respond to specific content before continuing. Examples: confirm deletion, accept terms, approve permissions.

Do not use for page content, long text, multi-field forms, live updates, or as a default pattern. Avoid on mobile. Do not auto-open (except session timeout).

---

## Preview

<CodePreview name="c-modal-standard" />

---

## Variants

### Standard

Can be closed via Escape, backdrop click, or close button.

```html
<div class="modal" id="my-modal" aria-hidden="true" style="display: none">
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="my-modal-title">
    <div class="modal__header">
      <h2 class="modal__title" id="my-modal-title">Bekræft handling</h2>
      <button class="modal__close" aria-label="Luk">&times;</button>
    </div>
    <div class="modal__body">
      <p>Er du sikker på at du vil fortsætte?</p>
    </div>
    <div class="modal__footer">
      <button class="gt-btn gt-btn--outlined gt-btn--sm">Annuller</button>
      <button class="gt-btn gt-btn--primary gt-btn--sm">Bekræft</button>
    </div>
  </div>
</div>

<!-- Trigger -->
<button data-modal-target="#my-modal" class="gt-btn gt-btn--primary gt-btn--sm">
  Åbn modal
</button>
```

### Persistent (kræver handling)

Cannot be closed except via action buttons. Add `data-persistent` attribute.

```html
<div class="modal modal--persistent" data-persistent id="confirm-delete"
  aria-hidden="true" style="display: none">
  <div class="modal__dialog" role="dialog" aria-modal="true"
    aria-labelledby="delete-title">
    <div class="modal__header">
      <h2 class="modal__title" id="delete-title">Slet konto?</h2>
    </div>
    <div class="modal__body">
      <p>Denne handling kan ikke fortrydes.</p>
    </div>
    <div class="modal__footer">
      <button class="gt-btn gt-btn--outlined gt-btn--sm">Annuller</button>
      <button class="gt-btn gt-btn--negative gt-btn--sm">Slet</button>
    </div>
  </div>
</div>
```

### Transitions

Set `data-transition` on `.modal`: `scale` (default), `fade`, `slide-up`, `slide-down`, `slide-right`, `none`.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Use for critical confirmations and destructive actions</DoItem>
  <DoItem>Keep content short and concise — no scrolling</DoItem>
  <DoItem>Use meaningful titles and clear action buttons</DoItem>
  <DoItem>Let user see background behind modal (context)</DoItem>
  <DontItem>Use for page content or long text</DontItem>
  <DontItem>Use forms with multiple fields inside modal</DontItem>
  <DontItem>Have multiple open modals simultaneously</DontItem>
  <DontItem>Auto-open modals (except session timeout)</DontItem>
  <DontItem>Use on mobile viewports</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.modal` | Fixed backdrop overlay |
| `.modal__dialog` | Centered dialog container |
| `.modal__header` | Title + close button row |
| `.modal__title` | Heading text |
| `.modal__close` | Close button (hidden in persistent) |
| `.modal__body` | Content area |
| `.modal__footer` | Action buttons area |
| `.modal--persistent` | Hides close button, blocks escape/backdrop close |
| `.modal--entering` | Enter animation state |
| `.modal--leaving` | Exit animation state |

---

## Accessibility

- `role="dialog"` and `aria-modal="true"` on the dialog
- `aria-labelledby` points to the title element
- Focus trapped inside dialog (Tab/Shift+Tab cycles)
- Escape closes the modal (standard variant)
- Focus restored to trigger element on close
- Body scroll locked while open

---

## JavaScript behavior

Initialize with `Grundtone.initAll()` or `new Modal(element)`.

Events: `gt:modal-open`, `gt:modal-close` (cancelable).

Trigger buttons use `data-modal-target="#modal-id"`.

---

## References

- [Bootstrap Modal](https://getbootstrap.com/docs/5.3/components/modal/)
- [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apd/patterns/dialog-modal/)
