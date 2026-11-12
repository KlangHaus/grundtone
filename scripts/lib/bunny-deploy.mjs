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

/**
 * Can this key READ the zone at this endpoint?
 *
 * The probe that makes a 401 discriminating. It runs only after a write has
 * already failed, so the happy path pays nothing — and it lives here rather
 * than in each publish script because it was copied into two of them, which is
 * how the two scripts' 401 handling would drift apart the way their FALLBACKS
 * already did.
 *
 * A transport error returns null rather than a status: the classifier then says
 * it could not narrow the cause, instead of reading a network failure as an
 * authorization answer.
 *
 * @param {string} host      e.g. `storage.bunnycdn.com`
 * @param {string} zone      storage zone name
 * @param {string} apiKey    the AccessKey — never logged, only sent
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<number|null>}
 */
export async function probeBunnyRead(host, zone, apiKey, fetchImpl = fetch) {
  try {
    const res = await fetchImpl(`https://${host}/${zone}/`, {
      headers: { AccessKey: apiKey },
    });
    return res.status;
  } catch {
    return null;
  }
}

/**
 * WHICH of the three things a Bunny 401 means.
 *
 * 🔴 WHY THIS EXISTS (measured 2026-09-24, release run 35999462350). The email
 * template publish failed with exactly one line:
 *
 *   publish-cdn: upload failed — PUT v0.3.3/invoice/da.json → 401 {"HttpCode":401,"Message":"Unauthorized"}
 *
 * That line cannot be acted on, because Bunny answers 401 to all of:
 *   1. a wrong AccessKey,
 *   2. a zone name that does not exist,
 *   3. the right key and zone at the WRONG REGIONAL ENDPOINT,
 *   4. a read-only zone password used for a write.
 *
 * Measured, not assumed: a PUT with a junk key to a nonexistent zone answers
 * 401 at `storage.bunnycdn.com` AND at `ny.storage.bunnycdn.com`. The status is
 * the same in every case, so the status alone is not discriminating.
 *
 * A READ against the same zone splits them. If the key cannot read either, the
 * problem is the key, the zone or the region — and which of those three it is
 * cannot be told from here, so this says so instead of guessing. If the key CAN
 * read but not write, the answer is exact: it is the read-only password.
 *
 * Neither the key nor its length ever reaches a message. Zone and host do: they
 * are the two things the operator must compare against the Bunny console, and
 * both are already printed by the scripts on success.
 *
 * @param {object} input
 * @param {string} input.zone                  storage zone name (not secret)
 * @param {string} input.host                  endpoint actually used (not secret)
 * @param {number} input.uploadStatus          status of the failed write
 * @param {number|null} input.readStatus       status of a read probe against the zone
 *   root, or null when no probe was made. 404 counts as a successful read: an
 *   empty zone answers 404, and an unauthorized one answers 401.
 * @param {string} input.label
 * @returns {{cause: 'credentials'|'read-only-key'|'not-401'|'unknown', reason: string}}
 */
export function classifyBunnyAuthFailure({
  zone,
  host,
  uploadStatus,
  readStatus,
  label,
}) {
  const where = `zone "${zone}" at ${host}`;

  if (uploadStatus !== 401) {
    return {
      cause: 'not-401',
      reason: `${label}: write to ${where} failed with ${uploadStatus}, which is not an auth failure.`,
    };
  }

  if (readStatus === null) {
    return {
      cause: 'unknown',
      reason:
        `${label}: write to ${where} was rejected with 401, and no read probe was made, ` +
        'so this cannot say which of key / zone / region is wrong.',
    };
  }

  if (readStatus === 401) {
    return {
      cause: 'credentials',
      reason:
        `${label}: ${where} rejected BOTH a read and a write with 401. That means the AccessKey, ` +
        'the zone name, or the region endpoint is wrong — Bunny answers 401 to all three, so ' +
        'they cannot be told apart from here. Compare the zone name above with the Bunny ' +
        'console, and check whether that zone lives in the region this endpoint points at ' +
        '(no region set = Falkenstein, https://storage.bunnycdn.com).',
    };
  }

  return {
    cause: 'read-only-key',
    reason:
      `${label}: the key can READ ${where} (probe answered ${readStatus}) but its write was ` +
      "rejected with 401. A key that reads and cannot write is Bunny's READ-ONLY zone " +
      "password. Replace the secret with the zone's read/write password.",
  };
}

