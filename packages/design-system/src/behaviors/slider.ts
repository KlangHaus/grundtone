import { GtComponent } from './base';

export class Slider extends GtComponent {
  private thumbs!: HTMLElement[];
  private track!: HTMLElement | null;
  private rangeEl!: HTMLElement | null;
  private control!: HTMLElement | null;
  private min!: number;
  private max!: number;
  private step!: number;
  private isRange!: boolean;
  private isVertical!: boolean;
  private values!: [number, number];
  private activeThumb = 0;
  private keydownHandlers!: Map<HTMLElement, (e: KeyboardEvent) => void>;
  private pointerDownHandlers!: Map<HTMLElement, (e: PointerEvent) => void>;
  private pointerMoveHandler!: ((e: PointerEvent) => void) | null;
  private pointerUpHandler!: ((e: PointerEvent) => void) | null;
  private trackClickHandler!: ((e: PointerEvent) => void) | null;

  protected init(): void {
    this.thumbs = Array.from(
      this.el.querySelectorAll<HTMLElement>('.slider__thumb'),
    );
    this.track = this.el.querySelector('.slider__track');
    this.rangeEl = this.el.querySelector('.slider__range');
    this.control = this.el.querySelector('.slider__control');

    this.min = parseFloat(this.el.getAttribute('data-min') ?? '0');
    this.max = parseFloat(this.el.getAttribute('data-max') ?? '100');
    this.step = parseFloat(this.el.getAttribute('data-step') ?? '1');
    this.isRange = this.thumbs.length > 1;
    this.isVertical = this.el.classList.contains('slider--vertical');

    // Read initial values from aria-valuenow
    const v0 = parseFloat(
      this.thumbs[0]?.getAttribute('aria-valuenow') ?? String(this.min),
    );
    const v1 = this.isRange
      ? parseFloat(
          this.thumbs[1]?.getAttribute('aria-valuenow') ?? String(this.max),
        )
      : v0;
    this.values = [v0, v1];

    this.keydownHandlers = new Map();
    this.pointerDownHandlers = new Map();

    // Keyboard + pointer per thumb
    for (let i = 0; i < this.thumbs.length; i++) {
      const thumb = this.thumbs[i];

      const kh = (e: KeyboardEvent) => this.onKeydown(e, i);
      thumb.addEventListener('keydown', kh);
      this.keydownHandlers.set(thumb, kh);

      const ph = (e: PointerEvent) => {
        this.activeThumb = i;
        thumb.setPointerCapture(e.pointerId);
      };
      thumb.addEventListener('pointerdown', ph);
      this.pointerDownHandlers.set(thumb, ph);
    }

    // Shared pointer move/up on control
    if (this.control) {
      this.pointerMoveHandler = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if (!target.hasPointerCapture(e.pointerId)) return;
        const val = this.getValueFromEvent(e);
        this.setValue(this.activeThumb, val);
      };
      this.pointerUpHandler = (e: PointerEvent) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      };

      for (const thumb of this.thumbs) {
        thumb.addEventListener('pointermove', this.pointerMoveHandler);
        thumb.addEventListener('pointerup', this.pointerUpHandler);
      }

