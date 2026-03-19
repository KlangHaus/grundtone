import type { ReactNode } from 'react';

export type TabsVariant = 'underline' | 'segment' | 'pill';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  variant?: TabsVariant;
  onTabChange?: (id: string) => void;
  accessibilityLabel?: string;
  children: ReactNode;
}

export interface TabPanelProps {
  id: string;
  children: ReactNode;
}
