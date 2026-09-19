/**
 * Whether a Bunny publish should deploy or fail — and whether a "successful"
 * deploy actually moved anything.
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
 * An ABSENCE cannot carry a decision. A job that exists to deploy either
 * deploys or fails, and says which secret was missing.
 */

// 🔴 THE OPT-IN IS GONE, and its absence is the point (riff from [sikkerhed],
// 2026-09-19). `BUNNY_DEPLOY_OPTIONAL` was read here and mapped NOWHERE:
// release.yml had 0 occurrences of it, so `process.env.BUNNY_DEPLOY_OPTIONAL`
// was always undefined on a runner. The cells covered this module and nothing
// covered the consumer — an escape hatch that could never open, i.e. a
// capability armed against nothing. The zones are provisioned now, so the
// honest shape is: a deploy job deploys or fails.
/**
 * @param {object} input
 * @param {{name: string, value: string|undefined}[]} input.required
 *   Required secrets as NAME + value. Only the names ever reach a log.
 * @param {string} input.label               the script's name, for messages
 * @returns {{mode: 'deploy'|'fail', reason: string, missing: string[]}}
 */
export function resolveDeployMode({ required, label }) {
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
  return {
    mode: 'fail',
    reason:
      `${label}: ${missing.join(' + ')} is empty or unset. This job exists to deploy, so a ` +
      'missing secret is a failure, not a skip. Set them in the environment the job declares ' +
      '(see the gh secret set block in #208).',
    missing,
  };
}

/**
 * Acts on a decision, so no caller has to spell out the branches.
 *
 * 🔴 THE GATE OPENS ONLY ON A POSITIVELY DECLARED `deploy` ([sikkerhed] on
 * #208). Handling the known failure and letting everything else fall through
 * means the deploy runs because the two known failures did not match — an
 * unknown mode (a value added here later) would silently deploy. Exhaustive
 * here, once, instead of in both scripts.
 *
 * @param {{mode: string, reason: string}} decision
 * @param {{warn: (msg: string) => void, error: (msg: string) => void, exit: (code: number) => void}} io
 */
export function applyDeployMode(decision, io) {
  if (decision.mode === 'deploy') return;
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
