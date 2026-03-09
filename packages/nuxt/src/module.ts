import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
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
   * @default 'Grundtone'
   */
  prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@grundtone/nuxt',
    configKey: 'grundtone',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    components: true,
    composables: true,
    prefix: 'Grundtone',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Auto-import components
    if (options.components) {
      addComponentsDir({
        path: resolver.resolve('../../vue/src/atoms'),
        pathPrefix: false,
        prefix: options.prefix,
        extensions: ['.vue'],
        pattern: '**/*.vue',
      });

      addComponentsDir({
        path: resolver.resolve('../../vue/src/molecules'),
        pathPrefix: false,
        prefix: options.prefix,
        extensions: ['.vue'],
        pattern: '**/*.vue',
      });

      addComponentsDir({
        path: resolver.resolve('../../vue/src/organisms'),
        pathPrefix: false,
        prefix: options.prefix,
        extensions: ['.vue'],
        pattern: '**/*.vue',
      });
    }

    // Auto-import composables
    if (options.composables) {
      addImportsDir(resolver.resolve('../../composables/src'));
    }

    // Expose module options to runtime
    nuxt.options.runtimeConfig.public.grundtone = {
      theme: options.theme,
      components: options.components ?? true,
      composables: options.composables ?? true,
      prefix: options.prefix ?? 'Grundtone',
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
