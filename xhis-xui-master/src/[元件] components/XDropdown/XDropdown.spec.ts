import { fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import XDropdown from './XDropdown.vue';

describe('XDropdown', () => {
  it('test render a dropdown target', async () => {
    const { getByTestId } = render(XDropdown);

    const targetButton = getByTestId('dropdown-target');
    await fireEvent.click(targetButton);
    expect(targetButton).toBeDefined();
  });

  it('test render a disabled dropdown target', async () => {
    const { getByTestId } = render(XDropdown, {
      props: {
        disabled: true,
      },
    });

    const targetButton = getByTestId('dropdown-target');
    expect(targetButton).toBeDefined();
  });

  it('test render a dropdown menu', async () => {
    const fakeNames = ['讀取醫事卡', '讀取健保卡', '登出'];
    const fakeItems = Array.from(fakeNames, (name) => ({
      name,
      disabled: name === '登出',
      callback: jest.fn(),
    }));
    const { getByText } = render(XDropdown, {
      props: {
        items: fakeItems,
      },
    });
    fakeNames.forEach(async (name) => {
      const itemView = getByText(name);
      await fireEvent.click(itemView);
      expect(itemView).toBeDefined();
    });
  });

  it('test onItemClick with tippy instance', async () => {
    const stubCallback = jest.fn();
    const wrapper = mount(XDropdown);
    await nextTick();
    await wrapper.vm.onItemClick({ callback: stubCallback });
    expect(stubCallback).toBeCalled();
  });

  it('test onItemClick without callback', async () => {
    const wrapper = mount(XDropdown);
    await nextTick();
    await wrapper.vm.onItemClick({});
  });
});
