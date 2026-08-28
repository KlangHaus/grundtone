# @grundtone/mcp

## 0.2.1 - 2026-08-28

### Patch Changes

- [#162](https://github.com/KlangHaus/grundtone/pull/162)
  [`ed9c11c`](https://github.com/KlangHaus/grundtone/commit/ed9c11c4f5aa83b1371c27807e03271f45ccd3db)
  Thanks [@allanasp](https://github.com/allanasp)! - The catalog now lists every component a
  directory exports, not just the first, and search matches words separately instead of the whole
  query as one string.

- [#161](https://github.com/KlangHaus/grundtone/pull/161)
  [`5f2a896`](https://github.com/KlangHaus/grundtone/commit/5f2a89658a2726f985d65aa5304726720ca975ef)
  Thanks [@allanasp](https://github.com/allanasp)! - Adds the `repository` field, without which npm
  rejects the publish: OIDC provenance validates that the package's declared repository matches the
  attestation, and an empty field cannot match.
