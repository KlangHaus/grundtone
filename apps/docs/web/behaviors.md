# Behaviors (Vanilla JS)

Framework-agnostic TypeScript classes that add interactivity to Grundtone components. Ships as ESM, CJS, and a minified IIFE bundle for CDN usage.

Vue, Nuxt, and React Native users do **not** need this — each framework package has its own reactivity. Behaviors are for plain HTML, PHP, Astro, server-rendered, or any non-framework context.

---

## When to use

- Plain HTML pages using Grundtone CSS
- Server-rendered apps (PHP, Django, Rails, Go templates)
- Static site generators without a JS framework (11ty, Hugo, Jekyll)
- Astro with minimal client-side JS
- Prototypes and demos

## When not to use

- Vue / Nuxt — use `@grundtone/vue` instead
- React Native / Expo — use `@grundtone/react-native` instead
- If you're already using a framework that manages DOM state

---

## Installation

### npm / pnpm

```bash
pnpm add @grundtone/design-system
```

```js
import { initAll } from '@grundtone/design-system/behaviors';

document.addEventListener('DOMContentLoaded', () => initAll());
```

### CDN (script tag)

```html
<link rel="stylesheet" href="https://unpkg.com/@grundtone/design-system/dist/index.css" />
<script src="https://unpkg.com/@grundtone/design-system/dist/behaviors.umd.global.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => Grundtone.initAll());
</script>
```

---

## API

### `initAll(scope?)`

Discover and initialize all registered components within `scope` (defaults to `document`). Returns an array of initialized component instances. Idempotent — skips already-initialized elements.

```js
// Initialize everything on the page
initAll();

// Initialize only within a container (useful for dynamically inserted content)
const container = document.getElementById('new-content');
initAll(container);
```

### `destroyAll(scope?)`

Destroy all initialized components within `scope`. Removes event listeners and cleans up state.

```js
// Clean up before removing a section from the DOM
destroyAll(document.getElementById('section-to-remove'));
```

### Individual components

Each component can be instantiated directly:

```js
import { Accordion, Tabs, Table, Carousel, Toggle, Alert, CookieMessage, AnchorLinks, Modal, OverflowMenu, BackToTop, Tooltip, Toast, Stepper, SearchField } from '@grundtone/design-system/behaviors';

// Initialize a single accordion
const el = document.querySelector('.accordion');
const accordion = new Accordion(el);

// Later: clean up
accordion.destroy();

// Get existing instance from a DOM element
const instance = Accordion.getInstance(el);
```

---

## Components

### Accordion

**Selector:** `.accordion`

Supports three transition modes via `data-transition` attribute on the root element:

| Value | Behavior |
|-------|----------|
| `slide` (default) | JS-driven height animation |
| `fade` | CSS opacity transition |
| `none` | Instant show/hide via `hidden` attribute |

**Features:**
- Click `.accordion__header` to toggle its parent `.accordion__item`
- Manages `aria-expanded`, `aria-controls`, `aria-labelledby`
- Generates unique IDs for ARIA linkage if not present
- `.accordion__toggle-all` button opens/closes all items
- Respects `prefers-reduced-motion`

```html
<div class="accordion" data-transition="slide" role="region" aria-label="FAQ">
  <button class="accordion__toggle-all">Show all</button>

  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Section title</span>
    </button>
    <div class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>Content here.</p>
      </div>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Another section</span>
    </button>
    <div class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>More content.</p>
      </div>
    </div>
  </div>
</div>
```

---

### Tabs

**Selector:** `.tabs`

**Features:**
- Click `.tabs__tab` to switch active tab and show matching `.tabs__panel`
- Keyboard navigation: `ArrowLeft` / `ArrowRight` to move between tabs, `Home` / `End` to jump
- Manages `aria-selected`, `tabindex`, `aria-controls`, `aria-labelledby`
- Inactive panels are hidden via `hidden` attribute

```html
<div class="tabs tabs--underline">
  <div class="tabs__list" role="tablist">
    <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">Overview</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Details</button>
    <button class="tabs__tab" role="tab" aria-selected="false">History</button>
  </div>
  <div class="tabs__panel" role="tabpanel"><p>Overview content.</p></div>
  <div class="tabs__panel" role="tabpanel"><p>Details content.</p></div>
  <div class="tabs__panel" role="tabpanel"><p>History content.</p></div>
</div>
```

---

### Toggle

**Selector:** `.toggle`

