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

/** `from '…'` / `import … from '…'` targets in a declaration file. */
const IMPORT_PATH = /from\s+'([^']+)'/g;

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
 * @param {{path: string, source: string}[]} files  .d.ts files, package-relative
 * @returns {{path: string, importPath: string}[]}
 */
export function escapingTypeImports(files) {
  const out = [];
  for (const file of files) {
    for (const m of file.source.matchAll(IMPORT_PATH)) {
      if (escapesPackage(file.path, m[1]))
        out.push({ path: file.path, importPath: m[1] });
    }
  }
  return out;
}
