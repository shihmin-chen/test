/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import XDraggableList from './XDraggableList.vue';

describe('XDraggableList', () => {
  it('Render without error', async () => {
    render(XDraggableList, {
      props: {
        itemKey: 'key',
      },
    });
  });

  it('mount without error', async () => {
    const wrapper = mount(XDraggableList, {
      props: {
        itemKey: 'key',
      },
    });
    wrapper.vm.onMove({} as any, {} as any);
    wrapper.vm.onMoveStart({} as any);
    wrapper.vm.onMoveEnd({} as any);
    expect(wrapper.vm.$props.list).toEqual([]);
  });
});
