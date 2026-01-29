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
   * @default 'Haspen'
   */
  prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@ipeeon/nuxt',
    configKey: 'haspen',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    components: true,
    composables: true,
    prefix: 'Haspen',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Auto-import components
    if (options.components) {
      addComponentsDir({
        path: resolver.resolve('../../ui/src/atoms'),
        pathPrefix: false,
        prefix: options.prefix,
        extensions: ['.vue'],
        pattern: '**/*.vue',
      });

      addComponentsDir({
        path: resolver.resolve('../../ui/src/molecules'),
        pathPrefix: false,
        prefix: options.prefix,
        extensions: ['.vue'],
        pattern: '**/*.vue',
      });

      addComponentsDir({
        path: resolver.resolve('../../ui/src/organisms'),
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
    nuxt.options.runtimeConfig.public.haspen = {
      components: options.components ?? true,
      composables: options.composables ?? true,
      prefix: options.prefix ?? 'Haspen',
    };
  },
}) as NuxtModule<ModuleOptions>;
