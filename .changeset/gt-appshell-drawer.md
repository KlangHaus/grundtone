---
'@grundtone/vue': minor
---

Add `GTAppShell` and `GTDrawer` — the logged-in shell primitives that every product surface (Studio,
Etude, Backstage, Account, Resonans) hangs on. `GTAppShell` provides a persistent sidebar (expanded
↔ icon-rail via `v-model:collapsed`) that becomes a focus-trapped drawer below `breakpoint`, with
skip-link, `<nav>`/`<main>` landmarks, a shell-owned hamburger + ToastContainer, and
`sidebar`/`topbar` slots. `GTDrawer` is the underlying overlay primitive (`side` left/right, `modal`
toggle for non-modal detail panels, scrim, Escape/scrim-close, focus return to the opener,
reduced-motion aware).
