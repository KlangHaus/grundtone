export type SummaryListVariant = 'default' | 'borderless' | 'card';

export interface SummaryListProps {
  /** Visual variant */
  variant?: SummaryListVariant;
  /** Card title (only used with variant="card") */
  title?: string;
  /** Heading level for card title */
  titleTag?: 'h2' | 'h3' | 'h4';
}

export interface SummaryItemProps {
  /** Key/label for this row */
  label: string;
  /** Action link text (e.g. "Change", "Remove") */
  action?: string;
  /** Visually hidden suffix for action link accessibility (e.g. "name") */
  actionLabel?: string;
}
