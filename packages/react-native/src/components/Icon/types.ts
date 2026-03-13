export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps {
  /** Icon name from the registry */
  name: string;
  /** Size preset from design-system icon tokens */
  size?: IconSize;
  /** Accessible label. If omitted, icon is decorative (hidden from screen readers) */
  label?: string;
  /** Override icon color. Falls back to the global iconColor config, then theme text color. */
  color?: string;
}
