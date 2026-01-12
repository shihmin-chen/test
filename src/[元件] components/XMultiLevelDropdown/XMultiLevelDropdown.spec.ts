import { fireEvent, render, screen } from '@testing-library/vue';
import { shallowMount } from '@vue/test-utils';

import { XMultiLevelDropdown } from './index';

describe('XMultiLevelDropdown', () => {
  it('should render multi-level dropdown button and menu', async () => {
    const { emitted } = render(XMultiLevelDropdown, {
      slots: {
        default: 'button-1',
      },
      props: {
        autoFocus: true,
        itemGroups: [
          {
            name: 'group-1',
            items: [
              {
                name: 'option-A',
                disabled: false,
                children: [],
                callback: jest.fn(),
              },
            ],
          },
        ],
        options: {
          trigger: 'manual',
        },
      },
    });

    // test find target button
    expect(await screen.findByText('button-1')).toBeDefined();

    // test show dropdown menu when trigger target button
    expect(screen.queryByText('option-A')).toBeFalsy();
    await fireEvent.mouseEnter(await screen.findByText('button-1'), {
      bubbles: true,
    });
    expect(await screen.findByText('option-A')).toBeDefined();
    expect(emitted()['show']).toBeTruthy();
  });

  it('Test tippyOptions - options prop', async () => {
    // setup: mount
    const wrapper = shallowMount(XMultiLevelDropdown, {
      props: {
        options: {
          placement: 'top-end',
        },
      },
    });

    // verify: should override default props
    expect(wrapper.vm.tippyOptions).toStrictEqual(
      expect.objectContaining({
        placement: 'top-end',
      }),
    );
  });

  it('Test tippyOptions - teleport prop', async () => {
    // setup: mount
    const wrapper = shallowMount(XMultiLevelDropdown, {
      props: {
        teleport: true,
      },
    });

    // verify: should set appendTo prop
    expect(wrapper.vm.tippyOptions).toStrictEqual(
      expect.objectContaining({
        appendTo: expect.anything(),
      }),
    );
  });
});
