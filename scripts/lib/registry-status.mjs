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
