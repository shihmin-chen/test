import { shallowMount } from '@vue/test-utils';

import XDialogLayout from './XDialogLayout.vue';
import { XDialogLayoutTheme } from './enum';

describe('Test XDialogLayout', () => {
  const defaultProps = {
    title: 'title',
    theme: XDialogLayoutTheme.Success,
  };

  it('Test hasContent', async () => {
    // setup: mount
    const wrapper = shallowMount(XDialogLayout, {
      props: defaultProps,
    });

    // verify: should not be "has content" if without content prop and body slot
    expect(wrapper.vm.hasContent).toBe(false);
  });

  it('Test hasContent - has content', async () => {
    // setup: mount
    const wrapper = shallowMount(XDialogLayout, {
      props: {
        ...defaultProps,
        content: 'content',
      },
    });

    // verify: should be "has content" if has content prop
    expect(wrapper.vm.hasContent).toBe(true);
  });

  it('Test hasContent - has slot content', async () => {
    // setup: mount
    const wrapper = shallowMount(XDialogLayout, {
      props: defaultProps,
      slots: {
        body: 'slot content',
      },
    });

    // verify: should be "has content" if has body slot content
    expect(wrapper.vm.hasContent).toBe(true);
  });
});
