/**
 * Every environment variable a CI script READS must be one the workflow step
 * actually MAPS.
 *
 * 🔴 WHY (found by [sikkerhed], 2026-09-19). #208 gave the Bunny publish
 * scripts an escape hatch: `process.env.BUNNY_DEPLOY_OPTIONAL === '1'` meant
 * "skip on purpose". It was read in two scripts, covered by cells, and mapped
 * in **no workflow** — `release.yml` had 0 occurrences of the name, so on a
 * runner the value was always `undefined`. The hatch could never open.
 *
 * The cells tested the script; nothing tested the CONSUMER. That is the same
 * shape as the bug the PR was fixing, one layer up: a capability with no cell
 * on the side that uses it is armed against nothing.
 */

/** `process.env.FOO` and `process.env['FOO']`, as a script would read them. */
const READ =
  /process\.env(?:\.([A-Z_][A-Z0-9_]*)|\[['"]([A-Z_][A-Z0-9_]*)['"]\])/g;

/** @param {string} source @returns {string[]} names the script reads, sorted */
export function envNamesRead(source) {
  const names = new Set();
  for (const m of source.matchAll(READ)) names.add(m[1] ?? m[2]);
  return [...names].sort();
}

/**
 * The env keys a workflow maps to the step that runs `command`.
 *
 * 🔴 Indentation-scoped on purpose: a workflow maps env per step, and the
 * question is what THIS step gets — not what the file mentions somewhere. A
 * name mapped on another step is exactly the false pass this cell exists to
 * avoid.
 *
 * @param {string} workflow  the YAML text
 * @param {string} command   a distinctive fragment of the step's `run:`
 * @returns {string[]} keys mapped in that step's `env:` block, sorted
 */
export function envNamesMapped(workflow, command) {
  const lines = workflow.split('\n');
  const at = lines.findIndex(line => line.includes(command));
  if (at === -1) return [];

  // 🔴 SCAN THE WHOLE STEP, NOT FORWARD FROM `run:`. The first version walked
  // forward from the command line and so could not see an `env:` block written
  // ABOVE it — YAML has no required key order, and the assertion step added in
  // this PR puts env first. That version reported "nothing mapped" for a step
  // whose block was right there.
  const stepStart = (() => {
    for (let i = at; i >= 0; i--)
      if (/^\s*-\s+(name|uses|run):/.test(lines[i])) return i;
    return 0;
  })();
  const stepIndent = lines[stepStart].search(/\S/);
  const stepEnd = (() => {
    for (let i = stepStart + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') continue;
      const indent = line.search(/\S/);
      if (indent < stepIndent) return i;
      if (indent === stepIndent && /^\s*-\s/.test(line)) return i;
    }
    return lines.length;
  })();

  const keys = new Set();
  let envIndent = null;
  for (let i = stepStart; i < stepEnd; i++) {
    const line = lines[i];
    if (envIndent === null) {
      const m = /^(\s*)env:\s*$/.exec(line);
      if (m) envIndent = m[1].length;
      continue;
    }
    if (line.trim() === '') continue;
    const indent = line.search(/\S/);
    if (indent <= envIndent) {
      envIndent = null; // block ended; a later env: in the same step is unusual but cheap to allow
      continue;
    }
    const key = /^\s*([A-Z_][A-Z0-9_]*)\s*:/.exec(line);
    if (key) keys.add(key[1]);
  }
  return [...keys].sort();
}

/**
 * @param {string[]} read     names the script reads
 * @param {string[]} mapped   names the step maps
 * @param {string[]} allowed  names supplied by the runner itself (CI, HOME, …)
 * @returns {string[]} names that are read but never supplied
 */
export function unmappedNames(read, mapped, allowed = []) {
  return read.filter(name => !mapped.includes(name) && !allowed.includes(name));
}
