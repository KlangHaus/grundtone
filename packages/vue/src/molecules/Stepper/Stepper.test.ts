import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Stepper from './Stepper.vue';

const BASE = 'gt-stepper';
const steps = [
  { label: 'Trin 1' },
  { label: 'Trin 2' },
  { label: 'Trin 3' },
];

function mountStepper(props = {}) {
  return mount(Stepper, { props: { steps, ...props } });
}

describe('Stepper', () => {
  it('renders all steps', () => {
    const wrapper = mountStepper();
    expect(wrapper.findAll(`.${BASE}__step`)).toHaveLength(3);
  });

  it('renders step labels', () => {
    const wrapper = mountStepper();
    const labels = wrapper.findAll(`.${BASE}__label`);
    expect(labels[0].text()).toBe('Trin 1');
    expect(labels[2].text()).toBe('Trin 3');
  });

  it('marks first step as active by default', () => {
    const wrapper = mountStepper();
    expect(
      wrapper.findAll(`.${BASE}__step`)[0].classes(),
    ).toContain(`${BASE}__step--active`);
  });

  it('marks active step correctly', () => {
    const wrapper = mountStepper({ activeStep: 1 });
    const stps = wrapper.findAll(`.${BASE}__step`);
    expect(stps[0].classes()).toContain(`${BASE}__step--completed`);
    expect(stps[1].classes()).toContain(`${BASE}__step--active`);
    expect(stps[2].classes()).not.toContain(`${BASE}__step--active`);
  });

  it('emits update:activeStep on completed step click', async () => {
    const wrapper = mountStepper({ activeStep: 2 });
    await wrapper.findAll(`.${BASE}__step`)[0].trigger('click');
    expect(wrapper.emitted('update:activeStep')![0]).toEqual([0]);
  });

  it('does not emit on disabled step click', async () => {
    const wrapper = mountStepper({ activeStep: 0 });
    await wrapper.findAll(`.${BASE}__step`)[2].trigger('click');
    expect(wrapper.emitted('update:activeStep')).toBeFalsy();
  });

  it('all steps clickable when allClickable', async () => {
    const wrapper = mountStepper({ activeStep: 0, allClickable: true });
    await wrapper.findAll(`.${BASE}__step`)[2].trigger('click');
    expect(wrapper.emitted('update:activeStep')![0]).toEqual([2]);
  });

  it('renders error state', () => {
    const errorSteps = [
      { label: 'Trin 1', error: true },
      { label: 'Trin 2' },
    ];
    const wrapper = mount(Stepper, { props: { steps: errorSteps } });
    expect(
      wrapper.findAll(`.${BASE}__step`)[0].classes(),
    ).toContain(`${BASE}__step--error`);
  });

  it('renders info text', () => {
    const infoSteps = [{ label: 'Trin 1', info: 'Extra info' }];
    const wrapper = mount(Stepper, { props: { steps: infoSteps } });
    expect(wrapper.find(`.${BASE}__info`).text()).toBe('Extra info');
  });

  it('has aria-current="step" on active', () => {
    const wrapper = mountStepper({ activeStep: 1 });
    expect(
      wrapper.findAll(`.${BASE}__step`)[1].attributes('aria-current'),
    ).toBe('step');
  });

  // Simple variant
  it('renders simple variant as text', () => {
    const wrapper = mountStepper({ simple: true, activeStep: 1 });
    expect(wrapper.find(`.${BASE}--simple`).text()).toBe('Trin 2 af 3');
  });

  it('custom simple label', () => {
    const wrapper = mountStepper({
      simple: true,
      activeStep: 0,
      simpleLabel: 'Step {current} of {total}',
    });
    expect(wrapper.text()).toBe('Step 1 of 3');
  });

  // Dot element
  it('renders dots', () => {
    const wrapper = mountStepper();
    expect(wrapper.findAll(`.${BASE}__dot`)).toHaveLength(3);
  });

  // Ordered list
  it('renders as ordered list', () => {
    const wrapper = mountStepper();
    expect(wrapper.find('ol').exists()).toBe(true);
  });
});
