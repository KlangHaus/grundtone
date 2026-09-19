// @vitest-environment node
//
// 🔴 node, not the root config's jsdom: this file reads package manifests from
// disk through `import.meta.url`, and under jsdom that is an http URL
// (measured — CI went red here while the package-level run, which defaults to
// node, was green).
import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// The defect this pins (riff zh3ayeik): registering components or composables
// from `../../vue/src` gives a consumer a SECOND copy of every module-level
// state — and, since 3.x stopped publishing src, a path that is not installed
// at all. Everything must come from the package entry.

interface Registered {
  name: string;
  from: string;
}

const components: Registered[] = [];
const imports: Registered[] = [];
const dirCalls: string[] = [];

vi.mock('@nuxt/kit', () => ({
  // Enough of defineNuxtModule to call setup with the module's own defaults.
  defineNuxtModule:
    (def: {
      defaults?: Record<string, unknown>;
      setup: (o: unknown, n: unknown) => unknown;
    }) =>
    (options: Record<string, unknown>, nuxt: unknown) =>
      def.setup({ ...def.defaults, ...options }, nuxt),
  addComponent: (c: { name: string; export: string; filePath: string }) =>
    components.push({ name: c.name, from: c.filePath }),
  addImports: (list: { name: string; from: string }[]) => imports.push(...list),
  // If the module ever goes back to directory scanning, these record it
  // instead of throwing — the assertion below names the defect.
  addComponentsDir: (c: { path: string }) => dirCalls.push(c.path),
  addImportsDir: (path: string) => dirCalls.push(path),
  createResolver: () => ({
    resolve: (...parts: string[]) =>
      new URL(parts.join('/'), import.meta.url).pathname,
  }),
}));

const module = (await import('./module')).default as unknown as (
  o: unknown,
  n: unknown,
) => Promise<void>;

function fakeNuxt() {
  return {
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

beforeEach(() => {
  components.length = 0;
  imports.length = 0;
  dirCalls.length = 0;
});

describe('everything is registered from the package entry', () => {
  it('registers components and composables, so the check has a denominator', async () => {
    await module({}, fakeNuxt());
    expect(components.length).toBeGreaterThan(50);
    expect(imports.length).toBeGreaterThan(5);
  });

  it('never scans a directory inside @grundtone/vue', async () => {
    await module({}, fakeNuxt());
    expect(dirCalls).toEqual([]);
    for (const entry of [...components, ...imports]) {
      expect(entry.from, entry.name).not.toMatch(/vue[/\\]src/);
    }
  });

  it('takes components and composables from @grundtone/vue itself', async () => {
    await module({}, fakeNuxt());
    expect([...new Set(components.map(c => c.from))]).toEqual([
      '@grundtone/vue',
    ]);
    const composableSources = imports
      .filter(i => i.name.startsWith('use') || i.name.startsWith('GT'))
      .map(i => i.from);
    expect([...new Set(composableSources)]).toEqual(['@grundtone/vue']);
  });

  // 🔴 The cell that would have caught 3.1.0: @grundtone/vue publishes only
  // `dist` and `scss` (measured on the tarball), so anything the module points
  // at must be reachable through that package's own export map. `../../vue/src`
  // was not, and a consumer install then had no components at all.
  it('points only at specifiers the owning package publishes', async () => {
    await module({}, fakeNuxt());
    // Workspace directory per package name — the module may legitimately point
    // at a sibling package (the validators come from @grundtone/utils).
    const DIRS: Record<string, string> = {
      '@grundtone/vue': '../../vue',
      '@grundtone/utils': '../../utils',
    };

    const registered = [...components, ...imports];
    expect(registered.length).toBeGreaterThan(50);
    for (const entry of registered) {
      const [scope, name, ...rest] = entry.from.split('/');
      const pkgName = `${scope}/${name}`;
      const dir = DIRS[pkgName];
      expect(
        dir,
        `${entry.name} points at an unknown package: ${entry.from}`,
      ).toBeDefined();

      const pkg = JSON.parse(
        readFileSync(new URL(`${dir}/package.json`, import.meta.url), 'utf8'),
      ) as {
        exports?: Record<string, unknown>;
        module?: string;
        main?: string;
        files: string[];
      };

      // Packages differ: vue has an export map, utils still ships main/module.
      const subpath = rest.length ? `./${rest.join('/')}` : '.';
      let file: string | undefined;
      if (pkg.exports) {
        expect(
          Object.keys(pkg.exports).includes(subpath),
          `${entry.from} is not in ${pkgName}'s export map`,
        ).toBe(true);
        const target = pkg.exports[subpath];
        file =
          typeof target === 'string'
            ? target
            : (target as { import: string }).import;
      } else {
        expect(
          subpath,
          `${pkgName} has no export map, so only its root is usable`,
        ).toBe('.');
        file = pkg.module ?? pkg.main;
      }

      // …and the file that entry points at is inside a published directory.
      expect(file, `${pkgName} names no entry file`).toBeDefined();
      const published = pkg.files.map(f => f.replace(/\/\*\*$/, ''));
      expect(
        published.some(dirName => file!.startsWith(`./${dirName}/`)),
        `${file} is outside ${pkgName}'s published files (${pkg.files.join(', ')})`,
      ).toBe(true);
    }
  });

  it('honours a custom prefix without changing the export it points at', async () => {
    await module({ prefix: 'KH' }, fakeNuxt());
    const button = components.find(c => c.name === 'KHButton');
    expect(button).toBeDefined();
    expect(components.some(c => c.name.startsWith('GT'))).toBe(false);
  });
});
