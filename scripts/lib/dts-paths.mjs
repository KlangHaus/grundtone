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
 * 🔴 THE BOUNDARY IS THE TARBALL, NOT THE PACKAGE ROOT (riff KH-1113, found by
 * [sikkerhed] on #219).
 *
 * The first version of this rule asked "does the resolved path leave the
 * package root?". The danger is "does it land somewhere the tarball does not
 * contain?" — and those are different questions, because `files` publishes only
 * part of the package. `@grundtone/vue` ships `files: ["dist","scss"]`, so:
 *
 *     dist/a/b.d.ts  +  ../../x   ->  resolves to  x   (the package ROOT)
 *
 * is INSIDE the package and NOT in the tarball. It fails for a consumer exactly
 * like KH-1100 — and the old rule called it fine.
 *
 * 🔴 AND THE BOUNDARY IS THE PACK LIST, NOT A READING OF `files` (KH-1113, step
 * two). #220 moved the rule from the package root to `files`, but it did so by
 * RE-INTERPRETING `files` as a list of directory prefixes. That is a second
 * model of npm-packlist, and it is wrong wherever the two disagree:
 *
 *   - a target inside a published dir that does not EXIST passes as "inside"
 *     (`dist/x.d.ts` -> `./gone`) — the consumer still gets TS2307;
 *   - a `files` glob such as `dist/*.d.ts` is matched as a literal prefix;
 *   - `!dist/internal` and `.npmignore` exclusions are invisible;
 *   - files npm ALWAYS packs (`package.json`, `README*`, `LICENSE*`) are
 *     reported as unpublished.
 *
 * So the question is now asked of the list `pnpm pack` itself produced: does
 * the specifier resolve to a file that IS in the tarball? There is no model of
 * `files` left here to drift.
 *
 * @param {string} filePath   path relative to the PACKAGE root, e.g. dist/atoms/Icon/types.d.ts
 * @param {string} importPath the specifier as written
 * @param {Set<string>} packed every path in the tarball, package-relative
 */
export function missingFromTarball(filePath, importPath, packed) {
  if (!importPath.startsWith('.')) return false; // bare specifier: not our question

  // 🔴 The floor is loud rather than permissive. An empty pack list would make
  // every path "unpublished" — a caller that forgot to pass it would get a
  // silent avalanche of findings, and the guard would look newly effective
  // instead of newly broken.
  if (!(packed instanceof Set) || packed.size === 0)
    throw new Error(
      `missingFromTarball: no pack list given for ${filePath} — the tarball ` +
        'boundary cannot be decided without it, and guessing it is how the ' +
        'package-root rule went wrong in the first place',
    );

  const resolved = resolveRelative(filePath, importPath);
  // Above the package root: no tarball entry can cover it.
  if (resolved === null) return true;
  return !typeTargets(resolved).some(candidate => packed.has(candidate));
}

/**
 * `dist/a/b.d.ts` + `../c` -> `dist/c`, or null when it climbs above the root.
 * @param {string} filePath
 * @param {string} importPath
 */
export function resolveRelative(filePath, importPath) {
  const segments = filePath.split('/').slice(0, -1);
  for (const part of importPath.split('/')) {
    if (part === '.' || part === '') continue;
    if (part === '..') {
      if (segments.length === 0) return null;
      segments.pop();
      continue;
    }
    segments.push(part);
  }
  return segments.join('/');
}

// What TypeScript tries for a relative specifier, in the shapes this repo emits:
// `./x` -> x.d.ts, `./Toggle.vue` -> Toggle.vue.d.ts, `./dir` -> dir/index.d.ts,
// `./module.mjs` -> module.d.mts, `../template-CJ3ZdEAr.cjs` -> template-CJ3ZdEAr.d.cts.
const JS_TO_TYPES = {
  '.js': ['.d.ts', '.ts', '.tsx'],
  '.jsx': ['.d.ts', '.tsx'],
  '.mjs': ['.d.mts', '.mts'],
  '.cjs': ['.d.cts', '.cts'],
};
const APPENDED = ['.d.ts', '.d.mts', '.d.cts', '.ts', '.tsx', '.mts', '.cts'];

/**
 * Every file a relative specifier may take its TYPES from, package-relative.
 *
 * 🔴 A JS extension never counts as its own answer. `./module.mjs` is satisfied
 * by `module.d.mts`, not by `module.mjs`: a tarball that ships the code but not
 * its declaration gives the consumer `any`, which is the KH-1100 failure. The
 * first draft of this list put the exact path first and passed nuxt's
 * `./module.mjs` on the `.mjs` alone — measured, not reasoned.
 *
 * @param {string} resolved
 */
export function typeTargets(resolved) {
  const jsExt = Object.keys(JS_TO_TYPES).find(ext => resolved.endsWith(ext));
  if (jsExt) {
    const stem = resolved.slice(0, -jsExt.length);
    return JS_TO_TYPES[jsExt].map(ext => stem + ext);
  }
  const index = ['index.d.ts', 'index.ts'].map(f =>
    resolved ? `${resolved}/${f}` : f,
  );
  return [resolved, ...APPENDED.map(ext => resolved + ext), ...index];
}

/**
 * 🔴 REPORTS ITS OWN DENOMINATOR, PER FORM ([quality]'s requirement on #217).
 * `escaping: []` alone reads as "nothing wrong", and it reads the same whether
 * the guard examined four forms or silently examined one — which is exactly how
 * the `import('…')` hole survived. `seen` counts candidates per form, so a form
 * that suddenly yields zero is visible as a change in the INSTRUMENT rather
 * than as good news about the artifact.
 *
 * 🔴 TWO DIFFERENT KINDS OF "files", named apart on purpose (KH-1113):
 *   dtsFiles — the declaration files being read
 *   packed   — every path `pnpm pack` put in the tarball
 * The first signature called the former `files`, and the rule it fed asked
 * about the package ROOT rather than the tarball. Reusing one word for two
 * questions is how they got confused.
 *
 * @param {{path: string, source: string}[]} dtsFiles  .d.ts files, package-relative
 * @param {Iterable<string>} packed  the tarball's paths, package-relative
 * @returns {{escaping: {path: string, importPath: string, form: string}[],
 *            seen: Record<string, number>, files: number}}
 */
export function escapingTypeImports(dtsFiles, packed) {
  const packedSet = new Set(packed);
  const escaping = [];
  const seen = Object.fromEntries(Object.keys(FORMS).map(form => [form, 0]));

  for (const file of dtsFiles) {
    for (const [form, pattern] of Object.entries(FORMS)) {
      // A fresh regex per file: a shared /g keeps lastIndex between calls.
      for (const m of file.source.matchAll(new RegExp(pattern.source, 'g'))) {
        seen[form] += 1;
        if (missingFromTarball(file.path, m[1], packedSet))
          escaping.push({ path: file.path, importPath: m[1], form });
      }
    }
  }
  return { escaping, seen, files: dtsFiles.length };
}
