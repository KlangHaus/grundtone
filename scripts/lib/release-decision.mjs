/**
 * Did the release job publish, or does it have a declared reason not to?
 *
 * 🔴 WHY (riff f9xld6w1, after the third instance of the class in this repo:
 * June's `proud-weeks-float.md` in #21/#76, and `nine-papers-fetch.md` in
 * #208). A release job can be **green and publish nothing**, and nothing
 * measures it. Measured in run 35463452057: `Release` success, the changesets
 * step success, `@grundtone/react-native@3.0.0` unpublished — and the only
 * trace was `Generate summary` showing as **skipped**, because that step is
 * gated on `published == 'true'`. `skipped` reads as "the condition was
 * false", not as an alarm ([sikkerhed]).
 *
 * So the assertion that uses these helpers runs UNCONDITIONALLY. A step gated
 * on the same flag is silent on exactly the state we are trying to catch.
 *
 * 🔴 THE EMPTINESS RULE IS THE ACTION'S OWN, not a guess about file text.
 * changesets/action@a45c4d59 `dist/index.js` computes:
 *
 *     let {changesets: f} = await readChangesetState(cwd)
 *     m = f.length !== 0                      // hasChangesets
 *     h = f.some(e => e.releases.length > 0)  // hasNonEmptyChangesets
 *
 * and its switch tries `!m && hasPublishScript` (publish) only AFTER
 * `m && !h` has returned. A changeset is therefore "empty" when its parsed
 * `releases` array is empty — which is why the caller parses with the same
 * library instead of matching `---\n---\n`: an empty changeset has more than
 * one spelling, and a pattern would measure a different set than the one that
 * decides in production.
 */

/**
 * @param {{ releases: unknown[] }[]} changesets  parsed by @changesets/read
 * @param {string[]} names                        file names, same order
 * @returns {string[]} the names whose releases array is empty
 */
export function emptyChangesetNames(changesets, names) {
  return changesets
    .map((changeset, i) => ({ changeset, name: names[i] ?? `#${i}` }))
    .filter(({ changeset }) => (changeset.releases?.length ?? 0) === 0)
    .map(({ name }) => name);
}

/** Outcomes the assertion can reach. The code is what a reader greps for. */
export const OUTCOME = {
  PUBLISHED: 'published',
  UNCONFIRMED: 'published-unconfirmed',
  VERSION_PR: 'version-pr',
  NOTHING_TO_PUBLISH: 'nothing-to-publish',
  EMPTY_CHANGESETS: 'empty-changesets',
  SILENT: 'silent',
};

/**
 * 🔴 GREEN ONLY ON A POSITIVELY DECLARED OUTCOME. There are at least two ways
 * to end green having published nothing, and they need different fixes, so the
 * result NAMES which one it found:
 *
 *   - `empty-changesets`: the action returned at `m && !h`. Delete the empty
 *     file (or make it a real changeset).
 *   - `nothing-to-publish`: every publishable version is already on the
 *     registry. Legitimate, and only legitimate when someone measured it.
 *
 * 🔴 The SILENT message says "could not be confirmed on the registry", not
 * "absent from the registry": an entry lands here either because the registry
 * answered and did not have it, or because the registry could not be read at
 * all (riff KH-1101). Each entry carries its own cause, and the summary must
 * not assert the stronger of the two for both.
 *
 * A publish that fails on auth (ENEEDAUTH/E403, riff qqa2q3lb) is a different
 * animal: the action exits non-zero and the job is already red. This helper is
 * about the green cases, and says so rather than pretending to cover both.
 *
 * @param {object} input
 * @param {string|undefined} input.published        the step's `published` output
 * @param {string|undefined} input.publishedPackages JSON from the step
 * @param {string|undefined} input.pullRequestNumber the step's PR output, if any
 * @param {string[]} input.emptyNames               from emptyChangesetNames()
 * @param {string[]} input.unpublished              local versions absent from the registry
 * @param {string[]} [input.unconfirmed]            published packages not read back (published branch)
 * @param {string[]} [input.omitted]                publishable versions changesets did not name, not on the registry
 * @returns {{ok: boolean, code: string, message: string}}
 */
