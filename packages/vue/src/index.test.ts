import { describe, expect, it } from 'vitest';

import * as pkg from './index';

/**
 * Cells for the PACKAGE ENTRY — the surface consumers actually import.
 *
 * 🔴 WHY THIS FILE EXISTS. `fromHTML` shipped in #246 with its own cells in
 * `molecules/RichText/fromHTML.test.ts`, and they all passed — because they
 * import the implementation directly. The entry in `src/index.ts` re-exports
 * molecules by NAME, not with a wildcard, so the function was unreachable for
 * every consumer and no cell could see it. Cursor Bugbot found it; nothing in
 * the suite did.
 *
 * A cell that imports the implementation is not a cell that reads the published
 * surface. This one imports `./index` and nothing else, so deleting an export
 * line turns it red.
 *
 * 🔴 WHAT IT DOES NOT ESTABLISH. The entry has 119 export lines; these cells
 * cover the RichText surface only — the one that was actually broken. They are
 * not a complete inventory, and a name added elsewhere without a cell is still
 * invisible. Extend the list when you add a public name you care about.
 */
describe('package entry', () => {
  it('🔴 exports fromHTML, which molecule-level cells cannot see', () => {
    expect(typeof pkg.fromHTML).toBe('function');
  });

  it('exports the RichText component beside it', () => {
    expect(pkg.GTRichText).toBeDefined();
  });
});
