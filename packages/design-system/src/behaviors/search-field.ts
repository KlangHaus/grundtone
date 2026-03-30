import { GtComponent } from './base';

export class SearchField extends GtComponent {
  private input!: HTMLInputElement | null;
  private submitBtn!: HTMLElement | null;
  private submitHandler!: ((e: Event) => void) | null;
  private keydownHandler!: ((e: KeyboardEvent) => void) | null;
  private searchHandler!: ((e: Event) => void) | null;

  protected init(): void {
    this.input = this.el.querySelector<HTMLInputElement>(
      '.search-field__input',
    );
    this.submitBtn = this.el.querySelector('.search-field__button');

    if (!this.input) return;

    // Handle native search clear (the × button on type="search")
    this.searchHandler = () => {
      if (this.input && this.input.value === '') {
        this.el.dispatchEvent(
          new CustomEvent('gt:search-clear', { bubbles: true }),
        );
      }
    };
    this.input.addEventListener('search', this.searchHandler);

    // Enter key submits form or dispatches event
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submit();
      }
    };
    this.input.addEventListener('keydown', this.keydownHandler);

    // Submit button
    if (this.submitBtn) {
      this.submitHandler = (e: Event) => {
        e.preventDefault();
        this.submit();
      };
      this.submitBtn.addEventListener('click', this.submitHandler);
    }
  }

  private submit(): void {
    const form = this.el.closest('form');
    if (form) {
      form.requestSubmit();
    } else {
      this.el.dispatchEvent(
        new CustomEvent('gt:search-submit', {
          bubbles: true,
          detail: { value: this.input?.value ?? '' },
        }),
      );
    }
  }

  destroy(): void {
    if (this.input && this.searchHandler) {
      this.input.removeEventListener('search', this.searchHandler);
    }
    if (this.input && this.keydownHandler) {
      this.input.removeEventListener('keydown', this.keydownHandler);
    }
    if (this.submitBtn && this.submitHandler) {
      this.submitBtn.removeEventListener('click', this.submitHandler);
    }
    this.markDestroyed();
  }
}
