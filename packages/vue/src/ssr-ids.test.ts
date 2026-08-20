import { describe, it, expect } from 'vitest';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h, type Component } from 'vue';
import { GTCheckbox } from './atoms/Checkbox';
import { GTInput } from './atoms/Input';
import { GTPasswordInput } from './atoms/PasswordInput';
import { GTSelect } from './atoms/Select';
import { GTTextarea } from './atoms/Textarea';

/**
 * Ids are rendered into `id`, `for` and `aria-describedby`, so the server and
 * the client have to agree on them. A module-level counter cannot: an SSR
 * process serves many requests and never resets, while every browser starts
 * from scratch — so from the second request on, the markup stops matching and
 * hydration breaks the label and description wiring.
 */
const CONTROLS: Array<[string, Component]> = [
  ['GTInput', GTInput],
  ['GTPasswordInput', GTPasswordInput],
  ['GTTextarea', GTTextarea],
  ['GTSelect', GTSelect],
  ['GTCheckbox', GTCheckbox],
];

const idsIn = (html: string) => html.match(/id="([^"]+)"/g) ?? [];

describe('ids survive across SSR requests', () => {
  it.each(CONTROLS)(
    '%s renders the same ids on every request',
    async (_n, c) => {
      const App = { render: () => h(c, { label: 'Label' }) };

      const first = await renderToString(createSSRApp(App));
      const second = await renderToString(createSSRApp(App));

      expect(idsIn(first).length).toBeGreaterThan(0);
      expect(idsIn(second)).toEqual(idsIn(first));
    },
  );

  it('an explicit id prop still wins', async () => {
    const App = { render: () => h(GTInput, { id: 'chosen', label: 'Label' }) };
    expect(await renderToString(createSSRApp(App))).toContain('id="chosen"');
  });
});
