import { defineTemplate } from '../template';

/**
 * Email-address verification after sign-up.
 * Variables: `url` (verification link), `name` (optional recipient name).
 */
export const verifyEmail = defineTemplate({
  key: 'verify-email',
  variables: ['url', 'name'],
  locales: {
    da: {
      subject: 'Bekræft din e-mail til Grundtone Studio',
      preheader: 'Bekræft din e-mailadresse for at komme i gang.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Velkommen{{#if name}} {{name}}{{/if}}' }),
          b.text({
            text: 'Bekræft din e-mailadresse for at aktivere din Grundtone Studio-konto.',
            size: 'lead',
          }),
          b.button({ label: 'Bekræft min e-mail', href: '{{url}}' }),
          b.infobox({
            tone: 'info',
            text: 'Linket udløber om 1 time. Hvis du ikke har oprettet en konto, kan du ignorere e-mailen.',
          }),
        ].join('\n'),
      }),
    },
    en: {
      subject: 'Verify your email for Grundtone Studio',
      preheader: 'Verify your email address to get started.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Welcome{{#if name}} {{name}}{{/if}}' }),
          b.text({
            text: 'Verify your email address to activate your Grundtone Studio account.',
            size: 'lead',
          }),
          b.button({ label: 'Verify my email', href: '{{url}}' }),
          b.infobox({
            tone: 'info',
            text: "The link expires in 1 hour. If you didn't create an account, ignore this email.",
          }),
        ].join('\n'),
      }),
    },
  },
});
