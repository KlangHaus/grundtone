export type TabsVariant = 'underline' | 'segment' | 'pill';

export interface TabItem {
  /** Unique identifier — used for panel matching and v-model */
  id: string;
  /** Tab label text */
  label: string;
  /** Optional icon name from the icon registry */
  icon?: string;
}

export interface TabsProps {
  /** Tab definitions */
  tabs: TabItem[];
  /** Active tab ID (v-model) */
  modelValue?: string;
  /** Visual variant */
  variant?: TabsVariant;
  /** Accessible label for the tab list */
  ariaLabel?: string;
}

export interface TabPanelProps {
  /** Must match a TabItem.id */
  id: string;
}
