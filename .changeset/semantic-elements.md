---
'@grundtone/design-tokens': minor
---

Add semantic HTML element styles: headings (h1–h6), address, hgroup. Refactor header/footer — bare
elements reset to `display: block`, layout classes (`.header`, `.footer`) moved to components layer.
Remove redundant display:block rules for article, aside, main, nav, search, section. Add
text-decoration, text-transform, and letter-spacing utility classes. Add typography overview page.
Remove price component (replaced by `.line-through` utility). Add `.lead` component and
`.prose > p:first-child` auto-lead styling. Add `.body-text`, `.body-text-sm`, and `.body-text-bold`
body text components. Add `.help-text` component for form field hints. Add `.error-text` component
for form validation errors. Add `.caption` component for image captions. Add `.display-text`
component for large highlighted numbers. Add `.facit` component for calculation results with double
underline. Add `.external-link` and `.function-link` components.
