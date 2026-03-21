# Toast

Sonner-style toast notifications. Minimal, stacked, with countdown bar and optional icon. Appears on top of the page as a response to user interaction.

---

## When to use

Use to notify about completed actions, warnings, or status changes. Short, non-interactive messages.

Do not use for critical actions (use Modal), field errors (use inline errors), or long content. Do not add links or interactive elements.

---

## Variants

- **default** — neutral
- **success** — action completed
- **warning** — attention needed
- **error** — something failed
- **info** — informational

---

## Stacking

Newest toast on top. Max 3 visible by default — older toasts stack behind with scale/opacity effect. Hover expands the stack.

---

## Countdown bar

A thin colored bar at the bottom that shrinks over the duration. Pauses on hover and focus (WCAG 2.2.1 Timing Adjustable). Hidden when duration is 0 (persistent).

---

## Do's and don'ts

<DosDonts>
  <DoItem>Keep messages short and action-oriented</DoItem>
  <DoItem>Use words the user recognizes from the solution</DoItem>
  <DoItem>Show newest toast on top</DoItem>
  <DoItem>Pause countdown on hover (WCAG 2.2.1)</DoItem>
  <DontItem>Add links or interactive content</DontItem>
  <DontItem>Use for critical actions — use Modal instead</DontItem>
  <DontItem>Use for field errors — use inline errors</DontItem>
  <DontItem>Overuse — they become intrusive quickly</DontItem>
</DosDonts>

---

## Accessibility

- `role="alert"` + `aria-live="assertive"` for error/warning
- `role="status"` + `aria-live="polite"` for success/info
- `aria-atomic="true"` — read entire toast as unit
- Countdown pauses on hover and focus-within
- Close button with `aria-label`
- Respects `prefers-reduced-motion`
