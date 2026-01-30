# Accessibility

Accessibility utilities help create inclusive interfaces that work for everyone.

## Screen Reader Utilities

### Visually Hidden

Hide content visually but keep it available for screen readers:

```html
<span class="sr-only">Content for screen readers only</span>

<button>
  <svg>...</svg>
  <span class="sr-only">Close menu</span>
</button>
```

### Skip Links

Allow keyboard users to skip to main content:

```html
<a href="#main" class="skip-link">Skip to main content</a>

<main id="main">
  <!-- Main content -->
</main>
```

```scss
.skip-link {
  position: absolute;
  left: -9999px;

  &:focus {
    left: 0;
    top: 0;
    padding: tokens.spacing(4);
    background: tokens.getColor('primary', 600);
    color: white;
    z-index: 9999;
  }
}
```

## Focus Management

### Focus Visible

Style focus states for keyboard navigation:

```scss
.button {
  &:focus-visible {
    outline: 2px solid tokens.getColor('primary', 600);
    outline-offset: 2px;
  }
}
```

### Focus Within

Style parent when child has focus:

```scss
.form-group {
  &:focus-within {
    border-color: tokens.getColor('primary', 500);
  }
}
```

## ARIA Labels

```html
<!-- Icon button with label -->
<button aria-label="Close dialog">
  <svg>...</svg>
</button>

<!-- Decorative image -->
<img src="decoration.svg" alt="" role="presentation" />

<!-- Live region for announcements -->
<div aria-live="polite" aria-atomic="true">
  <p>Form submitted successfully</p>
</div>
```

## Keyboard Navigation

```html
<!-- Tab order -->
<button tabindex="0">Primary action</button>
<button tabindex="-1">Disabled from tab order</button>

<!-- Modal trap focus -->
<div role="dialog" aria-modal="true">
  <button>First</button>
  <button>Last</button>
</div>
```

## Color Contrast

Ensure sufficient color contrast:

```scss
// Minimum contrast ratio 4.5:1 for normal text
.text {
  color: tokens.getColor('gray', 900); // Dark text
  background: tokens.getColor('white'); // Light background
}

// 3:1 for large text (18px+)
.heading {
  font-size: tokens.font-size('2xl');
  color: tokens.getColor('gray', 700);
}
```

## Best Practices

::: tip Do

- Use sr-only for icon-only buttons
- Provide skip links
- Test with keyboard navigation
- Ensure sufficient color contrast
- Use semantic HTML
- Provide alt text for images
- Use ARIA labels when needed :::

::: warning Don't

- Hide content from screen readers unnecessarily
- Remove focus outlines without replacement
- Use color alone to convey information
- Create keyboard traps
- Use `<div>` when semantic elements exist :::

## Testing Tools

- **Keyboard**: Tab, Shift+Tab, Enter, Space, Arrow keys
- **Screen reader**: NVDA (Windows), VoiceOver (Mac), JAWS
- **Browser tools**: Lighthouse, axe DevTools
- **Contrast checker**: WebAIM Contrast Checker

## WCAG Guidelines

Follow WCAG 2.1 Level AA standards:

- Perceivable: Content must be perceivable
- Operable: UI must be operable
- Understandable: Information must be understandable
- Robust: Content must work with assistive technologies
