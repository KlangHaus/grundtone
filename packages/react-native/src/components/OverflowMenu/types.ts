export interface OverflowMenuItem {
  label: string;
  value?: string;
  danger?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export interface OverflowMenuProps {
  items: OverflowMenuItem[];
  label?: string;
  onSelect?: (item: OverflowMenuItem) => void;
  accessibilityLabel?: string;
}
