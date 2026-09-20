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
 * like KH-1100 — and the old rule called it fine. Worse, the cell asserted that
 * answer as correct ("two ups stay inside"), so the guard did not merely miss
 * the case: it pinned the wrong behaviour.
 *
 * Measured by [sikkerhed]: `../src/tokens`, `../../../src/tokens` and
 * `import('../../../src/core')` all passed unflagged, while the control
 * `../../utils/src` was flagged. Calibrated honestly: 0 occurrences in today's
 * artifact, and the six benign forms all resolve inside `dist` — a hole in the
 * RULE, not in 3.2.1.
 *
 * 🔴 The existing coverage does not weaken this, and the proof is an outcome
 * rather than a reading: `pack-smoke` has run in CI the whole time, and
 * @grundtone/vue 3.1.0 AND 3.2.0 shipped the escaping paths anyway. A guard
 * that was green through two releases of the defect cannot be the reason not to
 * fix this one.
 *
 * @param {string} filePath   path relative to the PACKAGE root, e.g. dist/atoms/Icon/types.d.ts
 * @param {string} importPath the specifier as written
 * @param {string[]} files    the package's `files` field
 */
export function escapesPublishedFiles(filePath, importPath, files) {
  if (!importPath.startsWith('.')) return false; // bare specifier: not our question

  // 🔴 The floor is loud rather than permissive. An empty `files` would make
  // every path "unpublished" — but a caller that forgot to pass it would
  // otherwise get a silent avalanche of findings, and the guard would look
  // newly effective instead of newly broken.
  if (!Array.isArray(files) || files.length === 0)
    throw new Error(
      `escapesPublishedFiles: no \`files\` given for ${filePath} — the tarball ` +
        'boundary cannot be decided without it, and guessing it is how the ' +
        'package-root rule went wrong in the first place',
    );

  const segments = filePath.split('/').slice(0, -1);
  for (const part of importPath.split('/')) {
    if (part === '.' || part === '') continue;
    if (part === '..') {
      // Above the package root: escapes, and no `files` entry can cover it.
      if (segments.length === 0) return true;
      segments.pop();
      continue;
    }
    segments.push(part);
  }
  const resolved = segments.join('/');

  // Published directories, as `files` spells them (`dist`, `dist/**`, `dist/`).
  const published = files.map(f => f.replace(/\/\*\*$/, '').replace(/\/$/, ''));
  return !published.some(
    dir => resolved === dir || resolved.startsWith(`${dir}/`),
  );
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
 *   dtsFiles       — the declaration files being read
 *   publishedFiles — the package's `files` field, i.e. what the tarball carries
 * The old signature called the first one `files`, and the rule it fed asked
 * about the package ROOT rather than the tarball. Reusing one word for two
 * questions is how they got confused.
 *
 * @param {{path: string, source: string}[]} dtsFiles  .d.ts files, package-relative
 * @param {string[]} publishedFiles  the package's `files` field
 * @returns {{escaping: {path: string, importPath: string, form: string}[],
 *            seen: Record<string, number>, files: number}}
 */
export function escapingTypeImports(dtsFiles, publishedFiles) {
  const escaping = [];
  const seen = Object.fromEntries(Object.keys(FORMS).map(form => [form, 0]));

  for (const file of dtsFiles) {
    for (const [form, pattern] of Object.entries(FORMS)) {
      // A fresh regex per file: a shared /g keeps lastIndex between calls.
      for (const m of file.source.matchAll(new RegExp(pattern.source, 'g'))) {
        seen[form] += 1;
        if (escapesPublishedFiles(file.path, m[1], publishedFiles))
          escaping.push({ path: file.path, importPath: m[1], form });
      }
    }
  }
  return { escaping, seen, files: dtsFiles.length };
}
