import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import XLazyRender from './XLazyRender.vue';

import { useIntersectionObserver } from '@vueuse/core';
jest.mock('@vueuse/core', () => ({
  useIntersectionObserver: jest.fn().mockReturnValue({ stop: () => 1 }),
}));

describe('XLazyRender', () => {
  it('should render slot after intersecting window', async () => {
    const wrapper = mount(XLazyRender, {
      slots: {
        default: '<div id="content">content</div>',
      },
    });

    expect(useIntersectionObserver).toBeCalledTimes(1);
    const mock = (useIntersectionObserver as any).mock;
    mock.calls[0][1]([{ isIntersecting: false }]);
    expect(wrapper.find('#content').exists()).toBe(false);
    mock.calls[0][1]([{ isIntersecting: true }]);
    await nextTick();
    expect(wrapper.find('#content').exists()).toBe(true);
  });

  it('should render on idle', async () => {
    const spyRequestIdeCallback = jest.fn();
    window.requestIdleCallback = spyRequestIdeCallback;
    const wrapper = mount(XLazyRender, {
      slots: {
        default: '<div id="content">content</div>',
      },
    });
    expect(spyRequestIdeCallback).toBeCalledTimes(1);
    expect(wrapper.find('#content').exists()).toBe(false);
    spyRequestIdeCallback.mock.calls[0][0]();
    await nextTick();
    expect(wrapper.find('#content').exists()).toBe(true);
  });
});
