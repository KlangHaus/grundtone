import { describe, expect, it } from 'vitest';
import { generateHTML } from '@tiptap/html';

import { buildExtensions, DEFAULT_FEATURES } from './extensions';
import { fromHTML } from './fromHTML';

/**
 * Cells for fromHTML (requested by [projektleder] for [resonans], 2026-10-02).
 *
 * 🔴 WHAT THESE CELLS DO AND DO NOT ESTABLISH. They measure that the converter
 * keeps the markup the feature set models and that four specific hostile inputs
 * do not survive. They do NOT establish that fromHTML is a sanitizer — it is a
 * parser against a schema, and the reason unknown things vanish is that they
 * have no place in the document, not that anything strips them. The viewport is
 * these four inputs and the default feature set. No broader XSS corpus was run.
 */

const render = (html: string) =>
  generateHTML(fromHTML(html), buildExtensions(DEFAULT_FEATURES));

describe('fromHTML keeps what the schema models', () => {
  it('round-trips ordinary markup', () => {
    const out = render(
      '<p>Hej <strong>verden</strong></p><ul><li>et</li></ul>',
    );
    expect(out).toContain('<strong>verden</strong>');
    expect(out).toContain('<ul>');
    expect(out).toContain('et');
  });

  it('produces a doc node the editor can take as modelValue', () => {
    const json = fromHTML('<p>a</p>');
    expect(json.type).toBe('doc');
    expect(Array.isArray(json.content)).toBe(true);
  });

  it('keeps a link, which is in the default feature set', () => {
    expect(render('<p><a href="https://example.test">x</a></p>')).toContain(
      'href=',
    );
  });

  it('🔴 drops a mark the feature set excludes, rather than keeping it silently', () => {
    // `strike` is deliberately off in v1. A reader who sees content survive
    // here would conclude the converter is permissive; it is not — it is
    // exactly as permissive as the schema.
    expect(render('<p><s>gone</s></p>')).not.toContain('<s>');
  });
});

describe('🔴 what does NOT survive — measured, not assumed', () => {
  it('an XSS attempt leaves no onerror and no script', () => {
    const out = render(
      '<p>a</p><img src=x onerror="alert(1)"><script>alert(2)</script>',
    );
    expect(out).not.toContain('onerror');
    expect(out).not.toContain('<script');
    // …and the legitimate part DID survive, so this is not a cell that passes
    // by producing nothing.
    expect(out).toContain('a');
  });

  it('an unknown tag is normalised rather than preserved', () => {
    expect(render('<p>a</p><marquee>b</marquee>')).not.toContain('marquee');
  });

  it('inline style and onclick do not survive', () => {
    const out = render('<p style="color:red" onclick="x()">styled</p>');
    expect(out).not.toContain('style=');
    expect(out).not.toContain('onclick');
    expect(out).toContain('styled');
  });

  it('empty input is a document, not a crash', () => {
    expect(fromHTML('').type).toBe('doc');
  });
});

describe('🔴 the converter and the editor share ONE extension set', () => {
  it('fromHTML honours a narrowed feature list', () => {
    // The discriminating case for the shared builder: with `bold` off, bold
    // markup must not be in the document. If the converter had its own list,
    // this would pass while the editor dropped the mark on first open — content
    // lost between import and first edit, with nothing red anywhere.
    const json = fromHTML('<p><strong>b</strong></p>', ['italic']);
    expect(JSON.stringify(json)).not.toContain('bold');
  });

  it('and keeps it when the feature IS enabled (the accept side)', () => {
    const json = fromHTML('<p><strong>b</strong></p>', ['bold']);
    expect(JSON.stringify(json)).toContain('bold');
  });
});
