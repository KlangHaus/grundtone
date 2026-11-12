---
'@grundtone/vue': minor
---

Accessible labels that were fixed text in the templates are now props, so an app can set them in its
own language. Each default is the text the component rendered before, so nothing changes unless you
pass the prop.

- `GTAlert`, `GTCookieMessage`, `GTModal`, `GTToast`: `closeLabel`
- `GTDatePicker`: `openCalendarLabel`, `closeCalendarLabel`, `previousMonthLabel`, `nextMonthLabel`
- `GTRichText`: `toolbarLabel`, `linkInputLabel`, `openLinkLabel`, `editLinkLabel`,
  `removeLinkLabel`
- `GTCodeBlock`: `copyLabel`, `copiedLabel`
- `GTCarousel`: `previousSlideLabel`, `nextSlideLabel`, `goToSlideLabel(slide)`
- `GTTable`: `selectAllLabel`, `selectRowLabel(row)`
- `GTTag`: `removeLabel(label)`
- `GTFileUpload`: `removeFileLabel(fileName)`
- `GTSlider`: `minimumThumbLabel(label)`, `maximumThumbLabel(label)` (range mode)
- `GTErrorPage`: `illustrationLabel(code)`

The props shown with an argument take a function, because their text includes a value (a row number,
a file name, a status code).
