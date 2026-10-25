/**
 * Which versions this repo would publish are NOT on the registry.
 *
 * 🔴 WHY THIS IS ITS OWN FILE (riff KH-1101). The logic lived inside
 * scripts/assert-release-published.mjs, which exports nothing, so it could not
 * be imported — and measured 2026-09-19 it had NO cell at all. The branch that
 * matters most is the one that only runs during a registry outage, i.e. never
 * in a normal release. Both [sikkerhed] and I had verified it by READING the
 * catch block when #210 was signed; a read catch block is not proof that it
 * fires.
 *
 * 🔴 THE CAUSE IS PART OF THE ANSWER, NOT JUST THE COLOUR ([sikkerhed]).
 * "never published" and "registry unreadable" both make a release fail, but
 * they are different events and need different responses. If they collapse
 * into one string, the outage branch can rot into the ordinary message and the
 * guard stays red the whole time — right colour, wrong reason, and nobody
 * notices. So each entry carries a `cause`, and the cells assert on it.
 */

/** npm's own name grammar, narrowed: optional scope, lowercase, no traversal. */
export const NPM_NAME = /^(@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

export const CAUSE = {
  MISSING: 'missing', // the registry answered, and this version is not there
  UNREADABLE: 'unreadable', // we could not get an answer at all
  REFUSED: 'refused', // the name is not one we are willing to put in a URL
};

/**
 * 🔴 ASKED OF THE `versions` MAP, NOT OF `dist-tags.latest` ([sikkerhed]).
 * The question is "is THIS version published?", not "is it the newest?". A
 * version released under another tag exists without being `latest`, and a
 * guard that asked for `latest` would call it unpublished and fail a release
 * that was fine. The measurement I ran by hand used `latest` because I knew
 * what I was looking for; a guard does not know.
 *
 * @param {object} input
 * @param {{name: string, version: string}[]} input.packages  publishable only
 * @param {string} [input.registryBase]
 * @param {typeof fetch} [input.fetchImpl]  injectable so both branches have cells
 * @returns {Promise<{name: string, version: string, cause: string, detail: string}[]>}
 */
export async function unpublishedVersions({
  packages,
  registryBase = 'https://registry.npmjs.org',
  fetchImpl = fetch,
}) {
  const out = [];
  for (const pkg of packages) {
    // 🔴 The name comes from a file and ends up in a URL. CodeQL flagged both
    // halves of that on the first version of this code, and it was right:
    // `.replace('/', '%2f')` escapes only the FIRST slash, which is correct
    // for `@scope/name` by luck rather than by rule.
    if (!NPM_NAME.test(pkg.name)) {
      out.push({
        ...pkg,
        cause: CAUSE.REFUSED,
        detail: 'not an npm package name, refusing to query',
      });
      continue;
    }

    const url = `${registryBase}/${pkg.name.replaceAll('/', '%2f')}`;
    try {
      const res = await fetchImpl(url, {
        headers: { accept: 'application/json' },
      });
      if (res.status === 404) {
        out.push({ ...pkg, cause: CAUSE.MISSING, detail: 'never published' });
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const doc = await res.json();
      if (!doc.versions?.[pkg.version])
        out.push({
          ...pkg,
          cause: CAUSE.MISSING,
          detail: 'absent from the registry',
        });
    } catch (err) {
      // 🔴 A registry we could not read is not "everything is published".
      // Fail loudly rather than let an outage look like a clean release.
      out.push({
        ...pkg,
        cause: CAUSE.UNREADABLE,
        detail: `registry unreadable: ${err.message}`,
      });
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** One line per entry, cause included, for a human reading a red job. */
export function describeUnpublished(entries) {
  return entries.map(e => `${e.name}@${e.version} (${e.detail})`);
}

/**
 * Reads `packages` back from the registry until every one is there, or the
 * deadline passes. Returns the entries still not confirmed (empty = all read
 * back).
 *
 * 🔴 WHY A WAIT AND NOT ONE READ (task 1amk32fku63). npm acknowledges a publish
 * before the version is readable: in release 3.3.0 the gap was 2½ min for
 * @grundtone/vue and 11 min for @grundtone/email. One read right after the
 * publish would turn most releases red for a lag that resolves on its own; no
 * read at all printed "published" about versions nobody could install. The
 * bound makes "never appeared" a red job instead of a hung one.
 *
 * A `refused` entry is not retried: the name will not become valid by waiting.
 *
 * @param {object} input
 * @param {{name: string, version: string}[]} input.packages
 * @param {number} input.timeoutMs
 * @param {number} input.intervalMs
 * @param {typeof fetch} [input.fetchImpl]
 * @param {string} [input.registryBase]
 * @param {(ms: number) => Promise<void>} [input.sleep]
 * @param {() => number} [input.now]
 * @param {(line: string) => void} [input.log]
 */
export async function awaitOnRegistry({
  packages,
  timeoutMs,
  intervalMs,
  fetchImpl = fetch,
  registryBase,
  sleep = ms => new Promise(r => setTimeout(r, ms)),
  now = Date.now,
  log = () => {},
}) {
  const deadline = now() + timeoutMs;
  let pending = packages;
  for (let attempt = 1; ; attempt += 1) {
    const missing = await unpublishedVersions({
      packages: pending,
      registryBase,
      fetchImpl,
    });
    if (missing.length === 0) return [];
    const retryable = missing.filter(m => m.cause !== CAUSE.REFUSED);
    if (retryable.length === 0 || now() >= deadline) return missing;
    log(
      `read-back attempt ${attempt}: ${missing.length} of ${packages.length} not yet on the registry ` +
        `(${describeUnpublished(missing).join(', ')}); retrying in ${Math.round(intervalMs / 1000)}s`,
    );
    pending = retryable.map(({ name, version }) => ({ name, version }));
    await sleep(intervalMs);
  }
}

/**
 * A read-back duration from the environment, in milliseconds.
 *
 * 🔴 `Number()` ALONE ACCEPTS TWO VALUES THAT BREAK THE BOUND ([sikkerhed],
 * #284 verdict): `Number('abc')` is NaN, so `now() >= deadline` is never true
 * and only the job's 360-minute limit stops the wait; `Number('')` is 0, so
 * there is no wait at all and an ordinary npm lag turns a good release red.
 * Unset means the default; anything else must be a finite number above zero,
 * or the release stops here and says which variable is wrong.
 *
 * @param {string|undefined} raw
 * @param {number} fallback
 * @param {string} name  the variable, for the error
 */
export function readbackMs(raw, fallback, name) {
  if (raw === undefined) return fallback;
  // '' and whitespace are Number() 0, so `n <= 0` refuses them too.
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error(
      `${name} must be a positive number of milliseconds, got ${JSON.stringify(raw)}`,
    );
  }
  return n;
}
