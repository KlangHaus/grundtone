import type { RefObject } from 'react';
import type { ScrollView } from 'react-native';

export interface BackToTopProps {
  /** Label text (optional on mobile — icon only if omitted) */
  label?: string;
  /** Ref to the ScrollView to scroll */
  scrollRef: RefObject<ScrollView | null>;
}
