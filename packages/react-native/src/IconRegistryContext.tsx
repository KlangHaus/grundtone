import React, { createContext, useContext } from 'react';
import type { IconRegistry } from '@grundtone/core';

const IconRegistryContext = createContext<IconRegistry | null>(null);

export interface IconRegistryProviderProps {
  registry: IconRegistry;
  children: React.ReactNode;
}

/**
 * Provides an icon registry to all GTIcon components in the tree.
 *
 * @example
 * import { iconRegistry } from '@grundtone/icons';
 *
 * <IconRegistryProvider registry={iconRegistry}>
 *   <App />
 * </IconRegistryProvider>
 */
export function IconRegistryProvider({
  registry,
  children,
}: IconRegistryProviderProps) {
  return (
    <IconRegistryContext.Provider value={registry}>
      {children}
    </IconRegistryContext.Provider>
  );
}

/** Returns the icon registry from the nearest IconRegistryProvider, or null. */
export function useIconRegistry(): IconRegistry | null {
  return useContext(IconRegistryContext);
}
