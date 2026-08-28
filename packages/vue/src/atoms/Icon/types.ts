import type { IconDefinition, IconRegistry } from '@grundtone/core';
import type { InjectionKey } from 'vue';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps {
  /**
   * Direct icon definition — takes precedence over name lookup.
   *
   * 🔴 TRUST BOUNDARY (SIK-020). `icon.body` is rendered with `v-html` and is
   * NOT sanitised. Pass only static, first-party icon definitions. Never bind
   * this prop to user-controlled or remote data — use {@link IconProps.name}
   * with a provided registry for anything else. A runtime warning detects the
   * common dangerous constructs, but it is a detector, not a defence.
   */
  icon?: IconDefinition;
  /** Icon name to look up in the provided registry */
  name?: string;
  /** Size preset from design-system icon tokens */
  size?: IconSize;
  /** Accessible label. If omitted, icon is aria-hidden="true" */
  label?: string;
  /** Override icon color. Falls back to the global iconColor config, then currentColor. */
  color?: string;
}

/** Injection key for providing an icon registry to GTIcon components. */
export const GT_ICON_REGISTRY_KEY: InjectionKey<IconRegistry> =
  Symbol('gt-icon-registry');
