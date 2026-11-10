import { describe, expect, it } from 'vitest';
import {
  affectsPublishedArtifact,
  changesetRequirement,
  manifestChangeShips,
} from './changeset-requirement.mjs';

const email = { name: '@grundtone/email', dir: 'packages/email' };
const docs = { name: '@grundtone/docs', dir: 'apps/docs', private: true };

describe('affectsPublishedArtifact', () => {
  // 🔴 THE CELL FOR THE MISTAKE I MADE FIRST. An earlier version of this rule
  // asked whether the path is inside the package's `files` field. Under
  // `files: ["dist"]` that makes src/** "not published" — but dist is BUILT
  // from src, so a source change reaches consumers. Wrong in the dangerous
  // direction, and this cell pins the correction.
  it('source counts as shipping, even when only dist is in the tarball', () => {
    expect(affectsPublishedArtifact('src/index.ts')).toBe(true);
    expect(affectsPublishedArtifact('src/templates/welcome.tsx')).toBe(true);
  });

  it('build configuration counts as shipping: it decides what dist contains', () => {
    expect(affectsPublishedArtifact('tsup.config.ts')).toBe(true);
    expect(affectsPublishedArtifact('vite.config.ts')).toBe(true);
    expect(affectsPublishedArtifact('package.json')).toBe(true);
  });

  it('repo-side tooling and tests cannot reach the artifact', () => {
    expect(affectsPublishedArtifact('scripts/publish-cdn.ts')).toBe(false);
    expect(affectsPublishedArtifact('src/index.test.ts')).toBe(false);
    expect(affectsPublishedArtifact('src/__tests__/thing.ts')).toBe(false);
    expect(affectsPublishedArtifact('test/fixture.json')).toBe(false);
    expect(affectsPublishedArtifact('vitest.config.mjs')).toBe(false);
  });

  it('an unknown path defaults to shipping, which is the cheap error', () => {
    expect(affectsPublishedArtifact('some/new/thing.ts')).toBe(true);
  });
});

describe('changesetRequirement', () => {
  // The case that produced the empty changeset in #208.
  it('accepts a change that touches only non-shipping files', () => {
    const r = changesetRequirement({
      changedFiles: ['packages/email/scripts/publish-cdn.ts'],
      packages: [email],
      releasedPackages: [],
    });
    expect(r.ok).toBe(true);
    expect(r.decisions[0].status).toBe('no-release');
  });

  it('demands a changeset when source changes', () => {
    const r = changesetRequirement({
      changedFiles: ['packages/email/src/index.ts'],
      packages: [email],
      releasedPackages: [],
    });
    expect(r.ok).toBe(false);
    expect(r.decisions[0].status).toBe('needs-changeset');
    expect(r.decisions[0].reason).toContain('src/index.ts');
  });

  it('a real changeset satisfies the package it names', () => {
    const r = changesetRequirement({
      changedFiles: ['packages/email/src/index.ts'],
      packages: [email],
      releasedPackages: ['@grundtone/email'],
    });
    expect(r.ok).toBe(true);
    expect(r.decisions[0].status).toBe('released');
  });

  it('one shipping file among many is enough to require a decision', () => {
    const r = changesetRequirement({
      changedFiles: [
        'packages/email/scripts/publish-cdn.ts',
        'packages/email/src/index.ts',
      ],
      packages: [email],
      releasedPackages: [],
    });
    expect(r.ok).toBe(false);
    expect(r.decisions[0].status).toBe('needs-changeset');
  });

  it('private packages are never asked for a changeset', () => {
    const r = changesetRequirement({
      changedFiles: ['apps/docs/src/index.ts'],
      packages: [docs],
      releasedPackages: [],
    });
    expect(r.ok).toBe(true);
    expect(r.decisions).toEqual([]);
  });

  it('a manifest judged dev-only needs no changeset', () => {
    const r = changesetRequirement({
      changedFiles: ['packages/email/package.json'],
      packages: [email],
      releasedPackages: [],
      nonShippingFiles: ['packages/email/package.json'],
    });
    expect(r.ok).toBe(true);
    expect(r.decisions[0].status).toBe('no-release');
  });

  it('untouched packages produce no decision', () => {
    const r = changesetRequirement({
      changedFiles: ['README.md'],
      packages: [email],
      releasedPackages: [],
    });
    expect(r.decisions).toEqual([]);
    expect(r.ok).toBe(true);
  });
});

describe('manifestChangeShips', () => {
  const before = {
    name: '@grundtone/mcp',
    dependencies: { '@modelcontextprotocol/sdk': '^1.18.0' },
    devDependencies: { vitest: '^4.1.11' },
  };

  // 🔴 THE HOLE (ClickUp 1amk32fn47x). #310 without its hand-written changeset:
  // Dependabot raised a RUNTIME range, and ci.yml skipped this gate for every
  // Dependabot PR, so the new range reached develop with no release planned.
  it('a raised runtime range ships', () => {
    const after = {
      ...before,
      dependencies: { '@modelcontextprotocol/sdk': '^1.32.2' },
    };
    expect(manifestChangeShips(before, after)).toBe(true);
  });

  // #317: the bump the Dependabot skip existed for. It must stay green.
  it('a devDependencies-only bump does not ship', () => {
    const after = { ...before, devDependencies: { vitest: '^4.1.12' } };
    expect(manifestChangeShips(before, after)).toBe(false);
  });

  it('runtime and dev changed together ships', () => {
    const after = {
      ...before,
      dependencies: { '@modelcontextprotocol/sdk': '^1.32.2' },
      devDependencies: { vitest: '^4.1.12' },
    };
    expect(manifestChangeShips(before, after)).toBe(true);
  });

  it('peerDependencies, scripts and a new key ship', () => {
    expect(
      manifestChangeShips(before, {
        ...before,
        peerDependencies: { vue: '^3' },
      }),
    ).toBe(true);
    expect(
      manifestChangeShips(before, { ...before, scripts: { postinstall: 'x' } }),
    ).toBe(true);
  });

  it('an unreadable side ships, which is the cheap error', () => {
    expect(manifestChangeShips(null, before)).toBe(true);
    expect(manifestChangeShips(before, null)).toBe(true);
  });

  it('an unchanged manifest does not ship', () => {
    expect(manifestChangeShips(before, { ...before })).toBe(false);
  });
});
