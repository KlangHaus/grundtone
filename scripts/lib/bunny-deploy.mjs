/**
 * Om et Bunny-publish skal deploye, springe over eller fejle — og om et
 * "vellykket" deploy faktisk flyttede noget.
 *
 * 🔴 HVORFOR DET HER FINDES (riff ua771kpb/KH-1008, målt igen 2026-09-19).
 * Begge publish-scripts gjorde "secret mangler" til `exit 0` med en advarsel.
 * Det så rimeligt ud, mens zonerne ikke var provisioneret — men det gør et
 * deploy-job til et job, der ikke KAN fejle. Målt i release-kørsel
 * 35459568087 (develop `c7baa0b`, 17:56Z): `BUNNY_DOCS_STORAGE_ZONE` og
 * `BUNNY_DOCS_STORAGE_API_KEY` var TOMME, scriptet skrev "skipping deploy",
 * trinnet blev **success**, og docs-sitet blev ikke udgivet. Hullet stod
 * åbent, fra secretsene flyttede til environments, til nogen læste loggen.
 *
 * Et FRAVÆR kan ikke bære en beslutning. Springes der over, skal det være,
 * fordi nogen HAR erklæret det — ikke fordi en værdi manglede.
 */

/** Navnet på det opt-in, der gør et manglende secret til et lovligt skip. */
export const OPT_IN = 'BUNNY_DEPLOY_OPTIONAL';

/**
 * @param {object} input
 * @param {{name: string, value: string|undefined}[]} input.required
 *   Påkrævede secrets som NAVN + værdi. Kun navnene når nogensinde ud i en log.
 * @param {string|undefined} input.optional  værdien af BUNNY_DEPLOY_OPTIONAL
 * @param {string} input.label               scriptets navn, til beskeder
 * @returns {{mode: 'deploy'|'skip'|'fail', reason: string, missing: string[]}}
 */
export function resolveDeployMode({ required, optional, label }) {
  // 🔴 `.trim()` og ikke bare falsy: dét, der faktisk skete, var `gh secret set`
  // med en tom udklipsholder. '' er falsy, men ' ' er sand — en enkelt
  // mellemrumstast ville ellers blive læst som en gyldig nøgle og sendt afsted.
  const missing = required.filter(s => !s.value?.trim()).map(s => s.name);

  if (missing.length === 0) {
    return {
      mode: 'deploy',
      reason: `${label}: alle påkrævede secrets er sat`,
      missing,
    };
  }
  if (optional?.trim() === '1') {
    return {
      mode: 'skip',
      reason:
        `${label}: ${OPT_IN}=1, og ${missing.join(' + ')} mangler — springer over, ` +
        'fordi nogen har erklæret det, ikke fordi værdien var væk',
      missing,
    };
  }
  return {
    mode: 'fail',
    reason:
      `${label}: ${missing.join(' + ')} er tom(me) eller usat(te). Dette job findes for at ` +
      'deploye, så et manglende secret er en fejl, ikke et skip. Sæt dem i det environment, ' +
      `jobbet erklærer, eller sæt ${OPT_IN}=1 for bevidst at springe over.`,
    missing,
  };
}

/**
 * 🔴 Et upload-loop, der ikke fandt nogen filer, ender også på "færdig".
 * Antallet er den eneste forskel mellem "udgav intet" og "udgav noget".
 *
 * @param {number} uploaded
 * @param {string} label
 * @returns {{ok: boolean, reason: string}}
 */
export function checkUploaded(uploaded, label) {
  if (uploaded > 0) {
    return { ok: true, reason: `${label}: ${uploaded} fil(er) uploadet` };
  }
  return {
    ok: false,
    reason:
      `${label}: 0 filer uploadet. Et deploy uden filer er ikke et deploy — enten var ` +
      'build-outputtet tomt, eller stien peger et andet sted hen end der, hvor buildet lagde det.',
  };
}
