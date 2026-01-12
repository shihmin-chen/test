import { fireEvent, render, screen } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { MenuDisplayMode } from './drawer';
import { XNavDrawerMenu } from './index';

describe('XNavDrawerMenu', () => {
  it('should expand or callback in each state', async () => {
    const stubCallbacks = {
      root: jest.fn(),
      rootOption: jest.fn(),
      A1: jest.fn(),
      B1: jest.fn(),
    };
    const { getByText, getByTestId } = render(XNavDrawerMenu, {
      props: {
        node: {
          key: 'root',
          name: 'folder root',
          callback: stubCallbacks.root,
          dropdownItems: [
            {
              name: 'option root',
              callback: stubCallbacks.rootOption,
            },
          ],
          children: [
            {
              key: 'root/A1',
              name: 'item A1',
              callback: stubCallbacks.A1,
              children: [],
            },
            {
              key: 'root/B1',
              name: 'folder B1',
              disabled: true,
              callback: stubCallbacks.B1,
              children: [
                {
                  key: 'root/B1/B2',
                  name: 'item B2',
                  children: [],
                },
              ],
            },
          ],
        },
        level: 0,
      },
    });

    /* test click callable folder */
    expect(screen.queryByText('folder root')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    fireEvent.click(getByText('folder root'));
    await nextTick();
    expect(screen.queryByText('folder root')).toHaveAttribute(
      'aria-expanded',
      'true',
    ); // folder should expand
    expect(stubCallbacks.root).toBeCalled();

    /* test click callable item */
    expect(screen.queryByText('item A1')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    fireEvent.click(getByText('item A1'));
    await nextTick();
    expect(screen.queryByText('item A1')).toHaveAttribute(
      'aria-expanded',
      'false',
    ); // item should not expand
    expect(stubCallbacks.root).toBeCalled();

    /* test click disabled folder */
    expect(screen.queryByText('folder B1')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    fireEvent.click(getByText('folder B1'));
    await nextTick();
    expect(screen.queryByText('folder B1')).toHaveAttribute(
      'aria-expanded',
      'true',
    ); // disabled still should expand
    expect(stubCallbacks.B1).not.toBeCalled(); // disabled should not call

    /* test click dropdown item */
    expect(stubCallbacks.rootOption).not.toBeCalled();
    fireEvent.click(getByTestId('dropdown-target'));
    fireEvent.click(getByText('option root'));
    expect(stubCallbacks.rootOption).toBeCalled();
  });

  it('should expand and collapse on toggle', async () => {
    const wrapper = mount(XNavDrawerMenu, {
      props: {
        node: {
          key: 'root',
          name: 'folder root',
          children: [
            {
              key: 'root/A1',
              name: 'item A1',
              children: [],
            },
          ],
        },
        level: 0,
      },
    });

    // init is not expand
    expect(wrapper.vm.isExpand).toBe(false);
    expect(wrapper.vm.toggleIcon).toBe('chevron-down');

    // call toggle
    wrapper.vm.onToggle();
    await nextTick();

    // current is expand
    expect(wrapper.vm.isExpand).toBe(true);
    expect(wrapper.vm.toggleIcon).toBe('chevron-up');

    // call toggle
    wrapper.vm.onToggle();
    await nextTick();

    // current is not expand
    expect(wrapper.vm.isExpand).toBe(false);
    expect(wrapper.vm.toggleIcon).toBe('chevron-down');

    // call onMenuItemMouseOver
    wrapper.vm.onMenuItemMouseOut();
    wrapper.vm.onMenuItemMouseOver();
    await nextTick();
    expect(wrapper.vm.shouldShowMenu).toBe(true);

    wrapper.unmount();
  });

  it('should get correct level style', () => {
    const wrapper = mount(XNavDrawerMenu, {
      props: {
        level: 1,
      },
    });

    expect(wrapper.vm.levelStyle).toStrictEqual({
      'padding-left': `32px`,
    });

    wrapper.unmount();
  });

  it('should get is expanded', () => {
    const wrapper = mount(XNavDrawerMenu, {
      props: {
        node: {
          isExpand: false,
          setExpand: () => undefined,
        },
      },
    });

    wrapper.vm.isExpand = true;
    wrapper.unmount();
  });

  it('should consider node setting for menu display', () => {
    const nodes = [
      {
        isExpand: false,
        displayMenu: MenuDisplayMode.Always,
        setExpand: () => undefined,
        show: true,
      },
      {
        isExpand: false,
        displayMenu: MenuDisplayMode.Hide,
        setExpand: () => undefined,
        show: false,
      },
      {
        isExpand: false,
        displayMenu: MenuDisplayMode.Hover,
        setExpand: () => undefined,
        show: false,
      },
      {
        isExpand: false,
        displayMenu: 'xxx',
        setExpand: () => undefined,
        show: 'error',
      },
    ];

    for (const node of nodes) {
      const wrapper = mount(XNavDrawerMenu, {
        props: {
          node,
        },
      });
      if (node.show !== 'error') {
        expect(wrapper.vm.shouldShowMenu).toBe(node.show);
      } else {
        expect(() => wrapper.vm.shouldShowMenu).toThrowError(
          '"xxx" is not a correct menu display mode!',
        );
      }
      wrapper.unmount();
    }
  });
});
