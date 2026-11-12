---
'@grundtone/vue': minor
'@grundtone/design-system': minor
---

`GTTable` gains `stackBelow`, which says below which named breakpoint a `responsive` table stacks
its rows: `'sm'` (40rem, the default and today's behaviour), `'md'` (768px), `'lg'` (1024px), `'xl'`
(1280px) or `'2xl'` (1536px). Without the prop nothing changes. The design system adds the matching
`.table-wrapper--stack-md`, `-lg`, `-xl` and `-2xl` modifier classes, built from the default
breakpoint scale.
