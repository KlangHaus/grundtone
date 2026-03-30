# Alert

Static status messages with semantic color variants for info, success, warning, and error.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.alert` | Base flex container with gap, padding, radius |
| `.alert--info` | Info variant — blue background and border |
| `.alert--success` | Success variant — green background and border |
| `.alert--warning` | Warning variant — yellow background and border |
| `.alert--error` | Error variant — red background and border |
| `.alert__icon` | Icon container (flex-shrink: 0) |
| `.alert__content` | Content wrapper (flex: 1, contains heading, body, footer) |
| `.alert__heading` | Optional heading (semibold, sibling of body) |
| `.alert__body` | Body content |
| `.alert__footer` | Footer with top border separator |
| `.alert__close` | Dismiss button (reset styles) |

---

## Variants

### Info

<CodePreview name="c-alert-info" />

### Success

<CodePreview name="c-alert-success" />

### Warning

<CodePreview name="c-alert-warning" />

### Error

<CodePreview name="c-alert-error" />

---

## Usage

```html
<div class="alert alert--info" role="status">
  <div class="alert__content">
    <div class="alert__body">
      <p>This is an informational message.</p>
    </div>
  </div>
</div>

<div class="alert alert--error" role="alert">
  <div class="alert__content">
    <p class="alert__heading">Form errors</p>
    <div class="alert__body">
      <p>Please fix the following errors before submitting.</p>
    </div>
    <div class="alert__footer">
      <p>Fix the errors and try again.</p>
    </div>
  </div>
</div>
```

---

## Accessibility

- Use `role="alert"` for error messages (assertive — announced immediately)
- Use `role="status"` for info, success, and warning messages (polite)
- Icons should use `aria-hidden="true"` as they are decorative
- Close buttons should have `aria-label="Close"`

---

## Best practices

**Do:**
- Use alerts for important status information that requires user attention
- Place error summaries at the top of forms
- Use the appropriate variant for the message type
- Keep messages concise and actionable

**Don't:**
- Use alerts for temporary feedback (use toasts instead)
- Stack multiple alerts of the same type
- Use alerts for marketing or promotional content
- Use warning/error variants for non-critical information
