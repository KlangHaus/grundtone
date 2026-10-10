---
'@grundtone/core': patch
'@grundtone/icons': patch
'@grundtone/utils': patch
---

Align `@typescript-eslint/parser` on `^8.71.1` in all four manifests.

The three packages were pinned at `^6.21.0` while the root was already at `^8.65.0` — two major
lines of the same lint parser in one workspace. This is the split being closed, not just a version
bump.

No consumer-visible change: the dependency is a `devDependency` in each package, so nothing in the
published tarballs changes behaviour. The changeset is here because the gate reasons at path level
and `package.json` ships — deliberately, since comparing against the `files` field was wrong in the
dangerous direction (`dist` is built from `src`). A patch release is the honest way past it; an
empty changeset is the thing that gate exists to prevent.
