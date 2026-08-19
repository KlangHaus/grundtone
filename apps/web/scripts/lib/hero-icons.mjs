/**
 * Hero-ikonernes BESLUTNINGER — rene funktioner, ingen bivirkninger.
 *
 * 🔴 Grænsen mellem denne fil og vendor-hero-icons.mjs er selve gaten
 * ([quality] 554696a): `lib/**` er ALDRIG coverage-ekskluderet, mens
 * orkestreringslaget er det. Så en beslutning der sniger sig ud i scriptet
 * viser sig som et coverage-fald i stedet for at forsvinde i en undtagelse.
 * Flyt logik HERIND, aldrig den anden vej.
 */
import { createHash } from 'node:crypto';

export const SIZE = 720;
export const QUALITY = 90;
export const REPO = 'KlangHaus/public';
export const SRC_DIR = 'Grundtone logo/Iconic Mark/1x PNG';

// De SYV ikke-inverterede varianter. De inverterede er samme farvepar med
// figur/grund byttet — de ville fordoble loopet uden at tilføje information
// ([designer]s forlæg hero-icon-cycle.html).
export const VARIANTS = [
  'BlueGold',
  'BluePink',
  'BlueWhite',
  'BlackWhite',
  'GoldWhite',
  'PinkGold',
  'PinkWhite',
];

export const sha = buf =>
  createHash('sha256').update(buf).digest('hex').slice(0, 16);

/** Filnavn for en variant — ét sted, så script og manifest ikke kan drive fra hinanden. */
export const fileFor = name => `icon-${name.toLowerCase()}.webp`;

/**
 * Afgør pr. variant om den vendorede fil svarer til kilden. Ren funktion med
 * injicerede afhængigheder, så drift-beslutningen kan testes uden netværk og
 * uden filsystem — samme mønster som scripts/lib/npm-dist-tag.mjs.
 *
 * `encoded(name)` → den buffer kilden ville producere efter resize/WebP.
 * `existing(file)` → den vendorede fils indhold, eller null hvis den mangler.
 */
export function planFor(names, { encoded, existing }) {
  return names.map(name => {
    const file = fileFor(name);
    const want = sha(encoded(name));
    const have = existing(file);
    let status = 'drift';
    if (have === null) status = 'missing';
    else if (have === want) status = 'ok';
    return { name, file, status, want, have };
  });
}

/** Manifestets tekst — ren funktion, så formatet kan asserteres. */
export function renderManifest(rows, opts = {}) {
  const {
    repo = REPO,
    srcDir = SRC_DIR,
    size = SIZE,
    quality = QUALITY,
  } = opts;
  return [
    '# Vendorede hero-ikoner — kilde og sha',
    '',
    `Kilde: \`${repo}\` → \`${srcDir}/Icon-<variant>.png\` (1281x1281).`,
    `Nedskaleret til ${size}x${size} WebP q${quality} (2x for tile'ns 360 CSS-px)`,
    'af `apps/web/scripts/vendor-hero-icons.mjs` — se scriptets header for',
    'målingen der valgte formatet (en naiv PNG-nedskalering blev STØRRE end',
    'kilden).',
    '',
    '🔴 Vendoring fryser filer. Kør scriptet UDEN `--write` for at verificere at',
    'de stadig svarer til kilden; med `--write` for at opdatere dem og dette',
    'manifest. Ret aldrig filerne i hånden.',
    '',
    '| variant | kilde-sha | vendoret sha | KB |',
    '| --- | --- | --- | --- |',
    ...rows.map(r => `| ${r.name} | ${r.srcSha} | ${r.outSha} | ${r.kb} |`),
    '',
    `Samlet: ${rows.reduce((n, r) => n + r.kb, 0)} KB for ${rows.length} billeder.`,
    '',
  ].join('\n');
}

export async function fetchSource(name, fetchImpl = fetch) {
  const path = encodeURI(`${SRC_DIR}/Icon-${name}.png`);
  const api = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const res = await fetchImpl(api, {
    headers: {
      Accept: 'application/vnd.github.raw',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(
      `${name}: ${res.status} ${res.statusText} — er repoet privat? sæt GITHUB_TOKEN`,
    );
  }
  return Buffer.from(await res.arrayBuffer());
}
