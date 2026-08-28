import { describe, it, expect } from 'vitest';

import {
  changesetIgnored,
  publishablePackages,
  workspacePackageNames,
} from './publishable-packages.mjs';

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

// 🔴 Fundet 2026-08-23: gaten spurgte "kan NOGEN pakke i repoet gaa baglaens"
// og blev meldt som svar paa "kan noget i DENNE udgivelse gaa baglaens". De to
// er ikke det samme, og forskellen gjorde udgivelsesstien permanent roed paa en
// pakke, der aldrig ville blive udgivet.
describe('changesets ignore', () => {
  it('markerer en ignoreret pakke frem for at udelade den', () => {
    const fs = fakeFs({
      vue: pkg('@grundtone/vue', '2.24.0'),
      'react-native': pkg('@grundtone/react-native', '2.12.0'),
    });

    const result = publishablePackages('/repo', fs, {
      ignore: ['@grundtone/react-native'],
    });

    // Stadig i listen — kaldsstedet skal kunne RAPPORTERE den, ikke tabe den.
    expect(result.map(p => p.name)).toEqual([
      '@grundtone/react-native',
      '@grundtone/vue',
    ]);
    expect(result.find(p => p.name === '@grundtone/react-native').ignored).toBe(
      true,
    );
    expect(
      result.find(p => p.name === '@grundtone/vue').ignored,
    ).toBeUndefined();
  });

  it('uden ignore er ingen markeret', () => {
    const fs = fakeFs({ vue: pkg('@grundtone/vue', '2.24.0') });

    expect(publishablePackages('/repo', fs)[0].ignored).toBeUndefined();
  });
});

describe('changesetIgnored', () => {
  const cfg = body => ({
    readdirSync: () => [],
    readFileSync: () => body,
  });

  it('læser listen fra changesets EGEN config', () => {
    expect(
      changesetIgnored('/repo', cfg('{"ignore":["@grundtone/react-native"]}')),
    ).toEqual(['@grundtone/react-native']);
  });

  // To lister over det samme kan blive uenige, og uenigheden ville foerst vise
  // sig ved en udgivelse — derfor laeses changesets' egen frem for en kopi.
  it('giver tom liste når configen mangler eller er ulæselig', () => {
    expect(changesetIgnored('/repo', cfg('{ ikke json'))).toEqual([]);
    expect(changesetIgnored('/repo', cfg('{}'))).toEqual([]);
    expect(
      changesetIgnored('/repo', {
        readdirSync: () => [],
        readFileSync: () => {
          throw new Error('ENOENT');
        },
      }),
    ).toEqual([]);
  });

  it('ignorerer et ignore-felt der ikke er en liste', () => {
    expect(changesetIgnored('/repo', cfg('{"ignore":"nej"}'))).toEqual([]);
  });
});

describe('workspacePackageNames', () => {
  const fs = tree => ({
    readdirSync: dir =>
      dir.endsWith('packages')
        ? [{ name: 'vue', isDirectory: () => true }]
        : [{ name: 'web', isDirectory: () => true }],
    readFileSync: path => {
      const dir = path.split('/').at(-2);
      if (tree[dir] === undefined) throw new Error('ENOENT');
      return tree[dir];
    },
  });

  it('samler navne fra både packages/ og apps/', () => {
    const names = workspacePackageNames(
      '/repo',
      fs({
        vue: pkg('@grundtone/vue', '2.24.0'),
        web: pkg('@grundtone/web', '1.0.0'),
      }),
    );

    expect([...names].sort()).toEqual(['@grundtone/vue', '@grundtone/web']);
  });

  // 🔴 Det, assertionen findes for: et navn i changesets' ignore, som ikke
  // peger på noget, betyder at changesets versionerer pakken alligevel.
  it('afslører et navn der ikke matcher nogen pakke', () => {
    const names = workspacePackageNames(
      '/repo',
      fs({
        vue: pkg('@grundtone/vue', '2.24.0'),
        web: pkg('@grundtone/web', '1.0.0'),
      }),
    );

    expect(names.has('@grundtone/react-nativ')).toBe(false);
  });

  it('tåler at en mappe ikke findes', () => {
    expect(
      workspacePackageNames('/repo', {
        readdirSync: () => {
          throw new Error('ENOENT');
        },
        readFileSync: () => '',
      }).size,
    ).toBe(0);
  });
});
