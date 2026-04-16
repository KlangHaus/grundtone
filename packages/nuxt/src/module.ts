import { dirname, join } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
  addImports,
  addPlugin,
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

    // Register runtime plugin — provides icon registry and applies theme
    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'all',
      order: -10, // run early so icon registry is available before components
    });

    // Resolve @grundtone/vue root directory (works from npm and monorepo)
    const require_ = createRequire(import.meta.url);
    const vuePkgPath = require_.resolve('@grundtone/vue/package.json');
    const vueRoot = dirname(vuePkgPath);

    // Cache dir for generated CSS files (theme overrides).
    // Component CSS is auto-imported via ESM side effects — no manual injection.
    const cacheDir = join(
      nuxt.options.rootDir,
      'node_modules',
      '.cache',
      'grundtone',
    );
    mkdirSync(cacheDir, { recursive: true });

    // Resolve @grundtone/design-system for SCSS token imports
    const dsPkgPath = require_.resolve('@grundtone/design-system/package.json');
    const dsRoot = dirname(dsPkgPath);
    const libScssPath = join(dsRoot, 'src/lib.scss');

    // Inject SCSS preprocessor config so component <style lang="scss"> blocks
    // can use the `tokens` namespace (e.g. tokens.color('primary'))
    const scssOptions = nuxt.options.vite.css?.preprocessorOptions?.scss ?? {};
    const existingAdditionalData = scssOptions.additionalData ?? '';
    const tokenImport = `@use "${libScssPath}" as tokens;`;

    nuxt.options.vite = nuxt.options.vite || {};
    nuxt.options.vite.css = nuxt.options.vite.css || {};
    nuxt.options.vite.css.preprocessorOptions =
      nuxt.options.vite.css.preprocessorOptions || {};
    nuxt.options.vite.css.preprocessorOptions.scss = {
      ...scssOptions,
      additionalData:
        typeof existingAdditionalData === 'string'
          ? `${tokenImport}\n${existingAdditionalData}`
          : (source: string, filename: string) => {
              const result =
                typeof existingAdditionalData === 'function'
                  ? (
                      existingAdditionalData as (s: string, f: string) => string
                    )(source, filename)
                  : '';
              return `${tokenImport}\n${result}`;
            },
      includePaths: [...(scssOptions.includePaths ?? []), join(dsRoot, 'src')],
      silenceDeprecations: [
        ...(scssOptions.silenceDeprecations ?? []),
        'if-function',
      ],
    };

    // Auto-import components
    if (options.components) {
      const componentDirs = ['atoms', 'molecules', 'organisms'];
      for (const dir of componentDirs) {
        addComponentsDir({
          path: join(vueRoot, `src/${dir}`),
          pathPrefix: false,
          prefix: options.prefix,
          extensions: ['.vue'],
          pattern: '**/[A-Z]*.vue',
        });
      }
    }

    // Auto-import composables
    if (options.composables) {
      addImportsDir(join(vueRoot, 'src/composables'));

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

      // Auto-import formatters and utilities from @grundtone/utils
      const utils = [
        'formatDate',
        'formatCurrency',
        'formatPhoneNumber',
        'formatCPR',
        'generateId',
        'getSystemThemeMode',
      ];
      addImports(
        utils.map(name => ({
          name,
          from: '@grundtone/utils',
        })),
      );
    }

    // Generate theme CSS and inject into <head> for SSR/SSG
    if (options.theme) {
      const { light, dark } = options.theme as {
        light?: Record<string, unknown>;
        dark?: Record<string, unknown>;
      };

      function camelToKebab(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }

      function themeToCSS(theme: Record<string, unknown>): string {
        const props: string[] = [];
        const colors = theme.colors as Record<string, string> | undefined;
        if (colors) {
          for (const [k, v] of Object.entries(colors)) {
            props.push(`--color-${camelToKebab(k)}:${v}`);
          }
        }
        const spacing = theme.spacing as Record<string, string> | undefined;
        if (spacing) {
          for (const [k, v] of Object.entries(spacing))
            props.push(`--space-${k}:${v}`);
        }
        const typo = theme.typography as
          | Record<string, Record<string, string | number>>
          | undefined;
        if (typo) {
          if (typo.fontFamily)
            for (const [k, v] of Object.entries(typo.fontFamily))
              props.push(`--font-family-${k}:${v}`);
          if (typo.fontSize)
            for (const [k, v] of Object.entries(typo.fontSize))
              props.push(`--font-size-${k}:${v}`);
          if (typo.fontWeight)
            for (const [k, v] of Object.entries(typo.fontWeight))
              props.push(`--font-weight-${k}:${v}`);
          if (typo.lineHeight)
            for (const [k, v] of Object.entries(typo.lineHeight))
              props.push(`--line-height-${k}:${v}`);
        }
        const radius = theme.radius as Record<string, string> | undefined;
        if (radius) {
          for (const [k, v] of Object.entries(radius))
            props.push(`--radius-${k}:${v}`);
        }
        const transitions = theme.transitions as
          | {
              duration?: Record<string, string>;
              timing?: Record<string, string>;
            }
          | undefined;
        if (transitions) {
          if (transitions.duration)
            for (const [k, v] of Object.entries(transitions.duration))
              props.push(`--duration-${k}:${v}`);
          if (transitions.timing)
            for (const [k, v] of Object.entries(transitions.timing))
              props.push(`--${camelToKebab(k)}:${v}`);
        }
        const zIndex = theme.zIndex as Record<string, number> | undefined;
        if (zIndex) {
          for (const [k, v] of Object.entries(zIndex))
            props.push(`--z-${camelToKebab(k)}:${v}`);
        }
        // Shadows from shadowDefinitions
        const shadowDefs = theme.shadowDefinitions as
          | Record<
              string,
              Array<{
                x: number;
                y: number;
                blur: number;
                spread: number;
                color: string;
                opacity: number;
                inset?: boolean;
              }>
            >
          | undefined;
        if (shadowDefs) {
          for (const [k, layers] of Object.entries(shadowDefs)) {
            const css = layers
              .map(l => {
                const inset = l.inset ? 'inset ' : '';
                const px = (n: number) => (n === 0 ? '0' : `${n}px`);
                const hex = l.color.replace('#', '');
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                return `${inset}${px(l.x)} ${px(l.y)} ${px(l.blur)} ${px(l.spread)} rgba(${r},${g},${b},${l.opacity})`;
              })
              .join(',');
            props.push(`--shadow-${k}:${css}`);
          }
          props.push('--shadow-none:none');
        }
        return props.join(';');
      }

      const lightCSS = light
        ? `:root{color-scheme:light;${themeToCSS(light as Record<string, unknown>)}}`
        : '';
      const darkCSS = dark
        ? `@media(prefers-color-scheme:dark){:root{color-scheme:dark;${themeToCSS(dark as Record<string, unknown>)}}}`
        : '';
      // Use @layer gt-theme so overrides always beat gt-defaults regardless of load order
      const themeCSS =
        '/* Generated by @grundtone/nuxt — theme overrides */\n@layer gt-theme{\n' +
        lightCSS +
        '\n' +
        darkCSS +
        '\n}';

      // Write theme CSS (cacheDir already created above)
      const themeCSSPath = join(cacheDir, 'theme.css');
      writeFileSync(themeCSSPath, themeCSS);
      nuxt.options.css.push(themeCSSPath);
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
          'See: https://github.com/grundtone/grundtone#theme-configuration',
      );
    }
  },
}) as NuxtModule<ModuleOptions>;
