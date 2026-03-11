export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps {
  /** Icon name — checks custom registry first, then Heroicons */
  name: string;
  /** Size preset from design-system icon tokens */
  size?: IconSize;
  /** Accessible label. If omitted, icon is aria-hidden="true" */
  label?: string;
}