**Features:**
- Click to toggle `.toggle--checked` class
- Manages `role="switch"` and `aria-checked`
- Respects `disabled` attribute and `.toggle--disabled` class
- Dispatches native `change` event for form integration

```html
<div class="toggle-field">
  <label class="toggle-label" id="dark-mode-label">Dark mode</label>
  <button class="toggle toggle--md" role="switch" aria-checked="false" aria-labelledby="dark-mode-label">
    <span class="toggle__track"></span>
    <span class="toggle__thumb"></span>
  </button>
</div>
```

---

### Alert

**Selector:** `.alert[data-dismissible]`

**Features:**
- Click `.alert__close` to dismiss (remove from DOM)
- Dispatches cancelable `gt:dismiss` CustomEvent before removal
- Call `event.preventDefault()` on `gt:dismiss` to block dismissal

```html
<div class="alert alert--info" data-dismissible role="status">
  <div class="alert__content">
    <p class="alert__heading">Information</p>
    <div class="alert__body"><p>This alert can be dismissed.</p></div>
  </div>
  <button class="alert__close" aria-label="Close">&times;</button>
</div>
```

```js
document.querySelector('.alert').addEventListener('gt:dismiss', (e) => {
  // Optionally prevent dismissal
  if (!confirm('Are you sure?')) e.preventDefault();
});
```

---

### Cookie Message

**Selector:** `.cookie-message`

**Features:**
- Buttons are identified by `data-action` attribute: `accept`, `reject`, `settings`
- Close button (`.cookie-message__close`) emits `gt:cookie-accept`
- Settings button toggles `.cookie-message__settings` panel visibility (if present), otherwise emits `gt:cookie-settings`
- Manages `aria-expanded` on settings buttons

**Events:**

| Event | Trigger |
|-------|---------|
| `gt:cookie-accept` | Accept button or close button click |
| `gt:cookie-reject` | Reject button click |
| `gt:cookie-settings` | Settings button (when no settings panel exists) |

```html
<div class="cookie-message" role="region" aria-label="Cookie consent">
  <div class="cookie-message__content">
    <p class="cookie-message__heading">We use cookies</p>
    <div class="cookie-message__body">
      <p>We use cookies for analytics and personalization.</p>
    </div>
    <div class="cookie-message__actions">
      <button data-action="accept" class="gt-btn gt-btn--primary gt-btn--sm">Accept all</button>
      <button data-action="reject" class="gt-btn gt-btn--secondary gt-btn--sm">Reject all</button>
      <button data-action="settings" class="gt-btn gt-btn--tertiary gt-btn--sm" aria-expanded="false">Settings</button>
    </div>
  </div>
  <div class="cookie-message__settings" hidden>
    <!-- Cookie category checkboxes here -->
  </div>
  <button class="cookie-message__close" aria-label="Close">&times;</button>
</div>
```

```js
const cookie = document.querySelector('.cookie-message');
cookie.addEventListener('gt:cookie-accept', () => {
  // Save consent, hide banner
  cookie.remove();
});
```

---

### Anchor Links

**Selector:** `.anchor-links`

**Features:**
- Click a link for smooth scroll to target section
- Updates URL via `history.pushState`
- `IntersectionObserver` highlights the active link as user scrolls
- Manages `aria-current` and `.anchor-links__link--active` class
- Click-scroll debounce prevents observer conflicts during manual navigation

```html
<nav class="anchor-links" aria-label="Table of contents">
  <p class="anchor-links__heading">On this page</p>
  <ol class="anchor-links__list">
    <li class="anchor-links__item">
      <a href="#intro" class="anchor-links__link anchor-links__link--active" aria-current="true">Introduction</a>
    </li>
    <li class="anchor-links__item">
      <a href="#features" class="anchor-links__link">Features</a>
    </li>
    <li class="anchor-links__item">
      <a href="#pricing" class="anchor-links__link">Pricing</a>
    </li>
  </ol>
</nav>
```

---

### Modal

**Selector:** `.modal`

**Features:**
- Click `.modal__close` or backdrop to close
- Escape key closes the modal
- Manages `aria-modal`, focus trapping

---

### Overflow Menu

**Selector:** `.overflow-menu`

**Features:**
- Click `.overflow-menu__trigger` to toggle the panel
- Outside click closes the menu
- Keyboard: Escape closes, ArrowDown/Up navigates items
- Manages `aria-expanded`, `aria-haspopup`

---

### Back to Top

