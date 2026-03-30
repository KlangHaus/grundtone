const INSTANCE_KEY = '__gt';

export abstract class GtComponent {
  protected el: HTMLElement;

  constructor(el: HTMLElement) {
    if ((el as any)[INSTANCE_KEY]) {
      throw new Error('Already initialized');
    }
    this.el = el;
    (el as any)[INSTANCE_KEY] = this;
    this.init();
  }

  protected abstract init(): void;
  abstract destroy(): void;

  protected markDestroyed(): void {
    delete (this.el as any)[INSTANCE_KEY];
  }

  static getInstance(el: HTMLElement): GtComponent | null {
    return (el as any)[INSTANCE_KEY] ?? null;
  }
}
