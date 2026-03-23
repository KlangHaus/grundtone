import { GtComponent } from './base';

export class Stepper extends GtComponent {
  private steps!: HTMLElement[];
  private clickHandlers!: Map<HTMLElement, (e: Event) => void>;

  protected init(): void {
    this.clickHandlers = new Map();
    this.steps = Array.from(
      this.el.querySelectorAll<HTMLElement>('.stepper__step'),
    );

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];

      if (
        step.classList.contains('stepper__step--completed') ||
        this.el.hasAttribute('data-all-clickable')
      ) {
        const handler = () => this.activate(i);
        step.addEventListener('click', handler);
        this.clickHandlers.set(step, handler);
        step.style.cursor = 'pointer';
      }
    }
  }

  private activate(index: number): void {
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      step.classList.toggle('stepper__step--active', i === index);
      step.classList.toggle('stepper__step--completed', i < index);
      step.setAttribute('aria-current', i === index ? 'step' : 'false');
    }
  }

  destroy(): void {
    for (const [el, handler] of this.clickHandlers) {
      el.removeEventListener('click', handler);
    }
    this.clickHandlers.clear();
    this.markDestroyed();
  }
}
