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
 * @returns {{ok: boolean, code: string, message: string}}
 */
export function releaseOutcome({
  published,
  publishedPackages,
  pullRequestNumber,
  emptyNames,
  unpublished,
}) {
  if (published === 'true') {
    let count = 0;
    try {
      count = JSON.parse(publishedPackages || '[]').length;
    } catch {
      count = 0;
    }
    return {
      ok: true,
      code: OUTCOME.PUBLISHED,
      message: `published ${count} package(s)`,
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
      `nothing was published, but ${unpublished.length} version(s) are absent from the ` +
      `registry: ${unpublished.join(', ')}. The job is green and the release did not happen; ` +
      'read the publish step of this run before re-running it.',
  };
}
