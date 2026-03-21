import { GtComponent } from './base';
import { Accordion } from './accordion';
import { Tabs } from './tabs';
import { Toggle } from './toggle';
import { Alert } from './alert';
import { CookieMessage } from './cookie-message';
import { AnchorLinks } from './anchor-links';
import { Modal } from './modal';
import { OverflowMenu } from './overflow-menu';

export { GtComponent } from './base';
export { Accordion } from './accordion';
export { Tabs } from './tabs';
export { Toggle } from './toggle';
export { Alert } from './alert';
export { CookieMessage } from './cookie-message';
export { AnchorLinks } from './anchor-links';
export { Modal } from './modal';
export { OverflowMenu } from './overflow-menu';
export { uid, prefersReducedMotion, slideOpen, slideClose } from './utils';

const REGISTRY: Record<string, new (el: HTMLElement) => GtComponent> = {
  '.accordion': Accordion,
  '.tabs': Tabs,
  '.toggle': Toggle,
  '.alert[data-dismissible]': Alert,
  '.cookie-message': CookieMessage,
  '.anchor-links': AnchorLinks,
  '.modal': Modal,
  '.overflow-menu': OverflowMenu,
};

/**
 * Discover and initialize all registered components within scope.
 * Idempotent — skips already-initialized elements.
 */
export function initAll(scope: ParentNode = document): GtComponent[] {
  const instances: GtComponent[] = [];

  for (const [selector, Ctor] of Object.entries(REGISTRY)) {
    const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    for (const el of elements) {
      if (GtComponent.getInstance(el)) continue;
      instances.push(new Ctor(el));
    }
  }

  return instances;
}

/**
 * Destroy all initialized components within scope.
 */
export function destroyAll(scope: ParentNode = document): void {
  for (const selector of Object.keys(REGISTRY)) {
    const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    for (const el of elements) {
      const instance = GtComponent.getInstance(el);
      if (instance) instance.destroy();
    }
  }
}
