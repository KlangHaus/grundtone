import { GtComponent } from './base';

export class AnchorLinks extends GtComponent {
  private links!: HTMLAnchorElement[];
  private observer!: IntersectionObserver | null;
  private clickHandlers!: Map<HTMLElement, (e: Event) => void>;
  private isClickScrolling!: boolean;
  private scrollTimer!: ReturnType<typeof setTimeout> | null;

  protected init(): void {
    this.links = Array.from(
      this.el.querySelectorAll<HTMLAnchorElement>('.anchor-links__link'),
    );
    this.clickHandlers = new Map();
    this.observer = null;
    this.isClickScrolling = false;
    this.scrollTimer = null;

    // Bind click handlers for smooth scroll
    for (const link of this.links) {
      const handler = (e: Event) => this.onClick(e, link);
      link.addEventListener('click', handler);
      this.clickHandlers.set(link, handler);
    }

    // Set up IntersectionObserver for active highlight
    this.setupObserver();
  }

  private onClick(e: Event, link: HTMLAnchorElement): void {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();

    // Pause observer during manual scroll
    this.isClickScrolling = true;
    if (this.scrollTimer) clearTimeout(this.scrollTimer);

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', href);
    this.setActive(link);

    // Re-enable observer after scroll completes (~800ms)
    this.scrollTimer = setTimeout(() => {
      this.isClickScrolling = false;
    }, 800);
  }

  private setupObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const targets: HTMLElement[] = [];
    const hrefToLink = new Map<string, HTMLAnchorElement>();

    for (const link of this.links) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) continue;

      const target = document.getElementById(href.slice(1));
      if (target) {
        targets.push(target);
        hrefToLink.set(href, link);
      }
    }

    if (targets.length === 0) return;

    this.observer = new IntersectionObserver(
      entries => {
        if (this.isClickScrolling) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const href = `#${entry.target.id}`;
            const link = hrefToLink.get(href);
            if (link) this.setActive(link);
          }
        }
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 },
    );

    for (const target of targets) {
      this.observer.observe(target);
    }
  }

  private setActive(activeLink: HTMLAnchorElement): void {
    for (const link of this.links) {
      const isActive = link === activeLink;
      link.classList.toggle('anchor-links__link--active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  destroy(): void {
    for (const [el, handler] of this.clickHandlers) {
      el.removeEventListener('click', handler);
    }
    this.clickHandlers.clear();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }

    this.markDestroyed();
  }
}
