import { Plugin, PluginKey } from 'prosemirror-state';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

/**
 * 過濾 transaction 的插件
 * - 例如用於根據條件將某次改動拒絕掉
 *
 * TODOITEM: 試試看長度限制的功能能不能也改用 `filterTransaction` 來實現，這樣在更新前就阻擋，會比更新後再 undo 好。
 */
export const getFilterTransactionPlugin = () => {
  return new Plugin({
    key: new PluginKey('multiSectionFilterTransaction'),
    filterTransaction(tr, state) {
      const { $anchor, $head } = state.selection;
      // 看起來是在選擇了跨越不同 section 時，當那次操作會改變 doc 的話，如果就拒絕那次 transaction。
      // (不確定以前是遇到什麼 case 才加這個，但後來有擋跨 section 的選取了，應該不會有跨 section 選取後再編輯的情況)
      if (
        $anchor.node(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) !==
          $head.node(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) &&
        tr.docChanged
      ) {
        return false;
      }
      return true;
    },
  });
};
