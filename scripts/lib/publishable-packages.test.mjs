import { describe, it, expect } from 'vitest';

import { publishablePackages } from './publishable-packages.mjs';

/** Minimal fs-stub: en mappe -> indholdet af dens package.json. */
function fakeFs(tree) {
  return {
    readdirSync: () =>
      Object.keys(tree).map(name => ({ name, isDirectory: () => true })),
    readFileSync: path => {
      const dir = path.split('/').at(-2);
      const content = tree[dir];
      if (content === undefined) throw new Error('ENOENT');
      return content;
    },
  };
}

const pkg = (name, version, extra = {}) =>
  JSON.stringify({ name, version, ...extra });

describe('publishablePackages', () => {
  it('finder alle pakker der kan udgives, sorteret', () => {
    const fs = fakeFs({
      vue: pkg('@grundtone/vue', '2.24.0'),
      core: pkg('@grundtone/core', '2.23.0'),
    });

    expect(publishablePackages('/repo', fs)).toEqual([
      { name: '@grundtone/core', version: '2.23.0', dir: 'core' },
      { name: '@grundtone/vue', version: '2.24.0', dir: 'vue' },
    ]);
  });

  it('udelader private pakker — npm nægter alligevel at udgive dem', () => {
    const fs = fakeFs({
      vue: pkg('@grundtone/vue', '2.24.0'),
      docs: pkg('@grundtone/docs', '1.0.0', { private: true }),
    });

    expect(publishablePackages('/repo', fs).map(p => p.dir)).toEqual(['vue']);
  });

  // 🔴 react-native og email hører til her, netop fordi de står uden for
  // next-kanalens håndholdte liste. Opdagelsen er hele pointen: en pakke er
  // med, fordi den ligger i repoet, ikke fordi nogen huskede at skrive den på.
  it('medtager pakker der står uden for next-kanalens liste', () => {
    const fs = fakeFs({
      vue: pkg('@grundtone/vue', '2.24.0'),
      'react-native': pkg('@grundtone/react-native', '2.12.0'),
      email: pkg('@grundtone/email', '0.3.0'),
    });

    expect(publishablePackages('/repo', fs).map(p => p.name)).toEqual([
      '@grundtone/email',
      '@grundtone/react-native',
      '@grundtone/vue',
    ]);
  });

  it('springer mapper uden læsbar package.json over', () => {
    const fs = fakeFs({
      vue: pkg('@grundtone/vue', '2.24.0'),
      scratch: '{ ikke json',
      nameless: JSON.stringify({ version: '1.0.0' }),
      versionless: JSON.stringify({ name: '@grundtone/x' }),
    });

    expect(publishablePackages('/repo', fs).map(p => p.dir)).toEqual(['vue']);
  });

  // Tom liste maa aldrig laese som "ingen problemer": kaldsstedet
  // (assert-no-downgrade-publish.mjs) fejler paa den, frem for at melde groent
  // uden at have maalt noget.
  it('returnerer tom liste når packages/ ikke kan læses', () => {
    expect(
      publishablePackages('/repo', {
        readdirSync: () => {
          throw new Error('ENOENT');
        },
        readFileSync: () => '',
      }),
    ).toEqual([]);
  });
});
