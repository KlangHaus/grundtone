---
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/utils': minor
'@grundtone/react-native': minor
---

Add SkipLink, Spinner, and Modal components with shared animations and utilities

- **design-system**: Add `_animations.scss` (shared keyframes: fade, scale, slide-up/down/right,
  spin), `_modal.scss` (BEM + 6 transition modes), `_spinner.scss`, Modal vanilla JS behavior (focus
  trap, scroll lock, open/close events)
- **vue**: Add `GTSkipLink` (keyboard-only skip-to-content link), `GTSpinner` (sm/lg, light/dark,
  text, backdrop), `GTModal` (Teleport, Vue Transition, persistent variant, 6 animation modes)
- **react-native**: Add `GTSpinner` (Animated.View rotation) and `GTModal` (RN Modal wrapper with
  theme tokens)
- **utils**: Add `createFocusTrap()` and `createScrollLock()` (framework-agnostic DOM utilities)
- Fix Dart Sass deprecations (nth→list.nth, slash division→interpolated strings)
- Fix Accordion test, docs changelog frontmatter, docs missing dependencies
- Add CLAUDE.md files for AI-assisted development context
- Add blog, shop, login, signup pages to Vue playground
