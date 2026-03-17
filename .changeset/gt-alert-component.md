---
'@grundtone/icons': minor
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/react-native': minor
---

feat: add GTAlert component with Expo Snack embeds

- New status icons: info-circle, check-circle, alert-triangle, alert-circle (status category)
- Design system: `.alert` CSS component with 4 semantic variants, transparent backgrounds
- Vue: GTAlert molecule with heading, icon, dismissible, footer slot
- React Native: GTAlert with theme-driven transparent backgrounds
- Re-export `createTheme` from `@grundtone/react-native`
- Replace callout with alert (breaking: `.callout` removed)
- Docs: Expo Snack embeds for interactive RN component previews
