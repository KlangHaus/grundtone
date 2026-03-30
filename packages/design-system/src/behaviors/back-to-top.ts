import { GtComponent } from './base';

export class BackToTop extends GtComponent {
  private threshold!: number;
  private boundScroll!: () => void;
  private boundClick!: (e: Event) => void;

  protected init(): void {
    const customThreshold = this.el.getAttribute('data-threshold');
    this.threshold = customThreshold
      ? parseInt(customThreshold, 10)
      : window.innerHeight * 2;

    this.boundScroll = () => this.onScroll();
    this.boundClick = (e: Event) => this.onClick(e);

    window.addEventListener('scroll', this.boundScroll, { passive: true });
    this.el.addEventListener('click', this.boundClick);

    // Initial check
    this.onScroll();
  }

  private onScroll(): void {
    if (window.scrollY > this.threshold) {
      this.el.classList.add('back-to-top--visible');
    } else {
      this.el.classList.remove('back-to-top--visible');
    }
  }

  private onClick(e: Event): void {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  destroy(): void {
    window.removeEventListener('scroll', this.boundScroll);
    this.el.removeEventListener('click', this.boundClick);
    this.markDestroyed();
  }
}