export function releaseOutcome({
  published,
  publishedPackages,
  pullRequestNumber,
  emptyNames,
  unpublished,
  unconfirmed = [],
  omitted = [],
}) {
  if (published === 'true') {
    // 🔴 "published" IS CHANGESETS' CLAIM, NOT THE REGISTRY'S (task 1amk32fku63).
    // This branch used to return green on the flag alone. Release 3.3.0 (run
    // 39855638476): changesets said success at 21:16:24Z, and
    // @grundtone/vue@3.3.0 was on the registry at 21:18:56Z,
    // @grundtone/email@0.3.5 only at 21:27:33Z — so "published 7 package(s)"
    // was printed about versions a consumer could not install. The caller now
    // reads every listed package back (bounded wait) and passes what it could
    // not confirm; green requires that list to be empty AND non-vacuous.
    const listed = parsePublishedPackages(publishedPackages);
    if (listed.length === 0) {
      return {
        ok: false,
        code: OUTCOME.UNCONFIRMED,
        message:
          'changesets reported a publish but listed no packages, so nothing could be read back ' +
          'from the registry. A publish that names nothing is not evidence of a release.',
      };
    }
    if (unconfirmed.length > 0) {
      return {
        ok: false,
        code: OUTCOME.UNCONFIRMED,
        message:
          `changesets reported ${listed.length} package(s) published, but ${unconfirmed.length} ` +
          `could not be read back from the registry: ${unconfirmed.join(', ')}.`,
      };
    }
    // 🔴 WHAT CHANGESETS DID NOT NAME IS CHECKED TOO ([sikkerhed], #284
    // verdict). Reading back only the claimed list leaves a publishable version
    // the claim forgot invisible: published=true, every claimed package
    // confirmed, and `glemt@9.9.9` never on npm was GREEN. `omitted` is the
    // publishable set minus the claimed set, read AFTER the wait so both sets
    // are measured on the same clock.
    if (omitted.length > 0) {
      return {
        ok: false,
        code: OUTCOME.UNCONFIRMED,
        message:
          `changesets reported ${listed.length} package(s) published, but ${omitted.length} ` +
          `publishable version(s) it did not name are not on the registry: ${omitted.join(', ')}.`,
      };
    }
    return {
      ok: true,
      code: OUTCOME.PUBLISHED,
      message: `published ${listed.length} package(s), each read back from the registry`,
    };
  }

  if (pullRequestNumber) {
    return {
      ok: true,
      code: OUTCOME.VERSION_PR,
      message: `no publish: the release PR #${pullRequestNumber} carries the pending changesets`,
    };
  }

  if (emptyNames.length > 0) {
    return {
      ok: false,
      code: OUTCOME.EMPTY_CHANGESETS,
      message:
        `nothing was published, and ${emptyNames.length} changeset(s) declare no releases: ` +
        `${emptyNames.join(', ')}. The release action returns before publishing when every ` +
        'changeset is empty, so this run could not have published anything. Delete the file, ' +
        'or make it a real changeset if a version bump is warranted.',
    };
  }

  if (unpublished.length === 0) {
    return {
      ok: true,
      code: OUTCOME.NOTHING_TO_PUBLISH,
      message:
        'no publish: every publishable version is already on the registry',
    };
  }

  return {
    ok: false,
    code: OUTCOME.SILENT,
    message:
      `nothing was published, and ${unpublished.length} version(s) could not be confirmed on ` +
      `the registry: ${unpublished.join(', ')}. The job is green and the release did not happen; ` +
      'read the publish step of this run before re-running it.',
  };
}

/**
 * The `publishedPackages` output of changesets/action, as `{name, version}`.
 * Anything that is not a JSON array of such entries yields `[]`, which the
 * published branch refuses rather than counts.
 *
 * @param {string|undefined} json
 * @returns {{name: string, version: string}[]}
 */
export function parsePublishedPackages(json) {
  let parsed;
  try {
    parsed = JSON.parse(json || '[]');
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    p =>
      p &&
      typeof p.name === 'string' &&
      typeof p.version === 'string' &&
      p.name.length > 0 &&
      p.version.length > 0,
  );
}

/**
 * The publishable versions changesets did not name, matched on name AND
 * version: a claim for `vue@3.3.0` does not cover a local `vue@3.3.1`.
 *
 * @param {{name: string, version: string}[]} publishable
 * @param {{name: string, version: string}[]} claimed
 */
export function notClaimed(publishable, claimed) {
  const named = new Set(claimed.map(c => `${c.name}@${c.version}`));
  return publishable.filter(p => !named.has(`${p.name}@${p.version}`));
}
