import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils/e2e';

// 🔴 THE ACCEPTANCE CELL for riff zh3ayeik, end to end through a real Nuxt
// build: a consumer imports useToast from '@grundtone/vue' and renders the
// auto-imported GTToastContainer. Before the fix the module registered the
// container from @grundtone/vue/src while the import resolved to dist, so the
// two held different toastState objects and the toast never rendered — with
// no error anywhere. Server-rendered HTML is enough to tell those apart.

await setup({
  rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  server: true,
  browser: false,
});

describe('a consumer toast reaches the auto-imported container', () => {
  it('renders the message the page pushed through the package entry', async () => {
    const html = await $fetch<string>('/');
    expect(html).toContain('toast from the package entry');
  });
});
