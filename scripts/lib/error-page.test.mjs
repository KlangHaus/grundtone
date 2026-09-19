import { describe, expect, it } from 'vitest';

import { errorPageInBuild } from './error-page.mjs';

const SHELL =
  '<!DOCTYPE html><html><head><title>grundtone</title>' +
  '<script type="module" src="/_nuxt/BPzHyorX.js"></script></head>' +
  '<body><div id="__nuxt"></div></body></html>';

const ok = () =>
  errorPageInBuild({
    fallbackHtml: SHELL,
    bundleSources: ['…minified…This page is off the staff…error-page…'],
    markers: ['This page is off the staff', 'error-page'],
  });

describe('errorPageInBuild', () => {
  it('passes when the shell loads a module that carries the error page', () => {
    expect(ok()).toEqual({ ok: true, problems: [], checked: 1 });
  });

  // 🔴 THE MUTATION THAT MATTERS: error.vue removed from the app. The shell is
  // unchanged — only the emitted JavaScript stops carrying the page.
  it('fails when no bundle contains the error page any more', () => {
    const r = errorPageInBuild({
      fallbackHtml: SHELL,
      bundleSources: ['…minified…some other page…'],
      markers: ['This page is off the staff'],
    });
    expect(r.ok).toBe(false);
    expect(r.problems[0]).toContain('This page is off the staff');
  });

  it('fails when the fallback stops being a client shell', () => {
    const r = errorPageInBuild({
      fallbackHtml: '<html><body>plain</body></html>',
      bundleSources: ['This page is off the staff'],
      markers: ['This page is off the staff'],
    });
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toContain('client shell');
  });

  it('fails when the shell loads no script, however good the bundles are', () => {
    const r = errorPageInBuild({
      fallbackHtml: '<html><body><div id="__nuxt"></div></body></html>',
      bundleSources: ['This page is off the staff'],
      markers: ['This page is off the staff'],
    });
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toContain('no module script');
  });

  // 🔴 Two vacuity cells. Both describe a guard that passes while measuring
  // nothing, which is the failure this house keeps finding: reading zero files,
  // or asserting zero markers, must be RED rather than green.
  it('refuses to pass when it read no bundles', () => {
    const r = errorPageInBuild({
      fallbackHtml: SHELL,
      bundleSources: [],
      markers: ['anything'],
    });
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toContain('vacuous');
    expect(r.checked).toBe(0);
  });

  it('refuses to pass when it was given no markers', () => {
    const r = errorPageInBuild({
      fallbackHtml: SHELL,
      bundleSources: ['whatever'],
      markers: [],
    });
    expect(r.ok).toBe(false);
    expect(r.problems.join(' ')).toContain('assert nothing');
  });

  it('names every missing marker, not just the first', () => {
    const r = errorPageInBuild({
      fallbackHtml: SHELL,
      bundleSources: ['nothing useful'],
      markers: ['alpha', 'beta'],
    });
    expect(r.problems).toHaveLength(2);
  });
});
