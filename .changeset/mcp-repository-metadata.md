---
'@grundtone/mcp': patch
---

Adds the `repository` field, without which npm rejects the publish: OIDC provenance validates that
the package's declared repository matches the attestation, and an empty field cannot match.
