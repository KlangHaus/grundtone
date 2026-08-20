import { createRequire } from 'node:module';
import { dirname } from 'node:path';

import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
  addImports,
  createResolver,
} from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Theme configuration – REQUIRED. Configure your brand colors.
   * Use createTheme() from @grundtone/core to customize.
   *
   * @example
   * theme: createTheme({ light: { colors: { primary: '#your-brand' } } })
   */
  theme?: {
    light?: Record<string, unknown>;
    dark?: Record<string, unknown>;
  };

  /**
   * Whether to automatically import components
   * @default true
   */
  components?: boolean;

  /**
   * Whether to automatically import composables
   * @default true
   */
  composables?: boolean;

  /**
   * Prefix for component names
   * @default 'GT'
   */
  prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@grundtone/nuxt',
    configKey: 'grundtone',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    components: true,
    composables: true,
    prefix: 'GT',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Inject design-system CSS (custom properties) via @grundtone/vue subpath
    nuxt.options.css.push(resolver.resolve('../../vue/dist/index.css'));

    // Wire the SCSS token namespace so a consumer's own styles can call
    // tokens.space(), tokens.color() and friends without configuring anything.
    //
    // 🔴 Measured 2026-08-20: without this, any app whose styles use the token
    // functions fails to BUILD — `[sass] There is no module with the namespace
    // "tokens"`, 25 errors in the playground alone. The published 2.23.x module
    // does this; develop's did not, and both apps in this repo carried their
    // own copy of the workaround in nuxt.config. A workaround duplicated in two
    // places is evidence of an unnamed defect upstream — nobody reported it,
    // because a workaround that works does not feel like a bug.
    //
    // The path is resolved from the package rather than passed as a bare
    // specifier: sass resolves bare specifiers only through an importer, and an
    // absolute path works in every consumer layout.
    // Resolved through the package's OWN public entry point rather than its
    // package.json: develop's export map deliberately no longer exposes
    // ./package.json, and reaching around a package's exports to find its
    // files is how tooling breaks on the next release.
    const require_ = createRequire(import.meta.url);
    const libScss = require_.resolve('@grundtone/design-system/scss/lib');
    const dsSrc = dirname(libScss);
    const tokenImport = `@use "${libScss}" as tokens;`;

    nuxt.options.vite = nuxt.options.vite ?? {};
    nuxt.options.vite.css = nuxt.options.vite.css ?? {};
    nuxt.options.vite.css.preprocessorOptions =
      nuxt.options.vite.css.preprocessorOptions ?? {};
    const scssOptions = nuxt.options.vite.css.preprocessorOptions.scss ?? {};
    const existing = scssOptions.additionalData;

    nuxt.options.vite.css.preprocessorOptions.scss = {
      ...scssOptions,
      // Existing additionalData is PREPENDED to, never replaced — a consumer
      // may have their own, and silently dropping it would be a second bug of
      // the same kind as the one this fixes.
      additionalData:
        typeof existing === 'function'
          ? (source: string, filename: string) =>
              `${tokenImport}\n${existing(source, filename)}`
          : `${tokenImport}\n${typeof existing === 'string' ? existing : ''}`,
      includePaths: [...(scssOptions.includePaths ?? []), dsSrc],
      silenceDeprecations: [
        ...(scssOptions.silenceDeprecations ?? []),
        'if-function',
      ],
    };

    // NOT ported from the published module, deliberately — measured, not assumed:
    //   · vite.ssr.noExternal — the published build ships per-component CSS
    //     files, which SSR only processes when the package is not externalised.
    //     develop ships one bundle imported from the package entry, which Vite
    //     handles either way. Measured: SSR output carries the component CSS
    //     without it. Re-adding it would solve a problem this build does not
    //     have.
    //   · a written theme.css in a cache dir — develop emits the theme through
    //     the CSS bundle instead. Measured in the playground's SSR output:
    //     --color-primary carries the configured brand colour.

    // Auto-import components
    if (options.components) {
      const componentDirs = ['atoms', 'molecules', 'organisms'];
      for (const dir of componentDirs) {
        addComponentsDir({
          path: resolver.resolve(`../../vue/src/${dir}`),
          pathPrefix: false,
          prefix: options.prefix,
          extensions: ['.vue'],
          pattern: '**/[A-Z]*.vue',
        });
      }
    }

    // Auto-import composables
    if (options.composables) {
      addImportsDir(resolver.resolve('../../vue/src/composables'));

      // Auto-import icon registry injection key
      addImports([
        {
          name: 'GT_ICON_REGISTRY_KEY',
          from: '@grundtone/vue',
        },
      ]);

      // Auto-import validator factories from @grundtone/utils
      const validators = [
        'required',
        'email',
        'phone',
        'cpr',
        'cvr',
        'minLength',
        'maxLength',
        'pattern',
        'url',
        'composeValidators',
      ];
      addImports(
        validators.map(name => ({
          name,
          from: '@grundtone/utils',
        })),
      );
    }

    // Expose module options to runtime
    nuxt.options.runtimeConfig.public.grundtone = {
      theme: options.theme,
      components: options.components ?? true,
      composables: options.composables ?? true,
      prefix: options.prefix ?? 'GT',
    };

    // Dev warning if theme not configured
    if (!options.theme && nuxt.options.devtools) {
      // eslint-disable-next-line no-console -- intentional dev warning
      console.warn(
        '[Grundtone] Theme not configured. Add theme config to match your brand:\n' +
          '  grundtone: {\n' +
          '    theme: createTheme({ light: { primary: "#..." }, dark: { ... } })\n' +
          '  }\n' +
          'See: https://github.com/KlangHaus/grundtone#theme-configuration',
      );
    }
  },
}) as NuxtModule<ModuleOptions>;