      // Track click
      this.trackClickHandler = (e: PointerEvent) => {
        if ((e.target as HTMLElement).classList.contains('slider__thumb'))
          return;
        const val = this.getValueFromEvent(e);
        if (this.isRange) {
          const d0 = Math.abs(val - this.values[0]);
          const d1 = Math.abs(val - this.values[1]);
          this.setValue(d0 <= d1 ? 0 : 1, val);
        } else {
          this.setValue(0, val);
        }
      };
      this.control.addEventListener('pointerdown', this.trackClickHandler);
    }

    this.update();
  }

  private snap(val: number): number {
    const stepped =
      Math.round((val - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, stepped));
  }

  private getValueFromEvent(e: PointerEvent): number {
    if (!this.control) return this.min;
    const rect = this.control.getBoundingClientRect();
    let ratio: number;
    if (this.isVertical) {
      ratio = 1 - (e.clientY - rect.top) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }
    ratio = Math.max(0, Math.min(1, ratio));
    return this.snap(this.min + ratio * (this.max - this.min));
  }

  private setValue(thumbIndex: number, val: number): void {
    if (this.isRange) {
      if (thumbIndex === 0) {
        this.values[0] = Math.min(val, this.values[1]);
      } else {
        this.values[1] = Math.max(val, this.values[0]);
      }
    } else {
      this.values[0] = val;
      this.values[1] = val;
    }
    this.update();
    this.el.dispatchEvent(
      new CustomEvent('gt:slider-change', {
        bubbles: true,
        detail: { value: this.isRange ? [...this.values] : this.values[0] },
      }),
    );
  }

  private onKeydown(e: KeyboardEvent, thumbIndex: number): void {
    const current = this.values[thumbIndex];
    let next = current;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        next = this.snap(current + this.step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        next = this.snap(current - this.step);
        break;
      case 'Home':
        e.preventDefault();
        next = this.min;
        break;
      case 'End':
        e.preventDefault();
        next = this.max;
        break;
      default:
        return;
    }

    this.setValue(thumbIndex, next);
  }

  private update(): void {
    const span = this.max - this.min || 1;
    const p0 = ((this.values[0] - this.min) / span) * 100;
    const p1 = ((this.values[1] - this.min) / span) * 100;

    // Update thumbs
    if (this.thumbs[0]) {
      this.thumbs[0].setAttribute('aria-valuenow', String(this.values[0]));
      if (this.isVertical) {
        this.thumbs[0].style.bottom = `${p0}%`;
      } else {
        this.thumbs[0].style.left = `${p0}%`;
      }
    }
    if (this.thumbs[1] && this.isRange) {
      this.thumbs[1].setAttribute('aria-valuenow', String(this.values[1]));
      if (this.isVertical) {
        this.thumbs[1].style.bottom = `${p1}%`;
      } else {
        this.thumbs[1].style.left = `${p1}%`;
      }
    }

    // Update range fill
    if (this.rangeEl) {
      if (this.isVertical) {
        if (this.isRange) {
          this.rangeEl.style.bottom = `${p0}%`;
          this.rangeEl.style.height = `${p1 - p0}%`;
        } else {
          this.rangeEl.style.bottom = '0%';
          this.rangeEl.style.height = `${p0}%`;
        }
      } else {
        if (this.isRange) {
          this.rangeEl.style.left = `${p0}%`;
          this.rangeEl.style.width = `${p1 - p0}%`;
        } else {
          this.rangeEl.style.left = '0%';
          this.rangeEl.style.width = `${p0}%`;
        }
      }
    }

    // Update value display
    const valueEl = this.el.querySelector('.slider__value');
    if (valueEl) {
      valueEl.textContent = this.isRange
        ? `${this.values[0]} – ${this.values[1]}`
        : String(this.values[0]);
    }
  }

  destroy(): void {
    for (const [el, h] of this.keydownHandlers) {
      el.removeEventListener('keydown', h);
    }
    for (const [el, h] of this.pointerDownHandlers) {
      el.removeEventListener('pointerdown', h);
    }
    if (this.pointerMoveHandler) {
      for (const thumb of this.thumbs) {
        thumb.removeEventListener('pointermove', this.pointerMoveHandler);
      }
    }
    if (this.pointerUpHandler) {
      for (const thumb of this.thumbs) {
        thumb.removeEventListener('pointerup', this.pointerUpHandler);
      }
    }
    if (this.control && this.trackClickHandler) {
      this.control.removeEventListener('pointerdown', this.trackClickHandler);
    }
    this.keydownHandlers.clear();
    this.pointerDownHandlers.clear();
    this.markDestroyed();
  }
}
