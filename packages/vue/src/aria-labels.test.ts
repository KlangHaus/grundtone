// @vitest-environment node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

// 🔴 No component may hardcode the words in an aria-label (ClickUp 869fbfz74).
//
// A literal in a template is text a consumer cannot replace: an English app
// got Danish screen-reader labels ("Luk", "Forrige måned") with no way around
// them, and nothing renders differently, so a visual review never sees it.
// Every such label is now a prop whose default is the old text. This cell keeps
// it that way: a new `aria-label="Close"` or `:aria-label="`Fjern ${x}`"` fails
// here, naming the file and line.
//
// Scope: `aria-label` in the library's .vue files, demo.vue excluded (demos are
// consumer code). Other attributes (aria-roledescription, placeholder, title)
// are NOT covered by this cell.

const SRC = __dirname;

function vueFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(entry => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return vueFiles(full);
    return entry.endsWith('.vue') && entry !== 'demo.vue' ? [full] : [];
  });
}

const ATTR = /(^|\s)(:|v-bind:)?aria-label="([^"]*)"/g;

/** Words in a quoted or template string literal, after removing `${…}` holes. */
function hasLiteralWords(expr: string): boolean {
  const literals = expr.match(/'[^']*'|`[^`]*`/g) ?? [];
  return literals.some(l => /\p{L}/u.test(l.replace(/\$\{[^}]*\}/g, '')));
}

export interface Finding {
  line: number;
  attr: string;
}

/** Every aria-label in `source`, and the ones that hardcode words. */
export function scan(source: string): { total: number; offending: Finding[] } {
  let total = 0;
  const offending: Finding[] = [];
  source.split('\n').forEach((text, i) => {
    for (const m of text.matchAll(ATTR)) {
      total++;
      const bound = Boolean(m[2]);
      const value = m[3]!;
      const hardcoded = bound ? hasLiteralWords(value) : /\p{L}/u.test(value);
      if (hardcoded) offending.push({ line: i + 1, attr: m[0].trim() });
    }
  });
  return { total, offending };
}

describe('🔴 aria-labels in @grundtone/vue are overridable', () => {
  const files = vueFiles(SRC);
  const results = files.map(f => ({
    file: relative(SRC, f),
    ...scan(readFileSync(f, 'utf8')),
  }));

  it('scans the library (the denominator)', () => {
    // 50 aria-labels in 57 files on the day this cell was written. A floor, not
    // a pin: a scan that silently found nothing must not pass as clean.
    expect(files.length).toBeGreaterThan(40);
    expect(results.reduce((n, r) => n + r.total, 0)).toBeGreaterThan(40);
  });

  it('no aria-label hardcodes its words', () => {
    const offenders = results.flatMap(r =>
      r.offending.map(o => `${r.file}:${o.line} ${o.attr}`),
    );
    expect(offenders, 'make it a prop whose default is the text').toEqual([]);
  });
});

describe('the scanner itself', () => {
  it('flags every form of a hardcoded label', () => {
    const src = [
      '<button aria-label="Luk" />',
      `<button :aria-label="'Forrige slide'" />`,
      '<button :aria-label="`Fjern ${name}`" />',
      `<button :aria-label="open ? 'Luk kalender' : openLabel" />`,
      '<button v-bind:aria-label="`Gå til slide ${i + 1}`" />',
    ].join('\n');
    const { total, offending } = scan(src);
    expect(total).toBe(5);
    expect(offending.map(o => o.line)).toEqual([1, 2, 3, 4, 5]);
  });

  it('leaves a label that comes from a prop alone (negative control)', () => {
    const src = [
      '<button :aria-label="closeLabel" />',
      '<button :aria-label="open ? closeCalendarLabel : openCalendarLabel" />',
      '<button :aria-label="removeLabel(label)" />',
      '<span :aria-label="`${label}`" />',
      '<span aria-label="" />',
    ].join('\n');
    const { total, offending } = scan(src);
    expect(total).toBe(5);
    expect(offending).toEqual([]);
  });
});
