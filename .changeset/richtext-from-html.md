---
'@grundtone/vue': minor
---

`GTRichText`: add `fromHTML(html, features?)` for migrating stores that hold HTML today.

Convert **once** on load and own the `JSONContent` afterwards. The component deliberately has no
`html` prop — two inputs to the same state would have to decide which wins when both are set, and
that decision is a future bug report rather than a feature.

🔴 **`fromHTML` is not a sanitizer and must not be used as one.** It is a parser against a schema:
anything with no place in the extension set has no place in the resulting document, so the effect
looks like an allowlist while the mechanism is "unknown node is not in the schema". Extend the
extension set with anything that accepts arbitrary attributes and that property changes — do not
remove a sanitizer behind this function on the grounds that "the converter cleans it".

The extension set is now built in one place and shared by the editor and the converter, so a
document the converter accepts cannot be one the editor's schema drops on first open.
