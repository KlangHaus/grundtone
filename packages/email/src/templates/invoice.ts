import { defineTemplate } from '../template';

/**
 * Invoice / receipt (faktura) with line items.
 * Variables: `name`, `invoiceNumber`, `items` (array of
 * `{ description, quantity, amount }`), `total`, `payUrl`.
 */
export const invoice = defineTemplate({
  key: 'invoice',
  variables: ['name', 'invoiceNumber', 'items', 'total', 'payUrl'],
  locales: {
    da: {
      subject: 'Faktura {{invoiceNumber}} fra Grundtone',
      preheader: 'Din faktura {{invoiceNumber}} er klar.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Faktura {{invoiceNumber}}' }),
          b.text({ text: 'Hej {{name}}, her er din faktura.', size: 'lead' }),
          b.invoiceTable({
            each: 'items',
            columns: [
              { header: 'Beskrivelse', cell: '{{this.description}}' },
              { header: 'Antal', cell: '{{this.quantity}}', align: 'right' },
              { header: 'Beløb', cell: '{{this.amount}}', align: 'right' },
            ],
            total: { label: 'Total', value: '{{total}}' },
          }),
          b.button({ label: 'Betal nu', href: '{{payUrl}}' }),
        ].join('\n'),
        footer: b.footer({
          text: 'Grundtone ApS · CVR 12345678 · København, Danmark',
        }),
      }),
      // Tables don't auto-derive into readable plain text, so author it.
      text: [
        'Faktura {{invoiceNumber}}',
        '',
        'Hej {{name}}, her er din faktura.',
        '',
        '{{#each items}}- {{this.description}} (x{{this.quantity}}): {{this.amount}}',
        '{{/each}}Total: {{total}}',
        '',
        'Betal: {{payUrl}}',
        '',
        'Grundtone ApS · CVR 12345678 · København, Danmark',
      ].join('\n'),
    },
    en: {
      subject: 'Invoice {{invoiceNumber}} from Grundtone',
      preheader: 'Your invoice {{invoiceNumber}} is ready.',
      build: (b) => ({
        content: [
          b.heading({ text: 'Invoice {{invoiceNumber}}' }),
          b.text({ text: 'Hi {{name}}, here is your invoice.', size: 'lead' }),
          b.invoiceTable({
            each: 'items',
            columns: [
              { header: 'Description', cell: '{{this.description}}' },
              { header: 'Qty', cell: '{{this.quantity}}', align: 'right' },
              { header: 'Amount', cell: '{{this.amount}}', align: 'right' },
            ],
            total: { label: 'Total', value: '{{total}}' },
          }),
          b.button({ label: 'Pay now', href: '{{payUrl}}' }),
        ].join('\n'),
        footer: b.footer({
          text: 'Grundtone ApS · VAT 12345678 · Copenhagen, Denmark',
        }),
      }),
      // Tables don't auto-derive into readable plain text, so author it.
      text: [
        'Invoice {{invoiceNumber}}',
        '',
        'Hi {{name}}, here is your invoice.',
        '',
        '{{#each items}}- {{this.description}} (x{{this.quantity}}): {{this.amount}}',
        '{{/each}}Total: {{total}}',
        '',
        'Pay: {{payUrl}}',
        '',
        'Grundtone ApS · VAT 12345678 · Copenhagen, Denmark',
      ].join('\n'),
    },
  },
});
