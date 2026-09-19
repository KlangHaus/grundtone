/**
 * Every script that can deploy to Bunny must be unable to end green having
 * uploaded nothing — and this derives WHICH scripts those are.
 *
 * 🔴 WHY IT DERIVES FROM THE HAZARD, NOT FROM THE CURE (riff KH-1101). The
 * fail-closed cell in bunny-deploy.scripts.test.mjs listed two scripts by
 * hand. Measured 2026-09-19, the repo has THREE files in a `scripts` folder
 * that read a Bunny zone/key secret:
 *
 *   apps/docs/scripts/publish-bunny.ts      — fails closed IN THE SCRIPT (celled)
 *   packages/email/scripts/publish-cdn.ts   — fails closed IN THE SCRIPT (celled)
 *   apps/web/scripts/publish-bunny.ts       — exits 0 on missing secrets, and was
 *                                             covered by NO cell
 *
 * The third one was the "what if someone adds a third deploy script" case, and
 * it already existed. It is not a defect on its own: `deploy-web.yml` asserts
 * both secrets are non-empty BEFORE the build, so the exit-0 path cannot
 * produce a false green there — a deliberate, documented design, because
 * exiting 0 is right for a local `pnpm build`. But that protection lives in a
 * DIFFERENT mechanism than the other two, and measured the same day it had no
 * cell either.
 *
 * 🔴 SO THE QUESTION IS PER-SCRIPT AND PER-MECHANISM: is this script protected
 * in itself, or by its workflow? A script protected by NEITHER is the failure
 * this guard exists for — and enumerating from `BUNNY_*` means a new deploy
 * script is in the denominator whether or not its author used our helper.
 * Deriving from "calls resolveDeployMode" would have asked whether the cure is
 * present, which is exactly the script that forgets it that we need to catch.
 */

/**
 * 🔴 DETERMINISTIC, NOT LOCALE-AWARE ([sikkerhed] on #215). Sonar's S2871 is
 * satisfied by ANY explicit comparator, and `localeCompare` — the obvious
 * reach — is the locale-dependent one. Both sorted lists feed order-sensitive
 * assertions, so the cells would depend on the runner's ICU collation.
 *
 * Measured: `BUNNY_WEB_ZONE` vs `BUNNY_WEBSITE_ZONE` sorts OPPOSITE ways —
 * localeCompare gives -1, `<`/`>` give +1, because `S` (0x53) is below `_`
 * (0x5F) while collation weights punctuation lower. Today's names sort
 * identically under both, so this is not a live bug; it is a comparator whose
 * result could change with the environment, feeding an equality assertion.
 *
 * 🔴 NAMED FOR WHAT IT MEASURES ([sikkerhed]): `<` and `>` compare UTF-16 CODE
 * UNITS, not code points. The two agree throughout the BMP and diverge only
 * above it, where surrogates sort below U+E000–U+FFFF — irrelevant for
 * `BUNNY_*` names and ASCII paths, and the property we need (deterministic, no
 * locale) holds either way. It was called `byCodePoint` first, which claimed a
 * guarantee the operator does not give.
 */
const byCodeUnit = (a, b) => {
  // Spelled out rather than as a nested ternary: the compact form trips
  // Sonar's S3358, and a comparator is read far more often than it is written.
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/** A file that names a Bunny zone/key secret, in any position. */
export const BUNNY_SECRET = /\bBUNNY_[A-Z0-9_]*(ZONE|API_KEY)\b/;

/**
 * 🔴 READS the secret from its own environment, rather than merely NAMING it.
 * Measured on this repo: seven files mention a Bunny zone/key, but only three
 * read one from `process.env` — the other four are the shared helper (which
 * takes the names as arguments) and tests (which pass them as data). Asking
 * "does this file name a secret?" would have put our own guard lib in the list
 * of things the guard polices.
 */
const READS_SECRET =
  /process\.env\.BUNNY_[A-Z0-9_]*(?:ZONE|API_KEY)\b|process\.env\[['"]BUNNY_[A-Z0-9_]*(?:ZONE|API_KEY)['"]\]/;

/** Directories that never contain source: build output, deps, caches. */
export const PRUNE = new Set([
  'node_modules',
  'dist',
  '.output',
  '.nuxt',
  '.git',
  'coverage',
  '.vitepress',
  '.turbo',
]);

const SOURCE_EXT = ['.ts', '.mts', '.js', '.mjs', '.cts', '.cjs'];

/**
 * Every source file in the repo, pruned of build output.
 *
 * 🔴 WHY THIS WALKS THE TREE ([sikkerhed] on #215). The first version of this
 * guard derived the PREDICATE from the hazard but was handed its FILE SET by
 * the cell — a list of three, asserted against itself, which could not fail on
 * a fourth script. The predicate was hazard-derived and the denominator was
 * cure-by-memory: exactly the shape this riff is about, one level down. A new
 * `apps/shop/scripts/ship.ts` is now in the denominator because it is on disk,
 * not because someone remembered to add it.
 *
 * Pruning matters and is measured: `apps/docs/.vitepress/dist/assets/*.js`
 * contains a Bunny name in a built changelog page, and would otherwise be
 * "a deploy script".
 */
export function candidateFiles(root, fs) {
  const out = [];
  const walk = dir => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        if (!PRUNE.has(entry.name)) walk(full);
        continue;
      }
      if (!SOURCE_EXT.some(ext => entry.name.endsWith(ext))) continue;
      let source;
      try {
        source = fs.readFileSync(full, 'utf8');
      } catch {
        continue;
      }
      out.push({ path: full.slice(root.length + 1), source });
    }
  };
  walk(root);
  return out;
}

