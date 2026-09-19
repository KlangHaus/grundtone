import { describe, expect, it } from 'vitest';
import {
  emptyChangesetNames,
  OUTCOME,
  releaseOutcome,
} from './release-decision.mjs';

const base = {
  published: 'false',
  publishedPackages: '[]',
  pullRequestNumber: undefined,
  emptyNames: [],
  unpublished: [],
};

describe('emptyChangesetNames', () => {
  // The rule is the action's: `releases.length > 0` decides, so the cell asks
  // about releases rather than about the file's text.
  it('names the changesets that declare no releases', () => {
    const changesets = [
      { releases: [{ name: '@grundtone/core', type: 'patch' }] },
      { releases: [] },
      { releases: [] },
    ];
    expect(
      emptyChangesetNames(changesets, [
        'real.md',
        'empty-one.md',
        'empty-two.md',
      ]),
    ).toEqual(['empty-one.md', 'empty-two.md']);
  });

  it('treats a missing releases array as empty, not as a crash', () => {
    expect(emptyChangesetNames([{}], ['odd.md'])).toEqual(['odd.md']);
  });

  it('says nothing when every changeset releases something', () => {
    expect(
      emptyChangesetNames([{ releases: [{ name: 'x' }] }], ['x.md']),
    ).toEqual([]);
  });
});

describe('releaseOutcome', () => {
  it('green when something was published, and counts it', () => {
    const r = releaseOutcome({
      ...base,
      published: 'true',
      publishedPackages:
        '[{"name":"@grundtone/react-native","version":"3.0.0"}]',
    });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.PUBLISHED);
    expect(r.message).toContain('1 package');
  });

  it('green when a release PR carries the changesets instead', () => {
    const r = releaseOutcome({ ...base, pullRequestNumber: '201' });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.VERSION_PR);
    expect(r.message).toContain('#201');
  });

  // 🔴 THE BRANCH ORDER, PROVOKED RATHER THAN ASSUMED (riff KH-1101).
  // Measured in production: on a version-PR run the changesets step has already
  // bumped the working tree, so `unpublished` counts exactly the versions the
  // release PR is about to introduce — develop's run 35476988549 printed
  // "unpublished versions: 1" with PULL_REQUEST_NUMBER=218, because the tree
  // said @grundtone/nuxt@3.2.1 and the registry had only 3.2.0.
  //
  // The ONLY thing that keeps that from being a false `silent` red on every
  // version PR is that pullRequestNumber is checked BEFORE unpublished. That
  // ordering was load-bearing and uncelled: swap the two branches and every
  // other cell in this file still passes while production turns red each time.
  it('a release PR outranks versions the PR itself is about to introduce', () => {
    const r = releaseOutcome({
      ...base,
      pullRequestNumber: '218',
      unpublished: ['@grundtone/nuxt@3.2.1'],
    });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.VERSION_PR);
    expect(r.code).not.toBe(OUTCOME.SILENT);
  });

  it('a release PR also outranks an empty changeset, so precedence is pinned end to end', () => {
    const r = releaseOutcome({
      ...base,
      pullRequestNumber: '218',
      emptyNames: ['stray.md'],
      unpublished: ['@grundtone/nuxt@3.2.1'],
    });
    expect(r.code).toBe(OUTCOME.VERSION_PR);
  });

  it('green when every publishable version is already on the registry', () => {
    const r = releaseOutcome({ ...base, unpublished: [] });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.NOTHING_TO_PUBLISH);
  });

  // 🔴 THE RUN THAT HAPPENED: run 35463452057 was green with an empty
  // changeset on develop and react-native 3.0.0 missing from npm.
  it('RED on the empty-changeset case, and names the files', () => {
    const r = releaseOutcome({
      ...base,
      emptyNames: ['nine-papers-fetch.md'],
      unpublished: ['@grundtone/react-native@3.0.0'],
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.EMPTY_CHANGESETS);
    expect(r.message).toContain('nine-papers-fetch.md');
  });

  // The two green-and-empty states must be told apart: same symptom, different
  // fix. Without this the cure would trade one silence for another.
  it('RED and DISTINCT when nothing published and no empty changeset explains it', () => {
    const r = releaseOutcome({
      ...base,
      unpublished: ['@grundtone/react-native@3.0.0'],
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.SILENT);
    expect(r.code).not.toBe(OUTCOME.EMPTY_CHANGESETS);
    expect(r.message).toContain('@grundtone/react-native@3.0.0');
  });

  it('a publish outranks an empty changeset that also happens to be there', () => {
    const r = releaseOutcome({
      ...base,
      published: 'true',
      publishedPackages: '[{"name":"x","version":"1.0.0"}]',
      emptyNames: ['stray.md'],
    });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.PUBLISHED);
  });

  it('survives a publishedPackages value that is not JSON', () => {
    const r = releaseOutcome({
      ...base,
      published: 'true',
      publishedPackages: 'not json',
    });
    expect(r.ok).toBe(true);
    expect(r.message).toContain('0 package');
  });
});
