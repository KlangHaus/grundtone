/**
 * Does this change need a changeset, or is "no release" already declared by
 * the change itself?
 *
 * 🔴 WHY (riff f9xld6w1). The gate asked `changeset status` for a decision on
 * every touched package, and the only way past it for a change that ships
 * nothing was an EMPTY changeset — precisely the file that makes
 * changesets/action@a45c4d59 return before publishing
 * (`hasChangesets && !hasNonEmptyChangesets`). The gate and the publish path
 * read `.changeset/` with opposite signs, so the cheapest way past the one
 * switched the other off. Three instances in this repo (#21/#76, #208).
 *
 * The cure is to make the honest answer available, so nobody reaches for a
 * placeholder: a change that touches only files which cannot affect what
 * consumers install needs no changeset.
 */

/**
 * 🔴 THE QUESTION IS "CAN THIS CHANGE THE PUBLISHED ARTIFACT?", NOT "IS THIS
 * FILE IN THE TARBALL?"
 *
 * My first version of this rule compared paths against the package's `files`
 * field, which is wrong in the dangerous direction: `@grundtone/email` ships
 * `files: ["dist"]`, so `src/**` is not in the tarball — but `dist` is BUILT
 * from `src`, and a source change reaches consumers. That rule would have let
 * a real change through without a changeset, which is the failure this whole
 * riff is about, mirrored.
 *
 * So the default is "it ships", and only paths that cannot end up in the
 * artifact are excluded. The list is deliberately short; anything not on it
 * costs a changeset nobody needed, which is the cheap error.
 */
const NON_SHIPPING = [
  /^scripts\//, // repo-side tooling: publish scripts, codegen runners
  /(^|\/)__tests__\//,
  /(^|\/)test\//,
  /(^|\/)tests\//,
  /\.test\.[cm]?[jt]sx?$/,
  /\.spec\.[cm]?[jt]sx?$/,
  /^vitest\.config\./,
  /^vitest\.setup\./,
];

/**
 * @param {string} relPath path relative to the package directory
 * @returns {boolean} whether the file can affect what consumers install
 */
export function affectsPublishedArtifact(relPath) {
  return !NON_SHIPPING.some(pattern => pattern.test(relPath));
}

/**
 * 🔴 WHY A MANIFEST IS READ BY KEY (ClickUp 1amk32fn47x). ci.yml used to skip
 * this gate for every Dependabot PR, because a `package.json` counts as
 * shipping and a devDependency bump would otherwise demand a changeset in
 * every package it touches. The skip was also blind to the runtime ranges:
 * #310 without its hand-written changeset raised `dependencies` in
 * packages/mcp and packages/nuxt, and the step never ran.
 *
 * So the gate runs for Dependabot too, and the manifest is judged by what
 * changed in it. Only `devDependencies` is exempt: consumers never install it.
 * Everything else, including `scripts`, `exports` and `peerDependencies`,
 * ships. A manifest that cannot be parsed on either side ships too.
 *
 * Not exempt from judgement: a devDependency that is build tooling can still
 * change what dist contains. That is the same trade the Dependabot skip made,
 * narrowed from every dependency to dev only.
 */
const MANIFEST_NON_SHIPPING_KEYS = new Set(['devDependencies']);

/**
 * @param {object | null} before parsed package.json at the base, or null
 * @param {object | null} after  parsed package.json at HEAD, or null
 * @returns {boolean} whether the manifest change can affect what consumers install
 */
export function manifestChangeShips(before, after) {
  if (!before || !after) return true;
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  return [...keys].some(
    key =>
      !MANIFEST_NON_SHIPPING_KEYS.has(key) &&
      JSON.stringify(before[key]) !== JSON.stringify(after[key]),
  );
}

/**
 * @param {object} input
 * @param {string[]} input.changedFiles        repo-relative paths
 * @param {{name: string, dir: string, private?: boolean}[]} input.packages
 * @param {string[]} input.releasedPackages    package names named by real changesets
 * @param {string[]} [input.nonShippingFiles]  repo-relative paths already judged
 *   unable to reach the artifact (manifests whose change is dev-only)
 * @returns {{ok: boolean, decisions: {name: string, status: string, reason: string, files: string[]}[]}}
 */
export function changesetRequirement({
  changedFiles,
  packages,
  releasedPackages,
  nonShippingFiles = [],
}) {
  const decisions = [];

  for (const pkg of packages) {
    if (pkg.private) continue;
    const prefix = `${pkg.dir}/`;
    const touched = changedFiles.filter(f => f.startsWith(prefix));
    if (touched.length === 0) continue;

    if (releasedPackages.includes(pkg.name)) {
      decisions.push({
        name: pkg.name,
        status: 'released',
        reason: 'a changeset names this package',
        files: touched,
      });
      continue;
    }

    const shipping = touched.filter(
      f =>
        !nonShippingFiles.includes(f) &&
        affectsPublishedArtifact(f.slice(prefix.length)),
    );
    if (shipping.length === 0) {
      decisions.push({
        name: pkg.name,
        status: 'no-release',
        reason: 'no touched file can reach the published artifact',
        files: touched,
      });
      continue;
    }

    decisions.push({
      name: pkg.name,
      status: 'needs-changeset',
      reason: `these files can reach consumers: ${shipping.join(', ')}`,
      files: touched,
    });
  }

  return {
    ok: decisions.every(d => d.status !== 'needs-changeset'),
    decisions,
  };
}
