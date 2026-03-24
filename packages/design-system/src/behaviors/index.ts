import { GtComponent } from './base';
import { BackToTop } from './back-to-top';
import { Accordion } from './accordion';
import { Tabs } from './tabs';
import { Table } from './table';
import { Carousel } from './carousel';
import { Toggle } from './toggle';
import { Alert } from './alert';
import { CookieMessage } from './cookie-message';
import { AnchorLinks } from './anchor-links';
import { Modal } from './modal';
import { OverflowMenu } from './overflow-menu';
import { Tooltip } from './tooltip';
import { Toast } from './toast';
import { Stepper } from './stepper';
import { SearchField } from './search-field';
import { Slider } from './slider';

export { GtComponent } from './base';
export { BackToTop } from './back-to-top';
export { Accordion } from './accordion';
export { Tabs } from './tabs';
export { Table } from './table';
export { Carousel } from './carousel';
export { Toggle } from './toggle';
export { Alert } from './alert';
export { CookieMessage } from './cookie-message';
export { AnchorLinks } from './anchor-links';
export { Modal } from './modal';
export { OverflowMenu } from './overflow-menu';
export { Tooltip } from './tooltip';
export { Toast } from './toast';
export { Stepper } from './stepper';
export { SearchField } from './search-field';
export { Slider } from './slider';
export { uid, prefersReducedMotion, slideOpen, slideClose } from './utils';

const REGISTRY: Record<string, new (el: HTMLElement) => GtComponent> = {
  '.accordion': Accordion,
  '.tabs': Tabs,
  '.table[data-sortable], .table[data-selectable]': Table,
  '.carousel': Carousel,
  '.toggle': Toggle,
  '.alert[data-dismissible]': Alert,
  '.cookie-message': CookieMessage,
  '.anchor-links': AnchorLinks,
  '.modal': Modal,
  '.overflow-menu': OverflowMenu,
  '.back-to-top': BackToTop,
  '.tooltip': Tooltip,
  '.toast': Toast,
  '.stepper': Stepper,
  '.search-field': SearchField,
  '.slider': Slider,
};

/**
 * Discover and initialize all registered components within scope.
 * Idempotent — skips already-initialized elements.
 */
export function initAll(
  scope: Document | HTMLElement = document,
): GtComponent[] {
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
export function destroyAll(scope: Document | HTMLElement = document): void {
  for (const selector of Object.keys(REGISTRY)) {
    const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    for (const el of elements) {
      const instance = GtComponent.getInstance(el);
      if (instance) instance.destroy();
    }
  }
}
