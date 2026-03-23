import { GtComponent } from './base';

export class Table extends GtComponent {
  private sortHandlers!: Map<HTMLElement, (e: Event) => void>;
  private selectHandlers!: Map<HTMLElement, (e: Event) => void>;

  protected init(): void {
    this.sortHandlers = new Map();
    this.selectHandlers = new Map();

    if (this.el.hasAttribute('data-sortable')) {
      this.initSort();
    }

    if (this.el.hasAttribute('data-selectable')) {
      this.initSelect();
    }
  }

  private initSort(): void {
    const buttons = Array.from(
      this.el.querySelectorAll<HTMLElement>('.table__sort'),
    );

    for (const btn of buttons) {
      const handler = () => this.handleSort(btn);
      btn.addEventListener('click', handler);
      this.sortHandlers.set(btn, handler);
    }
  }

  private handleSort(btn: HTMLElement): void {
    const th = btn.closest('th');
    if (!th) return;

    const thead = this.el.querySelector('thead');
    if (!thead) return;

    const ths = Array.from(thead.querySelectorAll('th'));
    const colIndex = ths.indexOf(th);

    // Determine sort direction
    const currentSort = th.getAttribute('aria-sort');
    const newDir = currentSort === 'ascending' ? 'descending' : 'ascending';

    // Clear other column sorts
    for (const otherTh of ths) {
      otherTh.removeAttribute('aria-sort');
      const otherBtn = otherTh.querySelector('.table__sort');
      otherBtn?.classList.remove('table__sort--active');
    }

    th.setAttribute('aria-sort', newDir);
    btn.classList.add('table__sort--active');

    // Sort tbody rows
    const tbody = this.el.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = th.classList.contains('table__num');

    rows.sort((a, b) => {
      const aCell = a.querySelectorAll('td')[colIndex];
      const bCell = b.querySelectorAll('td')[colIndex];
      if (!aCell || !bCell) return 0;

      const aText = (aCell.textContent ?? '').trim();
      const bText = (bCell.textContent ?? '').trim();

      let cmp: number;
      if (isNumeric) {
        cmp = parseFloat(aText.replace(/[^\d.-]/g, '')) - parseFloat(bText.replace(/[^\d.-]/g, ''));
      } else {
        cmp = aText.localeCompare(bText, 'da');
      }

      return newDir === 'ascending' ? cmp : -cmp;
    });

    for (const row of rows) {
      tbody.appendChild(row);
    }
  }

  private initSelect(): void {
    const checkboxes = Array.from(
      this.el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
    );

    for (const cb of checkboxes) {
      const handler = () => this.handleSelect(cb);
      cb.addEventListener('change', handler);
      this.selectHandlers.set(cb, handler);
    }
  }

  private handleSelect(cb: HTMLInputElement): void {
    const isHeader = !!cb.closest('thead');

    if (isHeader) {
      // Select/deselect all
      const bodyCheckboxes = Array.from(
        this.el.querySelectorAll<HTMLInputElement>(
          'tbody input[type="checkbox"]',
        ),
      );
      for (const bodyCb of bodyCheckboxes) {
        bodyCb.checked = cb.checked;
        const row = bodyCb.closest('tr');
        row?.classList.toggle('table__row--selected', cb.checked);
      }
    } else {
      // Toggle row selection
      const row = cb.closest('tr');
      row?.classList.toggle('table__row--selected', cb.checked);

      // Update header checkbox
      const headerCb = this.el.querySelector<HTMLInputElement>(
        'thead input[type="checkbox"]',
      );
      if (headerCb) {
        const bodyCheckboxes = Array.from(
          this.el.querySelectorAll<HTMLInputElement>(
            'tbody input[type="checkbox"]',
          ),
        );
        const allChecked = bodyCheckboxes.every(c => c.checked);
        const someChecked = bodyCheckboxes.some(c => c.checked);
        headerCb.checked = allChecked;
        headerCb.indeterminate = someChecked && !allChecked;
      }
    }
  }

  destroy(): void {
    for (const [el, handler] of this.sortHandlers) {
      el.removeEventListener('click', handler);
    }
    this.sortHandlers.clear();

    for (const [el, handler] of this.selectHandlers) {
      el.removeEventListener('change', handler);
    }
    this.selectHandlers.clear();

    this.markDestroyed();
  }
}
