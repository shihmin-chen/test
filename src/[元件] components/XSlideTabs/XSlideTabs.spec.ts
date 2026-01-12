import { mount, VueWrapper } from '@vue/test-utils';

import { nextTick } from 'vue';

import { XTabItem, XTabItemSize } from './XTabItem';
import XSlideTabs from './XSlideTabs.vue';

describe('Test XSlideTabs', () => {
  let wrapper: VueWrapper<any>;

  const fakeButtonOptions: XTabItem[] = [
    { label: 'NavA', value: 'A' },
    { label: 'NavB', value: 'B' },
    { label: 'NavC', value: 'C' },
    { label: 'NavD', value: 'D' },
    { label: 'NavE', value: 'E' },
  ];
  const defaultButton = fakeButtonOptions[0];
  const defaultSize: XTabItemSize = 'md';

  beforeEach(() => {
    wrapper = mount(XSlideTabs);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('[MOUNT] use default prop and should render correctly', async () => {
    expect(wrapper.vm.$props.modelValue).toBe('');
    expect(wrapper.vm.$props.buttonOptions).toStrictEqual([]);
    expect(wrapper.vm.$props.size).toBe(defaultSize);
    expect(wrapper.vm.$props.theme).toBe('filledWhite');
    expect(wrapper.vm.$props.containerStyle).toStrictEqual({});
    expect(wrapper.vm.$props.hasDivideLine).toBe(true);
  });

  it('[MOUNT] set another prop (modelValue) and should render correctly', async () => {
    const targetButtonIndex = 1;
    const targetButton = fakeButtonOptions[targetButtonIndex];

    wrapper.setProps({
      modelValue: defaultButton.value,
      buttonOptions: fakeButtonOptions,
    });
    await nextTick();

    expect(
      wrapper
        .findAll('.x-slide-tabs-item')
        [targetButtonIndex].classes()
        .includes('x-slide-tabs-item--md--selected')
    ).toBe(false);

    wrapper.setProps({ modelValue: targetButton.value });
    await nextTick();

    expect(
      wrapper
        .findAll('.x-slide-tabs-item')
        [targetButtonIndex].classes()
        .includes('x-slide-tabs-item--md--selected')
    ).toBe(true);
  });

  it('[MOUNT] use fake props (buttonOptions) and should render correctly', async () => {
    wrapper.setProps({ buttonOptions: fakeButtonOptions });
    await nextTick();
    expect(wrapper.findAll('.x-slide-tabs-item-container').length).toBe(
      fakeButtonOptions.length
    );
    expect(wrapper.findAll('.x-slide-tabs-divideline.show').length).toBe(
      fakeButtonOptions.length - 1
    );
    expect(wrapper.findAll('.x-slide-tabs-divideline.hide').length).toBe(1);

    fakeButtonOptions.forEach((element) => {
      expect(wrapper.html()).toContain(element.label);
    });

    wrapper.setProps({ modelValue: defaultButton.value });
    await nextTick();
    expect(wrapper.findAll('.x-slide-tabs-divideline.show').length).toBe(
      fakeButtonOptions.length - 2
    );
    expect(wrapper.findAll('.x-slide-tabs-divideline.hide').length).toBe(2);

    expect(wrapper.find('.x-slide-tabs-item--md--selected').text()).toBe(
      defaultButton.label
    );
  });

  it('[MOUNT] set another prop (size) and should render correctly', async () => {
    const targetSmallSize: XTabItemSize = 'sm';
    const targetLargeSize: XTabItemSize = 'lg';

    wrapper.setProps({
      modelValue: defaultButton.value,
      buttonOptions: fakeButtonOptions,
    });
    await nextTick();
    expect(wrapper.findAll(`.x-slide-tabs-item--${defaultSize}`).length).toBe(
      fakeButtonOptions.length
    );

    wrapper.setProps({
      size: targetSmallSize,
    });
    await nextTick();
    expect(
      wrapper.findAll(`.x-slide-tabs-item--${targetSmallSize}`).length
    ).toBe(fakeButtonOptions.length);

    wrapper.setProps({
      size: targetLargeSize,
    });
    await nextTick();
    expect(
      wrapper.findAll(`.x-slide-tabs-item--${targetLargeSize}`).length
    ).toBe(fakeButtonOptions.length);
  });

  it('[MOUNT] set another prop (theme) and should render correctly', async () => {
    wrapper.setProps({
      theme: 'filledWhite',
    });
    await nextTick();
    expect(wrapper.vm.$props.theme).toStrictEqual('filledWhite');

    wrapper.setProps({
      theme: 'filledWhiteWithBorder',
    });
    await nextTick();
    expect(wrapper.vm.$props.theme).toStrictEqual('filledWhiteWithBorder');

    wrapper.setProps({
      theme: 'filledGrey',
    });
    await nextTick();
    expect(wrapper.vm.$props.theme).toStrictEqual('filledGrey');

    wrapper.setProps({
      theme: 'minimal',
    });
    await nextTick();
    expect(wrapper.vm.$props.theme).toStrictEqual('minimal');
  });

  it('[MOUNT] set another prop (containerStyle) and should render correctly', async () => {
    const targetContainerStyle = { backgroundColor: 'blue' };
    wrapper.setProps({
      containerStyle: targetContainerStyle,
    });
    await nextTick();
    expect(wrapper.vm.$props.containerStyle).toStrictEqual(
      targetContainerStyle
    );
  });

  it('[MOUNT] set another prop (hasDivideLine) and should render correctly', async () => {
    const targetHasDivideLine = false;
    wrapper.setProps({
      hasDivideLine: targetHasDivideLine,
    });
    await nextTick();
    expect(wrapper.vm.$props.hasDivideLine).toStrictEqual(targetHasDivideLine);
    expect(wrapper.vm.showDivideLine(0)).toBe(targetHasDivideLine);
  });

  it('[MOUNT] set another prop (disabled) and should render correctly', async () => {
    const targetDisabled = true;
    wrapper.setProps({
      disabled: targetDisabled,
    });
    await nextTick();
    expect(wrapper.vm.$props.disabled).toStrictEqual(targetDisabled);
  });

  it('[MOUNT] click with disabled=true and should render correctly', async () => {
    const targetDisabled = true;
    wrapper.setProps({
      disabled: targetDisabled,
    });
    await nextTick();
    wrapper.vm.onClickItem();
    expect(wrapper.emitted()['update:modelValue']).toBe(undefined);
  });

  it('[ACTION] click another button and should emit something', async () => {
    const targetButtonIndex = 1;
    const targetButton = fakeButtonOptions[targetButtonIndex];

    wrapper.setProps({
      modelValue: defaultButton.value,
      buttonOptions: fakeButtonOptions,
    });
    await nextTick();

    const targetButtonOnScreen =
      wrapper.findAll('.x-slide-tabs-item')[targetButtonIndex];

    expect(
      targetButtonOnScreen.classes().includes('x-slide-tabs-item--selected')
    ).toBe(false);

    await targetButtonOnScreen.trigger('click');
    await nextTick();
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([
      [targetButton.value],
    ]);
  });
});
