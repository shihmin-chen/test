import { fireEvent, render, screen } from '@testing-library/vue';
import { mount, shallowMount } from '@vue/test-utils';
import { computed, nextTick } from 'vue';

import * as useTippyBounding from './composables/useTippyBounding';
import { XMultiLevelDropdownMenu } from './index';

describe('XMultiLevelDropdownMenu', () => {
  it('should render multi-level dropdown button and menu items', async () => {
    /*
    test case:
    - multiple level: option-B -> option-D
    - multiple item group in the same level: group-1, group-2
    - multiple item in the same item group: option-A, option-B
    */
    const stubTippyOnShow = jest.fn();
    const fakeItemGroups = [
      {
        name: 'group-1',
        items: [
          {
            name: 'option-A',
            disabled: true,
            children: [],
            callback: jest.fn(),
          },
          {
            name: 'option-B',
            disabled: false,
            children: [
              {
                name: 'group-3',
                items: [
                  {
                    name: 'option-D',
                    disabled: false,
                    children: [],
                    callback: jest.fn(),
                  },
                ],
              },
            ],
            callback: jest.fn(),
          },
        ],
      },
      {
        name: 'group-2',
        items: [
          {
            name: 'option-C',
            disabled: false,
            children: [],
            callback: jest.fn(),
          },
        ],
      },
    ];
    render(XMultiLevelDropdownMenu, {
      slots: {
        'dropdown-button': 'button-1',
      },
      props: {
        itemGroups: fakeItemGroups,
        options: {
          trigger: 'click',
          onShow: stubTippyOnShow,
        },
      },
    });

    // test find target button
    expect(await screen.findByText('button-1')).toBeDefined();

    // test show dropdown menu when click target button
    expect(screen.queryByText('option-A')).toBeFalsy();
    expect(screen.queryByText('option-B')).toBeFalsy();
    expect(screen.queryByText('option-C')).toBeFalsy();
    expect(stubTippyOnShow).not.toBeCalled();
    await fireEvent.click(await screen.findByText('button-1'));
    expect(await screen.findByText('option-A')).toBeDefined();
    expect(await screen.findByText('option-B')).toBeDefined();
    expect(await screen.findByText('option-C')).toBeDefined();
    expect(stubTippyOnShow).toBeCalled();

    // test show sub dropdown menu
    expect(screen.queryByText('option-D')).toBeFalsy();
    await fireEvent.mouseEnter(await screen.findByText('option-B'), {
      bubbles: true,
    });
    expect(await screen.findByText('option-D')).toBeDefined();
  });

  it('should block the disabled menu item', async () => {
    const stubCallback = jest.fn();
    const fakeItem = {
      name: 'option-A',
      disabled: false,
      children: [],
      callback: stubCallback,
    };
    const fakeItemDisabled = {
      name: 'option-B',
      disabled: true,
      children: [],
      callback: stubCallback,
    };
    const fakeItemWithoutCallback = {
      name: 'option-C',
      disabled: false,
      children: [],
    };
    const wrapper = mount(XMultiLevelDropdownMenu);

    // test disable
    await nextTick();
    await wrapper.vm.onItemClick(fakeItemDisabled);
    expect(stubCallback).not.toBeCalled();

    // test enable
    await nextTick();
    await wrapper.vm.onItemClick(fakeItem);
    expect(stubCallback).toBeCalled();

    // test without callback
    await nextTick();
    await wrapper.vm.onItemClick(fakeItemWithoutCallback);

    wrapper.unmount();
  });

  it('should handle disabled prop changing', async () => {
    const { rerender } = render(XMultiLevelDropdownMenu, {
      props: {
        disabled: true,
      },
    });

    await nextTick();
    expect(
      screen
        .getByTestId('x-multi-level-dropdown-target')
        .getAttribute('aria-disabled'),
    ).toBe('true');

    await rerender({
      disabled: false,
    });
    expect(
      screen
        .getByTestId('x-multi-level-dropdown-target')
        .getAttribute('aria-disabled'),
    ).toBe('false');

    await rerender({
      disabled: true,
    });
    expect(
      screen
        .getByTestId('x-multi-level-dropdown-target')
        .getAttribute('aria-disabled'),
    ).toBe('true');
  });

  it('Test tippyBoundingStyle', async () => {
    // setup: mock
    jest.spyOn(useTippyBounding, 'useTippyBounding').mockReturnValue({
      tippyStyle: computed(() => ({ maxHeight: '100px' })),
      updateTippyBounding: jest.fn(),
    });

    // setup: mount
    const wrapper = shallowMount(XMultiLevelDropdownMenu, {
      props: {
        tippyBoundingOptions: {
          viewportPadding: 10,
        },
      },
    });

    // verify: should get style from tippy bounding composable
    expect(wrapper.vm.tippyBoundingStyle).toStrictEqual({
      maxHeight: '100px',
    });
  });
});
