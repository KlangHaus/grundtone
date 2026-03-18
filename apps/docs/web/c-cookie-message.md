# Cookie Message

Non-modal fixed bottom bar for cookie consent. Visible without blocking the page.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.cookie-message` | Base fixed container at bottom of viewport |
| `.cookie-message--static` | Non-fixed variant (inline placement) |
| `.cookie-message__icon` | Icon container |
| `.cookie-message__content` | Content wrapper (heading, body, actions) |
| `.cookie-message__heading` | Optional heading (semibold) |
| `.cookie-message__body` | Body content |
| `.cookie-message__actions` | Button row |
| `.cookie-message__close` | Close button (reset styles) |

---

## Variants

### Basic

<CodePreview name="c-cookie-message-basic" />

### With multiple actions

<CodePreview name="c-cookie-message-actions" />

### Static (non-fixed)

<CodePreview name="c-cookie-message-static" />

---

## Usage

```html
<div class="cookie-message" role="region" aria-label="Cookiemeddelelse">
  <div class="cookie-message__content">
    <p class="cookie-message__heading">Vi bruger cookies</p>
    <div class="cookie-message__body">
      <p>Vi bruger cookies til at forbedre din oplevelse.
        <a href="/cookies">Læs mere</a>.</p>
    </div>
    <div class="cookie-message__actions">
      <button type="button" class="gt-btn gt-btn--primary gt-btn--sm">Acceptér</button>
    </div>
  </div>
  <button type="button" class="cookie-message__close" aria-label="Luk">&times;</button>
</div>
```

---

## Accessibility

- Use `role="region"` with `aria-label` to identify the cookie consent bar
- Close button should have `aria-label="Luk"` (or appropriate translation)
- Do **not** use a modal overlay — the user must be able to see and interact with the page
- All buttons must be keyboard accessible

---

## Best practices

**Do:**
- Show the cookie message where it is visible without destroying the user's ability to form a first impression of the site
- Offer multiple options (accept all, reject, settings) when relevant
- Let the bar follow the scroll if it is important that users take action

**Don't:**
- Show cookie messages in a modal window — it prevents users from seeing the page before accepting
- Use the cookie message for non-cookie-related notifications
- Auto-dismiss the message without explicit user action
