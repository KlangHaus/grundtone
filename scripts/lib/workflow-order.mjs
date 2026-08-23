/**
 * Kontrollerer at en gate står FØR det trin, den skal beskytte.
 *
 * 🔴 Hvorfor det skal måles og ikke bare læses: en gate, der står efter det
 * uigenkaldelige trin, ser ud som en gate i enhver diff, i enhver oversigt over
 * workflow-trin og i enhver grøn kørsel. Den eneste forskel er rækkefølgen —
 * og rækkefølge er dét, en refaktorering flytter uden at nogen opdager det.
 *
 * Bruges til at bevise, at nedgraderings-vagten dækker udgivelsesstien, FØR
 * frozen-2.x-guarden pensioneres. Der må ikke findes et vindue, hvor hverken
 * den ene eller den anden er aktiv.
 */

/** Tegn-positionen for første forekomst, eller -1. */
function positionOf(text, marker) {
  return text.indexOf(marker);
}

/**
 * @returns {{ok: boolean, reason: string}} — `ok` kun når BEGGE findes og
 * gaten står først. Mangler en af dem, er svaret NEJ og ikke "ingen problemer":
 * en manglende gate er den værste af de tre tilstande, ikke den mest neutrale.
 */
export function gateRunsBeforePublish(workflow, { gate, publish }) {
  const g = positionOf(workflow, gate);
  const p = positionOf(workflow, publish);

  if (g === -1 && p === -1) return { ok: false, reason: 'hverken gate eller publish-trin fundet' };
  if (g === -1) return { ok: false, reason: `gaten (${gate}) findes ikke i workflowen` };
  if (p === -1) return { ok: false, reason: `publish-trinnet (${publish}) findes ikke i workflowen` };
  if (g > p) return { ok: false, reason: 'gaten står EFTER publish-trinnet — den beskytter intet' };
  return { ok: true, reason: 'gaten står før publish-trinnet' };
}
