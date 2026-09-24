# Contributing to Grundtone

Thank you for looking. Grundtone is a design system published as MIT-licensed packages, and outside
contributions are welcome — bug reports especially.

Please read this first. It is short, and it says plainly what we can and cannot promise, so you do
not spend an evening on something we will not merge.

## What we are looking for

**Very welcome**

- Bug reports with a reproduction: version, framework, and the smallest example that shows the
  problem.
- Accessibility findings — contrast, focus order, keyboard traps, screen-reader output. These are
  treated as defects, not enhancements.
- Documentation fixes, including in this file.
- Fixes for a bug you have already reported and we have confirmed.

**Please ask before building**

- New components, or new variants of existing ones. The component set follows a design language that
  is decided outside this repository, so a technically perfect PR can still be the wrong component.
- Changes to design tokens, their names, or their scales. These are a public contract: renaming one
  breaks every consumer's stylesheet.
- New dependencies. We keep the dependency surface small on purpose.

**Out of scope**

- Support requests for KlangHaus' own hosted products. This repository is the design system, not
  those services.

## Before you open a pull request

1. **Open an issue first** for anything that is not a small, obvious fix. It is the cheapest way to
   find out whether the change fits.
2. Make sure `pnpm build`, `pnpm test` and `pnpm lint` pass locally.
3. Add a test that fails without your change. A fix without one is a fix nobody can keep.
4. Add a changeset: `pnpm changeset`. It decides the version bump and writes the changelog entry, so
   releases do not depend on anyone remembering.

## Development setup

Requirements: **Node >= 24.15.0** and **pnpm 10.14.0** (the `packageManager` field pins it;
`corepack enable` is the easiest route).

```bash
pnpm install
pnpm build            # build all packages and apps
pnpm test             # run all tests
pnpm lint             # lint everything
```

The README's "Development" section has the full command table.

## Commits and pull requests

- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:` …). The commit hook enforces the format.
- One logical change per pull request. A PR that fixes a bug _and_ refactors a neighbour is two PRs.
- Say in the description **what you measured**, not only what you changed: how you saw the bug, and
  how you saw it gone. A screenshot of the broken state and the fixed one is worth more than a
  paragraph.

## Accessibility is a requirement, not a review comment

Components ship with keyboard support, visible focus, and text that meets WCAG 2.1 AA contrast. A
change that regresses any of those is a defect even if it looks better.

## Licence

By contributing you agree that your contribution is licensed under the [MIT licence](./LICENSE), the
same terms as the rest of this repository.

## Security

Do **not** report security problems in a public issue. See [SECURITY.md](./SECURITY.md).

## Code of conduct

Participation is covered by our [Code of Conduct](./CODE_OF_CONDUCT.md).
