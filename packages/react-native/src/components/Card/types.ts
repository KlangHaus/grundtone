import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';

export type CardVariant = 'raised' | 'bordered' | 'flat';

export interface CardProps {
  /** Visual style variant */
  variant?: CardVariant;
  /** Render as navigation card (entire card is pressable) */
  nav?: boolean;
  /** Callback when nav card is pressed */
  onPress?: () => void;
  /** Horizontal layout (image left, content right) */
  horizontal?: boolean;
  /** Subheading text above the title */
  subheading?: string;
  /** Card title (required) */
  title: string;
  /** Image source */
  image?: ImageSourcePropType | { uri: string };
  /** Image alt text */
  imageAlt?: string;
  /** Accessible label */
  accessibilityLabel?: string;
  /** Card body content */
  children?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
}
