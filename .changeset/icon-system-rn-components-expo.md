---
'@grundtone/core': minor
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/react-native': minor
---

feat: icon categories, configurable icon color, RN components (GTIcon, GTButton), Expo playground

- Icon system: subdirectory-based categories, auto-generated registry with category metadata
- Core config: add `iconColor` to `defineGrundtoneConfig` with three-layer resolution (prop → config
  → currentColor)
- Design system: icon utility SCSS classes with prefix support (`{prefix}-icon`)
- Vue Icon: add `color` prop with config fallback
- React Native: GTIcon (react-native-svg) and GTButton (Pressable) components with full theme
  support
- Expo playground: SDK 54, pnpm workspace, expo-router with Grundtone theme provider
- Docs: web icon classes, RN icons, icon gallery component, nav restructure (Design System,
  Frameworks dropdown, Core Concepts dropdown)
- Third-party: credit react-native-svg
