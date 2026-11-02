---
'@grundtone/vue': patch
---

Require the `@tiptap/*` packages ^3.32.2. From 3.32.2, `@tiptap/html` accepts happy-dom ^21.0.4 as
its peer. That version fixes GHSA-834v-8h66-3h79 (host code execution through happy-dom's ESM
compiler) and GHSA-c8p4-j97h-3vg8 (high), so the server-side `fromHTML` path no longer has to sit on
happy-dom 20.
