import { describe, it, expect } from 'vitest';

import module from './module';

/** Nok af Nuxts option-træ til at modulet kan skrive i det. */
function fakeNuxt() {
  return {
    // defineNuxtModule's compatibility check kalder getNuxtVersion(nuxt), som
    // læser _version af instansen — uden den fejler modulet før sin egen setup.
    _version: '4.5.1',
    options: {
      css: [] as string[],
      vite: {} as Record<string, unknown>,
      runtimeConfig: { public: {} as Record<string, unknown> },
      devtools: false,
    },
    hook: () => {},
    callHook: async () => {},
    hooks: { hook: () => {}, callHook: async () => {} },
  };
}

// components/composables slås fra: de kalder addComponentsDir/addImports, som
// kræver en ægte Nuxt-kontekst. Alt det, der gik TABT i develop, ligger uden
// for de to flag.
const OPTS = { components: false, composables: false } as const;

describe('grundtone nuxt-modulet', () => {
  it('wirer token-namespacet ind i Vites scss-options', async () => {
    const nuxt = fakeNuxt();
    await (module as unknown as (o: unknown, n: unknown) => Promise<void>)(
      OPTS,
      nuxt,
    );

    const scss = (nuxt.options.vite as any).css.preprocessorOptions.scss;
    expect(scss.additionalData).toContain('as tokens;');
    expect(scss.additionalData).toContain('lib.scss');
    expect(scss.includePaths.length).toBeGreaterThan(0);
  });

  // 🔴 Regressionen selv: uden dette fejler enhver forbrugers build med
  // "There is no module with the namespace \"tokens\"".
  it('bruger en ABSOLUT sti, ikke en bar specifier sass ikke kan opløse', async () => {
    const nuxt = fakeNuxt();
    await (module as unknown as (o: unknown, n: unknown) => Promise<void>)(
      OPTS,
      nuxt,
    );

    const { additionalData } = (nuxt.options.vite as any).css
      .preprocessorOptions.scss;
    expect(additionalData).toMatch(/@use "\//);
    expect(additionalData).not.toContain('@grundtone/design-system/scss/lib');
  });

  it('injicerer design-system-CSS i nuxt.options.css', async () => {
    const nuxt = fakeNuxt();
    await (module as unknown as (o: unknown, n: unknown) => Promise<void>)(
      OPTS,
      nuxt,
    );

    expect(nuxt.options.css.some(p => p.endsWith('index.css'))).toBe(true);
  });

  it('eksponerer modulets options til runtime', async () => {
    const nuxt = fakeNuxt();
    await (module as unknown as (o: unknown, n: unknown) => Promise<void>)(
      { ...OPTS, prefix: 'XX' },
      nuxt,
    );

    expect(nuxt.options.runtimeConfig.public.grundtone).toMatchObject({
      prefix: 'XX',
      components: false,
      composables: false,
    });
  });
});
