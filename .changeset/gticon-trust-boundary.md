---
'@grundtone/vue': patch
---

GTIcon now warns when the `icon` prop contains active markup (script tags, event handlers,
`javascript:` URLs, `foreignObject` or SMIL `animate`/`set`). The prop's body is rendered with
`v-html` and is not sanitised, so binding it to user-controlled data is an XSS footgun; the `name`
prop with a provided registry is the safe path and is unaffected.

The warning is a detector, not a defence — it does not catch every vector, and the prop's JSDoc now
names it as a trust boundary rather than describing it as a way to pass custom icons.