/**
 * The whole failure report: probe, classify, print — in one place.
 *
 * 🔴 It is here rather than in each script because the block was written twice,
 * and two copies of the code that explains a 401 is the same shape as the two
 * copies of the code that chose a HOST, which is the bug this module exists to
 * prevent. Sonar named it (9.25% duplicated lines on new code) before a human
 * did.
 *
 * Only a failure carrying a `status` is classified: a transport error or a
 * thrown precondition has no HTTP answer to explain, and inventing one would be
 * a plausible wrong cause rather than a missing one.
 *
 * @param {object} input
 * @param {unknown} input.err
 * @param {string} input.zone
 * @param {string} input.host
 * @param {string} input.apiKey
 * @param {string} input.label
 * @param {(msg: string) => void} input.error   where the explanation goes
 * @param {typeof fetch} [input.fetchImpl]
 * @returns {Promise<string|null>} the explanation printed, or null when the
 *   failure was not an HTTP answer this can speak about
 */
export async function reportBunnyAuthFailure({
  err,
  zone,
  host,
  apiKey,
  label,
  error,
  fetchImpl,
}) {
  const status = /** @type {{status?: number}} */ (err)?.status;
  if (status === undefined) return null;

  const readStatus =
    status === 401 ? await probeBunnyRead(host, zone, apiKey, fetchImpl) : null;
  const { reason } = classifyBunnyAuthFailure({
    zone,
    host,
    uploadStatus: status,
    readStatus,
    label,
  });
  error(reason);
  return reason;
}

/**
 * 🔴 THE ZONE NAME STAYS OUT OF SENTRY (ClickUp 869fbfz68).
 *
 * The zone comes from a GitHub secret, so the Actions log prints it as `***`.
 * Sentry has no such mask: the zone reached it as an explicit `zone` tag, in a
 * `PUT https://<host>/<zone>/…` error message, in the `fetch` breadcrumbs and
 * spans the SDK records on its own (tracesSampleRate is 1.0), and in console
 * breadcrumbs. Removing the tag and the URL is not enough on its own, because
 * the SDK keeps recording requests; this scrubs every string Sentry is about
 * to send.
 *
 * The 401 diagnosis still prints the zone to the console on purpose: a person
 * running the script locally needs it, and in Actions it is masked.
 *
 * @param {T} value   any JSON-shaped value (an event, a breadcrumb)
 * @param {string|undefined} zone
 * @returns {T} the same shape with every occurrence of `zone` replaced
 * @template T
 */
export function redactZone(value, zone) {
  const z = zone?.trim();
  if (!z) return value;
  // Cycle-safe, and only into plain objects and arrays: a transaction event
  // carries live SDK objects (measured: the first version recursed until the
  // stack overflowed, and the SDK then sent its own error event with the zone
  // untouched). `sdkProcessingMetadata` is SDK-internal and never sent.
  const seen = new WeakMap();
  const walk = v => {
    if (typeof v === 'string') return v.split(z).join('<zone>');
    if (!v || typeof v !== 'object') return v;
    const proto = Object.getPrototypeOf(v);
    if (!Array.isArray(v) && proto !== Object.prototype && proto !== null)
      return v;
    if (seen.has(v)) return seen.get(v);
    if (Array.isArray(v)) {
      const out = [];
      seen.set(v, out);
      for (const inner of v) out.push(walk(inner));
      return out;
    }
    const out = {};
    seen.set(v, out);
    for (const [k, inner] of Object.entries(v))
      out[walk(k)] = k === 'sdkProcessingMetadata' ? inner : walk(inner);
    return out;
  };
  return walk(value);
}

/**
 * Options for `Sentry.init` that keep the zone out of everything Sentry sends.
 * Spread them into the init options.
 *
 * The hooks scrub events, transactions and breadcrumbs. The transport wrapper
 * is the layer that cannot be bypassed: the envelope HEADER carries the root
 * span's name (`trace.transaction`), which no hook sees, and an
 * auto-instrumented fetch outside a span is a root span named after its URL
 * (measured with the real SDK in bunny-zone-redaction.test.mjs).
 *
 * @param {string|undefined} zone
 * @param {(options: object) => {send: Function, flush: Function}} makeTransport
 *   the SDK's transport factory, e.g. `Sentry.makeNodeTransport`
 */
export function sentryZoneRedaction(zone, makeTransport) {
  return {
    beforeSend: event => redactZone(event, zone),
    beforeSendTransaction: event => redactZone(event, zone),
    beforeBreadcrumb: crumb => redactZone(crumb, zone),
    transport: options => {
      const base = makeTransport(options);
      return {
        ...base,
        send: envelope => base.send(redactZone(envelope, zone)),
      };
    },
  };
}
