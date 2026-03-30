// vue-preset.ts
import { Options } from 'tsup';
import * as fs from 'fs';

interface VuePresetOptions {
  entry: string[];
  clean?: boolean;
  sourcemap?: boolean | 'inline';
  format?: Array<'cjs' | 'esm' | 'iife'>;
  external?: string[];
}

export function vuePreset(options: VuePresetOptions): Options {
  return {
    entry: options.entry,
    clean: options.clean ?? true,
    sourcemap: options.sourcemap ?? true,
    format: options.format ?? ['esm', 'cjs'],
    external: [...(options.external ?? []), 'vue'],
    esbuildPlugins: [
      {
        name: 'vue-files',
        setup(build) {
          // Håndter .vue filer
          build.onLoad({ filter: /\.vue$/ }, async args => {
            const source = fs.readFileSync(args.path, 'utf8');
            // Her ville vi normalt bruge vue-compiler, men for
            // en simpel implementation gør vi følgende:
            return {
              contents: `
                import { defineComponent } from 'vue'
                export default defineComponent({
                  template: ${JSON.stringify(source)}
                })
              `,
              loader: 'js',
            };
          });
        },
      },
    ],
    // Flere options der er nyttige til Vue-biblioteker
    esbuildOptions(options) {
      options.banner = {
        js: `/**\n * Vue Component Library\n * @license MIT\n */`,
      };
      return options;
    },
  };
}
