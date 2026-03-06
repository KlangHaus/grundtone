---
'@grundtone/design-tokens': minor
---

Add elements and components layers to design-tokens. Elements style HTML tags directly (body,
header, footer, blockquote, hr) — no class needed. Components provide class-based patterns (prose,
callout, article-card, article-meta, breadcrumb, skip-link, author-card, back-link, blockquote
variants). Cascade order: elements → components → utilities, so utilities always win. Inline body
and .sr-only blocks removed from index.scss — body moved to elements, sr-only now uses the
accessibility utility import.
