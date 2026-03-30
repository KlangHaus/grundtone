import type { IconDefinition } from '@grundtone/core';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps {
  /** Direct icon definition — takes precedence over name lookup */
  icon?: IconDefinition;
  /** Icon name to look up in the provided registry */
  name?: string;
  /** Size preset from design-system icon tokens */
  size?: IconSize;
  /** Accessible label. If omitted, icon is decorative (hidden from screen readers) */
  label?: string;
  /** Override icon color. Falls back to the global iconColor config, then theme text color. */
  color?: string;
}
