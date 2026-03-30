export interface TagProps {
  label: string;
  value?: string;
  selected?: boolean;
  dismissible?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onPress?: (value?: string) => void;
  onDismiss?: (value?: string) => void;
}
