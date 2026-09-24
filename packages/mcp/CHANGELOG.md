# @grundtone/mcp

## 0.2.3 - 2026-09-24

### Patch Changes

- [#233](https://github.com/KlangHaus/grundtone/pull/233)
  [`137bf22`](https://github.com/KlangHaus/grundtone/commit/137bf223f9b49a69c82c04e7e6c43103d7999595)
  Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump development dependencies
  ([#233](https://github.com/KlangHaus/grundtone/issues/233)): `@vitejs/plugin-vue` 6.0.8→6.0.9,
  `eslint` 10.10.0→10.11.0, `tsx` 4.23.13→4.23.15, `@vue/test-utils` 2.5.0→2.5.1 and the rest of the
  dev-remainder group.

  No source file changes. Written because the repo's own gate requires a changeset from every
  published package whose `package.json` is touched, and Dependabot does not write one — not because
  these bumps are known to alter what consumers receive.

  🔴 Whether they DO alter it is unmeasured here. The honest test is whether the packed tarball
  changes byte for byte, which is the instrument this repo already uses for the licence text; it
  does not exist for this question yet. Until it does, a changeset is the conservative answer: a
  version nobody needed costs a patch number, a missing one ships a change with no record.

## 0.2.2 - 2026-09-24

### Patch Changes

- [#231](https://github.com/KlangHaus/grundtone/pull/231)
  [`8930bbe`](https://github.com/KlangHaus/grundtone/commit/8930bbef4f321511d54e2c10de0fc28ec9e23b53)
  Thanks [@allanasp](https://github.com/allanasp)! - Ship the MIT licence text inside the package
  itself.

  Every package already declared `license: MIT`, and npm has served that to everyone installing them
  — but the text existed nowhere in the repository, and the README's licence badge linked to a file
  that answered 404. npm includes `LICENSE` from the package directory only; it does not reach up to
  a monorepo root, so a root-level file would satisfy a human browsing GitHub and nobody who
  installs the package.

  No terms change: this makes the grant that was already published readable in the artefact that
  carries it.

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
