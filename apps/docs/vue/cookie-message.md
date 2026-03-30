# Cookie Message

Non-modal cookie consent bar, fixed to the bottom of the viewport.

---

## Demo

<CookieMessageDemo />

---

## When to use

- Your solution uses cookies beyond the technically necessary (analytics, personalisation, comfort)
- You need user consent before setting non-essential cookies

## When not to use

- Your solution only sets functionally necessary cookies — no consent bar needed
- You need a full-page blocking modal — this component is intentionally non-modal

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<script setup>
  import { ref } from 'vue';
  const show = ref(true);
</script>

<template>
  <GTCookieMessage
    v-if="show"
    heading="Vi bruger cookies"
    @accept="show = false"
  >
    <p>Vi bruger cookies til at forbedre din oplevelse.</p>
  </GTCookieMessage>
</template>
```

### With reject and settings

```vue
<template>
  <GTCookieMessage
    heading="Cookies på dette site"
    reject-label="Afvis alle"
    settings-label="Cookie-indstillinger"
    @accept="onAccept"
    @reject="onReject"
    @settings="openSettings"
  >
    <p>
      Vi bruger cookies til statistik og personalisering.
      <a href="/cookies">Læs mere om cookies</a>.
    </p>
  </GTCookieMessage>
</template>
```

### With icon

```vue
<template>
  <GTCookieMessage heading="Cookies" icon="cookie">
    <p>Vi bruger cookies til at forbedre din oplevelse.</p>
  </GTCookieMessage>
</template>
```

### Static (non-fixed)

```vue
<template>
  <GTCookieMessage heading="Cookies" :persistent="false">
    <p>Inline cookie message — not fixed to viewport.</p>
  </GTCookieMessage>
</template>
```

### Custom actions slot

```vue
<template>
  <GTCookieMessage heading="Cookies">
    <p>Vi bruger cookies.</p>
    <template #actions>
      <GTButton variant="primary" size="sm" @click="acceptAll">
        Acceptér alle
      </GTButton>
      <GTButton variant="outlined" size="sm" @click="acceptNecessary">
        Kun nødvendige
      </GTButton>
    </template>
  </GTCookieMessage>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `string` | — | Optional heading above the body |
| `icon` | `string` | — | Icon name from the registry (renders `GTIcon`) |
| `acceptLabel` | `string` | `'Acceptér'` | Label for the accept button |
| `rejectLabel` | `string` | — | Label for the reject button (hidden when omitted) |
| `settingsLabel` | `string` | — | Label for the settings button (hidden when omitted) |
| `persistent` | `boolean` | `true` | Keep bar fixed at bottom while scrolling |
| `ariaLabel` | `string` | `'Cookiemeddelelse'` | Accessible label for the region |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `accept` | — | Emitted when accept button or close button is clicked |
| `reject` | — | Emitted when reject button is clicked |
| `settings` | — | Emitted when settings button is clicked |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Message body — supports rich text, links, lists |
| `actions` | Override the entire button row with custom actions |

---

## Accessibility

- `role="region"` with `aria-label` for landmark identification
- Close button has `aria-label="Luk"`
- Icons are decorative (`aria-hidden="true"`)
- All interactive elements are keyboard accessible
- Non-modal: does not trap focus or block page interaction

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-cookie-message` | Root container (fixed bottom) |
| `.gt-cookie-message--static` | Non-fixed variant |
| `.gt-cookie-message__icon` | Icon element |
| `.gt-cookie-message__content` | Content wrapper |
| `.gt-cookie-message__heading` | Heading paragraph |
| `.gt-cookie-message__body` | Body content |
| `.gt-cookie-message__actions` | Button row |
| `.gt-cookie-message__close` | Close/dismiss button |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Cookie Message](/web/c-cookie-message) reference.
