import { defineTemplate } from '../template';

/**
 * Invitation to join an organization.
 * Variables: `inviterName`, `orgName`, `acceptUrl`.
 */
export const orgInvite = defineTemplate({
  key: 'org-invite',
  variables: ['inviterName', 'orgName', 'acceptUrl'],
  locales: {
    da: {
      subject: 'Invitation til {{orgName}} på Grundtone Studio',
      preheader: '{{inviterName}} har inviteret dig til {{orgName}}.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Du er inviteret' }),
          b.text({
            text: '<strong>{{inviterName}}</strong> har inviteret dig til <strong>{{orgName}}</strong> på Grundtone Studio.',
            size: 'lead',
          }),
          b.button({ label: 'Accepter invitationen', href: '{{acceptUrl}}' }),
          b.text({
            text: 'Hvis du ikke forventede dette, kan du ignorere e-mailen.',
            size: 'small',
            muted: true,
          }),
        ].join('\n'),
      }),
    },
    en: {
      subject: 'Invitation to {{orgName}} on Grundtone Studio',
      preheader: '{{inviterName}} invited you to {{orgName}}.',
      build: (b) => ({
        content: [
          b.heading({ text: "You're invited" }),
          b.text({
            text: '<strong>{{inviterName}}</strong> invited you to <strong>{{orgName}}</strong> on Grundtone Studio.',
            size: 'lead',
          }),
          b.button({ label: 'Accept invitation', href: '{{acceptUrl}}' }),
          b.text({
            text: "If you didn't expect this, you can ignore this email.",
            size: 'small',
            muted: true,
          }),
        ].join('\n'),
      }),
    },
  },
});
