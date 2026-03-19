import { describe, it, expect, beforeEach } from 'vitest';
import { initAll, destroyAll } from '../index';
import { GtComponent } from '../base';

function setupDOM(): void {
  document.body.innerHTML = `
    <div class="accordion" data-transition="none" role="region" aria-label="Test">
      <div class="accordion__item">
        <button class="accordion__header" aria-expanded="false">
          <span class="accordion__heading">Title</span>
        </button>
        <div class="accordion__panel" role="region">
          <div class="accordion__body"><p>Content</p></div>
        </div>
      </div>
    </div>
    <div class="tabs tabs--underline">
      <div class="tabs__list" role="tablist">
        <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">A</button>
        <button class="tabs__tab" role="tab" aria-selected="false">B</button>
      </div>
      <div class="tabs__panel" role="tabpanel"><p>A</p></div>
      <div class="tabs__panel" role="tabpanel"><p>B</p></div>
    </div>
    <button class="toggle toggle--md">
      <span class="toggle__track"></span>
      <span class="toggle__thumb"></span>
    </button>
  `;
}

describe('initAll / destroyAll', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes all components', () => {
    setupDOM();
    const instances = initAll();

    expect(instances).toHaveLength(3);
    expect(
      GtComponent.getInstance(document.querySelector('.accordion')!),
    ).not.toBeNull();
    expect(
      GtComponent.getInstance(document.querySelector('.tabs')!),
    ).not.toBeNull();
    expect(
      GtComponent.getInstance(document.querySelector('.toggle')!),
    ).not.toBeNull();
  });

  it('is idempotent — calling initAll twice does not double-init', () => {
    setupDOM();
    const first = initAll();
    const second = initAll();

    expect(first).toHaveLength(3);
    expect(second).toHaveLength(0);
  });

  it('destroyAll cleans up all instances', () => {
    setupDOM();
    initAll();
    destroyAll();

    expect(
      GtComponent.getInstance(document.querySelector('.accordion')!),
    ).toBeNull();
    expect(
      GtComponent.getInstance(document.querySelector('.tabs')!),
    ).toBeNull();
    expect(
      GtComponent.getInstance(document.querySelector('.toggle')!),
    ).toBeNull();
  });

  it('scoped initAll only initializes within scope', () => {
    document.body.innerHTML = `
      <div id="scope">
        <button class="toggle toggle--md">
          <span class="toggle__track"></span>
          <span class="toggle__thumb"></span>
        </button>
      </div>
      <button class="toggle toggle--md">
        <span class="toggle__track"></span>
        <span class="toggle__thumb"></span>
      </button>
    `;

    const scope = document.getElementById('scope')!;
    const instances = initAll(scope);

    expect(instances).toHaveLength(1);

    const toggles = document.querySelectorAll('.toggle');
    expect(GtComponent.getInstance(toggles[0] as HTMLElement)).not.toBeNull();
    expect(GtComponent.getInstance(toggles[1] as HTMLElement)).toBeNull();
  });
});
