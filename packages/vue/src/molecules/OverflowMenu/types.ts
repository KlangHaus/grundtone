export interface OverflowMenuItem {
  /** Display label */
  label: string;
  /** Value (emitted on select) */
  value?: string;
  /** Link href (renders as <a>) */
  href?: string;
  /** Destructive action styling */
  danger?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Active/checked state (for sort menus) */
  active?: boolean;
}

export interface OverflowMenuProps {
  /** Menu items */
  items: OverflowMenuItem[];
  /** Trigger label text (optional — icon-only by default) */
  label?: string;
  /** Panel alignment relative to trigger */
  align?: 'left' | 'right';
  /** Accessible label for the trigger */
  ariaLabel?: string;
}
