import { shallowMount } from '@vue/test-utils';
import { Fragment, Node as ProsemirrorNode, Slice } from 'prosemirror-model';

import Tiptap from '../../XTiptapEditor.vue';
import { getClipboardPlugin } from './clipboardPlugin';

/**
 * NOTE: 此 test 從 opd v2 複製過來，再微調
 *
 * TODOITEM: 這個 test 很亂，要再整理一下
 */

describe('Test getClipboardPlugin', () => {
  const fakeContent: unknown[] = [];

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it.skip('test clipboardTextSerializer', () => {
    const wrapper = shallowMount(Tiptap);
    const plugin = getClipboardPlugin(wrapper.vm.editor.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { clipboardTextSerializer } = (plugin.spec.props ?? {}) as any;

    const node = ProsemirrorNode.fromJSON(
      wrapper.vm.editor.schema,
      fakeContent,
    );

    const slice = new Slice(Fragment.fromArray([node]), 1, 1);

    const res = clipboardTextSerializer(slice);

    expect(res).toBe(
      'This is subjective\nThis is objective\nThis is assessment\nThis is plan\n',
    );
  });

  it.skip('test clipboardSerializer', () => {
    const wrapper = shallowMount(Tiptap);
    const plugin = getClipboardPlugin(wrapper.vm.editor.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { clipboardSerializer } = (plugin.spec.props ?? {}) as any;

    const node = ProsemirrorNode.fromJSON(
      wrapper.vm.editor.schema,
      fakeContent,
    );

    const fragment = Fragment.fromArray([node]);

    const res = clipboardSerializer.serializeFragment(fragment);

    expect(res).toBeDefined();
    expect(res.childElementCount).toBe(8);
    expect(res.textContent).toBe(
      'SThis is subjectiveOThis is objectiveAThis is assessmentPThis is plan',
    );
  });

  it('test transformPastedHTML', () => {
    const wrapper = shallowMount(Tiptap);
    const plugin = getClipboardPlugin(wrapper.vm.editor.schema);
    const { transformPastedHTML } = plugin.spec.props as any;

    let res = transformPastedHTML('<span>test\ntest</span>');

    expect(res).toBe('<span>test<br>test</span>');

    res = transformPastedHTML('<p>test\ntest</p>');

    expect(res).toBe('<p>test<br>test</p>');

    res = transformPastedHTML('<div><span>test\ntest</span></div>');

    expect(res).toBe('<span>test<br>test</span>');

    res = transformPastedHTML('<div><p>test\ntest</span></p>');

    expect(res).toBe('<p>test<br>test</p>');

    res = transformPastedHTML('<div><p><span>test\ntest</span></p></div>');

    expect(res).toBe('<p>test<br>test</p>');
  });

  it('test handleDrop', () => {
    const wrapper = shallowMount(Tiptap);
    const plugin = getClipboardPlugin(wrapper.vm.editor.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { handleDrop } = (plugin.spec.props ?? {}) as any;

    const res = handleDrop({}, {}, { size: 10 });

    expect(res).toBe(false);
  });

  it('test handlePaste', () => {
    const wrapper = shallowMount(Tiptap);
    const plugin = getClipboardPlugin(wrapper.vm.editor.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { handlePaste } = (plugin.spec.props ?? {}) as any;

    const res = handlePaste({}, {}, { size: 10 });

    expect(res).toBe(false);
  });
});
