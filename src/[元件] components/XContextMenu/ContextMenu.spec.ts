import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';

import * as useContextMenu from './composables/useContextMenu';
import ContextMenu from './ContextMenu.vue';
import { ContextMenuItemGroup } from './types/contextMenu';

describe('ContextMenu', () => {
  const defaultMockComponents = {};

  beforeEach(() => {
    // setup: mock
    jest.spyOn(useContextMenu, 'useContextMenu').mockReturnValue({
      contextMenuRef: ref(),
      handleContextMenu: jest.fn(),
      hideContextMenu: jest.fn(),
    }); // 裡面的 `document.createElement` 會引起 "TypeError: P5 is not a function" 的錯誤，由於已經有對應的 unit test 了，這邊就先 mock 掉
  });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Snapshot Test', async () => {
    // props
    const contextMenuItemGroups: ContextMenuItemGroup[] = [
      {
        items: [
          {
            name: 'fakeName_0',
            disabled: false,
            callback: jest.fn(),
            mouseDownCallback: jest.fn(),
          },
          {
            name: 'fakeName_1',
            disabled: true,
          },
        ],
      },
    ];
    const disabled = false;
    const tippyOptions = {};

    // setup: mount
    const wrapper = mount(ContextMenu, {
      props: {
        contextMenuItemGroups,
        disabled,
        tippyOptions,
      },
      global: {
        stubs: defaultMockComponents,
      },
    });
    await flushPromises();

    // verify: should match snapshot
    expect(wrapper.element).toMatchSnapshot();
  });
});
