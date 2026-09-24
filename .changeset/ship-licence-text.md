---
'@grundtone/core': patch
'@grundtone/design-system': patch
'@grundtone/email': patch
'@grundtone/icons': patch
'@grundtone/mcp': patch
'@grundtone/nuxt': patch
'@grundtone/react-native': patch
'@grundtone/utils': patch
'@grundtone/vue': patch
---

Ship the MIT licence text inside the package itself.

Every package already declared `license: MIT`, and npm has served that to everyone installing them —
but the text existed nowhere in the repository, and the README's licence badge linked to a file that
answered 404. npm includes `LICENSE` from the package directory only; it does not reach up to a
monorepo root, so a root-level file would satisfy a human browsing GitHub and nobody who installs
the package.

No terms change: this makes the grant that was already published readable in the artefact that
carries it.