/**
 * @param {{path: string, source: string}[]} files  candidates, from candidateFiles()
 * @returns {string[]} paths that deploy with a Bunny secret, sorted
 *
 * Tests are excluded because they carry fixtures that read these names on
 * purpose — including this guard's own cells, which would otherwise police
 * themselves. DECLARED BLIND SPOT: a real deploy script named `*.test.*` would
 * escape. Nothing in the repo is shaped that way, and the alternative is a
 * guard that flags its own fixtures forever.
 */
export function deployScripts(files) {
  return files
    .filter(f => READS_SECRET.test(f.source))
    .filter(f => !/\.(test|spec)\.[cm]?[jt]s$/.test(f.path))
    .map(f => f.path)
    .sort(byCodeUnit);
}

/**
 * 🔴 DETECTS THE ANTI-PATTERN, NOT THE CURE — my first version did the
 * opposite and was wrong. It asked whether the file contains a non-zero exit
 * after any `if (!…)`, which is true of apps/web's script because it exits 1
 * when an UPLOAD fails. Right answer about the wrong branch: the question is
 * what happens on the MISSING-SECRET path, not whether the file can ever fail.
 *
 * So the discriminating signal is the opposite one: a guard clause on a Bunny
 * secret that ends in `process.exit(0)`.
 */
export function exitsZeroOnMissingSecret(source) {
  for (const m of source.matchAll(/process\.exit\(\s*0\s*\)/g)) {
    const before = source.slice(Math.max(0, m.index - 500), m.index);
    const guard = before.lastIndexOf('if (!');
    if (guard === -1) continue;
    // Any negated guard that ends in exit(0) counts. The denominator is
    // already restricted to files that read a Bunny secret, so a precondition
    // this script bails out of quietly IS the missing-secret path — and
    // requiring the clause to name the secret literally would miss the common
    // shape, where the guard tests locals assigned from the env further up.
    return true;
  }
  return false;
}

/** The script refuses to continue without its secrets. */
export function failsClosedInScript(source) {
  if (/applyDeployMode|resolveDeployMode/.test(source)) return true;
  return !exitsZeroOnMissingSecret(source);
}

/**
 * The workflow refuses to run the script without its secrets.
 *
 * Looks for a step that reads the same secret names AND can fail: a bare
 * `echo` of a missing secret is not a guard, so an `exit 1` / `::error::` must
 * be present in the same workflow.
 */
export function guardedByWorkflow(workflowSource, names) {
  if (!names.length) return false;
  const mentionsAll = names.every(n => workflowSource.includes(n));
  const canFail = /exit 1|::error::/.test(workflowSource);
  return mentionsAll && canFail;
}

/** The secret names a script reads. */
export function secretNames(source) {
  return [
    ...new Set(
      [...source.matchAll(/\bBUNNY_[A-Z0-9_]*(?:ZONE|API_KEY)\b/g)].map(
        m => m[0],
      ),
    ),
  ].sort(byCodeUnit);
}

/**
 * @param {{path: string, source: string}[]} scripts
 * @param {{path: string, source: string}[]} workflows
 * @returns {{path: string, protection: 'script'|'workflow'|'none', names: string[]}[]}
 */
export function deployProtection(scripts, workflows) {
  return deployScripts(scripts).map(path => {
    const { source } = scripts.find(s => s.path === path);
    const names = secretNames(source);
    if (failsClosedInScript(source))
      return { path, protection: 'script', names };
    if (workflows.some(w => guardedByWorkflow(w.source, names)))
      return { path, protection: 'workflow', names };
    return { path, protection: 'none', names };
  });
}
