# Date Picker

Input with calendar popover for selecting dates. Use for bookings and planning where users need to see weekdays and available dates.

---

## When to use

Use when there are specific dates to choose from (bookings, appointments, scheduling) and it helps the user to see which weekday a date falls on.

Do not use for dates the user already knows (birth date, passport date) — use [Date Input](/web/c-date-input) instead.

---

## DatePicker vs DateInput

| | DatePicker | DateInput |
|---|---|---|
| **Brug** | Booking, planlægning | Fødselsdato, historiske datoer |
| **UI** | Kalender-popover | 3 separate felter (dag/måned/år) |
| **Hvornår** | Brugeren vælger en dato | Brugeren kender datoen |

---

## Do's and don'ts

<DosDonts>
  <DoItem>Use when users need to see weekdays and available dates</DoItem>
  <DoItem>Allow manual date entry in the input field</DoItem>
  <DoItem>Constrain selectable dates with min/max when appropriate</DoItem>
  <DontItem>Use for dates the user already knows (use DateInput)</DontItem>
  <DontItem>Use for dates more than a year away (too many clicks)</DontItem>
  <DontItem>Use for date ranges (v1 — single date only)</DontItem>
</DosDonts>

---

## Accessibility

- Calendar icon button with `aria-label`
- Calendar popover with `role="dialog"`
- Day grid with `role="grid"`
- Navigation buttons with `aria-label`
- Today highlighted with outline
- Escape closes calendar
- Manual date entry in input field

---

## References

- [shadcn/ui Date Picker](https://ui.shadcn.com/docs/components/radix/date-picker)
- [GOV.UK: Ask users for dates](https://design-system.service.gov.uk/patterns/dates/)
