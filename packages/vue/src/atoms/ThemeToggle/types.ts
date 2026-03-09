export interface ThemeToggleProps {
  /**
   * Visual variant of the toggle
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'ghost';

  /**
   * Size of the toggle component
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show the text label next to the toggle
   * @default false
   */
  showLabel?: boolean;

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text for light mode
   * @default 'Light mode'
   */
  lightLabel?: string;

  /**
   * Label text for dark mode
   * @default 'Dark mode'
   */
  darkLabel?: string;

  /**
   * ARIA label for accessibility
   * If not provided, will use dynamic label based on current mode
   */
  ariaLabel?: string;
}

export interface ThemeToggleEmits {
  /**
   * Emitted when the toggle is clicked
   * @param isDark - Whether dark mode is now active
   */
  toggle: [isDark: boolean];

  /**
   * Emitted when the theme mode changes
   * @param mode - The new theme mode
   */
  change: [mode: 'light' | 'dark'];
}
