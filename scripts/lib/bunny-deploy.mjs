/**
 * Whether a Bunny publish should deploy, skip or fail — and whether a
 * "successful" deploy actually moved anything.
 *
 * 🔴 WHY THIS EXISTS (riff ua771kpb/KH-1008, measured again 2026-09-19).
 * Both publish scripts turned a missing secret into `exit 0` with a warning.
 * That looked reasonable while the zones were unprovisioned — but it makes a
 * deploy job a job that CANNOT fail. Measured in release run 35459568087
 * (develop `c7baa0b`, 17:56Z): `BUNNY_DOCS_STORAGE_ZONE` and
 * `BUNNY_DOCS_STORAGE_API_KEY` were EMPTY, the script printed "skipping
 * deploy", the step went **success**, and the docs site was not published.
 * The hole stood open from the moment the secrets moved into environments
 * until someone read the log.
 *
 * An ABSENCE cannot carry a decision. A skip has to be something someone
 * DECLARED, not something a missing value produced.
 */

/** The opt-in that turns a missing secret into a legitimate skip. */
export const OPT_IN = 'BUNNY_DEPLOY_OPTIONAL';

/**
 * @param {object} input
 * @param {{name: string, value: string|undefined}[]} input.required
 *   Required secrets as NAME + value. Only the names ever reach a log.
 * @param {string|undefined} input.optional  the value of BUNNY_DEPLOY_OPTIONAL
 * @param {string} input.label               the script's name, for messages
 * @returns {{mode: 'deploy'|'skip'|'fail', reason: string, missing: string[]}}
 */
export function resolveDeployMode({ required, optional, label }) {
  // 🔴 `.trim()` rather than plain falsiness: what actually happened was
  // `gh secret set` with an empty clipboard. '' is falsy, but ' ' is truthy —
  // a single space would otherwise be read as a valid key and sent upstream.
  const missing = required.filter(s => !s.value?.trim()).map(s => s.name);

  if (missing.length === 0) {
    return {
      mode: 'deploy',
      reason: `${label}: every required secret is set`,
      missing,
    };
  }
  if (optional?.trim() === '1') {
    return {
      mode: 'skip',
      reason:
        `${label}: ${OPT_IN}=1 and ${missing.join(' + ')} missing — skipping because ` +
        'someone declared it, not because a value was absent',
      missing,
    };
  }
  return {
    mode: 'fail',
    reason:
      `${label}: ${missing.join(' + ')} is empty or unset. This job exists to deploy, so a ` +
      'missing secret is a failure, not a skip. Set them in the environment the job declares, ' +
      `or set ${OPT_IN}=1 to skip on purpose.`,
    missing,
  };
}

/**
 * Acts on a decision, so no caller has to spell out the branches.
 *
 * 🔴 THE GATE OPENS ONLY ON A POSITIVELY DECLARED `deploy` ([sikkerhed] on
 * #208). Handling `skip` and `fail` and letting everything else fall through
 * means the deploy runs because the two known failures did not match — an
 * unknown mode (a value added here later) would silently deploy. Exhaustive
 * here, once, instead of in both scripts.
 *
 * @param {{mode: string, reason: string}} decision
 * @param {{warn: (msg: string) => void, error: (msg: string) => void, exit: (code: number) => void}} io
 */
export function applyDeployMode(decision, io) {
  if (decision.mode === 'deploy') return;
  if (decision.mode === 'skip') {
    io.warn(decision.reason);
    io.exit(0);
    return;
  }
  if (decision.mode === 'fail') {
    io.error(decision.reason);
    io.exit(1);
    return;
  }
  io.error(
    `unknown deploy mode ${JSON.stringify(decision.mode)} — refusing to deploy on a value ` +
      'nobody declared',
  );
  io.exit(1);
}

/**
 * 🔴 An upload loop that found no files also reaches "done". The count is the
 * only difference between "published nothing" and "published something".
 *
 * @param {number} uploaded
 * @param {string} label
 * @returns {{ok: boolean, reason: string}}
 */
export function checkUploaded(uploaded, label) {
  if (uploaded > 0) {
    return { ok: true, reason: `${label}: ${uploaded} file(s) uploaded` };
  }
  return {
    ok: false,
    reason:
      `${label}: 0 files uploaded. A deploy without files is not a deploy — either the build ` +
      'output was empty, or the path points somewhere other than where the build put it.',
  };
}
