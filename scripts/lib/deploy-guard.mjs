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

/** A file that reads a Bunny secret is a deploy script, whatever it is named. */
export const BUNNY_SECRET = /\bBUNNY_[A-Z0-9_]*(ZONE|API_KEY)\b/;

/**
 * @param {{path: string, source: string}[]} files  candidate scripts
 * @returns {string[]} paths that touch a Bunny zone/key, sorted
 */
export function deployScripts(files) {
  return files
    .filter(f => BUNNY_SECRET.test(f.source))
    .map(f => f.path)
    .sort();
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
    void before.slice(guard);
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
  ].sort();
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
