import type { ReactNode } from 'react';

export type AccordionVariant = 'default' | 'bordered' | 'card';

export interface AccordionProps {
  /** Visual variant */
  variant?: AccordionVariant;
  /** Show "Show all / Hide all" toggle button */
  showToggleAll?: boolean;
  /** Label for "show all" state */
  toggleAllLabelOpen?: string;
  /** Label for "hide all" state */
  toggleAllLabelClose?: string;
  /** Accessible label */
  accessibilityLabel?: string;
  /** AccordionItem children */
  children: ReactNode;
}

export interface AccordionItemProps {
  /** Section heading text */
  heading: string;
  /** Optional short summary */
  summary?: string;
  /** Start open */
  open?: boolean;
  /** Hidden content */
  children: ReactNode;
}
