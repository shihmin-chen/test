import { Extension } from '@tiptap/vue-3';
import { TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

/**
 * 全選該 section
 */
export const selectSectionAll = (view: EditorView): boolean => {
  const { state } = view;
  const { doc, tr, selection } = state;
  const { $head } = selection;

  const nextSelection = new TextSelection(
    // Should move forward by two steps for <aicstemplate>, <p>
    doc.resolve(
      $head.before(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) + 2,
    ),
    doc.resolve(
      $head.after(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) - 2,
    ),
  );

  tr.setSelection(nextSelection);
  view.dispatch(tr);

  return true;
};

/**
 * 全選
 */
export const SelectAllExtension = Extension.create({
  name: 'multiSectionSelectAll',

  addKeyboardShortcuts() {
    return {
      // 將 ctrl-a 設為只對當下 section 內進行全選
      'Mod-a': () => selectSectionAll(this.editor.view),
      'Mod-A': () => selectSectionAll(this.editor.view),
    };
  },
});
