// @vitest-environment node
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

import { fromHTML } from './fromHTML';

/**
 * 🔴 THE CELL BEHIND THE happy-dom ACCEPT (GHSA-834v-8h66-3h79, osv-scanner.toml).
 *
 * The advisory is host code execution through happy-dom's ESM compiler, so it
 * needs a script to be EVALUATED. The accept rests on that never happening on
 * the path @grundtone/vue uses: fromHTML -> @tiptap/html's SERVER build ->
 * happy-dom. A default is not a guard unless something measures it, and this
 * file is that measurement ([sikkerhed], #286).
 *
 * Two facts, measured on happy-dom 20.11.1 (2026-10-25):
 *   1. happy-dom does not evaluate scripts unless `enableJavaScriptEvaluation`
 *      is set. Nothing on our path sets it. tiptap passes
 *      `disableJavaScriptEvaluation: true`, but that flag is deprecated and
 *      gates nothing ([sikkerhed]'s probe) — it is NOT the reason.
 *   2. tiptap parses with `DOMParser.parseFromString`, which ran no script even
 *      WITH evaluation enabled.
 *
 * The signal is host-visible: an executed script inserts a <p>RAN-…</p>, which
 * would come back as a paragraph. The positive control proves the signal fires
 * when a script really runs; without it the empty results below would say
 * nothing.
 *
 * If a cell here turns red, the accept's premise is gone: do not adjust the
 * cell, re-open the accept.
 */
const tiptapHtml = createRequire(import.meta.url).resolve('@tiptap/html');
const happyDomPath = createRequire(tiptapHtml).resolve('happy-dom');
const { Window } = (await import(happyDomPath)) as typeof import('happy-dom');

const SIGNAL = "document.body.insertAdjacentHTML('beforeend','<p>RAN</p>')";
const HOSTILE =
  `<p>ok</p><script>${SIGNAL}</script>` +
  `<script type="module">${SIGNAL}</script>` +
  `<img src="data:," onerror="${SIGNAL}">`;

/** Paragraphs a script inserted — not the script's own source text. */
const ranIn = (doc: {
  querySelectorAll(s: string): ArrayLike<{ textContent: string | null }>;
}) =>
  Array.from(doc.querySelectorAll('p')).filter(p => p.textContent === 'RAN')
    .length;

async function liveScript(settings: Record<string, boolean>) {
  const w = new Window({ settings });
  try {
    const s = w.document.createElement('script');
    s.textContent = SIGNAL;
    w.document.body.appendChild(s);
    await w.happyDOM.waitUntilComplete();
    return ranIn(w.document);
  } finally {
    await w.happyDOM.abort();
    await w.happyDOM.close();
  }
}

describe('happy-dom does not evaluate scripts on the fromHTML path (GHSA-834v accept)', () => {
  it('this file runs where @tiptap/html resolves to its happy-dom SERVER build', () => {
    // The browser build needs a DOM global; the server build creates its own
    // happy-dom Window. No `document` here means the server build is the one
    // fromHTML used below.
    expect(typeof document).toBe('undefined');
    expect(fromHTML('<p>x</p>').type).toBe('doc');
  });

  it('POSITIVE CONTROL: the signal fires when happy-dom really evaluates a script', async () => {
    expect(await liveScript({ enableJavaScriptEvaluation: true })).toBe(1);
  });

  it('fact 1: with happy-dom defaults, a live script does not run', async () => {
    expect(await liveScript({})).toBe(0);
  });

  it("fact 1: tiptap's own settings do not enable it either", async () => {
    expect(
      await liveScript({
        disableJavaScriptEvaluation: true,
        disableJavaScriptFileLoading: true,
        disableCSSFileLoading: true,
        disableIframePageLoading: true,
        disableComputedStyleRendering: true,
      }),
    ).toBe(0);
  });

  it('fact 2: parseFromString runs no script even WITH evaluation enabled', async () => {
    const w = new Window({ settings: { enableJavaScriptEvaluation: true } });
    try {
      const doc = new w.DOMParser().parseFromString(
        `<!DOCTYPE html><html><body>${HOSTILE}</body></html>`,
        'text/html',
      );
      await w.happyDOM.waitUntilComplete();
      expect(ranIn(doc)).toBe(0);
    } finally {
      await w.happyDOM.abort();
      await w.happyDOM.close();
    }
  });

  it('the real path: fromHTML on hostile markup returns no paragraph a script inserted', () => {
    const json = JSON.stringify(fromHTML(HOSTILE));
    expect(json).toContain('"text":"ok"');
    expect(json).not.toContain('"text":"RAN"');
  });
});
