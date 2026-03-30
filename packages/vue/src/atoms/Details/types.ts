export type DetailsVariant = 'default' | 'subtle' | 'card';

export interface DetailsProps {
  /** Visible summary text (the clickable trigger) */
  summary: string;
  /** Visual variant */
  variant?: DetailsVariant;
  /** Start in open state */
  open?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}
