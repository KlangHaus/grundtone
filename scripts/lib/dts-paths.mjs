/**
 * A published .d.ts may not resolve a type through a path outside its package.
 *
 * 🔴 WHY (riff KH-1100). `@grundtone/vue@3.1.0` and `@3.2.0` shipped
 * declarations that re-exported through `'../../utils/src'` and
 * `'../../core/src'`. Neither `@grundtone/utils` nor `@grundtone/core`
 * publishes `src/`, so the target existed in NO consumer install.
 *
 * MEASURED on a real consumer install of the published 3.2.0, which is the only
 * way to see how bad it is:
 *
 *   tsc, skipLibCheck: false -> 13x TS2307 "Cannot find module '../../utils/src'"
 *   tsc, skipLibCheck: true  -> 0 errors, AND the exported types are `any`
 *
 * The second row is the dangerous one and the reason this guard exists: with
 * the setting most consumers use, nothing fails. `const n: number = required()`
 * compiles. Proven by control rather than by inspection — the SAME three
 * nonsense lines imported from `@grundtone/utils` directly produce 3 errors,
 * and through `@grundtone/vue` produce none. The difference is the broken
 * re-export.
 *
 * Root cause: the root tsconfig maps the `@grundtone` scope onto each
 * package's `src` directory, and
 * the declaration emitter writes the RESOLVED path rather than the specifier
 * the author typed.
 */

/**
 * Every syntax a declaration file uses to name another module.
 *
 * 🔴 FOUND BY [quality] ON #217, AND THE NUMBER I PUBLISHED WAS ITS VICTIM.
 * The first version of this file matched only `from '…'`. Run against the
 * PUBLISHED 3.2.0 tarball, one pass per form:
 *
 *     from '…'        13 escaping, 9 files   <- all the guard could see
 *     import('…')      1 escaping            <- INVISIBLE
 *                        dist/atoms/Toggle/Toggle.vue.d.ts -> ../../../../core/src
 *     from "…"         0
 *     import("…")      0
 *
 * So the true count in the broken artifact is **14**, not the 13 I wrote in the
 * riff, the PR and the commit message. The denominator was produced by the very
 * regex it was meant to justify — and the mutation could not expose it: restore
 * the old tsconfig and the cell goes red on the 13, so everything looks right
 * while a regression confined to `import('…')` walks past a green guard.
 *
 * Double quotes are 0 in today's artifact and are matched anyway: they are the
 * same class, and "0 today" is the reason a form goes unnoticed, not a reason
 * to leave it out.
 */
export const FORMS = {
  "from '…'": /from\s+'([^']*)'/g,
  'from "…"': /from\s+"([^"]*)"/g,
  "import('…')": /import\(\s*'([^']*)'\s*\)/g,
  'import("…")': /import\(\s*"([^"]*)"\s*\)/g,
};

/**
 * 🔴 THE DISCRIMINATING RULE IS "DOES IT LEAVE THE PACKAGE", NOT "DOES IT START
 * WITH ..". Measured on vue's own output: of 19 candidate lines, 6 are benign
 * relative paths that stay inside `dist` (`dist/molecules/X` reaching
 * `../../composables/…` is still inside `dist`), and 13 escape. A guard that
 * flagged every `..` would fail on the 6 and be switched off within a week.
 *
 * @param {string} filePath  path relative to the PACKAGE root, e.g. dist/atoms/Icon/types.d.ts
 * @param {string} importPath
 */
export function escapesPackage(filePath, importPath) {
  const leading = /^(\.\.\/)+/.exec(importPath);
  // Not `.match(...)[0]`: that indexes a value that can be null, and the guard
  // that made it safe lived on a separate line where a later edit could drop it.
  if (!leading) return false;
  const depth = filePath.split('/').slice(0, -1).length;
  const ups = leading[0].split('../').length - 1;
  return ups > depth;
}

/**
 * 🔴 REPORTS ITS OWN DENOMINATOR, PER FORM ([quality]'s requirement on #217).
 * `escaping: []` alone reads as "nothing wrong". It reads the same whether the
 * guard examined four forms or silently examined one — which is exactly how the
 * `import('…')` hole survived. `seen` counts the candidate module references
 * found per form, so a form that suddenly yields zero candidates is visible as
 * a change in the instrument rather than as good news about the artifact.
 *
 * @param {{path: string, source: string}[]} files  .d.ts files, package-relative
 * @returns {{escaping: {path: string, importPath: string, form: string}[],
 *            seen: Record<string, number>, files: number}}
 */
export function escapingTypeImports(files) {
  const escaping = [];
  const seen = Object.fromEntries(Object.keys(FORMS).map(form => [form, 0]));

  for (const file of files) {
    for (const [form, pattern] of Object.entries(FORMS)) {
      // A fresh regex per file: a shared /g keeps lastIndex between calls.
      for (const m of file.source.matchAll(new RegExp(pattern.source, 'g'))) {
        seen[form] += 1;
        if (escapesPackage(file.path, m[1]))
          escaping.push({ path: file.path, importPath: m[1], form });
      }
    }
  }
  return { escaping, seen, files: files.length };
}
