import { GtComponent } from './base';
import { prefersReducedMotion } from './utils';

export class Carousel extends GtComponent {
  private slides!: HTMLElement[];
  private indicators!: HTMLElement[];
  private prevBtn!: HTMLElement | null;
  private nextBtn!: HTMLElement | null;
  private activeIndex = 0;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private clickHandlers!: Map<HTMLElement, (e: Event) => void>;
  private keydownHandler!: ((e: KeyboardEvent) => void) | null;
  private pointerStartX = 0;
  private pointerStartY = 0;
  private isDragging = false;
  private directionLocked = false;
  private dragOffset = 0;
  private pointerDownHandler!: ((e: PointerEvent) => void) | null;
  private pointerMoveHandler!: ((e: PointerEvent) => void) | null;
  private pointerUpHandler!: ((e: PointerEvent) => void) | null;
  private mouseEnterHandler!: (() => void) | null;
  private mouseLeaveHandler!: (() => void) | null;
  private isPaused = false;

  protected init(): void {
    this.clickHandlers = new Map();
    this.slides = Array.from(
      this.el.querySelectorAll<HTMLElement>('.carousel__slide'),
    );
    this.indicators = Array.from(
      this.el.querySelectorAll<HTMLElement>('.carousel__indicator'),
    );
    this.prevBtn = this.el.querySelector('.carousel__prev');
    this.nextBtn = this.el.querySelector('.carousel__next');

    // Find initial active
    const activeSlide = this.slides.findIndex(s =>
      s.classList.contains('carousel__slide--active'),
    );
    this.activeIndex = activeSlide >= 0 ? activeSlide : 0;

    // Prev/next
    if (this.prevBtn) {
      const h = () => this.prev();
      this.prevBtn.addEventListener('click', h);
      this.clickHandlers.set(this.prevBtn, h);
    }
    if (this.nextBtn) {
      const h = () => this.next();
      this.nextBtn.addEventListener('click', h);
      this.clickHandlers.set(this.nextBtn, h);
    }

    // Indicators
    for (let i = 0; i < this.indicators.length; i++) {
      const h = () => this.goTo(i);
      this.indicators[i].addEventListener('click', h);
      this.clickHandlers.set(this.indicators[i], h);
    }

    // Keyboard
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    };
    this.el.addEventListener('keydown', this.keydownHandler as EventListener);

    // Touch/pointer — continuous drag
    const isFade = this.el.classList.contains('carousel--fade');
    this.pointerDownHandler = (e: PointerEvent) => {
      if (isFade) return;
      this.pointerStartX = e.clientX;
      this.pointerStartY = e.clientY;
      this.isDragging = true;
      this.directionLocked = false;
      this.dragOffset = 0;
      this.el.setPointerCapture(e.pointerId);
    };
    this.pointerMoveHandler = (e: PointerEvent) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.pointerStartX;
      const dy = e.clientY - this.pointerStartY;
      if (!this.directionLocked && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        this.directionLocked = true;
        if (Math.abs(dy) > Math.abs(dx)) {
          this.isDragging = false;
          this.dragOffset = 0;
          return;
        }
      }
      if (!this.directionLocked) return;
      const loop = this.el.getAttribute('data-loop') !== 'false';
      let offset = dx;
      if (!loop) {
        const atStart = this.activeIndex === 0 && dx > 0;
        const atEnd = this.activeIndex === this.slides.length - 1 && dx < 0;
        if (atStart || atEnd) offset = dx * 0.3;
      }
      this.dragOffset = offset;
      const track = this.el.querySelector<HTMLElement>('.carousel__track');
      if (track) {
        track.style.transition = 'none';
        track.style.transform = `translateX(calc(${-this.activeIndex * 100}% + ${offset}px))`;
      }
    };
    this.pointerUpHandler = () => {
      if (!this.isDragging && this.dragOffset === 0) return;
      this.isDragging = false;
      const dx = this.dragOffset;
      this.dragOffset = 0;
      if (Math.abs(dx) > 50) {
        if (dx < 0) this.next();
        else this.prev();
      }
      this.update(); // Restores transition + correct position
    };
    this.el.addEventListener('pointerdown', this.pointerDownHandler);
    this.el.addEventListener('pointermove', this.pointerMoveHandler);
    this.el.addEventListener('pointerup', this.pointerUpHandler);
    this.el.addEventListener('pointercancel', this.pointerUpHandler);

    // Hover pause
    this.mouseEnterHandler = () => {
      this.isPaused = true;
    };
    this.mouseLeaveHandler = () => {
      this.isPaused = false;
    };
    this.el.addEventListener('mouseenter', this.mouseEnterHandler);
    this.el.addEventListener('mouseleave', this.mouseLeaveHandler);

    // Autoplay
    if (this.el.hasAttribute('data-autoplay') && !prefersReducedMotion()) {
      const interval = parseInt(
        this.el.getAttribute('data-interval') ?? '5000',
        10,
      );
      this.autoplayTimer = setInterval(() => {
        if (!this.isPaused) this.next();
      }, interval);
    }

    this.update();
  }

  private goTo(index: number): void {
    const loop = this.el.getAttribute('data-loop') !== 'false';
    if (loop) {
      this.activeIndex =
        ((index % this.slides.length) + this.slides.length) %
        this.slides.length;
    } else {
      this.activeIndex = Math.max(
        0,
        Math.min(index, this.slides.length - 1),
      );
    }
    this.update();
  }

  private prev(): void {
    this.goTo(this.activeIndex - 1);
  }

  private next(): void {
    this.goTo(this.activeIndex + 1);
  }

  private update(): void {
    const isFade = this.el.classList.contains('carousel--fade');
    const track = this.el.querySelector<HTMLElement>('.carousel__track');

    for (let i = 0; i < this.slides.length; i++) {
      const isActive = i === this.activeIndex;
      this.slides[i].classList.toggle('carousel__slide--active', isActive);
      this.slides[i].setAttribute('aria-hidden', String(!isActive));
    }

    for (let i = 0; i < this.indicators.length; i++) {
      this.indicators[i].classList.toggle(
        'carousel__indicator--active',
        i === this.activeIndex,
      );
      this.indicators[i].setAttribute(
        'aria-selected',
        String(i === this.activeIndex),
      );
    }

    if (track && !isFade) {
      track.style.transform = `translateX(${-this.activeIndex * 100}%)`;
    }
  }

  destroy(): void {
    for (const [el, handler] of this.clickHandlers) {
      el.removeEventListener('click', handler);
    }
    this.clickHandlers.clear();

    if (this.keydownHandler) {
      this.el.removeEventListener(
        'keydown',
        this.keydownHandler as EventListener,
      );
    }
    if (this.pointerDownHandler) {
      this.el.removeEventListener('pointerdown', this.pointerDownHandler);
    }
    if (this.pointerMoveHandler) {
      this.el.removeEventListener('pointermove', this.pointerMoveHandler);
    }
    if (this.pointerUpHandler) {
      this.el.removeEventListener('pointerup', this.pointerUpHandler);
      this.el.removeEventListener('pointercancel', this.pointerUpHandler);
    }
    if (this.mouseEnterHandler) {
      this.el.removeEventListener('mouseenter', this.mouseEnterHandler);
    }
    if (this.mouseLeaveHandler) {
      this.el.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }

    this.markDestroyed();
  }
}