**Selector:** `.back-to-top`

**Features:**
- Appears on scroll (shows after scrolling down)
- Click scrolls to top of page
- Respects `prefers-reduced-motion`

---

### Table

**Selector:** `.table[data-sortable]`, `.table[data-selectable]`

**Features:**
- **Sort:** Click `.table__sort` buttons to sort tbody rows. Toggles `aria-sort` on `<th>`, reorders DOM rows. Supports numeric (`.table__num`) and string sorting.
- **Select:** Checkbox click toggles `.table__row--selected`. Header checkbox selects/deselects all with indeterminate state.

```html
<table class="table" data-sortable data-selectable>
  <thead>
    <tr>
      <th class="table__select"><input type="checkbox" aria-label="Select all" /></th>
      <th><button class="table__sort">Name <span class="table__sort-icon">⇅</span></button></th>
      <th class="table__num"><button class="table__sort">Age <span class="table__sort-icon">⇅</span></button></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="table__select"><input type="checkbox" /></td>
      <td>Alice</td><td class="table__num">30</td>
    </tr>
  </tbody>
</table>
```

---

### Carousel

**Selector:** `.carousel`

**Features:**
- Click `.carousel__prev` / `.carousel__next` to navigate
- Click `.carousel__indicator` to jump to slide
- Touch/swipe via pointer events (50px threshold)
- Keyboard: ArrowLeft / ArrowRight
- Autoplay: `data-autoplay` + `data-interval` (default 5000ms)
- Pauses on hover and `prefers-reduced-motion`
- Loop: `data-loop="false"` to disable wrapping

```html
<div class="carousel" data-autoplay data-interval="4000" tabindex="0" aria-label="Gallery" aria-roledescription="carousel">
  <div class="carousel__track">
    <div class="carousel__slide carousel__slide--active" role="tabpanel">...</div>
    <div class="carousel__slide" role="tabpanel" aria-hidden="true">...</div>
  </div>
  <button class="carousel__prev" aria-label="Previous">&#8249;</button>
  <button class="carousel__next" aria-label="Next">&#8250;</button>
  <div class="carousel__indicators">
    <button class="carousel__indicator carousel__indicator--active"></button>
    <button class="carousel__indicator"></button>
  </div>
</div>
```

---

### Tooltip

**Selector:** `.tooltip`

**Features:**
- Hover/focus shows `.tooltip__bubble`, mouseleave/focusout hides
- Click trigger: `data-trigger="click"` toggles on click
- Position: `data-position="top"` (default) or `"bottom"`, auto-flips if not enough space
- Escape key hides tooltip
- Manages `.tooltip__bubble--visible`, `.tooltip__bubble--top`, `.tooltip__bubble--bottom`

---

### Toast

**Selector:** `.toast`

**Features:**
- Click `.toast__close` to dismiss (removes from DOM)
- Auto-dismiss: `.toast__countdown` CSS animation triggers `animationend` → dismiss
- Adds `.toast--dismissing` class before removal for exit animation

---

### Stepper

**Selector:** `.stepper`

**Features:**
- Click completed steps (`.stepper__step--completed`) to navigate back
- `data-all-clickable` allows clicking any step
- Manages `.stepper__step--active`, `.stepper__step--completed`, `aria-current="step"`

---

### Search Field

**Selector:** `.search-field`

**Features:**
- Enter key submits the closest `<form>` or dispatches `gt:search-submit` CustomEvent
- Native `type="search"` clear button dispatches `gt:search-clear` event
- Click `.search-field__button` submits

```js
document.querySelector('.search-field').addEventListener('gt:search-submit', (e) => {
  console.log('Search:', e.detail.value);
});
```

---

## SPA integration

For single-page applications that dynamically add/remove content:

```js
import { initAll, destroyAll } from '@grundtone/design-system/behaviors';

// After inserting new HTML
function onContentInserted(container) {
  initAll(container);
}

// Before removing a section
function onContentRemoved(container) {
  destroyAll(container);
}
```

---

## Progressive enhancement

All components work without JavaScript — they display their content statically. JavaScript adds interactivity (toggling, keyboard navigation, smooth scroll). This follows the same pattern as GOV.UK Frontend and DKFDS.

---

## References

- [GOV.UK Design System](https://design-system.service.gov.uk/) — progressive enhancement patterns
- [DKFDS](https://designsystem.dk/) — Danish government frontend framework
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/components/) — component initialization pattern
