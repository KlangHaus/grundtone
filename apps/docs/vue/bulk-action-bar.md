# BulkActionBar

A sticky bar that rises from the bottom of the viewport when rows are selected, carrying the actions that apply to all of them.

---

## Demo

<BulkActionBarDemo />

---

## When to use

- Any list with multi-selection where actions apply to the whole selection
- Operations that can partially fail, so the result needs reporting
- Cases where the list behind must stay readable while acting on it

## When not to use

- A single row's actions — put those on the row
- A confirmation that blocks the page — use `GTModal`
- A message that should disappear on its own — use `GTToast`

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

```vue
<script setup>
  import { ref } from 'vue';
  import { GTBulkActionBar, GTButton } from '@grundtone/vue';

  const selected = ref([]);
  const state = ref('idle');
  const message = ref(undefined);

  async function move() {
    state.value = 'sending';
    const { updatedIds } = await api.bulkMove(selected.value);
    message.value = `${updatedIds.length} of ${selected.value.length} moved`;
    state.value = 'receipt';
    // Clear only on full success — a partial result must stay retryable on
    // exactly the rows that were missed.
    if (updatedIds.length === selected.value.length) selected.value = [];
    else selected.value = selected.value.filter((id) => !updatedIds.includes(id));
  }
</script>

<template>
  <GTBulkActionBar
    :count="selected.length"
    :label="`${selected.length} items selected`"
    :state="state"
    :message="message"
    @clear="selected = []"
  >
    <template #default="{ busy }">
      <GTButton size="sm" :disabled="busy" @click="move">Move</GTButton>
    </template>
  </GTBulkActionBar>
</template>
```

---

## Contracts

These are not style preferences. Each one exists because the obvious
alternative produces a specific, observed failure.

### The bar outlives the selection

Visibility is `count > 0` **or an unacknowledged receipt** — never the count
alone.

On full success the consumer clears the selection. Were visibility bound to the
count, the result would vanish in the same tick it was set, and **a successful
action would be indistinguishable from no action at all.**

The general form is worth knowing: *any success signal whose visibility depends
on the state that success removes will only ever report failures.* And the gap
hides from ordinary testing, because partial success and error both keep a
selection — only the full-success path exposes it.

### The component reserves its own space

The bar is fixed and lies over the page, so the last row of the list would be
unreachable. The component sets `--gt-bulk-action-bar-space` on `document.body`
and releases it when it goes away.

Consumers do not need to add padding. Documenting that they *must* would be a
workaround, and the fourth consumer forgets.

The reservation follows visibility, not the count — while only a receipt is
showing, the bar is still on screen. **The exit animation fires when the receipt
is dismissed, not when the count reaches zero;** bound to the count, the bar
animates away while showing a result nobody has read.

### The component never clears the selection

It emits `clear`. The consumer owns the selection and clears it conditionally on
the outcome, so a partial success stays retryable on exactly the rows that were
missed. A bar that cleared for them would overwrite that logic.

Contrast with the padding above: **the padding is a consequence of the
component's own rendering, so it cleans up after itself. The selection is domain
state it does not own.** The line is drawn by who causes the problem, not by
who finds it more convenient.

### A new selection discards an unacknowledged receipt

Otherwise a stale result sits beside a fresh selection and reads as describing
it. The rule lives in the component: solved per consumer, the fourth one meets
it from scratch and the first three each grow a variant.

🔴 **Pass `selectionKey` if your selection can change without changing size.**
A count cannot express identity: swap three selected rows for three others and
the count never changes value, so the bar cannot tell a fresh selection from the
one its receipt describes. Any join of the ids works — the bar only checks
whether it changed. Without a key the receipt is discarded on a change of count
alone, which is correct right up until it isn't.

### One reservation, many bars

The reserved space is a single custom property on `document.body`, so instances
reconcile rather than overwrite: the largest claim wins, and the property only
returns to zero when the **last** bar releases it. An earlier version released
it on unmount, which stripped it from every other bar too — including one still
on screen, whose last row then slid underneath it.

### The label is yours, verbatim

Pass the finished string (`"5 riffs selected"`), not a number. A design system
that knows the word "riff" has taken a leak from one consumer's domain, and
plural rules are cheaper to solve where the domain lives.

The string is rendered **verbatim** — never truncated or transformed. Actions
scroll sideways rather than wrapping, because a bar that grows in height eats
the list it exists to operate on.

### The receipt is a number, not a checkmark

`"120 of 172 moved"` rather than `"Done"`. A count is the difference between
noticing a partial failure and not.

Send no `message` and **no receipt is shown**. The bar never invents an "OK": a
component that can report success without data will eventually do so.

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | — | Selected rows. Drives visibility together with `message`. |
| `label` | `string` | — | Left-hand label, already formatted. Rendered verbatim. |
| `state` | `'idle' \| 'sending' \| 'receipt' \| 'error'` | `'idle'` | `sending` disables actions; `sending` and `error` both keep the selection. |
| `message` | `string` | — | Receipt text. Omit for no receipt. Keeps the bar visible while unacknowledged. |
| `selectionKey` | `string \| number` | — | Identity of the selection. Bump it when the selected rows change, whatever their number. |
| `clearLabel` | `string` | `'Clear'` | Label for the clear control. |
| `ariaLabel` | `string` | — | Accessible name for the bar. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `clear` | — | The user dismissed the bar. The consumer clears its own selection. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | `{ busy: boolean }` | The actions. `busy` is true while `state === 'sending'`. |

---

## Styling

```css
background: var(--color-surface-overlay);
backdrop-filter: blur(var(--blur-overlay, 8px));
```

`--color-surface-overlay` is 95% opaque. **That opacity is what carries the
contrast, not the blur:** at 95% the content behind is muted enough that
`--color-text` holds whether a dense table row or an empty surface sits
underneath. The blur is polish on top.

`--blur-overlay` is a foundation token (`8px`), declared statically rather than
generated from the theme — a blur radius is a physical constant, independent of
light and dark, unlike colour.
