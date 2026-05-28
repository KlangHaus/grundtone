import { defineTemplate } from '../template';

/**
 * Passwordless sign-in link.
 * Variables: `url` (the magic link).
 */
export const magicLink = defineTemplate({
  key: 'magic-link',
  variables: ['url'],
  locales: {
    da: {
      subject: 'Log ind på Grundtone Studio',
      preheader: 'Dit log ind-link er klar.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Log ind' }),
          b.text({
            text: 'Klik på knappen nedenfor for at logge ind på Grundtone Studio.',
            size: 'lead',
          }),
          b.button({ label: 'Log ind', href: '{{url}}' }),
          b.text({
            text: 'Hvis du ikke har anmodet om dette, kan du roligt ignorere e-mailen.',
            size: 'small',
            muted: true,
          }),
        ].join('\n'),
      }),
    },
    en: {
      subject: 'Sign in to Grundtone Studio',
      preheader: 'Your sign-in link is ready.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Sign in' }),
          b.text({
            text: 'Click the button below to sign in to Grundtone Studio.',
            size: 'lead',
          }),
          b.button({ label: 'Sign in', href: '{{url}}' }),
          b.text({
            text: "If you didn't request this, you can safely ignore this email.",
            size: 'small',
            muted: true,
          }),
        ].join('\n'),
      }),
    },
  },
});
