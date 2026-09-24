# Security policy

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it privately through
[GitHub Security Advisories](https://github.com/KlangHaus/grundtone/security/advisories/new), or by
email to **mail@allanasp.dk** with `grundtone security` in the subject.

Please include, as far as you can:

- which package and version (for example `@grundtone/vue 3.2.1`),
- what an attacker can do with it — the impact, not only the mechanism,
- the smallest reproduction you have.

## What you can expect

- An acknowledgement within **5 working days**.
- An assessment — whether we can reproduce it, and what we think the impact is — within **10 working
  days**.
- A fix released as a patch version for the affected package, and a GitHub Security Advisory when
  the issue affects published packages.

We are a small team. If you have not heard from us within the times above, please send a reminder
rather than assuming the report was received.

## Supported versions

Security fixes are released for the **latest published minor** of each package. Older versions are
not patched; upgrading is the route to a fix.

## Scope

In scope: the packages published from this repository under `@grundtone/*`, and this repository's
own build and release tooling.

Out of scope: services operated by KlangHaus that happen to consume these packages. Those are
reported the same way, but they are not fixed by a release from here.

## Third-party material

Some packages bundle third-party assets — for example Feather icons in `@grundtone/icons`, which
carries its own `THIRD-PARTY-NOTICES.md`. A vulnerability in bundled material is in scope for us to
update; the upstream fix is not ours to make.
