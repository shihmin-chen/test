import { flushPromises, mount } from '@vue/test-utils';

import { ContextMenuItem } from '../XContextMenu/types/contextMenu';
import XTiptapEditor from './XTiptapEditor.vue';

describe('XTiptapEditor', () => {
  const defaultMockComponents = {
    ContextMenu: true, // TODOITEM: 目前 deep mount 時的 `ContextMenu` 會出現錯誤 `TypeError: P5 is not a function`
  };

  it('Snapshot Test - base template', async () => {
    // props
    const data = [
      {
        key: 'fakeKey_0',
        text: 'fakeText_0\nfakeText_0.1', // case: multiple lines
      },
    ];
    const sectionOptions = [
      {
        key: 'fakeKey_0',
        name: 'fakeName_0',
      },
    ];
    const contextMenuItems: ContextMenuItem[] = [];
    const maxCharacterCount = 100;
    const editable = true;

    // setup: mount
    const wrapper = mount(XTiptapEditor, {
      props: {
        data,
        sectionOptions,
        contextMenuItems,
        maxCharacterCount,
        editable,
      },
      global: {
        stubs: defaultMockComponents,
      },
    });
    await flushPromises();

    // verify: should match snapshot
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Snapshot Test - multi-section template', async () => {
    // props
    const data = [
      {
        key: 'fakeKey_0',
        text: 'fakeText_0\nfakeText_0.1', // case: multiple lines
      },
      {
        key: 'fakeKey_1',
        text: '', // case: empty
      },
    ];
    const sectionOptions = [
      {
        key: 'fakeKey_0',
        name: 'fakeName_0',
      },
      {
        key: 'fakeKey_1',
        name: 'fakeName_1',
      },
    ];
    const contextMenuItems: ContextMenuItem[] = [];
    const maxCharacterCount = 100;
    const editable = true;

    // setup: mount
    const wrapper = mount(XTiptapEditor, {
      props: {
        data,
        sectionOptions,
        contextMenuItems,
        maxCharacterCount,
        editable,
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
