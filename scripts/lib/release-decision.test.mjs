import { describe, expect, it } from 'vitest';
import {
  emptyChangesetNames,
  notClaimed,
  OUTCOME,
  parsePublishedPackages,
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

  // 🔴 CHANGED MEANING (task 1amk32fku63). This cell used to assert GREEN with
  // "0 package(s)": a publish that named nothing counted as a release. A claim
  // with nothing to read back is not evidence, so it is now red — without a
  // crash, which is what the cell was first written to hold.
  it('refuses a publishedPackages value that is not JSON — red, not a crash', () => {
    const r = releaseOutcome({
      ...base,
      published: 'true',
      publishedPackages: 'not json',
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.UNCONFIRMED);
    expect(r.message).toContain('listed no packages');
  });
});

describe('releaseOutcome — a claimed publish must be read back (1amk32fku63)', () => {
  const claimed = {
    ...base,
    published: 'true',
    publishedPackages:
      '[{"name":"@grundtone/vue","version":"3.3.0"},{"name":"@grundtone/email","version":"0.3.5"}]',
  };

  it('ACCEPT: green when every listed package was read back, and says so', () => {
    const r = releaseOutcome({ ...claimed, unconfirmed: [] });
    expect(r.ok).toBe(true);
    expect(r.code).toBe(OUTCOME.PUBLISHED);
    expect(r.message).toBe(
      'published 2 package(s), each read back from the registry',
    );
  });

  it('red when one listed package never appeared — the 3.3.0 shape, had it not resolved', () => {
    const r = releaseOutcome({
      ...claimed,
      unconfirmed: ['@grundtone/email@0.3.5 (absent from the registry)'],
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.UNCONFIRMED);
    expect(r.message).toContain(
      '2 package(s) published, but 1 could not be read back',
    );
    expect(r.message).toContain('@grundtone/email@0.3.5');
  });

  // 🔴 [sikkerhed]'s provoked case on c2b6cf1, which was GREEN: everything
  // claimed confirmed, one publishable version the claim never named.
  it('red when a publishable version changesets did not name is not on the registry', () => {
    const r = releaseOutcome({
      ...claimed,
      unconfirmed: [],
      omitted: ['glemt@9.9.9 (absent from the registry)'],
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.UNCONFIRMED);
    expect(r.message).toContain('1 publishable version(s) it did not name');
    expect(r.message).toContain('glemt@9.9.9');
  });

  it('red on an empty list: a publish that names nothing', () => {
    const r = releaseOutcome({ ...claimed, publishedPackages: '[]' });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(OUTCOME.UNCONFIRMED);
  });
});

describe('parsePublishedPackages', () => {
  it('keeps name/version entries and drops anything else', () => {
    expect(
      parsePublishedPackages(
        '[{"name":"a","version":"1.0.0"},{"name":"b"},null,{"name":"","version":"1"}]',
      ),
    ).toEqual([{ name: 'a', version: '1.0.0' }]);
  });

  it.each([undefined, '', 'not json', '{"name":"a","version":"1"}'])(
    'yields [] for %j',
    v => {
      expect(parsePublishedPackages(v)).toEqual([]);
    },
  );
});

describe('notClaimed', () => {
  const publishable = [
    { name: '@grundtone/vue', version: '3.3.0' },
    { name: '@grundtone/email', version: '0.3.5' },
    { name: 'glemt', version: '9.9.9' },
  ];

  it('keeps what the claim did not name', () => {
    expect(
      notClaimed(publishable, [
        { name: '@grundtone/vue', version: '3.3.0' },
        { name: '@grundtone/email', version: '0.3.5' },
      ]),
    ).toEqual([{ name: 'glemt', version: '9.9.9' }]);
  });

  it('matches on name AND version: a claim for another version does not cover it', () => {
    expect(
      notClaimed(
        [{ name: '@grundtone/vue', version: '3.3.1' }],
        [{ name: '@grundtone/vue', version: '3.3.0' }],
      ),
    ).toEqual([{ name: '@grundtone/vue', version: '3.3.1' }]);
  });
});
