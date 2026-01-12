import { Extension } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

/**
 * 將游標位置切換到下個/上個 section 的起點
 *
 * NOTE:
 * 以前這邊的寫法在切到下個 section 時是使用 `$head.after(DEPTH) + DEPTH`，
 * 但看不懂這個寫法的意思，實測起來 `$head.after()`，似乎也能達到相同效果。
 * 而切換到上個 section 則須根據事先訂好的 sections 數減1，執行該數量的切到 next section，感覺有點 workaround。
 * 所以這次改成掀找出各 sections 的位置，再找到下個/上個 section 的位置，應該會簡單一點。
 */
export const switchToPreviousNextSection = (
  view: EditorView,
  isPrevious: boolean,
): boolean => {
  const { state } = view;
  const { doc, selection, tr } = state;
  const { $anchor, $head } = selection;

  // 如果有選取範圍，則不執行切換
  // NOTE: 這可能是以前訂的 spec? 目前先保留，但實測大部分按 tab 切換欄位的行為，在有選取範圍時應該還是都會切換。
  if ($anchor.pos !== $head.pos) {
    return false;
  }

  // 找到所有 section 節點的位置
  const sections: number[] = [];
  doc.descendants((node: ProseMirrorNode, pos: number) => {
    if (node.type.name === MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME) {
      sections.push(pos);
    }
  });

  // 找到當前游標所在的 section
  const currentSectionIndex = sections.findIndex(
    (pos) =>
      pos <= $anchor.pos &&
      pos + (doc.nodeAt(pos)?.nodeSize ?? 0) > $anchor.pos,
  );

  // 找到目標 section 的 index
  const targetSectionIndex = isPrevious
    ? currentSectionIndex - 1
    : currentSectionIndex + 1;

  // 如果超出範圍，則不執行切換
  if (targetSectionIndex < 0 || targetSectionIndex > sections.length - 1) {
    return false;
  }

  // 切換到目標 section
  const targetSectionPos = sections[targetSectionIndex];
  const resolvedPos = doc.resolve(targetSectionPos);
  const targetSelection = Selection.near(resolvedPos);
  tr.setSelection(targetSelection);
  tr.scrollIntoView();
  view.dispatch(tr);
  return true;
};

/**
 * 切換 section
 */
export const SwitchSectionExtension = Extension.create({
  name: 'multiSectionSwitchSection',

  addKeyboardShortcuts() {
    return {
      // 將 tab, shift-tab 設為各 section 間的切換
      Tab: () => switchToPreviousNextSection(this.editor.view, false),
      'Shift-Tab': () => switchToPreviousNextSection(this.editor.view, true),
    };
  },
});
