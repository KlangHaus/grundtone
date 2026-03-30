export type AccordionVariant = 'default' | 'bordered' | 'card';
export type AccordionTransition = 'none' | 'slide' | 'fade';

export interface AccordionProps {
  /** Visual variant */
  variant?: AccordionVariant;
  /** Panel open/close transition */
  transition?: AccordionTransition;
  /** Show "Show all / Hide all" toggle button */
  showToggleAll?: boolean;
  /** Label for "show all" state */
  toggleAllLabelOpen?: string;
  /** Label for "hide all" state */
  toggleAllLabelClose?: string;
  /** Accessible label for the accordion region */
  ariaLabel?: string;
}

export interface AccordionItemProps {
  /** Section heading text (required) */
  heading: string;
  /** Optional short summary under the heading */
  summary?: string;
  /** Start in open state */
  open?: boolean;
  /** Heading element level */
  headingLevel?: 2 | 3 | 4;
}
