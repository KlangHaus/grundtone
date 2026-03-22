# Stepper

Horizontal step indicator with dots, checkmarks, and connecting lines. Guides the user through a known sequence of steps.

---

## When to use

Use for multi-step flows (forms, wizards) where the user needs to see their progress. Last step should be "Summary".

Do not use as navigation replacement. Do not use with a side menu at the same time. Avoid sub-steps.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Divide steps into natural, logical groups</DoItem>
  <DoItem>Allow clicking back to completed steps</DoItem>
  <DoItem>Last step: "Opsummering" or "Tjek dine svar"</DoItem>
  <DoItem>Show clear error messages on the step itself</DoItem>
  <DontItem>Use together with a side menu</DontItem>
  <DontItem>Create sub-steps</DontItem>
  <DontItem>Skip the summary step</DontItem>
</DosDonts>

---

## Accessibility

- `<ol>` ordered list with `role="list"`
- `aria-current="step"` on active step
- Completed steps are keyboard-navigable
- Error steps announced via label

---

## References

- [GOV.UK: Question Pages](https://design-system.service.gov.uk/patterns/question-pages/)
- Adam Silver: *Form Design Patterns* (2018)
- Jessica Enders: *Designing UX: Forms* (2016)
