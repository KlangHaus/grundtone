import { defineTemplate } from '../template';

/**
 * VAT number failed VIES verification (Stripe tax-id webhook
 * `verification.status=unverified` on a B2B subscription). Sent ONCE per
 * failed verification — dedup is the send API's idempotency key
 * (`vies-failed-<stripe-verification-id>`), not template mechanics.
 *
 * Copy is the designer forlæg
 * (docs/design/grundtone-studio/prototypes/vies-verification-failed-email.md),
 * ruling-conform per ToS §5.5 (jura 2026-08-02): explicit 14-day window,
 * timely fix = no back-billing at all; only on expiry does a credit note +
 * corrected invoice with Danish VAT follow. Tone: no alarm — "subscription
 * unchanged active" leads before any ask (cmo-reglen: fremdrift, ikke skyld).
 *
 * Variables: `fornavn`, `momsnummer`, `plan_navn`, `org_slug`.
 */
export const viesVerificationFailed = defineTemplate({
  key: 'vies-verification-failed',
  variables: ['fornavn', 'momsnummer', 'plan_navn', 'org_slug'],
  locales: {
    da: {
      subject: 'Vi kunne ikke bekræfte dit momsnummer',
      preheader: 'Dit abonnement er uændret aktivt — du har 14 dage til at rette nummeret.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Vi kunne ikke bekræfte dit momsnummer' }),
          b.text({
            text: 'Hej {{fornavn}},',
            size: 'lead',
          }),
          b.text({
            text: 'Vi forsøgte at bekræfte momsnummeret {{momsnummer}} hos VIES (EU’s momsregister) til dit {{plan_navn}}-abonnement — men fik det ikke bekræftet.',
          }),
          b.text({
            text: 'Ingen grund til bekymring: dit abonnement er uændret aktivt.',
          }),
          b.text({
            text: 'Du har 14 dage til at rette momsnummeret, hvis det er indtastet forkert eller for nyt til at stå i VIES endnu — retter du det i tide, fortsætter momsfritagelsen som normalt, uden efteropkrævning.',
          }),
          b.button({
            label: 'Ret momsnummer',
            href: 'https://studio.grundtone.com/orgs/{{org_slug}}/billing',
          }),
          b.text({
            text: 'Sker det ikke inden fristen, udsteder vi en kreditnota og en korrigeret faktura med dansk moms for perioden.',
          }),
          b.text({
            text: 'Har du spørgsmål, er du velkommen til at svare direkte på denne mail.',
          }),
        ].join('\n'),
        footer: b.footer({ text: '— grundtone Studio' }),
      }),
      text: [
        'Hej {{fornavn}},',
        '',
        'Vi forsøgte at bekræfte momsnummeret {{momsnummer}} hos VIES (EU’s momsregister) til',
        'dit {{plan_navn}}-abonnement — men fik det ikke bekræftet.',
        '',
        'Ingen grund til bekymring: dit abonnement er uændret aktivt.',
        '',
        'Du har 14 dage til at rette momsnummeret, hvis det er indtastet forkert eller for',
        'nyt til at stå i VIES endnu — retter du det i tide, fortsætter momsfritagelsen som',
        'normalt, uden efteropkrævning.',
        'Ret momsnummer: https://studio.grundtone.com/orgs/{{org_slug}}/billing',
        '',
        'Sker det ikke inden fristen, udsteder vi en kreditnota og en korrigeret faktura med',
        'dansk moms for perioden.',
        '',
        'Har du spørgsmål, er du velkommen til at svare direkte på denne mail.',
        '',
        '— grundtone Studio',
      ].join('\n'),
    },
    en: {
      // Faithful translation of the locked da copy — cmo may tone-adjust; the
      // da locale is the ruling-conform original.
      subject: 'We could not verify your VAT number',
      preheader: 'Your subscription is unchanged and active — you have 14 days to correct the number.',
      build: (b) => ({
        content: [
          b.heading({ text: 'We could not verify your VAT number' }),
          b.text({
            text: 'Hi {{fornavn}},',
            size: 'lead',
          }),
          b.text({
            text: 'We tried to verify the VAT number {{momsnummer}} with VIES (the EU’s VAT register) for your {{plan_navn}} subscription — but could not get it confirmed.',
          }),
          b.text({
            text: 'No cause for concern: your subscription is unchanged and active.',
          }),
          b.text({
            text: 'You have 14 days to correct the VAT number if it was mistyped or is too new to appear in VIES yet — fix it in time and the VAT exemption continues as normal, with no back-billing.',
          }),
          b.button({
            label: 'Correct VAT number',
            href: 'https://studio.grundtone.com/orgs/{{org_slug}}/billing',
          }),
          b.text({
            text: 'If it is not corrected within the deadline, we issue a credit note and a corrected invoice with Danish VAT for the period.',
          }),
          b.text({
            text: 'If you have any questions, feel free to reply directly to this email.',
          }),
        ].join('\n'),
        footer: b.footer({ text: '— grundtone Studio' }),
      }),
      text: [
        'Hi {{fornavn}},',
        '',
        'We tried to verify the VAT number {{momsnummer}} with VIES (the EU’s VAT register)',
        'for your {{plan_navn}} subscription — but could not get it confirmed.',
        '',
        'No cause for concern: your subscription is unchanged and active.',
        '',
        'You have 14 days to correct the VAT number if it was mistyped or is too new to',
        'appear in VIES yet — fix it in time and the VAT exemption continues as normal,',
        'with no back-billing.',
        'Correct VAT number: https://studio.grundtone.com/orgs/{{org_slug}}/billing',
        '',
        'If it is not corrected within the deadline, we issue a credit note and a corrected',
        'invoice with Danish VAT for the period.',
        '',
        'If you have any questions, feel free to reply directly to this email.',
        '',
        '— grundtone Studio',
      ].join('\n'),
    },
  },
});
